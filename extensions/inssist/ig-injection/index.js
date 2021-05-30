!function(){function t(t,e,n){Object.defineProperty(t,e,{get:n,enumerable:!0})}var e={get:function(t,e){const n=localStorage.getItem(t);if(null==n)return e;if("true"===n)return!0;if("false"===n)return!1;if(n.startsWith("[")||n.startsWith("{"))return JSON.parse(n);const o=Number(n);if(!Number.isNaN(o))return o;return n},set:function(t,e){try{"string"==typeof e?localStorage.setItem(t,e):localStorage.setItem(t,JSON.stringify(e))}catch(n){console.error("local-storage-json: failed to set",{key:t,value:e,details:n})}},has:function(t){return t in localStorage},remove:function(t){localStorage.removeItem(t)}};function n(t){try{return JSON.parse(t)}catch(t){return null}}var o={createName:function(t,e){return`${t}|${JSON.stringify(e)}`},getName:i,getParams:function(){return n(window.self.name.split("|")[1])||{}},isIframe:function(t=null){return window.self!==parent&&(!t||i()===t)}};function i(){return window.self.name.split("|")[0]||null}async function r(){a()||await new Promise((t=>{document.addEventListener("readystatechange",(function e(){a()&&(document.removeEventListener("readystatechange",e),t())}))}))}function a(){return"interactive"===document.readyState||"complete"===document.readyState}async function s(t,e=null){let n,o;return"number"==typeof e?(n=e,o=100):e?(n=e.timeout||3e4,o=e.frequency||100):(n=3e4,o=100),new Promise(((e,i)=>{const r=t();if(r)return void e(r);const a=setInterval((()=>{const n=t();n&&(clearInterval(a),e(n))}),o);setTimeout((()=>{clearInterval(a),e(null)}),n)}))}function l(t){return Array.isArray(t)?t:[t]}function d(...t){const e=function(t,...e){let n=0;return t.join("###").split(",").join("\n,\n").split("{").join("\n{").split("\n").map((t=>{if(!t.includes("###"))return t;const o=l(e[n]).map((e=>t.split("###").join(e))).join(",\n");return n+=1,o})).join("\n")}(...t);document.head.insertAdjacentHTML("afterbegin",e)}var c=Object.assign((function(t,e=!1){0===p.length&&(u=new MutationObserver((t=>{for(const e of p){if(u.disconnect(),e(t),!u)return;u.observe(document.documentElement,{attributes:!0,childList:!0,subtree:!0})}})),u.observe(document.documentElement,{attributes:!0,childList:!0,subtree:!0}));p.push(t),e&&t()}),{off:function(t){const e=p.indexOf(t);if(-1===e)return;p.splice(e,1),0===p.length&&(u.disconnect(),u=null)}});const p=[];let u;function g(t,e=document){t=l(t);for(const n of t){const t=e.querySelector(n);if(t)return t}return null}function f(t,e=document){t=l(t);for(const n of t){const t=e.querySelectorAll(n);if(t.length)return Array.from(t)}return[]}var m={},h={},b={},v={},y=1;v={nextValue:function(){return(y=(9301*y+49297)%233280)/233280},seed:function(t){y=t}};var w,x,_,k="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";function E(){_=!1}function C(t){if(t){if(t!==w){if(t.length!==k.length)throw new Error("Custom alphabet for shortid must be "+k.length+" unique characters. You submitted "+t.length+" characters: "+t);var e=t.split("").filter((function(t,e,n){return e!==n.lastIndexOf(t)}));if(e.length)throw new Error("Custom alphabet for shortid must be "+k.length+" unique characters. These characters were not unique: "+e.join(", "));w=t,E()}}else w!==k&&(w=k,E())}function P(){return _||(_=function(){w||C(k);for(var t,e=w.split(""),n=[],o=v.nextValue();e.length>0;)o=v.nextValue(),t=Math.floor(o*e.length),n.push(e.splice(t,1)[0]);return n.join("")}())}b={get:function(){return w||k},characters:function(t){return C(t),w},seed:function(t){v.seed(t),x!==t&&(E(),x=t)},lookup:function(t){return P()[t]},shuffled:P};var S="object"==typeof window&&(window.crypto||window.msCrypto),$=S&&S.getRandomValues?function(t){return S.getRandomValues(new Uint8Array(t))}:function(t){for(var e=[],n=0;n<t;n++)e.push(Math.floor(256*Math.random()));return e},A=function(t,e,n){for(var o=(2<<Math.log(e.length-1)/Math.LN2)-1,i=-~(1.6*o*n/e.length),r="";;)for(var a=t(i),s=i;s--;)if((r+=e[a[s]&o]||"").length===+n)return r};var T,L,R=function(t){for(var e,n=0,o="";!e;)o+=A($,b.get(),1),e=t<Math.pow(16,n+1),n++;return o};var M=function(t){var e="",n=Math.floor(.001*(Date.now()-1567752802062));return n===L?T++:(T=0,L=n),e+=R(7),e+=R(t),T>0&&(e+=R(T)),e+=R(n)};var I,F=function(t){return!(!t||"string"!=typeof t||t.length<6)&&!new RegExp("[^"+b.get().replace(/[|\\{}()[\]^$+*?.-]/g,"\\$&")+"]").test(t)},D=!1;var z=(D||(D=!0,I={},I=0),I||0);function B(){return M(z)}var O=B;(h=B).generate=O;var H=function(t){return b.seed(t),h};h.seed=H;var j=function(t){return z=t,h};h.worker=j;var N=function(t){return void 0!==t&&b.characters(t),b.shuffled()};h.characters=N;var V=F;h.isValid=V,m=h;var W={on:function(t,e){G();(q[t]||(q[t]=[])).push(e)},off:function(t,e){const n=q[t];if(!n)return;for(;;){const t=n.findIndex((t=>t===e));if(-1===t)break;n.splice(t,1)}},send:function(t,...e){let n;const o=e[e.length-1];"function"==typeof o?(n=o,e=e.slice(0,-1)):n=null;return new Promise((o=>{chrome.runtime.sendMessage({[Y]:t,[X]:e},(t=>{chrome.runtime.lastError||t!==U&&(n&&n(t),o(t))}))}))}};const U="__chromeBus.EMPTY_RESPONSE",q={},Y="__chromeBus.name",X="__chromeBus.args";function G(){const t=G;t.init||(t.init=!0,chrome.runtime.onMessage.addListener(((t,e,n)=>{const o=t["__chromeBus.name"];if(!o)return!1;const i=t["__chromeBus.args"]||[],r=q[o]||[];return 0===r.length?(n(U),!0):((async()=>{const t=await Promise.all(r.map((t=>t(...i)))),e=t[t.length-1];n(e)})(),!!n)})))}var J={init:function(){W.on("iframe-bus",((t,...e)=>it(t,...e))),et("chrome-bus",((t,...e)=>W.send(t,...e)))},on:et,once:nt,off:ot,send:it,wait:async function(t){return await new Promise((e=>{nt(t,e)}))}};const K="__iframeBus.name",Z="__iframeBus.args",Q="__iframeBus.callbackId",tt=parent!==window;function et(t,e){const n=rt(t),o=e["__iframeBus.handlers"]||(e["__iframeBus.handlers"]={});o[t]=async o=>{if(o.data["__iframeBus.name"]===n){const n=o.data["__iframeBus.args"]||[],i=o.data["__iframeBus.callbackId"]||null,r=await e(...n);i&&it(`${t}:response-${i}`,r)}},window.addEventListener("message",o[t])}function nt(t,e){et(t,(function n(...o){return ot(t,n),e(...o)}))}function ot(t,e){const n=e["__iframeBus.handlers"]||(e["__iframeBus.handlers"]={});window.removeEventListener("message",n[t])}async function it(t,...e){let n;const o=e[e.length-1];"function"==typeof o?(n=o,e=e.slice(0,-1)):n=null;const i=t.includes(":response-"),r=rt(t),a=i?null:m.generate();if(tt?parent.postMessage({[K]:r,[Z]:e,[Q]:a},"*"):f("iframe").forEach((t=>{t.contentWindow.postMessage({[K]:r,[Z]:e,[Q]:a},"*")})),!i)return new Promise((e=>{const o=i=>{n&&n(i),ot(`${t}:response-${a}`,o),e(i)};et(`${t}:response-${a}`,o)}))}function rt(t){return`iframe-bus.${t}`}var at={getConfig:function t(){const e=t;if(!e.config){const t=o.getParams();e.config=t.fusionConfig}return e.config}};async function st(t){await r();const e=window.inssist.moduleInterceptor,n=await async function(t){return await s(t,3e3)}((()=>e.getModule(t)));return n||console.error(`ig: failed to require ${t}`),n}function lt(t,e=null){try{const n=t();return n instanceof Promise?new Promise(((t,o)=>{n.then(t).catch((n=>{n&&console.error(n),t(e)}))})):n}catch(t){return console.error(t),e}}var dt={init:async function(){(async function(){ct=await J.send("dm.ghost-mode:is-enabled"),J.on("dm.ghost-mode:toggled",(t=>{ct=t}))})(),async function(){const t=await st("store"),e=await st("dm-state-proxy"),n=await st("dm-thread-actions"),o=lt((()=>n.markSeen),null);if(!(t&&e&&n&&o))return void J.send("dm.ghost-mode:failed",{store:!!t,stateProxy:!!e,threadActions:!!n,markSeen:!!o});n.markSeen=(...i)=>{var r;const a=null===(r=i[2])||void 0===r?void 0:r.ignoreGhostMode;if(ct&&!a){const n=i[0],o=t.getState();return!e.getThreadSeenByViewer(o,n)&&J.send("dm.ghost-mode:increment-trial-usage",2),()=>{}}return o.call(n,...i)}}()}};let ct=!1;var pt={init:async function(){const t=at.getConfig().dmSelectors,e=await st("store");if(!e)return;const n=Symbol("handled");c((()=>{const o=f('[id^="message-"]').filter((t=>!t[n]));if(0===o.length)return;const i=JSON.parse(JSON.stringify(e.getState()));o.forEach((e=>{var o;e[n]=!0;const r=g(t.general.messageBody,e);if(!r)return;const a=e.id.replace("message-",""),s=i.direct.messages[a];if("raven_media"!==s.item_type)return;localStorage.logRavenMessages&&console.warn({ravenMessage:s});const l=(null==s?void 0:s.raven_media)||(null==s||null===(o=s.visual_media)||void 0===o?void 0:o.media);if(l)if(l.video_versions){const t=l.video_versions[0].url;r.outerHTML=`\n          <a class="raven-media-link" href="${t}" target="_blank">\n            PEEK AT VIDEO\n          </a>\n        `}else if(l.image_versions2){const t=l.image_versions2.candidates[0].url;r.outerHTML=`\n          <a class="raven-media-link" href="${t}" target="_blank">\n            PEEK AT PHOTO\n          </a>\n        `}else{var d;const t=null==s||null===(d=s.visual_media)||void 0===d?void 0:d.replay_expiring_at_us;t&&new Date(t/1e3).getTime()<Date.now()?r.innerHTML='\n            <div class="raven-media-unavailable">\n              This message has expired or has been viewed already.\n            </div>\n          ':r.innerHTML='\n            <div class="raven-media-unavailable">\n              This message can not be viewed or is no longer available.\n            </div>\n          '}}))})),d`
    <style>
      .raven-media-link {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-weight: 600;
        font-size: 13px;
        color: #1BA2F9 !important;
      }

      .raven-media-link::before {
        content: '';
        width: 0;
        height: 0;
        flex-shrink: 0;
        margin-right: 3px;
        border: 5px solid transparent;
        border-radius: 1px;
        border-left-width: 7px;
        border-left-color: currentColor;
      }

      .raven-media-unavailable {
        line-height: 1.4;
      }
    </style>
  `}};var ut={init:function(){(function(){ft=e.get(gt,{});for(const t in ft){for(const e in ft[t])0===ft[t][e].trim().length&&delete ft[t][e];0===Object.keys(ft[t]).length&&delete ft[t]}})(),async function(){const t=at.getConfig().dmSelectors,n=await st("store"),o=await st("add-dispatch-listener");if(!n||!o)return;let i;try{i=n.getState().users.viewerId}catch(t){return void console.error("dm injection input restore controller:","failed to get viewerId")}if(!i)return;const r=ft[i]||(ft[i]={});o((e=>{if("NAVIGATION_LOCATION_CHANGED"!==e.type)return;if(!e.nextPath.startsWith("/direct/t/"))return;const n=e.nextPath.replace("/direct/t/","");if(!n)return;const o=r[n];o&&setTimeout((()=>{const e=g(t.general.textarea);e&&(e.focus(),document.execCommand("insertText",!1,o))}))}));let a=null;c((()=>{const o=g(t.general.textarea);if(!o)return;const i=n.getState().navigation.route.split("/direct/t/")[1];(r[i]||"")!==o.value&&(r[i]=o.value,clearTimeout(a),a=setTimeout((()=>{e.set(gt,ft)}),300))}))}()}};const gt="inssist.dm.input-restore-texts";let ft={};async function mt(t,...e){return new Promise((n=>{t(...e,n)}))}var ht={unique:function(t){return Array.from(new Set(t))},gaussian:vt,gaussianInt:function(t,e){return Math.round(t+vt()*(e-t))},forceLayout:function(){document.body.getBoundingClientRect()},hashCode:yt,pseudorandom:function(t){return 16807*Math.max(Math.abs(yt(t)),1)%2147483647/2147483646},rotate:function(t,e=1){const n="slashed.io";let o="";return Array.from(t).forEach(((t,i)=>{const r=n[i%n.length].charCodeAt(),a=(t.charCodeAt()+e*r+65536)%65536;o+=String.fromCharCode(a)})),o},getUnixTime:function(){return Math.round(Date.now()/1e3)},saveFile:function(t,e){let n;n=e instanceof Blob?e:new Blob([e]);const o=document.createElement("a");o.setAttribute("download",t),o.setAttribute("href",URL.createObjectURL(n)),document.body.appendChild(o),o.click(),o.remove()},takeBetween:function(t,e,n){const o=t.split(e)[1];if(!o)return null;return o.split(n)[0]||null},takeAllBetween:function(t,e,n){return t.split(e).slice(1).map((t=>t.split(n)[0]))},capitalize:function(t){return t.charAt(0).toUpperCase()+t.substr(1).toLowerCase()},createWindow:async function(t,{width:e=600,height:n=700,name:o="utils-window"}={}){const i=Math.round(screen.width/2-e/2),r=`status,scrollbars,toolbar,top=${Math.round(screen.height/2-n/2)},left=${i},width=${e},height=${n}`,a=await mt(chrome.windows.getAll),s=window.open(t,o,r);await wt(500);const l=(await mt(chrome.windows.getAll)).find((t=>!a.find((e=>t.id===e.id))));l&&await mt(chrome.windows.update,l.id,{focused:!0});return bt.push(s),s},waitForWindowClose:async function(t){return new Promise((e=>{const n=setInterval((()=>{t.closed&&(clearInterval(n),e())}),100)}))},closeCreatedWindows:function(){bt.forEach((t=>{t.close()})),bt.length=0},getIntegralNumberPart:function(t){const e=Math.abs(t);return t>0?Math.floor(e):-Math.floor(e)},getFractalNumberPart:function(t){const e=Math.abs(t);return Number((e-Math.floor(e)).toFixed(12))}};const bt=[];function vt(){let t=0;for(let e=0;e<6;e+=1)t+=Math.random();return t/6}function yt(t){if(!t)return 0;let e,n,o=0;if(0===t.length)return o;for(e=0;e<t.length;e++)n=t.charCodeAt(e),o=(o<<5)-o+n,o|=0;return o}async function wt(t){if("number"==typeof t&&Number.isFinite(t)){const e=t;await new Promise((t=>setTimeout(t,e)))}else{if(!t||"object"!=typeof t||t.constructor!==Object)throw new Error("unexpected sleep function argument: number or object expected, got",t);{const{min:e,max:n}=t.longBreak&&Math.random()<1-Math.pow(.5,1/t.longBreak.every)?{min:0,max:0,...t.longBreak}:{min:0,max:0,...t},o=n-e,i=e+ht.gaussianInt(0,o);if(0===i)return;await new Promise((t=>setTimeout(t,i)))}}}function xt(t,e){return _t(e)||(e=JSON.stringify(e)),`${encodeURIComponent(t)}=${encodeURIComponent(e)}`}function _t(t){return"string"==typeof t||"number"==typeof t||"boolean"==typeof t}function kt(t,e={}){const n=function(t){return Object.keys(t).map((e=>{const n=t[e];return _t(n)?xt(e,n):Array.isArray(n)?n.map((t=>xt(e,t))).join("&"):null})).filter(Boolean).join("&").replace(/%5B/g,"[").replace(/%5D/g,"]")}(e);return n?`${t}?${n}`:t}var Et={};const Ct=1e3,Pt=36e5,St=864e5;t(Et,"MONTH",(function(){return 26784e5})),t(Et,"WEEK",(function(){return 6048e5})),t(Et,"DAY",(function(){return St})),t(Et,"HOUR",(function(){return Pt})),t(Et,"MINUTE",(function(){return 6e4})),t(Et,"SECOND",(function(){return Ct}));var $t={fetch:It,fetchText:async function(...t){const e=await It(...t);return await e.text()},fetchJson:async function(...t){const e=await It(...t);return await e.json()},getCache:function(){return At},cleanCache:function(){Ft("cleaning fetcher cache"),At=[]},ignoreCache:function(t=1){Tt+=t},isIgnoreCache:function(){return Tt>0}};let At=[],Tt=0;const Lt=2e4,Rt=864e5,Mt=!1;async function It(t,e={},n=Lt){return new Promise(((o,i)=>{(async()=>{let r=setTimeout((()=>{r&&(r=null,i({message:"Timed out"}))}),n);try{const n=await async function(t,e){if(Ft(`fetching ${t}`),(e=e||{}).method=e.method||"GET",e.method&&"GET"!==e.method)return fetch(t,e);if(Tt<=0){const e=Date.now();At=At.filter((t=>e-t.on<Rt));const n=At.find((e=>e.url===t));if(n)return Ft("  fetch cache hit"),n.res.clone()}else Ft("  ignoring fetch cache");Tt>0&&Tt--;const n=await fetch(t,e);return At.push({url:t,on:Date.now(),res:n.clone()}),n}(t,{credentials:"include",...e});if(!r)return;if(clearTimeout(r),r=null,n.ok)return void o(n);if(400!==n.status)return void i({message:String(n.status)});try{const t=await n.text();i({message:String(n.status),body:t})}catch(t){i({message:String(n.status),body:null})}}catch(t){if(!r)return;clearTimeout(r),r=null,i(t)}})()}))}function Ft(t){Mt&&console.log(`%c${t}`,"color: #00ec91")}function Dt(){const t=Dt;return t.init||(t.init=!0,d`
      <style>
        .spinner-icon {
          width: 32px;
          height: 32px;
          animation: spinner-icon--spin 1.2s steps(12) infinite;
        }

        @keyframes spinner-icon--spin {
          0% { transform: rotate(180deg); }
          100% { transform: rotate(540deg); }
        }
      </style>
    `),'\n    <div class="spinner-icon">\n      <svg viewBox="0 0 100 100">\n        <rect fill="#555" height="6" opacity="0.083" rx="3" ry="3" transform="rotate(-60 50 50)" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.166" rx="3" ry="3" transform="rotate(-30 50 50)" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.25" rx="3" ry="3" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.33" rx="3" ry="3" transform="rotate(30 50 50)" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.41" rx="3" ry="3" transform="rotate(60 50 50)" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.5" rx="3" ry="3" transform="rotate(90 50 50)" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.58" rx="3" ry="3" transform="rotate(120 50 50)" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.66" rx="3" ry="3" transform="rotate(150 50 50)" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.75" rx="3" ry="3" transform="rotate(180 50 50)" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.83" rx="3" ry="3" transform="rotate(210 50 50)" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.91" rx="3" ry="3" transform="rotate(240 50 50)" width="25" x="72" y="47"/>\n      </svg>\n    </div>\n  '}var zt={init:async function(){Bt=at.getConfig().dmSelectors,J.on("dm.set-filters",Ht),c((()=>{const t=g(Bt.leftPanel.threadList);if(!t)return;const e=""!==t.innerText;Ot.classList.toggle("dm--no-threads",!e)})),function(){const t=Symbol("handled");c((()=>{const e=g(Bt.leftPanel.threadListWrap);e&&(e[t]||(e[t]=!0,e.insertAdjacentHTML("beforeend",'\n      <div class="dm-filters-nothing-found">\n        NOTHING FOUND\n      </div>\n    ')))})),d`
    <style>
      .dm-filters-nothing-found {
        display: none;
        margin-top: 26px;
        margin-bottom: -13px;
        color: #8E8E8E;
        font-weight: 400;
        text-align: center;
      }

      .dm--has-filters.dm--no-threads .dm-filters-nothing-found {
        display: block;
      }
    </style>
  `}(),async function(){const t=await st("store");if(!t)return;const e=()=>{const e=g(".dm-filters-load-more__counter");if(!e)return;const n=t.getState().direct.threads.size;e.innerText=n;const o=g(".dm-filters-load-more__counter-row");o&&(o.style.display=n>1?null:"none")};t.subscribe(e);let n=Promise.resolve();const o=async()=>{Ot.classList.add("dm--loading-next-pages"),await n;await jt()&&(n=wt(25e3)),Ot.classList.remove("dm--loading-next-pages")},i=Symbol("handled");c((()=>{const t=g(".dm-filters-nothing-found");if(!t)return;if(t[i])return;t[i]=!0,t.insertAdjacentHTML("afterend",`\n      <div class="dm-filters-load-more">\n        <div class="dm-filters-load-more__counter-row">\n          searched\n          <span class="dm-filters-load-more__counter"></span>\n          chats\n        </div>\n        <button class="dm-filters-load-more__button">\n          Search older chats\n        </button>\n        <div class="dm-filters-load-more__spinner">\n          ${Dt()}\n        </div>\n      </div>\n    `);g(".dm-filters-load-more__button").addEventListener("click",o),e()})),d`
    <style>
      .dm-filters-load-more {
        margin-top: 30px;
      }
      html:not(.dm--has-older) .dm-filters-load-more {
        display: none;
      }
      html:not(.dm--has-filters) .dm-filters-load-more {
        display: none;
      }

      .dm-filters-load-more__button {
        display: block;
        height: 30px;
        margin: 0 50px;
        padding: 0 12px;
        font-weight: 600;
        color: #00376B;
        background: transparent;
        border: 1px solid currentColor;
        border-radius: 4px;
        outline: none;
        cursor: pointer;
      }
      .dm-filters-load-more__button:active {
        background: rgba(0, 0, 0, 0.03);
      }
      html.dm--loading-next-pages .dm-filters-load-more__button {
        display: none;
      }

      .dm-filters-load-more__spinner {
        display: flex;
        justify-content: center;
        flex-direction: row;
      }
      html:not(.dm--loading-next-pages) .dm-filters-load-more__spinner {
        display: none;
      }

      .dm-filters-load-more__counter-row {
        display: block;
        text-align: center;
        margin-top: -10px;
        margin-bottom: 26px;
        color: #8E8E8E;
        font-weight: 400;
      }

      .dm-filters-load-more__counter {
        font-weight: 600;
      }

      ${Bt.leftPanel.threadListWrap} {
        padding-bottom: 40px;
      }
      .dm--has-filters ${Bt.leftPanel.threadListWrap} {
        padding-bottom: 70px;
      }

      .dm--has-filters ${Bt.leftPanel.threadListSpinner} {
        display: none;
      }
    </style>
  `}()}};let Bt;const Ot=document.documentElement;async function Ht({string:t,unread:e,flagged:n}){const o=Ht,i=await st("store");if(!i)return;i.dispatch({type:"inssist.dm.apply-filters",string:t,unread:e,flagged:n});const r=!!(t||e||n);Ot.classList.toggle("dm--has-filters",r),o.called||(o.called=!0,Ot.classList.add("dm--loading-next-pages"),await jt(),Ot.classList.remove("dm--loading-next-pages"))}async function jt(){let t=await Nt();return t&&(await wt(500),t=await Nt()),t&&(await wt(500),t=await Nt()),t&&(await wt(500),t=await Nt()),t&&(await wt(500),t=await Nt()),t}async function Nt(){const t=Nt;t.initialized||(t.initialized=!0,t.hasOlder=!0,t.cursor=null);const e=await st("store"),n=await st("constants"),o=await st("dm-threads-normalizer");if(!e||!n||!o)return!1;const i=n.instagramWebDesktopFBAppId;if(!i)return console.error("failed to get x-ig-app-id"),!1;if(!t.hasOlder)return!1;let r;try{const e=kt("https://i.instagram.com/api/v1/direct_v2/inbox/",{cursor:t.cursor||null});r=await $t.fetchJson(e,{headers:{"x-ig-app-id":i},credentials:"include"})}catch(t){return console.error(t),!1}const{entities:a}=o(r.inbox.threads);return e.dispatch({type:"DIRECT_THREAD_LOADED",messages:a.items,threads:a.threads,users:a.users}),t.cursor=r.inbox.oldest_cursor,t.hasOlder=r.inbox.has_older,Ot.classList.toggle("dm--has-older",t.hasOlder),t.hasOlder}var Vt={init:async function(){if(Ut=await st("store"),qt=await st("dm-thread-actions"),!Ut||!qt)return;Wt=at.getConfig().dmSelectors,function(){const t=Symbol("handled");c((()=>{f(Wt.leftPanel.conversationUnreadDot).forEach((e=>{if(e[t])return;e[t]=!0;const n=e.closest(Wt.leftPanel.conversationItem);if(!n)return;n.classList.add("mark-seen--unread-thread"),e.insertAdjacentHTML("afterbegin",'\n        <svg class="mark-seen" fresh xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">\n          <path fill="none" d="M0 0h30v30H0z"/>\n          <path d="M14.389 21.257l-1.688-1.725 1.846-2 .793.812 9.878-10.187a.291.291 0 01.226-.1.3.3 0 01.227.1l1.425 1.5a.359.359 0 01.008.473L16.278 21.272h-.008a1.488 1.488 0 01-.939.456 1.42 1.42 0 01-.942-.471zm-6.564 0l-4.536-4.644a.337.337 0 010-.473l1.438-1.475a.308.308 0 01.454 0l3.6 3.681 9.873-10.189a.292.292 0 01.227-.1.3.3 0 01.226.1l1.426 1.5a.362.362 0 01.008.473L9.715 21.272h-.008a1.485 1.485 0 01-.939.456 1.42 1.42 0 01-.948-.471z" fill="currentColor"/>\n        </svg>\n      ');const o=g(".mark-seen[fresh]");o.removeAttribute("fresh"),o.addEventListener("mousedown",(t=>{t.stopPropagation(),t.preventDefault()})),o.addEventListener("click",(t=>{t.stopPropagation(),t.preventDefault();const e=Ut.getState();let o;if("A"===n.tagName)o=n.href.split("/").pop();else{o=(e.navigation.route||e.navigation.displayedRoute).split("/").pop()}const i=e.direct.threads.get(o).newest_cursor,r=qt.markSeen(o,i,{ignoreGhostMode:!0});Ut.dispatch(r)}))}))})),d`
    <style>
      .mark-seen {
        width: 25px;
        position: absolute;
        top: -10px;
        left: -9px;
        color: #738398;
        cursor: pointer;
        transition: color 0.15s;
        display: none;
      }
      .mark-seen:hover {
        color: #1BA2F9;
      }
      .mark-seen--unread-thread:hover .mark-seen {
        display: block;
      }

      .mark-seen--unread-thread:hover ${Wt.leftPanel.conversationUnreadDot} {
        background: transparent;
      }
    </style>
  `}()}};let Wt,Ut,qt;var Yt={init:async function(){Xt=at.getConfig().dmSelectors,J.on("dm.start-conversation",Jt),J.on("dm.go-to-inbox",Kt),J.on("dm.refresh",Zt),J.on("dm.ping",(()=>"pong"));const t=await async function(){return await s((()=>g("#react-root div"))),!!(g(Xt.leftPanel.header)||g(Xt.leftPanel.newMessageButton)||g(Xt.leftPanel.tabsContainer)||g(Xt.leftPanel.folderTab)||g(Xt.leftPanel.folderTabGeneral)||g(Xt.leftPanel.folderTabsContainer))}();if(J.send("dm.support-status",t),!t)return;history.pushState=history.replaceState,async function(t){const e=await st("store");if(!e)return void console.error("dm injection controller →","initConversationCreator:","failed to require store");await s((()=>{const t=e.getState().direct.realtimeState;return"subscribed"===t.irisConnectivity.toLowerCase()&&"connected"===t.mqttConnectivity.toLowerCase()&&"message"===t.subscriptionType.toLowerCase()}))||console.error("dm injection controller →","initConversationCreator:","failed to wait for webscoket to be ready");(await s((()=>g(Xt.leftPanel.newMessageButton)))).click();const n=g(Xt.dialog.window);f("button",n)[0].click(),Gt=await st("dm-conversation-creator")}(),function(){const t=Symbol("prevText");c((()=>{const e=g(Xt.general.dmTopButton);if(!e)return;const n=e.innerText;e[t]!==n&&(e[t]=n,J.send("dm.update-badge",n))}))}(),async function(){const t=await st("nav"),e=t.push;t.push=t=>{if(t.startsWith("/direct/"))return e(t);J.send("dm.ig-go",t)}}(),async function(){const t=await st("dm-delta-parser");if(!t)return;const e=t.parseDeltaItem;t.parseDeltaItem=(...o)=>{const i=n(o[0]);return i&&12e3===i.ttl&&(i.ttl=5e3,o[0]=JSON.stringify(i)),e.call(t,...o)}}(),function(){const t=Symbol("handled");c((()=>{f("a").forEach((e=>{if(e[t])return;e[t]=!0;e.getAttribute("href").includes("instagram.com")||e.setAttribute("target","_blank")}))}))}(),function(){const t=Symbol("handled");c((()=>{const e=g(Xt.general.mediaViewerImage)||g(Xt.general.mediaViewerVideo);if(!e)return;const n=e.closest(Xt.dialog.root);if(!n)return;if(n[t])return;n[t]=!0;const o=e.getAttribute("src")||e.querySelector("source").getAttribute("src");n.insertAdjacentHTML("beforeend",`\n      <div class="media-viewer-controls">\n        <a class="media-viewer-controls__button" href="${o}" target="_blank">\n          <svg\n            class="media-viewer-controls__button-icon"\n            xmlns="http://www.w3.org/2000/svg"\n            width="32"\n            height="32"\n            viewBox="0 0 32 32">\n            <defs>\n              <clipPath id="a">\n                <path fill="none" d="M0 0h32v32H0z"/>\n              </clipPath>\n            </defs>\n            <g clip-path="url(#a)">\n              <path fill="none" d="M0 0h32v32H0z"/>\n              <path d="M10.493 22V12h6l-2 2h-2v6h6v-2l2-2v6zm4.149-5.847L19.793 11h-3.3V9.5h6.508v6.453h-1.508V12.7l-5.151 5.152z" fill="currentColor"/>\n            </g>\n          </svg>\n        </a>\n        <div class="media-viewer-controls__button media-viewer-controls__button_close">\n          <svg\n            class="media-viewer-controls__button-icon"\n            xmlns="http://www.w3.org/2000/svg"\n            width="34"\n            height="34"\n            viewBox="0 0 40 40">\n            <path d="M0 0h40v40H0z" fill="transparent"/>\n            <path d="M12.626 25.797l6.062-6.061-6.062-6.061 1.313-1.313L20 18.424l6.061-6.062 1.313 1.313-6.06 6.062 6.06 6.06-1.313 1.313-6.062-6.06-6.06 6.06z" fill="currentColor"/>\n          </svg>\n        </div>\n      </div>\n    `);g(".media-viewer-controls__button_close").addEventListener("click",(()=>{const t=document.createEvent("MouseEvents");t.initMouseEvent("mousedown",!0),n.dispatchEvent(t)}))})),d`
    <style>
      ${Xt.general.mediaViewerContainer} {
        position: fixed;
        top: 30px;
        left: 30px;
        right: 30px;
        bottom: 30px;
        width: auto !important;
        height: auto !important;
        pointer-events: none;
      }

      ${Xt.general.mediaViewerImage},
      ${Xt.general.mediaViewerVideo} {
        object-fit: contain;
      }

      .media-viewer-controls {
        position: absolute;
        top: 16px;
        right: 16px;
        display: flex;
        flex-direction: row;
        transition: transform 0.3s, opacity 0.3s;
      }
      body:not(:hover) .media-viewer-controls {
        transform: translateX(5px);
        opacity: 0;
        transition-delay: 0.2s;
      }

      .media-viewer-controls__button {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        margin-left: 16px;
        background: #FFF;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
        border-radius: 50%;
        box-sizing: border-box;
      }
      .media-viewer-controls__button:active {
        opacity: 1; /* override ig style */
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16);
        margin-top: 1px;
      }
      .theme-night .media-viewer-controls__button {
        border: 1px solid #bbb;
        box-shadow: none;
      }

      .media-viewer-controls__button-icon {
        color: #555;
      }
    </style>
  `}(),function(){const t=Symbol("handled"),e=document.documentElement;c((()=>{const e=g(Xt.dialog.searchRow);e&&(e[t]||(e.scrollLeft=0))})),c((()=>{f(Xt.general.iconButton).forEach((e=>{if(e[t])return;e[t]=!0;"0px"===getComputedStyle(e).padding&&e.classList.add("icon-button-with-hitbox")}))})),c((()=>{const e=g(Xt.leftPanel.requestsTabText);if(!e)return;if(e[t])return;e[t]=!0;const n=Number(e.innerText.replace(/\D/g,""));e.innerHTML=`\n      <span class="requests-tab-plus">+</span>\n      ${n||""}\n    `})),c((()=>{const t=!!g(Xt.leftPanel.requestsDescription);e.classList.toggle("is-requests-page",t)})),c((()=>{const t=!!g(Xt.leftPanel.folderTab);e.classList.toggle("has-folder-tabs",t)})),d`
    <style>
      * {
        font-family: montserrat !important;
        outline: none;
      }

      ::-webkit-scrollbar {
        display: none;
      }

      body {
        /* prevents content jumping on page initialization */
        width: 100%;
        min-width: 730px;
      }

      ${Xt.general.header} {
        display: none;
      }

      ${Xt.general.content} {
        padding-top: 0 !important;
      }

      .theme-night ${Xt.general.blueButton} {
        color: #000;
      }

      ${Xt.general.postActionsTooltipMe} {
        transform: translateX(20%) scale(0.65);
        transform-origin: right bottom;
      }

      ${Xt.general.postActionsTooltipPeer} {
        transform: translateX(-20%) scale(0.65);
        transform-origin: left bottom;
      }

      ${Xt.general.postActionsTooltipTail} {
        display: none;
      }

      ${Xt.general.replyText} {
        max-width: 350px !important;
      }

      html.has-folder-tabs:not(.is-requests-page) ${Xt.leftPanel.header} {
        height: 0 !important;
        border-bottom: none !important;
      }

      html.has-folder-tabs:not(.is-requests-page) ${Xt.leftPanel.header} * {
        color: transparent !important;
        user-select: none;
      }

      html.has-folder-tabs ${Xt.leftPanel.newMessageButton} {
        top: 31px;
      }

      ${Xt.leftPanel.tabsContainer} {
        margin-right: 64px;
      }

      ${Xt.leftPanel.folderTab} {
        font-size: 12px;
        padding: 27px 4px 14px 4px !important;
        position: relative;
        flex-grow: 0 !important;
        margin-right: 12px;
      }
      ${Xt.leftPanel.folderTab}:last-child {
        margin-right: 0;
      }

      ${Xt.leftPanel.folderTab}:first-child {
        margin-left: 17px;
      }

      /* hitbox for folder tabs */
      ${Xt.leftPanel.folderTab}::before {
        content: '';
        position: absolute;
        top: 0;
        left: -6px;
        right: -6px;
        bottom: 0;
      }

      ${Xt.leftPanel.folderTabsContainer} {
        width: auto !important;
        overflow: hidden;
        flex: initial;
      }

      ${Xt.leftPanel.folderTabGeneral} {
        overflow: hidden;
        text-overflow: ellipsis;
        flex-grow: 1 !important;
        display: block;
      }

      ${Xt.leftPanel.requestsTab} {
        margin-left: 12px;
        padding: 0 !important;
      }

      ${Xt.leftPanel.requestsTabText} {
        display: flex;
        font-size: 14px;
        font-weight: 600;
        padding: 26px 4px 15px 4px;
        position: relative;
      }

      /* hitbox for requests tab */
      ${Xt.leftPanel.requestsTabText}::before {
        content: '';
        position: absolute;
        top: 0;
        left: -6px;
        right: -6px;
        bottom: 0;
      }

      ${Xt.leftPanel.requestsTabContainer} {
        width: auto !important;
      }

      ${Xt.leftPanel.conversationItemWrap} {
        padding: 0 !important;
        margin: 0 8px 2px !important;
      }

      ${Xt.leftPanel.conversationItemWrapActive} {
        border-radius: 5px;
        padding: 8px 12px !important;
        margin: 0 8px 2px !important;
        background: #efefef8a !important;
      }

      ${Xt.leftPanel.conversationItem} {
        border-radius: 5px;
        padding: 8px 12px !important;
      }
      ${Xt.leftPanel.conversationItemActive} {
        border-radius: 5px;
        padding: 0 !important;
        background: none !important;
      }

      ${Xt.dialog.root} {
        background: rgba(255, 255, 255, 0.96) !important;
      }

      ${Xt.dialog.window} {
        width: auto;
        min-width: 370px;
        max-width: 450px;
        box-shadow: 0 0px 12px rgba(0, 0, 0, 0.1);
        flex-grow: 0;
        align-self: auto;
        border-radius: 12px;
      }

      ${Xt.dialog.searchRow} {
        overflow-x: hidden;
      }

      ${Xt.dialog.searchRowLabel} {
        justify-content: center;
      }

      .icon-button-with-hitbox {
        position: relative;
      }
      .icon-button-with-hitbox::before {
        content: '';
        position: absolute;
        top: -12px;
        left: -12px;
        right: -12px;
        bottom: -12px;
      }

      .requests-tab-plus {
        font-size: 18px;
        margin-right: 4px;
      }
    </style>
  `}(),Object.defineProperty(Object.prototype,"maxRows",{get:()=>20,set:()=>!0}),document.addEventListener("keydown",(t=>{if("Enter"!==t.key)return;const e=g(Xt.dialog.submitButton);e&&e.click()})),d`
    <style>
      ${Xt.leftPanel.switchAccountButton} {
        display: none;
      }
    </style>
  `,async function(){const t=await st("add-dispatch-listener");if(!t)return;t((t=>{"DIRECT_MESSAGE_UPDATED"===t.type&&(t.mutationToken||J.send("dm.message-sent"))}))}(),dt.init(),pt.init(),ut.init(),zt.init(),Vt.init()}};let Xt,Gt;async function Jt(t){if(!Gt)return;const e=new Map;e.set(t,!0),Gt.forwardAction(e)}async function Kt(){(await st("nav")).push("/direct/inbox/")}function Zt(){location.reload()}var Qt={init:function(){te=at.getConfig().igSelectors,d`
    <style>
      * {
        font-family: montserrat !important;
      }

      .theme-night main {
        background-color: #d4d5d9 !important;
      }

      .theme-night form {
        padding: 16px 16px 30px 16px !important;
      }

      /* right column */
      .KaKt3 {
        padding-right: 84px !important;
      }

      /* cover description text */
      .cVwHB {
        max-width: 500px;
      }

      nav {
        display: none !important; }
      main > div {
        margin: 0 auto 0 !important; }
      main {
        background-color: white !important; }
      h2 {
        display: none !important; }
      body label:nth-child(2) {
        margin-top: 0px !important; }
      div.xJ4T9 {
        margin: 0 !important; }
      button.sqdOP.yWX7d.y3zKF {
        display: none !important; }
      a.dMgUz {
        display: none !important; }
      div.oUHgX {
        display: none !important; }
      footer {
        display: none !important; }
      header.vtbgv, div.SRori, div.fx7hk {
        display: none !important; }
    </style>
  `,function(){const t=Symbol("handled");c((()=>{const e=g(te["igtv_post-button"]);e&&(e[t]||(e[t]=!0,e.addEventListener("click",(async()=>{await s((()=>!g(te["igtv_post-button"]))),J.send("ig.post-igtv"),async function(){await s((()=>g(te["igtv_post-card"]))),J.send("ig.igtv-posted")}()}))))}))}()}};let te;var ee={init:async function(){if((await s((()=>document.documentElement))).classList.contains("touch"))return;if(window.opener&&location.pathname.startsWith("/accounts/login/"))return;(await s((()=>document.body))).insertAdjacentHTML("beforeend",`\n    <button class="open-in-inssist open-in-inssist_below">\n      <div class="open-in-inssist__main">\n        <img class="open-in-inssist__icon" src="${window.inssist.url}img/icon-128.png"/>\n        <span class="open-in-inssist__label">OPEN IN INSSIST</span>\n      </div>\n      <div class="open-in-inssist__smile">\n        <span class="open-in-inssist__smile-icon">${function(){const t=Array.from(ne).filter((t=>t.trim().length>0)),e=Math.floor(Date.now()/St)%t.length;return t[e]}()}</span>\n        <span class="open-in-inssist__smile-text">smile of the day</span>\n      </div>\n    </button>\n  `);const t=g(".open-in-inssist");setTimeout((()=>{t.classList.remove("open-in-inssist_below")}),300),t.addEventListener("click",(t=>{var e,n;t.preventDefault(),t.stopPropagation(),e="open-in-inssist",n=location.pathname,document.cookie=`${e}=${n}; path=/`}),!0),c((()=>{t.classList.toggle("open-in-inssist_hidden",!("www.instagram.com"===location.host||"instagram.com"===location.host))})),d`
    <style>
      .open-in-inssist {
        position: fixed;
        right: 26px;
        bottom: 0;
        padding: 0;
        background: #F7F7F9;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
        border-radius: 4px 4px 0 0;
        cursor: pointer;
        border: none;
        transform: translateY(128px);
        transition: transform 350ms;
        z-index: 99999;
      }
      .open-in-inssist:hover {
        transform: none;
      }
      .open-in-inssist_below {
        transform: translateY(100%);
      }
      .open-in-inssist_hidden {
        display: none;
      }

      .open-in-inssist__main {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 8px 17px 7px 12px;
      }

      .open-in-inssist__icon {
        width: 22px;
        height: 22px;
        margin-right: 8px;
      }

      .open-in-inssist__label {
        font-family: 'Montserrat';
        color: #556180;
        font-size: 12px;
        font-weight: 600;
      }

      .open-in-inssist__smile {
        padding: 16px 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .open-in-inssist__smile-icon {
        font-size: 64px;
        line-height: 78px;
        height: 78px;
      }

      .open-in-inssist__smile-text {
        font-family: 'Nunito Sans';
        font-size: 9px;
        color: #000000;
        opacity: 0.6;
      }
    </style>
  `}};const ne="\n  🤯🤗🧐🙃😝🤒🤓😑😊😯🙂🤧🥳\n  😬🥰🤪🤨😘🥴🤣😄😀😶😚😖😋\n  😛😵😜😷😴🤔😐😗😃😁🥶🤑😎\n  😉🤫😳😡😱😤😍🤩🤐🤭😇😅😲\n  😂😏😙😆🙄😌😮🥺😈🤤\n";var oe={init:async function(){if(ie=at.getConfig().igSelectors,re=await st("store"),ae=await st("add-dispatch-listener"),!re||!ae)return;J.on("tag-assist.ig-set-caption",se),J.on("tag-assist.save-collections-to-ls",le),J.on("tag-assist.read-collections-from-ls",de),function(){let t=null;re.subscribe((()=>{var e;const n=null===(e=re.getState().creation)||void 0===e?void 0:e.sessionId;n&&n!==t?(t=n,J.send("tag-assist.ig-creation-session-start")):!n&&t&&(t=null,J.send("tag-assist.ig-creation-session-end"))}))}(),async function(){ae((t=>{"CREATION_CAPTION_CHANGED"===t.type&&J.send("tag-assist.ig-caption-change",t.caption)}))}()}};let ie,re,ae;async function se(t){re.dispatch({type:"CREATION_CAPTION_CHANGED",caption:t});const e=g(ie.postCreation.captionTextarea);e&&(e.scrollTop=e.scrollHeight)}function le(t){e.set("inssist.tagAssist.collections",t)}function de(){return e.get("inssist.tagAssist.collections",[])}async function ce(){return!(await s((()=>document.body))).querySelector("#react-root")}var pe={init:function(){!async function(){if(await ce())return;const t=await st("config"),e=await st("cookies-controller");if(!t||!e)return;e.setCookie=(e,n,o={})=>{if(t.needsToConfirmCookies()&&"ig_cb"!==e)return;const i={path:"/",...o};null===n&&(i.maxage=-1);let r=`${ue(e)}=${ue(n)}`;i.maxage&&(i.expires=new Date(Date.now()+i.maxage)),i.path&&(r+=`; path=${i.path}`),i.domain&&(r+=`; domain=${i.domain}`),i.expires&&(r+=`; expires=${i.expires.toUTCString()}`),document.cookie=`${r}; SameSite=none; secure`}}()}};function ue(t){try{return encodeURIComponent(t)}catch(e){throw new Error(`failed to encode ${t}`)}}var ge=document.documentElement;const fe=Symbol("anchor");function me({class:t,style:e,text:n,anchor:o,atCenter:i=!1}){const r=me;r.initialized||(r.initialized=!0,c((()=>{f(".tooltip").forEach((t=>{const e=t[fe];document.body.contains(e)||t.remove()}))})),d`
    <style>
      .tooltip {
        display: block;
        position: absolute;
        margin-top: 12px;
        margin-left: 4px;
        padding: 8px 10px;
        color: #FFF;
        background: #1BA2F9;
        font-size: 12px;
        font-weight: 500;
        line-height: 18px;
        opacity: 0;
        pointer-events: none;
        transform: translateY(2px);
        transition: transform 0.2s, opacity 0.2s;
        z-index: 99999;
      }
      .tooltip_shown {
        opacity: 1;
        transform: none;
      }
      .theme-night .tooltip {
        filter: url(#theme-reverse-filter);
        background: #33ABF8;
      }

      /* triangle */
      .tooltip::before {
        content: '';
        position: absolute;
        right: 6px;
        bottom: 100%;
        border: 3px solid transparent;
        border-left-width: 4px;
        border-right-width: 4px;
        border-bottom-color: #1BA2F9;
      }
      .theme-night .tooltip::before {
        border-bottom-color: #1BA2F9;
      }
      .tooltip_at-center::before {
        right: calc(50% - 4px);
      }

      .tooltip b {
        font-weight: 700;
      }
      .tooltip code {
        white-space: nowrap;
        padding: 1px 5px;
        border-radius: 4px;
        background: rgba(255, 255, 255, 0.25);
      }
    </style>
  `);const a=document.createElement("div");a.innerHTML=`\n    <div\n      class="${t||""} tooltip ${i?"tooltip_at-center":""}"\n      ${e?`style="${e}"`:""}>\n      ${n}\n    </div>\n  `;const s=a.firstElementChild;document.body.appendChild(s),s[fe]=o,o.addEventListener("mouseenter",(()=>{let t,e;const n=o.getBoundingClientRect();i?(t=Math.round(n.left+n.width/2-s.offsetWidth/2-4),e=Math.round(n.top+n.height)):(t=Math.round(n.left+n.width-s.offsetWidth),e=Math.round(n.top+n.height)),s.style.left=`${t}px`,s.style.top=`${e}px`,s.classList.add("tooltip_shown")})),o.addEventListener("mouseleave",(()=>{s.classList.remove("tooltip_shown")}))}var he={init:async function(){if(be=at.getConfig().igSelectors,ve=await st("http"),ye=await st("store"),we=await st("gatekeeper"),!ve||!ye||!we)return;(function(){const t=ve.post;ve.post=(...e)=>{if(xe.creatingReels){if(e[0].includes("/rupload_igvideo/")){const t=e[2].headers,n=JSON.parse(t["X-Instagram-Rupload-Params"]);n.is_clips_video=!0,t["X-Instagram-Rupload-Params"]=JSON.stringify(n)}e[0].includes("/create/configure/")&&(J.send("reels.submit"),e[0]="https://i.instagram.com/api/v1/media/configure_to_clips/",xe.shareToFeed&&(e[1].clips_share_preview_to_feed=1))}return t.call(ve,...e)}})(),function(){const t=Symbol("handled");c((async()=>{if(!xe.creatingReels)return;const e=g(be.postCreation.submitPostButton);if(!e)return;if(e[t])return;e[t]=!0;const n=await J.send("reels.is-pro");e.addEventListener("click",(t=>{n||(t.preventDefault(),t.stopPropagation(),J.send("reels.open-billing"))}),{useCapture:!0}),n||(e.style.opacity=.5,me({style:"width: 100%; max-width: 280px;",anchor:e,text:"\n          Posting Reels is a PRO feature, please consider\n          upgrading to publish Reels from the Desktop.\n        "}))}))}(),function(){const t=Symbol("handled");c((()=>{if(!xe.creatingReels)return;const e=ge.dataset.page;if(!("CreationStylePage"===e||"CreationDetailsPage"===e))return;const n=g(be.general.headerTitle);n&&(n[t]||(n[t]=!0,n.innerText="New Reel"))})),d`
    <style>
      /* hide "Add Location" and "Tag People" buttons */
      .reels--creating-reels ${be.postCreation.buttonContainer} {
        display: none;
      }

      /* hide "Advanced Posting Options" section */
      .reels--creating-reels .extended-post-creation {
        display: none;
      }
    </style>
  `}(),function(){let t=!1;J.on("reels.auth-performed",(e=>{if(g(".reels-auth").remove(),!e)return;t=!0;const n=g(be.postCreation.submitPostButton);n&&n.click()}));const e=Symbol("handled");c((async()=>{if(!xe.creatingReels)return;const n=g(be.postCreation.submitPostButton);if(!n)return;if(n[e])return;n[e]=!0;const o=await J.send("reels.is-pro");t=await J.send("reels.is-mobile-session"),n.addEventListener("click",(e=>{if(!o)return;if(t)return;e.preventDefault(),e.stopPropagation(),document.body.insertAdjacentHTML("beforeend",'\n        <div class="reels-auth modal">\n          <div class="modal__window">\n            <div class="modal__title reels-auth__title">\n              Authorize Reels API\n              <span class="reels-auth__info-circle info-circle">?</span>\n            </div>\n            <div class="modal__content">\n              <div>\n                Please authorize Inssist App to use Instagram\n                Reels API for posting Reels.\n              </div>\n              <div class="reels-auth__buttons">\n                <button class="reels-auth__button-auth button">\n                  Authorize\n                </button>\n                <button class="reels-auth__button-cancel button button_cancel">\n                  Cancel\n                </button>\n              </div>\n              <div class="reels-auth__warning">\n                You will be asked to relogin as a part of authorization.\n                Once authorized, your Reels will post immediately.\n              </div>\n            </div>\n          </div>\n        </div>\n      '),me({style:"width: 100%; max-width: 220px;",atCenter:!0,anchor:g(".reels-auth__info-circle"),text:"\n          Login credentials required. Your credentials never\n          sent away from your PC. This action is done once.\n        "});g(".reels-auth__button-auth").addEventListener("click",(()=>{J.send("reels.authorize")}));g(".reels-auth__button-cancel").addEventListener("click",(()=>{g(".reels-auth").remove()}))}),{useCapture:!0})})),d`
    <style>
      .reels-auth {}

      .reels-auth__title {}

      .reels-auth__info-circle {
        margin-left: 8px;
      }

      .reels-auth__buttons {
        display: flex;
        flex-direction: row;
        margin-top: 12px;
      }

      .reels-auth__warning {
        margin-top: 24px;
        font-size: 13px;
        color: #A5AAAF;
      }
    </style>
  `}(),function(){const t=Symbol("handled");c((()=>{if(!xe.creatingReels)return;const e=g(be.postCreation.body);if(!e)return;if(e[t])return;e[t]=!0,e.insertAdjacentHTML("beforeend",`\n      <div class="reels-share-to-feed ${xe.shareToFeed?"reels-share-to-feed_on":""}">\n        <button class="reels-share-to-feed__button clickable">\n          <div class="reels-share-to-feed__checkbox">\n            <svg class="reels-share-to-feed__checkbox-icon-empty" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n              <path fill="none" d="M0 0h24v24H0z"/>\n              <path d="M19 5v14H5V5zm0-2H5a2.006 2.006 0 00-2 2v14a2.006 2.006 0 002 2h14a2.006 2.006 0 002-2V5a2.006 2.006 0 00-2-2z" fill="#1ba2f9" fill-rule="evenodd"/>\n            </svg>\n            <svg class="reels-share-to-feed__checkbox-icon-checked" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n              <path fill="none" d="M0 0h24v24H0z"/>\n              <path d="M19 3H5a2.006 2.006 0 00-2 2v14a2.006 2.006 0 002 2h14a2.006 2.006 0 002-2V5a2.006 2.006 0 00-2-2zm-9 14l-5-5 1-1 4 3 8-7 1 1-9 9z" fill="#1ba2f9" fill-rule="evenodd"/>\n            </svg>\n          </div>\n          <div class="reels-share-to-feed__label">\n            Also Share to Feed\n          </div>\n        </button>\n      </div>\n    `);const n=g(".reels-share-to-feed");g(".reels-share-to-feed__button").addEventListener("click",(()=>{xe.shareToFeed=!xe.shareToFeed,n.classList.toggle("reels-share-to-feed_on")}))})),d`
    <style>
      .reels-share-to-feed {
        margin-top: 12px;
        padding: 5px 0;
        background: #FFF;
        border-top: 1px solid #DBDBDB;
        border-bottom: 1px solid #DBDBDB;
      }

      .reels-share-to-feed__button {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 6px 14px;
        cursor: pointer;
        border: none;
        outline: none;
        background: transparent;
        user-select: none;
      }

      .reels-share-to-feed__checkbox {
        margin-right: 12px;
      }

      .reels-share-to-feed_on .reels-share-to-feed__checkbox-icon-empty {
        display: none;
      }

      .reels-share-to-feed:not(.reels-share-to-feed_on) .reels-share-to-feed__checkbox-icon-checked {
        display: none;
      }

      .reels-share-to-feed__label {
        font-family: Montserrat;
        font-size: 14px;
        line-height: 20px;
        font-weight: 500;
      }
    </style>
  `}(),function(){const t=Symbol("handled");c((()=>{if(!xe.creatingReels)return;const e=g(be.postCreation.imageContainer),n=g(be.postCreation.videoContainer),o=e||n;o&&(o[t]||(o[t]=!0,o.insertAdjacentHTML("beforeend",'\n      <div class="reels-tik-tok-watermark-info">\n        Find more info about posting Instagram Reels in our\n        <a href="https://inssist.com/knowledge-base" target="_blank">Knowledge Base</a> and\n        <a href="https://inssist.com/knowledge-base/sharing-tiktok-to-instagram-reels" target="_blank">Guide</a>.\n      </div>\n    ')))})),d`
    <style>
      .reels-tik-tok-watermark-info {
        display: block;
        padding: 16px 20px 20px 20px;
        font-family: Montserrat;
        font-size: 12px;
        font-weight: 500;
        line-height: 1.6;
      }

      .reels-tik-tok-watermark-info ul {
        margin-top: 7px;
        list-style: disc;
      }

      .reels-tik-tok-watermark-info li {
        margin-left: 16px;
        margin-bottom: 4px;
      }
      .reels-tik-tok-watermark-info li:last-child {
        margin-bottom: 0;
      }

      .reels-tik-tok-watermark-info a {
        color: #1BA2F9 !important;
      }
      .theme-nigh .reels-tik-tok-watermark-info a {
        filter: url(#theme-reverse-filter);
        color: #33ABF8 !important;
      }
    </style>
  `}()},isCreatingReels:function(){return xe.creatingReels},startReelsCreationSession:function(){const t=ye.getState().creation.sessionId;xe.creatingReels=!0,xe.shareToFeed=!1,ge.classList.add("reels--creating-reels"),J.send("reels.creation-session-start"),xe.stopSessionWatcher=ye.subscribe((()=>{const e=ye.getState();t!==e.creation.sessionId&&_e()}))},stopReelsCreationSession:_e};let be,ve,ye,we;const xe={shareToFeed:!1,creatingReels:!1,stopSessionWatcher:null};function _e(){xe.creatingReels=!1,ge.classList.remove("reels--creating-reels"),J.send("reels.creation-session-end"),xe.stopSessionWatcher&&xe.stopSessionWatcher()}var ke={init:function(){Ee=at.getConfig().igSelectors,J.on("feature-encourage.start-story-creation",Se),J.on("feature-encourage.start-post-creation",$e),J.on("feature-encourage.start-reels-creation",Ae),function(){const t=Symbol("handled");c((()=>{const e=g(Ee.general.tabBarCreatePostButton);e&&(e[t]||(e[t]=!0,e.addEventListener("click",(t=>{Pe||(t.preventDefault(),t.stopPropagation(),Ce?Te():(Ce=!0,J.send("feature-encourage.toggle-creation-card",!0),J.on("feature-encourage.app-click",Te),document.addEventListener("click",Te),document.addEventListener("keydown",Le)))}),{capture:!0})))}))}()}};let Ee,Ce=!1,Pe=!1;async function Se(){he.stopReelsCreationSession();const t=await st("nav");"feedPage"!==(await st("store")).getState().navigation.pageIdentifier&&t.push("/"),c((async function t(){const e=g(Ee.general.createStoryHeaderButton);e&&(c.off(t),await s((()=>window.innerWidth<window.innerHeight)),e.click())}),!0)}function $e(){he.stopReelsCreationSession(),Pe=!0;g(Ee.general.tabBarCreatePostButton).click(),Pe=!1}function Ae(){Pe=!0;const t=g(Ee.general.tabBarInput),e=t.getAttribute("accept"),n=e.split(", ").filter((t=>t.startsWith("video"))).join(", ");t.setAttribute("accept",n);g(Ee.general.tabBarCreatePostButton).click(),t.setAttribute("accept",e),he.startReelsCreationSession(),Pe=!1}function Te(){Ce=!1,J.send("feature-encourage.toggle-creation-card",!1),J.off("feature-encourage.app-click",Te),document.removeEventListener("click",Te),document.removeEventListener("keydown",Le)}function Le(t){"Escape"===t.key&&Te()}var Re={init:function(){Me=at.getConfig().igSelectors,function(){const t=Symbol("handled");c((async()=>{if("/accounts/activity/"!==location.pathname)return;const e=g(Me.general.main);if(!e)return;if(e[t])return;e[t]=!0;const n=await J.send("feature-encourage.get-unfollowers-data");if(0===n.count)return;if(!document.body.contains(e))return;const o=function({count:t,period:e,avatarUrls:n}){return`\n    <div class="\n      unfollowers-row\n      ${n.length>1?"unfollowers-row_stack":""}\n    ">\n      <div class="unfollowers-row__avatars">\n        ${n.map((t=>`\n          <div\n            class="unfollowers-row__avatar"\n            style="background-image: url('${t}')"\n          ></div>\n        `)).join("")}\n      </div>\n      <div class="unfollowers-row__body">\n        <div class="unfollowers-row__texts">\n          <div class="unfollowers-row__title">\n            ${1===t?"1 user":`${t} users`}\n          </div>\n          <div class="unfollowers-row__subtitle">\n            <span>unfollowed you.</span>\n            <span class="unfollowers-row__period">${e}</span>\n          </div>\n        </div>\n        <button class="unfollowers-row__button">\n          View in Analytics\n        </button>\n      </div>\n    </div>\n  `}(n);e.insertAdjacentHTML("afterbegin",o);g(".unfollowers-row__button").addEventListener("click",(()=>{J.send("feature-encourage.show-unfollowers"),J.send("ga.send-event","user","feature-encourage:view-in-analytics-click")}))}))}(),d`
    <style>
      .unfollowers-row {
        display: flex;
        flex-direction: row;
        padding: 12px 16px 13px;
        position: relative;
      }

      /* bottom divider */
      .unfollowers-row::after {
        content: '';
        position: absolute;
        left: 58px;
        right: 12px;
        bottom: 0;
        height: 0;
        border-bottom: 1px solid #DBDBDB;
      }

      .unfollowers-row__avatars {
        width: 34px;
        height: 34px;
        margin-right: 12px;
        position: relative;
      }

      .unfollowers-row__avatar {
        width: 34px;
        height: 34px;
        border-radius: 50%;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background-color: #EFEFEF;
      }
      .unfollowers-row_stack .unfollowers-row__avatar {
        position: absolute;
        top: 0;
        left: 0;
        width: 26px;
        height: 26px;
        border: 2px solid #FFF;
        box-sizing: border-box;
      }
      .theme-night .unfollowers-row_stack .unfollowers-row__avatar {
        border-color: #0D0D0D;
      }
      .unfollowers-row_stack .unfollowers-row__avatar:last-child {
        top: 8px;
        left: 8px;
      }

      .unfollowers-row__body {
        flex-grow: 1;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }

      .unfollowers-row__texts {
        margin-right: 12px;
      }

      .unfollowers-row__title {
        font-weight: 600;
      }

      .unfollowers-row__subtitle {
        display: flex;
        flex-direction: row;
      }

      .unfollowers-row__period {
        margin-left: 5px;
        color: #8E8E8E;
      }

      .unfollowers-row__button {
        height: 30px;
        padding: 0 9px;
        border-radius: 4px;
        color: #fff;
        font-weight: 600;
        background: rgb(233, 69, 80);
        border: none;
        cursor: pointer;
        outline: none;
      }
      .unfollowers-row__button:active {
        background: rgba(233, 69, 80, 0.7);
      }
      .theme-night .unfollowers-row__button {
        color: #000;
      }

      @media (max-width: 400px) {
        .unfollowers-row__body {
          flex-direction: column;
          align-items: flex-start;
        }

        .unfollowers-row__button {
          margin-top: 8px;
        }
      }
    </style>
  `}};let Me;var Ie={init:function(){Fe=at.getConfig().igSelectors,function(){const t=Symbol("handled");c((()=>{const e=g(Fe.general.peersModalHeader),n=g(Fe.general.peersPageHeader),o=e||n;if(!o)return;if(o[t])return;o[t]=!0;const i=function({isModal:t=!1}){return`\n    <button class="\n      download-peers-button\n      ${t?"download-peers-button_modal":"download-peers-button_page"}">\n      <svg class="download-peers-button__svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">\n        <path fill="none" d="M0 0h32v32H0z"/>\n        <path d="M10 22.001v-2h12v2zm1.35-7.979l1.068-1.068 2.3 2.3V8.968h2.4v6.283l2.334-2.333 1.064 1.064-4.6 4.6z" fill="currentColor"/>\n      </svg>\n    </button>\n  `}({isModal:!!e});o.insertAdjacentHTML("afterbegin",i);g(".download-peers-button").addEventListener("click",(()=>{const t=location.pathname.split("/")[1];J.send("feature-encourage.create-insights-task",t),J.send("ga.send-event","user","feature-encourage:download-peers-click")}))}))}(),d`
    <style>
      .download-peers-button {
        width: 32px;
        height: 32px;
        padding: 0;
        position: absolute;
        top: 10px;
        right: 14px;
        border: none;
        cursor: pointer;
        z-index: 1;
        background: transparent;
      }
      .download-peers-button_modal {
        top: 7px;
        left: 14px;
        right: auto;
      }
      html:not(${Fe.general.peersPage}) .download-peers-button_page {
        display: none;
      }

      .download-peers-button__svg {
        width: 32px;
        height: 32px;
        color: #555;
      }
    </style>
  `}};let Fe;var De={init:function(){ze=at.getConfig().igSelectors,function(){const t=Symbol("handled");let e;c((()=>{const e=g(ze.profilePage.headerBody);e&&(e[t]||(e[t]=!0,n()))})),window.addEventListener("resize",(()=>{clearTimeout(e),e=setTimeout((()=>{const t=g(".get-insights-button-row");t&&(t.remove(),n())}))}));const n=()=>{const t='\n    <div class="get-insights-button-row">\n      <button class="get-insights-button-row__button">\n        <span class="emoji">🤖</span> Analyze Profile\n      </button>\n    </div>\n  ';g(ze.profilePage.headerBody).insertAdjacentHTML("beforeend",t);g(".get-insights-button-row__button").addEventListener("click",(()=>{const t=location.pathname.split("/")[1];J.send("feature-encourage.create-insights-task",t),J.send("ga.send-event","user","feature-encourage:get-insights-click")}))}}(),d`
    <style>
      .get-insights-button-row {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-top: 12px;
        margin-right: -4px;
      }

      .get-insights-button-row__button {
        height: 30px;
        padding: 0 9px;
        font-weight: 600;
        color: #00376b;
        background: transparent;
        border: 1px solid currentColor;
        border-radius: 4px;
        outline: none;
        cursor: pointer;
      }
      .get-insights-button-row__button:active {
        background: rgba(0, 0, 0, 0.03);
      }

      @media (max-width: 320px) {
        .get-insights-button-row__button {
          padding: 0 7px;
        }
      }
    </style>
  `}};let ze;var Be={create:function t({show:e=!1,onClick:n=null,removeOnClick:o=!1}={}){const i=t;i.init||(i.init=!0,d`
      <style>
        .spinner {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }
        .spinner:not(.spinner_visible) {
          display: none;
        }

        .spinner__inner {
          width: 100px;
          height: 100px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.96);
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          cursor: pointer;
        }
      </style>
    `);const r=document.createElement("div");r.innerHTML=`\n    <div class="spinner ${e?"spinner_visible":""}">\n      <div class="spinner__inner">\n        ${Dt()}\n      </div>\n    </div>\n  `;const a=r.firstElementChild;document.body.appendChild(a),o&&!n&&(n=()=>{a.remove()});if(n){g(".spinner__inner",a).addEventListener("click",n)}return a},toggle:function(t,e){t.classList.toggle("spinner_visible",e)}};var Oe={init:async function(){if(He=at.getConfig().igSelectors,je=await st("nav"),Ne=await st("store"),!Ne||!je)return;!function(){const t=Symbol("handled");c((()=>{const e=g(He.postCreation.imageContainer),n=g(He.postCreation.videoContainer),o=e||n;if(!o)return;if(o[t])return;o[t]=!0,o.insertAdjacentHTML("beforeend",'\n      <div class="extended-post-creation">\n        <div class="extended-post-creation__title">\n          Advanced Posting Options\n        </div>\n        <div class="extended-post-creation__content">\n          <button class="extended-post-creation__button" data-action="carousel">\n            <svg class="extended-post-creation__icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n              <path fill="none" d="M0 0h24v24H0z"/>\n              <path d="M10.03 22a4.283 4.283 0 01-2.605-.876 4.363 4.363 0 01-1.539-2.212h2a2.483 2.483 0 002.14 1.235h8.647a2.474 2.474 0 002.471-2.471V9.03a2.483 2.483 0 00-1.235-2.14v-2a4.365 4.365 0 012.212 1.539A4.283 4.283 0 0123 9.03v8.647A4.329 4.329 0 0118.677 22zm-3.706-3.706A4.328 4.328 0 012 13.97V5.324A4.328 4.328 0 016.324 1h8.646a4.328 4.328 0 014.324 4.324v8.646a4.328 4.328 0 01-4.324 4.324zM3.853 5.324v8.646a2.474 2.474 0 002.471 2.471h8.646a2.474 2.474 0 002.471-2.471V5.324a2.474 2.474 0 00-2.471-2.471H6.324a2.474 2.474 0 00-2.471 2.471z" fill="currentColor"/>\n            </svg>\n            <div class="extended-post-creation__label">\n              ADD FILES AND CREATE CAROUSEL\n            </div>\n          </button>\n          <button class="extended-post-creation__button" data-action="schedule">\n            <svg class="extended-post-creation__icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n              <path fill="none" d="M0 0h24v24H0z"/>\n              <path d="M13.841 1.565A9.936 9.936 0 003.906 11.5H.594l4.372 4.449 4.46-4.449H6.114a7.765 7.765 0 112.274 5.453L6.82 18.522a9.933 9.933 0 107.021-16.957zm-1.1 5.52v5.52l4.725 2.8.795-1.336-3.864-2.3V7.085z" fill="currentColor"/>\n            </svg>\n            <div class="extended-post-creation__label">\n              SCHEDULE POST\n            </div>\n          </button>\n        </div>\n      </div>\n    ');g('.extended-post-creation__button[data-action="carousel"]').addEventListener("click",(async()=>{const t=Ve();if(!t)return;const e=Be.create({show:!0,removeOnClick:!0});await J.send("feature-encourage.post-creation-carousel-click",t),e.remove(),je.push("/")}));g('.extended-post-creation__button[data-action="schedule"]').addEventListener("click",(async()=>{const t=Ve();if(!t)return;const e=Be.create({show:!0,removeOnClick:!0});await J.send("feature-encourage.post-creation-schedule-click",t),e.remove(),je.push("/")}))})),d`
    <style>
      .extended-post-creation {
        padding-top: 20px;
        padding-bottom: 40px;
        background: #FFF;
      }

      .extended-post-creation__title {
        font-family: Montserrat;
        font-size: 12px;
        font-weight: 500;
        line-height: 1.25;
        color: #A5AAAF;
        margin-left: 20px;
      }

      .extended-post-creation__content {
        margin-top: 10px;
      }

      .extended-post-creation__button {
        display: flex;
        align-items: center;
        padding: 5px 16px;
        background: transparent;
        outline: none;
        border: none;
        color: #415B72;
        font-weight: 600;
        cursor: pointer;
        transition: filter 0.3s;
      }
      .extended-post-creation__button:hover {
        filter: brightness(120%);
      }
      .extended-post-creation__button:active {
        filter: brightness(90%);
      }

      .extended-post-creation__icon {}

      .extended-post-creation__label {
        margin-left: 12px;
        font-family: Montserrat;
        font-size: 11px;
        line-height: 14px;
        font-weight: 700;
      }
    </style>
  `}()}};let He,je,Ne;function Ve(){var t,e;const n=Ne.getState(),o=(null===(t=n.creation)||void 0===t?void 0:t.sourceImage.file)||(null===(e=n.creation)||void 0===e?void 0:e.sourceVideo.file);if(!o)return null;const i=m.generate(),r=o.type.split("/").pop();return new File([o],`${i}.${r}`,{type:o.type})}var We={init:function(){ke.init(),Re.init(),Ie.init(),De.init(),Oe.init()}};var Ue=Object.assign((function(t,e={}){document.addEventListener("click",t,e)}),{off:function(t,e={}){document.removeEventListener("click",t,e)}});var qe={init:function(t){if(!t)return;if(t[Ye])return;t[Ye]=!0;let e=!1;t.addEventListener("mouseleave",(()=>{e=!1})),t.addEventListener("mousewheel",(n=>{n.deltaX&&(e=!0),e||(n.preventDefault(),t.scrollLeft+=n.deltaY)}))}};const Ye=Symbol("handled");const Xe=window.storyMentionsContentScript;var Ge={init:async function(){Je=at.getConfig().igSelectors,Ke=await st("http"),Ze=await st("store"),Xe.onStoryCreationReduce((t=>{"STORY_CREATION_SESSION_STARTED"===t.type&&(Qe={mentions:[],inputSize:{width:0,height:0},activeMention:null})})),function(){const t=Symbol("handled");c((()=>{const e=g(Je.storyCreation.topRightButtonsContainer);if(!e)return;if(e[t])return;e[t]=!0,e.insertAdjacentHTML("afterbegin",'\n      <button class="story-add-mention-button">\n        @\n      </button>\n    ');g(".story-add-mention-button").addEventListener("click",(()=>{Ze.dispatch({type:"STORY_CREATION_ENTER_ADD_TEXT"}),Ze.dispatch({type:"STORY_CREATION_CHANGE_TEXT",rawText:"@",width:21.71875,height:22}),Ze.dispatch({type:"SEARCH_QUERY_CLEARED"});const t=g(Je.storyCreation.textInput);t.textContent="@";const e=document.getSelection(),n=document.createRange();n.setStart(t,1),n.setEnd(t,1),e.removeAllRanges(),e.addRange(n)}))})),d`
    <style>
      .story-add-mention-button {
        height: 44px;
        position: relative;
        top: -1px;
        margin-right: 7px;
        font-size: 27px;
        font-weight: 500;
        font-family: montserrat;
        color: #FFF;
        background: transparent;
        text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
        border: none;
        outline: none;
        cursor: pointer;
        pointer-events: all;
      }
    </style>
  `}(),function(){const t=Symbol("listenerAdded");c((()=>{const e=g(Je.storyCreation.textInput);e&&(Qe.inputSize.width=e.offsetWidth,Qe.inputSize.height=e.offsetHeight,e[t]||(e[t]=!0,e.addEventListener("input",(()=>{Qe.inputSize.width=e.offsetWidth,Qe.inputSize.height=e.offsetHeight}))))}))}(),function(){const t=Symbol("handled");c((()=>{const e=g(Je.storyCreation.mentionReel);e&&(e[t]||(e[t]=!0,qe.init(e)))})),Ue((t=>{const e=t.target.closest(Je.storyCreation.mentionReelItem);if(!e)return;const n=g(Je.storyCreation.textInput);if(!n)return;const o=`@${e.innerText}`;n.textContent=o;const i=n.getBoundingClientRect();Ze.dispatch({type:"STORY_CREATION_CHANGE_TEXT",width:i.width,height:i.height,rawText:o}),Ze.dispatch({type:"STORY_CREATION_SAVE_TEXT",renderText:[o],timeSpent:5e3})})),d`
    <style>
      ${Je.storyCreation.mentionReelItem} {
        cursor: pointer;
      }

      .theme-night ${Je.storyCreation.mentionReelItemName} {
        filter: url(#theme-reverse-filter);
      }

      ${Je.storyCreation.textInput} {
        position: relative;
        top: 20px;
      }
    </style>
  `}(),Xe.onStoryCreationReduce(((t,e)=>{if("STORY_CREATION_SAVE_TEXT"!==t.type)return;if(1!==t.renderText.length)return;if(!t.renderText[0].startsWith("@"))return;const n=t.renderText[0].replace("@","");if(Qe.activeMention)Object.assign(Qe.activeMention,{username:n,width:Qe.inputSize.width,height:Qe.inputSize.height});else{const t=e.canvasStickers.find((t=>t.rawText===`@${n}`));if(!t)return;Qe.mentions.push({username:n,x:t.x,y:t.y,width:Qe.inputSize.width,height:Qe.inputSize.height})}})),Xe.onStoryCreationReduce(((t,e)=>{if("STORY_CREATION_CHANGE_STICKER_ORDER"!==t.type)return;const n=t.bumpIndex,o=e.canvasStickers[n];if(o&&o.rawText&&o.rawText.startsWith("@")){const t=o.rawText.replace("@",""),e=Qe.mentions.find((e=>e.username===t));Qe.activeMention=e||null}else Qe.activeMention=null})),Xe.onStoryCreationReduce((t=>{"STORY_CREATION_ENTER_ADD_TEXT"===t.type&&(Qe.activeMention=null)})),Xe.onStoryCreationReduce((t=>{"STORY_CREATION_MOVE_CANVAS_STICKER"===t.type&&Qe.activeMention&&(Qe.activeMention.x+=t.deltaX,Qe.activeMention.y+=t.deltaY)})),Xe.onStoryCreationReduce((t=>{"STORY_CREATION_DELETE_CANVAS_STICKER"===t.type&&Qe.activeMention&&function(t,e){let n;n="function"==typeof e?t.findIndex(e):t.indexOf(e),-1!==n&&t.splice(n,1)}(Qe.mentions,Qe.activeMention)})),function(){if(!Ke)return;const t=Ke.post;Ke.post=(...e)=>{if("/create/configure_to_story/"===e[0]&&Qe.mentions.length>0){const t=JSON.parse(JSON.stringify(Ze.getState()));e[1]={...e[1],reel_mentions:JSON.stringify(Qe.mentions.map((e=>{const n=t.users.usernameToId[e.username];if(!n)return null;const o=g(Je.storyCreation.root)||document.body;return{user_id:n,x:Math.max(0,e.x/o.offsetWidth),y:Math.max(0,e.y/o.offsetHeight),width:e.width/o.offsetWidth,height:e.height/o.offsetHeight,rotation:0}})).filter(Boolean))}}return t.call(Ke,...e)}}()}};let Je,Ke,Ze,Qe={mentions:[],inputSize:{width:0,height:0},activeMention:null};var tn={init:function(){en=at.getConfig().igSelectors,async function(){const t="Published from Desktop with @InssistApp";let n=e.get("watermark.post-creation-removed-times",0);if(3===n)return;let o=!1;if(!await J.send("watermark.check-enabled"))return;const i=XMLHttpRequest.prototype.send;XMLHttpRequest.prototype.send=function(...e){const n="POST"===this.method&&"/create/configure/"===this.url,r="POST"===this.method&&this.url.includes("/configure_to_clips/");if((n||r)&&o&&!nn){const n=new URLSearchParams(e[0]),o=n.get("caption");let i;i=o.trim().length>0?`${o}\n.\n${t}`:t,n.set("caption",i),e[0]=n.toString()}return i.call(this,...e)};const r=Symbol("handled");c((()=>{if(3===n)return;const i=g(en.postCreation.captionContainer);if(!i)return;if(i[r])return;i[r]=!0,o=!0,ge.classList.add("post-caption-watermark--show"),i.insertAdjacentHTML("beforeend",`\n      <div class="post-caption-watermark">\n        ${t}\n        <svg\n          class="post-caption-watermark__remove-button"\n          xmlns="http://www.w3.org/2000/svg"\n          viewBox="0 0 16 16">\n          <path fill="#fff" d="M0 0h16v16H0z"/>\n          <path d="M5.05 10.32l2.425-2.425L5.051 5.47l.524-.524L8 7.37l2.425-2.424.525.525-2.425 2.425 2.424 2.424-.525.525L7.999 8.42l-2.424 2.424z" fill="currentColor"/>\n        </svg>\n      </div>\n    `);g(".post-caption-watermark__remove-button").addEventListener("click",(()=>{o=!1,ge.classList.remove("post-caption-watermark--show"),n+=1,e.set("watermark.post-creation-removed-times",n)}))})),d`
    <style>
      .post-caption-watermark--show:not(.post-caption-watermark--disabled) ${en.postCreation.captionContainer} {
        padding-bottom: 32px;
      }

      .post-caption-watermark {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 0 14px 8px;
        font-size: 14px;
        color: #A5AAAF;
        font-family: "Helvetica Neue", BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        white-space: nowrap;
      }
      html:not(.post-caption-watermark--show) .post-caption-watermark,
      html.post-caption-watermark--disabled .post-caption-watermark {
        display: none;
      }
      @media (min-width: 320px) {
        .post-caption-watermark {
          justify-content: flex-start;
        }
      }

      .post-caption-watermark__remove-button {
        margin-left: 6px;
        width: 16px;
        height: 16px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.2s;
        position: relative;
        top: 1px;
        flex-shrink: 0;
      }
      ${en.postCreation.captionContainer}:hover .post-caption-watermark__remove-button {
        opacity: 1;
      }
    </style>
  `}()},toggle:function(t=!1){nn=!t,ge.classList.toggle("post-caption-watermark--disabled",nn)}};let en,nn=!1;var on={init:function(){window.addEventListener("focus",rn),window.addEventListener("blur",an)}};function rn(){J.send("dnd-iframe-fix.focus")}function an(){J.send("dnd-iframe-fix.blur")}var sn={initForIg:function(){ln()},initForFcs:function(){ln(),function(){const t=at.getConfig().fcsSelectors;c((function t(e){const o=g("body");if(!o)return;c.off(t);new MutationObserver(n).observe(o,{childList:!0,subtree:!0}),n(e)}));let e=!1;function n(n){if(e)return;const o=n.map((t=>Array.from(t.addedNodes))).flat();if(0===o.length)return;const i=window.inssist.theme.emojiRegex,r=(g("body").innerText.match(i)||[]).filter((t=>!"0123456789#*↪".includes(t)));if(0===r.length)return;const a=[],s=Array.from(new Set(r)),l=["input","textarea","[contenteditable]",t.sidePanel.postPreviewCaption].map((t=>f(t))).flat();o.forEach((t=>{let e;if(e=t.nodeType===Node.ELEMENT_NODE?t:t.parentElement,!e)return;const n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT);for(;;){const t=n.nextNode();if(!t)break;const e=t.textContent;if(!s.some((t=>e.includes(t))))continue;if(l.some((e=>e.contains(t))))continue;const o=t.parentElement;o.classList.contains("emoji")||(a.includes(o)||a.push(o))}})),requestAnimationFrame((()=>{e=!0,a.forEach((t=>{if(!document.body.contains(t))return;let e=t.innerHTML;s.forEach((t=>{const n=`<span class="emoji">${t}</span>`;e=e.split(n).join("__$%#^__").split(t).join(n).split("__$%#^__").join(n)})),t.innerHTML=e})),e=!1}))}}()}};function ln(){d`
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
  `}var dn={initForIg:function(){cn(),sn.initForIg()},initForFcs:function(){cn(),sn.initForFcs()}};function cn(){!async function(){pn(await J.send("theme.get-theme"))}(),async function(){J.on("theme.switch-theme",(t=>{pn(t)}))}()}function pn(t){t&&(ge.classList.remove("theme-day"),ge.classList.remove("theme-night"),ge.classList.add(`theme-${t}`))}var un={init:function(){gn=at.getConfig().igSelectors,async function(){const t=document.documentElement,e=await J.send("zen.is-enabled");t.classList.toggle("zen--enabled",e),J.on("zen.toggled",(e=>{t.classList.toggle("zen--enabled",e)}))}(),function(){const t=Symbol("handled");c((()=>{f(gn.feedPage.postHeader).forEach((e=>{if(e[t])return;e[t]=!0;const n=e.closest(gn.feedPage.post);if(!n)return;const o=g(gn.feedPage.postActions,n);if(!o)return;const i=g(gn.feedPage.postThreeDotsButton,n);if(!i)return;const r=()=>{n.classList.add("zen--post-with-hovered-header")},a=()=>{n.classList.remove("zen--post-with-hovered-header")};e.addEventListener("mouseenter",r),o.addEventListener("mouseenter",r),i.addEventListener("mouseenter",r),e.addEventListener("mouseleave",a),o.addEventListener("mouseleave",a),i.addEventListener("mouseleave",a)}))}))}(),async function(){const t=await st("nav");if(!t)return;J.on("zen.toggled",(e=>{e&&"/"!==location.pathname&&t.push("/")}))}(),function(){const t=Symbol("handled");c((()=>{f(gn.feedPage.post).forEach((e=>{e[t]||(e[t]=!0,f("[alt]",e).forEach((t=>{t.removeAttribute("alt")})))}))}))}(),d`
    <style>
      .zen--enabled[data-page="feedPage"] ${gn.feedPage.followSuggestions} {
        margin: 10px 14px;
      }

      .zen--enabled[data-page="feedPage"] ${gn.feedPage.postPhoto},
      .zen--enabled[data-page="feedPage"] ${gn.feedPage.postVideo},
      .zen--enabled[data-page="feedPage"] ${gn.feedPage.postVideoContainer},
      .zen--enabled[data-page="feedPage"] ${gn.feedPage.postPhotoContainer},
      .zen--enabled[data-page="feedPage"] ${gn.feedPage.postMediaContainer},
      .zen--enabled[data-page="feedPage"] ${gn.feedPage.postCarouselContainer} {
        max-height: 70vh;
      }

      .zen--enabled[data-page="feedPage"] ${gn.feedPage.postMediaContainer} {
        background: #FFF !important;
      }

      .zen--enabled[data-page="feedPage"] ${gn.feedPage.post} {
        background: #1b1b1b;
        overflow: hidden;
        margin: 8px 16px 5px 16px;
        border-radius: 8px;
      }
      .zen--enabled[data-page="feedPage"] ${gn.feedPage.post}:first-child {
        margin-top: 0;
      }

      /* semitransparent border */
      .zen--enabled[data-page="feedPage"] ${gn.feedPage.post}::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border: 1px solid rgba(0, 0, 0, 0.1);
        z-index: 1;
        pointer-events: none;
        border-radius: inherit;
      }

      .zen--enabled[data-page="feedPage"] ${gn.feedPage.postHeader} {
        position: absolute;
        top: 0;
        left: 0;
        height: 56px;
        z-index: 1;
        border-color: transparent;
        background: rgba(0, 0, 0, 0.4);
        padding: 0 18px 0 14px;
        border-radius: 8px 0 16px 0;
      }
      .zen--enabled.theme-night[data-page="feedPage"] ${gn.feedPage.postHeader} {
        background: rgba(255, 255, 255, 0.2);
      }
      .zen--enabled[data-page="feedPage"] .zen--post-with-hovered-header ${gn.feedPage.postHeader} {
        height: 96px;
        right: 0;
        border-radius: 8px 8px 0 0;
      }

      .zen--enabled[data-page="feedPage"] ${gn.feedPage.postHeaderItem} {
        position: relative;
      }
      .zen--enabled[data-page="feedPage"] .zen--post-with-hovered-header ${gn.feedPage.postHeaderItem} {
        top: -20px;
      }

      /* hitbox when header is hovered */
      .zen--enabled[data-page="feedPage"] .zen--post-with-hovered-header ${gn.feedPage.postHeader}::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: -20px;
      }

      /* divider between actions */
      .zen--enabled[data-page="feedPage"] .zen--post-with-hovered-header ${gn.feedPage.postHeader}::after {
        content: "";
        position: absolute;
        top: 56px;
        left: 12px;
        right: 12px;
        height: 1px;
        border-top: 1px solid #fff;
        transform: scaleY(0.5);
        opacity: 0.25;
      }
      .zen--enabled.theme-night[data-page="feedPage"] ${gn.feedPage.postHeader}::after {
        filter: url(#theme-reverse-filter);
      }

      .zen--enabled[data-page="feedPage"] ${gn.feedPage.postHeader} * {
        color: #FFF !important;
      }
      .zen--enabled.theme-night[data-page="feedPage"] ${gn.feedPage.postHeader} * {
        color: #000 !important;
      }

      .zen--enabled[data-page="feedPage"] ${gn.feedPage.postLocationRow} {
        display: flex;
        flex-direction: row;
        align-items: baseline;
      }

      .zen--enabled[data-page="feedPage"] ${gn.feedPage.postHashtagLocation} {
        margin-left: 12px;
      }

      .zen--enabled[data-page="feedPage"] ${gn.feedPage.postHashtagLocation}::before {
        content: '';
        position: absolute;
        width: 4px;
        height: 4px;
        top: 6px;
        left: -8px;
        background: #fff;
        border-radius: 50%;
      }
      .zen--enabled.theme-night[data-page="feedPage"] ${gn.feedPage.postHashtagLocation}::before {
        background: #000;
      }

      .zen--enabled[data-page="feedPage"] ${gn.feedPage.postThreeDotsButton} {
        z-index: 1;
        opacity: 0;
        pointer-events: none;
        top: -1px;
        right: 8px;
      }

      .zen--enabled[data-page="feedPage"] .zen--post-with-hovered-header ${gn.feedPage.postThreeDotsButton} {
        opacity: 1;
        pointer-events: all;
      }

      .zen--enabled[data-page="feedPage"] ${gn.feedPage.postThreeDotsButton} svg {
        fill: #FFF;
      }
      .zen--enabled.theme-night[data-page="feedPage"] ${gn.feedPage.postThreeDotsButton} svg {
        fill: #000;
      }

      .zen--enabled[data-page="feedPage"] ${gn.feedPage.postFooter} {
        position: absolute;
      }

      .zen--enabled[data-page="feedPage"] ${gn.feedPage.postActions} {
        display: none;
        position: absolute;
        top: 57px;
        left: 17px;
        z-index: 1;
        margin: 0 !important;
        transform: scale(0.73);
        transform-origin: left center;
        pointer-events: none;
      }
      .zen--enabled[data-page="feedPage"] .zen--post-with-hovered-header ${gn.feedPage.postActions} {
        display: inherit;
        pointer-events: all;
      }

      .zen--enabled[data-page="feedPage"] ${gn.feedPage.postAction} {
        margin-right: 7px;
      }

      .zen--enabled[data-page="feedPage"] ${gn.feedPage.postAction} svg {
        fill: #FFF;
        stroke: #FFF;
      }
      .zen--enabled.theme-night[data-page="feedPage"] ${gn.feedPage.postAction} svg {
        fill: #000;
        stroke: #000;
      }

      .zen--enabled[data-page="feedPage"] ${gn.feedPage.postUnderActionsContent} {
        display: none;
      }

      .zen--enabled[data-page="feedPage"] ${gn.feedPage.carouselDots} {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
      }

      .zen--enabled[data-page="feedPage"] ${gn.feedPage.carouselDot} {
        background: #FFF;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
      }
      .zen--enabled.theme-night[data-page="feedPage"] ${gn.feedPage.carouselDot} {
        filter: url(#theme-reverse-filter);
      }

      .zen--enabled[data-page="feedPage"] ${gn.feedPage.carouselActiveDot} {
        background: #97D6FF;
      }

      .zen--enabled[data-page="feedPage"] ${gn.feedPage.postMentionsButton} {
        display: none;
      }

      @media (max-width: 500px) {
        .zen--enabled[data-page="feedPage"] ${gn.feedPage.post}:first-child {
          margin-top: 16px !important;
        }
      }

      @media (max-width: 350px) {
        .zen--enabled[data-page="feedPage"] ${gn.feedPage.followSuggestions} {
          margin-left: 0;
          margin-right: 0;
        }
      }
    </style>
  `}};let gn;var fn={init:function(){mn=at.getConfig().igSelectors,hn=document.documentElement,function(){const t=window.inssist.url,e=Symbol("handled");c((()=>{const n=g(mn.postCreation.captionContainer);n&&(n[e]||(n[e]=!0,n.insertAdjacentHTML("afterend",`\n      <div class="new-post-extra">\n        <button class="new-post-extra__button" data-option="cover-assist">\n          <img\n            class="new-post-extra__button-icon"\n            src="${t}img/new-post-extra-cover-assist.png">\n          <div class="new-post-extra__button-text">\n            Custom Cover\n          </div>\n          <svg\n            class="new-post-extra__button-chevron-icon"\n            xmlns="http://www.w3.org/2000/svg"\n            width="7.5"\n            height="12.357"\n            viewBox="0 0 7.5 12.357">\n            <path d="M7.301 6.659l-5.5 5.5a.679.679 0 01-.961 0l-.641-.641a.679.679 0 010-.959l4.358-4.38L.198 1.8a.679.679 0 010-.959L.839.2A.679.679 0 011.8.2l5.5 5.5a.679.679 0 01.001.959z" fill="currentColor"/>\n          </svg>\n        </button>\n        <button class="new-post-extra__button" data-option="tag-assist">\n          <img\n            class="new-post-extra__button-icon"\n            src="${t}img/new-post-extra-tag-assist.png">\n          <div class="new-post-extra__button-text">\n            Hashtag Assistant\n          </div>\n          <svg\n            class="new-post-extra__button-chevron-icon"\n            xmlns="http://www.w3.org/2000/svg"\n            width="7.5"\n            height="12.357"\n            viewBox="0 0 7.5 12.357">\n            <path d="M7.301 6.659l-5.5 5.5a.679.679 0 01-.961 0l-.641-.641a.679.679 0 010-.959l4.358-4.38L.198 1.8a.679.679 0 010-.959L.839.2A.679.679 0 011.8.2l5.5 5.5a.679.679 0 01.001.959z" fill="currentColor"/>\n          </svg>\n          </div>\n        </button>\n      </div>\n    `)))})),hn.addEventListener("click",(t=>{const e=t.target.closest(".new-post-extra__button");if(!e)return;const n=e.dataset.option;J.send("new-post-extra.click-option",n)})),d`
    <style>
      .new-post-extra {
        background: #FFF;
        border-bottom: 1px solid #DBDBDB;
        padding: 5px 0;
      }

      .new-post-extra__button {
        display: flex;
        align-items: center;
        border: none;
        outline: none;
        background: transparent;
        padding: 6px 18px 6px 14px;
        cursor: pointer;
      }
      html:not(.new-post-extra--video) .new-post-extra__button[data-option="cover-assist"] {
        display: none;
      }

      .new-post-extra__button-icon {
        width: 24px;
        height: 24px;
        margin-right: 12px;
      }

      .new-post-extra__button-text {
        font-family: Montserrat;
        font-size: 14px;
        line-height: 20px;
        font-weight: 500;
      }

      .new-post-extra__pro-badge {
        padding: 2px 8px 3px;
        border-radius: 3px;
        background: linear-gradient(183deg, #fd7726 -14%, #ef1834 60%, #c70bc0 128%);
        font-size: 9px;
        line-height: 11px;
        font-weight: 600;
        color: #FFF;
        margin-left: 16px;
      }

      .new-post-extra__button-chevron-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 21px;
        height: 21px;
        border-radius: 50%;
        box-sizing: border-box;
        padding: 4px 6px;
        margin-left: auto;
        color: #A5A7AA;
        position: relative;
        right: -5px;
      }
      .new-post-extra__button_selected .new-post-extra__button-chevron-icon {
        color: #FFF;
        background: #1BA2F9;
      }
    </style>
  `}(),J.on("new-post-extra.synch-selected-option",(t=>{f(".new-post-extra__button").forEach((t=>t.classList.remove("new-post-extra__button_selected"))),t&&g(`.new-post-extra__button[data-option="${t}"]`).classList.add("new-post-extra__button_selected")})),async function(){const t=await st("store");if(!t)return;let e=!1;c((()=>{const n=!!g(mn["new-post_textarea"]);if(e!==n)if(e=n,e){const e=t.getState(),n=!!lt((()=>e.creation.coverPhoto.file));J.send("new-post-extra.enter-page",{isVideo:n})}else J.send("new-post-extra.exit-page")}))}(),async function(){const t=await st("store");if(!t)return;let e=null;t.subscribe((()=>{var n;const o=null===(n=t.getState().creation)||void 0===n?void 0:n.sourceVideo,i=o&&o.file||null;if(e===i)return;const r=i?URL.createObjectURL(i):null;hn.classList.toggle("new-post-extra--video",!!r),J.send("new-post-extra.creation-video-change",r),e=i}))}()}};let mn,hn;var bn={init:function(){vn=at.getConfig().igSelectors,async function(){let t=null;const e=await st("store");if(!e)return;J.on("cover-assist.synch-cover",(n=>{const o=g(vn.postCreation.previewPostImage);if(!o)return;const i=e.getState();n?(i.creation.sessionId!==t&&(t=i.creation.sessionId,yn={url:i.creation.coverPhoto.dataURL,blob:i.creation.coverPhoto.file}),i.creation.coverPhoto.dataURL=URL.createObjectURL(n),i.creation.coverPhoto.file=n):i.creation.sessionId===t&&(i.creation.coverPhoto.dataURL=yn.url,i.creation.coverPhoto.file=yn.blob),o.src=i.creation.coverPhoto.dataURL}))}(),J.on("cover-assist.get-default-ig-cover-url",wn)}};let vn,yn=null;async function wn(){var t,e;const n=await st("store");return n?yn?yn.url:null===(t=n.getState().creation)||void 0===t||null===(e=t.coverPhoto)||void 0===e?void 0:e.dataURL:null}var xn={init:async function(){if(kn=await st("http"),!kn)return;_n=at.getConfig().igSelectors,function(){const t=Symbol("handled");c((()=>{requestAnimationFrame((()=>{const e=g(_n.storyCreation.videoHeader),n=g(".story-add-mention-button"),o=e||n;if(!o)return;if(o[t])return;o[t]=!0;const i='\n        <button class="story-add-link-button">\n          <svg class="story-add-link-button__svg" xmlns="http://www.w3.org/2000/svg" width="23.438" height="23.443" viewBox="0 0 23.438 23.443">\n            <defs>\n              <filter id="a" x="0" y="0" width="23.438" height="23.443" filterUnits="userSpaceOnUse">\n                <feOffset dy="1"/>\n                <feGaussianBlur stdDeviation=".5" result="blur"/>\n                <feFlood flood-opacity=".2"/>\n                <feComposite operator="in" in2="blur"/>\n                <feComposite in="SourceGraphic"/>\n              </filter>\n            </defs>\n            <g filter="url(#a)">\n              <path d="M10.248 13.251a1.06 1.06 0 01-.752-.311 4.994 4.994 0 010-7.054l3.925-3.925a4.988 4.988 0 117.054 7.049l-1.794 1.8a1.063 1.063 0 11-1.5-1.5l1.791-1.8a2.862 2.862 0 00-4.048-4.047l-3.925 3.926a2.865 2.865 0 000 4.048 1.063 1.063 0 01-.752 1.815zm-3.767 7.691a4.988 4.988 0 01-3.527-8.515l1.794-1.794a1.063 1.063 0 111.5 1.5L4.46 13.931a2.862 2.862 0 004.048 4.047l3.925-3.925a2.865 2.865 0 000-4.048 1.063 1.063 0 111.5-1.5 4.994 4.994 0 010 7.054l-3.925 3.925a4.956 4.956 0 01-3.527 1.461z" fill="currentColor"/>\n            </g>\n          </svg>\n        </button>\n      ';e?e.insertAdjacentHTML("beforeend",i):n.insertAdjacentHTML("beforebegin",i)}))})),d`
    <style>
      ${_n.storyCreation.videoHeader} {
        align-items: center;
      }

      .story-add-link-button {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 44px;
        margin-right: 10px;
        color: #FFF;
        background: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        pointer-events: all;
        position: relative;
      }
      .story-add-link-button--locked .story-add-link-button {
        opacity: 0.5;
        cursor: default;
      }

      /* dot when link is attached */
      .story-add-link-button_has-link::before {
        content: '';
        position: absolute;
        top: 26px;
        right: 3px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16);
        border-radius: 50%;
        width: 10px;
        height: 10px;
        background: #1BA2F9;
      }

      .story-add-link-button__svg {
        width: 26px;
        height: 26px;
        position: relative;
        top: 3px;
      }

      .story-add-link-button__tooltip {
        margin-top: 6px;
        margin-left: -5px;
        white-space: nowrap;
      }
    </style>
  `}(),function(){const t=Symbol("handled");c((()=>{const e=g(_n.storyCreation.root);e&&(e[t]||(e[t]=!0,e.insertAdjacentHTML("beforeend",'\n      <div class="story-add-link-modal">\n        <div class="story-add-link-modal__window">\n          <div class="story-add-link-modal__header">\n            <div class="story-add-link-modal__title">Add Swipe Up Link</div>\n            <div class="story-add-link-modal__remove-button">Remove</div>\n          </div>\n          <input class="story-add-link-modal__input" placeholder="https://website.com"/>\n          <div class="story-add-link-modal__info story-add-link-modal__info_default">\n            Viewers will be able to swipe up to visit this website.\n            <span class="story-add-link-modal__trial-message">\n              Custom links left on free plan:\n              <span class="story-add-link-modal__trial-left-count"></span>\n            </span>\n          </div>\n          <div class="story-add-link-modal__info story-add-link-modal__info_pro">\n            <div class="story-add-link-modal__info-pro-badge">PRO</div>\n            Please consider upgrading to use this feature and support development.\n          </div>\n          <div class="story-add-link-modal__buttons">\n            <button class="story-add-link-modal__button story-add-link-modal__button_pro">\n              Upgrade to PRO\n            </button>\n            <button class="story-add-link-modal__button story-add-link-modal__button_save">\n              Save Link\n            </button>\n            <button class="story-add-link-modal__button story-add-link-modal__button_cancel">\n              Cancel\n            </button>\n          </div>\n        </div>\n      </div>\n    ')))})),d`
    <style>
      .story-add-link-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        background: rgba(255, 255, 255, 0.95);
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        transition: opacity 150ms, transform 150ms;
      }
      .story-add-link-modal:not(.story-add-link-modal_shown) {
        opacity: 0;
        transform: scale(1.1);
        pointer-events: none;
      }
      .theme-night .story-add-link-modal {
        background: rgba(234, 234, 234, 0.95);
      }

      .story-add-link-modal__window {
        border-radius: 8px;
        width: calc(100% - 16px);
        max-width: 310px;
        padding: 20px 16px;
        background: #FFF;
        box-shadow: 0 3px 12px rgba(0, 0, 0, 0.16);
      }
      .theme-night .story-add-link-modal__window {
        box-shadow: 0 3px 12px rgba(255, 255, 255, 0.16);
      }

      .story-add-link-modal__header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }

      .story-add-link-modal__title {
        font-size: 14px;
        font-weight: 700;
      }

      .story-add-link-modal__remove-button {
        font-size: 12px;
        font-weight: 700;
        color: #C47581;
        user-select: none;
        cursor: pointer;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0s;
      }
      .story-add-link-modal_has-link .story-add-link-modal__remove-button {
        opacity: 1;
        pointer-events: all;
        transition-delay: 2000ms;
      }

      .story-add-link-modal__input {
        margin-top: 16px;
        background: #F7F7F9;
        border: 1px solid #EFEFEF;
        border-radius: 3px;
        padding: 10px 8px;
        color: #262626;
        font-size: 14px;
      }
      .story-add-link-modal__input::placeholder {
        color: #262626;
        opacity: 0.3;
      }
      .theme-night .story-add-link-modal__input {
        border-color: #1F1F1F;
        background: #080808 !important;
      }
      .theme-night .story-add-link-modal__input::placeholder {
        color: #B3B2B2;
      }

      .story-add-link-modal__info {
        margin-top: 8px;
        color: #B6B6B6;
        font-size: 12px;
        line-height: 16px;
        display: block;
      }
      .story-add-link-modal__info_default {}
      .story-add-link-modal__info_pro {
        display: flex;
        flex-direction: row;
      }
      .story-add-link-modal_need-pro .story-add-link-modal__info_default,
      .story-add-link-modal:not(.story-add-link-modal_need-pro) .story-add-link-modal__info_pro {
        display: none;
      }

      .story-add-link-modal__info-pro-badge {
        flex-shrink: 0;
        margin-right: 12px;
        padding: 2px 8px 3px;
        border-radius: 3px;
        background: linear-gradient(183deg, #fd7726 -14%, #ef1834 60%, #c70bc0 128%);
        font-size: 9px;
        line-height: 11px;
        font-weight: 600;
        color: #FFF;
        align-self: flex-start;
        position: relative;
        top: 2px;
      }
      .theme-night .story-add-link-modal__info-pro-badge {
        filter: url(#theme-reverse-filter);
      }

      .story-add-link-modal_has-pro .story-add-link-modal__trial-message {
        display: none;
      }

      .story-add-link-modal__buttons {
        display: flex;
        flex-direction: row;
        margin-top: 16px;
      }

      .story-add-link-modal__button {
        color: #FFF;
        background: #1BA2F9;
        border: none;
        margin-right: 12px;
        cursor: pointer;
        padding: 5px 12px;
        font-size: 14px;
        font-weight: 500;
        border-radius: 4px;
        font-weight: 600;
        user-select: none;
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      .story-add-link-modal__button:last-child {
        margin-right: 0;
      }
      .story-add-link-modal__button_pro {
        background: #FFCC24;
      }
      .story-add-link-modal__button_save {}
      .story-add-link-modal__button_cancel {
        color: #262626;
        border: 1px solid #dbdbdb;
        background: transparent;
      }
      .story-add-link-modal_saving .story-add-link-modal__button_save {
        pointer-events: none;
        opacity: 0.3;
      }
      .story-add-link-modal_need-pro .story-add-link-modal__button_save,
      .story-add-link-modal:not(.story-add-link-modal_need-pro) .story-add-link-modal__button_pro {
        display: none;
      }
      .theme-night .story-add-link-modal__button_save {
        color: #000;
      }
      .theme-night .story-add-link-modal__button_pro {
        color: #000;
        filter: url(#theme-reverse-filter);
      }
    </style>
  `}(),function(){const t=Symbol("handled");c((()=>{requestAnimationFrame((async()=>{const e=g(".story-add-link-modal");if(!e)return;if(e[t])return;e[t]=!0,En="";const{hasEnoughFollowers:n,needProUpgrade:o,hasProPaid:i,trialLeftCount:r}=await J.send("story-link.get-user-data");Cn.hasEnoughFollowers=n,ge.classList.toggle("story-add-link-button--locked",!n),e.classList.toggle("story-add-link-modal_need-pro",o),e.classList.toggle("story-add-link-modal_has-pro",i),g(".story-add-link-modal__trial-left-count").innerText=r,me({class:"story-add-link-button__tooltip",anchor:g(".story-add-link-button"),text:n?"Add Swipe Up Link":"Swipe Up Links available for<br>accounts of 10k+ followers"})}))}))}(),function(){const t=t=>{g(".story-add-link-modal").classList.toggle("story-add-link-modal_shown",t)},e=t=>{const e=g(".story-add-link-modal"),n=g(".story-add-link-button"),o=g(".story-add-link-modal__input");let i;i=t?/^https?:\/\//.test(t)?t:`https://${t}`:"",En=i,o.value=i,e.classList.toggle("story-add-link-modal_has-link",!!i),n.classList.toggle("story-add-link-button_has-link",!!i)};document.addEventListener("keydown",(t=>{if("Escape"===t.key){const t=g(".story-add-link-modal__button_cancel");if(!t)return;t.click()}else if("Enter"===t.key){if(!t.target.closest(".story-add-link-modal__input"))return;if(t.target.closest(".story-add-link-modal_need-pro"))return;g(".story-add-link-modal__button_save").click()}})),document.addEventListener("click",(n=>{const o=g(".story-add-link-modal__input");if(n.target.closest(".story-add-link-button")){if(!Cn.hasEnoughFollowers)return;t(!0),o.focus()}else if(n.target.closest(".story-add-link-modal__button_save")){e(o.value),g(".story-add-link-modal"),J.send("story-link.save-click");const n=g(".story-add-link-modal"),i=g(".story-add-link-modal__button_save"),r=i.innerText;n.classList.add("story-add-link-modal_saving"),i.innerText="Saving...",setTimeout((()=>{t(!1),n.classList.remove("story-add-link-modal_saving"),i.innerText=r}),2e3)}else n.target.closest(".story-add-link-modal__button_cancel")?(o.value=En,t(!1)):n.target.closest(".story-add-link-modal__button_pro")?J.send("story-link.upgrade-to-pro-click"):n.target.closest(".story-add-link-modal__remove-button")?(e(""),t(!1)):n.target.closest(".story-add-link-modal")&&!n.target.closest(".story-add-link-modal__window")&&(o.value=En,t(!1))}))}(),function(){const t=kn.post.bind(kn);kn.post=(...e)=>("/create/configure_to_story/"===e[0]&&En&&(J.send("story-link.story-with-link-submit"),e[1]={...e[1],story_cta:JSON.stringify([{links:[{webUri:En}]}])}),t(...e))}()}};let _n,kn,En;const Cn={hasEnoughFollowers:!1};var Pn={init:function(){!async function(){const t=at.getConfig(),e=await st("gatekeeper");if(!e)return;const n=e.passesGatekeeper.bind(e);e.passesGatekeeper=(...e)=>{const o=String(e[0]);return t.ig.gatekeeperIds.includes(o)||window.inssist.gatekeeper.gatekeeperIds.includes(o)||n(...e)}}()}};var Sn={removeMetadata:async function(t){const e=await $n(),n=t.type.split("/")[1],o=`input-${Date.now()}.${n}`,i=`output-${Date.now()}.${n}`,r=await e.fetchFile(t);e.FS("writeFile",o,r),await e.run("-i",o,"-map_metadata","-1","-c:v","copy","-c:a","copy",i);const a=e.FS("readFile",i),s=new Blob([a.buffer],{type:t.type});return e.FS("unlink",i),s}};async function $n(){const t=$n;return t.promise||(t.promise=new Promise(((t,e)=>{const n=document.createElement("script");n.src="https://unpkg.com/@ffmpeg/ffmpeg@0.9.6/dist/ffmpeg.min.js",document.head.insertAdjacentElement("beforeend",n);const o=setTimeout((()=>{e("ffmpeg initialization timed out"),clearInterval(i)}),12e3),i=setInterval((()=>{const n=window.FFmpeg;if(!n)return;clearInterval(i),clearTimeout(o);const r=n.createFFmpeg();r.fetchFile=n.fetchFile.bind(n),r.load().then((()=>{t(r)})).catch((t=>{e("failed to load ffmpeg",t)}))}),1e3)}))),t.promise}var An={init:async function(){if(Tn=await st("api"),Ln=await st("store"),!Tn||!Ln)return;!function(){let t;const e=()=>{const t=Ln.getState(),e=t.creation,n=t.storyCreation;return n.sessionId?n:e};let n=-1;Ln.subscribe((async()=>{var o;if(!e())return;const i=e().sessionId;if(!i)return;if(n===i)return;const r=null===(o=e().sourceVideo)||void 0===o?void 0:o.file;if(!r)return;let a;n=i,t=function(){let t;const e=new Promise((e=>{t=e}));return Object.defineProperty(e,"resolve",{get:()=>t}),e}();try{const t=await Sn.removeMetadata(r);a=new File([t],r.name,{type:r.type})}catch(t){console.error("failed to remove metadata",t)}i===e().sessionId?t.resolve(a||r):t=null}));const o=Tn.ruploadVideo;Tn.ruploadVideo=async(...e)=>{if(t){const n=await t;e[0].file=n}return o.call(Tn,...e)}}()}};let Tn,Ln;var Rn={init:function(){if(Mn=!!window.electron,In=o.isIframe()&&o.getParams().isElectron,!Mn&&!In)return;Mn&&J.on("electron-links.open-url",Fn);document.addEventListener("click",(t=>{const e=t.target.closest("a");if(!e)return;if("_blank"!==e.getAttribute("target"))return;const n=e.getAttribute("href");n.startsWith("/")||(t.preventDefault(),t.stopPropagation(),In?J.send("electron-links.open-url",n):Fn(n))}),{capture:!0})}};let Mn,In;function Fn(t){chrome.tabs.create({url:t,active:!0})}var Dn={init:function(){J.on("cdn-proxy.fetch-url",zn)}};async function zn(t){if(!t)return null;try{const e=await fetch(t),n=await e.blob();return URL.createObjectURL(n)}catch(t){return console.error("cdn proxy: failed to fetch url",t),null}}function Bn(){const t=[];return Object.assign(e,{handle:function(t){if("function"!=typeof t)return void console.error("function is expected");e(t)},clear:function(){t.length=0},off:function(e){const n=t.indexOf(e);-1!==n&&t.splice(n,1)},isEmpty:function(){return 0===t.length}});function e(...e){"function"==typeof e[0]?t.push(e[0]):t.forEach((t=>t(...e)))}}var On={getState:async function(){const t=await st("store"),e=await s((()=>t.getState()));return JSON.parse(JSON.stringify(e))},ensureElems:function(t){for(const e of Object.values(t)){if(!e)return null;if(Array.isArray(e)&&0===e.length)return null}return t},requireIgModule:st,require:st,docElem:document.documentElement,onDomReady:Bn(),onDocClick:Bn(),onPathChange:Bn(),onBeforePostCreation:Bn(),onBeforeStoryCreation:Bn(),onMediaProcessingError:Bn()};function Hn(t){let e="";if(t<0&&(e="-",t=-t),t<1)return e+String(Number.isInteger(t)?t:t.toFixed(3));if(t<10)return e+String(Number.isInteger(t)?t:t.toFixed(2));if(t<100)return e+String(Number.isInteger(t)?t:t.toFixed(1));if(t<1e3)return e+String(Number.isInteger(t)?t:t.toFixed(1));const n=["k","m","b","t"];let o=null,i=null;for(let e=0;e<n.length;e++)if(t<Math.pow(1e3,e+2)){if(i=n[e],o=t/Math.pow(1e3,e+1),o=o<10?Math.round(100*o)/100:o<100?Math.round(10*o)/10:Math.round(o),o>=1e3)continue;break}return o?e+String(o)+i:e+"999t+"}let jn,Nn,Vn=!1,Wn=!1,Un=!1,qn=!1;var Yn={on:function(t={}){Un=!0,void 0!==t.mouseEventsAllowed&&(qn=t.mouseEventsAllowed);if(Wn)return;Wn=!0,function(){const t=[window,document.documentElement],e=["ontouchstart","ontouchmove","ontouchcancel","ontouchend"];for(let n=0;n<t.length;n++)for(let o=0;o<e.length;o++)t[n]&&void 0===t[n][e[o]]&&(t[n][e[o]]=null)}(),function(){const t=350;let e=!1,n=null;const o=()=>{n=Date.now()},i=()=>{e=Date.now()-n>t},r=t=>{e&&(e=!1,Jn(t))};document.addEventListener("touchstart",o,!0),document.addEventListener("touchend",i,!0),document.addEventListener("click",r,!0)}(),window.addEventListener("mousedown",Kn("touchstart"),!0),window.addEventListener("mousemove",Kn("touchmove"),!0),window.addEventListener("mouseup",Kn("touchend"),!0)},off:function(){Un=!1}};function Xn(t,e,n,o,i){o=o||0,i=i||0,this.identifier=e,this.target=t,this.clientX=n.clientX+o,this.clientY=n.clientY+i,this.screenX=n.screenX+o,this.screenY=n.screenY+i,this.pageX=n.pageX+o,this.pageY=n.pageY+i}function Gn(){const t=[];return t.item=function(t){return this[t]||null},t.identifiedTouch=function(t){return this[t+1]||null},t}function Jn(t){qn||(t.preventDefault(),t.stopPropagation())}function Kn(t){return function(e){Un&&(e.target.closest("textarea")||e.target.closest("input")||e.target.closest("select")||Jn(e),1===e.which&&(("mousedown"===e.type||!Nn||Nn&&!Nn.dispatchEvent)&&(Nn=e.target),Vn&&!e.shiftKey&&(Zn("touchend",e),Vn=!1),Zn(t,e),!Vn&&e.shiftKey&&(Vn=!0,jn={pageX:e.pageX,pageY:e.pageY,clientX:e.clientX,clientY:e.clientY,screenX:e.screenX,screenY:e.screenY},Zn("touchstart",e)),"mouseup"===e.type&&(jn=null,Vn=!1,Nn=null)))}}function Zn(t,e){const n=document.createEvent("Event");n.initEvent(t,!0,!0),n.altKey=e.altKey,n.ctrlKey=e.ctrlKey,n.metaKey=e.metaKey,n.shiftKey=e.shiftKey,n.touches=to(e,t),n.targetTouches=to(e,t),n.changedTouches=function(t,e){const n=Qn(t);!Vn||"mouseup"===t.type||"touchstart"!==e&&"touchend"!==e||n.splice(0,1);return n}(e,t),Nn.dispatchEvent(n)}function Qn(t){const e=new Gn;if(Vn){const n=75,o=jn.pageX-t.pageX,i=jn.pageY-t.pageY;e.push(new Xn(Nn,1,jn,-1*o-n,-1*i+n)),e.push(new Xn(Nn,2,jn,o+n,i-n))}else e.push(new Xn(Nn,1,t,0,0));return e}function to(t,e){if("mouseup"===t.type)return new Gn;const n=Qn(t);return Vn&&"mouseup"!==t.type&&"touchend"===e&&n.splice(1,1),n}var eo={init:function(){oo=at.getConfig(),no=oo.igSelectors,function(){const t=XMLHttpRequest.prototype.open,e=XMLHttpRequest.prototype.send;XMLHttpRequest.prototype.open=function(e,n){return this.method=e,this.url=n,this.addEventListener("readystatechange",(()=>{if(429!==this.status)return;const[t,e]=n.split("?"),o=(e||"").split("&"),i=o.indexOf("__a=1");-1!==i&&(o.splice(i,1),location.href=`${t}?${o.join("&")}`)})),t.apply(this,arguments)},XMLHttpRequest.prototype.send=function(t){return"POST"===this.method&&"/create/configure/"===this.url&&(t=function(t,e){if(!t||0===t.length)return t;let n=t.split("&");return n=n.map((t=>{if(0!==t.indexOf("caption="))return t;let n="";return t.split("%23").forEach(((t,o)=>{n+=0===o?t:o<=e?"%23"+t:t})),n})),n.join("&")}(t,30)),e.call(this,t)}}(),d`
    <style>
      * {
        outline: none;
      }

      ${no.general.main} {
        margin-bottom: 0 !important;
      }

      ${no.general.mainContent} {
        margin-bottom: 0 !important;
      }

      ${no.general.nextPageLoaderProfile},
      ${no.general.nextPageLoaderFeedAndExplore} {
        margin-top: 30px !important;
        margin-bottom: 30px;
      }

      ${no.general.settingsRectangle} {
        margin-top: 25px !important;
      }

      ${no.general.bottomNotification} {
        left: 8px !important;
        right: 8px !important;
        margin-bottom: 66px !important;
        border-radius: 4px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
      }
      ${no.general.bottomNotification} * {
        color: #333 !important;
        background: #FFF !important;
      }

      ${no.dragPanel.root} {
        user-select: none;
      }

      ${no.commentsPage.comment} {
        user-select: initial !important;
      }
    </style>
  `,d`
    <style>
      .theme-night {
        background: #fff !important;
      }

      .theme-night [aria-label*="Carousel"],              /* user page post type carousel */
      .theme-night [aria-label*="Video"],                 /* user page post type video */
      .theme-night [aria-label*="IGTV"],                  /* user page post type igtv */
      .theme-night .mediaActions,                         /* post download and go to actions */
      .theme-night div._5cOAs,                            /* igtv video card */
      .theme-night canvas,                                /* new story and post filter canvases */
      .theme-night div.rMz8x,                             /* new story marker controls */
      .theme-night div.C3Vzn,                             /* new story text controls */
      .theme-night button.videoSpritePlayButton,          /* new story play video button */
      .theme-night div#react-root > section > header,     /* new story header */
      .theme-night span.videoSpritePlayButton,            /* post like animation image */
      .theme-night div.coreSpriteRightChevron,            /* carousel post next button */
      .theme-night div.coreSpriteLeftChevron,             /* carousel post previous button */
      .theme-night li.-V_eO,                              /* igtv hover plays and comments count */
      .theme-night header.kj03O div._6ZEdQ,               /* story view header paginator */
      .theme-night header.kj03O div._g3zU,                /* story view header buttons */
      .theme-night header.kj03O a.notranslate,            /* story view header username */
      .theme-night footer.mLi3m,                          /* story view footer */
      .theme-night header.iuGAs,                          /* new story header */
      .theme-night footer._Z29A,                          /* new story footer */
      .theme-night div.m1lpM {                            /* new story marker controls */
        -webkit-filter: url(#theme-reverse-filter) !important;
        filter: url(#theme-reverse-filter) !important;
      }
      .theme-night div.RnEpo.Yx5HN,
      .theme-night div.cDEf6 {                            /* new post edit caption overlay */
        background-color: rgba(255, 255, 255, 0.65) !important;
      }
      .theme-night div.RnEpo.xpORG._9Mt7n {               /* new story stickers overlay */
        background-color: rgba(255, 255, 255, 0.3) !important;
      }
      .theme-night [role="dialog"]:not(.xr65t),           /* remove post dialog (but not story dialog) */
      .theme-night section.IyyUN,                         /* story view background */
      .theme-night div#react-root > section >             /* new story video background */
        div[role="button"][tabindex="0"] {
        background-color: white !important;
      }
      .theme-night header.kj03O {                         /* story view header */
        background: linear-gradient(to bottom,white,transparent) !important;
      }
      .theme-night h1 > a > img {                         /* instagram logo */
        filter: brightness(3) !important;
      }
      .theme-night .y3zKF:not(.yWX7d) {                   /* follow activity buttons */
        color: black !important;
      }
      .theme-night footer.mLi3m img._6q-tv {              /* story footer user avatars */
        filter: brightness(1) !important;
      }


      /* dm badge counter */
      .theme-night .TKi86 {
        filter: url(#theme-reverse-filter);
      }

      /* activity badge counter */
      .theme-night .nHGTw .WKY0a {
        filter: url(#theme-reverse-filter);
      }

      /* activity badge icon */
      .theme-night .nHGTw [class^="glyphsSprite"] {
        filter: url(#theme-reverse-filter);
      }

      /* "follow" button */
      .theme-night .jIbKX {
        color: #000 !important;
      }

      /* dropdown icon */
      .theme-night .coreSpriteDropdownArrowWhite {
        filter: url(#theme-reverse-filter);
      }

      /* modal window */
      .theme-night .RnEpo [role="dialog"] {
        box-shadow: 0 0px 12px rgba(0, 0, 0, 0.1) !important;
      }

      /* media type icons in profile grid */
      .theme-night [class*="mediatypesSprite"] {
        filter: url(#theme-reverse-filter);
      }

      /* explore post type icon */
      .theme-night .BcNgP svg {
        filter: url(#theme-reverse-filter);
      }

      /* story creator's contenteditable */
      .theme-night .m1lpM [contenteditable] {
        filter: none !important;
        color: #FFF !important;
      }

      .theme-night ${no.general.igLogo} {
        filter: url(#theme-reverse-filter);
        opacity: 0.9;
      }

      .theme-night ${no.general.storyQuickReactionsBackground} {
        background: linear-gradient(to bottom, transparent, #000);
      }

      .theme-night ${no.general.storyFooter} textarea {
        filter: none !important;
      }

      .theme-night ${no.general.storyFooter} .emoji {
        filter: none !important;
      }

      .theme-night ${no.general.tabBarTopWrap} {
        background: #FFF !important;
      }

      .theme-night ${no.storyViewer.time} {
        color: #000 !important;
      }

      .theme-night ${no.general.postVideoContainer} {
        background: #fff;
      }

      .theme-night ${no.profilePage.reelPreviewStats} {
        filter: url(#theme-reverse-filter);
      }

      .theme-night video {
        background: #000;
      }
    </style>
  `,d`
    <style>
      ${no["general_use-application-bar"]} {
        display: none !important;
      }

      ${no["general_use-application-bar2"]} {
        display: none !important;
      }

      ${no.general.useAppGradientBar} {
        display: none !important;
      }
    </style>
  `,function(){const t=Symbol("handled");c((()=>{const e=g(no.dragPanel.igIcon);if(!e)return;if(e[t])return;e[t]=!0;f("button",g(no.dragPanel.root)).pop().click()}))}(),function(){const t=HTMLVideoElement.prototype.play,e=HTMLVideoElement.prototype.pause,n=HTMLVideoElement.prototype.load,o=(t,e)=>{t._playCallbacks?t._playCallbacks.push(e):e()};HTMLVideoElement.prototype.play=async function(){this._playCallbacks=[];try{await t.call(this)}catch(t){}this._playCallbacks&&this._playCallbacks.forEach((t=>t())),this._playCallbacks=null},HTMLVideoElement.prototype.pause=function(){o(this,(()=>e.call(this)))},HTMLVideoElement.prototype.load=function(){o(this,(()=>n.call(this)))},Object.defineProperty(HTMLVideoElement.prototype,"src",{get:function(){return this.getAttribute("src")},set:function(t){return o(this,(()=>this.setAttribute("src",t))),!0}})}(),d`
    <style>
      ::-webkit-scrollbar {
        display: none;
      }
    </style>
  `,function(){const t=(e,n)=>{0!==e?requestAnimationFrame((()=>{t(e-1,n)})):n()};On.onDomReady((()=>{t(5,(()=>{On.docElem.scrollTop=0}))}))}(),d`
    <style>
      /* spinners for profile tabs */
      ._2z6nI > .jmJva,
      ._2z6nI > .vlh0C {
        margin-bottom: 100vh;
      }
    </style>
  `,d`
    <style>
      /* header top-left button */
      ${no["header-top-level-button"]} button {
        cursor: pointer;
      }

      /* hitbox for header top-left button */
      ${no["header-top-level-button"]} a,
      ${no["header-top-level-button"]} button {
        position: relative;
      }
      ${no["header-top-level-button"]} a::before,
      ${no["header-top-level-button"]} button::before {
        content: '';
        position: absolute;
        top: -12px;
        left: -12px;
        right: -12px;
        bottom: -12px;
      }

      ${no.general.tabBarCreatePostButton} {
        cursor: pointer;
      }
    </style>
  `,d`
    <style>
      /* text of "your story" button */
      ${no["your-story-button-text"]} {
        width: 64px;
      }
    </style>
  `,d`
    <style>
      ${no["profile-send-message-button"]} {
        white-space: nowrap;
        overflow: hidden;
      }
    </style>
  `,function(){const t="_enhanceProfileStats_",e=t=>{t.forEach((t=>{t.style.height=""}));const e=Array.from(t).map((t=>t.offsetHeight)),n=Math.max(...e);t.forEach((t=>{t.style.height=`${n}px`}))};c((()=>{const n=On.ensureElems({statContainers:f(no["profile-page-stat-container"]),statItems:f(no["profile-page-stat-item"])});On.docElem.classList.toggle("enhance-stats",!!n),n&&(n.statItems[0][t]||(n.statItems[0][t]=!0,n.statItems.forEach((t=>{t.innerHTML=t.innerHTML.replace("(","").replace(")",""),t.firstChild.nodeType===Node.TEXT_NODE&&t.appendChild(t.firstChild);const e=t.lastChild;e.textContent=e.textContent.toLowerCase().replace(":","")})),e(n.statContainers)))})),window.addEventListener("resize",(()=>{const t=f(no["profile-page-stat-container"]);e(t)})),d`
    <style>
      /* stat container */
      .enhance-stats .LH36I {
        padding: 0 6px;
      }

      /* stat item */
      .enhance-stats ._81NM2 {
        hyphens: auto;
      }
    </style>
  `}(),c((()=>{const t=On.ensureElems({activity:g(no["activity-card"]),activityRight:g(no["activity-card-right-part"])});On.docElem.classList.toggle("enhance-activities",!!t)})),d`
    <style>
      @media (max-width: 400px) {
        /* activity */
        .enhance-activities ${no["activity-card"]} {
          flex-wrap: wrap;
        }

        /* activity's right part */
        .enhance-activities ${no["activity-card-right-part"]} {
          width: 100%;
          margin-top: 8px;
          margin-left: 45px;
        }
      }
    </style>
  `,c((()=>{const t=On.ensureElems({commentForm:g(no["comment-form"]),avatar:g(no["comment-form-avatar"]),form:g(no["comment-form-form"]),textarea:g(no["comment-form-textarea"]),submit:g(no["comment-form-submit-button"])});On.docElem.classList.toggle("enhance-comment-form",!!t)})),d`
    <style>
      /* comment form */
      .enhance-comment-form ${no["comment-form"]} {
        align-items: flex-start !important;
      }

      /* avatar */
      .enhance-comment-form ${no["comment-form-avatar"]} {
        top: 5px;
      }

      /* form */
      .enhance-comment-form ${no["comment-form-form"]} {
        padding: 0;
        border-radius: 11px;
        margin-bottom: 30px;
        position: relative;
      }

      /* textarea */
      .enhance-comment-form ${no["comment-form-textarea"]} {
        padding: 12px 16px;
        max-height: 50vh;
        min-height: 42px;
        box-sizing: border-box;
      }

      /* submit */
      .enhance-comment-form ${no["comment-form-submit-button"]} {
        position: absolute;
        top: 100%;
        margin-top: 10px;
      }
    </style>
  `,d`
    <style>
      ${no["profile-page-grid-stretch-element"]} {
        display: none;
      }
    </style>
  `,function(){const t=Symbol("handled");c((()=>{if(g(no.dragPanel.handle))return void Yn.on({mouseEventsAllowed:!0});if(location.pathname.startsWith("/create/"))return void Yn.on({mouseEventsAllowed:!1});if(location.pathname.startsWith("/stories/")&&!location.pathname.startsWith("/stories/direct/"))return void Yn.on({mouseEventsAllowed:!1});const e=g(no["highlights-container"]);if(e){if(e[t])return;return e[t]=!0,Yn.off(),e.addEventListener("mouseenter",(()=>{Yn.on({mouseEventsAllowed:!0})})),void e.addEventListener("mouseleave",(()=>{Yn.off()}))}Yn.off()}))}(),function(){const t=150;let e=null,n=!0;const o=async()=>{const o=f(no["post-video"]);if(0===o.length)return;const i=o.find((e=>{const n=e.getBoundingClientRect();return n.left<=20&&n.top>-1*t&&n.top+n.height<window.innerHeight+t}));i?e&&i===e||(e&&e.pause(),e=i,n&&(i.muted=!0),await i.play(),i.addEventListener("volumechange",(()=>{n=!1})),i.addEventListener("click",(t=>{i.muted&&!i.paused&&i.webkitAudioDecodedByteCount>0&&n&&(t.preventDefault(),t.stopPropagation(),i.muted=!1,n=!1)}),{capture:!0})):e&&(e.pause(),e=null)};c(o),window.addEventListener("scroll",o)}(),function(){const t=Array.prototype.some;Array.prototype.some=function(...e){let n;return n=2===this.length&&"instagram.com"===this[0]&&"facebook.com"===this[1]?["instagram.com"]:this,t.call(n,...e)}}(),d`
    <style>
      ${no["post-tagged-people-button"]} {
        top: 0 !important;
        bottom: auto !important;
      }
    </style>
  `,c((t=>{t.forEach((t=>{t.removedNodes.forEach((t=>{t.nodeType===HTMLElement.ELEMENT_NODE&&("VIDEO"===t.tagName?[t]:t.querySelectorAll("video")).forEach((t=>{t.src="",t.load()}))}))}))})),d`
    <style>
      video::-webkit-media-controls-fullscreen-button {
        display: none;
      }
    </style>
  `,function(){const t="__disablePictureInPictureForVideos",e=e=>{e[t]||(e[t]=!0,e.disablePictureInPicture=!0)};c((()=>{const t=f("video");t.length&&t.forEach(e)}))}(),function(){const t="__managePostVideoClickAndDoubleClick",e=e=>{if(e[t])return;let n;e[t]=!0,e.addEventListener("click",(t=>{if(t.preventDefault(),n)return clearTimeout(n),n=null,J.send("ig.media-fullscreen-enter",{url:e.src,currentTime:e.currentTime,volume:e.volume,muted:e.muted,paused:e.paused}),void e.pause();n=setTimeout((()=>{n=null,e.paused?e.play():e.pause()}),200)}))};c((()=>{const t=f(no["post-video"]);t.length&&t.forEach(e)}))}(),function(){const t="__manageNativeControlsForPostVideos",e=e=>{e[t]||(e[t]=!0,e.setAttribute("controls",""),e.setAttribute("controlslist","nodownload"),e.setAttribute("preload","auto"))};c((()=>{const t=f(no["post-video"]);t.length&&t.forEach(e)})),d`
    <style>
      ${no["post-video"]} {
        cursor: pointer;
      }

      ${no["post-video-poster"]},
      ${no["post-video-overlay-play"]},
      ${no["post-video-overlay-control"]} {
        display: none;
      }

      /* tricky way to move volume control */
      @media (min-width: 450px) {
        ${no["post-video"]}::-webkit-media-controls-panel {
          padding-right: 159px;
        }
        ${no["post-video"]}::-webkit-media-controls-timeline {
          margin-right: -159px;
        }
      }
    </style>
  `}(),function(){const t="__syncVolumeAcrossPostVideos";let e,n,o=[];const i=i=>{i[t]||(i[t]=!0,void 0===e?(e=i.volume,n=i.muted):(i.volume=e,i.muted=n),i.addEventListener("volumechange",(()=>{o.forEach((t=>{t.volume=i.volume,t.muted=i.muted})),e=i.volume,n=i.muted})))};c((()=>{o=f(no["post-video"]),o.forEach(i)}))}(),d`
    <style>
      video::-webkit-media-controls-panel {
        transition: all 0.25s linear;
      }
    </style>
  `,d`
    <style>
      /* expand timeline hitbox at top */
      video::-webkit-media-controls-timeline {
        margin-top: -5px;
        padding-top: 5px;
      }
    </style>
  `,d`
    <style>
      ${no["new-post_black-layer-when-textarea-focused"]} {
        top: 225px !important;
      }

      ${no.postCreation.captionContainer} {
        height: 180px !important;
      }

      ${no["new-post_textarea"]} {
        height: 160px !important;
      }
    </style>
  `,d`
    <style>
      ${no["new-post_tag-people-image-container"]} {
        width: 100%;
      }

      ${no["new-post_tag-people-image-container"]} img {
        width: 100%;
      }
    </style>
  `,d`
    <style>
      @media ${["(max-height: 622px)","(min-height: 624px)","(max-width: 313px)","(min-width: 315px)"].join(",")} {
        ${no.general.tabBarWrap} {
          height: 58px !important;
        }

        ${no.general.tabBar} {
          height: 58px !important;
        }
      }
    </style>
  `,async function(){if(await ce())return;const t=await s((()=>document.body));if(!t)return;t.insertAdjacentHTML("beforeend",`\n    <div class="navigation-spinner">\n      ${Dt()}\n    </div>\n  `),d`
    <style>
      #react-root:not(:empty) ~ .navigation-spinner,
      .dialog-404 .navigation-spinner {
        display: none;
      }

      .navigation-spinner {
        position: fixed;
        top: 50%;
        left: 50%;
        width: 32px;
        height: 32px;
        margin-left: -16px;
        margin-top: -16px;
        pointer-events: none;
        z-index: 0;
      }
    </style>
  `}(),c((()=>{if(!document.body)return;const t=!!g(no.general.modalWindow);document.body.style.overflow=t?"hidden":null})),d`
    <style>
      ${no.general.modal} {
        background: rgba(255, 255, 255, 0.96) !important;
      }

      ${no.general.modalWindow} {
        justify-content: flex-start;
        box-shadow: 0 5px 27px rgba(0, 0, 0, 0.13);
        background: #FFF;
      }

      ${no.general.modalWindowHashtagContent} {
        margin-top: 6px;
      }
    </style>
  `,function(){let t;c((()=>{const e=location.pathname+location.search;e!==t&&(J.send("ig.url-change",e),t=e)}))}(),function(){const t=Symbol("handled");c((()=>{const e=g(no.general.storiesBar);e&&(e[t]||(e[t]=!0,qe.init(e)))}))}(),d`
    <style>
      ${no.profilePage.tab}:empty {
        display: none;
      }
    </style>
  `,d`
    <style>
      ${no.general.modalWindow} {
        overflow: scroll;
        border-radius: 8px;
      }
    </style>
  `,function(){const t=Symbol("handled");c((()=>{const e=g(no.postCreation.nextButton);e&&(e[t]||(e[t]=!0,e.addEventListener("click",(()=>{const t=Be.create({show:!0});On.onPathChange((function e(){On.onPathChange.off(e),t.remove()}))}),{once:!0})))}))}(),d`
    <style>
      ${no.general.blueLinkButton} {
        cursor: pointer;
        position: relative;
      }

      ${no.general.blueLinkButton}::before {
        content: '';
        position: absolute;
        top: -7px;
        left: -7px;
        right: -7px;
        bottom: -7px;
      }
    </style>
  `,d`
    <style>
      ${no.profilePage.postRow} {
        margin-bottom: 2px;
      }

      ${no.profilePage.postContainer} {
        margin-right: 2px;
      }

      ${no.profilePage.reelRow} {
        margin-bottom: 2px;
      }

      ${no.profilePage.reelContainer} {
        margin-right: 2px;
      }
    </style>
  `,d`
    <style>
      ${no.general.actionSheet} {
        width: 96% !important;
      }
    </style>
  `,function(){const t=Symbol("handled");c((()=>{const e=g(no.postCreation.filtersReel);e&&(e[t]||(e[t]=!0,qe.init(e)))}))}(),d`
    <style>
      ${no.authScreen.username} {
        margin-right: 24px;
      }

      /* hide alt text of missing avatar */
      ${no.authScreen.avatar} {
        color: transparent;
        overflow: hidden;
      }

      ${no.authScreen.footer} {
        display: none;
      }

      ${no.authScreen.fromFacebookBar} {
        display: none;
      }

      @media (max-width: 400px) {
        ${no.authScreen.loginContainer} {
          padding-left: 20px;
          padding-right: 20px;
        }

        ${no.authScreen.loginContainerParagraph} {
          text-align: center;
        }

        ${no.authScreen.loginFormParagraph} {
          text-align: center;
          padding-left: 20px;
          padding-right: 20px;
        }
      }
    </style>
  `,d`
    <style>
      ${no.loginBar.root} {
        top: 6px !important;
        padding: 8px;
        border-radius: 5px;
        max-width: 400px;
        box-shadow: 0 2px 7px rgba(0, 0, 0, 0.18);
      }

      ${no.loginBar.content} {
        height: 100%;
        align-items: center;
      }

      ${no.loginBar.openAppButton} {
        display: none !important;
      }

      @media (max-width: 500px) {
        ${no.loginBar.root} {
          top: 0 !important;
          padding: 8px;
          border-radius: 0;
          max-width: 100%;
          box-shadow: none;
        }
      }
    </style>
  `,function(){const t=Symbol("handled");c((()=>{if(!!g('[data-page="StoriesPage"]'))return;f("img[srcset]").forEach((e=>{if(e[t])return;e[t]=!0;e.getAttribute("srcset").endsWith("w")&&e.removeAttribute("srcset")}))}))}(),function(){let t=null;c((()=>{t=g(no.commentsPage.scrollContainer)})),J.on("ig.broadcast-scroll",(e=>{t&&(t.scrollTop+=e)}))}(),function(){const t=window.IntersectionObserver;if(!t)return;const e=Symbol("handled");c((()=>{const n=g(no.commentsPage.showMoreButton);if(!n)return;if(n[e])return;n[e]=!0;const o=g(no.commentsPage.scrollContainer);if(!o)return;const i=new t((t=>{t[0].isIntersecting&&(document.body.contains(n)&&n.click(),setTimeout((()=>i.disconnect())))}),{root:o,rootMargin:"200px",threshold:0});i.observe(n)}))}(),async function(){const t=await st("store");if(!t)return;const e=Symbol("handled");c((()=>{let n;if(n=f(no.profilePage.post),n=n.filter((t=>!t[e])),0===n.length)return;const o=t.getState(),i=Object.values(o.posts.byId.toJS());n.forEach((t=>{t[e]=!0;const n=t.getAttribute("href").split("/")[2];if(!n)return;const o=i.find((t=>t.code===n));if(!o)return;const r=Hn(o.numPreviewLikes||0),a=Hn(o.numComments||0);t.insertAdjacentHTML("beforeend",`\n        <div class="post-stats">\n          <div class="post-stats__stat">\n            <div class="post-stats__icon coreSpriteHeartSmall"></div>\n            <div class="post-stats__count">${r}</div>\n          </div>\n          <div class="post-stats__stat">\n            <div class="post-stats__icon coreSpriteSpeechBubbleSmall"></div>\n            <div class="post-stats__count">${a}</div>\n          </div>\n        </div>\n      `)}))})),d`
    <style>
      .post-stats {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 50%;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        align-items: flex-end;
        justify-content: flex-end;
        padding: 5px 10px;
        pointer-events: none;
        transition: opacity 0.1s;
      }
      ${no.profilePage.post}:not(:hover) .post-stats {
        opacity: 0;
      }
      .theme-night .post-stats {
        filter: url(#theme-reverse-filter);
      }

      .post-stats::before {
        content: '';
        opacity: 0.5;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
          to top,
          hsl(0, 0%, 0%) 0%,
          hsla(0, 0%, 0%, 0.738) 19%,
          hsla(0, 0%, 0%, 0.541) 34%,
          hsla(0, 0%, 0%, 0.382) 47%,
          hsla(0, 0%, 0%, 0.278) 56.5%,
          hsla(0, 0%, 0%, 0.194) 65%,
          hsla(0, 0%, 0%, 0.126) 73%,
          hsla(0, 0%, 0%, 0.075) 80.2%,
          hsla(0, 0%, 0%, 0.042) 86.1%,
          hsla(0, 0%, 0%, 0.021) 91%,
          hsla(0, 0%, 0%, 0.008) 95.2%,
          hsla(0, 0%, 0%, 0.002) 98.2%,
          hsla(0, 0%, 0%, 0) 100%
        );
      }

      .post-stats__stat {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: 12px;
      }
      .post-stats__stat:first-child {
        margin-left: 0;
      }

      .post-stats__icon {
        margin-right: 4px;
        transform: scale(0.8);
        position: relative;
        top: -0.5px;
      }

      .post-stats__count {
        color: #FFF;
        font-weight: 600;
        font-size: 12px;
      }

      @media (max-width: 500px) {
        .post-stats {
          padding: 2px 8px;
        }

        .post-stats::before {
          opacity: 0.4;
          top: -100%;
          background: #000;
        }

        .post-stats__stat {
          margin-left: 6px;
        }

        .post-stats__icon {
          top: 0.5px;
          margin-right: 1px;
          transform: scale(0.6);
        }

        .post-stats__count {
          font-size: 10px;
        }
      }
    </style>
  `}(),async function(){const t=await st("store");if(!t)return;const e=()=>{var e;const n=null===(e=t.getState().navigation)||void 0===e?void 0:e.pageIdentifier;n&&document.documentElement.setAttribute("data-page",n)};e(),t.subscribe(e)}(),d`
    <style>
      html[data-page="CreationDetailsPage"] ${no.postCreation.previewContainer} {
        width: 110px !important;
        height: 110px !important;
      }
      html.reels--creating-reels[data-page="CreationDetailsPage"] ${no.postCreation.previewContainer} {
        width: 62px !important;
      }

      @media (max-width: 440px) {
        html[data-page="CreationDetailsPage"] ${no.postCreation.previewContainer} {
          width: 60px !important;
          height: 60px !important;
        }
        html.reels--creating-reels[data-page="CreationDetailsPage"] ${no.postCreation.previewContainer} {
          width: 45px !important;
          min-width: 45px !important;
          height: 80px !important;
        }
      }

      html[data-page="CreationDetailsPage"] ${no.postCreation.previewPostImage} {
        border-radius: 4px;
        width: 100% !important;
        height: 100% !important;
        object-fit: cover;
        object-position: center;
      }

      html[data-page="CreationDetailsPage"] ${no.postCreation.previewPostTypeIcon} {
        width: auto !important;
        height: auto !important;
        right: 0;
        top: -1px;
        transform: scale(0.8);
        transform-origin: top right;
      }
    </style>
  `,async function(){if(!await st("lang"))return;document.addEventListener("click",(async t=>{const e=t.target.closest(no.general.iconButton);if(!e)return;if(!!!g(no.general.planeIcon,e))return;const n=e.closest(no.general.post);if(!n)return;const o=g(no.general.postThreeDotsButton,n);if(!o)return;t.preventDefault(),t.stopPropagation();const i=new Promise((t=>{c((function e(){g(no.general.actionDialog)&&(setTimeout((()=>{c.off(e)})),t())}))}));o.click(),await i;const r=f(no.general.actionDialogItem).find((t=>t.innerText.toLowerCase().includes("share")||t.innerText.endsWith("...")||t.innerText.endsWith("…")));r&&r.click()}),!0)}(),async function(){const t=await st("store");if(!t)return;let e=null;c((()=>{const n=g(no.postCreation.expandImageButton);if(!n)return;const o=t.getState().creation.sessionId;o!==e&&(e=o,n.click())}))}(),async function(){const t=(t,e)=>window.innerWidth>320?Math.min(125,e/t*100):Math.min(180,e/t*100);Object.defineProperty(Object.prototype,"getHeightPercent",{get:function(){return({width:e,height:n})=>t(e,n)},set:function(){return!0}}),Object.defineProperty(Object.prototype,"getWrapperHeightStyle",{get:function(){return(e,n)=>({paddingBottom:`calc(${t(n,e)}% - 1px)`})},set:function(){return!0}}),d`
    <style>
      ${no.postCreation.video} {
        width: 100%;
        height: 100%;
        background-color: #000;
      }

      ${no.postCreation.videoPoster} {
        object-fit: contain;
      }
    </style>
  `}(),d`
    <style>
      ${no.postCreation.captionContainer} {
        flex-direction: row-reverse !important;
      }

      ${no.postCreation.captionTextarea} {
        margin-left: 8px;
      }

      ${no.postCreation.userAvatar} {
        display: none;
      }
    </style>
  `,d`
    <style>
      .clickable {
        cursor: pointer;
        transition: filter 300ms;
      }
      .clickable:hover {
        filter: brightness(110%);
      }
      .clickable:active {
        filter: brightness(90%);
      }
    </style>
  `,d`
    <style>
      .info-circle {
        width: 12px;
        height: 12px;
        color: #FFF;
        background: #1BA2F9;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        position: relative;
        font-size: 9px;
        font-weight: 700;
        font-family: Montserrat !important;
      }
      .info-circle::before { /* hitbox */
        content: '';
        position: absolute;
        top: -7px;
        left: -7px;
        right: -7px;
        bottom: -7px;
      }
      .theme-night .info-circle {
        filter: url(#theme-reverse-filter);
        background: #33ABF8;
      }
    </style>
  `,d`
    <style>
      .modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.96);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
      }

      .modal__window {
        width: 290px;
        padding: 16px 20px;
        background: #FFF;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
        font-size: 14px;
        line-height: 20px;
        border-radius: 12px;
      }

      .modal__title {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-weight: 600;
      }

      .modal__content {
        margin-top: 12px;
        display: block;
        color: #3F3E3F;
      }
      .modal__content b {
        font-weight: 600;
      }
      .modal__content a {
        color: #1BA2F9 !important;
      }
      .theme-nigh .modal__content a {
        filter: url(#theme-reverse-filter);
        color: #33ABF8 !important;
      }
      .modal__content ul {
        list-style: disc;
        padding: 8px 0 8px 24px;
      }
    </style>
  `,d`
    <style>
      .button {
        color: #FFF;
        background: #1BA2F9;
        border: none;
        margin-right: 12px;
        cursor: pointer;
        padding: 5px 12px;
        font-size: 14px;
        font-weight: 500;
        border-radius: 4px;
        font-weight: 600;
      }
      .button:last-child {
        margin-right: 0;
      }
      .button:disabled {
        opacity: 0.5;
        pointer-events: none;
      }
      .button_cancel {
        color: #262626;
        border: 1px solid #DBDBDB;
        background: transparent;
      }
      .theme-night .button:not(.button_cancel) {
        filter: url(#theme-reverse-filter);
        background: #33ABF8;
      }
    </style>
  `}};let no,oo;var io={init:function(){ro=at.getConfig().igSelectors,function(){const t=()=>{clearInterval(e),On.onDomReady()},e=setInterval((()=>{g(ro.general.tabBar)&&t()}),300);"complete"===document.readyState||"loaded"===document.readyState||"interactive"===document.readyState?t():document.addEventListener("DOMContentLoaded",t)}(),document.addEventListener("click",(t=>{On.onDocClick(t)}),!0),function(){let t=location.pathname;On.onPathChange(t),c((()=>{const e=location.pathname;t!==e&&(On.onPathChange(e),t=e)}))}()}};let ro;var ao={init:function(){(async function(){var t,e,n,o,i,r,a;const l=await s((()=>window._sharedData)),d=await s((()=>window.__additionalData)),c=(null==l||null===(t=l.entry_data)||void 0===t||null===(e=t.ProfilePage)||void 0===e||null===(n=e[0])||void 0===n||null===(o=n.graphql)||void 0===o?void 0:o.user)||(null===(i=Object.values(d)[0])||void 0===i||null===(r=i.data)||void 0===r||null===(a=r.graphql)||void 0===a?void 0:a.user);if(!c)return;co(c)})(),function(){const t=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(...e){return this.addEventListener("readystatechange",(()=>{if(4!==this.readyState)return;const t=n(this.responseText),e=t&&t.graphql&&t.graphql.user;e&&co(e)})),t.call(this,...e)}}()},getUserDetails:lo};window.getUserDetails=lo;const so={};function lo(t){return so[t]}function co(t){so[t.username]=t}var po={init:function(){J.on("ig.publish-story",uo)}};async function uo({imageUrl:t,mentions:e=[]}){const n=await st("http"),o=await async function(t){const e=await fetch(t),n=await e.blob();return await async function(t){return new Promise(((e,n)=>{const o=new FileReader;o.onerror=()=>{n()},o.onload=()=>{e(o.result)},o.readAsDataURL(t)}))}(n)}(t),i=document.createElement("img");i.src=o,document.body.appendChild(i),await new Promise((t=>{i.onload=t}));const r=i.clientWidth,a=i.clientHeight,s=document.createElement("canvas");s.width=r,s.height=a;s.getContext("2d").drawImage(i,0,0),i.remove();const l=await new Promise((t=>{s.toBlob(t,"image/jpeg")})),d=Date.now().toString(),c=`fb_uploader_${d}`;let p=null;try{await n.post(`/rupload_igphoto/${c}`,l,{headers:{"X-Instagram-Rupload-Params":JSON.stringify({media_type:1,upload_id:d,upload_media_width:r,upload_media_height:a}),"X-Entity-Name":c,"X-Entity-Length":String(l.size),Offset:"0"},timeout:Number.POSITIVE_INFINITY})}catch(t){p=t}if(!p)try{await n.post("/create/configure_to_story/",{upload_id:d,caption:"",reel_mentions:JSON.stringify(e.map((t=>({user_id:t.userId,x:t.cx,y:t.cy,width:t.width,height:t.height,rotation:0}))))})}catch(t){p=t}return{error:p}}var go={repost:async function(t){var e;const n=at.getConfig().igSelectors,o=Be.create({show:!0,onClick:function(){o.remove()}});document.body.appendChild(o);const i=await st("nav"),r=await st("store");if(!i||!r)return;let a;const l=r.getState(),d=await s((()=>l.posts.byId.get(t))),p=d.isSidecar;if(p){const e=g(`[data-post-id="${t}"]`),o=f(n.feedPage.carouselDot,e).findIndex((t=>t.matches(n.feedPage.carouselActiveDot)));a=d.sidecarChildren[o]}else a=d;const u=Math.random().toString().slice(2),m=Date.now().toString();r.dispatch({type:"CREATION_SESSION_STARTED",creationMode:"POST",sessionId:u,showChangeProfilePicConfirmDialog:void 0}),tn.toggle(!1);const h=r.subscribe((()=>{r.getState().creation.sessionId!==u&&(tn.toggle(!0),h())})),b="clips"===a.productType;b&&he.startReelsCreationSession();const v=Symbol("handled"),y=await J.send("repost.can-repost");if(c((function t(){r.getState().creation.sessionId!==u&&c.off(t);const e=g(n.postCreation.submitPostButton);e&&(e[v]||(e[v]=!0,e.innerText="Repost",e.addEventListener("click",(t=>{J.send("repost.repost-click",{isCarousel:p,isVideo:a.isVideo,isReels:he.isCreatingReels()}),y||(t.preventDefault(),t.stopPropagation())}),{useCapture:!0}),y||me({style:"width: 100%; max-width: 280px;",anchor:e,text:"\n          Reposting is a PRO feature, please consider\n          upgrading to use Inssist reposting.\n        "})))})),a.isVideo){const t=await fetch(a.videoUrl,{credentials:"omit"}),e=await t.blob();r.dispatch({type:"CREATION_VIDEO_PROCESSED",file:e,dataURL:URL.createObjectURL(e),mediaPublishMode:"default",entityName:`feed_${m}`,uploadId:m,uploadMediaWidth:a.dimensions.width,uploadMediaHeight:a.dimensions.height,uploadMediaDurationMs:a.videoDuration,videoTransform:null});const n=a.displayResources[a.displayResources.length-1],o=await fetch(n.src,{credentials:"omit"}),i=await o.blob();r.dispatch({type:"CREATION_VIDEO_COVER_PHOTO_UPDATED",dataURL:URL.createObjectURL(i),entityName:`feed_${m}`,file:i,uploadId:m,uploadMediaWidth:n.configWidth,uploadMediaHeight:n.configHeight})}else{const t=a.displayResources[a.displayResources.length-1],e=await fetch(t.src,{credentials:"omit"}),n=await e.blob(),o=URL.createObjectURL(n),i=document.createElement("img");i.src=o,await new Promise((t=>{i.onload=t})),r.dispatch({type:"CREATION_IMAGE_PROCESSED",sourceImage:n,sourceDataURL:o,width:i.width,height:i.height,location:null,mirrored:!1,orientation:0,rotationAngle:0})}const w=null===(e=d.owner)||void 0===e?void 0:e.username;if(w){let t;const e=b?`🎞 Reel by @${w}`:`📸 Post by @${w}`;t=d.caption?`${d.caption}\n.\n${e}`:e,r.dispatch({type:"CREATION_CAPTION_CHANGED",caption:t})}r.dispatch({type:"NAVIGATION_ENTRYPOINT_TRACKED",entrypoint:l.navigation.route||l.navigation.displayedRoute}),i.push("/create/style/"),o.remove()}};var fo={init:function(){mo=at.getConfig().igSelectors,async function(){const t=await st("store");c((()=>{const e=f(mo["post-photo-item"]),n=f(mo["post-video-item"]),o=f(mo["story-container"]);[...e,...n,...o].forEach((e=>{if(e.withActions)return;const n=o.includes(e),i=!!e.querySelector("video");let r=!1,a=!1;const s=e.closest("[data-post-id]");if(s){const e=s.dataset.postId,n=t.getState().posts.byId.get(e);a="clips"===(null==n?void 0:n.productType),r="igtv"===(null==n?void 0:n.productType),r&&s.setAttribute("data-media-actions-post-type","igtv"),a&&s.setAttribute("data-media-actions-post-type","reels")}const l=function({isIgtv:t=!1,isStory:e=!1,isVideo:n=!1,isReels:o=!1}={}){return`\n    <div class="\n      mediaActions\n      ${t?"mediaActions_igtv":""}\n      ${o?"mediaActions_reels":""}\n      ${e?"mediaActions_story":"mediaActions_post"}\n      ${n?"mediaActions_video":"mediaActions_photo"}">\n      <button class="mediaActions__button" data-action="pinterest" title="save to pinterest">\n        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="19" viewBox="0 0 15 19">\n          <path d="M5.716 4.654c.242-.13.511-.202.786-.207v-.004a1.256 1.256 0 011.023.443c.251.306.38.695.364 1.09-.01.337-.06.67-.15.994-.109.427-.243.886-.4 1.368-.164.498-.282.916-.352 1.244a1.516 1.516 0 00.308 1.382 1.601 1.601 0 00.582.444c.225.102.471.15.718.142a2.675 2.675 0 002.313-1.586 7.625 7.625 0 00.91-3.83 3.79 3.79 0 00-1.117-2.81 4.302 4.302 0 00-3.114-1.086 4.837 4.837 0 00-3.62 1.437 4.768 4.768 0 00-1.39 3.43c-.018.726.22 1.434.674 2a.576.576 0 01.143.565c-.046.132-.08.266-.105.404a3.716 3.716 0 01-.109.406.31.31 0 01-.054.152.306.306 0 01-.263.133.444.444 0 01-.176-.039A2.964 2.964 0 011.119 9.27a5.302 5.302 0 01-.524-2.418 5.582 5.582 0 01.473-2.21 6.991 6.991 0 011.344-2.036 6.34 6.34 0 012.3-1.52A8.278 8.278 0 017.87.5a6.43 6.43 0 012.484.404 6.43 6.43 0 012.138 1.33 5.505 5.505 0 011.8 4.086 7.928 7.928 0 01-1.534 5 4.776 4.776 0 01-1.736 1.469 4.79 4.79 0 01-2.217.504 3.145 3.145 0 01-1.5-.371 2.246 2.246 0 01-.978-.9l-.712 2.794c-.06.231-.137.457-.228.678-.105.26-.215.492-.31.668a19.6 19.6 0 01-.337.601l-.01.014a8.878 8.878 0 01-.327.516c-.1.147-.199.287-.292.418-.061.082-.136.178-.229.295l-.11.14a.13.13 0 01-.112.053h-.03a.12.12 0 01-.07-.035.114.114 0 01-.034-.069c0-.011-.008-.075-.019-.175l-.008-.073v-.05c-.004-.037-.012-.075-.012-.116l-.008-.058-.028-.264a8.346 8.346 0 01-.032-.386c-.006-.088-.012-.18-.02-.276a6.58 6.58 0 01-.022-.791c.01-.272.027-.546.053-.84.03-.285.075-.569.136-.85l.073-.314.61-2.591.624-2.634a3.693 3.693 0 01-.316-1.328l-.017-.265a3.047 3.047 0 01.573-1.885 1.72 1.72 0 01.603-.545z" fill="currentColor"/>\n        </svg>\n      </button>\n      <button class="mediaActions__button" data-action="repost" title="repost">\n        <svg style="transform: translateY(0.5px)" xmlns="http://www.w3.org/2000/svg" width="15.111" height="16.375" viewBox="0 0 15.111 16.375">\n          <path d="M7.858,7.469h8.4V9.925L19.611,6.65,16.258,3.375V5.831H6.181v4.912H7.862V7.469Zm8.4,8.187h-8.4V13.2L4.5,16.475,7.858,19.75V17.294H17.935V12.381H16.254v3.275Z" transform="translate(-4.5 -3.375)" fill="currentColor"/>\n        </svg>\n      </button>\n      <button class="mediaActions__button" data-action="download" title="save">\n        <svg style="transform: translateY(0.5px)" xmlns="http://www.w3.org/2000/svg" width="11.998" height="13.031" viewBox="0 0 11.998 13.031">\n          <path d="M1,14.233v-2H13v2Zm1.35-7.979L3.418,5.186l2.3,2.3V1.2h2.4V7.483L10.452,5.15l1.064,1.064-4.6,4.6Z" transform="translate(-1 -1.202)" fill="currentColor"/>\n        </svg>\n      </button>\n      <button class="mediaActions__button" data-action="fullscreen" title="fullscreen">\n        <svg style="transform: translateX(-0.5px)" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">\n          <path d="M10,12H7V10h3V7h2v5ZM0,12V7H2v3H5v2ZM10,5V2H7V0h5V5ZM0,5V0H5V2H2V5Z" fill="currentColor"/>\n        </svg>\n      </button>\n      <button class="mediaActions__button" data-action="open" title="open in new tab">\n        <svg xmlns="http://www.w3.org/2000/svg" width="12.507" height="12.501" viewBox="0 0 12.507 12.501">\n          <path d="M179.372-.5V1h3.3l-5.148,5.148,1.7,1.7L184.371,2.7V5.948h1.51V-.5Z" transform="translate(-173.374 0.504)" fill="currentColor"/>\n          <path d="M8,93.55H2v-6H4l2-2H0v10H10v-6l-2,2Z" transform="translate(0 -83.049)" fill="currentColor"/>\n        </svg>\n      </button>\n    </div>\n  `}({isStory:n,isVideo:i,isIgtv:r,isReels:a});e.insertAdjacentHTML("afterbegin",l),e.withActions=!0}))}))}(),J.on("ig.media-fullscreen-exit",(({url:t,currentTime:e,volume:n,muted:o})=>{let i=g(`video[src="${t}"]`);if(!i){const e=g(`source[src="${t}"]`);e&&(i=e.closest("video"))}i&&(i.currentTime=e,i.volume=n,i.muted=o)})),On.onDocClick((async t=>{const e=t.target.closest(".mediaActions__button");if(!e)return;t.preventDefault(),t.stopPropagation();const n=e.closest("li")||e.closest(".kPFhm")||e.closest(".qbCDp"),o=n.querySelector("img"),i=n.querySelector("video");let r;if(i)r=i.getAttribute("src")||i.querySelector("source").getAttribute("src");else{if(!o)return void J.send("ig.error","unable to find media for button");{const t=o.getAttribute("srcset");r=(null==t?void 0:t.split(" ")[0])||o.getAttribute("src")}}const a=(await st("store")).getState();let s;const l=t.target.closest("[data-post-id]");s=l?l.dataset.postId:a.stories.reels.get(a.stories.currentReelId).itemIds[a.stories.currentReelItemIndex];const d=a.posts.byId.get(s),c=a.users.users.get(d.owner.id),p=e.getAttribute("data-action");if("repost"===p)go.repost(s);else if("open"===p){const t=i&&i.outerHTML||o&&o.outerHTML;J.send("ig.media-open",{url:r,html:t})}else if("download"===p){let e=null;try{const t=(d.videoUrl||d.src).split("?")[0].split(".").pop();e=`${c.username}-${d.code}.${t}`}catch(t){console.error(t)}const n=i&&i.outerHTML||o&&o.outerHTML;J.send("ig.media-download",{url:r,filename:e,html:n})}else if("fullscreen"===p&&i)J.send("ig.media-fullscreen-enter",{url:r,currentTime:i.currentTime,volume:i.volume,muted:i.muted,paused:i.paused}),i.pause();else if("pinterest"===p){let t;t=l?`https://www.instagram.com/p/${d.code}/`:`https://www.instagram.com/${c.username}/`,J.send("ig.media-save-to-pinterest",{igUrl:t,url:r})}})),d`
    <style>
      .mediaActions {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.2s;
      }
      .mediaActions_story {
        padding-right: 5px;
        padding-bottom: 70px;
        height: 150px;
        z-index: 1;
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
      }
      .mediaActions_post.mediaActions_photo {
        padding-right: 2px;
        padding-bottom: 12px;
        align-items: flex-end;
      }
      .mediaActions_post.mediaActions_video {
        right: 5px;
        bottom: 72px;
        transition-duration: 0s;
      }
      @media (min-width: 450px) {
        .mediaActions_post.mediaActions_video {
          bottom: 31px;
        }
        [data-media-actions-post-type="igtv"] video::-webkit-media-controls-panel {
          padding-right: 124px !important;
        }
        [data-media-actions-post-type="igtv"] video::-webkit-media-controls-timeline {
          margin-right: -124px !important;
        }
      }
      ${mo["post-item"]}:hover .mediaActions,
      body:hover .mediaActions_story {
        opacity: 1;
      }
      .v1Nh3 .mediaActions, /* preview in profile */
      .PUHRj .mediaActions { /* preview in activity */
        display: none;
      }

      ${mo["post-item"]} video::-webkit-media-controls-panel {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 140px;
        background: linear-gradient(
          to top,
          hsl(0, 0%, 0%, 0.541) 0%,
          hsla(0, 0%, 0%, 0.382) 19%,
          hsla(0, 0%, 0%, 0.278) 34%,
          hsla(0, 0%, 0%, 0.194) 47%,
          hsla(0, 0%, 0%, 0.126) 56.5%,
          hsla(0, 0%, 0%, 0.075) 65%,
          hsla(0, 0%, 0%, 0.042) 73%,
          hsla(0, 0%, 0%, 0.021) 80.2%,
          hsla(0, 0%, 0%, 0.008) 86.1%,
          hsla(0, 0%, 0%, 0.002) 91%,
          hsla(0, 0%, 0%, 0.001) 95.2%,
          hsla(0, 0%, 0%, 0) 100%
        );
      }

      /* show video controls only when hovering video */
      ${mo["post-item"]}:not(:hover) video::-webkit-media-controls-panel {
        display: none;
      }

      .mediaActions__button {
        width: 34px;
        height: 34px;
        margin-right: 6px;
        border-radius: 50%;
        padding: 0;
        border: none;
        cursor: pointer;
        position: relative;
        transform-origin: center;
        outline: none;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: all;
        color: #FFF;
        background: transparent;
        transition: all 0.16s linear;
      }
      .mediaActions__button:not(:hover) {
        transition-duration: 0s;
      }
      .mediaActions_post.mediaActions_video .mediaActions__button {
        margin-right: 4px;
      }
      .mediaActions_post.mediaActions_photo .mediaActions__button,
      .mediaActions_story .mediaActions__button {
        color: #3F3E3F;
        background: rgba(255, 255, 255, 0.9);
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.16);
        width: 27px;
        height: 27px;
        margin-right: 14px;
      }
      .mediaActions_post.mediaActions_video .mediaActions__button:hover {
        background: rgba(36, 36, 40, 0.7);
      }
      /* hitbox */
      .mediaActions__button::before {
        content: '';
        position: absolute;
        top: -3px;
        left: -3px;
        right: -3px;
        bottom: -3px;
      }
      .mediaActions:not(.mediaActions_photo) .mediaActions__button[data-action="pinterest"] {
        display: none;
      }
      .mediaActions_photo .mediaActions__button[data-action="fullscreen"] {
        display: none;
      }
      .mediaActions_igtv .mediaActions__button[data-action="repost"],
      .mediaActions_story .mediaActions__button[data-action="repost"] {
        display: none;
      }

      .mediaActions_post.mediaActions_video .mediaActions__button svg {
        filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.3));
      }
    </style>
  `}};let mo;var ho={init:function(){bo=at.getConfig().igSelectors,On.onDomReady((()=>{J.send("ig.ready")})),On.onPathChange((t=>{J.send("ig.path-change",t)})),async function(){const t=await st("store");if(!t)return;On.onDocClick((e=>{var n,o;if(!e.target.closest(bo.postCreation.submitPostButton))return;if(he.isCreatingReels())return;const i=!!(null===(n=t.getState().creation)||void 0===n||null===(o=n.sourceVideo)||void 0===o?void 0:o.file);J.send("ig.submit-post",i?"video":"photo")}))}(),On.onDocClick((t=>{if(!t.target.closest(".LEJ26 button"))return;const e=!!g("video");J.send("ig.submit-story",e?"video":"photo")})),On.onDocClick((t=>{t.target.closest(".xWeGp")&&J.send("ig.open-dm")})),J.on("ig.back",(async()=>{await ce()?location.href="/":history.state&&history.state.key&&history.back()})),J.on("ig.refresh",(()=>{location.reload()})),J.on("ig.broadcast-scroll",(t=>{On.docElem.scrollTop+=t})),J.on("ig.go-to-igtv-tab",(()=>{const t=f("a",g(bo.general.tabBar)).pop().getAttribute("href")+"channel/",e=document.createElement("a");e.setAttribute("href",t),document.body.appendChild(e),e.click()})),function(){let t;(async()=>{t=await st("nav")})(),J.on("ig.ajax-go",(e=>{t?t.push(e):location.href=e}))}(),async function(t){J.on("ig.hard-go",(t=>{location.href=t}))}(),J.on("ig.get-url",(()=>location.pathname+location.search)),J.on("ig.clear-and-show-spinner",(()=>{g("#react-root").innerHTML=""}))}};let bo;var vo={init:function(){wo=at.getConfig().igSelectors,function(){const t=Symbol("getCroppedCanvasDimensions");Object.defineProperty(Object.prototype,"getCroppedCanvasDimensions",{get:function(){return this[t]},set:function(e){if(!(t in this)){const t=this.default;this.default=function(e){if(Co.onCall(e),!Co.prevented){if(Co.result){const t=Co.result;return Co.result=null,t}return t.call(this,...arguments)}Co.prevented=!1}}return this[t]=e,!0}})}(),On.onDomReady((()=>{_o=Be.create({onClick:$o})})),On.onBeforeStoryCreation((()=>{xo="story",Po()})),On.onBeforePostCreation((()=>{xo=he.isCreatingReels()?"reels":"post",Po()})),On.onMediaProcessingError((()=>{setTimeout(So,1e3)})),c((()=>{const t=g(wo["post-creation"]),e=g(wo["story-video-creation"]),n=g(wo["story-image-creation"]);(t||e||n)&&So()})),On.onMediaProcessingError((t=>{"invalid_media_duration_too_long"===t&&J.send("ig.show-igtv-popup")})),c((()=>{f('input[accept="image/jpeg"]').forEach((t=>{t.setAttribute("accept","image/jpeg, image/png, video/quicktime, video/mp4, video/webm")}))})),Co.onCall((t=>{const{error:e,...n}=function(t){const e=t.videoWidth,n=t.videoHeight;if(!e||!n)return{error:"wrong-format"};if(he.isCreatingReels()&&e===n)return{error:"square-reel-video"};const o=e/n,i=yo[xo].minRatio,r=yo[xo].maxRatio;if(o<i||o>r)return{error:"wrong-ratio",ratio:o};if("story"===xo||"reels"===xo){if(t.duration<yo[xo].minVideoDuration)return{error:"video-too-short"};if(t.duration>yo[xo].maxVideoDuration)return{error:"video-too-long"}}return{error:null}}(t);e&&(async()=>{Co.prevented=!0;const o=await fetch(t.src),i=await o.blob();await Ao(i.type,e,n),On.onMediaProcessingError()})()})),Co.onCall((t=>{"story"===xo&&(Co.result=new Promise((e=>{const n=document.createElement("canvas");t.currentTime=0,t.addEventListener("timeupdate",(()=>{n.width=t.videoWidth,n.height=t.videoHeight,n.getContext("2d").drawImage(t,0,0),n.toBlob((n=>{e({file:n,dataURL:URL.createObjectURL(n),uploadMediaWidth:t.videoWidth,uploadMediaHeight:t.videoHeight,videoTransform:null})}),"image/jpeg")}))})))}))}};const yo={clickShowErrorTimeout:1e4,forceShowErrorTimeout:3e4,story:{minRatio:.5621,maxRatio:1.91,minRatioPrettyStr:"9:16",maxRatioPrettyStr:"1.91:1",minRatioValueStr:"0.5625",maxRatioValueStr:"1.91",minVideoDuration:1,maxVideoDuration:15.9,minVideoDurationStr:"1 second",maxVideoDurationStr:"15 seconds",alertErrorMessage:"Uploading video cancelled. Please ensure that the video is 1 to 15 seconds long and the size ratio is from 1.91:1 to 9:16."},post:{minRatio:.8,maxRatio:1.91,minRatioPrettyStr:"4:5",maxRatioPrettyStr:"1.91:1",minRatioValueStr:"0.8",maxRatioValueStr:"1.91",alertErrorMessage:"Uploading video ca ncelled. Please ensure that the video is 3 to 60 seconds long and the size ratio is from 1.91:1 to 4:5."},reels:{minRatio:.5621,maxRatio:1.91,minRatioPrettyStr:"9:16",maxRatioPrettyStr:"1.91:1",minRatioValueStr:"0.5625",maxRatioValueStr:"1.91",minVideoDuration:1,maxVideoDuration:30.9,minVideoDurationStr:"1 second",maxVideoDurationStr:"30 seconds",alertErrorMessage:"Uploading video cancelled. Please ensure that the video is 1 to 30 seconds long and the size ratio is from 1.91:1 to 9:16."}};let wo,xo,_o,ko,Eo;const Co={onCall:Bn(),result:null,prevented:!1};function Po(){_o&&(ko=Date.now(),Be.toggle(_o,!0),Eo=setTimeout((()=>{alert(yo[xo].alertErrorMessage),So()}),yo.forceShowErrorTimeout))}function So(){_o&&(Be.toggle(_o,!1),clearTimeout(Eo))}function $o(){Date.now()-ko>yo.clickShowErrorTimeout&&alert(yo[xo].alertErrorMessage),So()}async function Ao(t,e,n={}){const o=Ao;if(o.shown)return;o.shown=!0;const i=yo[xo];if("wrong-ratio"===e){const t=n.ratio.toFixed(3);document.body.insertAdjacentHTML("beforeend",`\n      <div class="video-error modal">\n        <div class="modal__window">\n          <div class="video-error__title modal__title">\n            <span class="emoji">😱</span> UNSUPPORTED ASPECT RATIO\n          </div>\n          <div class="modal__content">\n            ${n.ratio<i.minRatio?`\n              Uploaded Video Aspect Ratio is <b>${t}</b>\n              which is <b>below ${i.minRatioPrettyStr} (${i.minRatioValueStr})</b>.\n            `:`\n              Uploaded Video Aspect Ratio is <b>${t}</b>\n              which is <b>above ${i.maxRatioPrettyStr} (${i.maxRatioValueStr})</b>.\n            `}\n            <div class="video-error__convert-section">\n              You can resize the video with one of these free tools:\n              <ul>\n                <li><a href="https://ezgif.com/resize-video" target="_blank">ezgif.com</a></li>\n                <li><a href="https://clideo.com/resize-video" target="_blank">clideo.com</a></li>\n                <li><a href="https://cloudconvert.com/mp4-converter" target="_blank">cloudconvert.com</a></li>\n              </ul>\n            </div>\n            <button class="video-error__got-it-button">\n              OK, GOT IT\n            </button>\n          </div>\n        </div>\n      </div>\n    `)}else if("wrong-format"===e){let e;e="video/quicktime"===t?"https://www.zamzar.com/convert/mov-to-webm":"video/mp4"===t?"https://www.zamzar.com/convert/mp4-to-webm":"https://www.zamzar.com",document.body.insertAdjacentHTML("beforeend",`\n      <div class="video-error modal">\n        <div class="modal__window">\n          <div class="video-error__title modal__title">\n            <span class="emoji">😱</span> UNABLE TO UPLOAD VIDEO\n          </div>\n          <div class="modal__content">\n            Instagram server rejected this video for upload.\n            Please ensure uploaded video uses supported format and codec (e.g. MP4/h264 or WEBM).\n            <div class="video-error__convert-section">\n              You can convert video format with one of these tools:\n              <ul>\n                <li><a href="https://video.online-convert.com/convert-to-mp4" target="_blank">video.online-convert.com</a></li>\n                <li><a href="https://cloudconvert.com/mp4-converter" target="_blank">cloudconvert.com</a></li>\n                <li><a href="https://ezgif.com/resize-video" target="_blank">ezgif.com</a></li>\n                <li><a href="${e}" target="_blank">zamzar.com</a></li>\n              </ul>\n            </div>\n            <button class="video-error__got-it-button">\n              OK, GOT IT\n            </button>\n          </div>\n        </div>\n      </div>\n    `)}else"video-too-short"===e?document.body.insertAdjacentHTML("beforeend",`\n      <div class="video-error modal">\n        <div class="modal__window">\n          <div class="video-error__title modal__title">\n            <span class="emoji">😱</span> VIDEO IS TOO SHORT\n          </div>\n          <div class="modal__content">\n            <div style="display: block">\n              Instagram server did not accept this video,\n              because it is less than <b>${i.minVideoDurationStr}</b> long.\n            </div>\n            <button class="video-error__got-it-button">\n              OK, GOT IT\n            </button>\n          </div>\n        </div>\n      </div>\n    `):"video-too-long"===e?document.body.insertAdjacentHTML("beforeend",`\n      <div class="video-error modal">\n        <div class="modal__window">\n          <div class="video-error__title modal__title">\n            <span class="emoji">😱</span> VIDEO IS TOO LONG\n          </div>\n          <div class="modal__content">\n            Instagram server did not accept this video,\n            because it is over <b>${i.maxVideoDurationStr}</b>\n            long.\n            <div class="video-error__convert-section">\n              You can cut video short with this free\n              <a href="https://online-video-cutter.com/" target="_blank">online video cutter tool</a>.\n            </div>\n            <button class="video-error__got-it-button">\n              OK, GOT IT\n            </button>\n          </div>\n        </div>\n      </div>\n    `):"square-reel-video"===e&&document.body.insertAdjacentHTML("beforeend",'\n      <div class="video-error modal">\n        <div class="modal__window">\n          <div class="video-error__title modal__title">\n            <span class="emoji">😱</span> UNSUPPORTED ASPECT RATIO\n          </div>\n          <div class="modal__content">\n            <div style="display: block">\n              Instagram API does not support posting square 1:1 videos to Reels.\n            </div>\n            <div style="height: 8px"></div>\n            <div style="display: block">\n              • Supported ratios are 4:5 to 1.91:1.<br>\n              • Optimal is 9:16 or 1080x1920px <span class="emoji">🚀</span>\n            </div>\n            <div style="height: 8px"></div>\n            <div style="display: block">\n              You can crop your video online with a&nbsp;free\n              <a href="https://ezgif.com/crop-video" target="_blank">ezgif video cropper tool</a>.\n            </div>\n            <button class="video-error__got-it-button">\n              OK, GOT IT\n            </button>\n          </div>\n        </div>\n      </div>\n    ');o.init||(o.init=!0,On.onDocClick((t=>{if(!t.target.closest(".video-error__got-it-button"))return;g(".video-error").remove(),o.shown=!1})),d`
    <style>
      .video-error__title .emoji {
        margin-right: 8px;
      }

      .video-error__convert-section {
        margin-top: 8px;
        display: block;
      }

      .video-error__got-it-button {
        outline: none;
        border: none;
        padding: 0;
        margin: 16px 0 0 0;
        background: transparent;
        font-size: inherit;
        font-family: inherit;
        text-align: left;
        font-weight: 600;
        color: #1BA2F9;
        cursor: pointer;
      }
    </style>
  `)}var To={init:function(){Lo=at.getConfig().igSelectors,function({minWidth:t}){d`
    <style>
      @media (min-width: ${t}px) {
        ${Lo.general.tabBarWrap} {
          height: 0;
          margin-top: 12px;
        }

        ${Lo.general.tabBar} {
          width: 490px;
          height: 58px !important;
          margin: 0 auto;
          box-shadow: 0 0px 12px rgba(0, 0, 0, 0.14);
          border-radius: 15px 15px 0 0;
        }
        .theme-night ${Lo.general.tabBar} {
          background: #E7E8EA;
          border: 1px solid #FFF;
          border-bottom: none;
          box-shadow: none;
          box-sizing: content-box;
        }

        ${Lo.general.tabBar}::before {
          display: none !important;
        }
      }
    </style>
  `}({minWidth:500}),function({minWidth:t}){d`
    <style>
      @media (min-width: ${t}px) {
        ${Lo.general.header}::before {
          width: 600px;
          margin-left: -300px;
          left: 50% !important;
          right: auto !important;
          background: linear-gradient(
            to right,
            transparent,
            #DBDBDB,
            #DBDBDB,
            transparent
          ) !important;
        }

        ${Lo.general.headerContent} {
          width: 490px !important;
          margin-left: auto;
          margin-right: auto;
        }
      }
    </style>
  `}({minWidth:500}),function({minWidth:t}){const e=document.documentElement;let n=e.scrollTop;const o=()=>{const o=g(Lo.general.header);if(!o)return;if(window.innerWidth<t)return void(o.style.transform=null);const i=e.scrollTop,r=i-n,a=r>6;n=i,r<-6||i<=45?o.style.transform=null:a&&(o.style.transform="translateY(-45px)")};window.addEventListener("resize",o),document.addEventListener("scroll",o),d`
    <style>
      @media (min-width: ${t}px) {
        ${Lo.general.header} {
          transition: transform 0.3s;
        }
      }
    </style>
  `}({minWidth:460}),function({minWidth:t}){d`
    <style>
      @media (min-width: ${t}px) {
        ${Lo.general.storyPreviewContainer} {
          border: 1px solid #EDEDED !important;
          border-radius: 3px;
          margin-top: 18px;
          margin-bottom: 14px;
        }

        html[data-page="feedPage"] ${Lo.general.recommendationsContainer} {
          border: 1px solid #EDEDED !important;
          border-radius: 3px;
        }
      }
    </style>
  `}({minWidth:500}),function({minWidth:t}){d`
    <style>
      @media (min-width: ${t}px) {
        ${Lo.explorePage.content} {
          padding-top: 25px !important;
        }

        ${Lo.explorePage.contentInner} {
          margin-left: -20px !important;
          margin-right: -48px !important;
        }

        ${Lo.explorePage.searchResults} {
          width: 100%;
          max-width: 460px;
          margin: -16px auto 0;
        }

        /* thin border for posts */
        ${Lo.explorePage.post} {
          position: relative;
        }
        ${Lo.explorePage.post}::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
          pointer-events: none;
          box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.3);
        }
      }
    </style>
  `}({minWidth:736}),function({minWidth:t}){Ue((async e=>{if(window.innerWidth<t)return;const n=e.target.closest(Lo.profilePage.post);if(!n)return;e.preventDefault(),e.stopPropagation();const o=n.getAttribute("href");(await st("nav")).push(o)}),{capture:!0}),d`
    <style>
      @media (max-width: ${t-1}px) {
        ${Lo.profilePage.header} {
          margin-top: 20px !important;
        }
      }

      @media (min-width: ${t}px) {
        ${Lo.profilePage.content} {
          padding-top: 0 !important;
        }

        ${Lo.profilePage.header} {
          padding-top: 30px;
        }

        ${Lo.profilePage.headerFirstRow} {
          min-height: 40px;
        }

        ${Lo.profilePage.avatarWithStoryWrap} {
          margin-top: 6px;
        }

        ${Lo.profilePage.username} {
          position: relative;
          top: -3px;
        }

        ${Lo.profilePage.writeButton} {
          margin-left: 10px;
        }

        ${Lo.profilePage.settingsMenuWrap} {
          background: #FFF !important;
        }

        ${Lo.profilePage.settingsMenu} {
          background: #FAFAFA;
          width: 100%;
          max-width: 490px;
          margin: 0 auto;
          border-left: 1px solid #EDEDED;
          border-right: 1px solid #EDEDED;
        }
      }
    </style>
  `}({minWidth:736}),async function({minWidth:t}){if(await ce())return void await J.send("ig.update-ig-view",{fullscreenWidth:550,withBorder:!0});const e=await st("store"),n=document.documentElement,o={};let i,r=!1;const a=await st("scroll-controller"),s=a.restoreScrollPosition;a.restoreScrollPosition=(...e)=>{if(!(window.innerWidth>=t))return s.call(a,...e)};const l=await st("nav"),d=l.push;async function p(){const t=g(Lo.general.root);if(!t)return;if(i===t)return;let a;i=t;const s=location.pathname,l=e.getState().navigation.pageIdentifier,d="/create/story/"!==s&&s.startsWith("/create/");a=s.startsWith("/accounts/signup/")||"loginPage"===l||"unifiedHome"===l?{width:460,borders:!0}:d?{width:490,borders:!0}:"StoriesPage"===l?{width:460,borders:!1}:"exploreLandingPage"===l||"profilePage"===l?{width:900,borders:!1}:{width:550,borders:!1};const c=g(Lo.general.tabBar),p=g(Lo.general.header),u=g(Lo.general.content);if(c&&(c.style.opacity=0),p&&(p.style.opacity=0),u&&(u.style.transition=null,u.style.transform="translateY(3px)",u.style.opacity=0),await J.send("ig.update-ig-view",{fullscreenWidth:a.width,withBorder:a.borders}),c&&(c.style.opacity=null),p&&(p.style.opacity=null),u&&(u.style.transition="transform 0.2s, opacity 0.2s",u.style.transform=null,u.style.opacity=null),!r)return void(n.scrollTop=0);r=!1;const f=o[location.href];f?(n.scrollTop=f.scrollTop,requestAnimationFrame((()=>{const t=f.anchor;if(!t)return;const e=g(t.selector);if(!e)return;const o=e.getBoundingClientRect().top;n.scrollTop+=o-t.top}))):n.scrollTop=0}l.push=(...t)=>(o[location.href]={scrollTop:n.scrollTop,anchor:Ro()},d.call(l,...t)),window.addEventListener("popstate",(()=>{r=!0})),J.on("ig.widescreen-toggled",p),c((()=>{window.innerWidth<t||p()}),!0)}({minWidth:460})}};let Lo;function Ro(){try{const t=g(Lo.general.content);if(!t)return null;const e=f("*",t);for(const t of e){const e=t.getBoundingClientRect().top;if(e<0)continue;const n=Mo(t);if(!n)return;if(!(f(n).length>1))return{top:e,selector:n}}return null}catch(t){return console.error("unable to find scroll anchor",{details:t}),null}}function Mo(t){try{const e=t.tagName.toLowerCase(),n=Array.from(t.classList).map((t=>`.${t}`)).join("");return`${e}${n}${t.getAttributeNames().map((e=>"class"===e||"style"===e?"":`[${e}="${t.getAttribute(e)}"]`)).join("")}`}catch(e){return console.error("unable to get selector for an element",{details:e,elem:t}),""}}var Io={init:function(){Fo=at.getConfig().igSelectors,On.onDocClick((t=>{const e=t.target.closest(".-wt5I");e&&setTimeout((()=>{document.body.contains(e)&&e.click()}),300)})),function(){const t=HTMLElement.prototype.getBoundingClientRect;HTMLElement.prototype.getBoundingClientRect=function(...e){const n=t.call(this,...e);return 0===n.height&&(n.height=1),n}}(),d`
    <style>
      /* story spinner */
      .u6s6p {
        display: none !important;
      }
    </style>
  `,d`
    <style>
      ${Fo["story-container"]} {
        width: 100% !important;
        height: 100% !important;
      }

      ${Fo["story-image"]},
      ${Fo["story-video"]},
      ${Fo["story-loading-preview"]} {
        object-fit: contain;
      }
    </style>
  `,d`
    <style>
      .theme-night ${Fo.storyViewer.pollContainer} {
        filter: url(#theme-reverse-filter);
        color: transparent;
      }

      ${Fo.storyViewer.pollButtons} {
        font-family: inherit !important;
      }

      ${Fo.storyViewer.pollAnswerDigitOrEmoji} {
        -webkit-text-fill-color: inherit !important;
      }

      ${Fo.storyViewer.pollAnswerDigitOrEmoji} .emoji {
        filter: none !important;
        color: initial !important;
        -webkit-text-fill-color: initial !important;
      }
    </style>
  `,document.addEventListener("keyup",(t=>{if("Escape"===t.key){const t=g(Fo.storyViewer.closeButton);if(!t)return;t.click()}else if("ArrowLeft"===t.key){const t=g(Fo.storyViewer.prevButton);if(!t)return;t.click()}else if("ArrowRight"===t.key){const t=g(Fo.storyViewer.nextButton);if(!t)return;t.click()}})),function(){const t="__manageStoriesAutoplay";let e=null,n=!1;c((()=>{const o=g(Fo["stories-viewer"]);e&&!o&&(n=!1,On.docElem.classList.remove("enable-stories-autoplay")),e=o;const i=g(Fo["story-video-play-button"]);n&&i&&!i[t]&&setTimeout((()=>{i[t]=!0,i.click()}),200)})),On.onDocClick((e=>{const o=e.target.closest(Fo["story-video-play-button"]);o&&!n&&(o[t]=!0,n=!0,On.docElem.classList.add("enable-stories-autoplay"))})),d`
    <style>
      .enable-stories-autoplay ${Fo["story-video-play-button"]} {
        opacity: 0;
      }
    </style>
  `}(),function(){const t=window.addEventListener;window.addEventListener=(...e)=>{if("blur"!==e[0])return t.call(window,...e)}}()}};let Fo;var Do={storySharingPost:!1},zo={init:function(){Bo=at.getConfig().igSelectors,d`
    <style>
      ${Bo.storyCreation.topRightButton} {
        cursor: pointer;
      }
    </style>
  `,async function(){const t=await st("store");if(!t)return;const e=CanvasRenderingContext2D.prototype.drawImage;CanvasRenderingContext2D.prototype.drawImage=function(...n){if(!(9===n.length&&n[0]instanceof HTMLImageElement&&"/create/story/"===location.pathname))return e.call(this,...n);const o=g(Bo.storyCreation.root);if(!o)return e.call(this,...n);const i=JSON.parse(JSON.stringify(t.getState())).displayProperties.pixelRatio;let r,a;o.offsetWidth/o.offsetHeight>9/16?(r=o.offsetHeight*(9/16),a=o.offsetHeight):(r=o.offsetWidth,a=o.offsetWidth/(9/16)),o.style.width=`${r}px`,o.style.height=`${a}px`,f("canvas").forEach((t=>{t.style.width=`${r}px`,t.style.height=`${a}px`,t.setAttribute("width",r*i),t.setAttribute("height",a*i)}));const s=n[0],l=.04,d=s.width/s.height,c=d>9/16*(1-l)&&d<(1+l)*(9/16)?"cover":"contain";this.restore();const p=r*i,u=a*i;"contain"===c&&(this.filter="blur(170px)",e.call(this,s,-300,-300,p+600,u+600),this.filter="none");const m=function({type:t,width:e,height:n,containerWidth:o,containerHeight:i,offset:r=0}){const a=e/n,s=o/i;return a>s&&"contain"===t||a<s&&"cover"===t?{dx:0+r,dy:(i-o/a)/2+r,width:o-2*r,height:o/a-2*r}:{dx:(o-i*a)/2+r,dy:0+r,width:i*a-2*r,height:i-2*r}}({type:c,width:s.width,height:s.height,containerWidth:p,containerHeight:u,offset:Do.storySharingPost?60:0});if(e.call(this,s,m.dx,m.dy,m.width,m.height),Do.storySharingPost){const e=g("canvas").getContext("2d"),n=t.getState().displayProperties.pixelRatio,o=Do.storySharingPost.owner.username,i=60/n,r=(m.dy+m.height+40)/n;e.save(),e.scale(n,n),e.fillStyle="white",e.shadowColor="rgba(150, 150, 150, 0.3)",e.shadowOffsetX=0,e.shadowOffsetY=1,e.shadowBlur=2,e.font="600 22px sans-serif",e.textAlign="left",e.textBaseline="top",e.fillText(`@${o}`,i,r),e.restore()}}}(),c((()=>{const t=g(Bo.storyCreation.root);document.documentElement.classList.toggle("story-creation-small-button",t&&t.offsetWidth<360)})),d`
    <style>
      .story-creation-small-button${Bo.storyCreation.headerButton} {
        transform: scale(0.8);
        margin: 0;
      }
    </style>
  `,function(){const t=Symbol("handled");c((async()=>{const e=g(Bo.storyCreation.root);if(!e)return;if(e[t])return;e[t]=!0;if(await J.send("ig.is-fullscreen"))return;const n=document.documentElement;n.classList.add("story-creation-dark-background"),c((function t(){g(Bo.storyCreation.root)||(c.off(t),n.classList.remove("story-creation-dark-background"))}))})),d`
    <style>
      .story-creation-dark-background body {
        background: #0d0d0d;
      }
      .theme-night.story-creation-dark-background body {
        background: #fdfdfd;
      }
    </style>
  `}(),async function(){const t=await st("http");if(!t)return;const e=t.post.bind(t),n=async(t,o=1)=>{console.log(`trying to post a story, attempt no.${o}`);const i=await e(...t);return"fail"===i.status&&"Transcode not finished yet."===i.message&&o<5?(await wt(3e3),n(t,o)):i};t.post=(...t)=>"/create/configure_to_story/"!==t[0]?e(...t):n(t)}(),c((()=>{const t=g(Bo.storyCreation.downloadButton);t&&t.remove()})),d`
    <style>
      ${Bo.storyCreation.mentionBarContainer} {
        width: calc(100% - 100px) !important;
        height: 94px !important;
        top: 0 !important;
        margin-left: -100px !important;
      }

      ${Bo.storyCreation.mentionBar} {
        height: 100% !important;
        border-radius: 0 0 8px 0;
        position: static;
      }

      ${Bo.storyCreation.mentionReel} {
        height: 100% !important;
        position: static;
      }

      ${Bo.storyCreation.mentionReelRow} {
        height: 100% !important;
        align-items: center !important;
        position: static;
      }
      ${Bo.storyCreation.mentionReelRow}:not(:empty)::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 0 8px 8px 0 !important;
        background: rgba(0 , 0 , 0 , 0.2) !important;
      }

      ${Bo.storyCreation.mentionReelItem} {
        margin: 0 10px 0 0 !important;
      }
      ${Bo.storyCreation.mentionReelItem}:last-child {
        margin-right: 0 !important;
      }
    </style>
  `}};let Bo;var Oo={init:async function(){if(Ho=at.getConfig().igSelectors,jo=await st("store"),!jo)return;Ue((function t(e){const n=e.target.closest('[href="/direct/inbox/"]');n&&(e.preventDefault(),(async()=>{await J.send("ig.is-dm-supported")?J.send("ig.open-sidebar-dm"):(Ue.off(t,{capture:!0}),n.click())})())}),{capture:!0}),function(){const t=Symbol("handled");c((async()=>{const o=g(Ho.profilePage.threeDots);if(!o)return;let i=g(".write-button");if(i&&i!==o.previousElementSibling)return i.remove(),void(o[t]=!1);if(o[t])return;o[t]=!0;const r=g(Ho.profilePage.writeButton);if(r)return void r.addEventListener("click",(t=>{t.stopPropagation(),e()}),{capture:!0});if(!await J.send("ig.is-dm-supported"))return;await n()&&(o.insertAdjacentHTML("beforebegin",'\n      <button class="write-button">\n        <svg xmlns="http://www.w3.org/2000/svg" width="19.998" height="17.224" viewBox="0 0 19.998 17.224">\n          <path d="M2.079.75h16.57L9.818 15.071l-1.3-9zm6.508 5.315l9.68-5.127" fill="none" stroke="currentColor" stroke-width="1.5"/>\n        </svg>\n      </button>\n    '),i=g(".write-button"),i.addEventListener("click",e))})),d`
    <style>
      .write-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 42px;
        height: 17px;
        margin-left: 8px;
        border: none;
        border-radius: 4px;
        color: #000;
        background: transparent;
        cursor: pointer;
        user-select: none;
      }

      ${Ho.profilePage.followButton} {
        width: auto !important;
      }

      ${Ho.profilePage.buttonsRow} {
        flex-grow: 0;
        flex-direction: row;
      }

      ${Ho.profilePage.blueButtonsWrap} {
        flex-grow: 0;
        flex-shrink: 0;
      }

      ${Ho.profilePage.subscribeButtonWrap} {
        flex-shrink: 1 !important;
        overflow: hidden !important;
      }

      @media (max-width: 320px) {
        ${Ho.profilePage.writeButton} {
          max-width: 85px;
        }
      }
    </style>
  `;const e=async()=>{const t=await n();t&&J.send("ig.start-conversation-in-sidebar-dm",t.id)},n=async()=>{const t=location.pathname.split("/")[1];return await s((()=>{const e=jo.getState(),n=e.users.usernameToId.get(t);return e.users.users.get(n)||null}))}}(),function(){const t=Symbol("handled");c((()=>{const e=g(Ho.dm.textarea);e&&(e[t]||(e[t]=!0,e.addEventListener("keydown",(t=>{if(13===t.keyCode&&!t.shiftKey&&!t.ctrlKey){const e=g(Ho.dm.sendButton);if(!e)return;t.preventDefault(),e.click()}}))))}))}(),function(){const t=Symbol("handled");c((()=>{const e=g(Ho.dm.textarea);e&&(e[t]||(e[t]=!0,e.focus()))}))}()}};let Ho,jo;var No={init:async function(){if(Wo=await st("store"),!Wo)return;Vo=at.getConfig().igSelectors,function(){const t=Symbol("handled");c((()=>{const e=g(Vo.profilePage.content);if(!e)return;if(e[t])return;e[t]=!0;const n=qo({empty:!0});e.insertAdjacentHTML("afterbegin",n),(async()=>{try{const t=location.pathname.split("/")[1],n=await s((()=>ao.getUserDetails(t)));if(!document.body.contains(e))return;if(Uo.grade=await J.send("chrome-bus","insights.get-credibility-grade",n),!document.body.contains(e))return;const o=n.edge_owner_to_timeline_media.edges.map((t=>t.node));Uo.engagement=function({user:t,posts:e}){const n=Wo.getState().users.viewerId===t.id;if(t.isPrivate&&!n||0===e.length)return{value:"N/A",color:"#D8DADD",label:""};const o=e.map((t=>t.comments+t.likes)).reduce(((t,e)=>t+e),0),i=e.length>0?o/e.length:0,r=t.followerCount>0?i/t.followerCount*100:0,a=`${r<5?(Math.round(10*r)/10).toFixed(1):Math.round(r).toString()}%`,s={value:a,color:"#797979",label:"average"},l={value:a,color:"#74BE86",label:"above avg"},d={value:a,color:"#74BE86",label:"high"},c={value:a,color:"#74BE86",label:"v. high"},p={value:a,color:"#74BE86",label:"extreme"},u=r/(64.18845*Math.pow(t.followerCount,-.2251755));if(u<.4)return s;if(u<.8)return l;if(u<1.2)return d;if(u<1.8)return c;return p}({user:{id:n.id,isPrivate:n.is_private,followerCount:n.edge_followed_by.count},posts:o.map((t=>({likes:t.edge_liked_by.count,comments:t.edge_media_to_comment.count})))});const i=JSON.parse(JSON.stringify(Wo.getState())).users.viewerId;Uo.followStatus={show:String(i)!==String(n.id),value:n.follows_viewer};g(".profile-bar").outerHTML=qo();me({anchor:g(".profile-bar__info-circle"),class:"profile-bar__info-tooltip",text:"\n            <b>Account Grade</b>\n            <br/>\n            This estimates if Instagram account is<br/>\n            spam / inactive or a real person / business.\n            Inssist relies on Machine Learning to identify\n            the grade.\n            <br/><br/>\n\n            <b>Engagement Rate</b>\n            <br/>\n            Profile engagement rate is calculated as\n            <code>(likes + comments) / followers</code>, for the last<br/>\n            12 posts. The higher account engagement,<br/>\n            the more active the followers are.\n            <br/><br/>\n\n            <b>Follow Status</b>\n            <br/>\n            Shows if this account is following you or not.\n            <br/><br/>\n\n            Account Grade and Engagement Rate are<br/>\n            not available for private accounts.\n          "})}catch(t){console.error("ig profile bar controller → manageBarCreation:",t);const e=g(".profile-bar");e&&e.remove()}})()}))}(),d`
    <style>
      .profile-bar {
        height: 48px;
        border-bottom: 1px solid #DBDBDB;
        background: #FCFCFD;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        font-size: 12px;
      }
      .profile-bar::before,
      .profile-bar::after {
        content: '';
        position: absolute;
        top: 0;
        bottom: -1px;
        width: calc(calc(100% - 400px) / 2);
      }
      .profile-bar::before {
        left: 0;
        background: linear-gradient(to right, white 40%, transparent);
      }
      .profile-bar::after {
        right: 0;
        background: linear-gradient(to left, white 40%, transparent);
      }

      .profile-bar__items {
        display: flex;
        flex-direction: row;
      }

      .profile-bar__item {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 40px;
      }
      .profile-bar__item:last-child {
        margin-right: 0;
      }

      .profile-bar__value {
        color: #262626;
        font-weight: 600;
        flex-direction: row;
      }

      .profile-bar__label {
        color: #999;
        font-weight: 500;
      }

      .profile-bar__info-circle {
        position: absolute !important;
        top: 50%;
        left: 50%;
        margin-top: -6px;
        margin-left: 200px;
        z-index: 1;
        transition: opacity 0.2s;
      }
      .profile-bar:not(:hover) .profile-bar__info-circle {
        opacity: 0;
      }

      .profile-bar__info-tooltip {
        width: 306px;
      }

      @media (max-width: 400px) {
        .profile-bar::before,
        .profile-bar::after {
          display: none;
        }

        .profile-bar__item {
          margin-right: 24px;
        }
      }

      @media (max-width: 440px) {
        .profile-bar__info-circle {
          top: 5px;
          left: auto;
          right: 8px;
          margin-left: auto;
          margin-top: auto;
        }
      }
    </style>
  `}};let Vo,Wo;const Uo={grade:null,engagement:null,followStatus:null};function qo({empty:t=!1}={}){return t?'\n      <div class="profile-bar"></div>\n    ':`\n    <div class="profile-bar">\n      <div class="profile-bar__items">\n        <div class="profile-bar__item">\n          <div class="profile-bar__value">\n            ${Uo.grade?`\n              <span style="color: ${Uo.grade.color}">${Uo.grade.value}</span>,\n              ${Uo.grade.label}\n            `:""}\n          </div>\n          <div class="profile-bar__label">\n            Account grade\n          </div>\n        </div>\n        <div class="profile-bar__item">\n          <div class="profile-bar__value">\n            <span style="color: ${Uo.engagement.color}">${Uo.engagement.value}</span>\n            ${Uo.engagement.label?`, ${Uo.engagement.label}`:""}\n          </div>\n          <div class="profile-bar__label">\n            Engagement\n          </div>\n        </div>\n        ${Uo.followStatus.show?`\n          <div class="profile-bar__item">\n            <div class="profile-bar__value">\n              ${Uo.followStatus.value?"Yes":"No"}\n            </div>\n            <div class="profile-bar__label">\n              Follows me\n            </div>\n          </div>\n        `:""}\n      </div>\n      <div class="profile-bar__info-circle info-circle">?</div>\n    </div>\n  `}var Yo={init:async function(){if(Xo=at.getConfig().igSelectors,Go=await st("nav"),Jo=await st("http"),Ko=await st("store"),Zo=await st("add-dispatch-listener"),!(Go&&Jo&&Ko&&Zo))return void console.error("failed to require",{nav:Go,http:Jo,store:Ko,addDispatchListener:Zo});Zo((t=>{"STORY_CREATION_EXIT"===t.type&&(Do.storySharingPost=null)})),function(){let t;Zo((e=>{"POST_SHARE_IDS_LOADED"===e.type&&(t=e.postId)}));const e=Symbol("handled");c((()=>{if(!g(Xo.dragPanel.copyLinkIcon))return;const n=g(Xo.dragPanel.shareMenuItem);if(!n)return;if(n[e])return;n[e]=!0,n.insertAdjacentHTML("beforebegin",'\n      <div class="share-to-story">\n        <div class="share-to-story__icon">\n          <svg class="share-to-story__icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12.474 22.779a11.28 11.28 0 01-5.294-1.32.777.777 0 11.732-1.37 9.741 9.741 0 006.775.884.777.777 0 01.353 1.513 11.326 11.326 0 01-2.566.293zm-7.205-2.871a.773.773 0 01-.534-.213 11.218 11.218 0 01-3.2-5.509.777.777 0 011.51-.366 9.667 9.667 0 002.757 4.748.777.777 0 01-.534 1.34zm-3.221-8.651h-.077a.776.776 0 01-.7-.849 11.174 11.174 0 01.995-3.632.777.777 0 011.408.656 9.618 9.618 0 00-.854 3.122.777.777 0 01-.772.703zm3.258-6.58a.777.777 0 01-.6-1.269q.1-.127.211-.25a.777.777 0 111.171 1.02c-.062.071-.122.143-.182.215a.776.776 0 01-.6.284zm12.543 16.62a.777.777 0 01-.4-1.443 9.7 9.7 0 00-4.975-18.03.777.777 0 110-1.554 11.255 11.255 0 015.773 20.917.77.77 0 01-.398.11z" fill="currentColor"/><path d="M17.723 10.788h-4.45v-4.45H11.72v4.45H7.27v1.553h4.45v4.45h1.553v-4.45h4.45z" fill="currentColor"/></svg>\n        </div>\n        <div class="share-to-story__text">\n          Share to Story\n        </div>\n      </div>\n    ');g(".share-to-story").addEventListener("click",(e=>{e.stopPropagation(),async function(t){const e=Ko.getState().posts.byId.get(t);if(!e)return;const n=await fetch(e.src,{credentials:"omit"}),o=await n.blob(),i=URL.createObjectURL(o),{width:r,height:a}=await new Promise((t=>{const e=new Image;e.src=i,e.addEventListener("load",(()=>{t({width:e.width,height:e.height})}))}));Do.storySharingPost=e,Ko.dispatch({type:"STORY_CREATION_SESSION_STARTED",entryPoint:"quick_cam_button",sessionId:Math.random().toString().slice(2),startTime:Date.now()}),Ko.dispatch({type:"STORY_CREATION_IMAGE_PROCESSED",flash:!1,location:null,orientation:0,sourceImage:o,sourceDataURL:i,width:r,height:a}),Go.push("/create/story/")}(t),J.send("ga.send-event","user","ig:share-to-story-click")}))})),d`
    <style>
      .share-to-story {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 8px 16px;
        cursor: pointer;
      }
      .share-to-story:hover {
        background: #FAFAFA;
      }

      .share-to-story__icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        margin-right: 12px;
      }

      .share-to-story__icon-svg {
        width: 24px;
        height: 24px;
        position: relative;
        left: 1px;
      }

      .share-to-story__text {
        font-weight: 600;
      }
    </style>
  `}(),function(){const t=Jo.post.bind(Jo);Jo.post=(...e)=>("/create/configure_to_story/"===e[0]&&Do.storySharingPost&&(e[1]={...e[1],reshared_media_id:Do.storySharingPost.id,story_sticker_ids:`media_simple_${Do.storySharingPost.id}`,attached_media:JSON.stringify([{x:.5,y:.5,width:.5,height:.5,rotation:0,media_id:Do.storySharingPost.id,media_owner_id:Do.storySharingPost.owner.id,is_sticker:!0}])}),t(...e))}()}};let Xo,Go,Jo,Ko,Zo;var Qo={init:function(){!async function(){const t=await st("store");if(!t)return;const e=Symbol("handled");c((()=>{const n=g(".get-insights-button-row");if(!n)return;if(n[e])return;n[e]=!0;const o=t.getState(),i=o.navigation.displayedRoute.split("/")[1],r=o.users.usernameToId.get(i);if(!r)return;const a=o.users.users.get(r);if(!a)return;const s=a.businessEmail;s&&n.insertAdjacentHTML("afterbegin",`\n      <a class="profile-email-button" href="mailto:${s}">\n        Email\n      </a>\n    `)})),d`
    <style>
      .profile-email-button {
        display: block;
        margin-right: 8px;
        margin-bottom: 12px;
        height: 30px;
        line-height: 28px;
        padding: 0 9px;
        font-weight: 600;
        color: #262626;
        background: transparent;
        border: 1px solid #dbdbdb;
        border-radius: 4px;
        outline: none;
        cursor: pointer;
        box-sizing: border-box;
      }
    </style>
  `}()}};var ti={init:function(){ei=at.getConfig().igSelectors,async function(){const t=await st("store"),e=await st("http");if(!t||!e)return;const n=Symbol("handled");c((()=>{const o=g(ei.general.actionDialogWithoutHeader);if(!o)return;if(o[n])return;o[n]=!0;const i=t.getState();if("postPage"!==i.navigation.pageIdentifier)return;const r=location.pathname.split("/")[2],a=i.posts.byId.toJS(),s=Object.values(a).find((t=>t.code===r));if(!s)return;if(s.owner.id!==i.users.viewerId)return;const l=g(ei.general.modalWindow);if(!l)return;o.firstChild.insertAdjacentHTML("afterend",'\n      <button class="edit-post-action-button">\n        Edit Caption\n      </button>\n    ');g(".edit-post-action-button").addEventListener("click",(()=>{l.classList.add("post-editor"),o.innerHTML=`\n        <form class="post-editor__form">\n          <div class="post-editor__title">\n            Edit Caption\n          </div>\n          <textarea\n            class="post-editor__textarea"\n            placeholder="Write a caption..."\n            maxlength="2200"\n            spellcheck="false"\n            required\n          >${s.caption||""}</textarea>\n          <div class="post-editor__buttons">\n            <button class="post-editor__button-save button" type="submit">\n              Save Caption\n            </button>\n            <button class="post-editor__button-cancel button button_cancel">\n              Cancel\n            </button>\n          </div>\n          <div class="post-editor__error"></div>\n        </form>\n      `;const t=g(".post-editor"),n=g(".post-editor__textarea"),i=g(".post-editor__button-save"),r=g(".post-editor__button-cancel"),a=g(".post-editor__error");setTimeout((()=>{n.focus(),n.setSelectionRange(n.value.length,n.value.length)}),300),n.addEventListener("input",(()=>{t.classList.remove("post-editor_with-error")})),t.addEventListener("submit",(async o=>{var l;let d;o.preventDefault(),n.disabled=!0,i.disabled=!0,r.disabled=!0,i.innerText="Saving...";try{d=await e.post(`https://i.instagram.com/api/v1/media/${s.id}/edit_media/`,{media_id:s.id,_csrftoken:window._sharedData.config.csrf_token,_uid:window._sharedData.config.viewerId,_uuid:window._sharedData.config.viewerId,caption_text:g(".post-editor__textarea").value})}catch(o){d={error:o}}var c,p,u,f,m,h,b;"ok"===(null===(l=d)||void 0===l?void 0:l.status)?location.reload():(n.disabled=!1,i.disabled=!1,r.disabled=!1,i.innerText="Save Caption",t.classList.add("post-editor_with-error"),"igtv"===s.productType?a.innerHTML="\n              Instagram refused to edit caption.\n              Please use Instagram Mobile App to edit IGTV captions.\n            ":a.innerText=(null===(c=d)||void 0===c||null===(p=c.error)||void 0===p?void 0:p.message)||(null===(u=d)||void 0===u||null===(f=u.error)||void 0===f||null===(m=f.responseObject)||void 0===m?void 0:m.message)||(null===(h=d)||void 0===h||null===(b=h.error)||void 0===b?void 0:b.responseText)||"Unknown error")})),r.addEventListener("click",(()=>{const t=g(ei.general.modal);if(!t)return;const e=new MouseEvent("mousedown",{bubbles:!0});t.dispatchEvent(e)}))}))})),d`
    <style>
      .edit-post-action-button {
        height: 48px;
        padding: 4px 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 400;
        background: transparent;
        border: none;
        border-top: 1px solid #dbdbdb;
        cursor: pointer;
      }
      .edit-post-action-button:active {
        background: rgba(0, 0, 0, 0.1);
      }

      .post-editor {
        width: 380px !important;
        max-width: calc(100% - 26px) !important;
      }

      .post-editor__form {
        display: flex;
        flex-direction: column;
        margin: 16px;
        height: 330px;
        max-height: calc(100vh - 26px);
      }

      .post-editor__title {
        font-weight: 500;
        margin-left: 9px;
        margin-bottom: 12px;
      }

      .post-editor__textarea {
        color: #3F3E3F;
        border: 1px solid #EFEFEF;
        background: #F7F7F9;
        border-radius: 4px;
        resize: none;
        padding: 6px 8px;
        flex-grow: 1;
      }
      .post-editor__textarea::placeholder {
        color: #3F3E3F;
        opacity: 0.5;
      }
      .post-editor__textarea:disabled {
        opacity: 0.5;
      }
      .theme-night .post-editor__textarea {
        border-color: #101010;
        background: #060606 !important;
      }

      .post-editor__buttons {
        display: flex;
        flex-direction: row;
        margin-top: 12px;
      }

      .post-editor__error {
        display: none;
        color: #E34E21;
        margin-top: 12px;
        line-height: 19px;
      }
      .post-editor_with-error .post-editor__error {
        display: block;
      }
    </style>
  `}()}};let ei;var ni={init:async function(){if(oi=at.getConfig().igSelectors,ii=await st("add-dispatch-listener"),!ii)return;(function(){const t=Symbol("handled");c((()=>{const e=g(oi.postCreation.captionContainer);e&&(e[t]||(e[t]=!0,e.insertAdjacentHTML("beforeend",`\n      <div class="post-caption-limits">\n        <svg class="post-caption-limits__icon" xmlns="http://www.w3.org/2000/svg" width="28.824" height="26.006" viewBox="0 0 28.824 26.006">\n          <path d="M10.948 1.999a4 4 0 016.926 0l10.407 18.007a4 4 0 01-3.463 6H4.006a4 4 0 01-3.463-6z" fill="currentColor"/>\n          <path class="exclamation" d="M13.622 17.079l-.748-9.537 2.972.019-.753 9.518zm-.613 1.428h2.7v2.663h-2.7z" fill="#fff"/>\n        </svg>\n        <div class="post-caption-limits__text">${ri}</div>\n      </div>\n    `)))}))})(),d`
    <style>
      .post-caption-limits--show ${oi.postCreation.captionContainer} {
        padding-bottom: 32px;
      }

      .post-caption-limits--show ${oi.postCreation.submitPostButton} {
        opacity: 0.3;
        pointer-events: none;
      }

      .post-caption-limits--show .post-caption-watermark {
        display: none;
      }

      .post-caption-limits {
        display: flex;
        flex-direction: row;
        align-items: center;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 0 18px 8px;
        color: #E34E21;
      }
      html:not(.post-caption-limits--show) .post-caption-limits {
        display: none;
      }
      .theme-night .post-caption-limits {
        filter: url(#theme-reverse-filter);
        color: #E94351;
      }

      .post-caption-limits__icon {
        width: 14px;
        height: 14px;
        margin-right: 8px;
      }

      .post-caption-limits__text {
        font-size: 14px;
      }
    </style>
  `,ii((t=>{if("CREATION_CAPTION_CHANGED"!==t.type)return;const e=t.caption,n=(e.match(/@[\p{L}\d_]+/gu)||[]).length,o=(e.match(/#[\p{L}\d_]+/gu)||[]).length;ri=e.length>ai?`Caption length exceeded: ${e.length} / ${ai}`:n>si?`Mention limit exceeded: ${n} / ${si}`:o>li?`Hashtag limit exceeded: ${o} / ${li}`:"",ge.classList.toggle("post-caption-limits--show",!!ri);const i=g(".post-caption-limits__text");i&&(i.innerText=ri)}))}};let oi,ii,ri="";const ai=2200,si=30,li=30;var di={init:async function(){if(ci=at.getConfig().igSelectors,pi=await st("http"),ui=await st("store"),gi=await st("add-dispatch-listener"),!pi||!ui||!gi)return;!function(){let t=0;const e=pi.post;pi.post=async(...n)=>{const o=n[0],i=await e.call(pi,...n),r=o.includes("/create/configure/"),a=o.includes("/media/configure_to_clips/");if(!(r||a))return i;return"fail"===i.status?t<2?(t+=1,requestAnimationFrame((()=>{ui.dispatch({type:"UPDATE_UPLOAD_TEXT",text:"Processing..."})})),setTimeout((()=>{pi.post(...n)}),2e3),i):(t=0,requestAnimationFrame((()=>{ui.dispatch({type:"UPDATE_UPLOAD_TEXT",text:i.message?`Error: ${i.message}`:"Unknown error."});const t=g(ci.general.uploadPanel);if(!t)return;t.insertAdjacentHTML("beforeend",'\n        <button class="retry-upload-button clickable">\n          Retry\n        </button>\n      ');const e=g(".retry-upload-button");e.addEventListener("click",(()=>{ui.dispatch({type:"UPDATE_UPLOAD_TEXT",text:"Processing..."}),pi.post(...n),e.remove()}))})),i):(t=0,requestAnimationFrame((()=>{ui.dispatch({type:"UPDATE_UPLOAD_TEXT",text:"Done."})})),i)},d`
    <style>
      .retry-upload-button {
        font-weight: 600;
        color: #0095f6;
        padding: 0;
        border: 0;
        background: transparent;
        cursor: pointer;
      }
    </style>
  `}()}};let ci,pi,ui,gi;var fi={init:async function(){window.ig=On,Rn.init(),o.isIframe()&&async function(){if(!e.get("inssist.isDevelopment"))return;window.store=await On.require("store"),Object.defineProperty(window,"state",{get:function(){const t=window.store.getState();return JSON.parse(JSON.stringify(t))}});const t=await On.require("add-dispatch-listener");let n=!1;window.showActions=()=>{n=!0},window.hideActions=()=>{n=!1},t((t=>{n&&console.warn(t)}))}();if(!o.isIframe())return void ee.init();const t=o.isIframe("inssist-ig"),n=o.isIframe("inssist-dm"),i=o.isIframe("inssist-igtv");(t||n||i)&&(dn.initForIg(),on.init());if(t)return oe.init(),pe.init(),We.init(),Ge.init(),tn.init(),eo.init(),ao.init(),po.init(),fo.init(),ho.init(),vo.init(),To.init(),Io.init(),zo.init(),Oo.init(),No.init(),Yo.init(),un.init(),fn.init(),bn.init(),Qo.init(),ti.init(),xn.init(),ni.init(),di.init(),he.init(),An.init(),Pn.init(),Dn.init(),void io.init();if(n)return await r(),void Yt.init();i&&(await r(),Qt.init())}};({init:function(){fi.init()}}).init()}();