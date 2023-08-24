const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

function list(){
    return knex("movies")
    .select("*")
    .groupBy("movie_id");
}

function listActiveMovies(){
    return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("m.*")
    .where({"mt.is_showing": true})
    .groupBy("m.movie_id");
}

function read(movieId){
    return knex("movies")
    .select("*")
    .where({ movie_id: movieId })
    .groupBy("movies.movie_id")
    .first();
}

function listTheaters(movieId){
    return knex("movies_theaters as mt")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .select("*")
    .where({ "mt.movie_id": movieId, is_showing: true});
}

const listCritic = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
});

function listReviews(movieId){
    return knex("movies as m")
    .join("reviews as r", "m.movie_id", "r.movie_id")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("*")
    .where({ "r.movie_id": movieId })
    .then((result) => {
        const list = [];
        result.forEach((id) => {
            const appendedObject = listCritic(id);
            list.push(appendedObject);
        })
        return list;
    })
}


module.exports = {
    list,
    listActiveMovies,
    read,
    listTheaters,
    listReviews,
};