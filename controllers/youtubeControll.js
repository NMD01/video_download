const ytdl = require('ytdl-core');
const fs = require('fs');
const userHome = require('user-home');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

const youtubeDownload = {
    download: async (req, res, next) => {
        const URL = req.body.URL
        const formato = req.body.formato
        console.log(URL)

        if(formato == "mp4"){
            try {
                console.log("baixando no formato mp4")
                const videoInfo = await ytdl.getInfo(URL);
                const normalizedTitle = videoInfo.videoDetails.title.replace(/[^\w\sÀ-ú]/gi, '').replace(/\//g, '-');
    
                const format = ytdl.chooseFormat(videoInfo.formats, { quality: 'highest', filter: 'audioandvideo' });
    
                const downloadsPath = path.join(userHome, 'Downloads');
                const filePath = path.join(downloadsPath, `${normalizedTitle}.mp4`);
          
                ytdl(URL, { format })
                  .pipe(fs.createWriteStream(filePath))
                  .on('finish', () => {
                    console.log('Download do vídeo concluído!');
                    next();
                  })
                  .on('error', (err) => {
                    console.error('Erro durante o download:', err);
                    next()
                  });
              } catch (err) {
                console.log(err);
                next()
              }

            }else{
                console.log("baixando no formato mp3")


                const videoInfo = await ytdl.getInfo(URL);
                const normalizedTitle = videoInfo.videoDetails.title.replace(/[^\w\sÀ-ú]/gi, '').replace(/\//g, '-');
                const audioStream = ytdl(URL, { quality: 'highestaudio' });
                const downloadsPath = path.join(userHome, 'Downloads');
                

                 ffmpeg()
                .input(audioStream)
                .audioCodec('libmp3lame')
                .toFormat('mp3')
                .on('end', () => {
                    console.log('Conversão para MP3 concluída!');
                })
                .on('error', (err) => {
                    console.error('Erro durante a conversão para MP3:', err);
                })
                .save(path.join(downloadsPath, `${normalizedTitle}.mp3`));
            }
        }

        
    
    }

module.exports = youtubeDownload  