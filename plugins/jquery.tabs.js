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
var _3=$.data(_2,"tabs").options;
if(_3.tabPosition=="left"||_3.tabPosition=="right"||!_3.showHeader){
return;
}
var _4=$(_2).children("div.tabs-header");
var _5=_4.children("div.tabs-tool");
var _6=_4.children("div.tabs-scroller-left");
var _7=_4.children("div.tabs-scroller-right");
var _8=_4.children("div.tabs-wrap");
var _9=_4.outerHeight();
if(_3.plain){
_9-=_9-_4.height();
}
_5._outerHeight(_9);
var _a=0;
$("ul.tabs li",_4).each(function(){
_a+=$(this).outerWidth(true);
});
var _b=_4.width()-_5._outerWidth();
if(_a>_b){
_6.add(_7).show()._outerHeight(_9);
if(_3.toolPosition=="left"){
_5.css({left:_6.outerWidth(),right:""});
_8.css({marginLeft:_6.outerWidth()+_5._outerWidth(),marginRight:_7._outerWidth(),width:_b-_6.outerWidth()-_7.outerWidth()});
}else{
_5.css({left:"",right:_7.outerWidth()});
_8.css({marginLeft:_6.outerWidth(),marginRight:_7.outerWidth()+_5._outerWidth(),width:_b-_6.outerWidth()-_7.outerWidth()});
}
}else{
_6.add(_7).hide();
if(_3.toolPosition=="left"){
_5.css({left:0,right:""});
_8.css({marginLeft:_5._outerWidth(),marginRight:0,width:_b});
}else{
_5.css({left:"",right:0});
_8.css({marginLeft:0,marginRight:_5._outerWidth(),width:_b});
}
}
};
function _c(_d){
var _e=$.data(_d,"tabs").options;
var _f=$(_d).children("div.tabs-header");
if(_e.tools){
if(typeof _e.tools=="string"){
$(_e.tools).addClass("tabs-tool").appendTo(_f);
$(_e.tools).show();
}else{
_f.children("div.tabs-tool").remove();
var _10=$("<div class=\"tabs-tool\"><table cellspacing=\"0\" cellpadding=\"0\" style=\"height:100%\"><tr></tr></table></div>").appendTo(_f);
var tr=_10.find("tr");
for(var i=0;i<_e.tools.length;i++){
var td=$("<td></td>").appendTo(tr);
var _11=$("<a href=\"javascript:void(0);\"></a>").appendTo(td);
_11[0].onclick=eval(_e.tools[i].handler||function(){
});
_11.linkbutton($.extend({},_e.tools[i],{plain:true}));
}
}
}else{
_f.children("div.tabs-tool").remove();
}
};
function _12(_13,_14){
var _15=$.data(_13,"tabs");
var _16=_15.options;
var cc=$(_13);
if(_14){
$.extend(_16,{width:_14.width,height:_14.height});
}
cc._size(_16);
var _17=cc.children("div.tabs-header");
var _18=cc.children("div.tabs-panels");
var _19=_17.find("div.tabs-wrap");
var ul=_19.find(".tabs");
for(var i=0;i<_15.tabs.length;i++){
var _1a=_15.tabs[i].panel("options");
var p_t=_1a.tab.find("a.tabs-inner");
var _1b=parseInt(_1a.tabWidth||_16.tabWidth)||undefined;
if(_1b){
p_t._outerWidth(_1b);
}else{
p_t.css("width","");
}
p_t._outerHeight(_16.tabHeight);
p_t.css("lineHeight",p_t.height()+"px");
}
if(_16.tabPosition=="left"||_16.tabPosition=="right"){
_17._outerWidth(_16.showHeader?_16.headerWidth:0);
_18._outerWidth(cc.width()-_17.outerWidth());
_17.add(_18)._outerHeight(_16.height);
_19._outerWidth(_17.width());
ul._outerWidth(_19.width()).css("height","");
}else{
var lrt=_17.children("div.tabs-scroller-left,div.tabs-scroller-right,div.tabs-tool");
_17._outerWidth(_16.width).css("height","");
if(_16.showHeader){
_17.css("background-color","");
_19.css("height","");
lrt.show();
}else{
_17.css("background-color","transparent");
_17._outerHeight(0);
_19._outerHeight(0);
lrt.hide();
}
ul._outerHeight(_16.tabHeight).css("width","");
_1(_13);
_18._size("height",isNaN(_16.height)?"":(_16.height-_17.outerHeight()));
_18._size("width",isNaN(_16.width)?"":_16.width);
}
};
function _1c(_1d){
var _1e=$.data(_1d,"tabs").options;
var tab=_1f(_1d);
if(tab){
var _20=$(_1d).children("div.tabs-panels");
var _21=_1e.width=="auto"?"auto":_20.width();
var _22=_1e.height=="auto"?"auto":_20.height();
tab.panel("resize",{width:_21,height:_22});
}
};
function _23(_24){
var _25=$.data(_24,"tabs").tabs;
var cc=$(_24);
cc.addClass("tabs-container");
var pp=$("<div class=\"tabs-panels\"></div>").insertBefore(cc);
cc.children("div").each(function(){
pp[0].appendChild(this);
});
cc[0].appendChild(pp[0]);
$("<div class=\"tabs-header\">"+"<div class=\"tabs-scroller-left\"></div>"+"<div class=\"tabs-scroller-right\"></div>"+"<div class=\"tabs-wrap\">"+"<ul class=\"tabs\"></ul>"+"</div>"+"</div>").prependTo(_24);
cc.children("div.tabs-panels").children("div").each(function(i){
var _26=$.extend({},$.parser.parseOptions(this),{selected:($(this).attr("selected")?true:undefined)});
var pp=$(this);
_25.push(pp);
_35(_24,pp,_26);
});
cc.children("div.tabs-header").find(".tabs-scroller-left, .tabs-scroller-right").hover(function(){
$(this).addClass("tabs-scroller-over");
},function(){
$(this).removeClass("tabs-scroller-over");
});
cc.bind("_resize",function(e,_27){
if($(this).hasClass("easyui-fluid")||_27){
_12(_24);
_1c(_24);
}
return false;
});
};
function _28(_29){
var _2a=$.data(_29,"tabs");
var _2b=_2a.options;
$(_29).children("div.tabs-header").unbind().bind("click",function(e){
if($(e.target).hasClass("tabs-scroller-left")){
$(_29).tabs("scrollBy",-_2b.scrollIncrement);
}else{
if($(e.target).hasClass("tabs-scroller-right")){
$(_29).tabs("scrollBy",_2b.scrollIncrement);
}else{
var li=$(e.target).closest("li");
if(li.hasClass("tabs-disabled")){
return;
}
var a=$(e.target).closest("a.tabs-close");
if(a.length){
_4b(_29,_2c(li));
}else{
if(li.length){
var _2d=_2c(li);
var _2e=_2a.tabs[_2d].panel("options");
if(_2e.collapsible){
_2e.closed?_40(_29,_2d):_6a(_29,_2d);
}else{
_40(_29,_2d);
}
}
}
}
}
}).bind("contextmenu",function(e){
var li=$(e.target).closest("li");
if(li.hasClass("tabs-disabled")){
return;
}
if(li.length){
_2b.onContextMenu.call(_29,e,li.find("span.tabs-title").html(),_2c(li));
}
});
function _2c(li){
var _2f=0;
li.parent().children("li").each(function(i){
if(li[0]==this){
_2f=i;
return false;
}
});
return _2f;
};
};
function _30(_31){
var _32=$.data(_31,"tabs").options;
var _33=$(_31).children("div.tabs-header");
var _34=$(_31).children("div.tabs-panels");
_33.removeClass("tabs-header-top tabs-header-bottom tabs-header-left tabs-header-right");
_34.removeClass("tabs-panels-top tabs-panels-bottom tabs-panels-left tabs-panels-right");
if(_32.tabPosition=="top"){
_33.insertBefore(_34);
}else{
if(_32.tabPosition=="bottom"){
_33.insertAfter(_34);
_33.addClass("tabs-header-bottom");
_34.addClass("tabs-panels-top");
}else{
if(_32.tabPosition=="left"){
_33.addClass("tabs-header-left");
_34.addClass("tabs-panels-right");
}else{
if(_32.tabPosition=="right"){
_33.addClass("tabs-header-right");
_34.addClass("tabs-panels-left");
}
}
}
}
if(_32.plain==true){
_33.addClass("tabs-header-plain");
}else{
_33.removeClass("tabs-header-plain");
}
if(_32.border==true){
_33.removeClass("tabs-header-noborder");
_34.removeClass("tabs-panels-noborder");
}else{
_33.addClass("tabs-header-noborder");
_34.addClass("tabs-panels-noborder");
}
};
function _35(_36,pp,_37){
var _38=$.data(_36,"tabs");
_37=_37||{};
pp.panel($.extend({},_37,{border:false,noheader:true,closed:true,doSize:false,iconCls:(_37.icon?_37.icon:undefined),onLoad:function(){
if(_37.onLoad){
_37.onLoad.call(this,arguments);
}
_38.options.onLoad.call(_36,$(this));
}}));
var _39=pp.panel("options");
var _3a=$(_36).children("div.tabs-header").find("ul.tabs");
_39.tab=$("<li></li>").appendTo(_3a);
_39.tab.append("<a href=\"javascript:void(0)\" class=\"tabs-inner\">"+"<span class=\"tabs-title\"></span>"+"<span class=\"tabs-icon\"></span>"+"</a>");
$(_36).tabs("update",{tab:pp,options:_39});
};
function _3b(_3c,_3d){
var _3e=$.data(_3c,"tabs").options;
var _3f=$.data(_3c,"tabs").tabs;
if(_3d.selected==undefined){
_3d.selected=true;
}
var pp=$("<div></div>").appendTo($(_3c).children("div.tabs-panels"));
_3f.push(pp);
_35(_3c,pp,_3d);
_3e.onAdd.call(_3c,_3d.title,_3f.length-1);
_12(_3c);
if(_3d.selected){
_40(_3c,_3f.length-1);
}
};
function _41(_42,_43){
var _44=$.data(_42,"tabs").selectHis;
var pp=_43.tab;
var _45=pp.panel("options").title;
pp.panel($.extend({},_43.options,{iconCls:(_43.options.icon?_43.options.icon:undefined)}));
var _46=pp.panel("options");
var tab=_46.tab;
var _47=tab.find("span.tabs-title");
var _48=tab.find("span.tabs-icon");
_47.html(_46.title);
_48.attr("class","tabs-icon");
tab.find("a.tabs-close").remove();
if(_46.closable){
_47.addClass("tabs-closable");
$("<a href=\"javascript:void(0)\" class=\"tabs-close\"></a>").appendTo(tab);
}else{
_47.removeClass("tabs-closable");
}
if(_46.iconCls){
_47.addClass("tabs-with-icon");
_48.addClass(_46.iconCls);
}else{
_47.removeClass("tabs-with-icon");
}
if(_45!=_46.title){
for(var i=0;i<_44.length;i++){
if(_44[i]==_45){
_44[i]=_46.title;
}
}
}
tab.find("span.tabs-p-tool").remove();
if(_46.tools){
var _49=$("<span class=\"tabs-p-tool\"></span>").insertAfter(tab.find("a.tabs-inner"));
if($.isArray(_46.tools)){
for(var i=0;i<_46.tools.length;i++){
var t=$("<a href=\"javascript:void(0)\"></a>").appendTo(_49);
t.addClass(_46.tools[i].iconCls);
if(_46.tools[i].handler){
t.bind("click",{handler:_46.tools[i].handler},function(e){
if($(this).parents("li").hasClass("tabs-disabled")){
return;
}
e.data.handler.call(this);
});
}
}
}else{
$(_46.tools).children().appendTo(_49);
}
var pr=_49.children().length*12;
if(_46.closable){
pr+=8;
}else{
pr-=3;
_49.css("right","5px");
}
_47.css("padding-right",pr+"px");
}
_12(_42);
$.data(_42,"tabs").options.onUpdate.call(_42,_46.title,_4a(_42,pp));
};
function _4b(_4c,_4d){
var _4e=$.data(_4c,"tabs").options;
var _4f=$.data(_4c,"tabs").tabs;
var _50=$.data(_4c,"tabs").selectHis;
if(!_51(_4c,_4d)){
return;
}
var tab=_52(_4c,_4d);
var _53=tab.panel("options").title;
var _54=_4a(_4c,tab);
if(_4e.onBeforeClose.call(_4c,_53,_54)==false){
return;
}
var tab=_52(_4c,_4d,true);
tab.panel("options").tab.remove();
tab.panel("destroy");
_4e.onClose.call(_4c,_53,_54);
_12(_4c);
for(var i=0;i<_50.length;i++){
if(_50[i]==_53){
_50.splice(i,1);
i--;
}
}
var _55=_50.pop();
if(_55){
_40(_4c,_55);
}else{
if(_4f.length){
_40(_4c,0);
}
}
};
function _52(_56,_57,_58){
var _59=$.data(_56,"tabs").tabs;
if(typeof _57=="number"){
if(_57<0||_57>=_59.length){
return null;
}else{
var tab=_59[_57];
if(_58){
_59.splice(_57,1);
}
return tab;
}
}
for(var i=0;i<_59.length;i++){
var tab=_59[i];
if(tab.panel("options").title==_57){
if(_58){
_59.splice(i,1);
}
return tab;
}
}
return null;
};
function _4a(_5a,tab){
var _5b=$.data(_5a,"tabs").tabs;
for(var i=0;i<_5b.length;i++){
if(_5b[i][0]==$(tab)[0]){
return i;
}
}
return -1;
};
function _1f(_5c){
var _5d=$.data(_5c,"tabs").tabs;
for(var i=0;i<_5d.length;i++){
var tab=_5d[i];
if(tab.panel("options").closed==false){
return tab;
}
}
return null;
};
function _5e(_5f){
var _60=$.data(_5f,"tabs");
var _61=_60.tabs;
for(var i=0;i<_61.length;i++){
if(_61[i].panel("options").selected){
_40(_5f,i);
return;
}
}
_40(_5f,_60.options.selected);
};
function _40(_62,_63){
var _64=$.data(_62,"tabs");
var _65=_64.options;
var _66=_64.tabs;
var _67=_64.selectHis;
if(_66.length==0){
return;
}
var _68=_52(_62,_63);
if(!_68){
return;
}
var _69=_1f(_62);
if(_69){
if(_68[0]==_69[0]){
_1c(_62);
return;
}
_6a(_62,_4a(_62,_69));
if(!_69.panel("options").closed){
return;
}
}
_68.panel("open");
var _6b=_68.panel("options").title;
_67.push(_6b);
var tab=_68.panel("options").tab;
tab.addClass("tabs-selected");
var _6c=$(_62).find(">div.tabs-header>div.tabs-wrap");
var _6d=tab.position().left;
var _6e=_6d+tab.outerWidth();
if(_6d<0||_6e>_6c.width()){
var _6f=_6d-(_6c.width()-tab.width())/2;
$(_62).tabs("scrollBy",_6f);
}else{
$(_62).tabs("scrollBy",0);
}
_1c(_62);
_65.onSelect.call(_62,_6b,_4a(_62,_68));
};
function _6a(_70,_71){
var _72=$.data(_70,"tabs");
var p=_52(_70,_71);
if(p){
var _73=p.panel("options");
if(!_73.closed){
p.panel("close");
if(_73.closed){
_73.tab.removeClass("tabs-selected");
_72.options.onUnselect.call(_70,_73.title,_4a(_70,p));
}
}
}
};
function _51(_74,_75){
return _52(_74,_75)!=null;
};
function _76(_77,_78){
var _79=$.data(_77,"tabs").options;
_79.showHeader=_78;
$(_77).tabs("resize");
};
$.fn.tabs=function(_7a,_7b){
if(typeof _7a=="string"){
return $.fn.tabs.methods[_7a](this,_7b);
}
_7a=_7a||{};
return this.each(function(){
var _7c=$.data(this,"tabs");
if(_7c){
$.extend(_7c.options,_7a);
}else{
$.data(this,"tabs",{options:$.extend({},$.fn.tabs.defaults,$.fn.tabs.parseOptions(this),_7a),tabs:[],selectHis:[]});
_23(this);
}
_c(this);
_30(this);
_12(this);
_28(this);
_5e(this);
});
};
$.fn.tabs.methods={options:function(jq){
var cc=jq[0];
var _7d=$.data(cc,"tabs").options;
var s=_1f(cc);
_7d.selected=s?_4a(cc,s):-1;
return _7d;
},tabs:function(jq){
return $.data(jq[0],"tabs").tabs;
},resize:function(jq,_7e){
return jq.each(function(){
_12(this,_7e);
_1c(this);
});
},add:function(jq,_7f){
return jq.each(function(){
_3b(this,_7f);
});
},close:function(jq,_80){
return jq.each(function(){
_4b(this,_80);
});
},getTab:function(jq,_81){
return _52(jq[0],_81);
},getTabIndex:function(jq,tab){
return _4a(jq[0],tab);
},getSelected:function(jq){
return _1f(jq[0]);
},select:function(jq,_82){
return jq.each(function(){
_40(this,_82);
});
},unselect:function(jq,_83){
return jq.each(function(){
_6a(this,_83);
});
},exists:function(jq,_84){
return _51(jq[0],_84);
},update:function(jq,_85){
return jq.each(function(){
_41(this,_85);
});
},enableTab:function(jq,_86){
return jq.each(function(){
$(this).tabs("getTab",_86).panel("options").tab.removeClass("tabs-disabled");
});
},disableTab:function(jq,_87){
return jq.each(function(){
$(this).tabs("getTab",_87).panel("options").tab.addClass("tabs-disabled");
});
},showHeader:function(jq){
return jq.each(function(){
_76(this,true);
});
},hideHeader:function(jq){
return jq.each(function(){
_76(this,false);
});
},scrollBy:function(jq,_88){
return jq.each(function(){
var _89=$(this).tabs("options");
var _8a=$(this).find(">div.tabs-header>div.tabs-wrap");
var pos=Math.min(_8a._scrollLeft()+_88,_8b());
_8a.animate({scrollLeft:pos},_89.scrollDuration);
function _8b(){
var w=0;
var ul=_8a.children("ul");
ul.children("li").each(function(){
w+=$(this).outerWidth(true);
});
return w-_8a.width()+(ul.outerWidth()-ul.width());
};
});
}};
$.fn.tabs.parseOptions=function(_8c){
return $.extend({},$.parser.parseOptions(_8c,["tools","toolPosition","tabPosition",{fit:"boolean",border:"boolean",plain:"boolean",headerWidth:"number",tabWidth:"number",tabHeight:"number",selected:"number",showHeader:"boolean"}]));
};
$.fn.tabs.defaults={width:"auto",height:"auto",headerWidth:150,tabWidth:"auto",tabHeight:27,selected:0,showHeader:true,plain:false,fit:false,border:true,tools:null,toolPosition:"right",tabPosition:"top",scrollIncrement:100,scrollDuration:400,onLoad:function(_8d){
},onSelect:function(_8e,_8f){
},onUnselect:function(_90,_91){
},onBeforeClose:function(_92,_93){
},onClose:function(_94,_95){
},onAdd:function(_96,_97){
},onUpdate:function(_98,_99){
},onContextMenu:function(e,_9a,_9b){
}};
})(jQuery);

