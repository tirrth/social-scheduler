!function(){function e(e){const n=document.createElement("script");n.textContent=e.replace("<script>","(function () {").replace("<\/script>","})()"),document.documentElement.insertAdjacentElement("afterbegin",n),n.remove()}var n={createName:function(e,n){return`${e}|${JSON.stringify(n)}`},getName:t,getParams:function(){return function(e){try{return JSON.parse(e)}catch(e){return null}}(window.self.name.split("|")[1])||{}},isIframe:function(e=null){return window.self!==parent&&(!e||t()===e)}};function t(){return window.self.name.split("|")[0]||null}var r={init:function(){e('\n    <script>\n      const modulePatcher = window.inssist.modulePatcher\n\n\n      ;(function main () {\n        patchMessageRendering()\n      })()\n\n\n      function patchMessageRendering () {\n        modulePatcher.onModuleInit((bodyStr, setBodyStr) => {\n          // detect that this is a message rendering module\n          if (!bodyStr.includes(\'DirectMessageErrorBoundary\')) { return }\n\n          // pass "id" to Instagram\'s "Box" component\n          //   (only for unsupported message types)\n          const newBodyStr = bodyStr.replace(\n            \'direction:"column"\',\n            \'direction:"column",id:"message-"+this.props.messageId\'\n          )\n          setBodyStr(newBodyStr)\n        })\n      }\n    <\/script>\n  ')}};var i={init:function(){e("\n    <script>\n      const moduleInterceptor = window.inssist.moduleInterceptor\n\n\n      moduleInterceptor.registerReduxAction(\n        'inssist.dm.apply-filters',\n        (state, action) => {\n          return {\n            ...state,\n            direct: {\n              ...state.direct,\n              filters: {\n                ...(state.direct.filters || {\n                  string: '',\n                  unread: false,\n                  flagged: false,\n                }),\n                ...('string' in action) && {\n                  string: action.string,\n                },\n                ...('unread' in action) && {\n                  unread: action.unread,\n                },\n                ...('flagged' in action) && {\n                  flagged: action.flagged,\n                },\n              },\n            },\n          }\n        },\n      )\n    <\/script>\n  "),e("\n    <script>\n      const modulePatcher = window.inssist.modulePatcher\n\n\n      modulePatcher.onModuleInit((bodyStr, setBodyStr) => {\n        const isThreadsNormalizer = (\n          bodyStr.includes('last_permanent_item') &&\n          bodyStr.includes('processStrategy')\n        )\n        if (!isThreadsNormalizer) { return }\n\n        const moduleVar = bodyStr.match(/(\\w+)\\.default=/)[1]\n        setBodyStr(\n          bodyStr +\n          ';window.inssist.moduleInterceptor.registerModule(\"dm-threads-normalizer\",' +\n          moduleVar +\n          '.default)'\n        )\n      })\n    <\/script>\n  "),e("\n    <script>\n      // require \"store\" and \"dm-state-proxy\" modules\n      let store\n      let stateProxy\n      const interval = setInterval(() => {\n        if (!window.ig) { return }\n        setTimeout(() => clearInterval(interval))\n        ;(async () => {\n          store = await window.ig.require('store')\n          stateProxy = await window.ig.require('dm-state-proxy')\n        })()\n      }, 100)\n\n\n      const _createSelector_ = Symbol('createSelector')\n      Object.defineProperty(Object.prototype, 'createSelector', {\n        get () {\n          return this[_createSelector_]\n        },\n        set (createSelector) {\n          this[_createSelector_] = (...args) => {\n            const isThreadsSelector = (\n              args[2] &&\n              // null==s||s===t.folder\n              /null==\\w\\|\\|\\w===\\w\\.folder/.test(args[2].toString())\n            )\n            if (!isThreadsSelector) {\n              return createSelector(...args)\n            }\n\n            args[0] = (s) => ([\n              s.direct.threads.filter(t => !t.pending),\n              s.direct.filters,\n            ])\n            args[2] = ([threads, filters], folder) => {\n              let state = null\n              let users = {}\n              if (store && stateProxy) {\n                state = store.getState()\n                users = state.direct.users.toJS()\n              }\n\n              return threads.filter(thread => {\n                // check folder\n                const folderOk = (\n                  typeof folder !== 'number' ||\n                  thread.folder === folder\n                )\n                if (!folderOk) { return false }\n\n                // don't apply filters if store and\n                //   state proxy are not initialized yet\n                if (!state) { return true }\n\n                // no filters in state yet? => use default values\n                if (!filters) {\n                  filters = {\n                    string: '',\n                    unread: false,\n                    flagged: false,\n                  }\n                }\n\n                // check filter string\n                const inviter = users[thread.inviter] || null\n                const filterString = (filters.string || '').toLowerCase()\n                const title = thread.thread_title || (inviter && inviter.username) || ''\n                const filterStringOk = title.toLowerCase().includes(filterString)\n                if (!filterStringOk) { return false }\n\n                // check filter unread\n                const filterUnread = filters.unread || false\n                const seen = stateProxy.getThreadSeenByViewer(state, thread.id)\n                if (filterUnread && seen) { return false }\n\n                // check filter flagged\n                const filterFlagged = filters.flagged || false\n                const flagged = thread.thread_label === 1\n                if (filterFlagged && !flagged) { return false }\n\n                return true\n              })\n            }\n\n            return createSelector(...args)\n          }\n\n          return true\n        },\n      })\n    <\/script>\n  ")}};var o={init:function(){r.init(),i.init()}};var s={init:function(){!function(){if(!(window.opener&&"reels.auth-window"===window.name||sessionStorage.isReelsAuthWindow))return;sessionStorage.isReelsAuthWindow=!0,e("\n    <script>\n      setInterval(async () => {\n        const loggedIn = !!document.querySelector('.logged-in')\n        if (!loggedIn) { return }\n        // a tricky way to notify inssist about auth result\n        document.cookie = 'reels.auth-result-cookie=1'\n        window.close()\n      }, 50)\n    <\/script>\n  ")}()}};var a=document.documentElement,c={initForIg:function(){l(),e(`\n    <script>\n      const modulePatcher = window.inssist.modulePatcher\n      modulePatcher.onModuleInit((bodyStr, setBodyStr) => {\n        const isReact = (\n          bodyStr.includes('createElement:') &&\n          bodyStr.includes('Fragment:')\n        )\n        if (!isReact) { return }\n\n        const moduleVar = bodyStr.match(/(\\w+)\\.exports=/)[1]\n        if (!moduleVar) { return }\n\n        setBodyStr(\n          bodyStr + ';' +\n          'const __module__ = ' + moduleVar + ';' +\n          "${"\n    <script>\n      ;(() => {\n        const React = __module__.exports;\n        const emojiRegex = window.inssist.theme.emojiRegex;\n        const createElement = React.createElement.bind(React);\n        React.createElement = (...args) => {\n          const children = [].concat(args[2]);\n\n          let hasEmoji = false;\n          children.forEach((child, childIndex) => {\n            if (typeof child !== 'string') { return }\n\n            const emojis = (child.match(emojiRegex) || []).filter(e => !'0123456789#*'.includes(e));\n            if (emojis.length === 0) { return }\n\n            const newChildren = [];\n            let str = child;\n            emojis.forEach((emoji, emojiIndex) => {\n              if (!str.includes(emoji)) { return }\n              str = str.replace(emoji, '__@#$%^__');\n              const [before, after] = str.split('__@#$%^__');\n              if (before) {\n                newChildren.push(before);\n              }\n              const span = createElement('span', {\n                className: 'emoji',\n              }, emoji);\n              newChildren.push(span);\n              str = after;\n            });\n            if (str) {\n              newChildren.push(str);\n            }\n\n            hasEmoji = true;\n            children[childIndex] = newChildren;\n          });\n\n          if (hasEmoji) {\n            args[2] = children;\n          }\n\n          return createElement(...args);\n        }\n      })()\n    <\/script>\n  ".replace("<script>","").replace("<\/script>","").split("\n").join(" ")}"\n        )\n      })\n    <\/script>\n  `)},initForFcs:function(){l()}};function l(){e(`\n    <script>\n      window.inssist.theme.emojiRegex = ${window.emojiRegex.toString()}\n    <\/script>\n  `)}var d={initForIg:function(){u(),c.initForIg()},initForFcs:function(){u(),c.initForFcs()}};function u(){!function(){const e=n.getParams().theme;if(!e)return;a.classList.add(`theme-${e}`)}(),a.insertAdjacentHTML("afterbegin",'\n    <svg id="theme-night-svg" style="display: none; height: 0px; width: 0px;">\n      <filter id="theme-filter" x="0" y="0" width="99999" height="99999" style="color-interpolation-filters: srgb;">\n        <feColorMatrix type="matrix" values="0.300 -0.600 -0.600 0.000 0.950 -0.600 0.300 -0.600 0.000 0.950 -0.600 -0.600 0.300 0.000 0.950 0.000 0.000 0.000 1.000 0.000"></feColorMatrix>\n      </filter>\n      <filter id="theme-reverse-filter" x="0" y="0" width="99999" height="99999" style="color-interpolation-filters: srgb;">\n        <feColorMatrix type="matrix" values="0.333 -0.667 -0.667 0.000 1.000 -0.667 0.333 -0.667 0.000 1.000 -0.667 -0.667 0.333 0.000 1.000 0.000 0.000 0.000 1.000 0.000"></feColorMatrix>\n      </filter>\n    </svg>\n  '),a.insertAdjacentHTML("afterbegin",'\n    <style>\n      .theme-night {\n        filter: url(#theme-filter) !important;\n        text-shadow: 0 0 0 !important;\n        background: #191919 !important;\n      }\n\n      .theme-night ._cqw45._2pnef,\n      .theme-night ._mli86,\n      .theme-night :not(object):not(body)>embed,\n      .theme-night [background],\n      .theme-night [style*="background-image: url"],\n      .theme-night [style*="background-image:url"],\n      .theme-night [style*="background: url"],\n      .theme-night [style*="background:url"],\n      .theme-night img,\n      .theme-night object,\n      .theme-night svg image,\n      .theme-night video {\n        -webkit-filter: url(#theme-reverse-filter) !important;\n        filter: url(#theme-reverse-filter) !important;\n      }\n\n      .theme-night [background] *,\n      .theme-night [style*="background-image: url"] *,\n      .theme-night [style*="background-image:url"] *,\n      .theme-night [style*="background: url"] *,\n      .theme-night [style*="background:url"] *,\n      .theme-night img[src^="https://s0.wp.com/latex.php"],\n      .theme-night input .NaturalImage-image {\n        -webkit-filter: none !important;\n        filter: none !important;\n      }\n\n      .theme-night :-webkit-full-screen,\n      .theme-night :-webkit-full-screen * {\n        -webkit-filter: none !important;\n        filter: none !important;\n      }\n\n      .theme-night :-moz-full-screen,\n      .theme-night :-moz-full-screen * {\n        -webkit-filter: none !important;\n        filter: none !important;\n      }\n\n      .theme-night :fullscreen,\n      .theme-night :fullscreen * {\n        -webkit-filter: none !important;\n        filter: none !important;\n      }\n    </style>\n  ')}var p={init:function(){e("\n    <script>\n      const modulePatcher = window.inssist.modulePatcher\n\n\n      ;(function main () {\n        patchHasResultsProp()\n      })()\n\n\n      function patchHasResultsProp () {\n        const regexp = /hasResults:(\\w+\\.search\\.results\\.length>0)/\n        modulePatcher.onModuleInit((bodyStr, setBodyStr) => {\n          const match = bodyStr.match(regexp)\n          if (!match || !match[1]) { return }\n          setBodyStr(bodyStr.replace(match[1], 'false'))\n        })\n      }\n    <\/script>\n  ")}};var f={init:function(){p.init()}};var g={init:function(){!function(){if(Array.prototype.flat)return;Array.prototype.flat=function(){const e=[...this],n=[];for(const t of e)Array.isArray(t)?n.push(...t):n.push(t);return n}}()}};var m={init:function(){e("\n    <script>\n      window.inssist.gatekeeper.gatekeeperIds = []\n    <\/script>\n  "),e("\n    <script>\n      const modulePatcher = window.inssist.modulePatcher\n      const gatekeeperIds = window.inssist.gatekeeper.gatekeeperIds\n\n      modulePatcher.onModuleInit(bodyStr => {\n        if (!bodyStr.includes('$ProfilePage1=')) { return }\n\n        // extract 166 from this code:\n        //   ...rn!0!==t.hasClips||!i(d[50])._(\"166\")||this.$Pro..\n        try {\n          const id = bodyStr\n            .split('hasClips||')[1]\n            .split('._(\"')[1]\n            .split('\"')[0]\n          if (!gatekeeperIds.includes(id)) {\n            gatekeeperIds.push(id)\n          }\n        } catch (e) {\n          console.error('failed to extract reels gatekeeper id', e)\n        }\n      })\n    <\/script>\n  ")}};var h={init:function(){e("\n    <script>\n      window.storyMentionsContentScript = {}\n    <\/script>\n  "),e("\n    <script>\n      Object.assign(window.storyMentionsContentScript, {\n        onStoryCreationReduce,\n      })\n\n\n      ;(function main () {\n        interceptStoryCreationReducer()\n      })()\n\n\n      const interceptors = []\n\n\n      function onStoryCreationReduce (fn) {\n        interceptors.push(fn)\n      }\n\n\n      function interceptStoryCreationReducer () {\n        const _key_ = Symbol('DEFAULT_TRANSFORMATION')\n        Object.defineProperty(Object.prototype, 'DEFAULT_TRANSFORMATION', {\n          get () {\n            return this[_key_]\n          },\n          set (value) {\n            // if first time call\n            if (!(_key_ in this)) {\n              // patch \".default\" method\n              const origDefault = this.default\n              this.default = (...args) => {\n                // call all interceptors\n                const storyCreationState = args[0]\n                const action = args[1]\n                interceptors.forEach(fn => {\n                  fn(action, storyCreationState)\n                })\n\n                // call original function\n                return origDefault(...args)\n              }\n            }\n\n            this[_key_] = value\n            return true\n          },\n        })\n      }\n    <\/script>\n  ")}};var y={init:function(){e("\n    <script>\n      window.inssist.modulePatcher = {\n        onModuleInit,\n      }\n\n\n      const fns = []\n\n\n      function onModuleInit (fn) {\n        fns.push(fn)\n      }\n\n\n      // patch __d function so we can modify modules body\n      let __d\n      Object.defineProperty(Object.prototype, '__d', {\n        get () {\n          return (...args) => {\n            const fn = args[0]\n            if (typeof fn !== 'function') {\n              return __d(...args)\n            }\n\n            const fnStr = fn.toString()\n            const argsStr = fnStr.split('(')[1].split(')')[0]\n            const bodyStartIndex = fnStr.indexOf('{')\n            const bodyEndIndex = fnStr.lastIndexOf('}')\n\n            let bodyStr = fnStr.slice(bodyStartIndex + 1, bodyEndIndex)\n            const setBodyStr = (newBodyStr) => {\n              bodyStr = newBodyStr\n              const newFn = new Function(argsStr, bodyStr)\n              args[0] = newFn\n            }\n\n            fns.forEach(fn => {\n              fn(bodyStr, setBodyStr)\n            })\n\n            return __d(...args)\n          }\n        },\n        set (value) {\n          __d = value\n          return true\n        },\n      })\n    <\/script>\n  ")}};var b={init:function(){e("\n    <script>\n      window.inssist.moduleInterceptor = {\n        getModule,\n        registerModule,\n        registerReduxAction,\n      }\n\n\n      let store\n      const modules = {}\n      const customReduxReducers = []\n      const dispatchListeners = []\n\n\n      function getModule (moduleName) {\n        return modules[moduleName]\n      }\n\n\n      function registerModule (moduleName, module) {\n        if (modules[moduleName]) { return }\n        modules[moduleName] = module\n      }\n\n\n      function registerReduxAction (actionType, reducer) {\n        customReduxReducers.push({ actionType, fn: reducer })\n      }\n\n\n      // add-dispatch-listener\n      registerModule('add-dispatch-listener', (fn) => {\n        dispatchListeners.push(fn)\n      })\n\n\n      // nav\n      const _createHref_ = Symbol('createHref')\n      Object.defineProperty(Object.prototype, 'createHref', {\n        get () {\n          return this[_createHref_]\n        },\n        set (value) {\n          registerModule('nav', this)\n          this[_createHref_] = value\n          return true\n        }\n      })\n\n\n      // http\n      const _AjaxError_ = Symbol('AjaxError')\n      Object.defineProperty(Object.prototype, 'AjaxError', {\n        get () {\n          return this[_AjaxError_]\n        },\n        set (value) {\n          registerModule('http', this)\n          this[_AjaxError_] = value\n          return true\n        }\n      })\n\n\n      // store\n      const _createStore_ = Symbol('createStore')\n      Object.defineProperty(Object.prototype, 'createStore', {\n        get () {\n          return this[_createStore_]\n        },\n        set (createStore) {\n          this[_createStore_] = (reducer, middleware) => {\n            store = createStore((state, action) => {\n              dispatchListeners.forEach(fn => fn(action))\n              const customReducer = customReduxReducers\n                .find(r => r.actionType === action.type)\n              if (customReducer) {\n                return customReducer.fn(state, action)\n              }\n              return reducer(state, action)\n            }, middleware)\n            registerModule('store', store)\n            return store\n          }\n          return true\n        }\n      })\n\n\n      // config\n      const _needsToConfirmCookies_ = Symbol('needsToConfirmCookies')\n      Object.defineProperty(Object.prototype, 'needsToConfirmCookies', {\n        get () {\n          return this[_needsToConfirmCookies_]\n        },\n        set (value) {\n          registerModule('config', this)\n          this[_needsToConfirmCookies_] = value\n          return true\n        }\n      })\n\n\n      // cookies-controller\n      const _getCookie_ = Symbol('getCookie')\n      Object.defineProperty(Object.prototype, 'getCookie', {\n        get () {\n          return this[_getCookie_]\n        },\n        set (getCookie) {\n          registerModule('cookies-controller', this)\n          this[_getCookie_] = (...args) => {\n            const result = getCookie.call(this, ...args)\n\n            // sometimes \"ds_user_id\" is not readable by iframe, idkw.\n            //   to fix this case we try to return \"viewerId\" value of the user state\n            if (args.length === 1 && args[0] === 'ds_user_id') {\n              let viewerId\n              if (store) {\n                const state = store.getState()\n                viewerId = state && state.users && state.users.viewerId\n              }\n\n              // fallback to any non-empty string to prevent\n              //   isUserLoggedIn function returning false when user is logged in\n              if (!viewerId) {\n                return 'ds_user_id'\n              }\n\n              return viewerId\n            }\n\n            return result\n          }\n          return true\n        }\n      })\n\n\n      // scroll-controller\n      const _saveScrollPosition_ = Symbol('saveScrollPosition')\n      Object.defineProperty(Object.prototype, 'saveScrollPosition', {\n        get () {\n          return this[_saveScrollPosition_]\n        },\n        set (value) {\n          registerModule('scroll-controller', this)\n          this[_saveScrollPosition_] = value\n          return true\n        }\n      })\n\n\n      // constants\n      const _appleAppStoreAppId_ = Symbol('appleAppStoreAppId')\n      Object.defineProperty(Object.prototype, 'appleAppStoreAppId', {\n        get () {\n          return this[_appleAppStoreAppId_]\n        },\n        set (value) {\n          registerModule('constants', this)\n          this[_appleAppStoreAppId_] = value\n          return true\n        },\n      })\n\n\n      // lang\n      const _strs_ = Symbol('strs')\n      Object.defineProperty(Object.prototype, 'strs', {\n        get () {\n          return this[_strs_]\n        },\n        set (value) {\n          registerModule('lang', this)\n          this[_strs_] = value\n          return true\n        },\n      })\n\n\n      // gatekeeper\n      const _getGatekeepers_ = Symbol('getGatekeepers')\n      Object.defineProperty(Object.prototype, 'getGatekeepers', {\n        get () {\n          return this[_getGatekeepers_]\n        },\n        set (value) {\n          registerModule('gatekeeper', this)\n          this[_getGatekeepers_] = value\n          return true\n        },\n      })\n\n\n      // api\n      const _ruploadVideo_ = Symbol('ruploadVideo')\n      Object.defineProperty(Object.prototype, 'ruploadVideo', {\n        get () {\n          return this[_ruploadVideo_]\n        },\n        set (value) {\n          registerModule('api', this)\n          this[_ruploadVideo_] = value\n          return true\n        },\n      })\n\n\n      // dm-conversation-creator\n      const _filteredCandidates_ = Symbol('filteredCandidates')\n      Object.defineProperty(Object.prototype, 'filteredCandidates', {\n        get () {\n          if ('forwardAction' in this) {\n            registerModule('dm-conversation-creator', this)\n          }\n          return this[_filteredCandidates_]\n        },\n        set (value) {\n          this[_filteredCandidates_] = value\n          return true\n        }\n      })\n\n\n      // dm-delta-parser\n      const _parseDeltaItem_ = Symbol('parseDeltaItem')\n      Object.defineProperty(Object.prototype, 'parseDeltaItem', {\n        get () {\n          return this[_parseDeltaItem_]\n        },\n        set (value) {\n          registerModule('dm-delta-parser', this)\n          this[_parseDeltaItem_] = value\n          return true\n        }\n      })\n\n\n      // dm-thread-actions\n      const _markSeen_ = Symbol('markSeen')\n      Object.defineProperty(Object.prototype, 'markSeen', {\n        get () {\n          return this[_markSeen_]\n        },\n        set (value) {\n          registerModule('dm-thread-actions', this)\n          this[_markSeen_] = value\n          return true\n        }\n      })\n\n\n      // dm-state-proxy\n      const _getThreadSeenByViewer_ = Symbol('getThreadSeenByViewer')\n      Object.defineProperty(Object.prototype, 'getThreadSeenByViewer', {\n        get () {\n          return this[_getThreadSeenByViewer_]\n        },\n        set (value) {\n          registerModule('dm-state-proxy', this)\n          this[_getThreadSeenByViewer_] = value\n          return true\n        }\n      })\n    <\/script>\n  ")}};const _='!function(){const e=window.inssist.url;let t=!1;function o(){if(t)throw new Error("Invalid Instagram response")}Object.defineProperties(window.navigator,{appCodeName:{value:"Mozilla"},appName:{value:"Netscape"},userAgent:{value:"Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.1 Mobile/15E148 Safari/604.1"},appVersion:{value:"5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.1 Mobile/15E148 Safari/604.1"},platform:{value:"iPhone"},product:{value:"Gecko"},vendor:{value:"Apple Computer, Inc."},vendorSub:{value:""},webdriver:{value:!1},productSub:{value:"20030107"}}),Object.defineProperty(screen.orientation,"type",{value:null}),window.addEventListener("DOMContentLoaded",()=>{document.body.requestFullscreen=(()=>{})}),navigator.serviceWorker.getRegistrations().then(e=>{e&&0!==e.length&&e.forEach(e=>e.unregister())}),function(){let e,t,i,n;const r=document.createElement.bind(document);document.createElement=((...e)=>{const t=r(...e);return"video"===e[0]&&t.setAttribute("type","video/mp4"),t}),Object.defineProperty(Object.prototype,"logIgLiteAction",{get:()=>(o(),function(e){const t=e&&e.event_name;if(t&&t.startsWith("invalid_media")){const e={invalid_media_duration_too_short:"Uploading video cancelled. Please ensure that the video is at least 3 seconds long.",invalid_media_duration_too_long:"Uploading video cancelled. Please ensure that the video is at max 60 seconds long.",invalid_media_aspect_ratio_not_supported:"Uploading video cancelled. Unsupported ratio."}[t]||"Uploading video cancelled. Server returned "+t+"error.";"invalid_media_duration_too_long"!==t&&alert(e),window.ig.onMediaProcessingError(t)}}),set:()=>!0}),Object.defineProperty(Object.prototype,"creationSelectMedia",{get:()=>(o(),o=>i=>{window.ig.onBeforePostCreation();const n=o.type.split("/")[0];"image"===n?i(e(o)):"video"===n&&i(t(o))}),set:()=>!0}),Object.defineProperty(Object.prototype,"storyCreationSelectMedia",{get:()=>(o(),e=>t=>{window.ig.onBeforeStoryCreation();const o=e.type.split("/")[0];"image"===o?t(i(e)):"video"===o&&t(n(e))}),set:()=>!0}),Object.defineProperty(Object.prototype,"creationSelectImage",{get:()=>(o(),e),set:t=>(e=t,!0)}),Object.defineProperty(Object.prototype,"creationSelectVideo",{get:()=>(o(),t),set:e=>(t=e,!0)}),Object.defineProperty(Object.prototype,"storyCreationSelectImage",{get:()=>(o(),i),set:e=>(i=e,!0)}),Object.defineProperty(Object.prototype,"storyCreationSelectVideo",{get:()=>(o(),n),set:e=>(n=e,!0)}),Object.defineProperty(Object.prototype,"isMP4Video",{get:()=>(o(),()=>!0),set:()=>!0})}(),Object.defineProperty(Object.prototype,"resolution",{get(){return o(),this.$resolution?this.$resolution:this.imageWidth&&this.imageHeight?Math.min(Math.max(this.imageWidth,this.imageHeight),4e3):void 0},set(e){return this.$resolution=e,!0}}),function(){const o=()=>{t=!0,parent.postMessage({name:"ig-patch-corrupted"},"*")};fetch(e+"manifest.json").then(e=>e.text()).then(e=>{e.includes("INSSIST")&&e.includes("*://*.inssist.com/*")&&e.includes("/inssist.html?popup")||o()}).catch(()=>{o()})}()}();';({init:function(){g.init(),e(`\n    <script>\n      window.inssist = {\n        url: '${chrome.runtime.getURL("/")}',\n        theme: {},\n        igStore: null,\n        gatekeeper: {},\n        modulePatcher: null,\n        moduleInterceptor: null,\n      }\n    <\/script>\n  `),document.documentElement.insertAdjacentHTML("afterbegin",'\n    <link\n      href="https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700|Nunito+Sans&display=fallback&subset=cyrillic,cyrillic-ext,latin-ext,vietnamese"\n      rel="stylesheet"/>\n  '),s.init(),function(e,n={}){const t=Math.random().toString().slice(2),r=document.createElement("script");r.onload=()=>r.remove(),r.src=chrome.runtime.getURL(`${e}?v=${t}`),document.documentElement.insertAdjacentElement("afterbegin",r);for(const e in n)r.setAttribute(e,n[e])}("/ig-injection/index.js");const t=n.isIframe("inssist-ig"),r=n.isIframe("inssist-dm"),i=n.isIframe("inssist-igtv");(t||r||i)&&(e("\n    <script>\n      window.devicePixelRatio = 3\n    <\/script>\n  "),e("\n    <script>\n      document.write = function () {}\n    <\/script>\n  "),e("\n    <script>\n      Object.defineProperty(window, 'FB', {\n        get: () => ({ __buffer: null }),\n        set: () => true,\n      })\n    <\/script>\n  "),e("\n    <script>\n      Object.defineProperty(Object.prototype, 'getFrCookie', {\n        get: () => {\n          return () => {\n            return {\n              then () {\n                return {\n                  catch () {},\n                }\n              },\n            }\n          }\n        },\n        set: () => true,\n      })\n    <\/script>\n  "),e("\n    <script>\n      Object.defineProperty(Object.prototype, 'isDashEligible', {\n        get () {\n          return () => false\n        },\n        set () {\n          return true\n        }\n      })\n    <\/script>\n  "),y.init(),b.init(),d.initForIg(),f.init(),e("\n    <script>\n      const modulePatcher = window.inssist.modulePatcher\n      modulePatcher.onModuleInit((bodyStr, setBodyStr) => {\n        if (!bodyStr.includes('window.top')) { return }\n        const newBodyStr = bodyStr.split('window.top').join('window')\n        setBodyStr(newBodyStr)\n      })\n    <\/script>\n  "));t&&(e(`\n    <script>\n      ${_}\n    <\/script>\n  `),e("\n    <script>\n      Object.defineProperty(Object.prototype, 'getOrientationData', {\n        get () {\n          return () => {\n            return {\n              degreesToRotate: 0,\n              mirrored: false,\n            }\n          }\n        },\n        set () {\n          return true\n        },\n      })\n    <\/script>\n  "),e(`\n    <script>\n      const modulePatcher = window.inssist.modulePatcher\n\n\n      ;(function main () {\n        modulePatcher.onModuleInit((bodyStr, setBodyStr) => {\n          if (!bodyStr.includes('isFeedAndOwnerFollowedByViewer:')) { return }\n          const newBodyStr = bodyStr\n            .replace('render=function(){', 'render=function(){' + "${"\n    <script>\n      const store = window.inssist.igStore;\n      const postId = this.props.post.id;\n      if (!store) {\n        let interval = setInterval(() => {\n          /* wait for window.ig */\n          const ig = window.ig;\n          if (!ig) { return }\n          clearInterval(interval);\n\n          ig.require('store').then(store => {\n            window.inssist.igStore = store;\n            this.forceUpdate();\n          })\n        }, 100);\n      }\n    <\/script>\n  ".replace("<script>","").replace("<\/script>","").split("\n").join(" ")}")\n            .replace('onKeyUp', (\n              '"data-post-id": typeof postId === "undefined" ? -1 : postId,' +\n              'onKeyUp'\n            ))\n          setBodyStr(newBodyStr)\n        })\n      })()\n    <\/script>\n  `),m.init(),h.init());r&&o.init()}}).init()}();