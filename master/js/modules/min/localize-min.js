!function(a,e,$,t){var n="ru",l="i18n",o="site",c="jq-appLang";$(function(){function a(a){$("[data-localize]").localize(o,a)}function e(a){var e=a.parents(".dropdown-menu");if(e.length){var t=e.prev(".lenguage_changer, button, a");t.find(".lang").text(a.attr("data-set-lang"))}}if($.fn.localize){var t=$.localStorage.get(c)||n,i={language:t,pathPrefix:l,callback:function(a,e){$.localStorage.set(c,t),e(a)}};a(i),$("[data-set-lang]").on("click",function(){t=$(this).data("setLang"),t&&(i.language=t,a(i),$(".delay-selector").select2({minimumResultsForSearch:1/0}),$(".favorite-selector").select2({}),$(".payment-selector").select2({}))})}})}(window,document,window.jQuery);