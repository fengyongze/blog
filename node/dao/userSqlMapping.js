var user = {
  insert:'INSERT INTO articles(id,date,title,content,BID) VALUES(null,?,?,?,?)',
  update:'update articles set date=?,title=?,content=? where id=?',
  delete:'delete from articles where BID=?',
  queryById:'select * from articles where BID =?',
  queryAll:'select *from articles'
};
module.exports= user;
