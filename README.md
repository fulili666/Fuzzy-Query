文本框模糊匹配(纯html+css+jquery简单实现) ，自己写的一个小组件。

## 链接

- [demo地址](https://htmlpreview.github.io/?https://github.com/zc95/Fuzzy-Query/blob/master/index.html)
- [github地址](https://github.com/zc95/Fuzzy-Query)



## 开始使用

1. 引入`css`和`js`（github里面有）
2. 给需要加模糊查询的input加上`class="filter_input"`，id必需
3. getFilters(id, msg);（前面一个参数是input的id，后面一个参数是后台返的json字符串）



## JS主要代码

**创建需要的div包裹住文本框**

```javascript
function wraps(){
  for(var i = 0 ; i<$('.filter_input').length ; i++){
    var id = $('.filter_input').eq(i).attr('id');
    var $width = $('.filter_input').eq(i).css("width");
    $('#' + id).wrap("<div class='filter_wrap' id='filter_wrap"+id+"'></div>");
  $('#' + id).after("<div style=\"width:" + $width + ";\" class='filter_case' id='filter_" + id + "'></div><span class='arrowTip'>▼</span>");
  } 
}
```



**根据后台返回的数据加载数据**

```javascript
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
```



**弹出列表框**

```javascript
$(".filter_input").click(function() {
  $(".arrowTip").text("▼");
  $(".filter_case").hide();
  $("#filter_" + this.id).show();
  $("#filter_" + this.id).next().text("▲");
  return false;
});
```



**监听文本框输入**

```javascript
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
```



**模糊项的点击**

```javascript
function inme(name) {
   var event = event? event: window.event;      
    var srcObj = ((event.srcElement)?event.srcElement:event.target);       
  $(srcObj).parent().prev().val(name);
}; 
```



**点击无匹配**

```javascript
function NothingClick(){
  var event = event? event: window.event;      
    var srcObj = ((event.srcElement)?event.srcElement:event.target);   
  $(srcObj).parent().prev().val("");
  $('.Nothing').hide();
  $(".filter_case").hide();
  $(".div_item").show();
}
```



**隐藏列表框**

```javascript
$("body").click(function() {
  $(".filter_case").hide();
  $(".arrowTip").text("▼");
});
```



## CSS主要代码

```css
.filter_wrap{
  display:inline-block;
  position:relative;
}
.arrowTip{
  position:absolute;
  right:5px;
  top:4px;
  color:#c2c2c2;
  font-size:13px;
}
.Nothing{
  height: 30px;
  width: 260px;
  line-height: 30px;
  font-size: 14px;
  text-align:center;
  color:#999;
  display:none;
  cursor:pointer;
}
.filter_case {
  padding:4px 0px 4px 0px;
  position: absolute;
  z-index: 100;
  height:auto;
  max-height: 200px;
  border: 1px solid #999;
  box-sizing:border-box;
  overflow-x: hidden;
  display: none;
  background-color: white;
  margin-top:3px;
  box-shadow: 0 4px 6px rgba(0,0,0,.24);
  border-radius: 2px;
}

.div_item {
  text-indent: 8px;
  height: 30px;
  width: 260px;
  white-space: nowrap;
  line-height: 30px;
  font-size: 13px;
}

.div_item:hover {
  cursor: pointer;
  background-color: #1C86EE;
  color: white;
}
input {
  text-indent: 8px;
  box-sizing:border-box;
  outline: none;
  border:1px solid #999 !important;
  text-indent: 8px;
  height: 30px;
  width: 258px;
  box-sizing:border-box;
  -moz-box-sizing:border-box; /* Firefox */
  -webkit-box-sizing:border-box; /* Safari */
  outline: none;
  border-radius: 2px;
}
```



## html和CSS部分的一些细节

1. > outline: none;  
   >
   > outline （轮廓）是绘制于元素周围的一条线，位于边框边缘的外围，为了美观应该去掉

2. > box-sizing:border-box;
   >
   > 这可令浏览器呈现出带有指定宽度和高度的框，并把边框和内边距放入框中。

3. > autocomplete="off"
   >
   > autocomplete是form表单的属性，默认为on，其含义代表是否让浏览器自动记录之前输入的值，应该关闭记录



