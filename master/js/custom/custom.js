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

  

  $(".currencies ul li").on({
    mouseenter: function () {
        $('.currencies ul li.open').removeClass('open');
        $(this).addClass('open');
    },
    mouseleave: function () {
      //$(this).removeClass('open');
    }
  });

  $(".topnavbar .wallet-opener").on({
    mouseenter: function () {
        $('.topnavbar .open').removeClass('open');
        $(this).addClass('open');
    },
    mouseleave: function () {
      $(this).removeClass('open');
    }
  });

  $( window ).resize(function() {
    $('.favorite-selector, .payment-selector').select2({});
  });

  //** SCROLL ANIMATION

  // defines easing effects
  $.easing['jswing'] = $.easing['swing'];
  $.extend($.easing, {
      easeInOutBack: function (x, t, b, c, d, s) {
          if (s === undefined) s = 1.70158;
          if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
          return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
      }
  });


  $.fn.animatescroll = function (options) {

      // fetches options
      var opts = $.extend({}, $.fn.animatescroll.defaults, options);
      if (opts.element === "html,body") {
          // Calculate padding according to presence of menu
          if(this.hasClass('no_padding')) {
              var offset = this.offset().top - 50;
          } else {
              var offset = this.offset().top - 70;
          }
          var currentPadding = 0;
          // Scroll the page to the desired position
          $(opts.element).stop().animate({ scrollTop: offset - (opts.padding + currentPadding)}, opts.scrollSpeed, opts.easing);
      }
      else {
          // Scroll the element to the desired position
          $(opts.element).stop().animate({ scrollTop: this.offset().top - this.parent().offset().top + this.parent().scrollTop() - opts.padding }, opts.scrollSpeed, opts.easing);
      }
  };

  // default options
  $.fn.animatescroll.defaults = {
      easing: "swing", //"easeInOutBack",
      scrollSpeed: 500,
      padding: 0,
      element: "html,body"
  };

  //** END SCROLL ANIMATIONS

  // Buysell actions

  var delay = 150;

  $('.buysell_popup').slideUp(1);

  $(document).on('click', '#buysell tbody [role=row]', function () {
    //$('.buysell_popup').clone().appendTo('#buysell .tab-content').css('top',$(this).position().top + 47).slideDown(delay);

    position = $(this).position().top + 47;
    row_id = $(this).attr('id');
    $('.buysell_popup').slideUp(delay);

    if($('#' + row_id + '-popup').length != '1') {
      $('.buysell_popup.template').clone().removeClass('template').appendTo('#buysell .tab-content').attr('id', row_id + '-popup');
      $('#' + row_id + '-popup').css('top',position).addClass('opened').slideDown(delay);
    } else {
      if($('#' + row_id + '-popup').hasClass('opened')) {
        $('#' + row_id + '-popup').css('top',position).removeClass('opened').slideUp(delay);
      } else {
        $('#' + row_id + '-popup').css('top',position).addClass('opened').slideDown(delay);
      }
    }
  });

  $(document).on('click', '[data-tool=popup-hide]', function () {
    $(this).parent().removeClass('opened').slideUp(delay);
  });

  $('body').on('click', function (e) {
    $('.buysell_popup').each(function () {
        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('#buysell').has(e.target).length === 0) {
            $('.buysell_popup').slideUp(delay);
        }
    });
    $('#create_order_buy').each(function () {
        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('#create_order_buy').has(e.target).length === 0) {
            $('#create_order_buy').slideUp(delay);
        }
    });
    $('#create_order_sell').each(function () {
        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('#create_order_sell').has(e.target).length === 0) {
            $('#create_order_sell').slideUp(delay);
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
    $('.notification .dropdown-menu').each(function () {
        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.chooser').has(e.target).length === 0) {
            $('.notification').removeClass('open');
        }
    });
  });

  $.fn.scrollTo = function( target, options, callback ){
    if(typeof options == 'function' && arguments.length == 2){ callback = options; options = target; }
    var settings = $.extend({
      scrollTarget  : target,
      offsetTop     : 50,
      duration      : 500,
      easing        : 'swing'
    }, options);
    return this.each(function(){
      var scrollPane = $(this);
      var scrollTarget = (typeof settings.scrollTarget == "number") ? settings.scrollTarget : $(settings.scrollTarget);
      var scrollY = (typeof scrollTarget == "number") ? scrollTarget : scrollTarget.offset().top + scrollPane.scrollTop() - parseInt(settings.offsetTop);
      scrollPane.animate({scrollTop : scrollY }, parseInt(settings.duration), settings.easing, function(){
        if (typeof callback == 'function') { callback.call(this); }
      });
    });
  }

  $(document).on('click', '#paymentTop .other', function () {
      $('#paymentTop .table-responsive').scrollTo(500, {duration:'slow'});
  });

  $(document).on('click', '#fav-cross', function () {
      $(this).parent().find('.favorite-selector').select2("val", "");
      $(this).fadeOut();
  });

  // CHOOSER

  $(document).on('click', '.chooser .icon-down-arrow', function () {
      $(this).parent().toggleClass('open');
  });

  // BuySell popup

  $(document).on('click', '.buysell_popup .closed', function () {
      $(this).parent().find('.opened').toggleClass('opened').toggleClass('closed');
      $(this).toggleClass('opened').toggleClass('closed');
  });

  $(document).on('click', '.buysell_popup .opened .close-line', function () {
      $(this).parent().removeClass('opened').addClass('closed');
  });

  // Sortable

  $('.sortable').sortable({
    forcePlaceholderSize: true,
    placeholder: '<div class="box-placeholder p0 m0"><div></div></div>'
  });

  // Create order

  $(document).on('change', '.plus select', function () {
      var val = $(this).val();
      var text = $(this).val();
      if(val != '') {
        $(this).find("option[value='" + val + "']").remove();
        $(this).select2('val', '');
        $('#' + $(this).attr('id').replace('-filter', '')).append('<li class="list-group-item" value="' + val + '"><em class="icon-dashboard text-muted mr-lg"></em>' + text + '<div class="remove"></div></li>').sortable({forcePlaceholderSize: true, placeholder: '<div class="box-placeholder p0 m0"><div></div></div>'}).parent().fadeIn();
        $('#' + $(this).attr('id').replace('filter', 'inputs'))
          .append('<div class="' + val + '-field clearfix"><div class="col"><span><span data-localize="trades.popup.LABEL2">Cost in </span> <span> '+ text +'</span></span><input class="form-control input-sm" type="text" name="'+ val +'-cost"></div><div class="col2 fee"><div data-localize="trades.popup.LABEL_FEE">With fee </div><div><span class="percent">0.26</span> <span>'+ text +'</span></div></label></div></div>').find("[data-localize]").localize('site', { pathPrefix: 'i18n', language: $.localStorage.get('jq-appLang')});
      }
      if($(this).find('option').length == 1) {
        $(this).prop("disabled", true);
      }
  });

  $(document).on('click', '.sortable li .remove', function (e) {
    var text = $.trim($(this).parent().text());
    $('#' + $(this).parent().parent().attr('id') + '-filter').append('<option value="' + text + '">' + text + '</option').select2({minimumResultsForSearch:'Infinity', width: 'resolve'}).prop("disabled", false);
    $('#' + $(this).parent().parent().attr('id') + '-inputs').find('.' + text + '-field').remove();
    var tmp = '#' + $(this).parent().parent().attr('id');
    $(this).parent().remove();
    if($(tmp).find('li').length == 0) {
      $(tmp).parent().fadeOut();
    }
  });

  // Fees calculator

  var fee = 0.02; // 2 percents fee
  var fee_field = 1 + fee;
  var field_plus_fee = 1 - fee;

  var BTC_USD = 386.385; 
  var BTC_RUB = 28770; 
  var BTC_EUR = 352; 
  var BTC_DKK = 2776.08;
  var BTC_ZAR = 5946.503;
  var BTC_RON = 1574;
  var BTC_JPY = 44034.6625;
  var BTC_CNY = 2499.0917;

  var delay = (function(){
    var timer = 0;
    return function(callback, ms){
      clearTimeout (timer);
      timer = setTimeout(callback, ms);
    };
  })();

  function myFixed(x, d) {
      if (!d) return x.toFixed(d); // don't go wrong if no decimal
      return x.toFixed(d).replace(/\.?0+$/, '');
  }

  $(document).on('change input keyup mouseup', '.inputs input', function (e) {
    this.value = this.value.replace(/[^0-9\.]/g,'');
    if($(this).hasClass('with_fee')) {
      new_value = parseFloat($(this).val() / fee_field );
    } else {
      new_value = parseFloat($(this).val());
    }
    if(new_value == '' || new_value < 0 || new_value == 'NaN') {
      new_value = 0;
    }
    field = $(this).parent().parent();
    container = $(this).parent().parent().parent();
    currency_changed = field.attr('class').split(' ')[0].replace('-field', '');
    inBTC = 0;
    switch (currency_changed) { 
      case 'BTC': 
        var inBTC = new_value; break;
      case 'USD': 
        var inBTC = new_value / BTC_USD; break;
      case 'RUB': 
        var inBTC = new_value / BTC_RUB; break;
      case 'EUR': 
        var inBTC = new_value / BTC_EUR; break;
      case 'DKK': 
        var inBTC = new_value / BTC_DKK; break;
      case 'ZAR': 
        var inBTC = new_value / BTC_ZAR; break;
      case 'RON': 
        var inBTC = new_value / BTC_RON; break;
      case 'JPY': 
        var inBTC = new_value / BTC_JPY; break;
      case 'CNY': 
        var inBTC = new_value / BTC_CNY; break;
      default: 
        var inBTC = 0; break;
    }
    //console.log('new_value:' + new_value + ' | currency: ' +  currency_changed + ' | inBTC: ' + inBTC);
    delay(function(){
      $(container).find('.clearfix').each(function () {
        if(inBTC < 0 || inBTC == '') {
          inBTC = 0;
        }
        currency = $(this).attr('class').split(' ')[0].replace('-field', '');
        round = 2;
        switch (currency) {
          case 'BTC': 
            value = inBTC; round = 8; break;
          case 'USD': 
            value = inBTC * BTC_USD; round = 3; break;
          case 'RUB': 
            value = inBTC * BTC_RUB; round = 2; break;
          case 'EUR': 
            value = inBTC * BTC_EUR; round = 3; break;
          case 'DKK': 
            value = inBTC * BTC_DKK; round = 2; break;
          case 'ZAR': 
            value = inBTC * BTC_ZAR; round = 3; break;
          case 'RON': 
            value = inBTC * BTC_RON; round = 2; break;
          case 'JPY': 
            value = inBTC * BTC_JPY; round = 4; break;
          case 'CNY': 
            value = inBTC * BTC_CNY; round = 4; break;
          default: break;
        }
        if(currency != currency_changed) {
          $(this).find('.col input').val(myFixed(value, round));
          $(this).find('.col2 .percent').text(myFixed(value * fee, 2));
          $(this).find('.col2 input').val(myFixed(value * fee_field, round));  
        } else {
          $(this).find('.col input').val(new_value);
          $(this).find('.col2 .percent').text(myFixed(new_value * fee, 2));
          $(this).find('.col2 input').val(myFixed(new_value * fee_field, round));
        }
        
      });
    }, 500);
  });

  /* Closers for popups */


  $(document).on('click', '[data-action=create_order_buy]', function () {
      $('#create_order_buy').slideDown().animatescroll();
      return false;
  }); 

  $(document).on('click', '[data-action=create_order_sell]', function () {
      $('#create_order_sell').slideDown().animatescroll();
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

  $(document).on('click', '#orders .nav li', function () {
      $(this).parent().parent().find('.favorite-selector, .payment-selector').select2({});
  });

  $('#chk-sound').on('change', function (e) {  
    $(this).parent().find('em').toggleClass('active');
  });

  $(document).on('click', '.notification .label', function () {
    $(this).parent().addClass('open');
  });

  $(document).on('click', '.notification .icon-cross', function () {
    $(this).parent().slideUp().remove();
    count = $('ul.notifications li').length;
    $('#notification_label').text(count);
    if(count == 0) {
      $('ul.default').fadeIn();
      $('ul.notifications').parent().find('.footer .hide_all').hide();
      $('ul.notifications').parent().find('.footer .hide_panel').show();
    }
  });

  $(document).on('click', '.notification .footer .hide_all', function () {
    $(this).parent().parent().find('ul.notifications').remove();
    $(this).parent().parent().find('ul.default').fadeIn();
    $(this).parent().find('.hide_panel').show();
    $(this).fadeOut();
  });

  $(document).on('click', '.notification .footer .hide_panel', function () {
    $(this).parent().parent().parent().removeClass('open');

  });

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
        { sType: 'formatted-num', mData: 'amount' },
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

  jQuery.extend( jQuery.fn.dataTableExt.oSort, {
      "signed-num-pre": function ( a ) {
          return (a=="-" || a==="") ? 0 : a.replace('+','')*1;
      },
   
      "signed-num-asc": function ( a, b ) {
          return ((a < b) ? -1 : ((a > b) ? 1 : 0));
      },
   
      "signed-num-desc": function ( a, b ) {
          return ((a < b) ? 1 : ((a > b) ? -1 : 0));
      }
  } );

  jQuery.extend( jQuery.fn.dataTableExt.oSort, {
      "formatted-num-pre": function ( a ) {
          a = (a === "-" || a === "") ? 0 : a.replace( /[^\d\-\.]/g, "" );
          return parseFloat( a );
      },
   
      "formatted-num-asc": function ( a, b ) {
          return a - b;
      },
   
      "formatted-num-desc": function ( a, b ) {
          return b - a;
      }
  } );

  $('#orders-buy-table, #orders-sell-table').dataTable({
      'paging':   true,  // Table pagination
      'searching': true,
      'lengthChange': false,
      'bInfo': false,
      "sDom":
      "<'row'<'col-xs-6 col-md-6'f><'col-xs-6 col-md-6'<'fav dataTables_filter'>>r><'row'<'col-xs-12'<'currencies'>>>"+"t"+
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
        { sType: 'formatted-num', sClass: 'price', mData: 'price' },
        { mData: 'amount' },
        { sClass: 'payment', bSortable: false, mData: 'payment' },
        { sClass: 'seller', mData: 'seller' },
        { sType: 'signed-num', sClass: 'rating', mData: 'rating' },
        { sClass: 'buy_button', bSortable: false, sDefaultContent: '<a href="#" data-localize="trades.BUY" class="btn btn-orange btn-sm"></a>', mData: null }
      ],
      initComplete: function () {
          this.parent().find('[type=search]').attr('data-localize', 'trades.SEARCH').localize('site', { pathPrefix: 'i18n', language: $.localStorage.get('jq-appLang')});

          this.parent().find('.fav').append('<label class="control-label mb"><i class="icon-favorite"></i><select id="fav-'+ this.attr('id') +'" class="favorite-selector form-control" name="favorite" value=""><option class="default" value="" data-localize="trades.FAVORITE"></option><option value="Константин Константинопольский">Константин Константинопольский</option><option value="Александридис Константинопулос">Александридис Константинопулос</option><option value="Валерий Панфилов">Валерий Панфилов</option><option value="Александр Валерьев">Александр Валерьев</option></select><i id="fav-cross" class="icon-cross" style="display:none"></label>');
          var favid = 'fav-'+ this.attr('id');

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
              var select = $('#' + favid)
                  .on( 'click', function () {
                      $('#select2-' + favid + '-results li:first').text('Отменить');
                  } )
                  .on( 'change', function () {
                      val = $.fn.dataTable.util.escapeRegex(
                          $(this).val()
                      );

                      column
                          .search( val ? '^'+val+'$' : '', true, false )
                          .draw();

                      if(val == '') {
                        $('#' + favid).parent().find('.select2-selection__rendered').css('color','#B8BBCA');
                      } else {
                        $('#fav-cross').fadeIn();
                        $('#' + favid).parent().find('.select2-selection__rendered').css('color','#000');
                      }
                  } )
          });

          $('#paymentTop').matchHeight({
            byRow: true,
            property: 'height',
            target: $('#buysell'),
            remove: false
          })

      },
      fnDrawCallback: function() {
        this.parent().find('.buy_button').find("[data-localize]").localize('site', { pathPrefix: 'i18n', language: $.localStorage.get('jq-appLang')});
      }
  });


  // END

});

})(window, document, window.jQuery);