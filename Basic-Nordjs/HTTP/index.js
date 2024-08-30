const http=require("http")
const fs=require("fs")

const server=http.createServer((req,res)=>{
    if(req.url=="/"){
        res.end("Welcome To The Home page")
    }
    else if(req.url=="/about"){
        res.end("You are in About Page")
    }
    else if(req.url=="/getproductdata"){
        fs.readFile("./db.json","utf-8",(err,data)=>{
            if(err){
                res.end(err)
            }
            else{
                // console.log(data)
                const newdata=JSON.parse(data)
                res.end(JSON.stringify(newdata.product))
            }
        })
    }
    else if(req.url=="/user"){
        fs.readFile("./db.json","utf-8",(err,data)=>{
            if(err){
                res.end(err)
            }
            else{
                // console.log(data)
                const newdata=JSON.parse(data)
                res.end(JSON.stringify(newdata.user))
            }
        })
    } 
    else{
        res.end("404 Not Found !")
    }  

})

server.listen(8050,()=>{
    console.log("server is running")
})