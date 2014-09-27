/**
 * jQuery EasyUI 1.4
 * 
 * Copyright (c) 2009-2014 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */
(function($){
function _1(_2,_3){
var _4=$.data(_2,"calendar").options;
var t=$(_2);
if(_3){
$.extend(_4,{width:_3.width,height:_3.height});
}
t._size(_4,t.parent());
t.find(".calendar-body")._outerHeight(t.height()-t.find(".calendar-header")._outerHeight());
if(t.find(".calendar-menu").is(":visible")){
_5(_2);
}
};
function _6(_7){
$(_7).addClass("calendar").html("<div class=\"calendar-header\">"+"<div class=\"calendar-prevmonth\"></div>"+"<div class=\"calendar-nextmonth\"></div>"+"<div class=\"calendar-prevyear\"></div>"+"<div class=\"calendar-nextyear\"></div>"+"<div class=\"calendar-title\">"+"<span>Aprial 2010</span>"+"</div>"+"</div>"+"<div class=\"calendar-body\">"+"<div class=\"calendar-menu\">"+"<div class=\"calendar-menu-year-inner\">"+"<span class=\"calendar-menu-prev\"></span>"+"<span><input class=\"calendar-menu-year\" type=\"text\"></input></span>"+"<span class=\"calendar-menu-next\"></span>"+"</div>"+"<div class=\"calendar-menu-month-inner\">"+"</div>"+"</div>"+"</div>");
$(_7).find(".calendar-title span").hover(function(){
$(this).addClass("calendar-menu-hover");
},function(){
$(this).removeClass("calendar-menu-hover");
}).click(function(){
var _8=$(_7).find(".calendar-menu");
if(_8.is(":visible")){
_8.hide();
}else{
_5(_7);
}
});
$(".calendar-prevmonth,.calendar-nextmonth,.calendar-prevyear,.calendar-nextyear",_7).hover(function(){
$(this).addClass("calendar-nav-hover");
},function(){
$(this).removeClass("calendar-nav-hover");
});
$(_7).find(".calendar-nextmonth").click(function(){
_a(_7,1);
});
$(_7).find(".calendar-prevmonth").click(function(){
_a(_7,-1);
});
$(_7).find(".calendar-nextyear").click(function(){
_10(_7,1);
});
$(_7).find(".calendar-prevyear").click(function(){
_10(_7,-1);
});
$(_7).bind("_resize",function(e,_9){
if($(this).hasClass("easyui-fluid")||_9){
_1(_7);
}
return false;
});
};
function _a(_b,_c){
var _d=$.data(_b,"calendar").options;
_d.month+=_c;
if(_d.month>12){
_d.year++;
_d.month=1;
}else{
if(_d.month<1){
_d.year--;
_d.month=12;
}
}
_e(_b);
var _f=$(_b).find(".calendar-menu-month-inner");
_f.find("td.calendar-selected").removeClass("calendar-selected");
_f.find("td:eq("+(_d.month-1)+")").addClass("calendar-selected");
};
function _10(_11,_12){
var _13=$.data(_11,"calendar").options;
_13.year+=_12;
_e(_11);
var _14=$(_11).find(".calendar-menu-year");
_14.val(_13.year);
};
function _5(_15){
var _16=$.data(_15,"calendar").options;
$(_15).find(".calendar-menu").show();
if($(_15).find(".calendar-menu-month-inner").is(":empty")){
$(_15).find(".calendar-menu-month-inner").empty();
var t=$("<table class=\"calendar-mtable\"></table>").appendTo($(_15).find(".calendar-menu-month-inner"));
var idx=0;
for(var i=0;i<3;i++){
var tr=$("<tr></tr>").appendTo(t);
for(var j=0;j<4;j++){
$("<td class=\"calendar-menu-month\"></td>").html(_16.months[idx++]).attr("abbr",idx).appendTo(tr);
}
}
$(_15).find(".calendar-menu-prev,.calendar-menu-next").hover(function(){
$(this).addClass("calendar-menu-hover");
},function(){
$(this).removeClass("calendar-menu-hover");
});
$(_15).find(".calendar-menu-next").click(function(){
var y=$(_15).find(".calendar-menu-year");
if(!isNaN(y.val())){
y.val(parseInt(y.val())+1);
_17();
}
});
$(_15).find(".calendar-menu-prev").click(function(){
var y=$(_15).find(".calendar-menu-year");
if(!isNaN(y.val())){
y.val(parseInt(y.val()-1));
_17();
}
});
$(_15).find(".calendar-menu-year").keypress(function(e){
if(e.keyCode==13){
_17(true);
}
});
$(_15).find(".calendar-menu-month").hover(function(){
$(this).addClass("calendar-menu-hover");
},function(){
$(this).removeClass("calendar-menu-hover");
}).click(function(){
var _18=$(_15).find(".calendar-menu");
_18.find(".calendar-selected").removeClass("calendar-selected");
$(this).addClass("calendar-selected");
_17(true);
});
}
function _17(_19){
var _1a=$(_15).find(".calendar-menu");
var _1b=_1a.find(".calendar-menu-year").val();
var _1c=_1a.find(".calendar-selected").attr("abbr");
if(!isNaN(_1b)){
_16.year=parseInt(_1b);
_16.month=parseInt(_1c);
_e(_15);
}
if(_19){
_1a.hide();
}
};
var _1d=$(_15).find(".calendar-body");
var _1e=$(_15).find(".calendar-menu");
var _1f=_1e.find(".calendar-menu-year-inner");
var _20=_1e.find(".calendar-menu-month-inner");
_1f.find("input").val(_16.year).focus();
_20.find("td.calendar-selected").removeClass("calendar-selected");
_20.find("td:eq("+(_16.month-1)+")").addClass("calendar-selected");
_1e._outerWidth(_1d._outerWidth());
_1e._outerHeight(_1d._outerHeight());
_20._outerHeight(_1e.height()-_1f._outerHeight());
};
function _21(_22,_23,_24){
var _25=$.data(_22,"calendar").options;
var _26=[];
var _27=new Date(_23,_24,0).getDate();
for(var i=1;i<=_27;i++){
_26.push([_23,_24,i]);
}
var _28=[],_29=[];
var _2a=-1;
while(_26.length>0){
var _2b=_26.shift();
_29.push(_2b);
var day=new Date(_2b[0],_2b[1]-1,_2b[2]).getDay();
if(_2a==day){
day=0;
}else{
if(day==(_25.firstDay==0?7:_25.firstDay)-1){
_28.push(_29);
_29=[];
}
}
_2a=day;
}
if(_29.length){
_28.push(_29);
}
var _2c=_28[0];
if(_2c.length<7){
while(_2c.length<7){
var _2d=_2c[0];
var _2b=new Date(_2d[0],_2d[1]-1,_2d[2]-1);
_2c.unshift([_2b.getFullYear(),_2b.getMonth()+1,_2b.getDate()]);
}
}else{
var _2d=_2c[0];
var _29=[];
for(var i=1;i<=7;i++){
var _2b=new Date(_2d[0],_2d[1]-1,_2d[2]-i);
_29.unshift([_2b.getFullYear(),_2b.getMonth()+1,_2b.getDate()]);
}
_28.unshift(_29);
}
var _2e=_28[_28.length-1];
while(_2e.length<7){
var _2f=_2e[_2e.length-1];
var _2b=new Date(_2f[0],_2f[1]-1,_2f[2]+1);
_2e.push([_2b.getFullYear(),_2b.getMonth()+1,_2b.getDate()]);
}
if(_28.length<6){
var _2f=_2e[_2e.length-1];
var _29=[];
for(var i=1;i<=7;i++){
var _2b=new Date(_2f[0],_2f[1]-1,_2f[2]+i);
_29.push([_2b.getFullYear(),_2b.getMonth()+1,_2b.getDate()]);
}
_28.push(_29);
}
return _28;
};
function _e(_30){
var _31=$.data(_30,"calendar").options;
if(_31.current&&!_31.validator.call(_30,_31.current)){
_31.current=null;
}
var now=new Date();
var _32=now.getFullYear()+","+(now.getMonth()+1)+","+now.getDate();
var _33=_31.current?(_31.current.getFullYear()+","+(_31.current.getMonth()+1)+","+_31.current.getDate()):"";
var _34=6-_31.firstDay;
var _35=_34+1;
if(_34>=7){
_34-=7;
}
if(_35>=7){
_35-=7;
}
$(_30).find(".calendar-title span").html(_31.months[_31.month-1]+" "+_31.year);
var _36=$(_30).find("div.calendar-body");
_36.children("table").remove();
var _37=["<table class=\"calendar-dtable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\">"];
_37.push("<thead><tr>");
for(var i=_31.firstDay;i<_31.weeks.length;i++){
_37.push("<th>"+_31.weeks[i]+"</th>");
}
for(var i=0;i<_31.firstDay;i++){
_37.push("<th>"+_31.weeks[i]+"</th>");
}
_37.push("</tr></thead>");
_37.push("<tbody>");
var _38=_21(_30,_31.year,_31.month);
for(var i=0;i<_38.length;i++){
var _39=_38[i];
var cls="";
if(i==0){
cls="calendar-first";
}else{
if(i==_38.length-1){
cls="calendar-last";
}
}
_37.push("<tr class=\""+cls+"\">");
for(var j=0;j<_39.length;j++){
var day=_39[j];
var s=day[0]+","+day[1]+","+day[2];
var _3a=new Date(day[0],parseInt(day[1])-1,day[2]);
var d=_31.formatter.call(_30,_3a);
var css=_31.styler.call(_30,_3a);
var _3b="";
var _3c="";
if(typeof css=="string"){
_3c=css;
}else{
if(css){
_3b=css["class"]||"";
_3c=css["style"]||"";
}
}
var cls="calendar-day";
if(!(_31.year==day[0]&&_31.month==day[1])){
cls+=" calendar-other-month";
}
if(s==_32){
cls+=" calendar-today";
}
if(s==_33){
cls+=" calendar-selected";
}
if(j==_34){
cls+=" calendar-saturday";
}else{
if(j==_35){
cls+=" calendar-sunday";
}
}
if(j==0){
cls+=" calendar-first";
}else{
if(j==_39.length-1){
cls+=" calendar-last";
}
}
cls+=" "+_3b;
if(!_31.validator.call(_30,_3a)){
cls+=" calendar-disabled";
}
_37.push("<td class=\""+cls+"\" abbr=\""+s+"\" style=\""+_3c+"\">"+d+"</td>");
}
_37.push("</tr>");
}
_37.push("</tbody>");
_37.push("</table>");
_36.append(_37.join(""));
var t=_36.children("table.calendar-dtable").prependTo(_36);
t.find("td.calendar-day:not(.calendar-disabled)").hover(function(){
$(this).addClass("calendar-hover");
},function(){
$(this).removeClass("calendar-hover");
}).click(function(){
var _3d=_31.current;
t.find(".calendar-selected").removeClass("calendar-selected");
$(this).addClass("calendar-selected");
var _3e=$(this).attr("abbr").split(",");
_31.current=new Date(_3e[0],parseInt(_3e[1])-1,_3e[2]);
_31.onSelect.call(_30,_31.current);
if(!_3d||_3d.getTime()!=_31.current.getTime()){
_31.onChange.call(_30,_31.current,_3d);
}
});
};
$.fn.calendar=function(_3f,_40){
if(typeof _3f=="string"){
return $.fn.calendar.methods[_3f](this,_40);
}
_3f=_3f||{};
return this.each(function(){
var _41=$.data(this,"calendar");
if(_41){
$.extend(_41.options,_3f);
}else{
_41=$.data(this,"calendar",{options:$.extend({},$.fn.calendar.defaults,$.fn.calendar.parseOptions(this),_3f)});
_6(this);
}
if(_41.options.border==false){
$(this).addClass("calendar-noborder");
}
_1(this);
_e(this);
$(this).find("div.calendar-menu").hide();
});
};
$.fn.calendar.methods={options:function(jq){
return $.data(jq[0],"calendar").options;
},resize:function(jq,_42){
return jq.each(function(){
_1(this,_42);
});
},moveTo:function(jq,_43){
return jq.each(function(){
var _44=$(this).calendar("options");
if(_44.validator.call(this,_43)){
var _45=_44.current;
$(this).calendar({year:_43.getFullYear(),month:_43.getMonth()+1,current:_43});
if(!_45||_45.getTime()!=_43.getTime()){
_44.onChange.call(this,_44.current,_45);
}
}
});
}};
$.fn.calendar.parseOptions=function(_46){
var t=$(_46);
return $.extend({},$.parser.parseOptions(_46,[{firstDay:"number",fit:"boolean",border:"boolean"}]));
};
$.fn.calendar.defaults={width:180,height:180,fit:false,border:true,firstDay:0,weeks:["S","M","T","W","T","F","S"],months:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],year:new Date().getFullYear(),month:new Date().getMonth()+1,current:(function(){
var d=new Date();
return new Date(d.getFullYear(),d.getMonth(),d.getDate());
})(),formatter:function(_47){
return _47.getDate();
},styler:function(_48){
return "";
},validator:function(_49){
return true;
},onSelect:function(_4a){
},onChange:function(_4b,_4c){
}};
})(jQuery);

