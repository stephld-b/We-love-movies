const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next){
    const isShowing = req.query.is_showing;
    if(isShowing) {
        res.json({ data: await service.listActiveMovies() })
    } else {
        res.json({ data: await service.list() })
    }
   
}

async function movieExists(req, res, next){
    const movie = await service.read(req.params.movieId);
    if(movie){
        res.locals.movie = movie;
        return next();
    } else {
        next({ status: 404, message: `Movie cannot be found.` });
    }
}

function read(req, res, next){
    const data = res.locals.movie;
    res.json({ data });
}


module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(movieExists), read],
}