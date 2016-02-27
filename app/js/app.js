/*!
 * 
 * Angle - Bootstrap Admin App + jQuery
 * 
 * Version: 3.2.0
 * Author: @themicon_co
 * Website: http://themicon.co
 * License: https://wrapbootstrap.com/help/licenses
 * 
 */


(function(window, document, $, undefined){

  if (typeof $ === 'undefined') { throw new Error('This application\'s JavaScript requires jQuery'); }

  $(function(){

    // Restore body classes
    // ----------------------------------- 
    var $body = $('body');
    new StateToggler().restoreState( $body );
    
    // enable settings toggle after restore
    $('#chk-fixed').prop('checked', $body.hasClass('layout-fixed') );
    $('#chk-collapsed').prop('checked', $body.hasClass('aside-collapsed') );
    $('#chk-boxed').prop('checked', $body.hasClass('layout-boxed') );
    $('#chk-float').prop('checked', $body.hasClass('aside-float') );
    $('#chk-hover').prop('checked', $body.hasClass('aside-hover') );

    // When ready display the offsidebar
    $('.offsidebar.hide').removeClass('hide');  

  }); // doc ready


})(window, document, window.jQuery);

// Start Bootstrap JS
// ----------------------------------- 

(function(window, document, $, undefined){

  $(function(){

    // POPOVER
    // ----------------------------------- 

    $('[data-toggle="popover"]').popover();

    // TOOLTIP
    // ----------------------------------- 

    $('[data-toggle="tooltip"]').tooltip({
      container: 'body'
    });

    // DROPDOWN INPUTS
    // ----------------------------------- 
    $('.dropdown input').on('click focus', function(event){
      event.stopPropagation();
    });

  });

})(window, document, window.jQuery);

/**=========================================================
 * Module: clear-storage.js
 * Removes a key from the browser storage via element click
 =========================================================*/

(function($, window, document){
  'use strict';

  var Selector = '[data-reset-key]';

  $(document).on('click', Selector, function (e) {
      e.preventDefault();
      var key = $(this).data('resetKey');
      
      if(key) {
        $.localStorage.remove(key);
        // reload the page
        window.location.reload();
      }
      else {
        $.error('No storage key specified for reset.');
      }
  });

}(jQuery, window, document));

// GLOBAL CONSTANTS
// ----------------------------------- 


(function(window, document, $, undefined){

  window.APP_COLORS = {
    'primary':                '#5d9cec',
    'success':                '#27c24c',
    'info':                   '#23b7e5',
    'warning':                '#ff902b',
    'danger':                 '#f05050',
    'inverse':                '#131e26',
    'green':                  '#37bc9b',
    'pink':                   '#f532e5',
    'purple':                 '#7266ba',
    'dark':                   '#3a3f51',
    'yellow':                 '#fad732',
    'gray-darker':            '#232735',
    'gray-dark':              '#3a3f51',
    'gray':                   '#dde6e9',
    'gray-light':             '#e4eaec',
    'gray-lighter':           '#edf1f2'
  };
  
  window.APP_MEDIAQUERY = {
    'desktopLG':             1200,
    'desktop':                992,
    'tablet':                 768,
    'mobile':                 480
  };

})(window, document, window.jQuery);


// LOAD CUSTOM CSS
// ----------------------------------- 

(function(window, document, $, undefined){

  $(function(){

    $('#chk-fixed').on('change', function (e) {
      
      if($('#chk-fixed').prop('checked')) {

        var element = $(this);

        if(element.is('a'))
          e.preventDefault();
        
        var uri = element.data('loadCss'),
            link;

        if(uri) {
          link = createLink(uri);
          if ( !link ) {
            $.error('Error creating stylesheet link element.');
          }
        }
        else {
          $.error('No stylesheet location defined.');
        }

      } else {

        $('#autoloaded-stylesheet').remove();
        
      }

    });
  });

  function createLink(uri) {
    var linkId = 'autoloaded-stylesheet',
        oldLink = $('#'+linkId).attr('id', linkId + '-old');

    $('head').append($('<link/>').attr({
      'id':   linkId,
      'rel':  'stylesheet',
      'href': uri
    }));

    if( oldLink.length ) {
      oldLink.remove();
    }

    return $('#'+linkId);
  }


})(window, document, window.jQuery);

