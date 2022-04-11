window.ascendon = window.ascendon ? window.ascendon : {};

window.ascendon.controller = ((asc) => {
  const configSettings = {
    container: window.CSG_CONFIG ? window.CSG_CONFIG.container : 'ascendon',
    iframeUrl: window.CSG_CONFIG
      ? window.CSG_CONFIG.iframeUrl
      : 'http://localhost:9000',
  };
  var iframeId = 'ascendon-iframe';
  var initialLoadPath = null;
  var initialLoadCb = null;

  var getUrlParams = () => {
    if (URLSearchParams) {
      var urlSearchParams = new URLSearchParams(window.location.search);
      var params = Object.fromEntries(urlSearchParams.entries());
      return params;
    } else {
      // IE11 polyfill
      var assoc = {};
      var decode = function (s) {
        return decodeURIComponent(s.replace(/\+/g, ' '));
      };
      var queryString = window.location.search.substring(1);
      var keyValues = queryString.split('&');

      for (var i in keyValues) {
        var key = keyValues[i].split('=');
        if (key.length > 1) {
          assoc[decode(key[0])] = decode(key[1]);
        }
      }

      return assoc;
    }
  };

  var initialize = (callback) => {
    var container = document.getElementById(configSettings.container);
    var iframe = document.createElement('iframe');
    var urlParams = getUrlParams();
    var profileType = urlParams.profileType;
    iframe.id = iframeId;
    iframe.src = configSettings.iframeUrl;
    iframe.style.overflow = 'hidden';
    iframe.style.border = 'none';
    iframe.style.width = '100%';
    container.append(iframe);
    initialLoadPath = {
      page: '/',
      params: { profileType },
    };
    initialLoadCb = callback;

    if (!window.iFrameResize) {
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.src =
        'https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.1/iframeResizer.min.js';
      window.document.body.appendChild(s);
    }
  };

  var dispatchCustomEvent = (route, params) => {
    var container = document.getElementById(configSettings.container);

    const customEvent = new CustomEvent('ascendon.event', {
      detail: {
        type: route,
        params: params,
      },
    });
    container.dispatchEvent(customEvent);
  };

  var subscribeToChildEvents = (e) => {
    window.addEventListener(
      'message',
      (e) => {
        if (
          configSettings.iframeUrl.indexOf(
            e.origin.replace(/http:|https:/gi, ''),
          ) >= 0 &&
          typeof e.data !== undefined
        ) {
          if (typeof e.data === 'string') {
            var message =
              e.data.indexOf('[iFrameSizer]') < 0 ? JSON.parse(e.data) : {};
            switch (message.type) {
              case 'event':
                if (message.data.route === 'app.loaded') {
                  // Initial application event loading
                  console.info('App iframe initial load completed');
                  window.iFrameResize({ log: false, checkOrigin: false });

                  if (initialLoadCb) {
                    initialLoadCb();
                  }
                } else if (message.data.route === 'app.sessionCreated') {
                  routeFromParent('/', message.data.params);
                } else {
                  /***Custom Event Dispatcher***/
                  var route = message.data.route;
                  var params = {
                    eventName: route,
                    ...message.data.params,
                  };

                  dispatchCustomEvent(route, params);
                }
                break;
              default:
            }
          }
        }
      },
      false,
    );
  };
  var routeFromParent = (page, params, callback) => {
    params = params || {};
    var iframe = document.getElementById(iframeId);
    iframe.classList = '';
    iframe.classList.add(params.theme);
    if (callback) {
      callback();
    }
    return document
      .getElementById(iframeId)
      .contentWindow.postMessage(JSON.stringify({ page, params }), '*');
  };

  const listenForEvents = (callback) => {
    document
      .getElementById(configSettings.container)
      .addEventListener('ascendon.event', function (event) {
        var params = event.detail ? event.detail.params : {};
        callback(params, event);
      });
  };

  // Ascendon Controller Start
  subscribeToChildEvents();
  initialize(() => {
    dispatchCustomEvent('module.ready', {
      eventName: 'module.ready',
    });
  });

  return {
    route: (page, params, callback) => {
      var container = document.getElementById(configSettings.container);
      container.setAttribute('asc-route', page);
      routeFromParent(page, params, callback);
    },
    language: (page, locale) =>
      document
        .getElementsByTagName('iframeId')[0]
        .contentWindow.postMessage(JSON.stringify({ page, locale }), '*'),
    events: (callback) => {
      listenForEvents(callback);
    },
  };
})(window.ascendon);
