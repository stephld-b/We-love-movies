const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

function list(){
    return knex("movies")
    .select("*")
    .groupBy("movie_id");
}

function listActiveMovies(){
    return knex("movies as m")
    .join("movies_theater as mt", "m.movie_id", "mt.movie_id")
    .select("m.*")
    .where({"mt.is_showing": true})
    .groupBy("m.movie_id");
}

function read(movieId){
    
}


module.exports = {
    list,
    listActiveMovies,
};