// TRANSLATION
// ----------------------------------- 

(function(window, document, $, undefined){

  var preferredLang = 'ru';
  var pathPrefix    = 'i18n'; // folder of json files
  var packName      = 'site';
  var storageKey    = 'jq-appLang';

  $(function(){

    if ( ! $.fn.localize ) return;

    // detect saved language or use default
    var currLang = $.localStorage.get(storageKey) || preferredLang;
    // set initial options
    var opts = {
        language: currLang,
        pathPrefix: pathPrefix,
        callback: function(data, defaultCallback){
          $.localStorage.set(storageKey, currLang); // save the language
          defaultCallback(data);
        }
      };

    // Set initial language
    setLanguage(opts);

    // Listen for changes
    $('[data-set-lang]').on('click', function(){

      currLang = $(this).data('setLang');

      if ( currLang ) {
        
        opts.language = currLang;

        setLanguage(opts);

        //activateDropdown($(this));

        $('.delay-selector').select2({
          minimumResultsForSearch: Infinity
        });
        $('.favorite-selector').select2({});
        $('.payment-selector').select2({});
      }

    });
    

    function setLanguage(options) {
      $("[data-localize]").localize(packName, options);
    }

    // Set the current clicked text as the active dropdown text
    function activateDropdown(elem) {
      var menu = elem.parents('.dropdown-menu');
      if ( menu.length ) {
        var toggle = menu.prev('.lenguage_changer, button, a');
        toggle.find('.lang').text ( elem.attr('data-set-lang') );
      }
    }

  });

})(window, document, window.jQuery);

// NAVBAR SEARCH
// ----------------------------------- 


(function(window, document, $, undefined){

  $(function(){
    
    var navSearch = new navbarSearchInput();
    
    // Open search input 
    var $searchOpen = $('[data-search-open]');

    $searchOpen
      .on('click', function (e) { e.stopPropagation(); })
      .on('click', navSearch.toggle);

    // Close search input
    var $searchDismiss = $('[data-search-dismiss]');
    var inputSelector = '.navbar-form input[type="text"]';

    $(inputSelector)
      .on('click', function (e) { e.stopPropagation(); })
      .on('keyup', function(e) {
        if (e.keyCode == 27) // ESC
          navSearch.dismiss();
      });
      
    // click anywhere closes the search
    $(document).on('click', navSearch.dismiss);
    // dismissable options
    $searchDismiss
      .on('click', function (e) { e.stopPropagation(); })
      .on('click', navSearch.dismiss);

  });

  var navbarSearchInput = function() {
    var navbarFormSelector = 'form.navbar-form';
    return {
      toggle: function() {
        
        var navbarForm = $(navbarFormSelector);

        navbarForm.toggleClass('open');
        
        var isOpen = navbarForm.hasClass('open');
        
        navbarForm.find('input')[isOpen ? 'focus' : 'blur']();

      },

      dismiss: function() {
        $(navbarFormSelector)
          .removeClass('open')      // Close control
          .find('input[type="text"]').blur() // remove focus
          .val('')                    // Empty input
          ;
      }
    };

  }

})(window, document, window.jQuery);
/**=========================================================
 * Module: notify.js
 * Create toggleable notifications that fade out automatically.
 * Based on Notify addon from UIKit (http://getuikit.com/docs/addons_notify.html)
 * [data-toggle="notify"]
 * [data-options="options in json format" ]
 =========================================================*/

