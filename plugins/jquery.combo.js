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
var _3=$.data(_2,"combo");
var _4=_3.options;
if(!_3.panel){
_3.panel=$("<div class=\"combo-panel\"></div>").appendTo("body");
_3.panel.panel({minWidth:_4.panelMinWidth,maxWidth:_4.panelMaxWidth,minHeight:_4.panelMinHeight,maxHeight:_4.panelMaxHeight,doSize:false,closed:true,cls:"combo-p",style:{position:"absolute",zIndex:10},onOpen:function(){
var p=$(this).panel("panel");
if($.fn.menu){
p.css("z-index",$.fn.menu.defaults.zIndex++);
}else{
if($.fn.window){
p.css("z-index",$.fn.window.defaults.zIndex++);
}
}
$(this).panel("resize");
},onBeforeClose:function(){
_e(this);
},onClose:function(){
var _5=$.data(_2,"combo");
if(_5){
_5.options.onHidePanel.call(_2);
}
}});
}
var _6=$.extend(true,[],_4.icons);
if(_4.hasDownArrow){
_6.push({iconCls:"combo-arrow",handler:function(e){
_a(e.data.target);
}});
}
$(_2).addClass("combo-f").textbox($.extend({},_4,{icons:_6,onChange:function(){
}}));
$(_2).attr("comboName",$(_2).attr("textboxName"));
_3.combo=$(_2).next();
_3.combo.addClass("combo");
};
function _7(_8){
var _9=$.data(_8,"combo");
_9.panel.panel("destroy");
$(_8).textbox("destroy");
};
function _a(_b){
var _c=$.data(_b,"combo").panel;
if(_c.is(":visible")){
_d(_b);
}else{
var p=$(_b).closest("div.combo-panel");
$("div.combo-panel:visible").not(_c).not(p).panel("close");
$(_b).combo("showPanel");
}
$(_b).combo("textbox").focus();
};
function _e(_f){
$(_f).find(".combo-f").each(function(){
var p=$(this).combo("panel");
if(p.is(":visible")){
p.panel("close");
}
});
};
function _10(_11){
$(document).unbind(".combo").bind("mousedown.combo",function(e){
var p=$(e.target).closest("span.combo,div.combo-p");
if(p.length){
_e(p);
return;
}
$("body>div.combo-p>div.combo-panel:visible").panel("close");
});
};
function _12(e){
var _13=e.data.target;
var _14=$.data(_13,"combo");
var _15=_14.options;
var _16=_14.panel;
if(!_15.editable){
_a(_13);
}else{
var p=$(_13).closest("div.combo-panel");
$("div.combo-panel:visible").not(_16).not(p).panel("close");
}
};
function _17(e){
var _18=e.data.target;
var t=$(_18);
var _19=t.data("combo");
var _1a=t.combo("options");
switch(e.keyCode){
case 38:
_1a.keyHandler.up.call(_18,e);
break;
case 40:
_1a.keyHandler.down.call(_18,e);
break;
case 37:
_1a.keyHandler.left.call(_18,e);
break;
case 39:
_1a.keyHandler.right.call(_18,e);
break;
case 13:
e.preventDefault();
_1a.keyHandler.enter.call(_18,e);
return false;
case 9:
case 27:
_d(_18);
break;
default:
if(_1a.editable){
if(_19.timer){
clearTimeout(_19.timer);
}
_19.timer=setTimeout(function(){
var q=t.combo("getText");
if(_19.previousText!=q){
_19.previousText=q;
t.combo("showPanel");
_1a.keyHandler.query.call(_18,q,e);
t.combo("validate");
}
},_1a.delay);
}
}
};
function _1b(_1c){
var _1d=$.data(_1c,"combo");
var _1e=_1d.combo;
var _1f=_1d.panel;
var _20=$(_1c).combo("options");
_1f.panel("move",{left:_21(),top:_22()});
if(_1f.panel("options").closed){
_1f.panel("open").panel("resize",{width:(_20.panelWidth?_20.panelWidth:_1e._outerWidth()),height:_20.panelHeight});
_20.onShowPanel.call(_1c);
}
(function(){
if(_1f.is(":visible")){
_1f.panel("move",{left:_21(),top:_22()});
setTimeout(arguments.callee,200);
}
})();
function _21(){
var _23=_1e.offset().left;
if(_20.panelAlign=="right"){
_23+=_1e._outerWidth()-_1f._outerWidth();
}
if(_23+_1f._outerWidth()>$(window)._outerWidth()+$(document).scrollLeft()){
_23=$(window)._outerWidth()+$(document).scrollLeft()-_1f._outerWidth();
}
if(_23<0){
_23=0;
}
return _23;
};
function _22(){
var top=_1e.offset().top+_1e._outerHeight();
if(top+_1f._outerHeight()>$(window)._outerHeight()+$(document).scrollTop()){
top=_1e.offset().top-_1f._outerHeight();
}
if(top<$(document).scrollTop()){
top=_1e.offset().top+_1e._outerHeight();
}
return top;
};
};
function _d(_24){
var _25=$.data(_24,"combo").panel;
_25.panel("close");
};
function _26(_27){
var _28=$.data(_27,"combo");
var _29=_28.options;
var _2a=_28.combo;
$(_27).textbox("clear");
if(_29.multiple){
_2a.find(".textbox-value").remove();
}else{
_2a.find(".textbox-value").val("");
}
};
function _2b(_2c,_2d){
var _2e=$.data(_2c,"combo");
var _2f=$(_2c).textbox("getText");
if(_2f!=_2d){
$(_2c).textbox("setText",_2d);
_2e.previousText=_2d;
}
};
function _30(_31){
var _32=[];
var _33=$.data(_31,"combo").combo;
_33.find(".textbox-value").each(function(){
_32.push($(this).val());
});
return _32;
};
function _34(_35,_36){
if(!$.isArray(_36)){
_36=[_36];
}
var _37=$.data(_35,"combo");
var _38=_37.options;
var _39=_37.combo;
var _3a=_30(_35);
_39.find(".textbox-value").remove();
var _3b=$(_35).attr("textboxName")||"";
for(var i=0;i<_36.length;i++){
var _3c=$("<input type=\"hidden\" class=\"textbox-value\">").appendTo(_39);
_3c.attr("name",_3b);
if(_38.disabled){
_3c.attr("disabled","disabled");
}
_3c.val(_36[i]);
}
var _3d=(function(){
if(_3a.length!=_36.length){
return true;
}
var a1=$.extend(true,[],_3a);
var a2=$.extend(true,[],_36);
a1.sort();
a2.sort();
for(var i=0;i<a1.length;i++){
if(a1[i]!=a2[i]){
return true;
}
}
return false;
})();
if(_3d){
if(_38.multiple){
_38.onChange.call(_35,_36,_3a);
}else{
_38.onChange.call(_35,_36[0],_3a[0]);
}
}
};
function _3e(_3f){
var _40=_30(_3f);
return _40[0];
};
function _41(_42,_43){
_34(_42,[_43]);
};
function _44(_45){
var _46=$.data(_45,"combo").options;
var _47=_46.onChange;
_46.onChange=function(){
};
if(_46.multiple){
_34(_45,_46.value?_46.value:[]);
}else{
_41(_45,_46.value);
}
_46.onChange=_47;
};
$.fn.combo=function(_48,_49){
if(typeof _48=="string"){
var _4a=$.fn.combo.methods[_48];
if(_4a){
return _4a(this,_49);
}else{
return this.textbox(_48,_49);
}
}
_48=_48||{};
return this.each(function(){
var _4b=$.data(this,"combo");
if(_4b){
$.extend(_4b.options,_48);
if(_48.value!=undefined){
_4b.options.originalValue=_48.value;
}
}else{
_4b=$.data(this,"combo",{options:$.extend({},$.fn.combo.defaults,$.fn.combo.parseOptions(this),_48),previousText:""});
_4b.options.originalValue=_4b.options.value;
}
_1(this);
_10(this);
_44(this);
});
};
$.fn.combo.methods={options:function(jq){
var _4c=jq.textbox("options");
return $.extend($.data(jq[0],"combo").options,{width:_4c.width,height:_4c.height,disabled:_4c.disabled,readonly:_4c.readonly});
},panel:function(jq){
return $.data(jq[0],"combo").panel;
},destroy:function(jq){
return jq.each(function(){
_7(this);
});
},showPanel:function(jq){
return jq.each(function(){
_1b(this);
});
},hidePanel:function(jq){
return jq.each(function(){
_d(this);
});
},clear:function(jq){
return jq.each(function(){
_26(this);
});
},reset:function(jq){
return jq.each(function(){
var _4d=$.data(this,"combo").options;
if(_4d.multiple){
$(this).combo("setValues",_4d.originalValue);
}else{
$(this).combo("setValue",_4d.originalValue);
}
});
},setText:function(jq,_4e){
return jq.each(function(){
_2b(this,_4e);
});
},getValues:function(jq){
return _30(jq[0]);
},setValues:function(jq,_4f){
return jq.each(function(){
_34(this,_4f);
});
},getValue:function(jq){
return _3e(jq[0]);
},setValue:function(jq,_50){
return jq.each(function(){
_41(this,_50);
});
}};
$.fn.combo.parseOptions=function(_51){
var t=$(_51);
return $.extend({},$.fn.textbox.parseOptions(_51),$.parser.parseOptions(_51,["separator","panelAlign",{panelWidth:"number",hasDownArrow:"boolean",delay:"number",selectOnNavigation:"boolean"},{panelMinWidth:"number",panelMaxWidth:"number",panelMinHeight:"number",panelMaxHeight:"number"}]),{panelHeight:(t.attr("panelHeight")=="auto"?"auto":parseInt(t.attr("panelHeight"))||undefined),multiple:(t.attr("multiple")?true:undefined)});
};
$.fn.combo.defaults=$.extend({},$.fn.textbox.defaults,{inputEvents:{click:_12,keydown:_17,paste:_17,drop:_17},panelWidth:null,panelHeight:200,panelMinWidth:null,panelMaxWidth:null,panelMinHeight:null,panelMaxHeight:null,panelAlign:"left",multiple:false,selectOnNavigation:true,separator:",",hasDownArrow:true,delay:200,keyHandler:{up:function(e){
},down:function(e){
},left:function(e){
},right:function(e){
},enter:function(e){
},query:function(q,e){
}},onShowPanel:function(){
},onHidePanel:function(){
},onChange:function(_52,_53){
}});
})(jQuery);

