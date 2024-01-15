let baixar = document.getElementById("baixar")
baixar.addEventListener("click", ()=>{
    let URL = document.getElementById("url").value
    let formato = document.getElementById("formato").value

    let post = {URL, formato}

    let option = {
        method: "Post",
        headers: new Headers({'content-type':'application/json'}),
        body: JSON.stringify(post)
    }
    
    fetch("http://localhost:3000/download", option).then(res=>{
        console.log(res)
    })
})