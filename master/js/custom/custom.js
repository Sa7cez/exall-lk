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

  $(document).on('click', '#buysell [role=row]', function () {
    console.log('sliding...');
    $('.buysell_popup').css('top',$(this).position().top + 47).slideToggle();
  });

  $(document).on('click', '[data-tool=popup-hide]', function () {
    $('.buysell_popup').slideUp();
  });

	// Something else

  });

})(window, document, window.jQuery);