const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");
const reduceProperties = require("../utils/reduce-properties");

const reduceTheaterAndMovies = reduceProperties("theater_id", {
    "movie_id": ["movies", null, "movie_id"],
    "title": ["movies", null, "title"],
    "runtime_in_minutes": ["movies", null, "runtime_in_minutes"],
    "rating": ["movies", null, "rating"],
    "description": ["movies", null, "description"],
    "image_url": ["movies", null, "image_url"],
    "created_at": ["movies_theaters", null, "created_at"],
    "updated_at": ["movies_theaters", null, "updated_at"],
    "theater_id": ["movies_theaters", null, "theater_id"],
    "is_showing": ["movies_theaters", null, "is_showing"],
});

function list(){
    return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .join("movies as m", "mt.movie_id", "m.movie_id")
    .then(reduceTheaterAndMovies)
}

module.exports = {
    list,
};