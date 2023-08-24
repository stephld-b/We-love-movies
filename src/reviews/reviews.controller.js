const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(req, res, next){
    const review= await service.read(req.params.reviewId);
    if(review){
        res.locals.review = review;
        return next();
    } else {
        next({ status: 404, message: `Review cannot be found.` });
    }
}

async function update(req, res){
    const { reviewId } = req.params;
    const updatedReview = {
        ...res.locals.review,
        ...req.body.data,
        review_id: res.locals.review.review_id,
      };
    await service.update(updatedReview);
    res.json({ data: await service.updatedRecord(reviewId)})
}

async function destroy(req, res){
    const { review } = res.locals;
    await service.delete(review.review_id);
    res.sendStatus(204);
}

module.exports = {
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
}