!function(o,n,$,e){$(function(){$(".panel").on("panel.refresh",function(o,n){setTimeout(function(){n.removeSpinner()},3e3)}).on("hide.bs.collapse",function(o){console.log("Panel Collapse Hide")}).on("show.bs.collapse",function(o){console.log("Panel Collapse Show")}).on("panel.remove",function(o,n,e){console.log("Removing panel"),e.resolve()}).on("panel.removed",function(o,n){console.log("Removed panel")})})}(window,document,window.jQuery);