(function($, window, document){
  'use strict';

  var Selector = '[data-notify]',
      autoloadSelector = '[data-onload]',
      doc = $(document);


  $(function() {

    $(Selector).each(function(){

      var $this  = $(this),
          onload = $this.data('onload');

      if(onload !== undefined) {
        setTimeout(function(){
          notifyNow($this);
        }, 800);
      }

      $this.on('click', function (e) {
        e.preventDefault();
        notifyNow($this);
      });

    });

  });

  function notifyNow($element) {
      var message = $element.data('message'),
          options = $element.data('options');

      if(!message)
        $.error('Notify: No message specified');
     
      $.notify(message, options || {});
  }


}(jQuery, window, document));


/**
 * Notify Addon definition as jQuery plugin
 * Adapted version to work with Bootstrap classes
 * More information http://getuikit.com/docs/addons_notify.html
 */

(function($, window, document){

    var containers = {},
        messages   = {},

        notify     =  function(options){

            if ($.type(options) == 'string') {
                options = { message: options };
            }

            if (arguments[1]) {
                options = $.extend(options, $.type(arguments[1]) == 'string' ? {status:arguments[1]} : arguments[1]);
            }

            return (new Message(options)).show();
        },
        closeAll  = function(group, instantly){
            if(group) {
                for(var id in messages) { if(group===messages[id].group) messages[id].close(instantly); }
            } else {
                for(var id in messages) { messages[id].close(instantly); }
            }
        };

    var Message = function(options){

        var $this = this;

        this.options = $.extend({}, Message.defaults, options);

        this.uuid    = "ID"+(new Date().getTime())+"RAND"+(Math.ceil(Math.random() * 100000));
        this.element = $([
            // alert-dismissable enables bs close icon
            '<div class="uk-notify-message alert-dismissable">',
                '<a class="close icon-cross"></a>',
                '<div>'+this.options.message+'</div>',
            '</div>'

        ].join('')).data("notifyMessage", this);

        // status
        if (this.options.status) {
            this.element.addClass('alert alert-'+this.options.status);
            this.currentstatus = this.options.status;
        }

        this.group = this.options.group;

        messages[this.uuid] = this;

        if(!containers[this.options.pos]) {
            containers[this.options.pos] = $('<div class="uk-notify uk-notify-'+this.options.pos+'"></div>').appendTo('body').on("click", ".uk-notify-message", function(){
                $(this).data("notifyMessage").close();
            });
        }
    };


    $.extend(Message.prototype, {

        uuid: false,
        element: false,
        timout: false,
        currentstatus: "",
        group: false,

        show: function() {

            if (this.element.is(":visible")) return;

            var $this = this;

            containers[this.options.pos].show().prepend(this.element);

            var marginbottom = parseInt(this.element.css("margin-bottom"), 10);

            this.element.css({"opacity":0, "margin-top": -1*this.element.outerHeight(), "margin-bottom":0}).animate({"opacity":1, "margin-top": 0, "margin-bottom":marginbottom}, function(){

                if ($this.options.timeout) {

                    var closefn = function(){ $this.close(); };

                    $this.timeout = setTimeout(closefn, $this.options.timeout);

                    $this.element.hover(
                        function() { clearTimeout($this.timeout); },
                        function() { $this.timeout = setTimeout(closefn, $this.options.timeout);  }
                    );
                }

            });

            return this;
        },

        close: function(instantly) {

            var $this    = this,
                finalize = function(){
                    $this.element.remove();

                    if(!containers[$this.options.pos].children().length) {
                        containers[$this.options.pos].hide();
                    }

                    delete messages[$this.uuid];
                };

            if(this.timeout) clearTimeout(this.timeout);

            if(instantly) {
                finalize();
            } else {
                this.element.animate({"opacity":0, "margin-top": -1* this.element.outerHeight(), "margin-bottom":0}, function(){
                    finalize();
                });
            }
        },

        content: function(html){

            var container = this.element.find(">div");

            if(!html) {
                return container.html();
            }

            container.html(html);

            return this;
        },

        status: function(status) {

            if(!status) {
                return this.currentstatus;
            }

            this.element.removeClass('alert alert-'+this.currentstatus).addClass('alert alert-'+status);

            this.currentstatus = status;

            return this;
        }
    });

    Message.defaults = {
        message: "",
        status: "normal",
        timeout: 5000,
        group: null,
        pos: 'bottom-right'
    };


    $["notify"]          = notify;
    $["notify"].message  = Message;
    $["notify"].closeAll = closeAll;

    return notify;

}(jQuery, window, document));

