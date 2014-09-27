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
var _1;
function _2(_3){
var _4=$.data(_3,"propertygrid");
var _5=$.data(_3,"propertygrid").options;
$(_3).datagrid($.extend({},_5,{cls:"propertygrid",view:(_5.showGroup?_5.groupView:_5.view),onClickCell:function(_6,_7,_8){
if(_1!=this){
_c(_1);
_1=this;
}
var _9=$(this).datagrid("getRows")[_6];
if(_5.editIndex!=_6&&_9.editor){
var _a=$(this).datagrid("getColumnOption","value");
_a.editor=_9.editor;
_c(_1);
$(this).datagrid("beginEdit",_6);
var ed=$(this).datagrid("getEditor",{index:_6,field:_7});
if(!ed){
ed=$(this).datagrid("getEditor",{index:_6,field:"value"});
}
if(ed){
_d(ed.target).focus();
_5.editIndex=_6;
}
}
_5.onClickCell.call(_3,_6,_7,_8);
},loadFilter:function(_b){
_c(this);
return _5.loadFilter.call(this,_b);
}}));
$(document).unbind(".propertygrid").bind("mousedown.propertygrid",function(e){
var p=$(e.target).closest("div.datagrid-view,div.combo-panel");
if(p.length){
return;
}
_c(_1);
_1=undefined;
});
};
function _d(t){
return $(t).data("textbox")?$(t).textbox("textbox"):$(t);
};
function _c(_e){
var t=$(_e);
if(!t.length){
return;
}
var _f=$.data(_e,"propertygrid").options;
var _10=_f.editIndex;
if(_10==undefined){
return;
}
var _11=t.datagrid("getEditors",_10);
if(_11.length){
$.map(_11,function(ed){
_d(ed.target).blur();
});
if(t.datagrid("validateRow",_10)){
t.datagrid("endEdit",_10);
}else{
t.datagrid("cancelEdit",_10);
}
}
_f.editIndex=undefined;
};
$.fn.propertygrid=function(_12,_13){
if(typeof _12=="string"){
var _14=$.fn.propertygrid.methods[_12];
if(_14){
return _14(this,_13);
}else{
return this.datagrid(_12,_13);
}
}
_12=_12||{};
return this.each(function(){
var _15=$.data(this,"propertygrid");
if(_15){
$.extend(_15.options,_12);
}else{
var _16=$.extend({},$.fn.propertygrid.defaults,$.fn.propertygrid.parseOptions(this),_12);
_16.frozenColumns=$.extend(true,[],_16.frozenColumns);
_16.columns=$.extend(true,[],_16.columns);
$.data(this,"propertygrid",{options:_16});
}
_2(this);
});
};
$.fn.propertygrid.methods={options:function(jq){
return $.data(jq[0],"propertygrid").options;
}};
$.fn.propertygrid.parseOptions=function(_17){
return $.extend({},$.fn.datagrid.parseOptions(_17),$.parser.parseOptions(_17,[{showGroup:"boolean"}]));
};
var _18=$.extend({},$.fn.datagrid.defaults.view,{render:function(_19,_1a,_1b){
var _1c=[];
var _1d=this.groups;
for(var i=0;i<_1d.length;i++){
_1c.push(this.renderGroup.call(this,_19,i,_1d[i],_1b));
}
$(_1a).html(_1c.join(""));
},renderGroup:function(_1e,_1f,_20,_21){
var _22=$.data(_1e,"datagrid");
var _23=_22.options;
var _24=$(_1e).datagrid("getColumnFields",_21);
var _25=[];
_25.push("<div class=\"datagrid-group\" group-index="+_1f+">");
_25.push("<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" style=\"height:100%\"><tbody>");
_25.push("<tr>");
if((_21&&(_23.rownumbers||_23.frozenColumns.length))||(!_21&&!(_23.rownumbers||_23.frozenColumns.length))){
_25.push("<td style=\"border:0;text-align:center;width:25px\"><span class=\"datagrid-row-expander datagrid-row-collapse\" style=\"display:inline-block;width:16px;height:16px;cursor:pointer\">&nbsp;</span></td>");
}
_25.push("<td style=\"border:0;\">");
if(!_21){
_25.push("<span class=\"datagrid-group-title\">");
_25.push(_23.groupFormatter.call(_1e,_20.value,_20.rows));
_25.push("</span>");
}
_25.push("</td>");
_25.push("</tr>");
_25.push("</tbody></table>");
_25.push("</div>");
_25.push("<table class=\"datagrid-btable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>");
var _26=_20.startIndex;
for(var j=0;j<_20.rows.length;j++){
var css=_23.rowStyler?_23.rowStyler.call(_1e,_26,_20.rows[j]):"";
var _27="";
var _28="";
if(typeof css=="string"){
_28=css;
}else{
if(css){
_27=css["class"]||"";
_28=css["style"]||"";
}
}
var cls="class=\"datagrid-row "+(_26%2&&_23.striped?"datagrid-row-alt ":" ")+_27+"\"";
var _29=_28?"style=\""+_28+"\"":"";
var _2a=_22.rowIdPrefix+"-"+(_21?1:2)+"-"+_26;
_25.push("<tr id=\""+_2a+"\" datagrid-row-index=\""+_26+"\" "+cls+" "+_29+">");
_25.push(this.renderRow.call(this,_1e,_24,_21,_26,_20.rows[j]));
_25.push("</tr>");
_26++;
}
_25.push("</tbody></table>");
return _25.join("");
},bindEvents:function(_2b){
var _2c=$.data(_2b,"datagrid");
var dc=_2c.dc;
var _2d=dc.body1.add(dc.body2);
var _2e=($.data(_2d[0],"events")||$._data(_2d[0],"events")).click[0].handler;
_2d.unbind("click").bind("click",function(e){
var tt=$(e.target);
var _2f=tt.closest("span.datagrid-row-expander");
if(_2f.length){
var _30=_2f.closest("div.datagrid-group").attr("group-index");
if(_2f.hasClass("datagrid-row-collapse")){
$(_2b).datagrid("collapseGroup",_30);
}else{
$(_2b).datagrid("expandGroup",_30);
}
}else{
_2e(e);
}
e.stopPropagation();
});
},onBeforeRender:function(_31,_32){
var _33=$.data(_31,"datagrid");
var _34=_33.options;
_35();
var _36=[];
for(var i=0;i<_32.length;i++){
var row=_32[i];
var _37=_38(row[_34.groupField]);
if(!_37){
_37={value:row[_34.groupField],rows:[row]};
_36.push(_37);
}else{
_37.rows.push(row);
}
}
var _39=0;
var _3a=[];
for(var i=0;i<_36.length;i++){
var _37=_36[i];
_37.startIndex=_39;
_39+=_37.rows.length;
_3a=_3a.concat(_37.rows);
}
_33.data.rows=_3a;
this.groups=_36;
var _3b=this;
setTimeout(function(){
_3b.bindEvents(_31);
},0);
function _38(_3c){
for(var i=0;i<_36.length;i++){
var _3d=_36[i];
if(_3d.value==_3c){
return _3d;
}
}
return null;
};
function _35(){
if(!$("#datagrid-group-style").length){
$("head").append("<style id=\"datagrid-group-style\">"+".datagrid-group{height:25px;overflow:hidden;font-weight:bold;border-bottom:1px solid #ccc;}"+"</style>");
}
};
}});
$.extend($.fn.datagrid.methods,{expandGroup:function(jq,_3e){
return jq.each(function(){
var _3f=$.data(this,"datagrid").dc.view;
var _40=_3f.find(_3e!=undefined?"div.datagrid-group[group-index=\""+_3e+"\"]":"div.datagrid-group");
var _41=_40.find("span.datagrid-row-expander");
if(_41.hasClass("datagrid-row-expand")){
_41.removeClass("datagrid-row-expand").addClass("datagrid-row-collapse");
_40.next("table").show();
}
$(this).datagrid("fixRowHeight");
});
},collapseGroup:function(jq,_42){
return jq.each(function(){
var _43=$.data(this,"datagrid").dc.view;
var _44=_43.find(_42!=undefined?"div.datagrid-group[group-index=\""+_42+"\"]":"div.datagrid-group");
var _45=_44.find("span.datagrid-row-expander");
if(_45.hasClass("datagrid-row-collapse")){
_45.removeClass("datagrid-row-collapse").addClass("datagrid-row-expand");
_44.next("table").hide();
}
$(this).datagrid("fixRowHeight");
});
}});
$.fn.propertygrid.defaults=$.extend({},$.fn.datagrid.defaults,{singleSelect:true,remoteSort:false,fitColumns:true,loadMsg:"",frozenColumns:[[{field:"f",width:16,resizable:false}]],columns:[[{field:"name",title:"Name",width:100,sortable:true},{field:"value",title:"Value",width:100,resizable:false}]],showGroup:false,groupView:_18,groupField:"group",groupFormatter:function(_46,_47){
return _46;
}});
})(jQuery);

