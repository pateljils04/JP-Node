const mongoose=require("mongoose");

const movieSchema=new mongoose.Schema({
    title:String,
    genre:String,
    director:String,
    releaseyear:Number,
    description:String
});

const movieModel=mongoose.model("movie",movieSchema);

module.exports=movieModel;