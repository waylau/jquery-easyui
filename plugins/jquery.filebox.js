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
var _3=$.data(_2,"filebox");
var _4=_3.options;
$(_2).addClass("filebox-f").textbox($.extend({},_4,{onClickButton:function(){
_3.filebox.find(".textbox-value").click();
_4.onClickButton.call(_2);
}}));
$(_2).textbox("textbox").attr("readonly","readonly");
_3.filebox=$(_2).next().addClass("filebox");
_3.filebox.find(".textbox-value").remove();
_4.oldValue="";
var _5=$("<input type=\"file\" class=\"textbox-value\">").appendTo(_3.filebox);
_5.attr("name",$(_2).attr("textboxName")||"").change(function(){
$(_2).filebox("setText",this.value);
_4.onChange.call(_2,this.value,_4.oldValue);
_4.oldValue=this.value;
});
};
$.fn.filebox=function(_6,_7){
if(typeof _6=="string"){
var _8=$.fn.filebox.methods[_6];
if(_8){
return _8(this,_7);
}else{
return this.textbox(_6,_7);
}
}
_6=_6||{};
return this.each(function(){
var _9=$.data(this,"filebox");
if(_9){
$.extend(_9.options,_6);
}else{
$.data(this,"filebox",{options:$.extend({},$.fn.filebox.defaults,$.fn.filebox.parseOptions(this),_6)});
}
_1(this);
});
};
$.fn.filebox.methods={options:function(jq){
var _a=jq.textbox("options");
return $.extend($.data(jq[0],"filebox").options,{width:_a.width,value:_a.value,originalValue:_a.originalValue,disabled:_a.disabled,readonly:_a.readonly});
}};
$.fn.filebox.parseOptions=function(_b){
return $.extend({},$.fn.textbox.parseOptions(_b),{});
};
$.fn.filebox.defaults=$.extend({},$.fn.textbox.defaults,{buttonIcon:null,buttonText:"Choose File",buttonAlign:"right"});
})(jQuery);