/**=========================================================
 * Module: panel-tools.js
 * Dismiss panels
 * [data-tool="panel-dismiss"]
 *
 * Requires animo.js
 =========================================================*/
(function($, window, document){
  'use strict';
  
  var panelSelector = '[data-tool="panel-dismiss"]',
      removeEvent   = 'panel.remove',
      removedEvent  = 'panel.removed';

  $(document).on('click', panelSelector, function () {
    
    // find the first parent panel
    var parent = $(this).closest('.panel');
    var deferred = new $.Deferred();

    // Trigger the event and finally remove the element
    parent.trigger(removeEvent, [parent, deferred]);
    // needs resolve() to be called
    deferred.done(removeElement);

    function removeElement() {
      if($.support.animation) {
        parent.animo({animation: 'bounceOut'}, destroyPanel);
      }
      else destroyPanel();
    }

    function destroyPanel() {
      var col = parent.parent();
      
      $.when(parent.trigger(removedEvent, [parent]))
       .done(function(){
          parent.remove();
          // remove the parent if it is a row and is empty and not a sortable (portlet)
          col
            .trigger(removedEvent) // An event to catch when the panel has been removed from DOM
            .filter(function() {
            var el = $(this);
            return (el.is('[class*="col-"]:not(.sortable)') && el.children('*').length === 0);
          }).remove();
       });

      

    }

  });

}(jQuery, window, document));


/**
 * Collapse panels
 * [data-tool="panel-collapse"]
 *
 * Also uses browser storage to keep track
 * of panels collapsed state
 */
(function($, window, document) {
  'use strict';
  var panelSelector = '[data-tool="panel-collapse"]',
      storageKeyName = 'jq-panelState';

  // Prepare the panel to be collapsable and its events
  $(panelSelector).each(function() {
    // find the first parent panel
    var $this        = $(this),
        parent       = $this.closest('.panel'),
        wrapper      = parent.find('.panel-wrapper'),
        collapseOpts = {toggle: false},
        iconElement  = $this.children('em'),
        panelId      = parent.attr('id');
    
    // if wrapper not added, add it
    // we need a wrapper to avoid jumping due to the paddings
    if( ! wrapper.length) {
      wrapper =
        parent.children('.panel-heading').nextAll() //find('.panel-body, .panel-footer')
          .wrapAll('<div/>')
          .parent()
          .addClass('panel-wrapper');
      collapseOpts = {};
    }

    // Init collapse and bind events to switch icons
    wrapper
      .collapse(collapseOpts)
      .on('hide.bs.collapse', function() {
        setIconHide( iconElement );
        savePanelState( panelId, 'hide' );
        wrapper.prev('.panel-heading').addClass('panel-heading-collapsed');
      })
      .on('show.bs.collapse', function() {
        setIconShow( iconElement );
        savePanelState( panelId, 'show' );
        wrapper.prev('.panel-heading').removeClass('panel-heading-collapsed');
      });

    // Load the saved state if exists
    var currentState = loadPanelState( panelId );
    if(currentState) {
      setTimeout(function() { wrapper.collapse( currentState ); }, 0);
      savePanelState( panelId, currentState );
    }

  });

  // finally catch clicks to toggle panel collapse
  $(document).on('click', panelSelector, function () {
    
    var parent = $(this).closest('.panel');
    var wrapper = parent.find('.panel-wrapper');

    wrapper.collapse('toggle');

  });

  /////////////////////////////////////////////
  // Common use functions for panel collapse //
  /////////////////////////////////////////////
  function setIconShow(iconEl) {
    iconEl.removeClass('fa-plus').addClass('fa-minus');
  }

  function setIconHide(iconEl) {
    iconEl.removeClass('fa-minus').addClass('fa-plus');
  }

  function savePanelState(id, state) {
    var data = $.localStorage.get(storageKeyName);
    if(!data) { data = {}; }
    data[id] = state;
    $.localStorage.set(storageKeyName, data);
  }

  function loadPanelState(id) {
    var data = $.localStorage.get(storageKeyName);
    if(data) {
      return data[id] || false;
    }
  }


}(jQuery, window, document));


