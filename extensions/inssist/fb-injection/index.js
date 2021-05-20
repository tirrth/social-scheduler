!function(){function t(t,n,e){Object.defineProperty(t,n,{get:e,enumerable:!0})}var n={createName:function(t,n){return`${t}|${JSON.stringify(n)}`},getName:e,getParams:function(){return function(t){try{return JSON.parse(t)}catch(t){return null}}(window.self.name.split("|")[1])||{}},isIframe:function(t=null){return window.self!==parent&&(!t||e()===t)}};function e(){return window.self.name.split("|")[0]||null}async function o(){i()||await new Promise((t=>{document.addEventListener("readystatechange",(function n(){i()&&(document.removeEventListener("readystatechange",n),t())}))}))}function i(){return"interactive"===document.readyState||"complete"===document.readyState}var s=document.documentElement,r={},a={},c={},l={},d=1;l={nextValue:function(){return(d=(9301*d+49297)%233280)/233280},seed:function(t){d=t}};var u,p,f,h="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";function g(){f=!1}function m(t){if(t){if(t!==u){if(t.length!==h.length)throw new Error("Custom alphabet for shortid must be "+h.length+" unique characters. You submitted "+t.length+" characters: "+t);var n=t.split("").filter((function(t,n,e){return n!==e.lastIndexOf(t)}));if(n.length)throw new Error("Custom alphabet for shortid must be "+h.length+" unique characters. These characters were not unique: "+n.join(", "));u=t,g()}}else u!==h&&(u=h,g())}function _(){return f||(f=function(){u||m(h);for(var t,n=u.split(""),e=[],o=l.nextValue();n.length>0;)o=l.nextValue(),t=Math.floor(o*n.length),e.push(n.splice(t,1)[0]);return e.join("")}())}c={get:function(){return u||h},characters:function(t){return m(t),u},seed:function(t){l.seed(t),p!==t&&(g(),p=t)},lookup:function(t){return _()[t]},shuffled:_};var b="object"==typeof window&&(window.crypto||window.msCrypto),y=b&&b.getRandomValues?function(t){return b.getRandomValues(new Uint8Array(t))}:function(t){for(var n=[],e=0;e<t;e++)n.push(Math.floor(256*Math.random()));return n},v=function(t,n,e){for(var o=(2<<Math.log(n.length-1)/Math.LN2)-1,i=-~(1.6*o*e/n.length),s="";;)for(var r=t(i),a=i;a--;)if((s+=n[r[a]&o]||"").length===+e)return s};var w,P,T=function(t){for(var n,e=0,o="";!n;)o+=v(y,c.get(),1),n=t<Math.pow(16,e+1),e++;return o};var E=function(t){var n="",e=Math.floor(.001*(Date.now()-1567752802062));return e===P?w++:(w=0,P=e),n+=T(7),n+=T(t),w>0&&(n+=T(w)),n+=T(e)};var S,x=function(t){return!(!t||"string"!=typeof t||t.length<6)&&!new RegExp("[^"+c.get().replace(/[|\\{}()[\]^$+*?.-]/g,"\\$&")+"]").test(t)},C=!1;var O=(C||(C=!0,S={},S=0),S||0);function M(){return E(O)}var L=M;(a=M).generate=L;var I=function(t){return c.seed(t),a};a.seed=I;var k=function(t){return O=t,a};a.worker=k;var F=function(t){return void 0!==t&&c.characters(t),c.shuffled()};a.characters=F;var A=x;function D(t){return Array.isArray(t)?t:[t]}function R(t,n=document){t=D(t);for(const e of t){const t=n.querySelector(e);if(t)return t}return null}function B(t,n=document){t=D(t);for(const e of t){const t=n.querySelectorAll(e);if(t.length)return Array.from(t)}return[]}a.isValid=A,r=a;var $={on:function(t,n){z();(q[t]||(q[t]=[])).push(n)},off:function(t,n){const e=q[t];if(!e)return;for(;;){const t=e.findIndex((t=>t===n));if(-1===t)break;e.splice(t,1)}},send:function(t,...n){let e;const o=n[n.length-1];"function"==typeof o?(e=o,n=n.slice(0,-1)):e=null;return new Promise((o=>{chrome.runtime.sendMessage({[H]:t,[j]:n},(t=>{chrome.runtime.lastError||t!==N&&(e&&e(t),o(t))}))}))}};const N="__chromeBus.EMPTY_RESPONSE",q={},H="__chromeBus.name",j="__chromeBus.args";function z(){const t=z;t.init||(t.init=!0,chrome.runtime.onMessage.addListener(((t,n,e)=>{const o=t["__chromeBus.name"];if(!o)return!1;const i=t["__chromeBus.args"]||[],s=q[o]||[];return 0===s.length?(e(N),!0):((async()=>{const t=await Promise.all(s.map((t=>t(...i)))),n=t[t.length-1];e(n)})(),!!e)})))}var U={init:function(){$.on("iframe-bus",((t,...n)=>Q(t,...n))),K("chrome-bus",((t,...n)=>$.send(t,...n)))},on:K,once:X,off:J,send:Q,wait:async function(t){return await new Promise((n=>{X(t,n)}))}};const V="__iframeBus.name",G="__iframeBus.args",Y="__iframeBus.callbackId",W=parent!==window;function K(t,n){const e=Z(t),o=n["__iframeBus.handlers"]||(n["__iframeBus.handlers"]={});o[t]=async o=>{if(o.data["__iframeBus.name"]===e){const e=o.data["__iframeBus.args"]||[],i=o.data["__iframeBus.callbackId"]||null,s=await n(...e);i&&Q(`${t}:response-${i}`,s)}},window.addEventListener("message",o[t])}function X(t,n){K(t,(function e(...o){return J(t,e),n(...o)}))}function J(t,n){const e=n["__iframeBus.handlers"]||(n["__iframeBus.handlers"]={});window.removeEventListener("message",e[t])}async function Q(t,...n){let e;const o=n[n.length-1];"function"==typeof o?(e=o,n=n.slice(0,-1)):e=null;const i=t.includes(":response-"),s=Z(t),a=i?null:r.generate();if(W?parent.postMessage({[V]:s,[G]:n,[Y]:a},"*"):B("iframe").forEach((t=>{t.contentWindow.postMessage({[V]:s,[G]:n,[Y]:a},"*")})),!i)return new Promise((n=>{const o=i=>{e&&e(i),J(`${t}:response-${a}`,o),n(i)};K(`${t}:response-${a}`,o)}))}function Z(t){return`iframe-bus.${t}`}function tt(...t){const n=function(t,...n){let e=0;return t.join("###").split(",").join("\n,\n").split("{").join("\n{").split("\n").map((t=>{if(!t.includes("###"))return t;const o=D(n[e]).map((n=>t.split("###").join(n))).join(",\n");return e+=1,o})).join("\n")}(...t);document.head.insertAdjacentHTML("afterbegin",n)}var nt=Object.assign((function(t,n=!1){0===et.length&&(ot=new MutationObserver((t=>{for(const n of et){if(ot.disconnect(),n(t),!ot)return;ot.observe(document.documentElement,{attributes:!0,childList:!0,subtree:!0})}})),ot.observe(document.documentElement,{attributes:!0,childList:!0,subtree:!0}));et.push(t),n&&t()}),{off:function(t){const n=et.indexOf(t);if(-1===n)return;et.splice(n,1),0===et.length&&(ot.disconnect(),ot=null)}});const et=[];let ot;var it={getConfig:function t(){const e=t;if(!e.config){const t=n.getParams();e.config=t.fusionConfig}return e.config}};var st={initForIg:function(){rt()},initForFcs:function(){rt(),function(){const t=it.getConfig().fcsSelectors;nt((function t(n){const o=R("body");if(!o)return;nt.off(t);new MutationObserver(e).observe(o,{childList:!0,subtree:!0}),e(n)}));let n=!1;function e(e){if(n)return;const o=e.map((t=>Array.from(t.addedNodes))).flat();if(0===o.length)return;const i=window.inssist.theme.emojiRegex,s=(R("body").innerText.match(i)||[]).filter((t=>!"0123456789#*↪".includes(t)));if(0===s.length)return;const r=[],a=Array.from(new Set(s)),c=["input","textarea","[contenteditable]",t.sidePanel.postPreviewCaption].map((t=>B(t))).flat();o.forEach((t=>{let n;if(n=t.nodeType===Node.ELEMENT_NODE?t:t.parentElement,!n)return;const e=document.createTreeWalker(n,NodeFilter.SHOW_TEXT);for(;;){const t=e.nextNode();if(!t)break;const n=t.textContent;if(!a.some((t=>n.includes(t))))continue;if(c.some((n=>n.contains(t))))continue;const o=t.parentElement;o.classList.contains("emoji")||(r.includes(o)||r.push(o))}})),requestAnimationFrame((()=>{n=!0,r.forEach((t=>{if(!document.body.contains(t))return;let n=t.innerHTML;a.forEach((t=>{const e=`<span class="emoji">${t}</span>`;n=n.split(e).join("__$%#^__").split(t).join(e).split("__$%#^__").join(e)})),t.innerHTML=n})),n=!1}))}}()}};function rt(){tt`
    <style>
      .theme-night .emoji {
        filter: url(#theme-reverse-filter);
      }

      .theme-night input,
      .theme-night textarea,
      .theme-night [contenteditable] {
        filter: url(#theme-filter);
        color: #a0a0a0 !important;
        background: transparent !important;
        border-color: rgba(255, 255, 255, 0.3);
      }
      .theme-night input::placeholder,
      .theme-night textarea::placeholder {
        color: rgba(255, 255, 255, 0.33);
      }
    </style>
  `}var at={initForIg:function(){ct(),st.initForIg()},initForFcs:function(){ct(),st.initForFcs()}};function ct(){!async function(){lt(await U.send("theme.get-theme"))}(),async function(){U.on("theme.switch-theme",(t=>{lt(t)}))}()}function lt(t){t&&(s.classList.remove("theme-day"),s.classList.remove("theme-night"),s.classList.add(`theme-${t}`))}var dt={getCaption:function(){const t=ut();if(!t)return null;let n=t.innerText.split("\n\n").join("\n");"\n"===n&&(n="");return n},setCaption:async function(t){const n=ut();if(!n)return;if(document.activeElement===n)return;const e=window.inssist.schedule.requireModule,o=await e("EditorState"),i=await e("ContentState"),s=await e("MediaManagerInstagramComposerMetaDataActions"),r=await e("getMentionsInputDecorator"),a=i.createFromText(t),c=r(),l=o.createWithContent(a,c);s.updateCaption(l);const d=R(it.getConfig().fcsSelectors.sidePanel.captionScrollContainer);if(!d)return;d.scrollTop=d.scrollHeight}};function ut(){return R(it.getConfig().fcsSelectors.sidePanel.captionTextarea)||null}var pt={user:null,igProfilesData:[],crosspostToFb:!1,selectedPostId:null,allPosts:[]};function ft(){const t=[];return Object.assign(n,{handle:function(t){if("function"!=typeof t)return void console.error("function is expected");n(t)},clear:function(){t.length=0},off:function(n){const e=t.indexOf(n);-1!==e&&t.splice(e,1)},isEmpty:function(){return 0===t.length}});function n(...n){"function"==typeof n[0]?t.push(n[0]):t.forEach((t=>t(...n)))}}const ht=ft();var gt={init:function(){const t=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(n,e){const o=this;e=mt(e);let i=0;const s={},r=new URL(e);Array.from(r.searchParams).forEach((([t,n])=>{s[t]=n}));const a=ft();o.addEventListener("readystatechange",(()=>{o.readyState===XMLHttpRequest.DONE&&a(o)})),ht({url:e,query:s,modifyUrl:t=>{i+=1,i>1&&console.warn("`modifyUrl` was called more than once"),e=mt(t)},onResponse:a}),t.call(o,n,e)}},onRequest:ht.handle};function mt(t){return t.startsWith("http")?t:t.startsWith("/")?`${location.origin}${t}`:(console.error(`invalid url "${t}"`),t)}async function _t(t,n=null){let e,o;return"number"==typeof n?(e=n,o=100):n?(e=n.timeout||3e4,o=n.frequency||100):(e=3e4,o=100),new Promise(((n,i)=>{const s=t();if(s)return void n(s);const r=setInterval((()=>{const e=t();e&&(clearInterval(r),n(e))}),o);setTimeout((()=>{clearInterval(r),n(null)}),e)}))}function bt(){let t;const n=new Promise((n=>{t=n}));return Object.defineProperty(n,"resolve",{get:()=>t}),n}var yt={createError:function({message:t,details:n={}}){return{message:t,details:n,[vt]:!0}},throwError:function({message:t,details:n={}}){throw wt({message:t,details:n,critical:!0}),new Error(t)},sendError:wt,isKnownError:function(t){return t&&t[vt]},getLightweightPageHtml:Pt};const vt=Symbol("isScheduleInjectionError");async function wt({message:t,details:n={},critical:e=!1}){let o;try{o=(await fetch("/")).ok}catch(t){o=!1}const i=!!R(it.getConfig().fcsSelectors.general.pandaErrorImage);U.send("schedule.fcs-error",{message:`schedule injection → ${t}`,critical:e,details:{...n,isNetworkOk:o,isPandaError:i,html:Pt()}})}function Pt(){const t=R("body > div"),n=document.createElement("div");return n.innerHTML=t.innerHTML.replace(/style="[^"]*"/gi,"").replace(/alt="[^"]*"/gi,""),B('[role="cell"]:nth-child(n + 4)',n).forEach((t=>t.remove())),n.innerHTML}var Tt={};const Et=1e3,St=6e4,xt=36e5,Ct=864e5;t(Tt,"MONTH",(function(){return 26784e5})),t(Tt,"WEEK",(function(){return 6048e5})),t(Tt,"DAY",(function(){return Ct})),t(Tt,"HOUR",(function(){return xt})),t(Tt,"MINUTE",(function(){return St})),t(Tt,"SECOND",(function(){return Et}));var Ot='<style>\n\n* {\n  outline: none;\n  font-family: montserrat !important;\n}\n\nbody {\n  overflow: hidden;\n}\n\nbody::-webkit-scrollbar {\n  width: 0px;\n}\n\n/* top bar */\n#mediaManagerGlobalChromeBar, /* when connected with fb */\n.uiContextualLayerParent > div > .MediaManagerInstagramRoot > div:first-child /* when connected with ig */ {\n  display: none !important;\n}\n\n/* side panel */\n._6uh1 {\n  top: 0 !important;\n}\n\n/* side panel items under "create post" button */\n._6ug6 {\n  display: none !important;\n}\n\n/* body panel */\n._1l9z {\n  margin-top: 0 !important;\n}\n\n/* user selection dropdown */\n#tabHeader {\n  margin-top: -28px;\n}\n\n'.replace("<style>",""),Mt={init:function(){U.on("schedule.fcs-get-report",It)},set:function(t,n){Lt[t]=n},log:function(t){Lt.log.push(t);const n="string"==typeof t?t:JSON.stringify(t);console.log(`%cschedule injection startup %c${n}`,"color: #b99610","color: #b99610; font-weight: bold;")}};const Lt={log:[]};function It(){return{...Lt,html:yt.getLightweightPageHtml()}}var kt={init:async function(){Mt.log("start"),Ft=it.getConfig().fcsSelectors;try{await async function(){Mt.log("fallback enabled?");const t=await U.send("schedule.is-fallback-enabled");if(Mt.log(t?"yes":"no"),!t)return;throw tt`
    <style>
      ${Ot}
    </style>
  `,Dt}(),await async function(){var t;await o();const n=document.documentElement.innerHTML;if(!n.toLowerCase().includes("bizsitepage"))return Mt.log("is user connected?"),Mt.log("no (not logged in)"),void(pt.user=null);Mt.log("waiting for ig profiles data...");const e=n.split("<body")[1].split("requireLazy")[0];Mt.log(e);const i=setTimeout((()=>{Mt.log("actions before init"),Mt.log(window.inssist.schedule.actionsBeforeInit)}),5e3),s=window.inssist.schedule.waitForInit;await s(),clearTimeout(i);const r=window.inssist.schedule.requireModule,a=await r("MediaManagerInstagramProfilesDataStore",3e4);if(!a){let t;const n=yt.getLightweightPageHtml();throw t=n.includes("/checkpoint/")?"account locked":n.includes("/confirm_code/")?"fb code is required":'<div class="_3b5k" id="bizsitePageContainer"><div class="_6nx4"></div><div id="globalContainer" class="uiContextualLayerParent"><div id="u_0_1"></div></div></div>'===n?"empty html":n.includes('role="progressbar"')?"spinner":"unknown",yt.createError({message:`Unable to require MediaManagerInstagramProfilesDataStore within 30 seconds (${t})`})}Mt.log("ig profiles data received"),Mt.log("is user connected?");if(!await _t((()=>{const t=a.getState().toJS();return t[0]&&"LOADING"!==t[0].operation})))throw yt.createError({message:"MediaManagerInstagramProfilesDataStore loading takes too long"});let c=null;const l=a.getState().toJS(),d=(null==l||null===(t=l[0])||void 0===t?void 0:t.value)||[];if(d.length>0){const t=await U.send("schedule.get-ig-username");c=d.find((n=>n.username===t))||null}pt.user=c,Mt.log(c?"yes":"no")}(),function(){const t=()=>{const t=R(Ft.welcome.getStartedButton);t&&(t.click(),location.reload())};nt(t),setTimeout((()=>{nt.off(t)}),3e4)}();const t=!!pt.user;await U.send("schedule.fcs-connection-status",t)}catch(t){t===Dt||(yt.isKnownError(t)?yt.sendError({message:t.message,details:t.details,critical:!0}):yt.sendError({message:"startup controller init: unknown error",details:{details:t},critical:!0}))}Mt.log("end"),At.resolve()},waitForInit:async function(){return At}};let Ft;const At=bt(),Dt=new Error("fallback enabled");let Rt;var Bt=Rt={init:async function(){const t=it.getConfig().fcs;if(await kt.waitForInit(),!pt.user)return;try{const n=await Nt(t.MediaManagerDispatcher),e=await Nt(t.MediaManagerInstagramVideoComposerDispatcher);Object.assign(Rt.main,n),Object.assign(Rt.composer,e)}catch(t){yt.isKnownError(t)?yt.sendError({message:t.message,details:t.details,critical:!0}):yt.sendError({message:"dispatch controller init: unknown error",details:{jsError:t},critical:!0})}$t.resolve()},waitForInit:async function(){return $t},main:{},composer:{}};const $t=bt();async function Nt(t){const n=await _t((()=>window.require));if(!n)throw yt.createError({message:"initDispatcher: failed to get window.require"});const e=await _t((()=>n(t)));if(!e)throw yt.createError({message:`initDispatcher: failed to require ${t}`});const o=[],i=e.dispatch;return e.dispatch=(...t)=>{if(t[0])for(const n of o)n(t[0]);return i.call(e,...t)},{dispatch:e.dispatch,onDispatch:t=>{o.push(t)}}}async function qt(t,...n){return new Promise((e=>{t(...n,e)}))}var Ht=Object.assign((function(t,n={}){document.addEventListener("click",t,n)}),{off:function(t,n={}){document.removeEventListener("click",t,n)}});function jt(t,n){let e;e="function"==typeof n?t.findIndex(n):t.indexOf(n),-1!==e&&t.splice(e,1)}var zt='<style>\n\n* {\n  outline: none;\n}\n\n\n/* user selection option when creating new post */\n._7pqd {\n  opacity: 0;\n}\n\n\n/* page content */\n._1x52,\n#globalContainer {\n  visibility: hidden;\n}\n\n\n/* modal window */\n._59s7 {\n  max-width: calc(100% - 80px) !important;\n}\n\n\n/* edit post left panel */\n._7-i- {\n  padding-top: 0 !important;\n}\n\n\n/* hide content */\n._6uh1 ~ div {\n  visibility: hidden !important;\n}\n\n\n/* notification (e.g. "post saved") */\n._72sn {\n  display: none;\n}\n\n\n/* disable side panel animation */\n._92zt {\n  animation-duration: 0s !important;\n}\n\n\n/* extend table height */\n._rz-,\n.uiScrollableAreaContent > div {\n  height: 4500px !important; }\n\n\n/* disable active panel animation */\n#creator_studio_sliding_tray_root ._6lsf {\n  right: 0 !important; }\n\n\n/* uploading progress */\n._6eqo {\n  cursor: default !important;\n}\n\n/* uploading progress chevron icon */\n._6eqo i:last-child {\n  display: none;\n}\n\n\n/* noinspection CssNoGenericFontName */\n* { font-family: montserrat !important; }\n:root { --geodesic-type-font-family: montserrat !important; }\nbody { overflow-x: hidden; }\nbody::-webkit-scrollbar { width: 0px; }\n\n\n/* ! posts panel container */\n#globalContainer > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2),\ndiv._1l9z {\n  margin: 0 !important; z-index: 100; }\n\n\n/*START*/\n/* left navigation panel and\n   top panel header with fb and ig tabs.\n   these are optional if posts container z-index is 100 */\n#mediaManagerGlobalChromeBar,\n._6uh1, /* header with fb and ig tabs */\n.p7k9k0yn.i6vn8ron /* header when authorized with new method */ {\n  display: none !important; }\n\n\n/* post status, time selector and search */\n#mediaManagerFilterAndSearch {\n  display: none; }\n\n\n/* table header with account selector and title */\n#instagramTabHeader {\n  visibility: hidden;\n  position: fixed;\n  left: -100000px; }\n\n\n/* media type tabs */\ndiv._450w {\n  display: none; }\n\n\n/* posts panel content */\ndiv._3wpv {\n  padding: 0px 8px !important; }\n\n\n/* prevent column clipping */\n#mediaManagerContentTable, div._6ynv {\n  min-width: 1070px !important; }\n\n\n/* --- */\n\n\n/* ! posts panel container,\n  only enable this if in post view mode to hide the table underneath */\n/* #globalContainer > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2), div._1l9z {\n     visibility: hidden !important; } */\n\n\n/* ! post details pop-over */\n#creator_studio_sliding_tray_root > div, div._6lsf {\n  max-width: 100% !important;\n  width: 100% !important; }\n\n\n/* pop-over header */\n#creator_studio_sliding_tray_root > div > div > div:nth-child(1) {\n  display: none !important; }\n\n\n/* pop-over frame and performance container */\n#creator_studio_sliding_tray_root > div > div > div:nth-child(2) {\n  overflow: auto !important; }\n\n\n/* pop-over post frame (left sub-panel) */\n#creator_studio_sliding_tray_root > div > div > div:nth-child(2) > div:nth-child(1), div._759f {\n  width: initial !important;\n  min-width: 500px !important;\n  overflow-x: hidden !important;\n  overflow-y: auto !important;\n  padding-left: 24px !important;\n  justify-content: flex-start !important;\n  display: flex !important;\n  flex-direction: column !important;\n  background-color: white !important; }\n#creator_studio_sliding_tray_root > div > div > div:nth-child(2) > div:nth-child(1) > div, div._75fk {\n  box-shadow: none !important;\n  border-radius: 0 !important;\n  background-color: transparent !important;\n  border: none !important; }\n#creator_studio_sliding_tray_root > div > div > div:nth-child(2) > div:nth-child(1) > div > div._3qn7._61-3._2fyi._3qng > span {\n  display: none !important }\n#creator_studio_sliding_tray_root div._74_-._75fl {\n  margin-left: 0 !important; }\n#creator_studio_sliding_tray_root div._75fm {\n  padding-left: 0 !important; }\n#creator_studio_sliding_tray_root > div > div > div:nth-child(2) > div:nth-child(1) > div > div._8525 {\n  max-width: 500px !important }\n\n\n/* pop-over post performance (right sub-panel) */\n#creator_studio_sliding_tray_root > div > div > div:nth-child(2) > div:nth-child(2), div._759g {\n  min-width: 300px;\n  border: none !important;\n  background-color: white !important;\n  min-height: unset !important; }\n\n\n/* pop-over post performance title */\n#creator_studio_sliding_tray_root > div > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(1), div._759g > div:nth-child(1) {\n  border-top: none !important;\n  border-bottom: none !important; }\n\n\n/* pop-over post performance content */\n#creator_studio_sliding_tray_root > div > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(2), div._759g > div:nth-child(2) {\n  border-top: none !important;\n  border-bottom: none !important;\n  margin-top: 0 !important; }\n\n\n/* pop-over post performance tray */\n#creator_studio_sliding_tray_root ._6qig {\n  height: 76px !important;\n  box-sizing: border-box;\n  padding: 0 24px !important; }\n/* #creator_studio_sliding_tray_root > div > div > div:nth-child(3) > button:nth-child(1), div._6qig > button:nth-child(1) {\n     margin-left: 16px !important; } */\n\n\n/* tray buttons */\ndiv.uiOverlayFooter a[action=\'cancel\'],\ndiv.uiOverlayFooter button[action=\'confirm\'],\n#creator_studio_sliding_tray_root button[type="button"] {\n  cursor: pointer !important;\n  font-weight: 600 !important;\n  /* Please make sure to apply a special xpath attribute rule for disabled buttons.\n     Facebook disables some buttons such GO TO POST button on an archived story.\n     Such buttons are styled inline and have a special style \'color: rgb(190, 195, 201)\'.\n     Clicking these buttons does nothing, so an attribute based xpath expression should\n     watch and hide them all-together. */\n  /* color: white !important;\n     background-color: #1BA2F9 !important; */\n  border: none !important;\n  font-size: 16px !important;\n  border-radius: 4px;\n  text-transform: uppercase !important;\n  margin-left: 8px;\n  margin-right: 8px;\n  color: white !important;\n  background-color: #1BA2F9 !important;\n  transition: 300ms cubic-bezier(0.23, 1, 0.32, 1) 0s; }\ndiv.uiOverlayFooter a[action=\'cancel\'][style*="background-color: rgb(176, 213, 255)"],\ndiv.uiOverlayFooter button[action=\'confirm\'][style*="background-color: rgb(176, 213, 255)"],\n#creator_studio_sliding_tray_root button[type="button"][style*="background-color: rgb(176, 213, 255)"] {\n  opacity: 0.5 !important;\n  pointer-events: none;\n}\n\n#creator_studio_sliding_tray_root button[type="button"]:hover {\n  filter: brightness(95%); }\n#creator_studio_sliding_tray_root button[type="button"]:active {\n  filter: brightness(90%); }\n\n\n/* --- */\n\n\n/* post cover image title */\ndiv._7-i2 > span {\n  display: none !important; }\ndiv._7-i2 > div {\n  margin-top: 0 !important; }\n\n\n/* post caption input */\ndiv._7-2a._5yk1 {\n  overflow: auto !important; }\n\n\n/* --- */\n\n\n/* add content mini popup */\ndiv.uiContextualLayer.uiContextualLayerBelowLeft > div > div > div > div {\n  padding-bottom: 12px !important; }\ndiv.uiContextualLayer.uiContextualLayerBelowLeft > div > div > div > a {\n  display: none !important; }\n\n'.replace("<style>",""),Ut={init:async function(){Vt=it.getConfig().fcsSelectors,await Bt.waitForInit(),nt((()=>{pt.selectedPostId&&R(Vt.sidePanel.captionTextarea)&&setTimeout((()=>{const t=dt.getCaption();Gt[pt.selectedPostId]=t}))}))},restoreCaptionForCurrentPost:async function(){if(!pt.selectedPostId)return;const t=Gt[pt.selectedPostId];if("string"!=typeof t)return;dt.setCaption(t)}};let Vt;const Gt={};var Yt={init:async function(){if(Wt=it.getConfig().fcsSelectors,Kt=it.getConfig().fcs,on(),sn(),U.on("schedule.fcs-go-to",Xt),U.on("schedule.fcs-open-post",Jt),U.on("schedule.fcs-open-new-post-form",Qt),U.on("schedule.fcs-refresh-data",en),U.on("schedule.fcs-refresh-page",Zt),U.on("schedule.fcs-check-critical-vars",tn),await kt.waitForInit(),await Bt.waitForInit(),!pt.user)return;tt`
    <style>
      ${zt}

      ${Wt.sidePanel.mediaPreviewControls} {
        height: auto !important;
      }

      ${Wt.sidePanel.save} {
        max-width: none;
      }

      ${Wt.sidePanel.loadingOverlay} {
        background: #FFF !important;
      }
      .theme-night ${Wt.sidePanel.loadingOverlay} {
        background: #D4D5D9 !important;
      }
    </style>
  `,tt`
    <style>
      ::-webkit-scrollbar {
        display: none;
      }
    </style>
  `,tt`
    <style>
      /* dark background on panels */
      .theme-night #creator_studio_sliding_tray_root ._6lsf,
      .theme-night #creator_studio_sliding_tray_root > div > div > div:nth-child(2) > div:nth-child(1), div._759f,
      .theme-night #creator_studio_sliding_tray_root > div > div > div:nth-child(2) > div:nth-child(1) > div, div._75fk,
      .theme-night #creator_studio_sliding_tray_root > div > div > div:nth-child(2) > div:nth-child(2), div._759g {
        background-color: #d4d5d9 !important;
      }
      /* extra padding for the side panel content */
      .theme-night #creator_studio_sliding_tray_root ._6lsf {
        padding-top: 10px !important;
      }
      /* dark background on input and textarea elements */
      .theme-night ._8525 ._7-2a,
      .theme-night ._36g4 {
        background-color: #f2f3f5 !important;
      }
      /* white color on buttons */
      .theme-night div.uiOverlayFooter a[action='cancel'],
      .theme-night div.uiOverlayFooter button[action='confirm'],
      .theme-night #creator_studio_sliding_tray_root button[type="button"] {
        color: black !important;
      }
      /* white color on schedule dropdown button and carousel paginators */
      .theme-night div._8122 > button > div > i,
      .theme-night div._80qf[role="button"] > i,
      .theme-night div._80qi[role="button"] > i,
      .theme-night a._50z2[role="button"],
      .theme-night a._50z1[role="button"] {
        -webkit-filter: url(#theme-reverse-filter) !important;
        filter: url(#theme-reverse-filter) !important;
      }
      /* modal window background */
      .theme-night .ModalLayout {
        filter: url(#theme-reverse-filter);
        background: #000;
      }


      .theme-night ${Wt.sidePanel.postPreviewCaption} {
        filter: url(#theme-reverse-filter);
      }
      .theme-night ${Wt.sidePanel.postPreviewCaption},
      .theme-night ${Wt.sidePanel.postPreviewCaption} * {
        color: #D4D7D9 !important;
      }
      .theme-night ${Wt.sidePanel.postPreviewCaption} a {
        color: #728FC9 !important;
      }

      .theme-night ${Wt.sidePanel.mediaPreviewContainer} {
        background: #FFF;
      }

      .theme-night ${Wt.sidePanel.mediaPreviewControls} {
        filter: url(#theme-reverse-filter);
      }
    </style>
  `,tt`
    <style>
      ${Wt.sidePanel.locationRoot} {
        user-select: none;
        cursor: pointer;
        width: 502px;
      }
    </style>
  `,Ht((t=>{if(!t.target.closest(Wt.sidePanel.locationRoot))return;const n=R(Wt.sidePanel.locationInput);n?n.focus():yt.sendError({message:"upgradeAddLocationButton: failed to find location input"})})),tt`
    <style>
      ${Wt.sidePanel.goToPostButton} {
        font-size: 16px !important;
        font-weight: 600;
        text-transform: uppercase;
      }
      ${Wt.sidePanel.goToPostButton} * {
        font-family: inherit !important;
      }

      ${Wt.sidePanel.doneButton} {
        display: none;
      }

      ${Wt.sidePanel.editPostButton} {
        max-width: none !important;
      }
    </style>
  `,nt((()=>{B(Wt.confirmDialog.yes).forEach((t=>{t.click()}))})),nt((()=>{B(Wt.tooltip.bubble).forEach((t=>{const n=t.closest(Wt.tooltip.root);if(!n)return;const e=t.closest(Wt.tooltip.bubbleWrap);if(!e)return;const o=R(`#${n.dataset.ownerid}`);if(!o)return;const i=o.getBoundingClientRect();if(i.left<150&&e.classList.contains("uiContextualLayerLeft")){e.classList.remove("uiContextualLayerLeft"),e.classList.add("uiContextualLayerRight"),e.style.left=0,e.style.right=null,n.style.left=`${i.left+i.width}px`,n.style.right=null;const o=t.offsetWidth,s=t.offsetHeight;if(o>s)return;t.style.width=`${Math.round(.75*s)}px`}}))})),async function(){const t=window.inssist.schedule.requireModule,n=await t(Kt.MediaManagerDispatcher),e=n.dispatch;n.dispatch=(...t)=>{const o=t[0];if(o.type!==Kt.CLOSE_COMPOSER||o.fromInssist)return e.call(n,...t)}}(),gt.onRequest((({xhr:t,url:n,query:e,modifyUrl:o})=>{if(!n.includes(Kt["/media_manager/content_library"])&&!n.includes(Kt["/media_manager/media_manager_instagram_content"]))return;const i=new URL(n),s=e[Kt.post_type];s===Kt.POST_TYPE_IGTV?(i.searchParams.set(Kt.post_status,Kt.POST_STATUS_DRAFT),i.searchParams.set(Kt.limit,1),o(i.toString())):s===Kt.POST_TYPE_VIDEOS?(i.searchParams.set(Kt.post_type,Kt.POST_TYPE_ALL),i.searchParams.set(Kt.post_status,Kt.POST_STATUS_PUBLISHED),i.searchParams.set(Kt.limit,100),o(i.toString())):s===Kt.POST_TYPE_PHOTOS?(i.searchParams.set(Kt.post_type,Kt.POST_TYPE_ALL),i.searchParams.set(Kt.post_status,Kt.POST_STATUS_SCHEDULED),i.searchParams.set(Kt.limit,500),o(i.toString())):s===Kt.POST_TYPE_CAROUSELS&&(i.searchParams.set(Kt.post_type,Kt.POST_TYPE_ALL),i.searchParams.set(Kt.post_status,Kt.POST_STATUS_DRAFT),i.searchParams.set(Kt.limit,500),o(i.toString()))})),await async function(t){const n=window.inssist.schedule.requireModule,e=await n(Kt.immutable);Bt.main.dispatch({type:Kt.SELECT_IG_PROFILES,[Kt.selectedProfileIDs]:e.List([t.id])})}(pt.user),rn(),Bt.composer.onDispatch((t=>{t.type===Kt.TOGGLE_CROSSPOST_TO_FACEBOOK_CHECKBOX&&(pt.crosspostToFb=t.value)})),Bt.main.onDispatch((t=>{t.type===Kt.CONTENT_TABLE_REFRESH_ROWS_FINISHED&&Object.values(t[Kt.rowsByIDs]).forEach((t=>{jt(pt.allPosts,(n=>n.id===t.id)),pt.allPosts.push(t)}))})),Bt.main.onDispatch((t=>{if(t.type!==Kt.PUSH_NOTIFICATION)return;if(!(Kt.isSuccess in t[Kt.notificationData]))return;if(t[Kt.notificationData][Kt.isSuccess])return;const n=t[Kt.notificationData][Kt.notificationDataLabel].toString();U.send("schedule.fcs-notification-error-appeared",n)})),function(){const t=Symbol("handled");nt((()=>{const n=R(Wt.sidePanel.editPostBottomRow);n&&(n[t]||pt.selectedPostId&&(n[t]=!0,n.insertAdjacentHTML("afterbegin",'\n      <button class="delete-post-button">\n        <svg class="delete-post-button__icon" width="14" height="14" viewBox="0 0 14 14">\n          <path fill="none" d="M0 0h14v14H0z"/>\n          <path d="M3.099 14a.74.74 0 0 1-.779-.652L1.8 3.772h9.874l-.52 9.576a.74.74 0 0 1-.779.652zM.965 2.824V1.287A.489.489 0 0 1 1.454.8h3.357V.163A.163.163 0 0 1 4.974 0H8.5a.163.163 0 0 1 .165.163V.8h3.357a.489.489 0 0 1 .489.489v1.535z" fill="currentColor"/>\n        </svg>\n        <span class="delete-post-button__label">\n          DELETE POST\n        </span>\n      </button>\n    ')))})),Ht((t=>{t.target.closest(".delete-post-button")&&U.send("schedule.delete-post",pt.selectedPostId)})),tt`
    <style>
      .delete-post-button {
        height: 36px;
        line-height: 34px;
        font-size: 16px;
        color: #E34E21;
        background: #F5F5F5;
        font-weight: 600;
        padding: 0 22px;
        border-radius: 5px;
        cursor: pointer;
        border: 1px solid #EFEFEF;
        transition: filter 0.3s;
        white-space: nowrap;
      }
      .delete-post-button:hover {
        filter: brightness(95%);
      }
      .delete-post-button:active {
        filter: brightness(90%);
      }

      /* show uploading progress near delete post button */
      .delete-post-button + *:not(:last-child) {
        margin-right: auto;
        margin-left: 24px;
      }

      .delete-post-button__icon {
        margin-right: 4px;
        position: relative;
        top: 1px;
      }
    </style>
  `}(),en()}};let Wt,Kt;function Xt(t){location.href=t}async function Jt(t){const n=window.inssist.schedule.requireModule,e=await n(Kt.queryIGMediaData),o=await n(Kt.MediaManagerInstagramContentActions);await nn(),pt.selectedPostId=t;const i=await qt(e,t);"POSTED"===i.postStatus?(o.setShouldShowPostDetailTray(!0,i),Ut.restoreCaptionForCurrentPost()):(await rn(),o.editPost(i),Ut.restoreCaptionForCurrentPost())}async function Qt({postMode:t="publish",localPostId:n=null,localPostFiles:e=[]}){const o=Qt;pt.crosspostToFb=!1,pt.selectedPostId=n||null,await nn();const i=window.inssist.schedule.requireModule;await rn();(await i(Kt.MediaManagerInstagramComposerRootActions)).openComposer(Kt.IG_FEED_ORGANIC),Bt.main.dispatch({type:Kt.SELECT_INSTAGRAM_ACCOUNT,instagramAccount:pt.user}),Bt.composer.dispatch({type:Kt.SWITCH_POST_MODE,[Kt.isEditComposer]:!1,[Kt.postMode]:t}),Ut.restoreCaptionForCurrentPost(),0!==e.length&&(clearTimeout(o.timeout),o.timeout=setTimeout((()=>{Bt.composer.dispatch({type:Kt.FILES_ADDED,[Kt.files]:e})}),200))}function Zt(){location.reload()}async function tn(){return!!window.require}async function nn(){const t=window.inssist.schedule.requireModule;(await t(Kt.MediaManagerInstagramContentActions)).setShouldShowPostDetailTray(!1),Bt.composer.dispatch({type:Kt.SHOW_EXIT_COMPOSER_CONFIRM_DIALOG}),Bt.composer.dispatch({type:Kt.CLOSE_COMPOSER,fromInssist:!0})}function en(){const t=en,n=Bt.main;t.init||(t.init=!0,t.lastPostCount=0,n.onDispatch((e=>{if(t.refreshing&&e.type===Kt.SET_CONTENT_LIBRARY_DATA){const o=e.queryParameters.toJS().postType;if(!(o===Kt.POST_TYPE_VIDEOS||o===Kt.POST_TYPE_PHOTOS||o===Kt.POST_TYPE_CAROUSELS||o===Kt.POST_TYPE_IGTV))return;if(o===Kt.POST_TYPE_IGTV)return void n.dispatch({type:Kt.SELECT_CONTENT_TABLE,contentTable:Kt.INSTAGRAM_VIDEO_POSTS,source:Kt.instagram_content_library_posts});o===Kt.POST_TYPE_VIDEOS&&n.dispatch({type:Kt.SELECT_CONTENT_TABLE,contentTable:Kt.INSTAGRAM_PHOTO_POSTS,source:Kt.instagram_content_library_posts}),o===Kt.POST_TYPE_PHOTOS&&n.dispatch({type:Kt.SELECT_CONTENT_TABLE,contentTable:Kt.INSTAGRAM_CAROUSEL_POSTS,source:Kt.instagram_content_library_posts});const i=e.data.data.toJS();for(const t of i)jt(pt.allPosts,(n=>n.id===t.id)),pt.allPosts.push(t);if(o===Kt.POST_TYPE_CAROUSELS){if(t.lastPostCount-pt.allPosts.length>3)return t.lastPostCount=0,t.refreshing=!1,void en();t.lastPostCount=pt.allPosts.length,U.send("schedule.apply-fcs-posts",pt.allPosts),t.refreshing=!1}}}))),t.refreshing||(pt.allPosts.length=[],t.refreshing=!0,n.dispatch({type:Kt.SELECT_CONTENT_TABLE,contentTable:Kt.INSTAGRAM_IGTV_POSTS,source:Kt.instagram_content_library_posts}),n.dispatch({type:Kt.REFRESH_TAB,tab:Kt.instagram_content_posts}))}function on(){nt((()=>{B("video").forEach((t=>{t.hasAttribute("autoplay")&&(t.pause(),t.removeAttribute("autoplay"))}))}),!0)}function sn(){history.pushState=history.replaceState}async function rn(){const t=window.inssist.schedule.requireModule,n=await t(Kt.MediaManagerLazyLoadActions);await qt(n.lazyLoadSection,Kt.INSTAGRAM_COMPOSER)}var an={init:async function(){if(await kt.waitForInit(),await Bt.waitForInit(),!pt.user)return;cn=it.getConfig().fcsSelectors,ln=it.getConfig().fcs,Ht((t=>{t.target.closest(cn.upload.root)&&(t.target.closest("input")||t.target.closest("button")||dn(R(cn.upload.button)))})),tt`
    <style>
      ${cn.upload.root} {
        border-radius: 7px;
        user-select: none;
        cursor: pointer;
      }
      ${cn.upload.buttonWrap} {
        display: none;
      }
    </style>
  `,function(){const t=Symbol("handled");nt((()=>{const n=R(cn.upload.addContentButton);if(!n)return;const e=R(cn.sidePanel.mediaList);if(!e)return;const o=R(".add-media");o&&(o.style.display=e.childElementCount<10?null:"none"),e[t]||0!==e.childElementCount&&(e[t]=!0,e.insertAdjacentHTML("afterend",'\n      <div></div>\n      <button class="add-media" type="button">\n        <div class="add-media__icon">+</div>\n        ADD CONTENT\n      </button>\n    '),R(".add-media").addEventListener("click",(()=>{dn(n)})))})),tt`
    <style>
      ${cn.upload.addContentButtonWrap} {
        visibility: hidden;
        position: fixed;
        left: -10000px;
      }

      .add-media {
        display: flex;
        align-items: center;
        height: 36px;
        padding: 0 20px;
        color: #FFF;
        background: #A5AAAF;
        margin-top: 12px;
        margin-left: 0 !important;
        margin-right: 16px !important;
        float: left;
      }

      .add-media__icon {
        font-size: 25px;
        margin-right: 8px;
      }
    </style>
  `}(),tt`
    <style>
      ${cn.sidePanel.coverSelectionRadioBox} {
        position: relative;
        top: 2px;
      }
    </style>
  `,nt((()=>{B(cn.sidePanel.uploadingVideo).forEach((t=>{t.controls=!0}))})),tt`
    <style>
      ${cn.sidePanel.uploadingVideoPlayButton} {
        display: none !important;
      }

      ${cn.sidePanel.uploadingVideoCustomControls} {
        display: none !important;
      }
    </style>
  `,function(){const t=Symbol("handled");nt((()=>{B(cn.sidePanel.mediaPreviewVideo).forEach((n=>{n[t]||(n[t]=!0,n.setAttribute("disablePictureInPicture",""),n.setAttribute("controlslist","nodownload"))}))})),tt`
    <style>
      ${cn.sidePanel.mediaPreviewVideo}::-webkit-media-controls-fullscreen-button {
        display: none;
      }
    </style>
  `}(),function(){const t=Symbol("handled");nt((()=>{const n=R(".add-media");if(!n)return;const e=R(cn.sidePanel.mediaList);if(!e)return;const o=R(".reverse-media-list-button");if(o&&(o.style.display=e.childElementCount>1?null:"none"),n[t])return;n[t]=!0,n.insertAdjacentHTML("afterend",'\n      <button class="reverse-media-list-button" type="button">\n        <span class="reverse-media-list-button__icon">↪︎</span>\n        REVERSE\n      </button>\n    ');R(".reverse-media-list-button").addEventListener("click",(async()=>{try{const t=window.inssist.schedule.requireModule,n=(await t(ln.MediaManagerInstagramComposerUploadStore)).getState().toObject().fileMap.toObject(),e=Object.keys(n);if(e.length<2)return;e.forEach(((t,n)=>{Bt.composer.dispatch({type:ln.SUBMIT_MEDIA_ORDER,[ln.mediaOrderId]:t,[ln.prevIndex]:0,[ln.newIndexString]:String(e.length-n),[ln.totalMedia]:e.length})}))}catch(t){console.error("schedule injection media controller →","addReverseMediaButton",t)}}))})),tt`
    <style>
      #creator_studio_sliding_tray_root button[type="button"].reverse-media-list-button {
        display: flex;
        align-items: center;
        height: 36px;
        padding: 0 20px;
        color: #1BA2F9 !important;
        background: #F5F5F5 !important;
        border: 1px solid #EFEFEF !important;
        margin-top: 12px;
        margin-left: 0;
        float: left;
      }

      .reverse-media-list-button__icon {
        position: relative;
        top: 3px;
        font-size: 17px;
        margin-right: 8px;
      }
    </style>
  `}(),async function(){const t=window.inssist.schedule.requireModule,n=await t(ln.ImageExifRotation);if(!n)return;n.getRotation=(t,n)=>(n&&"function"==typeof n&&n(0),0)}()}};let cn,ln;function dn(t){t||yt.throwError({message:"startUpload: failed to find upload button"}),t.click();const n=R(cn.upload.input);n||yt.throwError({message:"startUpload: failed to find upload input"});const e=n.closest(cn.tooltip.root);e||yt.throwError({message:"startUpload: failed to find upload tooltip"}),e.style.opacity=0,e.style.pointerEvents="none",n.click()}var un={init:async function(){if(pn=it.getConfig().fcsSelectors,fn=it.getConfig().fcs,await kt.waitForInit(),await Bt.waitForInit(),!pt.user)return;(function(){let t,n;nt((()=>{t=B(pn.sidePanel.mediaPreview),n=R(pn.sidePanel.mediaPreviewVideo)})),gt.onRequest((({url:e,onResponse:o})=>{if(!function(t){return t.includes(fn["/media/manager/instagram_composer/create_post"])}(e))return;let i,s;i=t.length>1?"carousel":n?"video":"photo",t.length?s=t[0].getAttribute("src"):console.error("failed to find media preview image"),U.send("schedule.fcs-create-post-request",{type:i,image:s,crosspostToFb:pt.crosspostToFb,localPostId:pt.selectedPostId||null}),o((()=>{U.send("schedule.fcs-create-post-response",{image:s})}))})),gt.onRequest((({url:t,query:n,onResponse:e})=>{if(!function(t){return t.includes(fn["/media/manager/instagram_media/edit/save"])}(t))return;const o=pt.selectedPostId;let i,s;"true"===n[fn["edit_data[save_as_draft]"]]?(i=null,s="draft"):"true"===n[fn["edit_data[save_as_scheduled]"]]?(i=hn,s="scheduled"):(i=null,s="posted"),U.send("schedule.fcs-edit-post-request",{postId:o,status:s,on:i}),e((t=>{U.send("schedule.fcs-edit-post-response",{postId:o})}))}))})(),function(){const t=10;tt`
    <style>
      ${pn.dateDialog.root} {
        position: fixed;
        left: 10000px;
      }
    </style>
  `;let n=!1;nt((()=>{const t=R(pn.dateDialog.rootOpen);(!n&&t||n&&!t)&&(n=!n,U.send("schedule.fcs-date-dialog-toggled",n))}));const e=Symbol("handled");nt((()=>{const n=R(pn.sidePanel.save);n&&(n[e]||n.nextElementSibling&&(n[e]=!0,n.addEventListener("click",(n=>{const e=Date.now()+t*St;"schedule"===gn&&(!hn||hn<e)&&(n.preventDefault(),n.stopPropagation(),U.send("schedule.fcs-date-dialog-invalid-time"))}),!0)))}))}(),async function(){const t=async()=>await U.send("schedule.has-pro"),n=Symbol("handled");nt((()=>{const e=R(pn.sidePanel.save);if(!e)return;if(e[n])return;e[n]=!0;let o=!0;e.addEventListener("click",(n=>{o?(n.preventDefault(),n.stopPropagation(),(async()=>{if(await t())return o=!1,void e.click();const n=R(pn.sidePanel.dateDialogTrigger);n&&n.click(),U.send("schedule.show-upsell")})()):o=!0}),!0)}))}(),U.on("schedule.fcs-date-dialog-get-timezone",mn),U.on("schedule.fcs-date-dialog-select-option",_n),U.on("schedule.fcs-date-dialog-set-selected-option",bn),U.on("schedule.fcs-date-dialog-set-publish-time",yn)}};let pn,fn,hn=null,gn=null;function mn(){const t=window.require(fn.DateTime).localNow().getTimezoneID();return window.require(fn.TimezoneNamesData).zoneNames[t]}function _n(t){const n={"publish-now":fn.postModePublish,"save-as-draft":fn.postModeDraft,schedule:fn.postModeSchedule}[t],e={type:fn.SWITCH_POST_MODE,[fn.postMode]:n};Bt.composer.dispatch({...e,[fn.isEditComposer]:!1}),Bt.composer.dispatch({...e,[fn.isEditComposer]:!0})}function bn(t){gn=t}function yn(t){if(hn=t,!hn)return;const n={type:fn.SELECT_SCHEDULED_DATE,[fn.scheduledDate]:new Date(hn)};Bt.composer.dispatch({...n,[fn.isEditComposer]:!1}),Bt.composer.dispatch({...n,[fn.isEditComposer]:!0})}var vn={init:async function(){if(await kt.waitForInit(),!pt.user)return;if(pt.user.connectedPageInfo)return;wn=it.getConfig().fcsSelectors,function(){const t=Symbol("handled");nt((async()=>{const n=R(wn.sidePanel.sidebar);if(!n)return;if(n[t])return;n[t]=!0;const e=R(wn.sidePanel.body);if(!e)return;s.classList.remove("crossposting--tab-open"),s.classList.remove("crossposting--connecting");if(!await U.send("schedule.is-creating-post"))return;n.insertAdjacentHTML("beforeend",'\n      <div class="crossposting-tab">\n        <div class="crossposting-tab__header">\n          <svg class="crossposting-tab__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">\n            <path d="M500 10C230.5 10 10 230.5 10 500s220.5 490 490 490V622.5H377.5V500H500v-91.9c0-85.8 67.4-153.1 153.1-153.1h153.1v122.5H653.1c-18.4 0-30.6 12.3-30.6 30.6V500h168.4l-30.6 122.5H622.5v352.2C833.8 919.6 990 729.7 990 500c0-269.5-220.5-490-490-490z" fill="currentColor"/>\n          </svg>\n          <div class="crossposting-tab__title">\n            Setup FB Crossposting\n          </div>\n        </div>\n        <div class="crossposting-tab__decription">\n          Crosspost the same content to Instagram and\n          a Facebook page by connecting Instagram to FB.\n        </div>\n      </div>\n    '),e.insertAdjacentHTML("afterbegin",'\n      <div class="crossposting-body">\n        <div class="crossposting-body__title">\n          Setup FB Crossposting\n        </div>\n        <div class="crossposting-body__instruction">\n          To enable cross-posting, connect your Instagram account to a Facebook page:\n          <ol class="crossposting-body__list">\n            <li class="crossposting-body__list-item">\n              Login to <a href="https://facebook.com?elcw" target="_blank">Facebook.com</a>.\n            </li>\n            <li class="crossposting-body__list-item">\n              Connect Instagram account to the Facebook page. You can do that with Instagram Mobile App:\n              <div class="crossposting-body__path">\n                Settings → Business / Creator → Connect a Facebook Page\n              </div>\n              Or from <a href="https://facebook.com" target="_blank">Facebook website</a>\n              by navigating to your Facebook page settings:\n              <div class="crossposting-body__path">\n                Page Settings → Instagram → Connect\n              </div>\n            </li>\n            <li class="crossposting-body__list-item">\n              Click “Verify Connection” below.\n            </li>\n          </ol>\n        </div>\n        <div class="crossposting-body__footer">\n          <button class="crossposting-body__button">\n            VERIFY CONNECTION\n          </button>\n          <svg class="crossposting-body__spinner" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">\n            <path d="M10 0a10.363 10.363 0 011.635.133A10.009 10.009 0 1110 0z" fill="#d8dadd"/>\n            <path d="M9.801 10.2V0a10.493 10.493 0 012.545.312 10.352 10.352 0 012.314.888 10.373 10.373 0 013.623 3.178L9.801 10.2z" fill="#1ba2f9"/>\n            <circle cx="8" cy="8" r="8" transform="translate(2 2)" fill="#fff"/>\n          </svg>\n        </div>\n      </div>\n    ');R(".crossposting-tab").addEventListener("click",(()=>{s.classList.add("crossposting--tab-open")}));R(".crossposting-body__button").addEventListener("click",(async()=>{s.classList.add("crossposting--connecting"),await U.send("chrome-bus","schedule.connect-to-fcs-with-crossposting"),s.classList.remove("crossposting--connecting")}))})),document.addEventListener("click",(t=>{t.target.closest(wn.sidePanel.sidebarTab)&&s.classList.remove("crossposting--tab-open")})),tt`
    <style>
      ${wn.sidePanel.body} {
        position: relative;
      }

      html.crossposting--tab-open ${wn.sidePanel.bodyContent} {
        display: none;
      }

      .crossposting-tab {
        padding: 12px 16px 20px 16px;
        border-left: 2px solid transparent;
        line-height: 17px;
        cursor: pointer;
        user-select: none;
      }
      .crossposting-tab:hover {
        background: #f5f6f7;
        border-left-color: #bec3c9;
      }
      .crossposting--tab-open .crossposting-tab {
        border-left-color: #3578e5;
        background: #fff;
      }

      .crossposting-tab__header {
        display: flex;
        align-items: center;
      }

      .crossposting-tab__icon {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        color: rgba(0, 0, 0, 0.45);
        margin-right: 8px;
        position: relative;
        top: -2px;
      }
      .crossposting--tab-open .crossposting-tab__icon {
        color: #1461cc;
      }

      .crossposting-tab__title {
        color: rgba(0, 0, 0, 0.45);
        font-weight: 700;
        font-size: 14px;
      }
      .crossposting--tab-open .crossposting-tab__title {
        color: #1461cc;
      }

      .crossposting-tab__decription {
        margin-top: 4px;
        color: rgba(0, 0, 0, 0.55);
        font-size: 14px;
        line-height: 20px;
      }

      .crossposting-body {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #fff !important;
        padding: 0 24px;
      }
      html:not(.crossposting--tab-open) .crossposting-body {
        display: none;
      }

      .crossposting-body__title {
        color: rgba(0, 0, 0, 0.85);
        font-size: 18px;
        font-weight: 700;
        line-height: 24px;
        margin-bottom: 20px;
      }

      .crossposting-body__instruction {
        margin-bottom: 24px;
        font-size: 14px;
        line-height: 20px;
      }

      .crossposting-body__instruction a {
        color: #1BA2F9 !important;
      }
      .theme-night .crossposting-body__instruction a {
        filter: url(#theme-reverse-filter);
      }

      .crossposting-body__list {
        padding-left: 23px;
        margin-top: 12px;
        margin-bottom: 0;
      }

      .crossposting-body__list-item {
        margin-bottom: 12px;
      }
      .crossposting-body__list-item:last-child {
        margin-bottom: 0;
      }

      .crossposting-body__path {
        margin: 5px 0 10px;
        font-size: 13px;
        font-weight: 500;
      }
      .crossposting-body__path:last-child {
        margin-bottom: 0;
      }

      .crossposting-body__footer {
        display: flex;
        align-items: center;
      }

      .crossposting-body__button {
        color: #fff;
        background: #1BA2F9;
        border: none;
        font-size: 16px;
        border-radius: 4px;
        padding: 8px 16px;
        font-weight: 500;
        cursor: pointer;
      }
      .crossposting--connecting .crossposting-body__button {
        opacity: 0.6;
        pointer-events: none;
      }
      .theme-night .crossposting-body__button {
        filter: url(#theme-reverse-filter);
      }

      .crossposting-body__spinner {
        margin-left: 16px;
        display: none;
        animation-name: -crossposting-body__spin;
        animation-duration: 1s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
      }
      .crossposting--connecting .crossposting-body__spinner {
        display: block;
      }
      .theme-night .crossposting-body__spinner {
        filter: url(#theme-reverse-filter);
      }
      .theme-night .crossposting-body__spinner path:first-child {
        fill: #000;
      }
      .theme-night .crossposting-body__spinner circle {
        fill: #303134;
      }

      @keyframes -crossposting-body__spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }

      html.crossposting--tab-open ${wn.sidePanel.sidebarTab}  {
        border-left-color: transparent !important;
        background: transparent !important;
      }
      html.crossposting--tab-open ${wn.sidePanel.sidebarTab}:hover {
        background: #f5f6f7 !important;
        border-left-color: #bec3c9 !important;
      }

      html.crossposting--tab-open ${wn.sidePanel.sidebarTabIcon} {
        filter: grayscale(1);
      }

      html.crossposting--tab-open ${wn.sidePanel.sidebarTabTitle} {
        color: rgba(0,0,0,0.45) !important;
      }
    </style>
  `}()}};let wn;var Pn={init:async function(){if(await kt.waitForInit(),await Bt.waitForInit(),!pt.user)return;Tn=it.getConfig().fcsSelectors,En=it.getConfig().fcs,tt`
    <style>
      ${Tn.sidePanel.postToFbRoot} {
        display: none;
      }
    </style>
  `;const t=pt.user.connectedPageInfo;if(!t)return;t.url=`https://facebook.com/${t.name}-${t.id}`;t.name.toLowerCase().startsWith("inssist:")||(function(t){const n=Symbol("handled");nt((()=>{const t=R(Tn.sidePanel.postToFbCheckboxRow);if(!t)return;const n=!!R(Tn.sidePanel.mediaList);t.style.opacity=n?null:.5}),!0),nt((()=>{const e=R(Tn.sidePanel.postToFbTitle);e&&!e[n]&&(e[n]=!0,e.innerText="Clone to Facebook");const o=R(Tn.sidePanel.postToFbBody);o&&!o[n]&&(o[n]=!0,o.innerHTML=`\n        <div class="post-to-fb__text">\n          Post will be cloned to Facebook Page. Facebook posts\n          can be managed separately from the\n          <a\n            class="post-to-fb__link"\n            href="${t.url}/publishing_tools"\n            target="_blank">\n            Facebook Publishing Tools</a>.\n        </div>\n      `)}),!0),nt((()=>{const t=R(Tn.sidePanel.postToFbCheckboxRow);if(!t)return;if(t[n])return;t[n]=!0;const e=R(Tn.sidePanel.postToFbCheckboxButton);e&&t.addEventListener("click",(t=>{t.target.closest(Tn.sidePanel.postToFbCheckboxButton)||e.click()}))})),tt`
    <style>
      ${Tn.sidePanel.postToFbRoot} {
        display: block !important;
        margin-top: 40px;
        padding-bottom: 80px;
      }

      html ${Tn.sidePanel.postToFbPublishTypeButton} {
        display: none;
      }

      ${Tn.sidePanel.postToFbCheckboxRow} {
        margin-top: 10px;
        margin-left: -7px;
        cursor: pointer;
        user-select: none;
      }

      ${Tn.sidePanel.postToFbCheckboxButton} {
        background: transparent !important;
        border: 1px solid #DADDE1 !important;
      }
      .theme-night ${Tn.sidePanel.postToFbCheckboxButton} {
        border-color: #464646 !important;
      }

      ${Tn.sidePanel.postToFbCheckboxText} {
        pointer-events: none;
      }

      ${Tn.sidePanel.postToFbBody} {
        margin-top: 10px;
        margin-left: 0;
      }

      .post-to-fb__text {
        line-height: 19px;
        width: 380px;
      }

      .post-to-fb__link {
        color: #1BA2F9;
        text-decoration: none !important;
      }
    </style>
  `}(t),function(){let t,n;U.on("schedule.fcs-date-dialog-set-selected-option",(n=>{t=n,e()})),U.on("schedule.fcs-date-dialog-set-publish-time",(t=>{n=t,e()})),Bt.composer.onDispatch((t=>{t.type===En.TOGGLE_CROSSPOST_TO_FACEBOOK_CHECKBOX&&e()}));const e=()=>{"save-as-draft"===t?Bt.composer.dispatch({type:En.SWITCH_CROSSPOST_POST_MODE,[En.postMode]:En.postModeDraft}):"publish-now"===t?Bt.composer.dispatch({type:En.SWITCH_CROSSPOST_POST_MODE,[En.postMode]:En.postModePublish}):"schedule"===t&&(Bt.composer.dispatch({type:En.SWITCH_CROSSPOST_POST_MODE,[En.postMode]:En.postModeSchedule}),n&&Bt.composer.dispatch({type:En.SELECT_CROSSPOST_SCHEDULED_DATE,[En.scheduledDate]:new Date(n)}))}}(),function(t){const n=Symbol("handled");nt((async()=>{const e=R(".delete-post-button");if(!e)return;if(e[n])return;e[n]=!0;const o=await U.send("schedule.get-post",pt.selectedPostId);if(!o)return;if(!o.crosspostToFb)return;let i;i="draft"===o.status?`${t.url}/publishing_tools?section=DRAFTS`:"scheduled"===o.status?`${t.url}/publishing_tools?section=SCHEDULED_POSTS`:`${t.url}/publishing_tools`,e.insertAdjacentHTML("afterend",`\n      <a\n        class="manage-fb-posts-link"\n        href="${i}"\n        target="_blank">\n        MANAGE FACEBOOK POSTS\n      </a>\n      <div style="flex-grow: 1"></div>\n    `)}),!0),tt`
    <style>
      .manage-fb-posts-link {
        margin-left: 30px;
        font-size: 16px;
        line-height: 19px;
        font-weight: 600;
        color: #1BA2F9;
        text-decoration: none !important;
        -webkit-font-smoothing: antialiased;
      }
    </style>
  `}(t))}};let Tn,En;function Sn(t,n=null){try{const e=t();return e instanceof Promise?new Promise(((t,o)=>{e.then(t).catch((e=>{e&&console.error(e),t(n)}))})):e}catch(t){return console.error(t),n}}var xn={init:async function(){Cn=it.getConfig().fcsSelectors,function(){const t=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(...n){const e=n[1];return(null==e?void 0:e.includes("/media/manager/instagram_composer/video_upload/"))&&(On.uploadRequestStarted=!0,On.uploadResponseTexts=[],this.addEventListener("readystatechange",(()=>{On.uploadResponseTexts.push(this.responseText||"")}))),t.call(this,...n)}}(),function(){let t=null;nt((()=>{const n=R(Cn.sidePanel.uploadProgress);if(n){if("99.9%"===n.innerText){if(t)return;t=setInterval((()=>{document.body.contains(n)?U.send("chrome-bus","schedule.upload-99",function(){const t=window.require;return{gkx:Sn((()=>t("gkx")("1509806")),"failed"),asyncUpload:Sn((()=>t("killswitch")("MEDIA_MANAGER_INSTAGRAM_ASYNC_UPLOAD")),"failed"),requestOption:Sn((()=>t("AsyncRequest").toString().split("this.option=")[1].split("}")[0]+"}"),"failed"),uploadResponseTexts:On.uploadResponseTexts,uploadRequestStarted:On.uploadRequestStarted}}()):(clearInterval(t),t=null,On.uploadRequestStarted=!1)}),1e3)}if("100%"===n.innerText){if(!t)return;clearInterval(t),t=null,On.uploadRequestStarted=!1,U.send("chrome-bus","schedule.upload-100")}}}))}()}};let Cn;const On={uploadResponseTexts:[],uploadRequestStarted:!1};var Mn={init:async function(){const t=window.inssist.schedule.requireModule;if(Ln=await t("MediaManagerDispatcher"),In=await t("MediaManagerMediaCroppingActions"),kn=await t("MediaManagerMediaCroppingRatioSettings"),Fn=await t("MediaManagerMediaCroppingDialogCropBox.react"),!(Ln&&In&&kn&&Fn))return;(async function(){const t=In.openDialog;In.openDialog=(...n)=>{try{const t=n[4];t.push(kn.FREEFORM),t[0].label="1:1",t[1].label="1.91:1",t[2].label="4:5",t[3].label="Any",t[3].description="Choose any aspect ratio from 1.91:1 to 4:5."}catch(t){console.error("failed to patch ratio options",t)}return t.call(In,...n)}})(),function(){let t;const n=Fn.prototype.render;Fn.prototype.render=function(...e){return t=this,n.call(this,...e)};const e=Ln.dispatch;Ln.dispatch=n=>{if("MEDIA_CROPPING_DIALOG_SET_DIMENSIONS"===n.type)try{const e=n.dimensions,o=e.width/e.height;if(o<.8){const n=Math.floor(e.width/.8);e.height=n,t.setState({height:n})}else if(o>1.91){const n=Math.floor(1.91*e.height);e.width=n,t.setState({width:n})}}catch(t){console.error("failed to automatically adjust ratio",t)}return e.call(Ln,n)}}()}};let Ln,In,kn,Fn;var An={init:async function(){window.ctx=pt,gt.init(),Mt.init(),Bt.init(),kt.init(),Yt.init(),an.init(),un.init(),vn.init(),Pn.init(),Ut.init(),xn.init(),Mn.init()}};var Dn={init:function(){window.addEventListener("focus",Rn),window.addEventListener("blur",Bn)}};function Rn(){U.send("dnd-iframe-fix.focus")}function Bn(){U.send("dnd-iframe-fix.blur")}var $n={init:async function(){Nn=it.getConfig().fcsSelectors,U.on("tag-assist.fcs-set-caption",qn),async function(){await Bt.waitForInit(),Bt.main.onDispatch((t=>{"OPEN_COMPOSER"===t.type||"CONTENT_INSTAGRAM_EDIT_POST"===t.type?U.send("tag-assist.fcs-composer-opened"):"CLOSE_COMPOSER"===t.type&&U.send("tag-assist.fcs-composer-closed")}))}(),async function(){let t=null;const n=()=>{const n=dt.getCaption();n!==t&&(t=n,U.send("tag-assist.fcs-caption-change",n))},e=Symbol("handled");nt((()=>{const t=R(Nn.sidePanel.captionTextarea);t&&(n(),t[e]||(t[e]=!0,t.addEventListener("input",n),t.addEventListener("keydown",n)))}))}()}};let Nn;function qn(t){dt.setCaption(t)}var Hn={init:function(){if(jn=!!window.electron,zn=n.isIframe()&&n.getParams().isElectron,!jn&&!zn)return;jn&&U.on("electron-links.open-url",Un);document.addEventListener("click",(t=>{const n=t.target.closest("a");if(!n)return;if("_blank"!==n.getAttribute("target"))return;const e=n.getAttribute("href");e.startsWith("/")||(t.preventDefault(),t.stopPropagation(),zn?U.send("electron-links.open-url",e):Un(e))}),{capture:!0})}};let jn,zn;function Un(t){chrome.tabs.create({url:t,active:!0})}({init:async function(){Hn.init(),n.isIframe("inssist-fcs")&&(await o(),at.initForFcs(),Dn.init(),An.init(),$n.init())}}).init()}();