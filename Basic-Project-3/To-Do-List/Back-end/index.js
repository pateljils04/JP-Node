const express = require("express");
const fs = require("fs");
const app = express();
const cors=require("cors");
const { send } = require("process");


app.use(cors());
app.use(express.json());

app.get("/getdata", (req, res) => {
    // res.send("you are in data page")

    fs.readFile("./db.json", "utf-8", (err, data) => {
        if (err) {
            res.send(err)
        }
        else {
            res.send(data)
        }
    })
})

app.post("/addproducts", (req, res) => {
    fs.readFile("./db.json", "utf-8", (err, data) => {
        if (err) {
            res.send(err)
        }
        else {

            const newdata = JSON.parse(data)
            newdata.push(req.body)

            fs.writeFile("./db.json", JSON.stringify(newdata), (err) => {
                if (err) {
                    res.send(err)
                }
                else {
                    res.send("data add succesfully")
                }
            })
        }
    })
})


app.patch("/editdata/:id",(req,res)=>{
  const {id}=req.params

    fs.readFile("./db.json","utf-8",(err,data)=>{
        if(err){
            res.send(err);
        }
        else{
            const editdata=JSON.parse(data)
            const index=editdata.findIndex((el)=>el.id==id)
            editdata[index]={...editdata[index],...req.body}
            // console.log(editdata)
            // res.end("")
            if(index!=-1){
                console.log(index)
            }
            else{
                res.send("product not found")
            }
            
            fs.writeFile("./db.json",JSON.stringify(editdata),(err)=>{
                if(err){
                    res.send(err)

                }
                else{
                    res.send("data are edited ")
                }
            })
        }
    });
});

app.put("/editdb/:id",(req,res)=>{
    const {id}=req.params
    fs.readFile("./db.json","utf-8",(err,data)=>{
        if(err){
            res.send(err)
        }
        else{
            // console.log(data)
            const editdata=JSON.parse(data)
            const index=editdata.findIndex((el)=>el.id==id)
            editdata[index]={...editdata[index],...req.body}
            // console.log(editdata)
            if(index!=-1){
                console.log(index)
            }
            else{
                res.send("data or id not found")
            }

            fs.writeFile("./db.json",JSON.stringify(editdata),(err)=>{
                if(err){
                    res.send(err)
                }
                else{
                    res.send("data change successfully")
                }
            })
        }
    })
})

app.delete("/deletedata/:id",(req,res)=>{
    const {id}=req.params
    fs.readFile("./db.json","utf-8",(err,data)=>{
        if(err){
            res.send(err)
        }
        else{
         const productdata=JSON.parse(data)
            // console.log(productdata)
            const filterdata=productdata.filter((el)=>el.id!=id)
            // console.log(filterdata)
            fs.writeFile("./db.json",JSON.stringify(filterdata),(err)=>{
                if(err){
                    res.send(err)
                }
                else{
                    res.send("data deleted...")
                }
            })
            res.send("i am del")

        }
    })
})

app.listen(8090, () => {
    console.log("server is running")

})