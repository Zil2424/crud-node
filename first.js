const express=require('express')
require('dotenv').config()

const app=express()
app.use(express.json());

// app.get('/Hello',(req,res)=>{
//     res.redirect('/check')
// })

// app.get('/check',(req,res)=>{
//    res.send('<h1>hello world</h1>')
// })

let arr=[]
let id=0
let isdeleted

app.post('/createprod',(req,res)=>{
    try{
        //console.log(req.body);
     let obj=req.body;
     id++;
     obj.id=id;
     obj.isdeleted=false;
     if(obj.name && obj.cost && obj.category){
        let ans=arr.find(val=>{
            return val.name==obj.name
        })
        if(ans){
            res.status(403).send({"is successfull":false,msg:"product alrady exists"})
        }else{
            arr.push(obj);
            res.status(201).send({"is successfull":true,prod:obj})
        }
     }
     else{
        res.status(403).send({"is successfull":false,msg:"not valid detail"})
     }
    }
    catch{
        res.status(500).send({issuccessfull:false,msg:"server error"})
    }
    })

app.get("/getalldata",(req,res)=>{
     try{
        let ans = arr.filter((val)=>{
            return val.isdeleted==false
         })
         if(ans){
            res.status(200).send({prod:ans})
         }
     }
     catch{
        res.status(500).send({issuccessfull:false,msg:"server error"})
     }
})

app.get('/filter',(req,res)=>{
    try{
        let ans = arr.filter((val)=>{
            return val.cost>500 && val.cost <1000
         })
         if(ans){
            res.status(200).send({prod:ans})
         }
     }
     catch{
        res.status(500).send({issuccessfull:false,msg:"server error"})
     }
})
app.get('/ascdsc',(req,res)=>{
    let ans=arr.sort((a,b)=>(b.cost-a.cost))
    res.send({prod:ans})
})

app.put('/updatedata',(req,res)=>{
    try{
        // console.log(req.query);
    let id=req.query.id
    let idx=arr.findIndex((val)=>(val.id==id))
    if(idx>=0){
        let obj=arr[idx]
    obj={
        ...obj,
        ...req.body
    }
    arr[idx]=obj
    res.status(200).send({issuccessfull:true,updateval:obj})
    }else{
        res.status(403).send({issuccessfull:false,msg:"product not found"})
    }
    }
    catch{
        res.status(500).send({issuccessfull:false,msg:"server error"})
    }
})

app.delete('/deletedata',(req,res)=>{
    try{
    let id=req.query.id
    let idx=arr.findIndex((val)=>(val.id==id))
    if(idx>=0){
        let obj=arr[idx]
        arr.splice(idx,1) 
        res.status(403).send({issuccessfull:true,deleteval:obj})
    }else{
        res.status(200).send({issuccessfull:false,msg:"product deleted"})
    }}
    catch{
        res.status(500).send({issuccessfull:false,msg:"server error"})
    }
})

app.delete('/softdelete',(req,res)=>{
    try{
    let id=req.query.id
    let idx=arr.find((val)=>(val.id==id))
    if(idx && idx.isdeleted==false){
        idx.isdeleted=true;
        res.status(200).send({issuccessfull:true,deleteval:arr})
    }else{
        res.status(403).send({issuccessfull:false,msg:"value not found"})
    }}
    catch{
        res.status(500).send({issuccessfull:false,msg:"server error"})
    }
})
app.listen(process.env.PORT,()=>{
    console.log("server started on "+process.env.PORT);
})