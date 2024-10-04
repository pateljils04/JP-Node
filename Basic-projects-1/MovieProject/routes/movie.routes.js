const express = require("express")
const { GetMovies, PostMovies, PutMovies, DleteMovies } = require("../controllers/Movie.controller")
const MovieRouter = express.Router()
const auth = require("../middleware/auth.middleware")

MovieRouter.get("/allmovies", GetMovies)
MovieRouter.post("/addmovies", auth, PostMovies)
MovieRouter.put("/update/:movieid", auth, PutMovies)
MovieRouter.delete("/delete/:movieid", auth, DleteMovies)

module.exports = MovieRouter