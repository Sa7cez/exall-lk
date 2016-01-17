// Custom jQuery
// ----------------------------------- 


(function(window, document, $, undefined){

  $(function(){

    // Currency changer

    var currencies_info_default = {'RUB':'1','CNY':'1','ZAR':'1','RON':'1','USD':'1','EUR':'1','JPR':'1','DKK':'1'};
    var storage_currencies_info = 'jq-appCurInfo';
    var currencies_info = $.localStorage.get(storage_currencies_info) || currencies_info_default;

    $.localStorage.set(storage_currencies_info, currencies_info);

    $.each( currencies_info, function( i, val ) {
      if(val == 1) {
      	$('#' + i + '_info').show();
      	$('[role=currencies] input[value="' + i + '"]').prop( "checked", true );
      } else {
      	$('#' + i + '_info').hide();
      	$('[role=currencies] input[value="' + i + '"]').prop( "checked", false );
      }
	});

    $(document).on('change', '[role=currencies] input', function () {
      var currencies_info = $.localStorage.get(storage_currencies_info) || currencies_info_default;
      if($(this).is(":checked")) {
      	currencies_info[$(this).val()] = '1';
      	$.localStorage.set(storage_currencies_info, currencies_info);
        $('#' + $(this).val() + '_info').show();
      } else {
      	currencies_info[$(this).val()] = '0';
      	$.localStorage.set(storage_currencies_info, currencies_info);
      	$('#' + $(this).val() + '_info').hide();
      }
	});

  // Buysell actions

  $('.buysell_popup').slideUp();

  $(document).on('click', '#buysell tbody [role=row]', function () {
    $('.buysell_popup').css('top',$(this).position().top + 47).slideToggle();
  });

  $(document).on('click', '[data-tool=popup-hide]', function () {
    $('.buysell_popup').slideUp();
  });

  $('body').on('click', function (e) {
    $('[data-tool=popup-hide]').each(function () {
        // hide any open popovers when the anywhere else in the body is clicked
        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.buysell_popup').has(e.target).length === 0) {
            $('.buysell_popup').slideUp();
        }
    });
  });

	// Something else

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

          this.parent().find('.fav').append('<label class="control-label mb"><i class="icon-favorite"></i><select id="fav-'+ this.attr('id') +'" class="favorite-selector form-control" name="favorite" value=""><option value="" data-localize="trades.FAVORITE"></option><option value="Константин Константинопольский">Константин Константинопольский</option><option value="Александридис Константинопулос">Александридис Константинопулос</option><option value="Валерий Панфилов">Валерий Панфилов</option><option value="Александр Валерьев">Александр Валерьев</option></select></label>');

          this.parent().find('.currencies').append('<a href="#" class="active">RUB</a><a href="#">USD</a><a href="#">EUR</a>');

          this.api().columns('.payment').every( function () {
              var column = this;
              var select = $('<select class="payment-selector form-control"><option data-localize="trades.PAYMENTSYSTEM" value=""></option></select>')
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

          $('.favorite-selector').select2({
              minimumResultsForSearch: Infinity
          });

          $('.payment-selector').select2({
              minimumResultsForSearch: Infinity
          });

          oTable = this;
          this.api().column('.seller').every( function () {
              var column = this;
              var select = $('#fav-' + oTable.attr('id'))
                  .on( 'change', function () {
                      var val = $.fn.dataTable.util.escapeRegex(
                          $(this).val()
                      );

                      column
                          .search( val ? '^'+val+'$' : '', true, false )
                          .draw();
                          console.log('s');
                  } );
          });

      }
  });


  // END

});

})(window, document, window.jQuery);