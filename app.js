const express = require("express")
const app = express()
const path = require("path")
const youtubeControll = require("./controllers/youtubeControll")

app.use(express.json())
app.use(express.static(path.join(__dirname,"page")))
app.post("/download", youtubeControll.download)

module.exports = app
