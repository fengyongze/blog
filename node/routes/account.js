var express = require('express');
var userDao = require('../dao/userDao');
var router = express.Router();
router.get('/login',function(req,res){
  return res.send('这里是登陆页面');
});
router.use(function(req,res,next){
  var count = userDao.queryAll(req,res,next);
  next();
});
router.get('/query/addUser',function(req,res,next){
  userDao.queryAdd(req,res,next);
});
router.get('/query/BID',function(req,res,next){
  userDao.queryById(req,res,next);
});
router.get('/deleteUser',function(req,res,next){
  userDao.delete(req,res,next);
});
router.post('/add',function(req,res,next){
  userDao.insert(req,res,next);
});
router.all('/updateUser',function(req,res,next){
  userDao.update(req,res,next);
});
module.exports = router;
