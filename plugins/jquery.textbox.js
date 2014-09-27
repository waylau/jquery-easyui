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
function _1(_2){
$(_2).addClass("textbox-f").hide();
var _3=$("<span class=\"textbox\">"+"<input class=\"textbox-text\" autocomplete=\"off\">"+"<span class=\"textbox-addon\"><span class=\"textbox-icon\"></span></span>"+"<input type=\"hidden\" class=\"textbox-value\">"+"</span>").insertAfter(_2);
var _4=$(_2).attr("name");
if(_4){
_3.find("input.textbox-value").attr("name",_4);
$(_2).removeAttr("name").attr("textboxName",_4);
}
_3.bind("_resize",function(e,_5){
if($(this).hasClass("easyui-fluid")||_5){
_6(_2);
}
return false;
});
return _3;
};
function _7(_8){
var _9=$.data(_8,"textbox");
var _a=_9.options;
var tb=_9.textbox;
tb.find(".textbox-text").remove();
if(_a.multiline){
$("<textarea class=\"textbox-text\" autocomplete=\"off\"></textarea>").prependTo(tb);
}else{
$("<input type=\""+_a.type+"\" class=\"textbox-text\" autocomplete=\"off\">").prependTo(tb);
}
tb.find(".textbox-addon").remove();
var bb=_a.icons?$.extend(true,[],_a.icons):[];
if(_a.iconCls){
bb.push({iconCls:_a.iconCls,disabled:true});
}
if(bb.length){
var bc=$("<span class=\"textbox-addon\"></span>").prependTo(tb);
bc.addClass("textbox-addon-"+_a.iconAlign);
for(var i=0;i<bb.length;i++){
bc.append("<a href=\"javascript:void(0)\" class=\"textbox-icon "+bb[i].iconCls+"\" icon-index=\""+i+"\"></a>");
}
}
tb.find(".textbox-button").remove();
if(_a.buttonText||_a.buttonIcon){
var _b=$("<a href=\"javascript:void(0)\" class=\"textbox-button\"></a>").prependTo(tb);
_b.addClass("textbox-button-"+_a.buttonAlign).linkbutton({text:_a.buttonText,iconCls:_a.buttonIcon,onClick:function(){
_a.onClickButton.call(_8);
}});
}
_c(_8,_a.disabled);
_d(_8,_a.readonly);
};
function _e(_f){
var tb=$.data(_f,"textbox").textbox;
tb.find(".textbox-text").validatebox("destroy");
tb.remove();
$(_f).remove();
};
function _6(_10,_11){
var _12=$.data(_10,"textbox");
var _13=_12.options;
var tb=_12.textbox;
var _14=tb.parent();
if(_11){
_13.width=_11;
}
if(isNaN(parseInt(_13.width))){
var c=$(_10).clone();
c.css("visibility","hidden");
c.insertAfter(_10);
_13.width=c.outerWidth();
c.remove();
}
tb.appendTo("body");
var _15=tb.find(".textbox-text");
var btn=tb.find(".textbox-button");
var _16=tb.find(".textbox-addon");
var _17=_16.find(".textbox-icon");
tb._size(_13,_14);
btn.linkbutton("resize",{height:tb.height()});
btn.css({left:(_13.buttonAlign=="left"?0:""),right:(_13.buttonAlign=="right"?0:"")});
_16.css({left:(_13.iconAlign=="left"?(_13.buttonAlign=="left"?btn._outerWidth():0):""),right:(_13.iconAlign=="right"?(_13.buttonAlign=="right"?btn._outerWidth():0):"")});
_17.css({width:_13.iconWidth+"px",height:tb.height()+"px"});
_15.css({paddingLeft:(_10.style.paddingLeft||""),paddingRight:(_10.style.paddingRight||""),marginLeft:_18("left"),marginRight:_18("right")});
if(_13.multiline){
_15.css({paddingTop:(_10.style.paddingTop||""),paddingBottom:(_10.style.paddingBottom||"")});
_15._outerHeight(tb.height());
}else{
var _19=Math.floor((tb.height()-_15.height())/2);
_15.css({paddingTop:_19+"px",paddingBottom:_19+"px"});
}
_15._outerWidth(tb.width()-_17.length*_13.iconWidth-btn._outerWidth());
tb.insertAfter(_10);
_13.onResize.call(_10,_13.width,_13.height);
function _18(_1a){
return (_13.iconAlign==_1a?_16._outerWidth():0)+(_13.buttonAlign==_1a?btn._outerWidth():0);
};
};
function _1b(_1c){
var _1d=$(_1c).textbox("options");
var _1e=$(_1c).textbox("textbox");
_1e.validatebox($.extend({},_1d,{deltaX:$(_1c).textbox("getTipX"),onBeforeValidate:function(){
var box=$(this);
if(!box.is(":focus")){
_1d.oldInputValue=box.val();
box.val(_1d.value);
}
},onValidate:function(_1f){
var box=$(this);
if(_1d.oldInputValue!=undefined){
box.val(_1d.oldInputValue);
_1d.oldInputValue=undefined;
}
var tb=box.parent();
if(_1f){
tb.removeClass("textbox-invalid");
}else{
tb.addClass("textbox-invalid");
}
}}));
};
function _20(_21){
var _22=$.data(_21,"textbox");
var _23=_22.options;
var tb=_22.textbox;
var _24=tb.find(".textbox-text");
_24.attr("placeholder",_23.prompt);
_24.unbind(".textbox");
if(!_23.disabled&&!_23.readonly){
_24.bind("blur.textbox",function(e){
if(!tb.hasClass("textbox-focused")){
return;
}
_23.value=$(this).val();
if(_23.value==""){
$(this).val(_23.prompt).addClass("textbox-prompt");
}else{
$(this).removeClass("textbox-prompt");
}
tb.removeClass("textbox-focused");
}).bind("focus.textbox",function(e){
if($(this).val()!=_23.value){
$(this).val(_23.value);
}
$(this).removeClass("textbox-prompt");
tb.addClass("textbox-focused");
});
for(var _25 in _23.inputEvents){
_24.bind(_25+".textbox",{target:_21},_23.inputEvents[_25]);
}
}
var _26=tb.find(".textbox-addon");
_26.unbind().bind("click",{target:_21},function(e){
var _27=$(e.target).closest("a.textbox-icon:not(.textbox-icon-disabled)");
if(_27.length){
var _28=parseInt(_27.attr("icon-index"));
var _29=_23.icons[_28];
if(_29&&_29.handler){
_29.handler.call(_27[0],e);
_23.onClickIcon.call(_21,_28);
}
}
});
_26.find(".textbox-icon").each(function(_2a){
var _2b=_23.icons[_2a];
var _2c=$(this);
if(!_2b||_2b.disabled||_23.disabled||_23.readonly){
_2c.addClass("textbox-icon-disabled");
}else{
_2c.removeClass("textbox-icon-disabled");
}
});
tb.find(".textbox-button").linkbutton((_23.disabled||_23.readonly)?"disable":"enable");
};
function _c(_2d,_2e){
var _2f=$.data(_2d,"textbox");
var _30=_2f.options;
var tb=_2f.textbox;
if(_2e){
_30.disabled=true;
$(_2d).attr("disabled","disabled");
tb.find(".textbox-text,.textbox-value").attr("disabled","disabled");
}else{
_30.disabled=false;
$(_2d).removeAttr("disabled");
tb.find(".textbox-text,.textbox-value").removeAttr("disabled");
}
};
function _d(_31,_32){
var _33=$.data(_31,"textbox");
var _34=_33.options;
_34.readonly=_32==undefined?true:_32;
var _35=_33.textbox.find(".textbox-text");
_35.removeAttr("readonly").removeClass("textbox-text-readonly");
if(_34.readonly||!_34.editable){
_35.attr("readonly","readonly").addClass("textbox-text-readonly");
}
};
$.fn.textbox=function(_36,_37){
if(typeof _36=="string"){
var _38=$.fn.textbox.methods[_36];
if(_38){
return _38(this,_37);
}else{
return this.each(function(){
var _39=$(this).textbox("textbox");
_39.validatebox(_36,_37);
});
}
}
_36=_36||{};
return this.each(function(){
var _3a=$.data(this,"textbox");
if(_3a){
$.extend(_3a.options,_36);
if(_36.value!=undefined){
_3a.options.originalValue=_36.value;
}
}else{
_3a=$.data(this,"textbox",{options:$.extend({},$.fn.textbox.defaults,$.fn.textbox.parseOptions(this),_36),textbox:_1(this)});
_3a.options.originalValue=_3a.options.value;
}
_7(this);
_20(this);
_6(this);
_1b(this);
$(this).textbox("initValue",_3a.options.value);
});
};
$.fn.textbox.methods={options:function(jq){
return $.data(jq[0],"textbox").options;
},textbox:function(jq){
return $.data(jq[0],"textbox").textbox.find(".textbox-text");
},button:function(jq){
return $.data(jq[0],"textbox").textbox.find(".textbox-button");
},destroy:function(jq){
return jq.each(function(){
_e(this);
});
},resize:function(jq,_3b){
return jq.each(function(){
_6(this,_3b);
});
},disable:function(jq){
return jq.each(function(){
_c(this,true);
_20(this);
});
},enable:function(jq){
return jq.each(function(){
_c(this,false);
_20(this);
});
},readonly:function(jq,_3c){
return jq.each(function(){
_d(this,_3c);
_20(this);
});
},isValid:function(jq){
return jq.textbox("textbox").validatebox("isValid");
},clear:function(jq){
return jq.each(function(){
$(this).textbox("setValue","");
});
},setText:function(jq,_3d){
return jq.each(function(){
var _3e=$(this).textbox("options");
var _3f=$(this).textbox("textbox");
if($(this).textbox("getText")!=_3d){
_3e.value=_3d;
_3f.val(_3d);
}
if(!_3f.is(":focus")){
if(_3d){
_3f.removeClass("textbox-prompt");
}else{
_3f.val(_3e.prompt).addClass("textbox-prompt");
}
}
$(this).textbox("validate");
});
},initValue:function(jq,_40){
return jq.each(function(){
var _41=$.data(this,"textbox");
_41.options.value="";
$(this).textbox("setText",_40);
_41.textbox.find(".textbox-value").val(_40);
$(this).val(_40);
});
},setValue:function(jq,_42){
return jq.each(function(){
var _43=$.data(this,"textbox").options;
var _44=$(this).textbox("getValue");
$(this).textbox("initValue",_42);
if(_44!=_42){
_43.onChange.call(this,_42,_44);
}
});
},getText:function(jq){
var _45=jq.textbox("textbox");
if(_45.is(":focus")){
return _45.val();
}else{
return jq.textbox("options").value;
}
},getValue:function(jq){
return jq.data("textbox").textbox.find(".textbox-value").val();
},reset:function(jq){
return jq.each(function(){
var _46=$(this).textbox("options");
$(this).textbox("setValue",_46.originalValue);
});
},getIcon:function(jq,_47){
return jq.data("textbox").textbox.find(".textbox-icon:eq("+_47+")");
},getTipX:function(jq){
var _48=jq.data("textbox");
var _49=_48.options;
var tb=_48.textbox;
var _4a=tb.find(".textbox-text");
var _4b=tb.find(".textbox-addon")._outerWidth();
var _4c=tb.find(".textbox-button")._outerWidth();
if(_49.tipPosition=="right"){
return (_49.iconAlign=="right"?_4b:0)+(_49.buttonAlign=="right"?_4c:0)+1;
}else{
if(_49.tipPosition=="left"){
return (_49.iconAlign=="left"?-_4b:0)+(_49.buttonAlign=="left"?-_4c:0)-1;
}else{
return _4b/2*(_49.iconAlign=="right"?1:-1);
}
}
}};
$.fn.textbox.parseOptions=function(_4d){
var t=$(_4d);
return $.extend({},$.fn.validatebox.parseOptions(_4d),$.parser.parseOptions(_4d,["prompt","iconCls","iconAlign","buttonText","buttonIcon","buttonAlign",{multiline:"boolean",editable:"boolean",iconWidth:"number"}]),{value:(t.val()||undefined),type:(t.attr("type")?t.attr("type"):undefined),disabled:(t.attr("disabled")?true:undefined),readonly:(t.attr("readonly")?true:undefined)});
};
$.fn.textbox.defaults=$.extend({},$.fn.validatebox.defaults,{width:"auto",height:22,prompt:"",value:"",type:"text",multiline:false,editable:true,disabled:false,readonly:false,icons:[],iconCls:null,iconAlign:"right",iconWidth:18,buttonText:"",buttonIcon:null,buttonAlign:"right",inputEvents:{blur:function(e){
var t=$(e.data.target);
var _4e=t.textbox("options");
t.textbox("setValue",_4e.value);
}},onChange:function(_4f,_50){
},onResize:function(_51,_52){
},onClickButton:function(){
},onClickIcon:function(_53){
}});
})(jQuery);

