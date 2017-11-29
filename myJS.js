$(function(){
  wraps();
})
//创建div
function wraps(){
  for(var i = 0 ; i<$('.filter_input').length ; i++){
    var id = $('.filter_input').eq(i).attr('id');
    var $width = $('.filter_input').eq(i).css("width");
    $('#' + id).wrap("<div class='filter_wrap' id='filter_wrap"+id+"'></div>");
  $('#' + id).after("<div style=\"width:" + $width + ";\" class='filter_case' id='filter_" + id + "'></div><span class='arrowTip'>▼</span>");
  } 
}
//动态数据
function getFilters(id,msg){
  var html = "";
    $.each(eval(msg), function (i, n) {
      for(key in n){
        html += "<div onclick=\"inme('" + n[key] + "')\"  class=\"div_item\">" + n[key] + "</div>";
      };
    });
  $('#filter_'+id).html(html);
  $('#filter_'+id).append("<div onclick='NothingClick()' class=\"Nothing\">无匹配项</div>");
}
//弹出列表框 
$(".filter_input").click(function() {
  $(".arrowTip").text("▼");
  $(".filter_case").hide();
  $("#filter_" + this.id).show();
  $("#filter_" + this.id).next().text("▲");
  return false;
});
//文本框输入 
$(".filter_input").keyup(function() {
  $("#filter_" + this.id).show(); //只要输入就显示列表框 
  if ($("#"+ this.id).val().length <= 0) {
    $("#filter_"+ this.id).find(".div_item").show(); //如果什么都没填，跳出，保持全部显示状态  
    return;
  }
  $("#filter_"+ this.id).find(".div_item").hide(); //如果填了，先将所有的选项隐藏  
  var num=0;
  for (var i = 0; i < $("#filter_"+ this.id).find(".div_item").length; i++) {
    //模糊匹配，将所有匹配项显示  
    if ($("#filter_"+ this.id).find(".div_item").eq(i).text().toLowerCase().indexOf($("#" + this.id).val().toLowerCase()) >= 0) {
      num++;
      $("#filter_"+ this.id).find(".div_item").eq(i).show();
      $('.Nothing').hide();
    }
  }
  if(num==0){
    $('.Nothing').show();
  }
});
//项点击  
function inme(name) {
   var event = event? event: window.event;      
    var srcObj = ((event.srcElement)?event.srcElement:event.target);       
  $(srcObj).parent().prev().val(name);
}; 
//无匹配项的点击
function NothingClick(){
  var event = event? event: window.event;      
    var srcObj = ((event.srcElement)?event.srcElement:event.target);   
  $(srcObj).parent().prev().val("");
  $('.Nothing').hide();
  $(".filter_case").hide();
  $(".div_item").show();
}
//隐藏列表框 
$("body").click(function() {
  $(".filter_case").hide();
  $(".arrowTip").text("▼");
});