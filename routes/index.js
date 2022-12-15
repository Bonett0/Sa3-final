
var User = require('../models/user');
var Moves = require('../models/moves');
var express = require('express');
var router = express.Router();
const verify = require('./verifyToken');
var mongoose = require('mongoose');

var id;

/* GET home page. */
router.get('/index', async (req, res, next) => {
  let scores = [];
  response = verify.check(req);
  if (response.status) {
    console.log(response.name)
    const user = await User.find({}).lean();
    user.forEach(element => {
      scores.push(element.username);
      scores.push(element.score);
    })
    res.render('index', { title: 'Index Page', filename: "unlocked", name: response.name, leaderboard: scores });
  } else {
    res.render('index', { title: 'Index Page', filename: "locked", name: response.name, leaderboard: scores });
  }
});

router.get('/', function (req, res, next) {
  res.redirect('/index');
});

router.get('/browse', verify.auth, function (req, res, next) {
  let name = req.userName;
  console.log(name);
  res.render('browse', { username: name });
})


router.get('/test',function(req, res, next) {
  id = mongoose.Types.ObjectId();
  res.render('test', {username: verify.check(req).name});
})

router.get('/createChallenge',function(req, res, next) {
  id = mongoose.Types.ObjectId();
  res.render('create_challenge', {});
})

router.post('/createChallenge', function(req, res, next) {
  let wp = req.body.whitePawn.split(" ");
  let wr = req.body.whiteRook.split(" ");
  let wb = req.body.whiteBishop.split(" ");
  let wq = req.body.whiteQueen.split(" ");
  let wk = req.body.whiteKing.split(" ");
  let wh = req.body.whiteHores.split(" ");
  let bp = req.body.blackPawn.split(" ");
  let br = req.body.blackRook.split(" ");
  let bb = req.body.blackBishop.split(" ");
  let bq = req.body.blackQueen.split(" ");
  let bk = req.body.blackKing.split(" ");
  let bh = req.body.blackHores.split(" ");
  let urs = req.body.moves.split(" ");
  let bots = req.body.response.split(" ");
  let tileInfo = new Map();
  for (let i = 1; i < 9; i++) {
    for (let j = 1; j < 9; j++) {
      newID = "" + i + j;
      tileInfo.set(newID, "empty");
    }
  }
  
});

router.post('/play', async(req, res)=> {
  const { map, atk, object } = req.body;
  
try {

  const response = await Moves.create({
    map,
    atk,
    object,
    id
  })
  console.log('created moves', response);

} catch(error){
  throw error
}
res.json({status: 'ok'});

})


router.post('/play', async (req, res) => {
  const { map, atk } = req.body;

  try {

    const response = await Moves.create({
      map,
      atk,
    })
    console.log('created moves', response);

  } catch (error) {
    throw error
  }
  res.json({ status: 'ok' });
})

router.get('/chat', verify.auth, function (req, res, next) {
  res.render('chat', {});

})
router.get('/learn', verify.auth, function (req, res, next) {
  res.render('learn', {});
})


router.get('/about', function (req, res, next) {
  res.render('about', {});
})



router.get('/browse-puzzles', function (req, res, next) {
  res.render('browse_puzzles', {});

})
module.exports = router;