/**
 * Refresh panels
 * [data-tool="panel-refresh"]
 * [data-spinner="standard"]
 */
(function($, window, document){
  'use strict';
  var panelSelector  = '[data-tool="panel-refresh"]',
      refreshEvent   = 'panel.refresh',
      whirlClass     = 'whirl',
      defaultSpinner = 'standard';

  // method to clear the spinner when done
  function removeSpinner(){
    this.removeClass(whirlClass);
  }

  // catch clicks to toggle panel refresh
  $(document).on('click', panelSelector, function () {
      var $this   = $(this),
          panel   = $this.parents('.panel').eq(0),
          spinner = $this.data('spinner') || defaultSpinner
          ;

      // start showing the spinner
      panel.addClass(whirlClass + ' ' + spinner);

      // attach as public method
      panel.removeSpinner = removeSpinner;

      // Trigger the event and send the panel object
      $this.trigger(refreshEvent, [panel]);

  });


}(jQuery, window, document));

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


// SIDEBAR
// ----------------------------------- 


(function(window, document, $, undefined){

  var $win;
  var $html;
  var $body;
  var $sidebar;
  var mq;

  $(function(){

    $win     = $(window);
    $html    = $('html');
    $body    = $('body');
    $sidebar = $('.sidebar');
    mq       = APP_MEDIAQUERY;
    
    // AUTOCOLLAPSE ITEMS 
    // ----------------------------------- 

    var sidebarCollapse = $sidebar.find('.collapse');
    sidebarCollapse.on('click', function(event){
      event.stopPropagation();
      if ( $(this).parents('.collapse').length === 0 )
        sidebarCollapse.filter('.in').collapse('hide');

    });
    
    // SIDEBAR ACTIVE STATE 
    // ----------------------------------- 
    
    // Find current active item
    var currentItem = $('.sidebar .active').parents('li');

    // hover mode don't try to expand active collapse
    if ( ! useAsideHover() )
      currentItem
        .addClass('active')     // activate the parent
        .children('.collapse')  // find the collapse
        .collapse('show');      // and show it

    // remove this if you use only collapsible sidebar items
    $sidebar.find('li > a + ul').on('show.bs.collapse', function (e) {
      if( useAsideHover() ) e.preventDefault();
    });

    // SIDEBAR COLLAPSED ITEM HANDLER
    // ----------------------------------- 


    var eventName = isTouch() ? 'click' : 'mouseenter' ;
    var subNav = $();
    $sidebar.on( eventName, '.nav > li', function() {
      if( isSidebarCollapsed() || useAsideHover() ) {

        subNav.trigger('mouseleave');
        subNav = toggleMenuItem( $(this) );

        // Used to detect click and touch events outside the sidebar          
        sidebarAddBackdrop();
      }

    });

    var sidebarAnyclickClose = $sidebar.data('sidebarAnyclickClose');

    // Allows to close
    if ( typeof sidebarAnyclickClose !== 'undefined' ) {

      $('.wrapper').on('click.sidebar', function(e){

        // don't check if sidebar not visible
        if( ! $body.hasClass('aside-toggled')) return;

        var $target = $(e.target);
        if( ! $target.parents('.aside').length && // if not child of sidebar
            ! $target.is('#user-block-toggle') && // user block toggle anchor
            ! $target.parent().is('#user-block-toggle') // user block toggle icon
          ) {
                $body.removeClass('aside-toggled');          
        }

      });
    }

  });

  function sidebarAddBackdrop() {
    var $backdrop = $('<div/>', { 'class': 'dropdown-backdrop'} );
    $backdrop.insertAfter('.aside').on("click mouseenter", function () {
      removeFloatingNav();
    });
  }

  // Open the collapse sidebar submenu items when on touch devices 
  // - desktop only opens on hover
  function toggleTouchItem($element){
    $element
      .siblings('li')
      .removeClass('open')
      .end()
      .toggleClass('open');
  }

  // Handles hover to open items under collapsed menu
  // ----------------------------------- 
  function toggleMenuItem($listItem) {

    removeFloatingNav();

    var ul = $listItem.children('ul');
    
    if( !ul.length ) return $();
    if( $listItem.hasClass('open') ) {
      toggleTouchItem($listItem);
      return $();
    }

    var $aside = $('.aside');
    var $asideInner = $('.aside-inner'); // for top offset calculation
    // float aside uses extra padding on aside
    var mar = parseInt( $asideInner.css('padding-top'), 0) + parseInt( $aside.css('padding-top'), 0);

    var subNav = ul.clone().appendTo( $aside );
    
    toggleTouchItem($listItem);

    var itemTop = ($listItem.position().top + mar) - $sidebar.scrollTop();
    var vwHeight = $win.height();

    subNav
      .addClass('nav-floating')
      .css({
        position: isFixed() ? 'fixed' : 'absolute',
        top:      itemTop,
        bottom:   (subNav.outerHeight(true) + itemTop > vwHeight) ? 0 : 'auto'
      });

    subNav.on('mouseleave', function() {
      toggleTouchItem($listItem);
      subNav.remove();
    });

    return subNav;
  }

  function removeFloatingNav() {
    $('.sidebar-subnav.nav-floating').remove();
    $('.dropdown-backdrop').remove();
    $('.sidebar li.open').removeClass('open');
  }

  function isTouch() {
    return $html.hasClass('touch');
  }
  function isSidebarCollapsed() {
    return $body.hasClass('aside-collapsed');
  }
  function isSidebarToggled() {
    return $body.hasClass('aside-toggled');
  }
  function isMobile() {
    return $win.width() < mq.tablet;
  }
  function isFixed(){
    return $body.hasClass('layout-fixed');
  }
  function useAsideHover() {
    return $body.hasClass('aside-hover');
  }

})(window, document, window.jQuery);
// TOGGLE STATE
// -----------------------------------

