var mysql = require('mysql');
var $sql = require('./userSqlMapping');
var pool = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'',
    database:'blog',
    port:3306
  });
var headerWrite = function(req,res,ret){
  var count=[];
  for(var i=ret;i--;i>0){
    count.push(i+1);
  }
  req.count=count;
};
var bodyWrite = function(req,res,ret){
  ret.count=req.count;
  res.render('default.hbs',{data:ret});
};
var jsonWrite = function (res,ret){
  if(typeof ret === 'undefined'){
    res.json({
      code:'1',
      msg:'操作失败',
      data:[]
    });
  }else{
    res.json({
      code:'0',
      msg:'获取成功',
      data:ret
    });
  }
};
module.exports = {
  queryAll:function(req,res,next){
      pool.getConnection(function(err,connection){
        connection.query($sql.queryAll,function(err,result){
          //获取BID的数量
          var BID_lsit=result[result.length-1].BID;
          headerWrite(req,res,BID_lsit);
        });
        connection.release();
      });
  },
  queryAdd:function(req,res,next){
    pool.getConnection(function(err,connection){
      connection.query($sql.queryAll,function(err,result){
        //把获取的数据堆进数据
        var BID=req.count[0]+1;
        obj={
          title:null,
          date:null,
          contents:null,
          BID:BID
        };
        bodyWrite(req,res,obj);
        connection.release();
      });
    });
  },
  //增加
  insert:function(req,res,next){
    var param = req.body.article;
    var promise = new Promise(function(resolve,reject){
      pool.getConnection(function(err,connection){
        connection.query($sql.insert,[param.date,param.title,param.content,param.BID],function(err,result){
          if(result){
            resolve();
          }
          connection.release();
        });
      });
    });
    promise.then(function(){
      result={
        code:200,
        msg:'增加成功'
      };
      jsonWrite(res,result);
    });
  },
  delete:function(req,res,next){
    pool.getConnection(function(err,connection){
      var id = +req.query.id;
      connection.query($sql.delete,id,function(err,result){
          if(result.affectedRows>0){
            result={
              code:200,
              msg:'删除成功'
            };
          }else{
            result = void 0;
          }
          jsonWrite(res,result);
          connection.release();
      });
    });
  },
  update:function(req,res,next){
    var param=req.body.article;
    console.log(param);
    var promise = new Promise(function(resolve,reject){
      //检查数据是否为空
      if(param.id==null||param.content==null||param.title==null||param.date==null){
        reject();
        return;
      }
      pool.getConnection(function(err,connection){
        connection.query($sql.update,[param.date,param.title,param.content,param.id],function(err,result){
          if(result.affectedRows > 0){
            resolve();
          }
          connection.release();
        });
      });
    });
    promise.then(function(){
      updateRet={
          code:200,
          msg:'增加成功'
      };
      jsonWrite(res,updateRet);
    },function(){
      jsonWrite(res,undefined);
    });
  },
  queryById:function(req,res,next){
    var BID = +req.query.BID;
    pool.getConnection(function(err,connection){
      connection.query($sql.queryById,BID,function(err,result){
        //把获取的数据堆进数据
        var list=[];
        result.forEach(function(value,index,array){
          var content= {};
          content.content=value.content;
          content.id=value.id;
          list.push(content);
        });
        obj={
          title:result[0].title,
          date:result[0].date,
          contents:list
        };
        bodyWrite(req,res,obj);
        connection.release();
      });
    });
  }
};
