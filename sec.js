const express=require('express')

const app=express()

app.post('/createprod',(req,res)=>{
console.log(req.body);
})