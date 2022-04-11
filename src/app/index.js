import React, { useEffect, useState, useContext } from 'react';
import { Switch, useHistory } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Registration from '../registration';
import SignIn from '../signIn';
import OrderHistory from '../app/containers/orderHistory/OrderHistory.jsx';
import { MainRoute } from './components/mainRoute';
import { PrivateRoute } from './components/privateRoute';
import { defaultTheme } from '../theme';
import { postMessage } from '../utils/postMessage';
import { WebApiContext } from 'ascendon-web-api';
import validateMessage from './validate-message';
import AccountInfo from '../accountInfo';
import SubscriptionInfo from '../subscriptionInfo';


function App(props) {
  const history = useHistory();
  const { i18n } = useTranslation();
  const [profileType, setProfileType] = useState(null);
  const [showAccountMessage, setShowAccountMessage] = useState(null);
  const [showBackButton, setShowBackButton] = useState(null);
  const [leadSource, setLeadSource] = useState(null);
  const [apiUrl, setApiUrl] = useState(null);
  const [apiKey, setApiKey] = useState(null);

  const WebApi = useContext(WebApiContext);

  useEffect(() => {
    window.addEventListener(
      'message',
      (e) => {
        const url = new URL(e.origin);
        const acceptedOrigin =
          ASCENDON_CONFIG.acceptedOrigin.findIndex((candidate) =>
            url.hostname.endsWith(candidate),
          ) > -1;

        if (!acceptedOrigin) return;
        if (e.data && typeof e.data === 'string') {
          const ignoreMessage =
            e.data.indexOf('[iFrameSizer]') > -1 ||
            e.data.indexOf('webpackHotUpdate') > -1;
          const message = !ignoreMessage ? JSON.parse(e.data) : null;
          if (message) {
            history.location.pathname = '/';
            const messageParameters = validateMessage(message);
            if (messageParameters.isValid) {
              i18n.changeLanguage(messageParameters.language, () => {
                setProfileType(messageParameters.profileType);
                setLeadSource(messageParameters.leadSource);
                setApiUrl(messageParameters.apiUrl);
                setApiKey(messageParameters.apiKey);
                setShowBackButton(messageParameters.showBackButton);
                setShowAccountMessage(
                  messageParameters.showAlreadyHaveAccountMessage,
                );
                WebApi.updateSettings({
                  language: messageParameters.language,
                });
                history.push(message.page);
              });
            } else {
              messageParameters.errors.forEach((error) => {
                postMessage('module.error', {
                  error: error,
                });
              });
            }
          }
        }
      },
      false,
    );

    if (history.location.pathname) {
      window.parent.postMessage(
        JSON.stringify({ page: history.location.pathname }),
        '*',
      );
    }
  }, [history]);

  useEffect(() => {
    postMessage('app.loaded', null);
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Switch>
        <MainRoute
          {...props}
          exact
          component={Registration}
          path={['/Registration', '/']}
          profileType={profileType}
          showAlreadyHaveAccountMessage={showAccountMessage}
          showBackButton={showBackButton}
          leadSource={leadSource}
          apiUrl={apiUrl}
          apiKey={apiKey}
        />
        <PrivateRoute
          {...props}
          exact
          component={AccountInfo}
          path={['/my-account']}
          profileType={profileType}
          showBackButton={false}
        />
        <PrivateRoute
          {...props}
          exact
          component={SubscriptionInfo}
          path={['/my-subscription']}
          profileType={profileType}
          showBackButton={false}
        />
        <MainRoute
          {...props}
          exact
          component={SignIn}
          path={['/signIn']}
          profileType={profileType}
        />
        <PrivateRoute
          {...props}
          exact
          component={OrderHistory}
          path={['/OrderHistory']}
          profileType={profileType}
        />
      </Switch>
    </ThemeProvider>
  );
}

export default App;
