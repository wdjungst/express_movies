var express = require('express');
var redis = require('redis');
var redisClient = redis.createClient();
var router = express.Router();

/* GET movie listings. */
router.get('/', function(req, res, next) {
  redisClient.smembers("movies", function (err, movies) {
    res.locals.movies = movies ? movies : [];
    res.render('movies');
  });
});

/* POST add movie. */
router.post('/', function(req, res, next) {
  redisClient.sadd("movies", req.body.name);
  res.redirect('/movies');
});

/* DELETE a movie */
router.get('/delete/:name', function(req, res, next) {
  redisClient.srem("movies", req.params.name);
  res.redirect('/movies');
});

module.exports = router;
