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
$.fn._remove=function(){
return this.each(function(){
$(this).remove();
try{
this.outerHTML="";
}
catch(err){
}
});
};
function _1(_2){
_2._remove();
};
function _3(_4,_5){
var _6=$.data(_4,"panel");
var _7=_6.options;
var _8=_6.panel;
var _9=_8.children("div.panel-header");
var _a=_8.children("div.panel-body");
if(_5){
$.extend(_7,{width:_5.width,height:_5.height,minWidth:_5.minWidth,maxWidth:_5.maxWidth,minHeight:_5.minHeight,maxHeight:_5.maxHeight,left:_5.left,top:_5.top});
}
_8._size(_7);
_9.add(_a)._outerWidth(_8.width());
if(!isNaN(parseInt(_7.height))){
_a._outerHeight(_8.height()-_9._outerHeight());
}else{
_a.css("height","");
var _b=$.parser.parseValue("minHeight",_7.minHeight,_8.parent());
var _c=$.parser.parseValue("maxHeight",_7.maxHeight,_8.parent());
var _d=_9._outerHeight()+_8._outerHeight()-_8.height();
_a._size("minHeight",_b?(_b-_d):"");
_a._size("maxHeight",_c?(_c-_d):"");
}
_8.css({height:"",minHeight:"",maxHeight:"",left:_7.left,top:_7.top});
_7.onResize.apply(_4,[_7.width,_7.height]);
$(_4).panel("doLayout");
};
function _e(_f,_10){
var _11=$.data(_f,"panel").options;
var _12=$.data(_f,"panel").panel;
if(_10){
if(_10.left!=null){
_11.left=_10.left;
}
if(_10.top!=null){
_11.top=_10.top;
}
}
_12.css({left:_11.left,top:_11.top});
_11.onMove.apply(_f,[_11.left,_11.top]);
};
function _13(_14){
$(_14).addClass("panel-body")._size("clear");
var _15=$("<div class=\"panel\"></div>").insertBefore(_14);
_15[0].appendChild(_14);
_15.bind("_resize",function(e,_16){
if($(this).hasClass("easyui-fluid")||_16){
_3(_14);
}
return false;
});
return _15;
};
function _17(_18){
var _19=$.data(_18,"panel");
var _1a=_19.options;
var _1b=_19.panel;
_1b.css(_1a.style);
_1b.addClass(_1a.cls);
_1c();
var _1d=$(_18).panel("header");
var _1e=$(_18).panel("body");
if(_1a.border){
_1d.removeClass("panel-header-noborder");
_1e.removeClass("panel-body-noborder");
}else{
_1d.addClass("panel-header-noborder");
_1e.addClass("panel-body-noborder");
}
_1d.addClass(_1a.headerCls);
_1e.addClass(_1a.bodyCls);
$(_18).attr("id",_1a.id||"");
if(_1a.content){
$(_18).panel("clear");
$(_18).html(_1a.content);
$.parser.parse($(_18));
}
function _1c(){
if(_1a.tools&&typeof _1a.tools=="string"){
_1b.find(">div.panel-header>div.panel-tool .panel-tool-a").appendTo(_1a.tools);
}
_1(_1b.children("div.panel-header"));
if(_1a.title&&!_1a.noheader){
var _1f=$("<div class=\"panel-header\"></div>").prependTo(_1b);
var _20=$("<div class=\"panel-title\"></div>").html(_1a.title).appendTo(_1f);
if(_1a.iconCls){
_20.addClass("panel-with-icon");
$("<div class=\"panel-icon\"></div>").addClass(_1a.iconCls).appendTo(_1f);
}
var _21=$("<div class=\"panel-tool\"></div>").appendTo(_1f);
_21.bind("click",function(e){
e.stopPropagation();
});
if(_1a.tools){
if($.isArray(_1a.tools)){
for(var i=0;i<_1a.tools.length;i++){
var t=$("<a href=\"javascript:void(0)\"></a>").addClass(_1a.tools[i].iconCls).appendTo(_21);
if(_1a.tools[i].handler){
t.bind("click",eval(_1a.tools[i].handler));
}
}
}else{
$(_1a.tools).children().each(function(){
$(this).addClass($(this).attr("iconCls")).addClass("panel-tool-a").appendTo(_21);
});
}
}
if(_1a.collapsible){
$("<a class=\"panel-tool-collapse\" href=\"javascript:void(0)\"></a>").appendTo(_21).bind("click",function(){
if(_1a.collapsed==true){
_46(_18,true);
}else{
_36(_18,true);
}
return false;
});
}
if(_1a.minimizable){
$("<a class=\"panel-tool-min\" href=\"javascript:void(0)\"></a>").appendTo(_21).bind("click",function(){
_51(_18);
return false;
});
}
if(_1a.maximizable){
$("<a class=\"panel-tool-max\" href=\"javascript:void(0)\"></a>").appendTo(_21).bind("click",function(){
if(_1a.maximized==true){
_55(_18);
}else{
_35(_18);
}
return false;
});
}
if(_1a.closable){
$("<a class=\"panel-tool-close\" href=\"javascript:void(0)\"></a>").appendTo(_21).bind("click",function(){
_22(_18);
return false;
});
}
_1b.children("div.panel-body").removeClass("panel-body-noheader");
}else{
_1b.children("div.panel-body").addClass("panel-body-noheader");
}
};
};
function _23(_24,_25){
var _26=$.data(_24,"panel");
var _27=_26.options;
if(_28){
_27.queryParams=_25;
}
if(!_27.href){
return;
}
if(!_26.isLoaded||!_27.cache){
var _28=$.extend({},_27.queryParams);
if(_27.onBeforeLoad.call(_24,_28)==false){
return;
}
_26.isLoaded=false;
$(_24).panel("clear");
if(_27.loadingMessage){
$(_24).html($("<div class=\"panel-loading\"></div>").html(_27.loadingMessage));
}
_27.loader.call(_24,_28,function(_29){
var _2a=_27.extractor.call(_24,_29);
$(_24).html(_2a);
$.parser.parse($(_24));
_27.onLoad.apply(_24,arguments);
_26.isLoaded=true;
},function(){
_27.onLoadError.apply(_24,arguments);
});
}
};
function _2b(_2c){
var t=$(_2c);
t.find(".combo-f").each(function(){
$(this).combo("destroy");
});
t.find(".m-btn").each(function(){
$(this).menubutton("destroy");
});
t.find(".s-btn").each(function(){
$(this).splitbutton("destroy");
});
t.find(".tooltip-f").each(function(){
$(this).tooltip("destroy");
});
t.children("div").each(function(){
$(this)._size("unfit");
});
t.empty();
};
function _2d(_2e){
$(_2e).panel("doLayout",true);
};
function _2f(_30,_31){
var _32=$.data(_30,"panel").options;
var _33=$.data(_30,"panel").panel;
if(_31!=true){
if(_32.onBeforeOpen.call(_30)==false){
return;
}
}
_33.show();
_32.closed=false;
_32.minimized=false;
var _34=_33.children("div.panel-header").find("a.panel-tool-restore");
if(_34.length){
_32.maximized=true;
}
_32.onOpen.call(_30);
if(_32.maximized==true){
_32.maximized=false;
_35(_30);
}
if(_32.collapsed==true){
_32.collapsed=false;
_36(_30);
}
if(!_32.collapsed){
_23(_30);
_2d(_30);
}
};
function _22(_37,_38){
var _39=$.data(_37,"panel").options;
var _3a=$.data(_37,"panel").panel;
if(_38!=true){
if(_39.onBeforeClose.call(_37)==false){
return;
}
}
_3a._size("unfit");
_3a.hide();
_39.closed=true;
_39.onClose.call(_37);
};
function _3b(_3c,_3d){
var _3e=$.data(_3c,"panel").options;
var _3f=$.data(_3c,"panel").panel;
if(_3d!=true){
if(_3e.onBeforeDestroy.call(_3c)==false){
return;
}
}
$(_3c).panel("clear");
_1(_3f);
_3e.onDestroy.call(_3c);
};
function _36(_40,_41){
var _42=$.data(_40,"panel").options;
var _43=$.data(_40,"panel").panel;
var _44=_43.children("div.panel-body");
var _45=_43.children("div.panel-header").find("a.panel-tool-collapse");
if(_42.collapsed==true){
return;
}
_44.stop(true,true);
if(_42.onBeforeCollapse.call(_40)==false){
return;
}
_45.addClass("panel-tool-expand");
if(_41==true){
_44.slideUp("normal",function(){
_42.collapsed=true;
_42.onCollapse.call(_40);
});
}else{
_44.hide();
_42.collapsed=true;
_42.onCollapse.call(_40);
}
};
function _46(_47,_48){
var _49=$.data(_47,"panel").options;
var _4a=$.data(_47,"panel").panel;
var _4b=_4a.children("div.panel-body");
var _4c=_4a.children("div.panel-header").find("a.panel-tool-collapse");
if(_49.collapsed==false){
return;
}
_4b.stop(true,true);
if(_49.onBeforeExpand.call(_47)==false){
return;
}
_4c.removeClass("panel-tool-expand");
if(_48==true){
_4b.slideDown("normal",function(){
_49.collapsed=false;
_49.onExpand.call(_47);
_23(_47);
_2d(_47);
});
}else{
_4b.show();
_49.collapsed=false;
_49.onExpand.call(_47);
_23(_47);
_2d(_47);
}
};
function _35(_4d){
var _4e=$.data(_4d,"panel").options;
var _4f=$.data(_4d,"panel").panel;
var _50=_4f.children("div.panel-header").find("a.panel-tool-max");
if(_4e.maximized==true){
return;
}
_50.addClass("panel-tool-restore");
if(!$.data(_4d,"panel").original){
$.data(_4d,"panel").original={width:_4e.width,height:_4e.height,left:_4e.left,top:_4e.top,fit:_4e.fit};
}
_4e.left=0;
_4e.top=0;
_4e.fit=true;
_3(_4d);
_4e.minimized=false;
_4e.maximized=true;
_4e.onMaximize.call(_4d);
};
function _51(_52){
var _53=$.data(_52,"panel").options;
var _54=$.data(_52,"panel").panel;
_54._size("unfit");
_54.hide();
_53.minimized=true;
_53.maximized=false;
_53.onMinimize.call(_52);
};
function _55(_56){
var _57=$.data(_56,"panel").options;
var _58=$.data(_56,"panel").panel;
var _59=_58.children("div.panel-header").find("a.panel-tool-max");
if(_57.maximized==false){
return;
}
_58.show();
_59.removeClass("panel-tool-restore");
$.extend(_57,$.data(_56,"panel").original);
_3(_56);
_57.minimized=false;
_57.maximized=false;
$.data(_56,"panel").original=null;
_57.onRestore.call(_56);
};
function _5a(_5b,_5c){
$.data(_5b,"panel").options.title=_5c;
$(_5b).panel("header").find("div.panel-title").html(_5c);
};
var _5d=null;
$(window).unbind(".panel").bind("resize.panel",function(){
if(_5d){
clearTimeout(_5d);
}
_5d=setTimeout(function(){
var _5e=$("body.layout");
if(_5e.length){
_5e.layout("resize");
}else{
$("body").panel("doLayout");
}
_5d=null;
},100);
});
$.fn.panel=function(_5f,_60){
if(typeof _5f=="string"){
return $.fn.panel.methods[_5f](this,_60);
}
_5f=_5f||{};
return this.each(function(){
var _61=$.data(this,"panel");
var _62;
if(_61){
_62=$.extend(_61.options,_5f);
_61.isLoaded=false;
}else{
_62=$.extend({},$.fn.panel.defaults,$.fn.panel.parseOptions(this),_5f);
$(this).attr("title","");
_61=$.data(this,"panel",{options:_62,panel:_13(this),isLoaded:false});
}
_17(this);
if(_62.doSize==true){
_61.panel.css("display","block");
_3(this);
}
if(_62.closed==true||_62.minimized==true){
_61.panel.hide();
}else{
_2f(this);
}
});
};
$.fn.panel.methods={options:function(jq){
return $.data(jq[0],"panel").options;
},panel:function(jq){
return $.data(jq[0],"panel").panel;
},header:function(jq){
return $.data(jq[0],"panel").panel.find(">div.panel-header");
},body:function(jq){
return $.data(jq[0],"panel").panel.find(">div.panel-body");
},setTitle:function(jq,_63){
return jq.each(function(){
_5a(this,_63);
});
},open:function(jq,_64){
return jq.each(function(){
_2f(this,_64);
});
},close:function(jq,_65){
return jq.each(function(){
_22(this,_65);
});
},destroy:function(jq,_66){
return jq.each(function(){
_3b(this,_66);
});
},clear:function(jq){
return jq.each(function(){
_2b(this);
});
},refresh:function(jq,_67){
return jq.each(function(){
var _68=$.data(this,"panel");
_68.isLoaded=false;
if(_67){
if(typeof _67=="string"){
_68.options.href=_67;
}else{
_68.options.queryParams=_67;
}
}
_23(this);
});
},resize:function(jq,_69){
return jq.each(function(){
_3(this,_69);
});
},doLayout:function(jq,all){
return jq.each(function(){
var _6a=this;
var _6b=_6a==$("body")[0];
var s=$(this).find("div.panel:visible,div.accordion:visible,div.tabs-container:visible,div.layout:visible,.easyui-fluid:visible").filter(function(_6c,el){
var p=$(el).parents("div.panel-body:first");
if(_6b){
return p.length==0;
}else{
return p[0]==_6a;
}
});
s.trigger("_resize",[all||false]);
});
},move:function(jq,_6d){
return jq.each(function(){
_e(this,_6d);
});
},maximize:function(jq){
return jq.each(function(){
_35(this);
});
},minimize:function(jq){
return jq.each(function(){
_51(this);
});
},restore:function(jq){
return jq.each(function(){
_55(this);
});
},collapse:function(jq,_6e){
return jq.each(function(){
_36(this,_6e);
});
},expand:function(jq,_6f){
return jq.each(function(){
_46(this,_6f);
});
}};
$.fn.panel.parseOptions=function(_70){
var t=$(_70);
return $.extend({},$.parser.parseOptions(_70,["id","width","height","left","top","title","iconCls","cls","headerCls","bodyCls","tools","href","method",{cache:"boolean",fit:"boolean",border:"boolean",noheader:"boolean"},{collapsible:"boolean",minimizable:"boolean",maximizable:"boolean"},{closable:"boolean",collapsed:"boolean",minimized:"boolean",maximized:"boolean",closed:"boolean"}]),{loadingMessage:(t.attr("loadingMessage")!=undefined?t.attr("loadingMessage"):undefined)});
};
$.fn.panel.defaults={id:null,title:null,iconCls:null,width:"auto",height:"auto",left:null,top:null,cls:null,headerCls:null,bodyCls:null,style:{},href:null,cache:true,fit:false,border:true,doSize:true,noheader:false,content:null,collapsible:false,minimizable:false,maximizable:false,closable:false,collapsed:false,minimized:false,maximized:false,closed:false,tools:null,queryParams:{},method:"get",href:null,loadingMessage:"Loading...",loader:function(_71,_72,_73){
var _74=$(this).panel("options");
if(!_74.href){
return false;
}
$.ajax({type:_74.method,url:_74.href,cache:false,data:_71,dataType:"html",success:function(_75){
_72(_75);
},error:function(){
_73.apply(this,arguments);
}});
},extractor:function(_76){
var _77=/<body[^>]*>((.|[\n\r])*)<\/body>/im;
var _78=_77.exec(_76);
if(_78){
return _78[1];
}else{
return _76;
}
},onBeforeLoad:function(_79){
},onLoad:function(){
},onLoadError:function(){
},onBeforeOpen:function(){
},onOpen:function(){
},onBeforeClose:function(){
},onClose:function(){
},onBeforeDestroy:function(){
},onDestroy:function(){
},onResize:function(_7a,_7b){
},onMove:function(_7c,top){
},onMaximize:function(){
},onRestore:function(){
},onMinimize:function(){
},onBeforeCollapse:function(){
},onBeforeExpand:function(){
},onCollapse:function(){
},onExpand:function(){
}};
})(jQuery);

