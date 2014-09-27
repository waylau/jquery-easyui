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
var _3=$.data(_2,"numberbox");
var _4=_3.options;
$(_2).addClass("numberbox-f").textbox(_4);
$(_2).textbox("textbox").css({imeMode:"disabled"});
$(_2).attr("numberboxName",$(_2).attr("textboxName"));
_3.numberbox=$(_2).next();
_3.numberbox.addClass("numberbox");
var _5=_4.parser.call(_2,_4.value);
var _6=_4.formatter.call(_2,_5);
$(_2).numberbox("initValue",_5).numberbox("setText",_6);
};
function _7(_8,_9){
var _a=$.data(_8,"numberbox");
var _b=_a.options;
var _9=_b.parser.call(_8,_9);
var _c=_b.formatter.call(_8,_9);
_b.value=_9;
$(_8).textbox("setValue",_9).textbox("setText",_c);
};
$.fn.numberbox=function(_d,_e){
if(typeof _d=="string"){
var _f=$.fn.numberbox.methods[_d];
if(_f){
return _f(this,_e);
}else{
return this.textbox(_d,_e);
}
}
_d=_d||{};
return this.each(function(){
var _10=$.data(this,"numberbox");
if(_10){
$.extend(_10.options,_d);
}else{
_10=$.data(this,"numberbox",{options:$.extend({},$.fn.numberbox.defaults,$.fn.numberbox.parseOptions(this),_d)});
}
_1(this);
});
};
$.fn.numberbox.methods={options:function(jq){
var _11=jq.data("textbox")?jq.textbox("options"):{};
return $.extend($.data(jq[0],"numberbox").options,{width:_11.width,originalValue:_11.originalValue,disabled:_11.disabled,readonly:_11.readonly});
},fix:function(jq){
return jq.each(function(){
$(this).numberbox("setValue",$(this).numberbox("getText"));
});
},setValue:function(jq,_12){
return jq.each(function(){
_7(this,_12);
});
},clear:function(jq){
return jq.each(function(){
$(this).textbox("clear");
$(this).numberbox("options").value="";
});
},reset:function(jq){
return jq.each(function(){
$(this).textbox("reset");
$(this).numberbox("setValue",$(this).numberbox("getValue"));
});
}};
$.fn.numberbox.parseOptions=function(_13){
var t=$(_13);
return $.extend({},$.fn.textbox.parseOptions(_13),$.parser.parseOptions(_13,["decimalSeparator","groupSeparator","suffix",{min:"number",max:"number",precision:"number"}]),{prefix:(t.attr("prefix")?t.attr("prefix"):undefined)});
};
$.fn.numberbox.defaults=$.extend({},$.fn.textbox.defaults,{inputEvents:{keypress:function(e){
var _14=e.data.target;
var _15=$(_14).numberbox("options");
return _15.filter.call(_14,e);
},blur:function(e){
var _16=e.data.target;
$(_16).numberbox("setValue",$(_16).numberbox("getText"));
}},min:null,max:null,precision:0,decimalSeparator:".",groupSeparator:"",prefix:"",suffix:"",filter:function(e){
var _17=$(this).numberbox("options");
if(e.which==45){
return ($(this).val().indexOf("-")==-1?true:false);
}
var c=String.fromCharCode(e.which);
if(c==_17.decimalSeparator){
return ($(this).val().indexOf(c)==-1?true:false);
}else{
if(c==_17.groupSeparator){
return true;
}else{
if((e.which>=48&&e.which<=57&&e.ctrlKey==false&&e.shiftKey==false)||e.which==0||e.which==8){
return true;
}else{
if(e.ctrlKey==true&&(e.which==99||e.which==118)){
return true;
}else{
return false;
}
}
}
}
},formatter:function(_18){
if(!_18){
return _18;
}
_18=_18+"";
var _19=$(this).numberbox("options");
var s1=_18,s2="";
var _1a=_18.indexOf(".");
if(_1a>=0){
s1=_18.substring(0,_1a);
s2=_18.substring(_1a+1,_18.length);
}
if(_19.groupSeparator){
var p=/(\d+)(\d{3})/;
while(p.test(s1)){
s1=s1.replace(p,"$1"+_19.groupSeparator+"$2");
}
}
if(s2){
return _19.prefix+s1+_19.decimalSeparator+s2+_19.suffix;
}else{
return _19.prefix+s1+_19.suffix;
}
},parser:function(s){
s=s+"";
var _1b=$(this).numberbox("options");
if(parseFloat(s)!=s){
if(_1b.prefix){
s=$.trim(s.replace(new RegExp("\\"+$.trim(_1b.prefix),"g"),""));
}
if(_1b.suffix){
s=$.trim(s.replace(new RegExp("\\"+$.trim(_1b.suffix),"g"),""));
}
if(_1b.groupSeparator){
s=$.trim(s.replace(new RegExp("\\"+_1b.groupSeparator,"g"),""));
}
if(_1b.decimalSeparator){
s=$.trim(s.replace(new RegExp("\\"+_1b.decimalSeparator,"g"),"."));
}
s=s.replace(/\s/g,"");
}
var val=parseFloat(s).toFixed(_1b.precision);
if(isNaN(val)){
val="";
}else{
if(typeof (_1b.min)=="number"&&val<_1b.min){
val=_1b.min.toFixed(_1b.precision);
}else{
if(typeof (_1b.max)=="number"&&val>_1b.max){
val=_1b.max.toFixed(_1b.precision);
}
}
}
return val;
}});
})(jQuery);

