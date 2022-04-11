import React from 'react';
import { Provider } from 'react-redux';
import { WebApi, WebApiProvider } from 'ascendon-web-api';
import './i18n';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import './styles/index.scss';
import App from './app';
import buildStore from './configureStore';
import history from './utils/history';

const initialState = {};
const store = buildStore(initialState, history);
const webapi = new WebApi(store, {
  metadataUrl: ASCENDON_CONFIG.metadataUrl,
  apiUrl: ASCENDON_CONFIG.apiUrl,
  systemId: ASCENDON_CONFIG.systemId,
  channelId: ASCENDON_CONFIG.channelId,
  deviceType: ASCENDON_CONFIG.deviceType,
  country: ASCENDON_CONFIG.country,
  language: ASCENDON_CONFIG.language,
});

render(
  <Provider store={store}>
    <WebApiProvider webapi={webapi}>
      <BrowserRouter basename={ASCENDON_CONFIG.basename}>
        <ConnectedRouter history={history}>
          <App />
          {ASCENDON_CONFIG.environment === 'sbx' ||
          ASCENDON_CONFIG.environment === 'dev' ? (
            <div style={{ position: 'sticky', bottom: '0px', left: '0px' }}>
              {' '}
              {ASCENDON_BUILD_BRANCH} - {ASCENDON_BUILD_HASH} -{' '}
              {ASCENDON_BUILD_TIMESTAMP}
            </div>
          ) : null}
        </ConnectedRouter>
      </BrowserRouter>
    </WebApiProvider>
  </Provider>,
  document.getElementById('root'),
);
