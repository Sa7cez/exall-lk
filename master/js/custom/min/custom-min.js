!function(e,t,$,a){$(function(){function n(e,t){return t?e.toFixed(t).replace(/\.?0+$/,""):e.toFixed(t)}function s(e){if(!e.title)return e.text;var t=$('<span><em class="icon-shield '+e.element.title.toLowerCase()+'"></em>'+e.text+"</span>");return t}var o={RUB:"1",CNY:"1",ZAR:"1",RON:"1",USD:"1",EUR:"1",JPR:"1",DKK:"1"},i="jq-appCurInfo",l=$.localStorage.get(i)||o;$.localStorage.set(i,l),$.each(l,function(e,t){1==t?($("."+e+"_info").show(),$('.chooser_popup input[value="'+e+'"]').prop("checked",!0)):($("."+e+"_info").hide(),$('.chooser_popup input[value="'+e+'"]').prop("checked",!1))}),$(t).on("change",".chooser_popup input",function(){var e=$.localStorage.get(i)||o;$(this).is(":checked")?(e[$(this).val()]="1",$.localStorage.set(i,e),$(this).parent().parent().parent().parent().parent().parent().parent().find("."+$(this).val()+"_info").show()):(e[$(this).val()]="0",$.localStorage.set(i,e),$(this).parent().parent().parent().parent().parent().parent().parent().find("."+$(this).val()+"_info").hide())}),$(".plus .variants input[value=ETH], .plus .variants input[value=DLC]").prop("checked",!1),$(".currencies .border").addClass("size"+$(".plus .variants input:checked").length),$(t).on("change",".plus .variants input",function(){var e=0;$(this).is(":checked")?$("#"+$(this).val()+"-informer").fadeIn():$("#"+$(this).val()+"-informer").fadeOut(),$(".currencies .border").removeClass("size0").removeClass("size1").removeClass("size2").removeClass("size3").removeClass("size4").addClass("size"+$(".plus .variants input:checked").length)}),$(t).on("click",".currencies .border .icon-cross",function(){$(this).parent().fadeOut(),$(".plus .variants input[value="+$(this).parent().find(".currency-name").text()+"]").prop("checked",!1),$(".currencies .border").removeClass("size0").removeClass("size1").removeClass("size2").removeClass("size3").removeClass("size4").addClass("size"+$(".plus .variants input:checked").length)}),$(t).on("click","[data-toggle=collapse]",function(){$(this).toggleClass("collapsed"),$(this).parent().find(".collapse").toggleClass("in")}),$(t).on("click",".input-wrapper span",function(){return $(this).parent().find(".input-popup").is(":visible")?($(this).parent().find(".input-popup").slideUp(),$(this).parent().removeClass("opened")):($(".input-popup").removeClass("opened").slideUp(),$(this).parent().addClass("opened"),$(this).parent().find(".input-popup").slideDown()),!1}),$(".currencies ul li").on({mouseenter:function(){$(".currencies ul li.open").removeClass("open"),$(this).addClass("open")},mouseleave:function(){}}),$(t).on("click",".topnavbar .wallet-opener .wallet",function(){$(this).parent().toggleClass("open")}),$(e).resize(function(){$(".payment-selector").select2({minimumResultsForSearch:"5",allowClear:!0,placeholder:"Способ оплаты"}),$(".price-selector").select2({minimumResultsForSearch:"5",allowClear:!0,placeholder:"Стоимость"}),$(".country-selector").select2({minimumResultsForSearch:"5",allowClear:!0,placeholder:"Страна"}),$(".favorite-selector").select2({minimumResultsForSearch:"5",allowClear:!0,placeholder:"Избранные пользователи"})}),$.easing.jswing=$.easing.swing,$.extend($.easing,{easeInOutBack:function(e,t,n,s,o,i){return i===a&&(i=1.70158),(t/=o/2)<1?s/2*(t*t*(((i*=1.525)+1)*t-i))+n:s/2*((t-=2)*t*(((i*=1.525)+1)*t+i)+2)+n}}),$.fn.animatescroll=function(e){var t=$.extend({},$.fn.animatescroll.defaults,e);if("html,body"===t.element){if(this.hasClass("no_padding"))var a=this.offset().top-50;else var a=this.offset().top-70;var n=0;$(t.element).stop().animate({scrollTop:a-(t.padding+n)},t.scrollSpeed,t.easing)}else $(t.element).stop().animate({scrollTop:this.offset().top-this.parent().offset().top+this.parent().scrollTop()-t.padding},t.scrollSpeed,t.easing)},$.fn.animatescroll.defaults={easing:"swing",scrollSpeed:500,padding:0,element:"html,body"};var r=150;$(t).on("click",".orders .tabs .tab",function(){popup=$(this).parent().parent().parent(),popup.find(".potencial, .normal").toggle(),popup.find(".orders .tabs .tab.active").removeClass("active"),$(this).addClass("active")}),$(this).find(".dropdown-tab .button .list, .drop .list").slideUp(),$(t).on("click",".active.dropdown-tab .button span, .statuses .drop .arrow",function(){$(this).parent().find(".list").slideToggle(),$(this).parent().toggleClass("active")}),$(t).on("click",".active.dropdown-tab .list li, .drop .list li",function(){$(this).toggleClass("active")}),$(t).on("click",".statuses .status",function(){$(event.target).parents(".drop").length||$(this).toggleClass("active")}),$(t).on("click",".active.dropdown-tab .footer span",function(){$(this).parent().parent().find("li.active").removeClass("active")}),$(t).on("click","#buysell tbody [role=row]",function(e){position=$(this).position().top+47,row_id=$(this).attr("id"),$("#"+$(this).parent().parent().attr("id")+"Popup").slideUp(r),"1"!=$("#"+row_id+"-popup").length?($("#"+$(this).parent().parent().attr("id")+"Popup.template").clone().removeClass("template").appendTo("#buysell .tab-content").attr("id",row_id+"-popup"),$("#"+row_id+"-popup").css("top",position).addClass("opened").slideDown(r).find(".chat").slideUp()):$("#"+row_id+"-popup").hasClass("opened")?$("#"+row_id+"-popup").css("top",position).removeClass("opened").slideUp(r):$("#"+row_id+"-popup").css("top",position).addClass("opened").slideDown(r),$(".wrapper").css("minHeight","2900px")}),$(t).on("click","[data-tool=popup-hide]",function(){$(this).parent().removeClass("opened").slideUp(r)}),$("body").on("click",function(e){$(".buysell_popup").each(function(){$(this).is(e.target)||0!==$(this).has(e.target).length||0!==$(".buysell_popup").has(e.target).length||$(".buysell_popup").slideUp(r)}),$("#orders .big-popup").each(function(){$(this).is(e.target)||0!==$(this).has(e.target).length||0!==$("#orders .big-popup").has(e.target).length||($("#orders .big-popup").slideUp(r),$("#orders tr.opened").removeClass("opened"))}),$("#create_order").each(function(){$(this).is(e.target)||0!==$(this).has(e.target).length||0!==$("#create_order").has(e.target).length||$("#create_order").slideUp(r)}),$(".offsidebar .profile").each(function(){$(this).is(e.target)||0!==$(this).has(e.target).length||0!==$(".offsidebar .profile").has(e.target).length||$("body").removeClass("offsidebar-open")}),$(".chooser").each(function(){$(this).is(e.target)||0!==$(this).has(e.target).length||0!==$(".chooser").has(e.target).length||$(".chooser").removeClass("open")}),$(".variants").each(function(){$(this).is(e.target)||0!==$(this).has(e.target).length||0!==$(".variants").has(e.target).length||$(".plus").removeClass("open")}),$(".notification .dropdown-menu").each(function(){$(this).is(e.target)||0!==$(this).has(e.target).length||0!==$(".chooser").has(e.target).length||$(".notification").removeClass("open")}),$(".input-wrapper").each(function(){$(this).is(e.target)||0!==$(this).has(e.target).length||0!==$(".input-wrapper").has(e.target).length||$(".input-popup").slideUp()}),$(".dropdown-tab").each(function(){$(this).is(e.target)||0!==$(this).has(e.target).length||0!==$(".dropdown-tab").has(e.target).length||$(".dropdown-tab").find(".list").slideUp().parent().removeClass("active")}),$(".drop").each(function(){$(this).is(e.target)||0!==$(this).has(e.target).length||0!==$(".drop").has(e.target).length||$(".drop").find(".list").slideUp().parent().removeClass("active")}),$(".settings-panel").each(function(){$(this).is(e.target)||0!==$(this).has(e.target).length||0!==$(".settings-panel").has(e.target).length||$(".settings-panel").hide()})}),$.fn.scrollTo=function(e,t,a){"function"==typeof t&&2==arguments.length&&(a=t,t=e);var n=$.extend({scrollTarget:e,offsetTop:50,duration:500,easing:"swing"},t);return this.each(function(){var e=$(this),t="number"==typeof n.scrollTarget?n.scrollTarget:$(n.scrollTarget),s="number"==typeof t?t:t.offset().top+e.scrollTop()-parseInt(n.offsetTop);e.animate({scrollTop:s},parseInt(n.duration),n.easing,function(){"function"==typeof a&&a.call(this)})})},$(t).on("click","#paymentTop .other",function(){$("#paymentTop .table-responsive").scrollTo(500,{duration:"slow"})}),$(t).on("click",".chooser .icon-down-arrow",function(){$(this).parent().toggleClass("open")}),$(t).on("click",".currencies .icon-plus",function(){$(this).parent().toggleClass("open")}),$(t).on("click",".buysell_popup .order",function(e){$(e.target).parents(".payment_methods").length||$(e.target).parents(".chat").length||$(e.target).parents(".close-line").length||$(e.target).parents(".select2").length||($(e.target).parents(".message").length?($(this).parent().find(".opened").removeClass("opened").addClass("closed").removeClass("payment_opened").removeClass("chat_opened"),$(this).toggleClass("chat_opened").toggleClass("opened").toggleClass("closed")):$(e.target).parents(".chat").length||($(this).parent().find(".opened").removeClass("opened").addClass("closed").removeClass("payment_opened").removeClass("chat_opened"),$(this).toggleClass("payment_opened").toggleClass("opened").toggleClass("closed"),$(this).find("select").select2({minimumResultsForSearch:"10"})))}),$(t).on("click",".buysell_popup .opened .close-line",function(){$(this).parent().removeClass("opened").addClass("closed").removeClass("payment_opened")}),$(".sortable").sortable({forcePlaceholderSize:!0,placeholder:'<div class="box-placeholder p0 m0"><div></div></div>'}),$(t).on("change",".plus select, .select-line select.toInputs",function(){var e=$(this).val(),t=$(this).find(":selected").attr("title"),a=$(this).find("option:selected").text();if(""!=e){if(!$(this).hasClass("toInputs"))if("other-type"!=e){$(this).hasClass("no-delete-options")?($(this).select2({placeholder:"Способ оплаты",allowClear:!0,minimumResultsForSearch:1/0}),$(this).parent().find(".select2-selection__clear").trigger("mousedown"),$(this).select2("close")):($(this).find("option[value='"+e+"']").remove(),$(this).select2("val",""));var n=$("#"+$(this).attr("id").replace("-filter",""));n.hasClass("with-settings")?n.append('<li class="list-group-item" value="'+e+'"><em class="icon-dashboard text-muted"></em><span class="text" title="'+t+'">'+a+'</span><div class="settings" data-type="'+e+'"></div><div class="remove"></div></li>').sortable({forcePlaceholderSize:!0,placeholder:'<div class="box-placeholder p0 m0"><div></div></div>'}).parent().fadeIn():n.hasClass("invoices")?n.append('<li class="list-group-item" value="'+e+'"><em class="icon-dashboard text-muted"></em><span class="text" title="'+t+'">'+a+'</span><div class="info" data-type="'+e+'"></div><div class="remove"></div></li>').sortable({forcePlaceholderSize:!0,placeholder:'<div class="box-placeholder p0 m0"><div></div></div>'}).parent().fadeIn():n.append('<li class="list-group-item" value="'+e+'"><span class="text" title="'+t+'">'+a+'</span><div class="remove"></div></li>').parent().fadeIn()}else console.log("Создать"),$(this).parent().parent().parent().after('<input type="text" placeholder="Название банка" class="form-control input-sm"><div class="remove"></div>');!$(this).hasClass("toInputs")&&!$(this).parent().parent().hasClass("toInputs")||$("#settings-inputs").find("."+e+"-field").length>0||$("#settings-inputs").append('<div class="'+e+'-field clearfix"><div class="col"><span><span data-localize="trades.popup.LABEL2">Cost in </span> <span> '+a+'</span></span><input class="form-control input-sm" type="text" name="'+e+'-cost"></div><div class="col2 fee"><div data-localize="trades.popup.LABEL_FEE">With fee </div><div><span class="percent">0.26</span> <span>'+a+"</span></div></label></div></div>").find("[data-localize]").localize("site",{pathPrefix:"i18n",language:$.localStorage.get("jq-appLang")})}1==$(this).find("option").length&&$(this).prop("disabled",!0)}),$(t).on("change","select.add-input",function(){var e=$(this).val();"other-type"==e?$(this).parent().parent().parent().after('<div class="line notop nobottom added"><div class="triple.select-line.clearfix"><input type="text" placeholder="Название банка" class="form-control input-sm full-width"><div class="remove"></div></div></div>'):$(this).parent().parent().parent().parent().find(".added").remove()}),$(t).on("click",".list li .remove",function(e){var t=$(this).parent();if(t.parent().hasClass("sortable"))var a=$.trim(t.find(".text:first").text());else var a=$.trim(t.text());""==a||$("#"+$(this).parent().parent().attr("id")+"-filter").hasClass("no-delete-options")||($("#"+$(this).parent().parent().attr("id")+"-filter").append('<option value="'+t.attr("value")+'">'+a+"</option").select2({minimumResultsForSearch:"5",width:"resolve"}).prop("disabled",!1),$("#settings-inputs").find("."+a+"-field").remove()),t.hasClass("fromLastPayments")&&$(".buy-options .last").find("#"+t.attr("id").replace("-list","")).removeClass("selected");var n="#"+$(this).parent().parent().attr("id");$(this).parent().find(".settings-panel").length>0&&$(this).parent().find(".settings-panel").appendTo("#create_order"),$(this).parent().remove(),0==$(n).find("li").length&&$(n).parent().fadeOut()}),$(t).on("click","#payment-list-buy .settings",function(e){$(this).parent().find(".settings-panel").length>0?console.log("Уже есть настройки"):($("."+$(this).attr("data-type")+"-settings").appendTo($(this).parent()),$(this).parent().find(".settings-panel select").select2({minimumResultsForSearch:10})),$(this).parent().parent().parent().find(".settings-panel").hide(),$(this).parent().find(".settings-panel").toggle()}),$(t).on("click","#payment-list-sell .info",function(e){$(this).parent().find(".settings-panel").length>0?console.log("Уже есть информация"):($("."+$(this).attr("data-type")+"-info").appendTo($(this).parent()),$(this).parent().find(".settings-panel select").select2({minimumResultsForSearch:10})),$(this).parent().parent().parent().find(".settings-panel").hide(),$(this).parent().find(".settings-panel").toggle()});var p=.02,c=1+p,d=1-p,u=386.385,h=28770,f=352,g=2776.08,v=5946.503,m=1574,b=44034.6625,C=2499.0917,r=function(){var e=0;return function(t,a){clearTimeout(e),e=setTimeout(t,a)}}();$(t).on("change input keyup mouseup",".inputs input",function(e){switch(this.value=this.value.replace(/[^0-9\.]/g,""),$(this).hasClass("with_fee")?new_value=parseFloat($(this).val()/c):new_value=parseFloat($(this).val()),(""==new_value||new_value<0||"NaN"==new_value)&&(new_value=0),field=$(this).parent().parent(),container=$(this).parent().parent().parent(),currency_changed=field.attr("class").split(" ")[0].replace("-field",""),t=0,currency_changed){case"BTC":var t=new_value;break;case"USD":var t=new_value/u;break;case"RUB":var t=new_value/h;break;case"EUR":var t=new_value/f;break;case"DKK":var t=new_value/g;break;case"ZAR":var t=new_value/v;break;case"RON":var t=new_value/m;break;case"JPY":var t=new_value/b;break;case"CNY":var t=new_value/C;break;default:var t=0}r(function(){$(container).find(".clearfix").each(function(){switch((0>t||""==t)&&(t=0),currency=$(this).attr("class").split(" ")[0].replace("-field",""),round=2,currency){case"BTC":value=t,round=8;break;case"USD":value=t*u,round=3;break;case"RUB":value=t*h,round=2;break;case"EUR":value=t*f,round=3;break;case"DKK":value=t*g,round=2;break;case"ZAR":value=t*v,round=3;break;case"RON":value=t*m,round=2;break;case"JPY":value=t*b,round=4;break;case"CNY":value=t*C,round=4}currency!=currency_changed?($(this).find(".col input").val(n(value,round)),$(this).find(".col2 .percent").text(n(value*p,2)),$(this).find(".col2 input").val(n(value*c,round))):($(this).find(".col input").val(new_value),$(this).find(".col2 .percent").text(n(new_value*p,2)),$(this).find(".col2 input").val(n(new_value*c,round)))})},500)}),$(t).on("click","[data-action=create_order_buy]",function(){return $("#create_order").find(".tabs .buy").addClass("active"),$("#create_order").find(".tabs .sell").removeClass("active"),$("#create_order").find(".buy-options").show(),$("#create_order").find(".sell-options").hide(),$("#create_order").css("left",$(this).position().left-15),$("#create_order").css("top",$(this).position().top+110),$("#create_order").find(".add-payment select").select2({placeholder:"Способ оплаты",allowClear:!0,minimumResultsForSearch:1/0}),$("#create_order").slideDown().animatescroll(),!1}),$(t).on("click","[data-action=create_order_sell]",function(){return $("#create_order").find(".tabs .sell").addClass("active"),$("#create_order").find(".tabs .buy").removeClass("active"),$("#create_order").find(".sell-options").show(),$("#create_order").find(".buy-options").hide(),!1}),$(t).on("click","#create_order .tabs .tab",function(){$("#create_order").find(".tabs .tab").toggleClass("active"),$("#create_order").find(".buy-options, .sell-options").toggle()}),$(t).on("click","#create_order .hide_it",function(){$("#create_order").slideUp()}),$(t).on("click",".buy-options .last",function(){$(this).find(".popup").fadeToggle()}),$(t).on("click",".buy-options .last ul li",function(){var e=$(this).html(),t=$(this).text(),a=$(this).attr("title"),n=$(this).attr("id"),s=$("#payment-list-buy");$(this).hasClass("selected")?s.find("value="+e).remove():s.append('<li class="list-group-item fromLastPayments" id="'+n+'-list" value="'+t+'"><em class="icon-dashboard text-muted"></em><span class="text" title="'+a+'">'+e+'</span><div class="remove single"></div></li>').sortable({forcePlaceholderSize:!0,placeholder:'<div class="box-placeholder p0 m0"><div></div></div>'}).parent().fadeIn(),$(this).toggleClass("selected")}),$(t).on("click",".settings-panel .close-settings, .settings-panel .icon-cross",function(){$(this).parent().toggle()}),$(t).on("click",".main-settings-open",function(){return $(this).parent().parent().find(".settings-panel").hide(),$(this).parent().parent().find(".main-settings").toggle().find("select").select2({minimumResultsForSearch:"5"}),!1}),$(t).on("click","#orders tbody [role=row]",function(e){$(e.target).parents(".seller").length||(position=$(this).position().top+10+$(this).height(),row_id=$(this).attr("id"),$("#"+$(this).parent().parent().attr("id")+"-popup").slideUp(r),"1"!=$("#"+row_id+"-popup").length?($("#"+$(this).parent().parent().attr("id")+"-popup.template").clone().removeClass("template").appendTo("#orders .tab-content").attr("id",row_id+"-popup").find("select").select2({minimumResultsForSearch:"5"}),$("#"+row_id+"-popup").css("top",position).addClass("opened").slideDown(r),$(this).addClass("opened")):$("#"+row_id+"-popup").hasClass("opened")?($("#"+row_id+"-popup").css("top",position).removeClass("opened").slideUp(r),$(this).removeClass("opened")):($("#"+row_id+"-popup").css("top",position).addClass("opened").slideDown(r),$(this).addClass("opened")),$(".wrapper").css("minHeight","2300px"))}),$(t).on("click","#orders .nav li",function(){$(".payment-selector").select2({minimumResultsForSearch:"5",allowClear:!0,placeholder:"Способ оплаты"}),$(".price-selector").select2({minimumResultsForSearch:"5",allowClear:!0,placeholder:"Стоимость"}),$(".country-selector").select2({minimumResultsForSearch:"5",allowClear:!0,placeholder:"Страна"}),$(".favorite-selector").select2({minimumResultsForSearch:"5",allowClear:!0,placeholder:"Избранные пользователи"})}),$("#chk-sound").on("change",function(e){$(this).parent().find("em").toggleClass("active")}),$(t).on("click",".notification .label",function(){$(this).parent().addClass("open")}),$(t).on("click",".notification .icon-cross",function(){$(this).parent().slideUp().remove(),count=$("ul.notifications li").length,$("#notification_label").text(count),0==count?($("#notification_label").text("0").addClass("zero"),$("ul.default").fadeIn(),$("ul.notifications").parent().find(".footer .hide_all").hide(),$("ul.notifications").parent().find(".footer .hide_panel").show()):$("#notification_label").text(count).removeClass("zero")}),$(t).on("click",".notification .footer .hide_all",function(){$(this).parent().parent().find("ul.notifications").remove(),$(this).parent().parent().find("ul.default").fadeIn(),$(this).parent().find(".hide_panel").show(),$("#notification_label").text(0).addClass("zero"),$(this).fadeOut()}),$(t).on("click",".notification .footer .hide_panel",function(){$(this).parent().parent().parent().removeClass("open")}),jQuery.extend(jQuery.fn.dataTableExt.oSort,{"signed-num-pre":function(e){return"-"==e||""===e?0:1*e.replace("+","")},"signed-num-asc":function(e,t){return t>e?-1:e>t?1:0},"signed-num-desc":function(e,t){return t>e?1:e>t?-1:0}}),jQuery.extend(jQuery.fn.dataTableExt.oSort,{"formatted-num-pre":function(e){return e="-"===e||""===e?0:e.replace(/[^\d\-\.]/g,""),parseFloat(e)},"formatted-num-asc":function(e,t){return e-t},"formatted-num-desc":function(e,t){return t-e}});var w=$("#paymentTop .table-responsive table").dataTable({paging:!1,searching:!1,lengthChange:!1,bInfo:!1,sDom:"rt",sAjaxSource:"../server/payment_top.json",aoColumns:[{mData:"name"},{sType:"formatted-num",mData:"count"}],order:[[1,"desc"]],initComplete:function(){},fnDrawCallback:function(){$("#paymentTop .table-responsive table thead").remove(),this.parent().find("[data-localize]").localize("site",{pathPrefix:"i18n",language:$.localStorage.get("jq-appLang")})}});$("#paymentTop select").on("change",function(e){w.api().ajax.url("../server/newTop.json").load()}),$(".select2-results").on("click","li",function(){$(this).find("li").toggle()}),$("body").on("click",".payment-select .select2-results__option[role=treeitem]",function(){"true"==$(this).attr("aria-selected")?($(this).removeClass("selected"),$(this).attr("aria-selected","false")):($(this).addClass("selected"),$(this).attr("aria-selected","true"))}),$("body").on("click",".select2-results__group",function(){$(this).parent().toggleClass("toggled")}),$("#ordersBuy, #ordersSell").dataTable({paging:!0,searching:!0,lengthChange:!1,bInfo:!1,sDom:"<'row'<'col-xs-6'l><'col-xs-6'>r>t<'row footer'<'create'>p<'show-closed'>>",language:{paginate:{first:"«",previous:"«",next:"»",last:"»"}},pageLength:7,pagingType:"simple_numbers",sAjaxSource:"../server/manage_orders.json",aoColumns:[{sClass:"order_name",mData:"order_name"},{sClass:"date",mData:"date"},{sClass:"btc",mData:"btc"},{sClass:"amount",bSortable:!1,sType:"formatted-num",mData:"amount"},{sClass:"country",bSortable:!1,mData:"country"},{sClass:"status",bSortable:!1,mData:"status"},{sClass:"arrow",bSortable:!1,sDefaultContent:'<span class="icon-down-arrow"></span>',mData:null}],initComplete:function(){this.parent().find(".show-closed").append('<button class="button btn btn-transparent"></button>'),this.parent().find(".show-closed button").attr("data-localize","trades.SHOWCLOSED").localize("site",{pathPrefix:"i18n",language:$.localStorage.get("jq-appLang")}),this.parent().find(".create").append('<button class="btn btn-orange"></button>'),this.parent().find(".create button").attr("data-action","create_order_buy").attr("data-localize","trades.CREATE_ORDER").localize("site",{pathPrefix:"i18n",language:$.localStorage.get("jq-appLang")}),this.api().columns(".country").every(function(){var e=this;console.log;var t=$('<select class="country-selector form-control"><option data-localize="trades.COUNTRY" value=""></option></select>').appendTo($(e.header()).empty()).on("change",function(){var t=$.fn.dataTable.util.escapeRegex($(this).val());e.search(t?"^"+t+"$":"",!0,!1).draw()});e.data().unique().sort().each(function(e,a){t.append('<option value="'+e+'">'+e+"</option>")}),t.wrap("<div class='select-wrapper'></div>").find("[data-localize]").localize("site",{pathPrefix:"i18n",language:$.localStorage.get("jq-appLang")})}),$(".country-selector").select2({minimumResultsForSearch:"8",allowClear:!0,placeholder:"Страна"}),this.api().columns(".status").every(function(){var e=this,t=$('<select class="status-selector form-control"><option data-localize="trades.STATUS" value=""></option></select>').appendTo($(e.header()).empty()).on("change",function(){var t=$.fn.dataTable.util.escapeRegex($(this).val());e.search(t?"^"+t+"$":"",!0,!1).draw()});e.data().unique().sort().each(function(e,a){t.append('<option value="'+e+'">'+e+"</option>")}),t.wrap("<div class='select-wrapper'></div>").find("[data-localize]").localize("site",{pathPrefix:"i18n",language:$.localStorage.get("jq-appLang")})}),$(".status-selector").select2({minimumResultsForSearch:"8",allowClear:!0,placeholder:"Статус"})}}),$.fn.dataTable.ext.search.push(function(e,t,a){var n=parseFloat($(".price .input-popup input").val(),10),s=parseFloat($(".amount .input-popup input").val(),10),o=parseFloat(t[0])||0,i=parseFloat(t[1])||0;return(isNaN(n)||o>=n)&&(isNaN(s)||i>=s)?!0:!1}),$("#orders-buy-table, #orders-sell-table").dataTable({paging:!0,searching:!0,lengthChange:!1,bInfo:!1,sDom:"<'row'<'col-xs-12 col-md-6'f><'col-xs-12 col-md-6'<'fav dataTables_filter'>>r>t<'row'p>",lengthMenu:[[40],["40 rows"]],language:{paginate:{first:"«",previous:"«",next:"»",last:"»"}},oLanguage:{sSearch:'<i class="icon-magnifier"></i>'},pageLength:14,pagingType:"simple_numbers",sAjaxSource:"../server/orders.json",aoColumns:[{sType:"formatted-num",bSortable:!1,sClass:"price",mData:"price"},{mData:"amount",bSortable:!0,sClass:"amount"},{sClass:"payment",bSortable:!1,mData:"payment"},{sClass:"seller",mData:"seller"},{sType:"signed-num",sClass:"rating",mData:"rating"},{sClass:"country",mData:"country",bSortable:!1},{sClass:"arrow",bSortable:!1,sDefaultContent:'<span class="toggle"><i class="icon-down-arrow"></i></span>'}],initComplete:function(){var e=this;this.parent().find("[type=search]").attr("data-localize","trades.SEARCH").localize("site",{pathPrefix:"i18n",language:$.localStorage.get("jq-appLang")}),this.parent().find("[type=search]").parent().parent().append('<span class="tip">(email, id, имя<br>или номер телефона)</span>'),this.parent().find(".fav").append('<label class="control-label mb"><i class="icon-favorite"></i><select id="fav-'+this.attr("id")+'" class="favorite-selector form-control" name="favorite" value=""><option class="default" value="" data-localize="trades.FAVORITE"></option><option value="Константин Константинопольский">Константин Константинопольский</option><option value="Александридис Константинопулос">Александридис Константинопулос</option><option value="Валерий Панфилов">Валерий Панфилов</option><option value="Александр Валерьев">Александр Валерьев</option></select></label>');var t="fav-"+this.attr("id");this.parent().find(".fav, .buy_button").find("[data-localize]").localize("site",{pathPrefix:"i18n",language:$.localStorage.get("jq-appLang")}),this.api().columns(".price").every(function(){var e=this,t=$('<select class="value-selector form-control"><option data-localize="trades.popup.CUR" value=""></option><option value="" data-localize="trades.popup.COST">Стоимость</option><option value="RUB">RUB</option><option value="USD">USD</option><option value="EUR">EUR</option><option value="DKK">DKK</option><option value="ZAR">ZAR</option><option value="RON">RON</option><option value="JPY">JPY</option><option value="CNY">CNY</option></select>').appendTo($(e.header()).empty()).on("change",function(){var t=$.fn.dataTable.util.escapeRegex($(this).val());e.search(t?t:"",!0,!1).draw()});t.wrap("<div class='select-wrapper'></div>").find("[data-localize]").localize("site",{pathPrefix:"i18n",language:$.localStorage.get("jq-appLang")})}),$(".value-selector").select2({minimumResultsForSearch:"12",allowClear:!0,placeholder:"Стоимость"}),this.api().columns(".amount").every(function(){var e=this,t=$('<div class="input-wrapper"><span data-localize="trades.AMOUNTBTC"></span><div class="input-popup"><span data-localize="trades.AMOUNT_INPUT"></span><br><span data-localize="trades.FROM"></span> <input type="text" onkeypress="return event.charCode >= 46 && event.charCode <= 57" class="form-control" value="0"></div></div>').appendTo($(e.header()).empty()).on("keyup",function(){e.draw()});t.find("[data-localize]").localize("site",{pathPrefix:"i18n",language:$.localStorage.get("jq-appLang")})}),this.api().columns(".payment").every(function(){var e=this,t=$('<select class="payment-selector form-control" multiple="multiple"><optgroup label="Электронные деньги"><option value="webmoney" title="Trust 75">WebMoney</option><option value="paypal" title="Trust 100">PayPal</option><option value="yandex-money" title="Trust 100">Yandex.Money</option></optgroup><optgroup label="Банковский перевод"></optgroup></select>').appendTo($(e.header()).empty()).on("select2:open",function(e){$(".select2-container--open").addClass("payment-select")}).on("change",function(){var t=$.fn.dataTable.util.escapeRegex($(this).val());e.search(t?"^"+t+"$":"",!0,!1).draw()});e.data().unique().sort().each(function(e,a){var n=e.indexOf("title='")+"title='".length,s=e.indexOf("'",n+1),o=e.substring(n,s);t.find("optgroup:last").append('<option value="'+e+'" title="'+o+'">'+e+"</option>")}),t.wrap("<div class='select-wrapper'></div>").find("[data-localize]").localize("site",{pathPrefix:"i18n",language:$.localStorage.get("jq-appLang")})}),$(".payment-selector").select2({minimumResultsForSearch:"5",placeholder:"Способ оплаты"}),this.api().columns(".country").every(function(){var e=this,t=$('<select class="country-selector form-control"><option data-localize="trades.PAYMENTSYSTEM" value=""></option></select>').appendTo($(e.header()).empty()).on("change",function(){var t=$.fn.dataTable.util.escapeRegex($(this).val());e.search(t?"^"+t+"$":"",!0,!1).draw()});e.data().unique().sort().each(function(e,a){t.append('<option value="'+e+'">'+e+"</option>")}),t.wrap("<div class='select-wrapper'></div>").find("[data-localize]").localize("site",{pathPrefix:"i18n",language:$.localStorage.get("jq-appLang")})}),$(".country-selector").select2({minimumResultsForSearch:"5",allowClear:!0,placeholder:"Страна"}),this.api().column(".seller").every(function(){var e="",a=this,n=$("#"+t).on("change",function(){e=$.fn.dataTable.util.escapeRegex($(this).val()),a.search(e?"^"+e+"$":"",!0,!1).draw(),""==e?$("#"+t).parent().find(".select2-selection__rendered").css("color","#B8BBCA"):$("#"+t).parent().find(".select2-selection__rendered").css("color","#000")})}),this.find("td.seller a").after('<em class="icon-magnifier"></em>'),this.find("td.seller .icon-magnifier").on("click",function(){var t=$(this).parent().find("a").text();return e.parent().find("label [type=search]").val(t).trigger("input"),!1}),$(".favorite-selector").select2({minimumResultsForSearch:"5",allowClear:!0,placeholder:"Избранные пользователи"}),$("#paymentTop").matchHeight({byRow:!0,property:"height",target:$("#buysell"),remove:!1})},fnDrawCallback:function(){this.parent().find(".buy_button").find("[data-localize]").localize("site",{pathPrefix:"i18n",language:$.localStorage.get("jq-appLang")}),$(this).find('[data-toggle="tooltip"]').tooltip({container:"body"})},createdRow:function(e,t,a){$(e).attr("id",$(this).attr("id")+"-row-"+a)}})})}(window,document,window.jQuery);