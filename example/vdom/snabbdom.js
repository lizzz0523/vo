!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.snabbdom=e()}}(function(){return function e(t,n,r){function o(a,l){if(!n[a]){if(!t[a]){var d="function"==typeof require&&require;if(!l&&d)return d(a,!0);if(i)return i(a,!0);var f=new Error("Cannot find module '"+a+"'");throw f.code="MODULE_NOT_FOUND",f}var s=n[a]={exports:{}};t[a][0].call(s.exports,function(e){var n=t[a][1][e];return o(n?n:e)},s,s.exports,e,t,n,r)}return n[a].exports}for(var i="function"==typeof require&&require,a=0;a<r.length;a++)o(r[a]);return o}({1:[function(e,t,n){function r(e,t,n){if(e.ns="http://www.w3.org/2000/svg","foreignObject"!==n&&void 0!==t)for(var o=0;o<t.length;++o)r(t[o].data,t[o].children,t[o].sel)}var o=e("./vnode"),i=e("./is");t.exports=function(e,t,n){var a,l,d,f={};if(void 0!==n?(f=t,i.array(n)?a=n:i.primitive(n)&&(l=n)):void 0!==t&&(i.array(t)?a=t:i.primitive(t)?l=t:f=t),i.array(a))for(d=0;d<a.length;++d)i.primitive(a[d])&&(a[d]=o(void 0,void 0,void 0,a[d]));return"s"===e[0]&&"v"===e[1]&&"g"===e[2]&&r(f,a,e),o(e,f,a,l,void 0)}},{"./is":3,"./vnode":11}],2:[function(e,t,n){function r(e){return document.createElement(e)}function o(e,t){return document.createElementNS(e,t)}function i(e){return document.createTextNode(e)}function a(e,t,n){e.insertBefore(t,n)}function l(e,t){e.removeChild(t)}function d(e,t){e.appendChild(t)}function f(e){return e.parentElement}function s(e){return e.nextSibling}function u(e){return e.tagName}function c(e,t){e.textContent=t}t.exports={createElement:r,createElementNS:o,createTextNode:i,appendChild:d,removeChild:l,insertBefore:a,parentNode:f,nextSibling:s,tagName:u,setTextContent:c}},{}],3:[function(e,t,n){t.exports={array:Array.isArray,primitive:function(e){return"string"==typeof e||"number"==typeof e}}},{}],4:[function(e,t,n){function r(e,t){var n,r,i,l,d=t.elm,f=e.data.attrs,s=t.data.attrs;if(f||s){f=f||{},s=s||{};for(n in s)r=s[n],i=f[n],i!==r&&(!r&&a[n]?d.removeAttribute(n):(l=n.split(":"),l.length>1&&o.hasOwnProperty(l[0])?d.setAttributeNS(o[l[0]],n,r):d.setAttribute(n,r)));for(n in f)n in s||d.removeAttribute(n)}}for(var o={xlink:"http://www.w3.org/1999/xlink"},i=["allowfullscreen","async","autofocus","autoplay","checked","compact","controls","declare","default","defaultchecked","defaultmuted","defaultselected","defer","disabled","draggable","enabled","formnovalidate","hidden","indeterminate","inert","ismap","itemscope","loop","multiple","muted","nohref","noresize","noshade","novalidate","nowrap","open","pauseonexit","readonly","required","reversed","scoped","seamless","selected","sortable","spellcheck","translate","truespeed","typemustmatch","visible"],a=Object.create(null),l=0,d=i.length;l<d;l++)a[i[l]]=!0;t.exports={create:r,update:r}},{}],5:[function(e,t,n){function r(e,t){var n,r,o=t.elm,i=e.data["class"],a=t.data["class"];if(i||a){i=i||{},a=a||{};for(r in i)a[r]||o.classList.remove(r);for(r in a)n=a[r],n!==i[r]&&o.classList[n?"add":"remove"](r)}}t.exports={create:r,update:r}},{}],6:[function(e,t,n){function r(e,t,n){if("function"==typeof e)e.call(t,n,t);else if("object"==typeof e)if("function"==typeof e[0])if(2===e.length)e[0].call(t,e[1],n,t);else{var o=e.slice(1);o.push(n),o.push(t),e[0].apply(t,o)}else for(var i=0;i<e.length;i++)r(e[i])}function o(e,t){var n=e.type,o=t.data.on;o&&o[n]&&r(o[n],t,e)}function i(){return function e(t){o(t,e.vnode)}}function a(e,t){var n,r=e.data.on,o=e.listener,a=e.elm,l=t&&t.data.on,d=t&&t.elm;if(r!==l){if(r&&o)if(l)for(n in r)l[n]||a.removeEventListener(n,o,!1);else for(n in r)a.removeEventListener(n,o,!1);if(l){var f=t.listener=e.listener||i();if(f.vnode=t,r)for(n in l)r[n]||d.addEventListener(n,f,!1);else for(n in l)d.addEventListener(n,f,!1)}}}t.exports={create:a,update:a,destroy:a}},{}],7:[function(e,t,n){function r(e,t){var n,r,o,i=t.elm,a=e.data.props,l=t.data.props;if(a||l){a=a||{},l=l||{};for(n in a)l[n]||delete i[n];for(n in l)r=l[n],o=a[n],o===r||"value"===n&&i[n]===r||(i[n]=r)}}t.exports={create:r,update:r}},{}],8:[function(e,t,n){function r(e,t,n){d(function(){e[t]=n})}function o(e,t){var n,o,i=t.elm,a=e.data.style,l=t.data.style;if(a||l){a=a||{},l=l||{};var d="delayed"in a;for(o in a)l[o]||(i.style[o]="");for(o in l)if(n=l[o],"delayed"===o)for(o in l.delayed)n=l.delayed[o],d&&n===a.delayed[o]||r(i.style,o,n);else"remove"!==o&&n!==a[o]&&(i.style[o]=n)}}function i(e){var t,n,r=e.elm,o=e.data.style;if(o&&(t=o.destroy))for(n in t)r.style[n]=t[n]}function a(e,t){var n=e.data.style;if(!n||!n.remove)return void t();var r,o,i=e.elm,a=0,l=n.remove,d=0,f=[];for(r in l)f.push(r),i.style[r]=l[r];o=getComputedStyle(i);for(var s=o["transition-property"].split(", ");a<s.length;++a)f.indexOf(s[a])!==-1&&d++;i.addEventListener("transitionend",function(e){e.target===i&&--d,0===d&&t()})}var l="undefined"!=typeof window&&window.requestAnimationFrame||setTimeout,d=function(e){l(function(){l(e)})};t.exports={create:o,update:o,destroy:i,remove:a}},{}],9:[function(e,t,n){var r=e("./snabbdom"),o=r.init([e("./modules/attributes"),e("./modules/class"),e("./modules/props"),e("./modules/style"),e("./modules/eventlisteners")]),i=e("./h");t.exports={patch:o,h:i}},{"./h":1,"./modules/attributes":4,"./modules/class":5,"./modules/eventlisteners":6,"./modules/props":7,"./modules/style":8,"./snabbdom":10}],10:[function(e,t,n){"use strict";function r(e){return void 0===e}function o(e){return void 0!==e}function i(e,t){return e.key===t.key&&e.sel===t.sel}function a(e,t,n){var r,i,a={};for(r=t;r<=n;++r)i=e[r].key,o(i)&&(a[i]=r);return a}function l(e,t){function n(e){var n=e.id?"#"+e.id:"",r=e.className?"."+e.className.split(" ").join("."):"";return d(t.tagName(e).toLowerCase()+n+r,{},[],void 0,e)}function l(e,n){return function(){if(0===--n){var r=t.parentNode(e);t.removeChild(r,e)}}}function p(e,n){var r,i=e.data;o(i)&&o(r=i.hook)&&o(r=r.init)&&(r(e),i=e.data);var a,l=e.children,d=e.sel;if(o(d)){var s=d.indexOf("#"),c=d.indexOf(".",s),m=s>0?s:d.length,v=c>0?c:d.length,h=s!==-1||c!==-1?d.slice(0,Math.min(m,v)):d;if(a=e.elm=o(i)&&o(r=i.ns)?t.createElementNS(r,h):t.createElement(h),m<v&&(a.id=d.slice(m+1,v)),c>0&&(a.className=d.slice(v+1).replace(/\./g," ")),f.array(l))for(r=0;r<l.length;++r)t.appendChild(a,p(l[r],n));else f.primitive(e.text)&&t.appendChild(a,t.createTextNode(e.text));for(r=0;r<w.create.length;++r)w.create[r](u,e);r=e.data.hook,o(r)&&(r.create&&r.create(u,e),r.insert&&n.push(e))}else a=e.elm=t.createTextNode(e.text);return e.elm}function m(e,n,r,o,i,a){for(;o<=i;++o)t.insertBefore(e,p(r[o],a),n)}function v(e){var t,n,r=e.data;if(o(r)){for(o(t=r.hook)&&o(t=t.destroy)&&t(e),t=0;t<w.destroy.length;++t)w.destroy[t](e);if(o(t=e.children))for(n=0;n<e.children.length;++n)v(e.children[n])}}function h(e,n,r,i){for(;r<=i;++r){var a,d,f,s=n[r];if(o(s))if(o(s.sel)){for(v(s),d=w.remove.length+1,f=l(s.elm,d),a=0;a<w.remove.length;++a)w.remove[a](s,f);o(a=s.data)&&o(a=a.hook)&&o(a=a.remove)?a(s,f):f()}else t.removeChild(e,s.elm)}}function y(e,n,o,l){for(var d,f,s,u,c=0,v=0,y=n.length-1,x=n[0],b=n[y],w=o.length-1,N=o[0],k=o[w];c<=y&&v<=w;)r(x)?x=n[++c]:r(b)?b=n[--y]:i(x,N)?(g(x,N,l),x=n[++c],N=o[++v]):i(b,k)?(g(b,k,l),b=n[--y],k=o[--w]):i(x,k)?(g(x,k,l),t.insertBefore(e,x.elm,t.nextSibling(b.elm)),x=n[++c],k=o[--w]):i(b,N)?(g(b,N,l),t.insertBefore(e,b.elm,x.elm),b=n[--y],N=o[++v]):(r(d)&&(d=a(n,c,y)),f=d[N.key],r(f)?(t.insertBefore(e,p(N,l),x.elm),N=o[++v]):(s=n[f],g(s,N,l),n[f]=void 0,t.insertBefore(e,s.elm,x.elm),N=o[++v]));c>y?(u=r(o[w+1])?null:o[w+1].elm,m(e,u,o,v,w,l)):v>w&&h(e,n,c,y)}function g(e,n,a){var l,d;o(l=n.data)&&o(d=l.hook)&&o(l=d.prepatch)&&l(e,n);var f=n.elm=e.elm,s=e.children,u=n.children;if(e!==n){if(!i(e,n)){var c=t.parentNode(e.elm);return f=p(n,a),t.insertBefore(c,f,e.elm),void h(c,[e],0,0)}if(o(n.data)){for(l=0;l<w.update.length;++l)w.update[l](e,n);l=n.data.hook,o(l)&&o(l=l.update)&&l(e,n)}r(n.text)?o(s)&&o(u)?s!==u&&y(f,s,u,a):o(u)?(o(e.text)&&t.setTextContent(f,""),m(f,null,u,0,u.length-1,a)):o(s)?h(f,s,0,s.length-1):o(e.text)&&t.setTextContent(f,""):e.text!==n.text&&t.setTextContent(f,n.text),o(d)&&o(l=d.postpatch)&&l(e,n)}}var x,b,w={};for(r(t)&&(t=s),x=0;x<c.length;++x)for(w[c[x]]=[],b=0;b<e.length;++b)void 0!==e[b][c[x]]&&w[c[x]].push(e[b][c[x]]);return function(e,o){var a,l,d,f=[];for(a=0;a<w.pre.length;++a)w.pre[a]();for(r(e.sel)&&(e=n(e)),i(e,o)?g(e,o,f):(l=e.elm,d=t.parentNode(l),p(o,f),null!==d&&(t.insertBefore(d,o.elm,t.nextSibling(l)),h(d,[e],0,0))),a=0;a<f.length;++a)f[a].data.hook.insert(f[a]);for(a=0;a<w.post.length;++a)w.post[a]();return o}}var d=e("./vnode"),f=e("./is"),s=e("./htmldomapi"),u=d("",{},[],void 0,void 0),c=["create","update","remove","destroy","pre","post"];t.exports={init:l}},{"./htmldomapi":2,"./is":3,"./vnode":11}],11:[function(e,t,n){t.exports=function(e,t,n,r,o){var i=void 0===t?void 0:t.key;return{sel:e,data:t,children:n,text:r,elm:o,key:i}}},{}]},{},[9])(9)});