(function(window, document, $, undefined){

  $(function(){

    var $body = $('body');
        toggle = new StateToggler();

    $('[data-toggle-state]')
      .on('click', function (e) {
        // e.preventDefault();
        e.stopPropagation();
        var element = $(this),
            classname = element.data('toggleState'),
            target = element.data('target'),
            noPersist = (element.attr('data-no-persist') !== undefined);

        // Specify a target selector to toggle classname
        // use body by default
        var $target = target ? $(target) : $body;

        if(classname) {
          if( $target.hasClass(classname) ) {
            $target.removeClass(classname);
            if( ! noPersist)
              toggle.removeState(classname);
          }
          else {
            $target.addClass(classname);
            if( ! noPersist)
              toggle.addState(classname);
          }

        }

        $('.open').removeClass('open');
        $('.tooltip').remove();

        // some elements may need this when toggled class change the content size
        // e.g. sidebar collapsed mode and jqGrid
        $(window).resize();

    });

  });

  // Handle states to/from localstorage
  window.StateToggler = function() {

    var storageKeyName  = 'jq-toggleState';

    // Helper object to check for words in a phrase //
    var WordChecker = {
      hasWord: function (phrase, word) {
        return new RegExp('(^|\\s)' + word + '(\\s|$)').test(phrase);
      },
      addWord: function (phrase, word) {
        if (!this.hasWord(phrase, word)) {
          return (phrase + (phrase ? ' ' : '') + word);
        }
      },
      removeWord: function (phrase, word) {
        if (this.hasWord(phrase, word)) {
          return phrase.replace(new RegExp('(^|\\s)*' + word + '(\\s|$)*', 'g'), '');
        }
      }
    };

    // Return service public methods
    return {
      // Add a state to the browser storage to be restored later
      addState: function(classname){
        var data = $.localStorage.get(storageKeyName);

        if(!data)  {
          data = classname;
        }
        else {
          data = WordChecker.addWord(data, classname);
        }

        $.localStorage.set(storageKeyName, data);
      },

      // Remove a state from the browser storage
      removeState: function(classname){
        var data = $.localStorage.get(storageKeyName);
        // nothing to remove
        if(!data) return;

        data = WordChecker.removeWord(data, classname);

        $.localStorage.set(storageKeyName, data);
      },

      // Load the state string and restore the classlist
      restoreState: function($elem) {
        var data = $.localStorage.get(storageKeyName);

        // nothing to restore
        if(!data) return;
        $elem.addClass(data);
      }

    };
  };

})(window, document, window.jQuery);

