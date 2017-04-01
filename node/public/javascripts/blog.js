
//点击更新按钮
function dateForm(time){
  var date = new Date($.trim(time)),
  hour = date.getHours(),
  minute = date.getMinutes(),
  secound = date.getSeconds(),
  years = date.getFullYear(),
  month = date.getMonth()+1,
  day = date.getDate();
  if(month<10){
    month="0"+month;
  }
  if(day<10){
    day="0"+day;
  }
  date=years+"-"+month+"-"+day+" "+hour+":"+minute+":"+secound;
  return date;
}
$("#update").on("click",function(){
  var list = [];
  var title = $.trim($("#title").val());
  var id = $(".content").attr("data");
  var content = $.trim($(".content").val());
  obj={
    id:id,
    content:content,
    title:title,
    date:dateForm($("#date").val())
  };
  console.log(obj);
  $.ajax({
    url:"http://localhost:3000/account/updateUser",
    dataType:"json",
    type:"post",
    data:{article:obj},
    success:function(data){
      console.log(data);
    }
  });
});
$("#addColumn").on("click",function(){
  var id = parseInt($(".content:last").attr("data"))+1;
  $(".contentBox").append(`<div class="row blog-row">
            <div class="col-md-10 col-lg-10">
              <textarea class="form-control content">
              </textarea>
            </div>
          </div>`);
});
$("#add").on("click",function(){
  var title = $.trim($("#title").val());
  var BID = $.trim($(".blog-row").attr("data"));
  var obj = {};
  var id = $(this).attr("data");
  var content = $.trim($(".content").val());
  obj={
    id:id,
    content:content,
    title:title,
    BID:BID,
    date:dateForm($("#date").val())
  };
  $.ajax({
    url:"http://localhost:3000/account/add",
    dataType:"json",
    type:"post",
    data:{article:obj},
    success:function(data){
      console.log(data);
    }
  });
});
$(".form-datetime").datetimepicker({
  language: 'zh-CN',
  weekStart: 1,
  todayBtn: 1,
  autoclose: 1,
  todayHighlight: 1,
  startView: 2,
  forceParse: 0,
  showMeridian: 1
});
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});
$(".content").on('input propertychange',function(){
  mark()
});
function mark(){
  $(".mark").html(marked($(".content").val()));
  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
}
mark();
