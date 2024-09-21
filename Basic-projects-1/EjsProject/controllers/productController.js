const express=require("express")
const ProductModel = require("../models/product")

const GetHome=(req,res)=>{
    res.render("home")
 }

const GetProducts=async(req,res)=>{
    try {
        const Products = await ProductModel.find()
        // res.status(200).json({message:Products})
        res.render("product",{Products})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const Postproduct=async(req,res)=>{
    const {name,price,description,imageURL}=req.body
    try {
        await ProductModel.create({name,price,description,imageURL})
        res.status(200).json({message:"product add successfully"})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

module.exports={GetProducts,Postproduct,GetHome}