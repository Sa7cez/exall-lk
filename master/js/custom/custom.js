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
      	$('.chooser_popup input[value="' + i + '"]').prop( "checked", true );
      } else {
      	$('#' + i + '_info').hide();
      	$('.chooser_popup input[value="' + i + '"]').prop( "checked", false );
      }
	});

  $(document).on('change', '.chooser_popup input', function () {
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
        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.buysell_popup').has(e.target).length === 0) {
            $('.buysell_popup').slideUp();
        }
    });
    $('#create_order_buy').each(function () {
        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('#create_order_buy').has(e.target).length === 0) {
            $('#create_order_buy').slideUp();
        }
    });
    $('#create_order_sell').each(function () {
        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('#create_order_sell').has(e.target).length === 0) {
            $('#create_order_sell').slideUp();
        }
    });
    $('.offsidebar .profile').each(function () {
        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.offsidebar .profile').has(e.target).length === 0) {
            $('body').removeClass('offsidebar-open');
        }
    });
    $('.chooser').each(function () {
        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.chooser').has(e.target).length === 0) {
            $('.chooser').removeClass('open');
        }
    });
  });

  // CHOOSER

  $(document).on('click', '.chooser .icon-down-arrow', function () {
      $(this).parent().toggleClass('open');
  });

  // BuySell popup

  $(document).on('click', '.buysell_popup .to-open', function () {
      $(this).parent().find('.opened').toggleClass('opened').toggleClass('closed');
      $(this).toggleClass('opened').toggleClass('closed');
  });

  // Sortable

  $('.sortable').sortable({
    forcePlaceholderSize: true,
    placeholder: '<div class="box-placeholder p0 m0"><div></div></div>'
  });

  // Create order

  $('#payment-list-filter').prop("disabled", true);
  $(document).on('change', '.plus select', function () {
      var val = $(this).val();
      var text = $(this).val();
      if(val != '') {
        $(this).find("option[value='" + val + "']").remove();
        $(this).select2('val', '');
        $('#' + $(this).attr('id').replace('-filter', '')).append('<li class="list-group-item" value="' + val + '"><em class="icon-dashboard text-muted mr-lg"></em>' + text + '<div class="remove"></div></li>').sortable({forcePlaceholderSize: true, placeholder: '<div class="box-placeholder p0 m0"><div></div></div>'});
      }
      console.log($(this).find('option').length == 1);
      if($(this).find('option').length == 1) {
        $(this).prop("disabled", true);
      }
  });

  $(document).on('click', '.sortable li .remove', function (e) {
    var text = $.trim($(this).parent().text());
    $('#' + $(this).parent().parent().attr('id') + '-filter').append('<option value="' + text + '">' + text + '</option').select2({minimumResultsForSearch: Infinity}).prop("disabled", false);
    $(this).parent().remove();
  });

  $(document).on('click', '[data-action=create_order_buy]', function () {
      $('#create_order_buy').slideDown();
      return false;
  }); 

  $(document).on('click', '[data-action=create_order_sell]', function () {
      $('#create_order_sell').slideDown();
      return false;
  }); 

  $(document).on('click', '#create_order_buy .hide_it', function () {
      $('#create_order_buy').slideUp();
  }); 

  $(document).on('click', '#create_order_sell .hide_it', function () {
      $('#create_order_sell').slideUp();
  }); 

  $(document).on('click', '.settings-panel .close-settings', function () {
      $(this).parent().toggle();
  });   
  $(document).on('click', '.settings .arrow', function () {
      $(this).parent().parent().find('.settings-panel').toggle();
      return false;
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
      "<'row'p<'show-closed'>>",
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
      ],
      initComplete: function () {
          this.parent().find('.show-closed').append('<button class="button btn btn-transparent"></button>');
          this.parent().find('.show-closed button').attr('data-localize', 'trades.SHOWCLOSED').localize('site', { pathPrefix: 'i18n', language: $.localStorage.get('jq-appLang')});
      },
      fnDrawCallback: function() {
        this.parent().find("[data-localize]").localize('site', { pathPrefix: 'i18n', language: $.localStorage.get('jq-appLang')});
        $('#paymentTop').matchHeight._update();
      }
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

          this.parent().find('.fav').append('<label class="control-label mb"><i class="icon-favorite"></i><select id="fav-'+ this.attr('id') +'" class="favorite-selector form-control" name="favorite" value=""><option class="default" value="" data-localize="trades.FAVORITE"></option><option value="Константин Константинопольский">Константин Константинопольский</option><option value="Александридис Константинопулос">Александридис Константинопулос</option><option value="Валерий Панфилов">Валерий Панфилов</option><option value="Александр Валерьев">Александр Валерьев</option></select></label>');
          var favid = '#fav-'+ this.attr('id');

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

          $('.favorite-selector').select2({});

          $('.payment-selector').select2({});

          this.api().column('.seller').every( function () {
              var val = '';
              var column = this;
              var select = $(favid)
                  .on( 'change', function () {
                      val = $.fn.dataTable.util.escapeRegex(
                          $(this).val()
                      );

                      column
                          .search( val ? '^'+val+'$' : '', true, false )
                          .draw();

                      console.log(favid);

                      if(val == '') {
                        $(favid).parent().find('.select2-selection__rendered').css('color','#B8BBCA');
                      } else {
                        $(favid).parent().find('.select2-selection__rendered').css('color','#000'); 
                      }
                  } );
          });

          $('#paymentTop').matchHeight({
            byRow: true,
            property: 'height',
            target: $('#buysell'),
            remove: false
          });

      },
      fnDrawCallback: function() {
        this.parent().find('.buy_button').find("[data-localize]").localize('site', { pathPrefix: 'i18n', language: $.localStorage.get('jq-appLang')});
      }
  });


  // END

});

})(window, document, window.jQuery);