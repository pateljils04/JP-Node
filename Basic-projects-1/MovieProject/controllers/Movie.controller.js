const movieModel = require("../model/movie.model");
const jwt = require("jsonwebtoken")



const GetMovies = async (req, res) => {
    try {
        const movies = await movieModel.find()
        res.status(200).json({ Allmovies: movies })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const PostMovies = async (req, res) => {
    const { title, genre, director, releaseyear, description } = req.body;
    try {
        const Moviesdata = await movieModel.create({ title, genre, director, releaseyear, description })
        res.status(200).json({ message: "data are added in database", movies: Moviesdata })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const PutMovies = async (req, res) => {
    try {
        const Moviesdata = await movieModel.findByIdAndUpdate(req.params.movieid, req.body)
        res.status(200).json({ message: "data are updated" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


const DleteMovies = async (req, res) => {
    try {
        const Moviesdata = await movieModel.findByIdAndDelete(req.params.movieid)
        res.status(200).json({ message: "data are deleted" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


module.exports = { GetMovies, PostMovies, PutMovies, DleteMovies }