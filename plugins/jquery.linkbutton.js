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
var _4=$.data(_2,"linkbutton").options;
if(_3){
$.extend(_4,_3);
}
if(_4.width||_4.height||_4.fit){
var _5=$("<div style=\"display:none\"></div>").insertBefore(_2);
var _6=$(_2);
var _7=_6.parent();
_6.appendTo("body");
_6._size(_4,_7);
var _8=_6.find(".l-btn-left");
_8.css("margin-top",parseInt((_6.height()-_8.height())/2)+"px");
_6.insertAfter(_5);
_5.remove();
}
};
function _9(_a){
var _b=$.data(_a,"linkbutton").options;
var t=$(_a).empty();
t.addClass("l-btn").removeClass("l-btn-plain l-btn-selected l-btn-plain-selected");
t.removeClass("l-btn-small l-btn-medium l-btn-large").addClass("l-btn-"+_b.size);
if(_b.plain){
t.addClass("l-btn-plain");
}
if(_b.selected){
t.addClass(_b.plain?"l-btn-selected l-btn-plain-selected":"l-btn-selected");
}
t.attr("group",_b.group||"");
t.attr("id",_b.id||"");
var _c=$("<span class=\"l-btn-left\"></span>").appendTo(t);
if(_b.text){
$("<span class=\"l-btn-text\"></span>").html(_b.text).appendTo(_c);
}else{
$("<span class=\"l-btn-text l-btn-empty\">&nbsp;</span>").appendTo(_c);
}
if(_b.iconCls){
$("<span class=\"l-btn-icon\">&nbsp;</span>").addClass(_b.iconCls).appendTo(_c);
_c.addClass("l-btn-icon-"+_b.iconAlign);
}
t.unbind(".linkbutton").bind("focus.linkbutton",function(){
if(!_b.disabled){
$(this).addClass("l-btn-focus");
}
}).bind("blur.linkbutton",function(){
$(this).removeClass("l-btn-focus");
}).bind("click.linkbutton",function(){
if(!_b.disabled){
if(_b.toggle){
if(_b.selected){
$(this).linkbutton("unselect");
}else{
$(this).linkbutton("select");
}
}
_b.onClick.call(this);
}
});
_d(_a,_b.selected);
_e(_a,_b.disabled);
};
function _d(_f,_10){
var _11=$.data(_f,"linkbutton").options;
if(_10){
if(_11.group){
$("a.l-btn[group=\""+_11.group+"\"]").each(function(){
var o=$(this).linkbutton("options");
if(o.toggle){
$(this).removeClass("l-btn-selected l-btn-plain-selected");
o.selected=false;
}
});
}
$(_f).addClass(_11.plain?"l-btn-selected l-btn-plain-selected":"l-btn-selected");
_11.selected=true;
}else{
if(!_11.group){
$(_f).removeClass("l-btn-selected l-btn-plain-selected");
_11.selected=false;
}
}
};
function _e(_12,_13){
var _14=$.data(_12,"linkbutton");
var _15=_14.options;
$(_12).removeClass("l-btn-disabled l-btn-plain-disabled");
if(_13){
_15.disabled=true;
var _16=$(_12).attr("href");
if(_16){
_14.href=_16;
$(_12).attr("href","javascript:void(0)");
}
if(_12.onclick){
_14.onclick=_12.onclick;
_12.onclick=null;
}
_15.plain?$(_12).addClass("l-btn-disabled l-btn-plain-disabled"):$(_12).addClass("l-btn-disabled");
}else{
_15.disabled=false;
if(_14.href){
$(_12).attr("href",_14.href);
}
if(_14.onclick){
_12.onclick=_14.onclick;
}
}
};
$.fn.linkbutton=function(_17,_18){
if(typeof _17=="string"){
return $.fn.linkbutton.methods[_17](this,_18);
}
_17=_17||{};
return this.each(function(){
var _19=$.data(this,"linkbutton");
if(_19){
$.extend(_19.options,_17);
}else{
$.data(this,"linkbutton",{options:$.extend({},$.fn.linkbutton.defaults,$.fn.linkbutton.parseOptions(this),_17)});
$(this).removeAttr("disabled");
$(this).bind("_resize",function(e,_1a){
if($(this).hasClass("easyui-fluid")||_1a){
_1(this);
}
return false;
});
}
_9(this);
_1(this);
});
};
$.fn.linkbutton.methods={options:function(jq){
return $.data(jq[0],"linkbutton").options;
},resize:function(jq,_1b){
return jq.each(function(){
_1(this,_1b);
});
},enable:function(jq){
return jq.each(function(){
_e(this,false);
});
},disable:function(jq){
return jq.each(function(){
_e(this,true);
});
},select:function(jq){
return jq.each(function(){
_d(this,true);
});
},unselect:function(jq){
return jq.each(function(){
_d(this,false);
});
}};
$.fn.linkbutton.parseOptions=function(_1c){
var t=$(_1c);
return $.extend({},$.parser.parseOptions(_1c,["id","iconCls","iconAlign","group","size",{plain:"boolean",toggle:"boolean",selected:"boolean"}]),{disabled:(t.attr("disabled")?true:undefined),text:$.trim(t.html()),iconCls:(t.attr("icon")||t.attr("iconCls"))});
};
$.fn.linkbutton.defaults={id:null,disabled:false,toggle:false,selected:false,group:null,plain:false,text:"",iconCls:null,iconAlign:"left",size:"small",onClick:function(){
}};
})(jQuery);

