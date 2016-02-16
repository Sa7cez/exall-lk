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
!function(e,t,n,a){if("undefined"==typeof n)throw new Error("This application's JavaScript requires jQuery");n(function(){var e=n("body");(new StateToggler).restoreState(e),n("#chk-fixed").prop("checked",e.hasClass("layout-fixed")),n("#chk-collapsed").prop("checked",e.hasClass("aside-collapsed")),n("#chk-boxed").prop("checked",e.hasClass("layout-boxed")),n("#chk-float").prop("checked",e.hasClass("aside-float")),n("#chk-hover").prop("checked",e.hasClass("aside-hover")),n(".offsidebar.hide").removeClass("hide")})}(window,document,window.jQuery),function(e,t,n,a){n(function(){n('[data-toggle="popover"]').popover(),n('[data-toggle="tooltip"]').tooltip({container:"body"}),n(".dropdown input").on("click focus",function(e){e.stopPropagation()})})}(window,document,window.jQuery),function(e,t,n){"use strict";var a="[data-reset-key]";e(n).on("click",a,function(n){n.preventDefault();var a=e(this).data("resetKey");a?(e.localStorage.remove(a),t.location.reload()):e.error("No storage key specified for reset.")})}(jQuery,window,document),function(e,t,n,a){e.APP_COLORS={primary:"#5d9cec",success:"#27c24c",info:"#23b7e5",warning:"#ff902b",danger:"#f05050",inverse:"#131e26",green:"#37bc9b",pink:"#f532e5",purple:"#7266ba",dark:"#3a3f51",yellow:"#fad732","gray-darker":"#232735","gray-dark":"#3a3f51",gray:"#dde6e9","gray-light":"#e4eaec","gray-lighter":"#edf1f2"},e.APP_MEDIAQUERY={desktopLG:1200,desktop:992,tablet:768,mobile:480}}(window,document,window.jQuery),function(e,t,n,a){function o(e){var t="autoloaded-stylesheet",a=n("#"+t).attr("id",t+"-old");return n("head").append(n("<link/>").attr({id:t,rel:"stylesheet",href:e})),a.length&&a.remove(),n("#"+t)}n(function(){n("#chk-fixed").on("change",function(e){if(n("#chk-fixed").prop("checked")){var t=n(this);t.is("a")&&e.preventDefault();var a,i=t.data("loadCss");i?(a=o(i),a||n.error("Error creating stylesheet link element.")):n.error("No stylesheet location defined.")}else n("#autoloaded-stylesheet").remove()})})}(window,document,window.jQuery),function(e,t,n,a){var o="ru",i="i18n",s="site",r="jq-appLang";n(function(){function e(e){n("[data-localize]").localize(s,e)}if(n.fn.localize){var t=n.localStorage.get(r)||o,a={language:t,pathPrefix:i,callback:function(e,a){n.localStorage.set(r,t),a(e)}};e(a),n("[data-set-lang]").on("click",function(){t=n(this).data("setLang"),t&&(a.language=t,e(a),n(".delay-selector").select2({minimumResultsForSearch:1/0}),n(".favorite-selector").select2({}),n(".payment-selector").select2({}))})}})}(window,document,window.jQuery),function(e,t,n,a){n(function(){var e=new o,a=n("[data-search-open]");a.on("click",function(e){e.stopPropagation()}).on("click",e.toggle);var i=n("[data-search-dismiss]"),s='.navbar-form input[type="text"]';n(s).on("click",function(e){e.stopPropagation()}).on("keyup",function(t){27==t.keyCode&&e.dismiss()}),n(t).on("click",e.dismiss),i.on("click",function(e){e.stopPropagation()}).on("click",e.dismiss)});var o=function(){var e="form.navbar-form";return{toggle:function(){var t=n(e);t.toggleClass("open");var a=t.hasClass("open");t.find("input")[a?"focus":"blur"]()},dismiss:function(){n(e).removeClass("open").find('input[type="text"]').blur().val("")}}}}(window,document,window.jQuery),function(e,t,n){"use strict";function a(t){var n=t.data("message"),a=t.data("options");n||e.error("Notify: No message specified"),e.notify(n,a||{})}var o="[data-notify]";e(n);e(function(){e(o).each(function(){var t=e(this),n=t.data("onload");void 0!==n&&setTimeout(function(){a(t)},800),t.on("click",function(e){e.preventDefault(),a(t)})})})}(jQuery,window,document),function(e,t,n){var a={},o={},i=function(t){return"string"==e.type(t)&&(t={message:t}),arguments[1]&&(t=e.extend(t,"string"==e.type(arguments[1])?{status:arguments[1]}:arguments[1])),new r(t).show()},s=function(e,t){if(e)for(var n in o)e===o[n].group&&o[n].close(t);else for(var n in o)o[n].close(t)},r=function(t){this.options=e.extend({},r.defaults,t),this.uuid="ID"+(new Date).getTime()+"RAND"+Math.ceil(1e5*Math.random()),this.element=e(['<div class="uk-notify-message alert-dismissable">','<a class="close icon-cross"></a>',"<div>"+this.options.message+"</div>","</div>"].join("")).data("notifyMessage",this),this.options.status&&(this.element.addClass("alert alert-"+this.options.status),this.currentstatus=this.options.status),this.group=this.options.group,o[this.uuid]=this,a[this.options.pos]||(a[this.options.pos]=e('<div class="uk-notify uk-notify-'+this.options.pos+'"></div>').appendTo("body").on("click",".uk-notify-message",function(){e(this).data("notifyMessage").close()}))};return e.extend(r.prototype,{uuid:!1,element:!1,timout:!1,currentstatus:"",group:!1,show:function(){if(!this.element.is(":visible")){var e=this;a[this.options.pos].show().prepend(this.element);var t=parseInt(this.element.css("margin-bottom"),10);return this.element.css({opacity:0,"margin-top":-1*this.element.outerHeight(),"margin-bottom":0}).animate({opacity:1,"margin-top":0,"margin-bottom":t},function(){if(e.options.timeout){var t=function(){e.close()};e.timeout=setTimeout(t,e.options.timeout),e.element.hover(function(){clearTimeout(e.timeout)},function(){e.timeout=setTimeout(t,e.options.timeout)})}}),this}},close:function(e){var t=this,n=function(){t.element.remove(),a[t.options.pos].children().length||a[t.options.pos].hide(),delete o[t.uuid]};this.timeout&&clearTimeout(this.timeout),e?n():this.element.animate({opacity:0,"margin-top":-1*this.element.outerHeight(),"margin-bottom":0},function(){n()})},content:function(e){var t=this.element.find(">div");return e?(t.html(e),this):t.html()},status:function(e){return e?(this.element.removeClass("alert alert-"+this.currentstatus).addClass("alert alert-"+e),this.currentstatus=e,this):this.currentstatus}}),r.defaults={message:"",status:"normal",timeout:5e3,group:null,pos:"bottom-right"},e.notify=i,e.notify.message=r,e.notify.closeAll=s,i}(jQuery,window,document),function(e,t,n){"use strict";var a='[data-tool="panel-dismiss"]',o="panel.remove",i="panel.removed";e(n).on("click",a,function(){function t(){e.support.animation?a.animo({animation:"bounceOut"},n):n()}function n(){var t=a.parent();e.when(a.trigger(i,[a])).done(function(){a.remove(),t.trigger(i).filter(function(){var t=e(this);return t.is('[class*="col-"]:not(.sortable)')&&0===t.children("*").length}).remove()})}var a=e(this).closest(".panel"),s=new e.Deferred;a.trigger(o,[a,s]),s.done(t)})}(jQuery,window,document),function(e,t,n){"use strict";function a(e){e.removeClass("fa-plus").addClass("fa-minus")}function o(e){e.removeClass("fa-minus").addClass("fa-plus")}function i(t,n){var a=e.localStorage.get(l);a||(a={}),a[t]=n,e.localStorage.set(l,a)}function s(t){var n=e.localStorage.get(l);return n?n[t]||!1:void 0}var r='[data-tool="panel-collapse"]',l="jq-panelState";e(r).each(function(){var t=e(this),n=t.closest(".panel"),r=n.find(".panel-wrapper"),l={toggle:!1},c=t.children("em"),u=n.attr("id");r.length||(r=n.children(".panel-heading").nextAll().wrapAll("<div/>").parent().addClass("panel-wrapper"),l={}),r.collapse(l).on("hide.bs.collapse",function(){o(c),i(u,"hide"),r.prev(".panel-heading").addClass("panel-heading-collapsed")}).on("show.bs.collapse",function(){a(c),i(u,"show"),r.prev(".panel-heading").removeClass("panel-heading-collapsed")});var p=s(u);p&&(setTimeout(function(){r.collapse(p)},0),i(u,p))}),e(n).on("click",r,function(){var t=e(this).closest(".panel"),n=t.find(".panel-wrapper");n.collapse("toggle")})}(jQuery,window,document),function(e,t,n){"use strict";function a(){this.removeClass(s)}var o='[data-tool="panel-refresh"]',i="panel.refresh",s="whirl",r="standard";e(n).on("click",o,function(){var t=e(this),n=t.parents(".panel").eq(0),o=t.data("spinner")||r;n.addClass(s+" "+o),n.removeSpinner=a,t.trigger(i,[n])})}(jQuery,window,document),function(e,t,n,a){n(function(){n.fn.select2&&n(".delay-selector").select2({minimumResultsForSearch:1/0})})}(window,document,window.jQuery),function(e,t,n,a){function o(){var e=n("<div/>",{"class":"dropdown-backdrop"});e.insertAfter(".aside").on("click mouseenter",function(){r()})}function i(e){e.siblings("li").removeClass("open").end().toggleClass("open")}function s(e){r();var t=e.children("ul");if(!t.length)return n();if(e.hasClass("open"))return i(e),n();var a=n(".aside"),o=n(".aside-inner"),s=parseInt(o.css("padding-top"),0)+parseInt(a.css("padding-top"),0),l=t.clone().appendTo(a);i(e);var c=e.position().top+s-g.scrollTop(),p=d.height();return l.addClass("nav-floating").css({position:u()?"fixed":"absolute",top:c,bottom:l.outerHeight(!0)+c>p?0:"auto"}),l.on("mouseleave",function(){i(e),l.remove()}),l}function r(){n(".sidebar-subnav.nav-floating").remove(),n(".dropdown-backdrop").remove(),n(".sidebar li.open").removeClass("open")}function l(){return f.hasClass("touch")}function c(){return h.hasClass("aside-collapsed")}function u(){return h.hasClass("layout-fixed")}function p(){return h.hasClass("aside-hover")}var d,f,h,g,m;n(function(){d=n(e),f=n("html"),h=n("body"),g=n(".sidebar"),m=APP_MEDIAQUERY;var t=g.find(".collapse");t.on("show.bs.collapse",function(e){e.stopPropagation(),0===n(this).parents(".collapse").length&&t.filter(".in").collapse("hide")});var a=n(".sidebar .active").parents("li");p()||a.addClass("active").children(".collapse").collapse("show"),g.find("li > a + ul").on("show.bs.collapse",function(e){p()&&e.preventDefault()});var i=l()?"click":"mouseenter",r=n();g.on(i,".nav > li",function(){(c()||p())&&(r.trigger("mouseleave"),r=s(n(this)),o())});var u=g.data("sidebarAnyclickClose");"undefined"!=typeof u&&n(".wrapper").on("click.sidebar",function(e){if(h.hasClass("aside-toggled")){var t=n(e.target);t.parents(".aside").length||t.is("#user-block-toggle")||t.parent().is("#user-block-toggle")||h.removeClass("aside-toggled")}})})}(window,document,window.jQuery),function(e,t,n,a){n(function(){var t=n("body");toggle=new StateToggler,n("[data-toggle-state]").on("click",function(o){o.stopPropagation();var i=n(this),s=i.data("toggleState"),r=i.data("target"),l=i.attr("data-no-persist")!==a,c=r?n(r):t;s&&(c.hasClass(s)?(c.removeClass(s),l||toggle.removeState(s)):(c.addClass(s),l||toggle.addState(s))),n(".open").removeClass("open"),n(".tooltip").remove(),n(e).resize()})}),e.StateToggler=function(){var e="jq-toggleState",t={hasWord:function(e,t){return new RegExp("(^|\\s)"+t+"(\\s|$)").test(e)},addWord:function(e,t){return this.hasWord(e,t)?void 0:e+(e?" ":"")+t},removeWord:function(e,t){return this.hasWord(e,t)?e.replace(new RegExp("(^|\\s)*"+t+"(\\s|$)*","g"),""):void 0}};return{addState:function(a){var o=n.localStorage.get(e);o=o?t.addWord(o,a):a,n.localStorage.set(e,o)},removeState:function(a){var o=n.localStorage.get(e);o&&(o=t.removeWord(o,a),n.localStorage.set(e,o))},restoreState:function(t){var a=n.localStorage.get(e);a&&t.addClass(a)}}}}(window,document,window.jQuery),function(e,t,n){"use strict";var a=e("html"),o=e(t);e.support.transition=function(){var e=function(){var e,t=n.body||n.documentElement,a={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(e in a)if(void 0!==t.style[e])return a[e]}();return e&&{end:e}}(),e.support.animation=function(){var e=function(){var e,t=n.body||n.documentElement,a={WebkitAnimation:"webkitAnimationEnd",MozAnimation:"animationend",OAnimation:"oAnimationEnd oanimationend",animation:"animationend"};for(e in a)if(void 0!==t.style[e])return a[e]}();return e&&{end:e}}(),e.support.requestAnimationFrame=t.requestAnimationFrame||t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||t.msRequestAnimationFrame||t.oRequestAnimationFrame||function(e){t.setTimeout(e,1e3/60)},e.support.touch="ontouchstart"in t&&navigator.userAgent.toLowerCase().match(/mobile|tablet/)||t.DocumentTouch&&document instanceof t.DocumentTouch||t.navigator.msPointerEnabled&&t.navigator.msMaxTouchPoints>0||t.navigator.pointerEnabled&&t.navigator.maxTouchPoints>0||!1,e.support.mutationobserver=t.MutationObserver||t.WebKitMutationObserver||t.MozMutationObserver||null,e.Utils={},e.Utils.debounce=function(e,t,n){var a;return function(){var o=this,i=arguments,s=function(){a=null,n||e.apply(o,i)},r=n&&!a;clearTimeout(a),a=setTimeout(s,t),r&&e.apply(o,i)}},e.Utils.removeCssRules=function(e){var t,n,a,o,i,s,r,l,c,u;e&&setTimeout(function(){try{for(u=document.styleSheets,o=0,r=u.length;r>o;o++){for(a=u[o],n=[],a.cssRules=a.cssRules,t=i=0,l=a.cssRules.length;l>i;t=++i)a.cssRules[t].type===CSSRule.STYLE_RULE&&e.test(a.cssRules[t].selectorText)&&n.unshift(t);for(s=0,c=n.length;c>s;s++)a.deleteRule(n[s])}}catch(p){}},0)},e.Utils.isInView=function(t,n){var a=e(t);if(!a.is(":visible"))return!1;var i=o.scrollLeft(),s=o.scrollTop(),r=a.offset(),l=r.left,c=r.top;return n=e.extend({topoffset:0,leftoffset:0},n),c+a.height()>=s&&c-n.topoffset<=s+o.height()&&l+a.width()>=i&&l-n.leftoffset<=i+o.width()?!0:!1},e.Utils.options=function(t){if(e.isPlainObject(t))return t;var n=t?t.indexOf("{"):-1,a={};if(-1!=n)try{a=new Function("","var json = "+t.substr(n)+"; return JSON.parse(JSON.stringify(json));")()}catch(o){}return a},e.Utils.events={},e.Utils.events.click=e.support.touch?"tap":"click",e.langdirection="rtl"==a.attr("dir")?"right":"left",e(function(){if(e.support.mutationobserver){var t=new e.support.mutationobserver(e.Utils.debounce(function(t){e(n).trigger("domready")},300));t.observe(document.body,{childList:!0,subtree:!0})}}),a.addClass(e.support.touch?"touch":"no-touch")}(jQuery,window,document),function(e,t,n,a){n(function(){function o(e,t){return t?e.toFixed(t).replace(/\.?0+$/,""):e.toFixed(t)}var i={RUB:"1",CNY:"1",ZAR:"1",RON:"1",USD:"1",EUR:"1",JPR:"1",DKK:"1"},s="jq-appCurInfo",r=n.localStorage.get(s)||i;n.localStorage.set(s,r),n.each(r,function(e,t){1==t?(n("#"+e+"_info").show(),n('.chooser_popup input[value="'+e+'"]').prop("checked",!0)):(n("#"+e+"_info").hide(),n('.chooser_popup input[value="'+e+'"]').prop("checked",!1))}),n(t).on("change",".chooser_popup input",function(){var e=n.localStorage.get(s)||i;n(this).is(":checked")?(e[n(this).val()]="1",n.localStorage.set(s,e),n("#"+n(this).val()+"_info").show()):(e[n(this).val()]="0",n.localStorage.set(s,e),n("#"+n(this).val()+"_info").hide())}),n(".currencies ul li").on({mouseenter:function(){n(".currencies ul li.open").removeClass("open"),n(this).addClass("open")},mouseleave:function(){}}),n(".topnavbar .wallet-opener").on({mouseenter:function(){n(".topnavbar .open").removeClass("open"),n(this).addClass("open")},mouseleave:function(){n(this).removeClass("open")}}),n(e).resize(function(){n(".favorite-selector, .payment-selector").select2({})}),n.easing.jswing=n.easing.swing,n.extend(n.easing,{easeInOutBack:function(e,t,n,o,i,s){return s===a&&(s=1.70158),(t/=i/2)<1?o/2*(t*t*(((s*=1.525)+1)*t-s))+n:o/2*((t-=2)*t*(((s*=1.525)+1)*t+s)+2)+n}}),n.fn.animatescroll=function(e){var t=n.extend({},n.fn.animatescroll.defaults,e);if("html,body"===t.element){if(this.hasClass("no_padding"))var a=this.offset().top-50;else var a=this.offset().top-70;var o=0;n(t.element).stop().animate({scrollTop:a-(t.padding+o)},t.scrollSpeed,t.easing)}else n(t.element).stop().animate({scrollTop:this.offset().top-this.parent().offset().top+this.parent().scrollTop()-t.padding},t.scrollSpeed,t.easing)},n.fn.animatescroll.defaults={easing:"swing",scrollSpeed:500,padding:0,element:"html,body"};var l=150;n(".buysell_popup").slideUp(1),n(t).on("click","#buysell tbody [role=row]",function(){position=n(this).position().top+47,row_id=n(this).attr("id"),n(".buysell_popup").slideUp(l),"1"!=n("#"+row_id+"-popup").length?(n(".buysell_popup.template").clone().removeClass("template").appendTo("#buysell .tab-content").attr("id",row_id+"-popup"),n("#"+row_id+"-popup").css("top",position).addClass("opened").slideDown(l)):n("#"+row_id+"-popup").hasClass("opened")?n("#"+row_id+"-popup").css("top",position).removeClass("opened").slideUp(l):n("#"+row_id+"-popup").css("top",position).addClass("opened").slideDown(l)}),n(t).on("click","[data-tool=popup-hide]",function(){n(this).parent().removeClass("opened").slideUp(l)}),n("body").on("click",function(e){n(".buysell_popup").each(function(){n(this).is(e.target)||0!==n(this).has(e.target).length||0!==n("#buysell").has(e.target).length||n(".buysell_popup").slideUp(l)}),n("#create_order_buy").each(function(){n(this).is(e.target)||0!==n(this).has(e.target).length||0!==n("#create_order_buy").has(e.target).length||n("#create_order_buy").slideUp(l)}),n("#create_order_sell").each(function(){n(this).is(e.target)||0!==n(this).has(e.target).length||0!==n("#create_order_sell").has(e.target).length||n("#create_order_sell").slideUp(l)}),n(".offsidebar .profile").each(function(){n(this).is(e.target)||0!==n(this).has(e.target).length||0!==n(".offsidebar .profile").has(e.target).length||n("body").removeClass("offsidebar-open")}),n(".chooser").each(function(){n(this).is(e.target)||0!==n(this).has(e.target).length||0!==n(".chooser").has(e.target).length||n(".chooser").removeClass("open")}),n(".notification .dropdown-menu").each(function(){n(this).is(e.target)||0!==n(this).has(e.target).length||0!==n(".chooser").has(e.target).length||n(".notification").removeClass("open")})}),n.fn.scrollTo=function(e,t,a){"function"==typeof t&&2==arguments.length&&(a=t,t=e);var o=n.extend({scrollTarget:e,offsetTop:50,duration:500,easing:"swing"},t);return this.each(function(){var e=n(this),t="number"==typeof o.scrollTarget?o.scrollTarget:n(o.scrollTarget),i="number"==typeof t?t:t.offset().top+e.scrollTop()-parseInt(o.offsetTop);e.animate({scrollTop:i},parseInt(o.duration),o.easing,function(){"function"==typeof a&&a.call(this)})})},n(t).on("click","#paymentTop .other",function(){n("#paymentTop .table-responsive").scrollTo(500,{duration:"slow"})}),n(t).on("click",".fav-cross",function(){n(this).parent().find(".favorite-selector").select2("val",""),n(this).fadeOut()}),n(t).on("click",".payment-cross",function(){n(this).parent().find(".payment-selector").select2("val",""),n(this).fadeOut()}),n(t).on("click","#paymentTop .control-label .icon-cross",function(){y.api().ajax.url("../server/payment_top.json").load(),n(this).parent().find(".delay-selector").select2("val",""),n(this).fadeOut()}),n("#paymentTop .delay-selector").on("change",function(){var e=n(this).val();""!=e&&n(this).parent().find(".icon-cross").fadeIn()}),n(t).on("click",".chooser .icon-down-arrow",function(){n(this).parent().toggleClass("open")}),n(t).on("click",".buysell_popup .closed",function(){n(this).parent().find(".opened").toggleClass("opened").toggleClass("closed"),n(this).toggleClass("opened").toggleClass("closed")}),n(t).on("click",".buysell_popup .opened .close-line",function(){n(this).parent().removeClass("opened").addClass("closed")}),n(".sortable").sortable({forcePlaceholderSize:!0,placeholder:'<div class="box-placeholder p0 m0"><div></div></div>'}),n(t).on("change",".plus select",function(){var e=n(this).val(),t=n(this).val();""!=e&&(n(this).find("option[value='"+e+"']").remove(),n(this).select2("val",""),n("#"+n(this).attr("id").replace("-filter","")).append('<li class="list-group-item" value="'+e+'"><em class="icon-dashboard text-muted mr-lg"></em>'+t+'<div class="remove"></div></li>').sortable({forcePlaceholderSize:!0,placeholder:'<div class="box-placeholder p0 m0"><div></div></div>'}).parent().fadeIn(),n("#"+n(this).attr("id").replace("filter","inputs")).append('<div class="'+e+'-field clearfix"><div class="col"><span><span data-localize="trades.popup.LABEL2">Cost in </span> <span> '+t+'</span></span><input class="form-control input-sm" type="text" name="'+e+'-cost"></div><div class="col2 fee"><div data-localize="trades.popup.LABEL_FEE">With fee </div><div><span class="percent">0.26</span> <span>'+t+"</span></div></label></div></div>").find("[data-localize]").localize("site",{pathPrefix:"i18n",language:n.localStorage.get("jq-appLang")})),1==n(this).find("option").length&&n(this).prop("disabled",!0)}),n(t).on("click",".sortable li .remove",function(e){var t=n.trim(n(this).parent().text());n("#"+n(this).parent().parent().attr("id")+"-filter").append('<option value="'+t+'">'+t+"</option").select2({minimumResultsForSearch:"Infinity",width:"resolve"}).prop("disabled",!1),n("#"+n(this).parent().parent().attr("id")+"-inputs").find("."+t+"-field").remove();var a="#"+n(this).parent().parent().attr("id");n(this).parent().remove(),0==n(a).find("li").length&&n(a).parent().fadeOut()});var c=.02,u=1+c,p=386.385,d=28770,f=352,h=2776.08,g=5946.503,m=1574,v=44034.6625,b=2499.0917,l=function(){var e=0;return function(t,n){clearTimeout(e),e=setTimeout(t,n)}}();n(t).on("change input keyup mouseup",".inputs input",function(e){switch(this.value=this.value.replace(/[^0-9\.]/g,""),n(this).hasClass("with_fee")?new_value=parseFloat(n(this).val()/u):new_value=parseFloat(n(this).val()),(""==new_value||new_value<0||"NaN"==new_value)&&(new_value=0),field=n(this).parent().parent(),container=n(this).parent().parent().parent(),currency_changed=field.attr("class").split(" ")[0].replace("-field",""),t=0,currency_changed){case"BTC":var t=new_value;break;case"USD":var t=new_value/p;break;case"RUB":var t=new_value/d;break;case"EUR":var t=new_value/f;break;case"DKK":var t=new_value/h;break;case"ZAR":var t=new_value/g;break;case"RON":var t=new_value/m;break;case"JPY":var t=new_value/v;break;case"CNY":var t=new_value/b;break;default:var t=0}l(function(){n(container).find(".clearfix").each(function(){switch((0>t||""==t)&&(t=0),currency=n(this).attr("class").split(" ")[0].replace("-field",""),round=2,currency){case"BTC":value=t,round=8;break;case"USD":value=t*p,round=3;break;case"RUB":value=t*d,round=2;break;case"EUR":value=t*f,round=3;break;case"DKK":value=t*h,round=2;break;case"ZAR":value=t*g,round=3;break;case"RON":value=t*m,round=2;break;case"JPY":value=t*v,round=4;break;case"CNY":value=t*b,round=4}currency!=currency_changed?(n(this).find(".col input").val(o(value,round)),n(this).find(".col2 .percent").text(o(value*c,2)),n(this).find(".col2 input").val(o(value*u,round))):(n(this).find(".col input").val(new_value),n(this).find(".col2 .percent").text(o(new_value*c,2)),n(this).find(".col2 input").val(o(new_value*u,round)))})},500)}),n(t).on("click","[data-action=create_order_buy]",function(){return n("#create_order_buy").slideDown().animatescroll(),!1}),n(t).on("click","[data-action=create_order_sell]",function(){return n("#create_order_sell").slideDown().animatescroll(),!1}),n(t).on("click","#create_order_buy .hide_it",function(){n("#create_order_buy").slideUp()}),n(t).on("click","#create_order_sell .hide_it",function(){n("#create_order_sell").slideUp()}),n(t).on("click",".settings-panel .close-settings",function(){n(this).parent().toggle()}),n(t).on("click",".settings .arrow",function(){return n(this).parent().parent().find(".settings-panel").toggle(),!1}),n(t).on("click","#orders .nav li",function(){n(this).parent().parent().find(".favorite-selector, .payment-selector").select2({})}),n("#chk-sound").on("change",function(e){n(this).parent().find("em").toggleClass("active")}),n(t).on("click",".notification .label",function(){n(this).parent().addClass("open")}),n(t).on("click",".notification .icon-cross",function(){n(this).parent().slideUp().remove(),count=n("ul.notifications li").length,n("#notification_label").text(count),0==count?(n("#notification_label").text("0").addClass("zero"),n("ul.default").fadeIn(),n("ul.notifications").parent().find(".footer .hide_all").hide(),n("ul.notifications").parent().find(".footer .hide_panel").show()):n("#notification_label").text(count).removeClass("zero")}),n(t).on("click",".notification .footer .hide_all",function(){n(this).parent().parent().find("ul.notifications").remove(),n(this).parent().parent().find("ul.default").fadeIn(),n(this).parent().find(".hide_panel").show(),n("#notification_label").text(0).addClass("zero"),n(this).fadeOut()}),n(t).on("click",".notification .footer .hide_panel",function(){n(this).parent().parent().parent().removeClass("open")}),jQuery.extend(jQuery.fn.dataTableExt.oSort,{"signed-num-pre":function(e){return"-"==e||""===e?0:1*e.replace("+","")},"signed-num-asc":function(e,t){return t>e?-1:e>t?1:0},"signed-num-desc":function(e,t){return t>e?1:e>t?-1:0}}),jQuery.extend(jQuery.fn.dataTableExt.oSort,{"formatted-num-pre":function(e){return e="-"===e||""===e?0:e.replace(/[^\d\-\.]/g,""),parseFloat(e)},"formatted-num-asc":function(e,t){return e-t},"formatted-num-desc":function(e,t){return t-e}});var y=n("#paymentTop .table-responsive table").dataTable({paging:!1,searching:!1,lengthChange:!1,bInfo:!1,sDom:"rt",sAjaxSource:"../server/payment_top.json",aoColumns:[{mData:"name"},{sType:"formatted-num",mData:"count"}],order:[[1,"desc"]],initComplete:function(){},fnDrawCallback:function(){n("#paymentTop .table-responsive table thead").remove(),this.parent().find("[data-localize]").localize("site",{pathPrefix:"i18n",language:n.localStorage.get("jq-appLang")})}});n("#paymentTop select").on("change",function(e){y.api().ajax.url("../server/newTop.json").load()}),n("#ordersBuy, #ordersSell").dataTable({paging:!0,searching:!1,lengthChange:!1,bInfo:!1,sDom:"<'row'<'col-xs-6'l><'col-xs-6'f>r>t<'row'p<'show-closed'>>",language:{paginate:{first:"«",previous:"«",next:"»",last:"»"}},pageLength:7,pagingType:"simple_numbers",sAjaxSource:"../server/manage_orders.json",aoColumns:[{sClass:"message",mData:"message"},{mData:"order_name"},{mData:"btc"},{sType:"formatted-num",mData:"amount"},{mData:"country"},{mData:"status"},{mData:"date"},{sClass:"arrow",bSortable:!1,sDefaultContent:'<span class="icon-down-arrow"></span>',mData:null}],initComplete:function(){this.parent().find(".show-closed").append('<button class="button btn btn-transparent"></button>'),this.parent().find(".show-closed button").attr("data-localize","trades.SHOWCLOSED").localize("site",{pathPrefix:"i18n",language:n.localStorage.get("jq-appLang")})},fnDrawCallback:function(){this.parent().find("[data-localize]").localize("site",{pathPrefix:"i18n",language:n.localStorage.get("jq-appLang")}),n("#paymentTop").matchHeight._update()}}),n("#orders-buy-table, #orders-sell-table").dataTable({paging:!0,searching:!0,lengthChange:!1,bInfo:!1,sDom:"<'row'<'col-xs-6 col-md-6'f><'col-xs-6 col-md-6'<'fav dataTables_filter'>>r><'row'<'col-xs-12'<'currencies'>>>t<'row'p>",language:{paginate:{first:"«",previous:"«",next:"»",last:"»"}},oLanguage:{sSearch:'<i class="icon-magnifier"></i>'},pageLength:14,pagingType:"simple_numbers",sAjaxSource:"../server/orders.json",aoColumns:[{sType:"formatted-num",sClass:"price",mData:"price"},{mData:"amount"},{sClass:"payment",bSortable:!1,mData:"payment"},{sClass:"seller",mData:"seller"},{sType:"signed-num",sClass:"rating",mData:"rating"},{sClass:"buy_button",bSortable:!1,sDefaultContent:'<a href="#" data-localize="trades.BUY" class="btn btn-orange btn-sm"></a>',mData:null}],initComplete:function(){this.parent().find("[type=search]").attr("data-localize","trades.SEARCH").localize("site",{pathPrefix:"i18n",language:n.localStorage.get("jq-appLang")}),this.parent().find(".fav").append('<label class="control-label mb"><i class="icon-favorite"></i><select id="fav-'+this.attr("id")+'" class="favorite-selector form-control" name="favorite" value=""><option class="default" value="" data-localize="trades.FAVORITE"></option><option value="Константин Константинопольский">Константин Константинопольский</option><option value="Александридис Константинопулос">Александридис Константинопулос</option><option value="Валерий Панфилов">Валерий Панфилов</option><option value="Александр Валерьев">Александр Валерьев</option></select><i class="fav-cross icon-cross" style="display:none"></label>');var e="fav-"+this.attr("id");this.parent().find(".currencies").append('<a href="#" class="active">RUB</a><a href="#">USD</a><a href="#">EUR</a>'),this.api().columns(".payment").every(function(){var e=this,t=n('<select class="payment-selector form-control"><option data-localize="trades.PAYMENTSYSTEM" value=""></option></select>').appendTo(n(e.header()).empty()).on("change",function(){var t=n.fn.dataTable.util.escapeRegex(n(this).val());e.search(t?"^"+t+"$":"",!0,!1).draw(),""!=t&&n(".payment-cross").fadeIn()});e.data().unique().sort().each(function(e,n){t.append('<option value="'+e+'">'+e+"</option>")}),t.wrap("<div class='select-wrapper'></div>").find("[data-localize]").localize("site",{pathPrefix:"i18n",language:n.localStorage.get("jq-appLang")})}),this.parent().find(".fav, .buy_button").find("[data-localize]").localize("site",{pathPrefix:"i18n",language:n.localStorage.get("jq-appLang")}),n(".favorite-selector").select2({}),n(".payment-selector").select2({}),n('<i class="payment-cross icon-cross" style="display:none">').appendTo(n(this).find(".select-wrapper")),this.api().column(".seller").every(function(){var t="",a=this;n("#"+e).on("click",function(){n("#select2-"+e+"-results li:first").text("Отменить")}).on("change",function(){t=n.fn.dataTable.util.escapeRegex(n(this).val()),a.search(t?"^"+t+"$":"",!0,!1).draw(),""==t?n("#"+e).parent().find(".select2-selection__rendered").css("color","#B8BBCA"):(n(".fav-cross").fadeIn(),n("#"+e).parent().find(".select2-selection__rendered").css("color","#000"))})}),n("#paymentTop").matchHeight({byRow:!0,property:"height",target:n("#buysell"),remove:!1})},fnDrawCallback:function(){this.parent().find(".buy_button").find("[data-localize]").localize("site",{pathPrefix:"i18n",language:n.localStorage.get("jq-appLang")})}})})}(window,document,window.jQuery);