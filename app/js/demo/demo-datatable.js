// Demo datatables
// ----------------------------------- 


(function(window, document, $, undefined){

  $(function(){

    // 
    // AJAX
    // 

    $('#ordersBuy, #ordersSell').dataTable({
        'paging':   true,  // Table pagination
        'searching': false,
        'lengthChange': false,
        'bInfo': false,
        "sDom":
        "<'row'<'col-xs-6'l><'col-xs-6'f>r>"+"t"+
        "<'row'p>",
        language: {
        paginate: {
            first:    '«',
            previous: '«',
            next:     '»',
            last:     '»'
        }},
        pageLength: 7,
        pagingType: 'simple_numbers',
        sAjaxSource: '../server/manage_orders.json',
        aoColumns: [
          { sClass: 'message', mData: 'message' },
          { mData: 'order_name' },
          { mData: 'btc' },
          { mData: 'amount' },
          { mData: 'status' },
          { mData: 'date' },
          { sClass: 'arrow', bSortable: false, sDefaultContent: '<span class="icon-down-arrow"></span>', mData: null }
        ]
    });

    $('#orders-buy-table, #orders-sell-table').dataTable({
        'paging':   true,  // Table pagination
        'searching': true,
        'lengthChange': false,
        'bInfo': false,
        "sDom":
        "<'row'<'col-xs-6 col-md-7'f><'col-xs-6 col-md-5'<'fav dataTables_filter'>>r><'row'<'col-xs-12'<'currencies'>>>"+"t"+
        "<'row'p>",
        language: {
          paginate: {
            first:    '«',
            previous: '«',
            next:     '»',
            last:     '»'
          },
        },
        oLanguage: { "sSearch": '<i class="icon-magnifier"></i>' },
        pageLength: 14,
        pagingType: 'simple_numbers',
        sAjaxSource: '../server/orders.json',
        aoColumns: [
          { sClass: 'price', mData: 'price' },
          { mData: 'amount' },
          { sClass: 'payment', bSortable: false, mData: 'payment' },
          { sClass: 'seller', mData: 'seller' },
          { sClass: 'rating', mData: 'rating' },
          { sClass: 'buy_button', bSortable: false, sDefaultContent: '<a href="#" data-localize="trades.BUY" class="btn btn-orange btn-sm"></a>', mData: null }
        ],
        initComplete: function () {
            this.parent().find('[type=search]').attr('data-localize', 'trades.SEARCH').localize('site', { pathPrefix: 'i18n', language: $.localStorage.get('jq-appLang')});

            this.parent().find('.fav').append('<label><i class="icon-favorite"></i><input id="favourite_popup" type="search" class="form-control input-sm" placeholder="" data-localize="trades.FAVORITE" aria-controls="orders-buy-table"></label>');

            this.parent().find('.currencies').append('<a href="#" class="active">RUB</a><a href="#">USD</a><a href="#">EUR</a>');

            this.api().columns('.payment').every( function () {
                var column = this;
                var select = $('<select class="form-control"><option data-localize="trades.PAYMENTSYSTEM" value=""></option></select>')
                    .appendTo( $(column.header()).empty() )
                    .on( 'change', function () {
                        var val = $.fn.dataTable.util.escapeRegex(
                            $(this).val()
                        );
 
                        column
                            .search( val ? '^'+val+'$' : '', true, false )
                            .draw();
                    } );
 
                column.data().unique().sort().each( function ( d, j ) {
                    select.append( '<option value="'+d+'">'+d+'</option>' );
                } );

                select.wrap("<div class='select-wrapper'></div>").find("[data-localize]").localize('site', { pathPrefix: 'i18n', language: $.localStorage.get('jq-appLang')})
            } );

            this.parent().find('.fav, .buy_button').find("[data-localize]").localize('site', { pathPrefix: 'i18n', language: $.localStorage.get('jq-appLang')});
        }
    });

  });

})(window, document, window.jQuery);
