/*!
 * 
 * Angle - Bootstrap Admin App + jQuery
 * 
 * Version: 3.2.0
 * Author: @themicon_co
 * Website: http://themicon.co
 * License: https://wrapbootstrap.com/help/licenses
 * 
 */
!function(e,t,a,n){if("undefined"==typeof a)throw new Error("This application's JavaScript requires jQuery");a(function(){var e=a("body");(new StateToggler).restoreState(e),a("#chk-fixed").prop("checked",e.hasClass("layout-fixed")),a("#chk-collapsed").prop("checked",e.hasClass("aside-collapsed")),a("#chk-boxed").prop("checked",e.hasClass("layout-boxed")),a("#chk-float").prop("checked",e.hasClass("aside-float")),a("#chk-hover").prop("checked",e.hasClass("aside-hover")),a(".offsidebar.hide").removeClass("hide")})}(window,document,window.jQuery),function(e,t,a,n){a(function(){a('[data-toggle="popover"]').popover(),a('[data-toggle="tooltip"]').tooltip({container:"body"}),a(".dropdown input").on("click focus",function(e){e.stopPropagation()})})}(window,document,window.jQuery),function(e,t,a){"use strict";var n="[data-reset-key]";e(a).on("click",n,function(a){a.preventDefault();var n=e(this).data("resetKey");n?(e.localStorage.remove(n),t.location.reload()):e.error("No storage key specified for reset.")})}(jQuery,window,document),function(e,t,a,n){e.APP_COLORS={primary:"#5d9cec",success:"#27c24c",info:"#23b7e5",warning:"#ff902b",danger:"#f05050",inverse:"#131e26",green:"#37bc9b",pink:"#f532e5",purple:"#7266ba",dark:"#3a3f51",yellow:"#fad732","gray-darker":"#232735","gray-dark":"#3a3f51",gray:"#dde6e9","gray-light":"#e4eaec","gray-lighter":"#edf1f2"},e.APP_MEDIAQUERY={desktopLG:1200,desktop:992,tablet:768,mobile:480}}(window,document,window.jQuery),function(e,t,a,n){function o(e){var t="autoloaded-stylesheet",n=a("#"+t).attr("id",t+"-old");return a("head").append(a("<link/>").attr({id:t,rel:"stylesheet",href:e})),n.length&&n.remove(),a("#"+t)}a(function(){a("#chk-fixed").on("change",function(e){if(a("#chk-fixed").prop("checked")){var t=a(this);t.is("a")&&e.preventDefault();var n,i=t.data("loadCss");i?(n=o(i),n||a.error("Error creating stylesheet link element.")):a.error("No stylesheet location defined.")}else a("#autoloaded-stylesheet").remove()})})}(window,document,window.jQuery),function(e,t,a,n){var o="ru",i="i18n",s="site",r="jq-appLang";a(function(){function e(e){a("[data-localize]").localize(s,e)}if(a.fn.localize){var t=a.localStorage.get(r)||o,n={language:t,pathPrefix:i,callback:function(e,n){a.localStorage.set(r,t),n(e)}};e(n),a("[data-set-lang]").on("click",function(){t=a(this).data("setLang"),t&&(n.language=t,e(n),a(".delay-selector").select2({minimumResultsForSearch:1/0}),a(".favorite-selector").select2({}),a(".payment-selector").select2({}))})}})}(window,document,window.jQuery),function(e,t,a,n){a(function(){var e=new o,n=a("[data-search-open]");n.on("click",function(e){e.stopPropagation()}).on("click",e.toggle);var i=a("[data-search-dismiss]"),s='.navbar-form input[type="text"]';a(s).on("click",function(e){e.stopPropagation()}).on("keyup",function(t){27==t.keyCode&&e.dismiss()}),a(t).on("click",e.dismiss),i.on("click",function(e){e.stopPropagation()}).on("click",e.dismiss)});var o=function(){var e="form.navbar-form";return{toggle:function(){var t=a(e);t.toggleClass("open");var n=t.hasClass("open");t.find("input")[n?"focus":"blur"]()},dismiss:function(){a(e).removeClass("open").find('input[type="text"]').blur().val("")}}}}(window,document,window.jQuery),function(e,t,a){"use strict";function n(t){var a=t.data("message"),n=t.data("options");a||e.error("Notify: No message specified"),e.notify(a,n||{})}var o="[data-notify]";e(a);e(function(){e(o).each(function(){var t=e(this),a=t.data("onload");void 0!==a&&setTimeout(function(){n(t)},800),t.on("click",function(e){e.preventDefault(),n(t)})})})}(jQuery,window,document),function(e,t,a){var n={},o={},i=function(t){return"string"==e.type(t)&&(t={message:t}),arguments[1]&&(t=e.extend(t,"string"==e.type(arguments[1])?{status:arguments[1]}:arguments[1])),new r(t).show()},s=function(e,t){if(e)for(var a in o)e===o[a].group&&o[a].close(t);else for(var a in o)o[a].close(t)},r=function(t){this.options=e.extend({},r.defaults,t),this.uuid="ID"+(new Date).getTime()+"RAND"+Math.ceil(1e5*Math.random()),this.element=e(['<div class="uk-notify-message alert-dismissable">','<a class="close icon-cross"></a>',"<div>"+this.options.message+"</div>","</div>"].join("")).data("notifyMessage",this),this.options.status&&(this.element.addClass("alert alert-"+this.options.status),this.currentstatus=this.options.status),this.group=this.options.group,o[this.uuid]=this,n[this.options.pos]||(n[this.options.pos]=e('<div class="uk-notify uk-notify-'+this.options.pos+'"></div>').appendTo("body").on("click",".uk-notify-message",function(){e(this).data("notifyMessage").close()}))};return e.extend(r.prototype,{uuid:!1,element:!1,timout:!1,currentstatus:"",group:!1,show:function(){if(!this.element.is(":visible")){var e=this;n[this.options.pos].show().prepend(this.element);var t=parseInt(this.element.css("margin-bottom"),10);return this.element.css({opacity:0,"margin-top":-1*this.element.outerHeight(),"margin-bottom":0}).animate({opacity:1,"margin-top":0,"margin-bottom":t},function(){if(e.options.timeout){var t=function(){e.close()};e.timeout=setTimeout(t,e.options.timeout),e.element.hover(function(){clearTimeout(e.timeout)},function(){e.timeout=setTimeout(t,e.options.timeout)})}}),this}},close:function(e){var t=this,a=function(){t.element.remove(),n[t.options.pos].children().length||n[t.options.pos].hide(),delete o[t.uuid]};this.timeout&&clearTimeout(this.timeout),e?a():this.element.animate({opacity:0,"margin-top":-1*this.element.outerHeight(),"margin-bottom":0},function(){a()})},content:function(e){var t=this.element.find(">div");return e?(t.html(e),this):t.html()},status:function(e){return e?(this.element.removeClass("alert alert-"+this.currentstatus).addClass("alert alert-"+e),this.currentstatus=e,this):this.currentstatus}}),r.defaults={message:"",status:"normal",timeout:5e3,group:null,pos:"bottom-right"},e.notify=i,e.notify.message=r,e.notify.closeAll=s,i}(jQuery,window,document),function(e,t,a){"use strict";var n='[data-tool="panel-dismiss"]',o="panel.remove",i="panel.removed";e(a).on("click",n,function(){function t(){e.support.animation?n.animo({animation:"bounceOut"},a):a()}function a(){var t=n.parent();e.when(n.trigger(i,[n])).done(function(){n.remove(),t.trigger(i).filter(function(){var t=e(this);return t.is('[class*="col-"]:not(.sortable)')&&0===t.children("*").length}).remove()})}var n=e(this).closest(".panel"),s=new e.Deferred;n.trigger(o,[n,s]),s.done(t)})}(jQuery,window,document),function(e,t,a){"use strict";function n(e){e.removeClass("fa-plus").addClass("fa-minus")}function o(e){e.removeClass("fa-minus").addClass("fa-plus")}function i(t,a){var n=e.localStorage.get(l);n||(n={}),n[t]=a,e.localStorage.set(l,n)}function s(t){var a=e.localStorage.get(l);return a?a[t]||!1:void 0}var r='[data-tool="panel-collapse"]',l="jq-panelState";e(r).each(function(){var t=e(this),a=t.closest(".panel"),r=a.find(".panel-wrapper"),l={toggle:!1},c=t.children("em"),u=a.attr("id");r.length||(r=a.children(".panel-heading").nextAll().wrapAll("<div/>").parent().addClass("panel-wrapper"),l={}),r.collapse(l).on("hide.bs.collapse",function(){o(c),i(u,"hide"),r.prev(".panel-heading").addClass("panel-heading-collapsed")}).on("show.bs.collapse",function(){n(c),i(u,"show"),r.prev(".panel-heading").removeClass("panel-heading-collapsed")});var d=s(u);d&&(setTimeout(function(){r.collapse(d)},0),i(u,d))}),e(a).on("click",r,function(){var t=e(this).closest(".panel"),a=t.find(".panel-wrapper");a.collapse("toggle")})}(jQuery,window,document),function(e,t,a){"use strict";function n(){this.removeClass(s)}var o='[data-tool="panel-refresh"]',i="panel.refresh",s="whirl",r="standard";e(a).on("click",o,function(){var t=e(this),a=t.parents(".panel").eq(0),o=t.data("spinner")||r;a.addClass(s+" "+o),a.removeSpinner=n,t.trigger(i,[a])})}(jQuery,window,document),function(e,t,a,n){a(function(){a.fn.select2&&a(".delay-selector").select2({minimumResultsForSearch:1/0})})}(window,document,window.jQuery),function(e,t,a,n){function o(){var e=a("<div/>",{"class":"dropdown-backdrop"});e.insertAfter(".aside").on("click mouseenter",function(){r()})}function i(e){e.siblings("li").removeClass("open").end().toggleClass("open")}function s(e){r();var t=e.children("ul");if(!t.length)return a();if(e.hasClass("open"))return i(e),a();var n=a(".aside"),o=a(".aside-inner"),s=parseInt(o.css("padding-top"),0)+parseInt(n.css("padding-top"),0),l=t.clone().appendTo(n);i(e);var c=e.position().top+s-g.scrollTop(),d=p.height();return l.addClass("nav-floating").css({position:u()?"fixed":"absolute",top:c,bottom:l.outerHeight(!0)+c>d?0:"auto"}),l.on("mouseleave",function(){i(e),l.remove()}),l}function r(){a(".sidebar-subnav.nav-floating").remove(),a(".dropdown-backdrop").remove(),a(".sidebar li.open").removeClass("open")}function l(){return f.hasClass("touch")}function c(){return h.hasClass("aside-collapsed")}function u(){return h.hasClass("layout-fixed")}function d(){return h.hasClass("aside-hover")}var p,f,h,g,m;a(function(){p=a(e),f=a("html"),h=a("body"),g=a(".sidebar"),m=APP_MEDIAQUERY;var t=g.find(".collapse");t.on("show.bs.collapse",function(e){e.stopPropagation(),0===a(this).parents(".collapse").length&&t.filter(".in").collapse("hide")});var n=a(".sidebar .active").parents("li");d()||n.addClass("active").children(".collapse").collapse("show"),g.find("li > a + ul").on("show.bs.collapse",function(e){d()&&e.preventDefault()});var i=l()?"click":"mouseenter",r=a();g.on(i,".nav > li",function(){(c()||d())&&(r.trigger("mouseleave"),r=s(a(this)),o())});var u=g.data("sidebarAnyclickClose");"undefined"!=typeof u&&a(".wrapper").on("click.sidebar",function(e){if(h.hasClass("aside-toggled")){var t=a(e.target);t.parents(".aside").length||t.is("#user-block-toggle")||t.parent().is("#user-block-toggle")||h.removeClass("aside-toggled")}})})}(window,document,window.jQuery),function(e,t,a,n){a(function(){var t=a("body");toggle=new StateToggler,a("[data-toggle-state]").on("click",function(o){o.stopPropagation();var i=a(this),s=i.data("toggleState"),r=i.data("target"),l=i.attr("data-no-persist")!==n,c=r?a(r):t;s&&(c.hasClass(s)?(c.removeClass(s),l||toggle.removeState(s)):(c.addClass(s),l||toggle.addState(s))),a(e).resize()})}),e.StateToggler=function(){var e="jq-toggleState",t={hasWord:function(e,t){return new RegExp("(^|\\s)"+t+"(\\s|$)").test(e)},addWord:function(e,t){return this.hasWord(e,t)?void 0:e+(e?" ":"")+t},removeWord:function(e,t){return this.hasWord(e,t)?e.replace(new RegExp("(^|\\s)*"+t+"(\\s|$)*","g"),""):void 0}};return{addState:function(n){var o=a.localStorage.get(e);o=o?t.addWord(o,n):n,a.localStorage.set(e,o)},removeState:function(n){var o=a.localStorage.get(e);o&&(o=t.removeWord(o,n),a.localStorage.set(e,o))},restoreState:function(t){var n=a.localStorage.get(e);n&&t.addClass(n)}}}}(window,document,window.jQuery),function(e,t,a){"use strict";var n=e("html"),o=e(t);e.support.transition=function(){var e=function(){var e,t=a.body||a.documentElement,n={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(e in n)if(void 0!==t.style[e])return n[e]}();return e&&{end:e}}(),e.support.animation=function(){var e=function(){var e,t=a.body||a.documentElement,n={WebkitAnimation:"webkitAnimationEnd",MozAnimation:"animationend",OAnimation:"oAnimationEnd oanimationend",animation:"animationend"};for(e in n)if(void 0!==t.style[e])return n[e]}();return e&&{end:e}}(),e.support.requestAnimationFrame=t.requestAnimationFrame||t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||t.msRequestAnimationFrame||t.oRequestAnimationFrame||function(e){t.setTimeout(e,1e3/60)},e.support.touch="ontouchstart"in t&&navigator.userAgent.toLowerCase().match(/mobile|tablet/)||t.DocumentTouch&&document instanceof t.DocumentTouch||t.navigator.msPointerEnabled&&t.navigator.msMaxTouchPoints>0||t.navigator.pointerEnabled&&t.navigator.maxTouchPoints>0||!1,e.support.mutationobserver=t.MutationObserver||t.WebKitMutationObserver||t.MozMutationObserver||null,e.Utils={},e.Utils.debounce=function(e,t,a){var n;return function(){var o=this,i=arguments,s=function(){n=null,a||e.apply(o,i)},r=a&&!n;clearTimeout(n),n=setTimeout(s,t),r&&e.apply(o,i)}},e.Utils.removeCssRules=function(e){var t,a,n,o,i,s,r,l,c,u;e&&setTimeout(function(){try{for(u=document.styleSheets,o=0,r=u.length;r>o;o++){for(n=u[o],a=[],n.cssRules=n.cssRules,t=i=0,l=n.cssRules.length;l>i;t=++i)n.cssRules[t].type===CSSRule.STYLE_RULE&&e.test(n.cssRules[t].selectorText)&&a.unshift(t);for(s=0,c=a.length;c>s;s++)n.deleteRule(a[s])}}catch(d){}},0)},e.Utils.isInView=function(t,a){var n=e(t);if(!n.is(":visible"))return!1;var i=o.scrollLeft(),s=o.scrollTop(),r=n.offset(),l=r.left,c=r.top;return a=e.extend({topoffset:0,leftoffset:0},a),c+n.height()>=s&&c-a.topoffset<=s+o.height()&&l+n.width()>=i&&l-a.leftoffset<=i+o.width()?!0:!1},e.Utils.options=function(t){if(e.isPlainObject(t))return t;var a=t?t.indexOf("{"):-1,n={};if(-1!=a)try{n=new Function("","var json = "+t.substr(a)+"; return JSON.parse(JSON.stringify(json));")()}catch(o){}return n},e.Utils.events={},e.Utils.events.click=e.support.touch?"tap":"click",e.langdirection="rtl"==n.attr("dir")?"right":"left",e(function(){if(e.support.mutationobserver){var t=new e.support.mutationobserver(e.Utils.debounce(function(t){e(a).trigger("domready")},300));t.observe(document.body,{childList:!0,subtree:!0})}}),n.addClass(e.support.touch?"touch":"no-touch")}(jQuery,window,document),function(e,t,a,n){a(function(){var e={RUB:"1",CNY:"1",ZAR:"1",RON:"1",USD:"1",EUR:"1",JPR:"1",DKK:"1"},o="jq-appCurInfo",i=a.localStorage.get(o)||e;a.localStorage.set(o,i),a.each(i,function(e,t){1==t?(a("#"+e+"_info").show(),a('.chooser_popup input[value="'+e+'"]').prop("checked",!0)):(a("#"+e+"_info").hide(),a('.chooser_popup input[value="'+e+'"]').prop("checked",!1))}),a(t).on("change",".chooser_popup input",function(){var t=a.localStorage.get(o)||e;a(this).is(":checked")?(t[a(this).val()]="1",a.localStorage.set(o,t),a("#"+a(this).val()+"_info").show()):(t[a(this).val()]="0",a.localStorage.set(o,t),a("#"+a(this).val()+"_info").hide())}),a.easing.jswing=a.easing.swing,a.extend(a.easing,{easeInOutBack:function(e,t,a,o,i,s){return s===n&&(s=1.70158),(t/=i/2)<1?o/2*(t*t*(((s*=1.525)+1)*t-s))+a:o/2*((t-=2)*t*(((s*=1.525)+1)*t+s)+2)+a}}),a.fn.animatescroll=function(e){var t=a.extend({},a.fn.animatescroll.defaults,e);if("html,body"===t.element){if(this.hasClass("no_padding"))var n=this.offset().top-50;else var n=this.offset().top-70;var o=0;a(t.element).stop().animate({scrollTop:n-(t.padding+o)},t.scrollSpeed,t.easing)}else a(t.element).stop().animate({scrollTop:this.offset().top-this.parent().offset().top+this.parent().scrollTop()-t.padding},t.scrollSpeed,t.easing)},a.fn.animatescroll.defaults={easing:"swing",scrollSpeed:500,padding:0,element:"html,body"};var s=150;a(".buysell_popup").slideUp(1),a(t).on("click","#buysell tbody [role=row]",function(){a(".buysell_popup").css("top",a(this).position().top+47).slideDown(s)}),a(t).on("click","[data-tool=popup-hide]",function(){a(".buysell_popup").slideUp(s)}),a("body").on("click",function(e){a("[data-tool=popup-hide]").each(function(){a(this).is(e.target)||0!==a(this).has(e.target).length||0!==a(".buysell_popup").has(e.target).length||a(".buysell_popup").slideUp(s)}),a("#create_order_buy").each(function(){a(this).is(e.target)||0!==a(this).has(e.target).length||0!==a("#create_order_buy").has(e.target).length||a("#create_order_buy").slideUp(s)}),a("#create_order_sell").each(function(){a(this).is(e.target)||0!==a(this).has(e.target).length||0!==a("#create_order_sell").has(e.target).length||a("#create_order_sell").slideUp(s)}),a(".offsidebar .profile").each(function(){a(this).is(e.target)||0!==a(this).has(e.target).length||0!==a(".offsidebar .profile").has(e.target).length||a("body").removeClass("offsidebar-open")}),a(".chooser").each(function(){a(this).is(e.target)||0!==a(this).has(e.target).length||0!==a(".chooser").has(e.target).length||a(".chooser").removeClass("open")})}),a(t).on("click",".chooser .icon-down-arrow",function(){a(this).parent().toggleClass("open")}),a(t).on("click",".buysell_popup .closed",function(){a(this).parent().find(".opened").toggleClass("opened").toggleClass("closed"),a(this).toggleClass("opened").toggleClass("closed")}),a(t).on("click",".buysell_popup .opened .close-order",function(){a(this).parent().parent().removeClass("opened").addClass("closed")}),a(".sortable").sortable({forcePlaceholderSize:!0,placeholder:'<div class="box-placeholder p0 m0"><div></div></div>'}),a(t).on("change",".plus select",function(){var e=a(this).val(),t=a(this).val();""!=e&&(a(this).find("option[value='"+e+"']").remove(),a(this).select2("val",""),a("#"+a(this).attr("id").replace("-filter","")).append('<li class="list-group-item" value="'+e+'"><em class="icon-dashboard text-muted mr-lg"></em>'+t+'<div class="remove"></div></li>').sortable({forcePlaceholderSize:!0,placeholder:'<div class="box-placeholder p0 m0"><div></div></div>'}).parent().fadeIn(),a("#"+a(this).attr("id").replace("filter","inputs")).append('<div class="'+e+'-field clearfix"><div class="col"><span><span data-localize="trades.popup.LABEL2">Cost in </span> <span> '+t+'</span></span><input class="form-control input-sm" type="number" name="'+e+'-cost"></div><div class="col2"><span><span data-localize="trades.popup.LABEL_FEE">With fee </span> (<span class="percent">0.26</span> <span>'+t+')</span></span><input class="form-control input-sm with-fee" type="number" name="'+e+'-cost-with-fee"></label></div></div>').find("[data-localize]").localize("site",{pathPrefix:"i18n",language:a.localStorage.get("jq-appLang")})),1==a(this).find("option").length&&a(this).prop("disabled",!0)}),a(t).on("click",".sortable li .remove",function(e){var t=a.trim(a(this).parent().text());a("#"+a(this).parent().parent().attr("id")+"-filter").append('<option value="'+t+'">'+t+"</option").select2({minimumResultsForSearch:"Infinity",width:"resolve"}).prop("disabled",!1),a("#"+a(this).parent().parent().attr("id")+"-inputs").find("."+t+"-field").remove();var n="#"+a(this).parent().parent().attr("id");a(this).parent().remove(),0==a(n).find("li").length&&a(n).parent().fadeOut()});var r=.02,l=1+r,c=386.385,u=28770,d=352,p=2776.08,f=5946.503,h=1574,g=44034.6625,m=2499.0917,s=function(){var e=0;return function(t,a){clearTimeout(e),e=setTimeout(t,a)}}();a(t).on("change input keyup mouseup",".inputs input",function(e){switch(a(this).hasClass("with_fee")?new_value=parseFloat(a(this).val()/l):new_value=parseFloat(a(this).val()),(""==new_value||new_value<0)&&(new_value=0),field=a(this).parent().parent(),container=a(this).parent().parent().parent(),currency_changed=field.attr("class").split(" ")[0].replace("-field",""),t=0,currency_changed){case"BTC":var t=new_value;break;case"USD":var t=new_value/c;break;case"RUB":var t=new_value/u;break;case"EUR":var t=new_value/d;break;case"DKK":var t=new_value/p;break;case"ZAR":var t=new_value/f;break;case"RON":var t=new_value/h;break;case"JPY":var t=new_value/g;break;case"CNY":var t=new_value/m}s(function(){a(container).find(".clearfix").each(function(){switch(currency=a(this).attr("class").split(" ")[0].replace("-field",""),round=2,currency){case"BTC":value=t,round=8;break;case"USD":value=t*c,round=3;break;case"RUB":value=t*u,round=2;break;case"EUR":value=t*d,round=3;break;case"DKK":value=t*p,round=2;break;case"ZAR":value=t*f,round=3;break;case"RON":value=t*h,round=2;break;case"JPY":value=t*g,round=4;break;case"CNY":value=t*m,round=4}currency!=currency_changed?(a(this).find(".col input").val(value.toFixed(round)),a(this).find(".col2 .percent").text((value*r).toFixed(2)),a(this).find(".col2 input").val((value*l).toFixed(round))):(a(this).find(".col input").val(new_value),a(this).find(".col2 .percent").text((new_value*r).toFixed(2)),a(this).find(".col2 input").val((new_value*l).toFixed(round)))})},500)}),a(t).on("click","[data-action=create_order_buy]",function(){return a("#create_order_buy").slideDown().animatescroll(),!1}),a(t).on("click","[data-action=create_order_sell]",function(){return a("#create_order_sell").slideDown().animatescroll(),!1}),a(t).on("click","#create_order_buy .hide_it",function(){a("#create_order_buy").slideUp()}),a(t).on("click","#create_order_sell .hide_it",function(){a("#create_order_sell").slideUp()}),a(t).on("click",".settings-panel .close-settings",function(){a(this).parent().toggle()}),a(t).on("click",".settings .arrow",function(){return a(this).parent().parent().find(".settings-panel").toggle(),!1}),a(t).on("click","#orders .nav li",function(){a(this).parent().parent().find(".favorite-selector, .payment-selector").select2({})}),a("#ordersBuy, #ordersSell").dataTable({paging:!0,searching:!1,lengthChange:!1,bInfo:!1,sDom:"<'row'<'col-xs-6'l><'col-xs-6'f>r>t<'row'p<'show-closed'>>",language:{paginate:{first:"«",previous:"«",next:"»",last:"»"}},pageLength:7,pagingType:"simple_numbers",sAjaxSource:"../server/manage_orders.json",aoColumns:[{sClass:"message",mData:"message"},{mData:"order_name"},{mData:"btc"},{mData:"amount"},{mData:"status"},{mData:"date"},{sClass:"arrow",bSortable:!1,sDefaultContent:'<span class="icon-down-arrow"></span>',mData:null}],initComplete:function(){this.parent().find(".show-closed").append('<button class="button btn btn-transparent"></button>'),this.parent().find(".show-closed button").attr("data-localize","trades.SHOWCLOSED").localize("site",{pathPrefix:"i18n",language:a.localStorage.get("jq-appLang")})},fnDrawCallback:function(){this.parent().find("[data-localize]").localize("site",{pathPrefix:"i18n",language:a.localStorage.get("jq-appLang")}),a("#paymentTop").matchHeight._update()}}),a("#orders-buy-table, #orders-sell-table").dataTable({paging:!0,searching:!0,lengthChange:!1,bInfo:!1,sDom:"<'row'<'col-xs-6 col-md-7'f><'col-xs-6 col-md-5'<'fav dataTables_filter'>>r><'row'<'col-xs-12'<'currencies'>>>t<'row'p>",language:{paginate:{first:"«",previous:"«",next:"»",last:"»"}},oLanguage:{sSearch:'<i class="icon-magnifier"></i>'},pageLength:14,pagingType:"simple_numbers",sAjaxSource:"../server/orders.json",aoColumns:[{sClass:"price",mData:"price"},{mData:"amount"},{sClass:"payment",bSortable:!1,mData:"payment"},{sClass:"seller",mData:"seller"},{sType:"numeric",sClass:"rating",mData:"rating"},{sClass:"buy_button",bSortable:!1,sDefaultContent:'<a href="#" data-localize="trades.BUY" class="btn btn-orange btn-sm"></a>',mData:null}],initComplete:function(){this.parent().find("[type=search]").attr("data-localize","trades.SEARCH").localize("site",{pathPrefix:"i18n",language:a.localStorage.get("jq-appLang")}),this.parent().find(".fav").append('<label class="control-label mb"><i class="icon-favorite"></i><select id="fav-'+this.attr("id")+'" class="favorite-selector form-control" name="favorite" value=""><option class="default" value="" data-localize="trades.FAVORITE"></option><option value="Константин Константинопольский">Константин Константинопольский</option><option value="Александридис Константинопулос">Александридис Константинопулос</option><option value="Валерий Панфилов">Валерий Панфилов</option><option value="Александр Валерьев">Александр Валерьев</option></select></label>');var e="fav-"+this.attr("id");this.parent().find(".currencies").append('<a href="#" class="active">RUB</a><a href="#">USD</a><a href="#">EUR</a>'),this.api().columns(".payment").every(function(){var e=this,t=a('<select class="payment-selector form-control"><option data-localize="trades.PAYMENTSYSTEM" value=""></option></select>').appendTo(a(e.header()).empty()).on("change",function(){var t=a.fn.dataTable.util.escapeRegex(a(this).val());e.search(t?"^"+t+"$":"",!0,!1).draw()});e.data().unique().sort().each(function(e,a){t.append('<option value="'+e+'">'+e+"</option>")}),t.wrap("<div class='select-wrapper'></div>").find("[data-localize]").localize("site",{pathPrefix:"i18n",language:a.localStorage.get("jq-appLang")})}),this.parent().find(".fav, .buy_button").find("[data-localize]").localize("site",{pathPrefix:"i18n",language:a.localStorage.get("jq-appLang")}),a(".favorite-selector").select2({}),a(".payment-selector").select2({}),this.api().column(".seller").every(function(){var t="",n=this;a("#"+e).on("click",function(){a("#select2-"+e+"-results li:first").text("Отменить")}).on("change",function(){t=a.fn.dataTable.util.escapeRegex(a(this).val()),n.search(t?"^"+t+"$":"",!0,!1).draw(),""==t?a("#"+e).parent().find(".select2-selection__rendered").css("color","#B8BBCA"):a("#"+e).parent().find(".select2-selection__rendered").css("color","#000")})}),a("#paymentTop").matchHeight({byRow:!0,property:"height",target:a("#buysell"),remove:!1})},fnDrawCallback:function(){this.parent().find(".buy_button").find("[data-localize]").localize("site",{pathPrefix:"i18n",language:a.localStorage.get("jq-appLang")})}})})}(window,document,window.jQuery);