const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

function read(review_id){
    return knex("reviews")
    .select("*")
    .where({ review_id })
    .first();
}

function update(updatedReview){
    return knex("reviews")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview);
}

const listCritic = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
});

function updatedRecord(reviewId){
    return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    .where({ review_id: reviewId })
    .first()
    .then((id) => {
        const updated = listCritic(id);
        updated.critic_id = updated.critic.critic_id;
        return updated;
    })
}

function destroy(review_id){
    return knex("reviews")
    .where({ review_id })
    .del();
}

module.exports = {
    read,
    update,
    updatedRecord,
    delete: destroy,
};