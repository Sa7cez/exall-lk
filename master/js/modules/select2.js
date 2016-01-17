// Select2
// -----------------------------------

(function(window, document, $, undefined){

  $(function(){

    if ( !$.fn.select2 ) return;

    // Select 2

    $('.delay-selector').select2({
        minimumResultsForSearch: Infinity
    });

  });

})(window, document, window.jQuery);

