!function i(a,u,c){function l(t,e){if(!u[t]){if(!a[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(d)return d(t,!0);var r=new Error("Cannot find module '"+t+"'");throw r.code="MODULE_NOT_FOUND",r}var o=u[t]={exports:{}};a[t][0].call(o.exports,function(e){return l(a[t][1][e]||e)},o,o.exports,i,a,u,c)}return u[t].exports}for(var d="function"==typeof require&&require,e=0;e<c.length;e++)l(c[e]);return l}({1:[function(e,t,n){"use strict";function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var r=function(){function t(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this.update_clock(),setInterval(this.update_clock,5e3);var e=this;window.addEventListener("hashchange",function(){return e.handle_routing()}),this.handle_routing()}var e,n,r;return e=t,(n=[{key:"handle_routing",value:function(){for(var e=document.querySelector(".screen"),t=window.location.hash?window.location.hash.substr(1):"landing",n=!1,r=0;r<e.childNodes.length;r++){var o=e.childNodes[r];o.id&&(o.id===t?(o.style.display="block",document.title="Raffle Manager: "+(o.dataset.title?o.dataset.title:o.id),n=!0):o.style.display="none")}n||(e.childNodes[e.childNodes.length-2].style.display="block")}},{key:"update_clock",value:function(){var e=document.querySelector(".clock"),t=new Date;e.textContent=(t.getHours()<10?"0":"")+t.getHours()+":"+(t.getMinutes()<10?"0":"")+t.getMinutes()}}])&&o(e.prototype,n),r&&o(e,r),t}();window.addEventListener("DOMContentLoaded",function(){window.app=new r})},{}]},{},[1]);
//# sourceMappingURL=app.js.map
