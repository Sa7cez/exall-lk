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
    	$('.' + i + '_info').show();
    	$('.chooser_popup input[value="' + i + '"]').prop( "checked", true );
    } else {
    	$('.' + i + '_info').hide();
    	$('.chooser_popup input[value="' + i + '"]').prop( "checked", false );
    }
  });

  $(document).on('change', '.chooser_popup input', function () {
      var currencies_info = $.localStorage.get(storage_currencies_info) || currencies_info_default;
      if($(this).is(":checked")) {
      	currencies_info[$(this).val()] = '1';
      	$.localStorage.set(storage_currencies_info, currencies_info);
        $(this).parent().parent().parent().parent().parent().parent().parent().find('.' + $(this).val() + '_info').show();
      } else {
      	currencies_info[$(this).val()] = '0';
      	$.localStorage.set(storage_currencies_info, currencies_info);
      	$(this).parent().parent().parent().parent().parent().parent().parent().find('.' + $(this).val() + '_info').hide();
      }
	});

  $('.plus .variants input[value=ETH], .plus .variants input[value=DLC]').prop( "checked", false );
  $('.currencies .border').addClass('size' + $('.plus .variants input:checked').length);

  $(document).on('change', '.plus .variants input', function () {
    var count = 0;
    if($(this).is(":checked")) {
      $('#' + $(this).val() + '-informer').fadeIn();
    } else {
      $('#' + $(this).val() + '-informer').fadeOut();
    }
    $('.currencies .border').removeClass('size0').removeClass('size1').removeClass('size2').removeClass('size3').removeClass('size4').addClass('size' + $('.plus .variants input:checked').length);
  });

  $(document).on('click', '.currencies .border .icon-cross', function () {
    $(this).parent().fadeOut();
    $('.plus .variants input[value=' + $(this).parent().find('.currency-name').text() + ']').prop( "checked", false );
    $('.currencies .border').removeClass('size0').removeClass('size1').removeClass('size2').removeClass('size3').removeClass('size4').addClass('size' + $('.plus .variants input:checked').length);
  });

  


  $(document).on('click', '[data-toggle=collapse]', function () {
    $(this).toggleClass('collapsed');
    $(this).parent().find('.collapse').toggleClass('in');
  });
  $(document).on('click', '.input-wrapper span', function () {
    if($(this).parent().find('.input-popup').is(':visible')) {
      $(this).parent().find('.input-popup').slideUp();
      $(this).parent().removeClass('opened');
    } else {
      $('.input-popup').removeClass('opened').slideUp();
      $(this).parent().addClass('opened');
      $(this).parent().find('.input-popup').slideDown();
    }
    return false;
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

  $(document).on('click', '.topnavbar .wallet-opener .wallet', function () {
      $(this).parent().toggleClass('open');
  });

  $( window ).resize(function() {
    $('.payment-selector').select2({minimumResultsForSearch:'5', allowClear: true, placeholder: "Способ оплаты"});
    $('.price-selector').select2({minimumResultsForSearch:'5', allowClear: true, placeholder: "Стоимость"});
    $('.country-selector').select2({minimumResultsForSearch:'5', allowClear: true, placeholder: "Страна"});
    $('.favorite-selector').select2({minimumResultsForSearch:'5', allowClear: true, placeholder: "Избранные пользователи"});
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

  $(document).on('click', '.orders .tabs .tab', function () {
    popup = $(this).parent().parent().parent()
    popup.find('.potencial, .normal').toggle();
    popup.find('.orders .tabs .tab.active').removeClass('active');
    $(this).addClass('active');
  });

  $(this).find('.dropdown-tab .button .list, .drop .list').slideUp();

  $(document).on('click', '.active.dropdown-tab .button span, .statuses .drop .arrow', function () {
    $(this).parent().find('.list').slideToggle();
    $(this).parent().toggleClass('active');
  });

  $(document).on('click', '.active.dropdown-tab .list li, .drop .list li', function () {
    $(this).toggleClass('active');
  });

  $(document).on('click', '.statuses .status', function () {
    if(!$(event.target).parents('.drop').length) { 
      $(this).toggleClass('active');
    }
  });

  $(document).on('click', '.active.dropdown-tab .footer span', function () {
    $(this).parent().parent().find('li.active').removeClass('active');
  });

  $(document).on('click', '#buysell tbody [role=row]', function (event) {
    //$('.buysell_popup').clone().appendTo('#buysell .tab-content').css('top',$(this).position().top + 47).slideDown(delay);

    position = $(this).position().top + 47;
    row_id = $(this).attr('id');
    $('#' + $(this).parent().parent().attr('id') + 'Popup').slideUp(delay);

    if($('#' + row_id + '-popup').length != '1') {
      $('#' + $(this).parent().parent().attr('id') + 'Popup.template').clone().removeClass('template').appendTo('#buysell .tab-content').attr('id', row_id + '-popup');
      $('#' + row_id + '-popup').css('top',position).addClass('opened').slideDown(delay).find('.chat').slideUp();
    } else {
      if($('#' + row_id + '-popup').hasClass('opened')) {
        $('#' + row_id + '-popup').css('top',position).removeClass('opened').slideUp(delay);
      } else {
        $('#' + row_id + '-popup').css('top',position).addClass('opened').slideDown(delay);
      }
    }

    $('.wrapper').css('minHeight', '2900px');
  });

  $(document).on('click', '[data-tool=popup-hide]', function () {
    $(this).parent().removeClass('opened').slideUp(delay);
  });

  $('body').on('click', function (e) {
    $('.buysell_popup').each(function () {
        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.buysell_popup').has(e.target).length === 0) {
            $('.buysell_popup').slideUp(delay);
        }
    });
    $('#orders .big-popup').each(function () {
        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('#orders .big-popup').has(e.target).length === 0) {
            $('#orders .big-popup').slideUp(delay);
            $('#orders tr.opened').removeClass('opened');
        }
    });
    $('#create_order').each(function () {
        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('#create_order').has(e.target).length === 0) {
            $('#create_order').slideUp(delay);
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
    $('.variants').each(function () {
        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.variants').has(e.target).length === 0) {
            $('.plus').removeClass('open');
        }
    });
    $('.notification .dropdown-menu').each(function () {
        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.chooser').has(e.target).length === 0) {
            $('.notification').removeClass('open');
        }
    });
    $('.input-wrapper').each(function () {
        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.input-wrapper').has(e.target).length === 0) {
            $('.input-popup').slideUp();
        }
    });
    $('.dropdown-tab').each(function () {
        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.dropdown-tab').has(e.target).length === 0) {
            $('.dropdown-tab').find('.list').slideUp().parent().removeClass('active');
        }
    });
    $('.drop').each(function () {
        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.drop').has(e.target).length === 0) {
            $('.drop').find('.list').slideUp().parent().removeClass('active');
        }
    });
    $('.settings-panel').each(function () {
        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.settings-panel').has(e.target).length === 0) {
            $('.settings-panel').hide();
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

  // CHOOSER

  $(document).on('click', '.chooser .icon-down-arrow', function () {
      $(this).parent().toggleClass('open');
  });

  $(document).on('click', '.currencies .icon-plus', function () {
      $(this).parent().toggleClass('open');
  });

  // BuySell popup

  $(document).on('click', '.buysell_popup .order', function (event) {
      if(!$(event.target).parents('.payment_methods').length && !$(event.target).parents('.chat').length && !$(event.target).parents('.close-line').length && !$(event.target).parents('.select2').length) {
        if($(event.target).parents('.message').length) {
          $(this).parent().find('.opened').removeClass('opened').addClass('closed').removeClass('payment_opened').removeClass('chat_opened');
          $(this).toggleClass('chat_opened').toggleClass('opened').toggleClass('closed');
        } else {
          if(!$(event.target).parents('.chat').length) {
            $(this).parent().find('.opened').removeClass('opened').addClass('closed').removeClass('payment_opened').removeClass('chat_opened');
            $(this).toggleClass('payment_opened').toggleClass('opened').toggleClass('closed');
            $(this).find('select').select2({minimumResultsForSearch:'10'});
          }
        }
      }
  });

  $(document).on('click', '.buysell_popup .opened .close-line', function () {
      $(this).parent().removeClass('opened').addClass('closed').removeClass('payment_opened');
  });

  // Sortable

  $('.sortable').sortable({
    forcePlaceholderSize: true,
    placeholder: '<div class="box-placeholder p0 m0"><div></div></div>'
  });

  // Create order

  $(document).on('change', '.plus select, .select-line select.toInputs', function () {
      var val = $(this).val();
      var title = $(this).find(':selected').attr('title');
      var text = $(this).find('option:selected').text();
      if(val != '') {
        if(!$(this).hasClass('toInputs')) {
          if(val != 'other-type') {
            if(!$(this).hasClass('no-delete-options')) {
              $(this).find("option[value='" + val + "']").remove();
              $(this).select2('val', '');
            } else {
              $(this).select2({
                placeholder: "Способ оплаты",
                allowClear: true,
                //templateResult: formatState,
                minimumResultsForSearch:Infinity
              });
              $(this).parent().find('.select2-selection__clear').trigger('mousedown');
              $(this).select2('close');

            }
            var list = $('#' + $(this).attr('id').replace('-filter', ''));
            if(list.hasClass('with-settings')) {
              list.append('<li class="list-group-item" value="' + val + '"><em class="icon-dashboard text-muted"></em><span class="text" title="'+ title +'">' + text + '</span><div class="settings" data-type="'+ val +'"></div><div class="remove"></div></li>').sortable({forcePlaceholderSize: true, placeholder: '<div class="box-placeholder p0 m0"><div></div></div>'}).parent().fadeIn();
            } else {
              if(list.hasClass('invoices')) {
                list.append('<li class="list-group-item" value="' + val + '"><em class="icon-dashboard text-muted"></em><span class="text" title="'+ title +'">' + text + '</span><div class="info" data-type="'+ val +'"></div><div class="remove"></div></li>').sortable({forcePlaceholderSize: true, placeholder: '<div class="box-placeholder p0 m0"><div></div></div>'}).parent().fadeIn();
              } else {
                list.append('<li class="list-group-item" value="' + val + '"><span class="text" title="'+ title +'">' + text + '</span><div class="remove"></div></li>').parent().fadeIn();
              }
            }
          } else {
            console.log('Создать');
            $(this).parent().parent().parent().after('<input type="text" placeholder="Название банка" class="form-control input-sm"><div class="remove"></div>');
          }
        }
        if((($(this).hasClass('toInputs')) || ($(this).parent().parent().hasClass('toInputs'))) && !($('#settings-inputs').find('.' + val + '-field').length >0)) {
          $('#settings-inputs')
            .append('<div class="' + val + '-field clearfix"><div class="col"><span><span data-localize="trades.popup.LABEL2">Cost in </span> <span> '+ text +'</span></span><input class="form-control input-sm" type="text" name="'+ val +'-cost"></div><div class="col2 fee"><div data-localize="trades.popup.LABEL_FEE">With fee </div><div><span class="percent">0.26</span> <span>'+ text +'</span></div></label></div></div>').find("[data-localize]").localize('site', { pathPrefix: 'i18n', language: $.localStorage.get('jq-appLang')});
        }
      } else {
        //console.log('to default');
      }
      if($(this).find('option').length == 1) {
        $(this).prop("disabled", true);
      }
  });

  $(document).on('change', 'select.add-input', function () {
    var val = $(this).val();
    
    if(val == 'other-type') {
      $(this).parent().parent().parent().after('<div class="line notop nobottom added"><div class="triple.select-line.clearfix"><input type="text" placeholder="Название банка" class="form-control input-sm full-width"><div class="remove"></div></div></div>');
    } else {
      $(this).parent().parent().parent().parent().find('.added').remove();
    }
  });

  $(document).on('click', '.list li .remove', function (e) {
    var liToDel = $(this).parent();
    if(liToDel.parent().hasClass('sortable')) {
      var val = $.trim(liToDel.find('.text:first').text());
    } else {
      var val = $.trim(liToDel.text());
    }
    if(val != '' && !$('#' + $(this).parent().parent().attr('id') + '-filter').hasClass('no-delete-options')) {
      $('#' + $(this).parent().parent().attr('id') + '-filter').append('<option value="' + liToDel.attr('value') + '">' + val + '</option').select2({minimumResultsForSearch:'5', width: 'resolve'}).prop("disabled", false);
      $('#settings-inputs').find('.' + val + '-field').remove();
    }
    if(liToDel.hasClass('fromLastPayments')) {
      $('.buy-options .last').find('#' + liToDel.attr('id').replace('-list', '')).removeClass('selected');
    }
    var tmp = '#' + $(this).parent().parent().attr('id');
    if($(this).parent().find('.settings-panel').length > 0) {
      $(this).parent().find('.settings-panel').appendTo('#create_order');
    }
    $(this).parent().remove();
      if($(tmp).find('li').length == 0) {
        $(tmp).parent().fadeOut();
      }
  });

  $(document).on('click', '#payment-list-buy .settings', function (e) {
    if($(this).parent().find('.settings-panel').length > 0) {
      console.log('Уже есть настройки');
    } else {
      $('.' + $(this).attr('data-type') + '-settings').appendTo($(this).parent());
      $(this).parent().find('.settings-panel select').select2({minimumResultsForSearch:10});
    }
    $(this).parent().parent().parent().find('.settings-panel').hide();
    $(this).parent().find('.settings-panel').toggle();
  });

  $(document).on('click', '#payment-list-sell .info', function (e) {
    if($(this).parent().find('.settings-panel').length > 0) {
      console.log('Уже есть информация');
    } else {
      $('.' + $(this).attr('data-type') + '-info').appendTo($(this).parent());
      $(this).parent().find('.settings-panel select').select2({minimumResultsForSearch:10});
    }
    $(this).parent().parent().parent().find('.settings-panel').hide();
    $(this).parent().find('.settings-panel').toggle();
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

  function formatShield (state) {
    if (!state.title) { return state.text; }
    var $state = $(
      '<span><em class="icon-shield ' + state.element.title.toLowerCase() + '"></em>' + state.text + '</span>'
    );
    return $state;
  };

  $(document).on('click', '[data-action=create_order_buy]', function () {
      $('#create_order').find('.tabs .buy').addClass('active');
      $('#create_order').find('.tabs .sell').removeClass('active');
      $('#create_order').find('.buy-options').show();
      $('#create_order').find('.sell-options').hide();
      $('#create_order').css('left', $(this).position().left - 15);
      $('#create_order').css('top', $(this).position().top + 110);
      $('#create_order').find('.add-payment select').select2({
        placeholder: "Способ оплаты",
        allowClear: true,
        //templateResult: formatState,
        minimumResultsForSearch:Infinity
      });
      $('#create_order').slideDown().animatescroll();
      return false;
  }); 

  $(document).on('click', '[data-action=create_order_sell]', function () {
      $('#create_order').find('.tabs .sell').addClass('active');
      $('#create_order').find('.tabs .buy').removeClass('active');
      $('#create_order').find('.sell-options').show();
      $('#create_order').find('.buy-options').hide();
      return false;
  }); 

  $(document).on('click', '#create_order .tabs .tab', function () {
      $('#create_order').find('.tabs .tab').toggleClass('active');
      $('#create_order').find('.buy-options, .sell-options').toggle();
  }); 

  $(document).on('click', '#create_order .hide_it', function () {
      $('#create_order').slideUp();
  }); 

  $(document).on('click', '.buy-options .last', function () {
      $(this).find('.popup').fadeToggle();
  }); 

  $(document).on('click', '.buy-options .last ul li', function () {
      var text = $(this).html();
      var val = $(this).text();
      var title = $(this).attr('title');
      var id = $(this).attr('id');
      var list = $('#payment-list-buy');
      if($(this).hasClass('selected')) {
        list.find('value=' + text).remove();
      } else {
        list.append('<li class="list-group-item fromLastPayments" id="'+ id +'-list" value="' + val + '"><em class="icon-dashboard text-muted"></em><span class="text" title="'+ title +'">' + text + '</span><div class="remove single"></div></li>').sortable({forcePlaceholderSize: true, placeholder: '<div class="box-placeholder p0 m0"><div></div></div>'}).parent().fadeIn();
      }
      $(this).toggleClass('selected');
  }); 

  $(document).on('click', '.settings-panel .close-settings, .settings-panel .icon-cross', function () {
      $(this).parent().toggle();
  });   

  $(document).on('click', '.main-settings-open', function () {
      $(this).parent().parent().find('.settings-panel').hide();
      $(this).parent().parent().find('.main-settings').toggle().find('select').select2({minimumResultsForSearch:'5'});
      return false;
  }); 

	// Something else

  $(document).on('click', '#orders tbody [role=row]', function (event) {
    if(!$(event.target).parents('.seller').length) {
      position = $(this).position().top + 10 + $(this).height();
      row_id = $(this).attr('id');
      $('#' + $(this).parent().parent().attr('id') + '-popup').slideUp(delay);
      if($('#' + row_id + '-popup').length != '1') {
        $('#' + $(this).parent().parent().attr('id') + '-popup.template').clone().removeClass('template').appendTo('#orders .tab-content').attr('id', row_id + '-popup').find('select').select2({minimumResultsForSearch:'5'});
        $('#' + row_id + '-popup').css('top',position).addClass('opened').slideDown(delay);
        $(this).addClass('opened');
      } else {
        if($('#' + row_id + '-popup').hasClass('opened')) {
          $('#' + row_id + '-popup').css('top',position).removeClass('opened').slideUp(delay);
          $(this).removeClass('opened');
        } else {
          $('#' + row_id + '-popup').css('top',position).addClass('opened').slideDown(delay);
          $(this).addClass('opened');
        }
      }

      $('.wrapper').css('minHeight', '2300px');

    }
  });

  $(document).on('click', '#orders .nav li', function () {
      $('.payment-selector').select2({minimumResultsForSearch:'5', allowClear: true, placeholder: "Способ оплаты"});
      $('.price-selector').select2({minimumResultsForSearch:'5', allowClear: true, placeholder: "Стоимость"});
      $('.country-selector').select2({minimumResultsForSearch:'5', allowClear: true, placeholder: "Страна"});
      $('.favorite-selector').select2({minimumResultsForSearch:'5', allowClear: true, placeholder: "Избранные пользователи"});
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
      $('#notification_label').text('0').addClass('zero');
      $('ul.default').fadeIn();
      $('ul.notifications').parent().find('.footer .hide_all').hide();
      $('ul.notifications').parent().find('.footer .hide_panel').show();
    } else {
      $('#notification_label').text(count).removeClass('zero');
    }
  });

  $(document).on('click', '.notification .footer .hide_all', function () {
    $(this).parent().parent().find('ul.notifications').remove();
    $(this).parent().parent().find('ul.default').fadeIn();
    $(this).parent().find('.hide_panel').show();
    $('#notification_label').text(0).addClass('zero');
    $(this).fadeOut();
  });

  $(document).on('click', '.notification .footer .hide_panel', function () {
    $(this).parent().parent().parent().removeClass('open');

  });

  // 
  // AJAX
  // 

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

  var paymentTop = $('#paymentTop .table-responsive table').dataTable({
      'paging':   false,  // Table pagination
      'searching': false,
      'lengthChange': false,
      'bInfo': false,
      "sDom": 'rt',
      sAjaxSource: '../server/payment_top.json',
      aoColumns: [
        { mData: 'name'},
        { sType: 'formatted-num', mData: 'count' }
      ],
      "order": [[ 1, "desc" ]],
      initComplete: function () {

      },
      fnDrawCallback: function() {
        $("#paymentTop .table-responsive table thead").remove()
        this.parent().find("[data-localize]").localize('site', { pathPrefix: 'i18n', language: $.localStorage.get('jq-appLang')});
      }
  });

  $('#paymentTop select').on('change', function (e) {  
    paymentTop.api().ajax.url( '../server/newTop.json' ).load();
  });

  $('.select2-results').on('click', 'li', function(){
      $(this).find('li').toggle();
  });

  $('body').on('click', '.payment-select .select2-results__option[role=treeitem]', function () {  
    if($(this).attr('aria-selected') == "true") {
      $(this).removeClass('selected');
      $(this).attr('aria-selected', 'false');
    } else {
      $(this).addClass('selected');
      $(this).attr('aria-selected', 'true');
    }

  });

  $('body').on('click', '.select2-results__group', function () {
    $(this).parent().toggleClass('toggled');
  });

  $('#ordersBuy, #ordersSell').dataTable({
      'paging':   true,
      'searching': true,
      'lengthChange': false,
      'bInfo': false,
      "sDom":
      "<'row'<'col-xs-6'l><'col-xs-6'>r>"+"t"+
      "<'row footer'<'create'>p<'show-closed'>>",
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
        { sClass: 'order_name', mData: 'order_name' },
        { sClass: 'date', mData: 'date' },
        { sClass: 'btc', mData: 'btc' },
        { sClass: 'amount', bSortable: false, sType: 'formatted-num', mData: 'amount' },
        { sClass: 'country', bSortable: false, mData: 'country'},
        { sClass: 'status', bSortable: false, mData: 'status' },
        { sClass: 'arrow', bSortable: false, sDefaultContent: '<span class="icon-down-arrow"></span>', mData: null }
      ],
      initComplete: function () {
          this.parent().find('.show-closed').append('<button class="button btn btn-transparent"></button>');
          this.parent().find('.show-closed button').attr('data-localize', 'trades.SHOWCLOSED').localize('site', { pathPrefix: 'i18n', language: $.localStorage.get('jq-appLang')});
          this.parent().find('.create').append('<button class="btn btn-orange"></button>');
          this.parent().find('.create button').attr('data-action', 'create_order_buy').attr('data-localize', 'trades.CREATE_ORDER').localize('site', { pathPrefix: 'i18n', language: $.localStorage.get('jq-appLang')});

          this.api().columns('.country').every( function () {
              var column = this;
              console.log
              var select = $('<select class="country-selector form-control"><option data-localize="trades.COUNTRY" value=""></option></select>')
                  .appendTo( $(column.header()).empty() )
                  .on( 'change', function () {
                      var val = $.fn.dataTable.util.escapeRegex($(this).val());

                      column
                          .search( val ? '^'+val+'$' : '', true, false )
                          .draw();
                  } );

              column.data().unique().sort().each( function ( d, j ) {
                  select.append( '<option value="'+d+'">'+d+'</option>' );
              } );

              select.wrap("<div class='select-wrapper'></div>").find("[data-localize]").localize('site', { pathPrefix: 'i18n', language: $.localStorage.get('jq-appLang')});
          } );

          $('.country-selector').select2({minimumResultsForSearch:'8', allowClear: true, placeholder: "Страна"});

          this.api().columns('.status').every( function () {
              var column = this;
              var select = $('<select class="status-selector form-control"><option data-localize="trades.STATUS" value=""></option></select>')
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

              select.wrap("<div class='select-wrapper'></div>").find("[data-localize]").localize('site', { pathPrefix: 'i18n', language: $.localStorage.get('jq-appLang')});
          } );

          $('.status-selector').select2({minimumResultsForSearch:'8', allowClear: true, placeholder: "Статус"});
      },
      /*fnDrawCallback: function() {
        this.parent().find("[data-localize]").localize('site', { pathPrefix: 'i18n', language: $.localStorage.get('jq-appLang')});
        $('#paymentTop').matchHeight._update();
      }*/
  });

  $.fn.dataTable.ext.search.push(
    function( settings, data, dataIndex ) {
        var min = parseFloat( $('.price .input-popup input').val(), 10 );
        var btc_min = parseFloat( $('.amount .input-popup input').val(), 10 );
        var price = parseFloat( data[0] ) || 0;
        var btc = parseFloat( data[1] ) || 0;

        if ( isNaN( min ) || min <= price ) {
          if ( isNaN( btc_min ) || btc_min <= btc )  {
            return true;
          }
        }

        return false;
    }
  );

  $('#orders-buy-table, #orders-sell-table').dataTable({
      'paging':   true,  // Table pagination
      'searching': true,
      'lengthChange': false,
      'bInfo': false,
      "sDom":
      "<'row'<'col-xs-12 col-md-6'f><'col-xs-12 col-md-6'<'fav dataTables_filter'>>r>"+"t"+
      "<'row'p>",
      lengthMenu: [
          [ 40 ],
          [ '40 rows']
      ],
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
        { sType: 'formatted-num', bSortable: false, sClass: 'price', mData: 'price' },
        { mData: 'amount', bSortable: true, sClass: 'amount' },
        { sClass: 'payment', bSortable: false, mData: 'payment' },
        { sClass: 'seller', mData: 'seller' },
        { sType: 'signed-num', sClass: 'rating', mData: 'rating' },
        { sClass: 'country', mData: 'country', bSortable: false},
        { sClass: 'arrow', bSortable: false, sDefaultContent: '<span class="toggle"><i class="icon-down-arrow"></i></span>'}
      ],
      initComplete: function () {
          var table = this;

          this.parent().find('[type=search]').attr('data-localize', 'trades.SEARCH').localize('site', { pathPrefix: 'i18n', language: $.localStorage.get('jq-appLang')});
          this.parent().find('[type=search]').parent().parent().append('<span class="tip">(email, id, имя<br>или номер телефона)</span>');

          this.parent().find('.fav').append('<label class="control-label mb"><i class="icon-favorite"></i><select id="fav-'+ this.attr('id') +'" class="favorite-selector form-control" name="favorite" value=""><option class="default" value="" data-localize="trades.FAVORITE"></option><option value="Константин Константинопольский">Константин Константинопольский</option><option value="Александридис Константинопулос">Александридис Константинопулос</option><option value="Валерий Панфилов">Валерий Панфилов</option><option value="Александр Валерьев">Александр Валерьев</option></select></label>');
          var favid = 'fav-'+ this.attr('id');

          this.parent().find('.fav, .buy_button').find("[data-localize]").localize('site', { pathPrefix: 'i18n', language: $.localStorage.get('jq-appLang')});

          this.api().columns('.price').every( function () {
              var column = this;
              var select = $('<select class="value-selector form-control"><option data-localize="trades.popup.CUR" value=""></option><option value="" data-localize="trades.popup.COST">Стоимость</option><option value="RUB">RUB</option><option value="USD">USD</option><option value="EUR">EUR</option><option value="DKK">DKK</option><option value="ZAR">ZAR</option><option value="RON">RON</option><option value="JPY">JPY</option><option value="CNY">CNY</option></select>')
                  .appendTo( $(column.header()).empty() )
                  .on( 'change', function () {
                      var val = $.fn.dataTable.util.escapeRegex(
                          $(this).val()
                      );

                      column
                          .search( val ? val : '', true, false )
                          .draw();
                  } );

              select.wrap("<div class='select-wrapper'></div>").find("[data-localize]").localize('site', { pathPrefix: 'i18n', language: $.localStorage.get('jq-appLang')});
          } );

          $('.value-selector').select2({minimumResultsForSearch:'12', allowClear: true, placeholder: "Стоимость"});

          this.api().columns('.amount').every( function () {
              var column = this;
              var input = $('<div class="input-wrapper"><span data-localize="trades.AMOUNTBTC"></span><div class="input-popup"><span data-localize="trades.AMOUNT_INPUT"></span><br><span data-localize="trades.FROM"></span> <input type="text" onkeypress="return event.charCode >= 46 && event.charCode <= 57" class="form-control" value="0"></div></div>')
                  .appendTo( $(column.header()).empty() )
                  .on( 'keyup', function () { column.draw(); } );

              input.find("[data-localize]").localize('site', { pathPrefix: 'i18n', language: $.localStorage.get('jq-appLang')});
          } );

          this.api().columns('.payment').every( function () {
              var column = this;
              var select = $('<select class="payment-selector form-control" multiple="multiple"><optgroup label="Электронные деньги"><option value="webmoney" title="Trust 75">WebMoney</option><option value="paypal" title="Trust 100">PayPal</option><option value="yandex-money" title="Trust 100">Yandex.Money</option></optgroup><optgroup label="Банковский перевод"></optgroup></select>')
                  .appendTo( $(column.header()).empty() )
                  .on("select2:open", function (e) { 
                    $('.select2-container--open').addClass('payment-select');
                  })
                  .on( 'change', function () {
                      var val = $.fn.dataTable.util.escapeRegex(
                          $(this).val()
                      );

                      column
                          .search( val ? '^'+val+'$' : '', true, false )
                          .draw();
                  } );

              column.data().unique().sort().each( function ( d, j ) {
                  var start = d.indexOf('title=\'') + 'title=\''.length;
                  var end = d.indexOf('\'', start + 1);
                  var title = d.substring(start, end);
                  select.find('optgroup:last').append( '<option value="'+ d +'" title="'+ title +'">'+ d +'</option>' );
              } );

              select.wrap("<div class='select-wrapper'></div>").find("[data-localize]").localize('site', { pathPrefix: 'i18n', language: $.localStorage.get('jq-appLang')});
          } );

          $('.payment-selector').select2({minimumResultsForSearch:'5', placeholder: "Способ оплаты"});

          this.api().columns('.country').every( function () {
              var column = this;
              var select = $('<select class="country-selector form-control"><option data-localize="trades.PAYMENTSYSTEM" value=""></option></select>')
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

              select.wrap("<div class='select-wrapper'></div>").find("[data-localize]").localize('site', { pathPrefix: 'i18n', language: $.localStorage.get('jq-appLang')});
          } );

          $('.country-selector').select2({minimumResultsForSearch:'5', allowClear: true, placeholder: "Страна"});

          this.api().column('.seller').every( function () {
              var val = '';
              var column = this;
              var select = $('#' + favid)
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
                        $('#' + favid).parent().find('.select2-selection__rendered').css('color','#000');
                      }
                  } )
          });

          this.find('td.seller a').after('<em class="icon-magnifier"></em>');
          this.find('td.seller .icon-magnifier').on('click', function () {
            var name = $(this).parent().find('a').text();
            table.parent().find('label [type=search]').val(name).trigger('input');
            return false;
          });

          $('.favorite-selector').select2({minimumResultsForSearch:'5', allowClear: true, placeholder: "Избранные пользователи"});

          $('#paymentTop').matchHeight({
            byRow: true,
            property: 'height',
            target: $('#buysell'),
            remove: false
          });

      },
      fnDrawCallback: function() {
        this.parent().find('.buy_button').find("[data-localize]").localize('site', { pathPrefix: 'i18n', language: $.localStorage.get('jq-appLang')});
        $(this).find('[data-toggle="tooltip"]').tooltip({
          container: 'body'
        });
      },
      createdRow: function ( row, data, index ) {
        $(row).attr('id', $(this).attr('id') + '-' + 'row-' + index);
      }
  });

  // END

});

})(window, document, window.jQuery);