/**=========================================================
 * Module: utils.js
 * jQuery Utility functions library 
 * adapted from the core of UIKit
 =========================================================*/

(function($, window, doc){
    'use strict';
    
    var $html = $("html"), $win = $(window);

    $.support.transition = (function() {

        var transitionEnd = (function() {

            var element = doc.body || doc.documentElement,
                transEndEventNames = {
                    WebkitTransition: 'webkitTransitionEnd',
                    MozTransition: 'transitionend',
                    OTransition: 'oTransitionEnd otransitionend',
                    transition: 'transitionend'
                }, name;

            for (name in transEndEventNames) {
                if (element.style[name] !== undefined) return transEndEventNames[name];
            }
        }());

        return transitionEnd && { end: transitionEnd };
    })();

    $.support.animation = (function() {

        var animationEnd = (function() {

            var element = doc.body || doc.documentElement,
                animEndEventNames = {
                    WebkitAnimation: 'webkitAnimationEnd',
                    MozAnimation: 'animationend',
                    OAnimation: 'oAnimationEnd oanimationend',
                    animation: 'animationend'
                }, name;

            for (name in animEndEventNames) {
                if (element.style[name] !== undefined) return animEndEventNames[name];
            }
        }());

        return animationEnd && { end: animationEnd };
    })();

    $.support.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function(callback){ window.setTimeout(callback, 1000/60); };
    $.support.touch                 = (
        ('ontouchstart' in window && navigator.userAgent.toLowerCase().match(/mobile|tablet/)) ||
        (window.DocumentTouch && document instanceof window.DocumentTouch)  ||
        (window.navigator['msPointerEnabled'] && window.navigator['msMaxTouchPoints'] > 0) || //IE 10
        (window.navigator['pointerEnabled'] && window.navigator['maxTouchPoints'] > 0) || //IE >=11
        false
    );
    $.support.mutationobserver      = (window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || null);

    $.Utils = {};

    $.Utils.debounce = function(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    $.Utils.removeCssRules = function(selectorRegEx) {
        var idx, idxs, stylesheet, _i, _j, _k, _len, _len1, _len2, _ref;

        if(!selectorRegEx) return;

        setTimeout(function(){
            try {
              _ref = document.styleSheets;
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                stylesheet = _ref[_i];
                idxs = [];
                stylesheet.cssRules = stylesheet.cssRules;
                for (idx = _j = 0, _len1 = stylesheet.cssRules.length; _j < _len1; idx = ++_j) {
                  if (stylesheet.cssRules[idx].type === CSSRule.STYLE_RULE && selectorRegEx.test(stylesheet.cssRules[idx].selectorText)) {
                    idxs.unshift(idx);
                  }
                }
                for (_k = 0, _len2 = idxs.length; _k < _len2; _k++) {
                  stylesheet.deleteRule(idxs[_k]);
                }
              }
            } catch (_error) {}
        }, 0);
    };

    $.Utils.isInView = function(element, options) {

        var $element = $(element);

        if (!$element.is(':visible')) {
            return false;
        }

        var window_left = $win.scrollLeft(),
            window_top  = $win.scrollTop(),
            offset      = $element.offset(),
            left        = offset.left,
            top         = offset.top;

        options = $.extend({topoffset:0, leftoffset:0}, options);

        if (top + $element.height() >= window_top && top - options.topoffset <= window_top + $win.height() &&
            left + $element.width() >= window_left && left - options.leftoffset <= window_left + $win.width()) {
          return true;
        } else {
          return false;
        }
    };

    $.Utils.options = function(string) {

        if ($.isPlainObject(string)) return string;

        var start = (string ? string.indexOf("{") : -1), options = {};

        if (start != -1) {
            try {
                options = (new Function("", "var json = " + string.substr(start) + "; return JSON.parse(JSON.stringify(json));"))();
            } catch (e) {}
        }

        return options;
    };

    $.Utils.events       = {};
    $.Utils.events.click = $.support.touch ? 'tap' : 'click';

    $.langdirection = $html.attr("dir") == "rtl" ? "right" : "left";

    $(function(){

        // Check for dom modifications
        if(!$.support.mutationobserver) return;

        // Install an observer for custom needs of dom changes
        var observer = new $.support.mutationobserver($.Utils.debounce(function(mutations) {
            $(doc).trigger("domready");
        }, 300));

        // pass in the target node, as well as the observer options
        observer.observe(document.body, { childList: true, subtree: true });

    });

    // add touch identifier class
    $html.addClass($.support.touch ? "touch" : "no-touch");

}(jQuery, window, document));
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


  $(document).on('click', '[data-toggle=collapse]', function () {
    console.log('data-toggle=collapse');
    $(this).toggleClass('collapsed');
    $(this).parent().find('.collapse').toggleClass('in');
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

  $(document).on('click', '.fav-cross', function () {
      $(this).parent().find('.favorite-selector').select2("val", "");
      $(this).fadeOut();
  });

  $(document).on('click', '.payment-cross', function () {
      $(this).parent().find('.payment-selector').select2("val", "");
      $(this).fadeOut();
  });

  $(document).on('click', '#paymentTop .control-label .icon-cross', function () {
      paymentTop.api().ajax.url( '../server/payment_top.json' ).load();
      $(this).parent().find('.delay-selector').select2("val", "");
      $(this).fadeOut();
  });

  $('#paymentTop .delay-selector').on( 'change', function () {
        var val = $(this).val();

        if(val != '') {
          $(this).parent().find('.icon-cross').fadeIn();
        }
    } );

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
        { mData: 'country'},
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

          this.parent().find('.fav').append('<label class="control-label mb"><i class="icon-favorite"></i><select id="fav-'+ this.attr('id') +'" class="favorite-selector form-control" name="favorite" value=""><option class="default" value="" data-localize="trades.FAVORITE"></option><option value="Константин Константинопольский">Константин Константинопольский</option><option value="Александридис Константинопулос">Александридис Константинопулос</option><option value="Валерий Панфилов">Валерий Панфилов</option><option value="Александр Валерьев">Александр Валерьев</option></select><i class="fav-cross icon-cross" style="display:none"></label>');
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

                      if(val != '') {
                        $('.payment-cross').fadeIn();
                      }
                  } );

              column.data().unique().sort().each( function ( d, j ) {
                  select.append( '<option value="'+d+'">'+d+'</option>' );
              } );

              select.wrap("<div class='select-wrapper'></div>").find("[data-localize]").localize('site', { pathPrefix: 'i18n', language: $.localStorage.get('jq-appLang')});
          } );

          this.parent().find('.fav, .buy_button').find("[data-localize]").localize('site', { pathPrefix: 'i18n', language: $.localStorage.get('jq-appLang')});

          $('.favorite-selector').select2({});

          $('.payment-selector').select2({});

          $('<i class="payment-cross icon-cross" style="display:none">').appendTo($(this).find('.select-wrapper'));

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
                        $('.fav-cross').fadeIn();
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