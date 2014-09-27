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
var _3=$.data(_2,"treegrid");
var _4=_3.options;
$(_2).datagrid($.extend({},_4,{url:null,data:null,loader:function(){
return false;
},onBeforeLoad:function(){
return false;
},onLoadSuccess:function(){
},onResizeColumn:function(_5,_6){
_20(_2);
_4.onResizeColumn.call(_2,_5,_6);
},onSortColumn:function(_7,_8){
_4.sortName=_7;
_4.sortOrder=_8;
if(_4.remoteSort){
_1f(_2);
}else{
var _9=$(_2).treegrid("getData");
_39(_2,0,_9);
}
_4.onSortColumn.call(_2,_7,_8);
},onBeforeEdit:function(_a,_b){
if(_4.onBeforeEdit.call(_2,_b)==false){
return false;
}
},onAfterEdit:function(_c,_d,_e){
_4.onAfterEdit.call(_2,_d,_e);
},onCancelEdit:function(_f,row){
_4.onCancelEdit.call(_2,row);
},onSelect:function(_10){
_4.onSelect.call(_2,_41(_2,_10));
},onUnselect:function(_11){
_4.onUnselect.call(_2,_41(_2,_11));
},onCheck:function(_12){
_4.onCheck.call(_2,_41(_2,_12));
},onUncheck:function(_13){
_4.onUncheck.call(_2,_41(_2,_13));
},onClickRow:function(_14){
_4.onClickRow.call(_2,_41(_2,_14));
},onDblClickRow:function(_15){
_4.onDblClickRow.call(_2,_41(_2,_15));
},onClickCell:function(_16,_17){
_4.onClickCell.call(_2,_17,_41(_2,_16));
},onDblClickCell:function(_18,_19){
_4.onDblClickCell.call(_2,_19,_41(_2,_18));
},onRowContextMenu:function(e,_1a){
_4.onContextMenu.call(_2,e,_41(_2,_1a));
}}));
if(!_4.columns){
var _1b=$.data(_2,"datagrid").options;
_4.columns=_1b.columns;
_4.frozenColumns=_1b.frozenColumns;
}
_3.dc=$.data(_2,"datagrid").dc;
if(_4.pagination){
var _1c=$(_2).datagrid("getPager");
_1c.pagination({pageNumber:_4.pageNumber,pageSize:_4.pageSize,pageList:_4.pageList,onSelectPage:function(_1d,_1e){
_4.pageNumber=_1d;
_4.pageSize=_1e;
_1f(_2);
}});
_4.pageSize=_1c.pagination("options").pageSize;
}
};
function _20(_21,_22){
var _23=$.data(_21,"datagrid").options;
var dc=$.data(_21,"datagrid").dc;
if(!dc.body1.is(":empty")&&(!_23.nowrap||_23.autoRowHeight)){
if(_22!=undefined){
var _24=_25(_21,_22);
for(var i=0;i<_24.length;i++){
_26(_24[i][_23.idField]);
}
}
}
$(_21).datagrid("fixRowHeight",_22);
function _26(_27){
var tr1=_23.finder.getTr(_21,_27,"body",1);
var tr2=_23.finder.getTr(_21,_27,"body",2);
tr1.css("height","");
tr2.css("height","");
var _28=Math.max(tr1.height(),tr2.height());
tr1.css("height",_28);
tr2.css("height",_28);
};
};
function _29(_2a){
var dc=$.data(_2a,"datagrid").dc;
var _2b=$.data(_2a,"treegrid").options;
if(!_2b.rownumbers){
return;
}
dc.body1.find("div.datagrid-cell-rownumber").each(function(i){
$(this).html(i+1);
});
};
function _2c(_2d){
var dc=$.data(_2d,"datagrid").dc;
var _2e=dc.body1.add(dc.body2);
var _2f=($.data(_2e[0],"events")||$._data(_2e[0],"events")).click[0].handler;
dc.body1.add(dc.body2).bind("mouseover",function(e){
var tt=$(e.target);
var tr=tt.closest("tr.datagrid-row");
if(!tr.length){
return;
}
if(tt.hasClass("tree-hit")){
tt.hasClass("tree-expanded")?tt.addClass("tree-expanded-hover"):tt.addClass("tree-collapsed-hover");
}
}).bind("mouseout",function(e){
var tt=$(e.target);
var tr=tt.closest("tr.datagrid-row");
if(!tr.length){
return;
}
if(tt.hasClass("tree-hit")){
tt.hasClass("tree-expanded")?tt.removeClass("tree-expanded-hover"):tt.removeClass("tree-collapsed-hover");
}
}).unbind("click").bind("click",function(e){
var tt=$(e.target);
var tr=tt.closest("tr.datagrid-row");
if(!tr.length){
return;
}
if(tt.hasClass("tree-hit")){
_30(_2d,tr.attr("node-id"));
}else{
_2f(e);
}
});
};
function _31(_32,_33){
var _34=$.data(_32,"treegrid").options;
var tr1=_34.finder.getTr(_32,_33,"body",1);
var tr2=_34.finder.getTr(_32,_33,"body",2);
var _35=$(_32).datagrid("getColumnFields",true).length+(_34.rownumbers?1:0);
var _36=$(_32).datagrid("getColumnFields",false).length;
_37(tr1,_35);
_37(tr2,_36);
function _37(tr,_38){
$("<tr class=\"treegrid-tr-tree\">"+"<td style=\"border:0px\" colspan=\""+_38+"\">"+"<div></div>"+"</td>"+"</tr>").insertAfter(tr);
};
};
function _39(_3a,_3b,_3c,_3d){
var _3e=$.data(_3a,"treegrid");
var _3f=_3e.options;
var dc=_3e.dc;
_3c=_3f.loadFilter.call(_3a,_3c,_3b);
var _40=_41(_3a,_3b);
if(_40){
var _42=_3f.finder.getTr(_3a,_3b,"body",1);
var _43=_3f.finder.getTr(_3a,_3b,"body",2);
var cc1=_42.next("tr.treegrid-tr-tree").children("td").children("div");
var cc2=_43.next("tr.treegrid-tr-tree").children("td").children("div");
if(!_3d){
_40.children=[];
}
}else{
var cc1=dc.body1;
var cc2=dc.body2;
if(!_3d){
_3e.data=[];
}
}
if(!_3d){
cc1.empty();
cc2.empty();
}
if(_3f.view.onBeforeRender){
_3f.view.onBeforeRender.call(_3f.view,_3a,_3b,_3c);
}
_3f.view.render.call(_3f.view,_3a,cc1,true);
_3f.view.render.call(_3f.view,_3a,cc2,false);
if(_3f.showFooter){
_3f.view.renderFooter.call(_3f.view,_3a,dc.footer1,true);
_3f.view.renderFooter.call(_3f.view,_3a,dc.footer2,false);
}
if(_3f.view.onAfterRender){
_3f.view.onAfterRender.call(_3f.view,_3a);
}
if(!_3b&&_3f.pagination){
var _44=$.data(_3a,"treegrid").total;
var _45=$(_3a).datagrid("getPager");
if(_45.pagination("options").total!=_44){
_45.pagination({total:_44});
}
}
_20(_3a);
_29(_3a);
$(_3a).treegrid("showLines");
$(_3a).treegrid("setSelectionState");
$(_3a).treegrid("autoSizeColumn");
_3f.onLoadSuccess.call(_3a,_40,_3c);
};
function _1f(_46,_47,_48,_49,_4a){
var _4b=$.data(_46,"treegrid").options;
var _4c=$(_46).datagrid("getPanel").find("div.datagrid-body");
if(_48){
_4b.queryParams=_48;
}
var _4d=$.extend({},_4b.queryParams);
if(_4b.pagination){
$.extend(_4d,{page:_4b.pageNumber,rows:_4b.pageSize});
}
if(_4b.sortName){
$.extend(_4d,{sort:_4b.sortName,order:_4b.sortOrder});
}
var row=_41(_46,_47);
if(_4b.onBeforeLoad.call(_46,row,_4d)==false){
return;
}
var _4e=_4c.find("tr[node-id=\""+_47+"\"] span.tree-folder");
_4e.addClass("tree-loading");
$(_46).treegrid("loading");
var _4f=_4b.loader.call(_46,_4d,function(_50){
_4e.removeClass("tree-loading");
$(_46).treegrid("loaded");
_39(_46,_47,_50,_49);
if(_4a){
_4a();
}
},function(){
_4e.removeClass("tree-loading");
$(_46).treegrid("loaded");
_4b.onLoadError.apply(_46,arguments);
if(_4a){
_4a();
}
});
if(_4f==false){
_4e.removeClass("tree-loading");
$(_46).treegrid("loaded");
}
};
function _51(_52){
var _53=_54(_52);
if(_53.length){
return _53[0];
}else{
return null;
}
};
function _54(_55){
return $.data(_55,"treegrid").data;
};
function _56(_57,_58){
var row=_41(_57,_58);
if(row._parentId){
return _41(_57,row._parentId);
}else{
return null;
}
};
function _25(_59,_5a){
var _5b=$.data(_59,"treegrid").options;
var _5c=$(_59).datagrid("getPanel").find("div.datagrid-view2 div.datagrid-body");
var _5d=[];
if(_5a){
_5e(_5a);
}else{
var _5f=_54(_59);
for(var i=0;i<_5f.length;i++){
_5d.push(_5f[i]);
_5e(_5f[i][_5b.idField]);
}
}
function _5e(_60){
var _61=_41(_59,_60);
if(_61&&_61.children){
for(var i=0,len=_61.children.length;i<len;i++){
var _62=_61.children[i];
_5d.push(_62);
_5e(_62[_5b.idField]);
}
}
};
return _5d;
};
function _63(_64,_65){
if(!_65){
return 0;
}
var _66=$.data(_64,"treegrid").options;
var _67=$(_64).datagrid("getPanel").children("div.datagrid-view");
var _68=_67.find("div.datagrid-body tr[node-id=\""+_65+"\"]").children("td[field=\""+_66.treeField+"\"]");
return _68.find("span.tree-indent,span.tree-hit").length;
};
function _41(_69,_6a){
var _6b=$.data(_69,"treegrid").options;
var _6c=$.data(_69,"treegrid").data;
var cc=[_6c];
while(cc.length){
var c=cc.shift();
for(var i=0;i<c.length;i++){
var _6d=c[i];
if(_6d[_6b.idField]==_6a){
return _6d;
}else{
if(_6d["children"]){
cc.push(_6d["children"]);
}
}
}
}
return null;
};
function _6e(_6f,_70){
var _71=$.data(_6f,"treegrid").options;
var row=_41(_6f,_70);
var tr=_71.finder.getTr(_6f,_70);
var hit=tr.find("span.tree-hit");
if(hit.length==0){
return;
}
if(hit.hasClass("tree-collapsed")){
return;
}
if(_71.onBeforeCollapse.call(_6f,row)==false){
return;
}
hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
hit.next().removeClass("tree-folder-open");
row.state="closed";
tr=tr.next("tr.treegrid-tr-tree");
var cc=tr.children("td").children("div");
if(_71.animate){
cc.slideUp("normal",function(){
$(_6f).treegrid("autoSizeColumn");
_20(_6f,_70);
_71.onCollapse.call(_6f,row);
});
}else{
cc.hide();
$(_6f).treegrid("autoSizeColumn");
_20(_6f,_70);
_71.onCollapse.call(_6f,row);
}
};
function _72(_73,_74){
var _75=$.data(_73,"treegrid").options;
var tr=_75.finder.getTr(_73,_74);
var hit=tr.find("span.tree-hit");
var row=_41(_73,_74);
if(hit.length==0){
return;
}
if(hit.hasClass("tree-expanded")){
return;
}
if(_75.onBeforeExpand.call(_73,row)==false){
return;
}
hit.removeClass("tree-collapsed tree-collapsed-hover").addClass("tree-expanded");
hit.next().addClass("tree-folder-open");
var _76=tr.next("tr.treegrid-tr-tree");
if(_76.length){
var cc=_76.children("td").children("div");
_77(cc);
}else{
_31(_73,row[_75.idField]);
var _76=tr.next("tr.treegrid-tr-tree");
var cc=_76.children("td").children("div");
cc.hide();
var _78=$.extend({},_75.queryParams||{});
_78.id=row[_75.idField];
_1f(_73,row[_75.idField],_78,true,function(){
if(cc.is(":empty")){
_76.remove();
}else{
_77(cc);
}
});
}
function _77(cc){
row.state="open";
if(_75.animate){
cc.slideDown("normal",function(){
$(_73).treegrid("autoSizeColumn");
_20(_73,_74);
_75.onExpand.call(_73,row);
});
}else{
cc.show();
$(_73).treegrid("autoSizeColumn");
_20(_73,_74);
_75.onExpand.call(_73,row);
}
};
};
function _30(_79,_7a){
var _7b=$.data(_79,"treegrid").options;
var tr=_7b.finder.getTr(_79,_7a);
var hit=tr.find("span.tree-hit");
if(hit.hasClass("tree-expanded")){
_6e(_79,_7a);
}else{
_72(_79,_7a);
}
};
function _7c(_7d,_7e){
var _7f=$.data(_7d,"treegrid").options;
var _80=_25(_7d,_7e);
if(_7e){
_80.unshift(_41(_7d,_7e));
}
for(var i=0;i<_80.length;i++){
_6e(_7d,_80[i][_7f.idField]);
}
};
function _81(_82,_83){
var _84=$.data(_82,"treegrid").options;
var _85=_25(_82,_83);
if(_83){
_85.unshift(_41(_82,_83));
}
for(var i=0;i<_85.length;i++){
_72(_82,_85[i][_84.idField]);
}
};
function _86(_87,_88){
var _89=$.data(_87,"treegrid").options;
var ids=[];
var p=_56(_87,_88);
while(p){
var id=p[_89.idField];
ids.unshift(id);
p=_56(_87,id);
}
for(var i=0;i<ids.length;i++){
_72(_87,ids[i]);
}
};
function _8a(_8b,_8c){
var _8d=$.data(_8b,"treegrid").options;
if(_8c.parent){
var tr=_8d.finder.getTr(_8b,_8c.parent);
if(tr.next("tr.treegrid-tr-tree").length==0){
_31(_8b,_8c.parent);
}
var _8e=tr.children("td[field=\""+_8d.treeField+"\"]").children("div.datagrid-cell");
var _8f=_8e.children("span.tree-icon");
if(_8f.hasClass("tree-file")){
_8f.removeClass("tree-file").addClass("tree-folder tree-folder-open");
var hit=$("<span class=\"tree-hit tree-expanded\"></span>").insertBefore(_8f);
if(hit.prev().length){
hit.prev().remove();
}
}
}
_39(_8b,_8c.parent,_8c.data,true);
};
function _90(_91,_92){
var ref=_92.before||_92.after;
var _93=$.data(_91,"treegrid").options;
var _94=_56(_91,ref);
_8a(_91,{parent:(_94?_94[_93.idField]:null),data:[_92.data]});
var _95=_94?_94.children:$(_91).treegrid("getRoots");
for(var i=0;i<_95.length;i++){
if(_95[i][_93.idField]==ref){
var _96=_95[_95.length-1];
_95.splice(_92.before?i:(i+1),0,_96);
_95.splice(_95.length-1,1);
break;
}
}
_97(true);
_97(false);
_29(_91);
$(_91).treegrid("showLines");
function _97(_98){
var _99=_98?1:2;
var tr=_93.finder.getTr(_91,_92.data[_93.idField],"body",_99);
var _9a=tr.closest("table.datagrid-btable");
tr=tr.parent().children();
var _9b=_93.finder.getTr(_91,ref,"body",_99);
if(_92.before){
tr.insertBefore(_9b);
}else{
var sub=_9b.next("tr.treegrid-tr-tree");
tr.insertAfter(sub.length?sub:_9b);
}
_9a.remove();
};
};
function _9c(_9d,_9e){
var _9f=$.data(_9d,"treegrid");
$(_9d).datagrid("deleteRow",_9e);
_29(_9d);
_9f.total-=1;
$(_9d).datagrid("getPager").pagination("refresh",{total:_9f.total});
$(_9d).treegrid("showLines");
};
function _a0(_a1){
var t=$(_a1);
var _a2=t.treegrid("options");
if(_a2.lines){
t.treegrid("getPanel").addClass("tree-lines");
}else{
t.treegrid("getPanel").removeClass("tree-lines");
return;
}
t.treegrid("getPanel").find("span.tree-indent").removeClass("tree-line tree-join tree-joinbottom");
t.treegrid("getPanel").find("div.datagrid-cell").removeClass("tree-node-last tree-root-first tree-root-one");
var _a3=t.treegrid("getRoots");
if(_a3.length>1){
_a4(_a3[0]).addClass("tree-root-first");
}else{
if(_a3.length==1){
_a4(_a3[0]).addClass("tree-root-one");
}
}
_a5(_a3);
_a6(_a3);
function _a5(_a7){
$.map(_a7,function(_a8){
if(_a8.children&&_a8.children.length){
_a5(_a8.children);
}else{
var _a9=_a4(_a8);
_a9.find(".tree-icon").prev().addClass("tree-join");
}
});
var _aa=_a4(_a7[_a7.length-1]);
_aa.addClass("tree-node-last");
_aa.find(".tree-join").removeClass("tree-join").addClass("tree-joinbottom");
};
function _a6(_ab){
$.map(_ab,function(_ac){
if(_ac.children&&_ac.children.length){
_a6(_ac.children);
}
});
for(var i=0;i<_ab.length-1;i++){
var _ad=_ab[i];
var _ae=t.treegrid("getLevel",_ad[_a2.idField]);
var tr=_a2.finder.getTr(_a1,_ad[_a2.idField]);
var cc=tr.next().find("tr.datagrid-row td[field=\""+_a2.treeField+"\"] div.datagrid-cell");
cc.find("span:eq("+(_ae-1)+")").addClass("tree-line");
}
};
function _a4(_af){
var tr=_a2.finder.getTr(_a1,_af[_a2.idField]);
var _b0=tr.find("td[field=\""+_a2.treeField+"\"] div.datagrid-cell");
return _b0;
};
};
$.fn.treegrid=function(_b1,_b2){
if(typeof _b1=="string"){
var _b3=$.fn.treegrid.methods[_b1];
if(_b3){
return _b3(this,_b2);
}else{
return this.datagrid(_b1,_b2);
}
}
_b1=_b1||{};
return this.each(function(){
var _b4=$.data(this,"treegrid");
if(_b4){
$.extend(_b4.options,_b1);
}else{
_b4=$.data(this,"treegrid",{options:$.extend({},$.fn.treegrid.defaults,$.fn.treegrid.parseOptions(this),_b1),data:[]});
}
_1(this);
if(_b4.options.data){
$(this).treegrid("loadData",_b4.options.data);
}
_1f(this);
_2c(this);
});
};
$.fn.treegrid.methods={options:function(jq){
return $.data(jq[0],"treegrid").options;
},resize:function(jq,_b5){
return jq.each(function(){
$(this).datagrid("resize",_b5);
});
},fixRowHeight:function(jq,_b6){
return jq.each(function(){
_20(this,_b6);
});
},loadData:function(jq,_b7){
return jq.each(function(){
_39(this,_b7.parent,_b7);
});
},load:function(jq,_b8){
return jq.each(function(){
$(this).treegrid("options").pageNumber=1;
$(this).treegrid("getPager").pagination({pageNumber:1});
$(this).treegrid("reload",_b8);
});
},reload:function(jq,id){
return jq.each(function(){
var _b9=$(this).treegrid("options");
var _ba={};
if(typeof id=="object"){
_ba=id;
}else{
_ba=$.extend({},_b9.queryParams);
_ba.id=id;
}
if(_ba.id){
var _bb=$(this).treegrid("find",_ba.id);
if(_bb.children){
_bb.children.splice(0,_bb.children.length);
}
_b9.queryParams=_ba;
var tr=_b9.finder.getTr(this,_ba.id);
tr.next("tr.treegrid-tr-tree").remove();
tr.find("span.tree-hit").removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
_72(this,_ba.id);
}else{
_1f(this,null,_ba);
}
});
},reloadFooter:function(jq,_bc){
return jq.each(function(){
var _bd=$.data(this,"treegrid").options;
var dc=$.data(this,"datagrid").dc;
if(_bc){
$.data(this,"treegrid").footer=_bc;
}
if(_bd.showFooter){
_bd.view.renderFooter.call(_bd.view,this,dc.footer1,true);
_bd.view.renderFooter.call(_bd.view,this,dc.footer2,false);
if(_bd.view.onAfterRender){
_bd.view.onAfterRender.call(_bd.view,this);
}
$(this).treegrid("fixRowHeight");
}
});
},getData:function(jq){
return $.data(jq[0],"treegrid").data;
},getFooterRows:function(jq){
return $.data(jq[0],"treegrid").footer;
},getRoot:function(jq){
return _51(jq[0]);
},getRoots:function(jq){
return _54(jq[0]);
},getParent:function(jq,id){
return _56(jq[0],id);
},getChildren:function(jq,id){
return _25(jq[0],id);
},getLevel:function(jq,id){
return _63(jq[0],id);
},find:function(jq,id){
return _41(jq[0],id);
},isLeaf:function(jq,id){
var _be=$.data(jq[0],"treegrid").options;
var tr=_be.finder.getTr(jq[0],id);
var hit=tr.find("span.tree-hit");
return hit.length==0;
},select:function(jq,id){
return jq.each(function(){
$(this).datagrid("selectRow",id);
});
},unselect:function(jq,id){
return jq.each(function(){
$(this).datagrid("unselectRow",id);
});
},collapse:function(jq,id){
return jq.each(function(){
_6e(this,id);
});
},expand:function(jq,id){
return jq.each(function(){
_72(this,id);
});
},toggle:function(jq,id){
return jq.each(function(){
_30(this,id);
});
},collapseAll:function(jq,id){
return jq.each(function(){
_7c(this,id);
});
},expandAll:function(jq,id){
return jq.each(function(){
_81(this,id);
});
},expandTo:function(jq,id){
return jq.each(function(){
_86(this,id);
});
},append:function(jq,_bf){
return jq.each(function(){
_8a(this,_bf);
});
},insert:function(jq,_c0){
return jq.each(function(){
_90(this,_c0);
});
},remove:function(jq,id){
return jq.each(function(){
_9c(this,id);
});
},pop:function(jq,id){
var row=jq.treegrid("find",id);
jq.treegrid("remove",id);
return row;
},refresh:function(jq,id){
return jq.each(function(){
var _c1=$.data(this,"treegrid").options;
_c1.view.refreshRow.call(_c1.view,this,id);
});
},update:function(jq,_c2){
return jq.each(function(){
var _c3=$.data(this,"treegrid").options;
_c3.view.updateRow.call(_c3.view,this,_c2.id,_c2.row);
});
},beginEdit:function(jq,id){
return jq.each(function(){
$(this).datagrid("beginEdit",id);
$(this).treegrid("fixRowHeight",id);
});
},endEdit:function(jq,id){
return jq.each(function(){
$(this).datagrid("endEdit",id);
});
},cancelEdit:function(jq,id){
return jq.each(function(){
$(this).datagrid("cancelEdit",id);
});
},showLines:function(jq){
return jq.each(function(){
_a0(this);
});
}};
$.fn.treegrid.parseOptions=function(_c4){
return $.extend({},$.fn.datagrid.parseOptions(_c4),$.parser.parseOptions(_c4,["treeField",{animate:"boolean"}]));
};
var _c5=$.extend({},$.fn.datagrid.defaults.view,{render:function(_c6,_c7,_c8){
var _c9=$.data(_c6,"treegrid").options;
var _ca=$(_c6).datagrid("getColumnFields",_c8);
var _cb=$.data(_c6,"datagrid").rowIdPrefix;
if(_c8){
if(!(_c9.rownumbers||(_c9.frozenColumns&&_c9.frozenColumns.length))){
return;
}
}
var _cc=this;
if(this.treeNodes&&this.treeNodes.length){
var _cd=_ce(_c8,this.treeLevel,this.treeNodes);
$(_c7).append(_cd.join(""));
}
function _ce(_cf,_d0,_d1){
var _d2=$(_c6).treegrid("getParent",_d1[0][_c9.idField]);
var _d3=(_d2?_d2.children.length:$(_c6).treegrid("getRoots").length)-_d1.length;
var _d4=["<table class=\"datagrid-btable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
for(var i=0;i<_d1.length;i++){
var row=_d1[i];
if(row.state!="open"&&row.state!="closed"){
row.state="open";
}
var css=_c9.rowStyler?_c9.rowStyler.call(_c6,row):"";
var _d5="";
var _d6="";
if(typeof css=="string"){
_d6=css;
}else{
if(css){
_d5=css["class"]||"";
_d6=css["style"]||"";
}
}
var cls="class=\"datagrid-row "+(_d3++%2&&_c9.striped?"datagrid-row-alt ":" ")+_d5+"\"";
var _d7=_d6?"style=\""+_d6+"\"":"";
var _d8=_cb+"-"+(_cf?1:2)+"-"+row[_c9.idField];
_d4.push("<tr id=\""+_d8+"\" node-id=\""+row[_c9.idField]+"\" "+cls+" "+_d7+">");
_d4=_d4.concat(_cc.renderRow.call(_cc,_c6,_ca,_cf,_d0,row));
_d4.push("</tr>");
if(row.children&&row.children.length){
var tt=_ce(_cf,_d0+1,row.children);
var v=row.state=="closed"?"none":"block";
_d4.push("<tr class=\"treegrid-tr-tree\"><td style=\"border:0px\" colspan="+(_ca.length+(_c9.rownumbers?1:0))+"><div style=\"display:"+v+"\">");
_d4=_d4.concat(tt);
_d4.push("</div></td></tr>");
}
}
_d4.push("</tbody></table>");
return _d4;
};
},renderFooter:function(_d9,_da,_db){
var _dc=$.data(_d9,"treegrid").options;
var _dd=$.data(_d9,"treegrid").footer||[];
var _de=$(_d9).datagrid("getColumnFields",_db);
var _df=["<table class=\"datagrid-ftable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
for(var i=0;i<_dd.length;i++){
var row=_dd[i];
row[_dc.idField]=row[_dc.idField]||("foot-row-id"+i);
_df.push("<tr class=\"datagrid-row\" node-id=\""+row[_dc.idField]+"\">");
_df.push(this.renderRow.call(this,_d9,_de,_db,0,row));
_df.push("</tr>");
}
_df.push("</tbody></table>");
$(_da).html(_df.join(""));
},renderRow:function(_e0,_e1,_e2,_e3,row){
var _e4=$.data(_e0,"treegrid").options;
var cc=[];
if(_e2&&_e4.rownumbers){
cc.push("<td class=\"datagrid-td-rownumber\"><div class=\"datagrid-cell-rownumber\">0</div></td>");
}
for(var i=0;i<_e1.length;i++){
var _e5=_e1[i];
var col=$(_e0).datagrid("getColumnOption",_e5);
if(col){
var css=col.styler?(col.styler(row[_e5],row)||""):"";
var _e6="";
var _e7="";
if(typeof css=="string"){
_e7=css;
}else{
if(cc){
_e6=css["class"]||"";
_e7=css["style"]||"";
}
}
var cls=_e6?"class=\""+_e6+"\"":"";
var _e8=col.hidden?"style=\"display:none;"+_e7+"\"":(_e7?"style=\""+_e7+"\"":"");
cc.push("<td field=\""+_e5+"\" "+cls+" "+_e8+">");
var _e8="";
if(!col.checkbox){
if(col.align){
_e8+="text-align:"+col.align+";";
}
if(!_e4.nowrap){
_e8+="white-space:normal;height:auto;";
}else{
if(_e4.autoRowHeight){
_e8+="height:auto;";
}
}
}
cc.push("<div style=\""+_e8+"\" ");
if(col.checkbox){
cc.push("class=\"datagrid-cell-check ");
}else{
cc.push("class=\"datagrid-cell "+col.cellClass);
}
cc.push("\">");
if(col.checkbox){
if(row.checked){
cc.push("<input type=\"checkbox\" checked=\"checked\"");
}else{
cc.push("<input type=\"checkbox\"");
}
cc.push(" name=\""+_e5+"\" value=\""+(row[_e5]!=undefined?row[_e5]:"")+"\">");
}else{
var val=null;
if(col.formatter){
val=col.formatter(row[_e5],row);
}else{
val=row[_e5];
}
if(_e5==_e4.treeField){
for(var j=0;j<_e3;j++){
cc.push("<span class=\"tree-indent\"></span>");
}
if(row.state=="closed"){
cc.push("<span class=\"tree-hit tree-collapsed\"></span>");
cc.push("<span class=\"tree-icon tree-folder "+(row.iconCls?row.iconCls:"")+"\"></span>");
}else{
if(row.children&&row.children.length){
cc.push("<span class=\"tree-hit tree-expanded\"></span>");
cc.push("<span class=\"tree-icon tree-folder tree-folder-open "+(row.iconCls?row.iconCls:"")+"\"></span>");
}else{
cc.push("<span class=\"tree-indent\"></span>");
cc.push("<span class=\"tree-icon tree-file "+(row.iconCls?row.iconCls:"")+"\"></span>");
}
}
cc.push("<span class=\"tree-title\">"+val+"</span>");
}else{
cc.push(val);
}
}
cc.push("</div>");
cc.push("</td>");
}
}
return cc.join("");
},refreshRow:function(_e9,id){
this.updateRow.call(this,_e9,id,{});
},updateRow:function(_ea,id,row){
var _eb=$.data(_ea,"treegrid").options;
var _ec=$(_ea).treegrid("find",id);
$.extend(_ec,row);
var _ed=$(_ea).treegrid("getLevel",id)-1;
var _ee=_eb.rowStyler?_eb.rowStyler.call(_ea,_ec):"";
var _ef=$.data(_ea,"datagrid").rowIdPrefix;
var _f0=_ec[_eb.idField];
function _f1(_f2){
var _f3=$(_ea).treegrid("getColumnFields",_f2);
var tr=_eb.finder.getTr(_ea,id,"body",(_f2?1:2));
var _f4=tr.find("div.datagrid-cell-rownumber").html();
var _f5=tr.find("div.datagrid-cell-check input[type=checkbox]").is(":checked");
tr.html(this.renderRow(_ea,_f3,_f2,_ed,_ec));
tr.attr("style",_ee||"");
tr.find("div.datagrid-cell-rownumber").html(_f4);
if(_f5){
tr.find("div.datagrid-cell-check input[type=checkbox]")._propAttr("checked",true);
}
if(_f0!=id){
tr.attr("id",_ef+"-"+(_f2?1:2)+"-"+_f0);
tr.attr("node-id",_f0);
}
};
_f1.call(this,true);
_f1.call(this,false);
$(_ea).treegrid("fixRowHeight",id);
},deleteRow:function(_f6,id){
var _f7=$.data(_f6,"treegrid").options;
var tr=_f7.finder.getTr(_f6,id);
tr.next("tr.treegrid-tr-tree").remove();
tr.remove();
var _f8=del(id);
if(_f8){
if(_f8.children.length==0){
tr=_f7.finder.getTr(_f6,_f8[_f7.idField]);
tr.next("tr.treegrid-tr-tree").remove();
var _f9=tr.children("td[field=\""+_f7.treeField+"\"]").children("div.datagrid-cell");
_f9.find(".tree-icon").removeClass("tree-folder").addClass("tree-file");
_f9.find(".tree-hit").remove();
$("<span class=\"tree-indent\"></span>").prependTo(_f9);
}
}
function del(id){
var cc;
var _fa=$(_f6).treegrid("getParent",id);
if(_fa){
cc=_fa.children;
}else{
cc=$(_f6).treegrid("getData");
}
for(var i=0;i<cc.length;i++){
if(cc[i][_f7.idField]==id){
cc.splice(i,1);
break;
}
}
return _fa;
};
},onBeforeRender:function(_fb,_fc,_fd){
if($.isArray(_fc)){
_fd={total:_fc.length,rows:_fc};
_fc=null;
}
if(!_fd){
return false;
}
var _fe=$.data(_fb,"treegrid");
var _ff=_fe.options;
if(_fd.length==undefined){
if(_fd.footer){
_fe.footer=_fd.footer;
}
if(_fd.total){
_fe.total=_fd.total;
}
_fd=this.transfer(_fb,_fc,_fd.rows);
}else{
function _100(_101,_102){
for(var i=0;i<_101.length;i++){
var row=_101[i];
row._parentId=_102;
if(row.children&&row.children.length){
_100(row.children,row[_ff.idField]);
}
}
};
_100(_fd,_fc);
}
var node=_41(_fb,_fc);
if(node){
if(node.children){
node.children=node.children.concat(_fd);
}else{
node.children=_fd;
}
}else{
_fe.data=_fe.data.concat(_fd);
}
this.sort(_fb,_fd);
this.treeNodes=_fd;
this.treeLevel=$(_fb).treegrid("getLevel",_fc);
},sort:function(_103,data){
var opts=$.data(_103,"treegrid").options;
if(!opts.remoteSort&&opts.sortName){
var _104=opts.sortName.split(",");
var _105=opts.sortOrder.split(",");
_106(data);
}
function _106(rows){
rows.sort(function(r1,r2){
var r=0;
for(var i=0;i<_104.length;i++){
var sn=_104[i];
var so=_105[i];
var col=$(_103).treegrid("getColumnOption",sn);
var _107=col.sorter||function(a,b){
return a==b?0:(a>b?1:-1);
};
r=_107(r1[sn],r2[sn])*(so=="asc"?1:-1);
if(r!=0){
return r;
}
}
return r;
});
for(var i=0;i<rows.length;i++){
var _108=rows[i].children;
if(_108&&_108.length){
_106(_108);
}
}
};
},transfer:function(_109,_10a,data){
var opts=$.data(_109,"treegrid").options;
var rows=[];
for(var i=0;i<data.length;i++){
rows.push(data[i]);
}
var _10b=[];
for(var i=0;i<rows.length;i++){
var row=rows[i];
if(!_10a){
if(!row._parentId){
_10b.push(row);
rows.splice(i,1);
i--;
}
}else{
if(row._parentId==_10a){
_10b.push(row);
rows.splice(i,1);
i--;
}
}
}
var toDo=[];
for(var i=0;i<_10b.length;i++){
toDo.push(_10b[i]);
}
while(toDo.length){
var node=toDo.shift();
for(var i=0;i<rows.length;i++){
var row=rows[i];
if(row._parentId==node[opts.idField]){
if(node.children){
node.children.push(row);
}else{
node.children=[row];
}
toDo.push(row);
rows.splice(i,1);
i--;
}
}
}
return _10b;
}});
$.fn.treegrid.defaults=$.extend({},$.fn.datagrid.defaults,{treeField:null,lines:false,animate:false,singleSelect:true,view:_c5,loader:function(_10c,_10d,_10e){
var opts=$(this).treegrid("options");
if(!opts.url){
return false;
}
$.ajax({type:opts.method,url:opts.url,data:_10c,dataType:"json",success:function(data){
_10d(data);
},error:function(){
_10e.apply(this,arguments);
}});
},loadFilter:function(data,_10f){
return data;
},finder:{getTr:function(_110,id,type,_111){
type=type||"body";
_111=_111||0;
var dc=$.data(_110,"datagrid").dc;
if(_111==0){
var opts=$.data(_110,"treegrid").options;
var tr1=opts.finder.getTr(_110,id,type,1);
var tr2=opts.finder.getTr(_110,id,type,2);
return tr1.add(tr2);
}else{
if(type=="body"){
var tr=$("#"+$.data(_110,"datagrid").rowIdPrefix+"-"+_111+"-"+id);
if(!tr.length){
tr=(_111==1?dc.body1:dc.body2).find("tr[node-id=\""+id+"\"]");
}
return tr;
}else{
if(type=="footer"){
return (_111==1?dc.footer1:dc.footer2).find("tr[node-id=\""+id+"\"]");
}else{
if(type=="selected"){
return (_111==1?dc.body1:dc.body2).find("tr.datagrid-row-selected");
}else{
if(type=="highlight"){
return (_111==1?dc.body1:dc.body2).find("tr.datagrid-row-over");
}else{
if(type=="checked"){
return (_111==1?dc.body1:dc.body2).find("tr.datagrid-row-checked");
}else{
if(type=="last"){
return (_111==1?dc.body1:dc.body2).find("tr:last[node-id]");
}else{
if(type=="allbody"){
return (_111==1?dc.body1:dc.body2).find("tr[node-id]");
}else{
if(type=="allfooter"){
return (_111==1?dc.footer1:dc.footer2).find("tr[node-id]");
}
}
}
}
}
}
}
}
}
},getRow:function(_112,p){
var id=(typeof p=="object")?p.attr("node-id"):p;
return $(_112).treegrid("find",id);
},getRows:function(_113){
return $(_113).treegrid("getChildren");
}},onBeforeLoad:function(row,_114){
},onLoadSuccess:function(row,data){
},onLoadError:function(){
},onBeforeCollapse:function(row){
},onCollapse:function(row){
},onBeforeExpand:function(row){
},onExpand:function(row){
},onClickRow:function(row){
},onDblClickRow:function(row){
},onClickCell:function(_115,row){
},onDblClickCell:function(_116,row){
},onContextMenu:function(e,row){
},onBeforeEdit:function(row){
},onAfterEdit:function(row,_117){
},onCancelEdit:function(row){
}});
})(jQuery);

