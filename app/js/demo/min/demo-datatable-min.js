!function(a,e,$,t){$(function(){$("#ordersBuy, #ordersSell").dataTable({paging:!0,searching:!1,lengthChange:!1,bInfo:!1,sDom:"<'row'<'col-xs-6'l><'col-xs-6'f>r>t<'row'p>",language:{paginate:{first:"«",previous:"«",next:"»",last:"»"}},pageLength:7,pagingType:"simple_numbers",sAjaxSource:"../server/datatable.json",aoColumns:[{sClass:"message",mData:"message"},{mData:"order_name"},{mData:"btc"},{mData:"amount"},{mData:"status"},{mData:"date"},{sClass:"arrow",bSortable:!1,sDefaultContent:'<span class="icon-down-arrow"></span>',mData:null}]}),$("#orders-buy-table, #orders-sell-table").dataTable({paging:!0,searching:!0,lengthChange:!1,bInfo:!1,sDom:"<'row'<'col-xs-6 col-md-7'f><'col-xs-6 col-md-5'<'fav dataTables_filter'>>r><'row'<'col-xs-12'<'currencies'>>>t<'row'p>",language:{paginate:{first:"«",previous:"«",next:"»",last:"»"}},oLanguage:{sSearch:'<i class="icon-magnifier"></i>'},pageLength:14,pagingType:"simple_numbers",sAjaxSource:"../server/orders.json",aoColumns:[{sClass:"price",mData:"price"},{mData:"amount"},{sClass:"payment",bSortable:!1,mData:"payment"},{sClass:"seller",mData:"seller"},{sClass:"rating",mData:"rating"},{sClass:"buy_button",bSortable:!1,sDefaultContent:'<a href="#" data-localize="trades.BUY" class="btn btn-orange btn-sm"></a>',mData:null}],initComplete:function(){this.parent().find("[type=search]").attr("data-localize","trades.SEARCH").localize("site",{pathPrefix:"i18n",language:$.localStorage.get("jq-appLang")}),this.parent().find(".fav").append('<label><i class="icon-favorite"></i><input id="favourite_popup" type="search" class="form-control input-sm" placeholder="" data-localize="trades.FAVORITE" aria-controls="orders-buy-table"></label>'),this.parent().find(".currencies").append('<a href="#" class="active">RUB</a><a href="#">USD</a><a href="#">EUR</a>'),this.api().columns(".payment").every(function(){var a=this,e=$('<select class="form-control"><option data-localize="trades.PAYMENTSYSTEM" value=""></option></select>').appendTo($(a.header()).empty()).on("change",function(){var e=$.fn.dataTable.util.escapeRegex($(this).val());a.search(e?"^"+e+"$":"",!0,!1).draw()});a.data().unique().sort().each(function(a,t){e.append('<option value="'+a+'">'+a+"</option>")}),e.wrap("<div class='select-wrapper'></div>").find("[data-localize]").localize("site",{pathPrefix:"i18n",language:$.localStorage.get("jq-appLang")})}),this.parent().find(".fav, .buy_button").find("[data-localize]").localize("site",{pathPrefix:"i18n",language:$.localStorage.get("jq-appLang")})}}),$("div.toolbar").html("<b>Custom tool bar! Text/images etc.</b>")})}(window,document,window.jQuery);