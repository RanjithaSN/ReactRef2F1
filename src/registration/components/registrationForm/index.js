import { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { WebApiContext } from 'ascendon-web-api';
import { Box, Button, Typography, Grid, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { postMessage } from '../../../utils/postMessage';
import RegistrationModel from '../../model';
import { setGlobalLoader } from '../../../app/actions';
import GlobalLoader from '../../../common/loader';
import LocaleKeys from '../../../locales/keys';
import { useTranslation, withTranslation } from 'react-i18next';
import compose from 'ramda/src/compose';
import {
  translateFault,
  generateUnhandledFault,
} from '../../../helpers/faults';
import CONSTANTS from '../../../constants/externalReferences';
import axios from 'axios';
import getLeadSourceTypeFromConfigParameter from './getLeadSourceTypeFromConfigParameter';
import loadExternalValidationRules from '../../../utils/loadExternalValidationRules';

const useStyles = makeStyles((theme) => ({
  submitButton: {
    display: 'block',
    marginLeft: 'auto',
    paddingLeft: '15px',
    paddingRight: '15px',
  },
  link: {
    marginLeft: '8px',
    '&:hover': {
      cursor: 'pointer',
      color: theme.palette.primary.main,
    },
  },
}));

function RegistrationForm(props) {
  const {
    profileType,
    showAlreadyHaveAccountMessage,
    leadSource,
    apiUrl,
    apiKey,
  } = props;

  const { t } = useTranslation();
  const history = useHistory();
  const [externalData, setExternalData] = useState(null);
  const [createSubscriberError, setCreateSubscriberError] = useState(null);
  const dispatch = useDispatch();
  const classes = useStyles();
  const WebApi = useContext(WebApiContext);
  const showGlobalLoader = useSelector(
    (state) => state.app.ui.showGlobalLoader || false,
  );
  const language = useSelector((state) => state.ascendon.settings.language);
  const model = new RegistrationModel(profileType);

  const doApiGeeCall = (postBody) => {
    const requestTimeout = 10000;
    const apigeeCall = axios.create({
      baseURL: `${apiUrl}`,
      timeout: requestTimeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const DISTRIBUTION_CHANNEL_ID_HEADER = 'CD-DistributionChannel';
    const DEVICE_TYPE_HEADER = 'CD-DeviceType';
    const SYSTEM_ID_HEADER = 'CD-SystemId';
    const LANGUAGE_HEADER = 'CD-Language';

    const options = {
      headers: {},
    };

    options.headers[DISTRIBUTION_CHANNEL_ID_HEADER] = ASCENDON_CONFIG.channelId;
    options.headers[DEVICE_TYPE_HEADER] = ASCENDON_CONFIG.deviceType;
    options.headers[SYSTEM_ID_HEADER] = ASCENDON_CONFIG.systemId;
    options.headers[LANGUAGE_HEADER] = ASCENDON_CONFIG.language;

    if (apiKey && apiKey.length > 0) {
      options.headers.apikey = apiKey;
    }

    return apigeeCall.post('/Subscriber/CreateSubscriber', postBody, options);
  };

  const form = useFormik({
    initialValues: model.getInitialValues(),
    validationSchema: model.getValidationSchema(language, externalData),
    enableReinitialize: true,
    validateOnBlur: false,
    validateOnChange: false,
    //validateOnMount: true,
    onSubmit: (values) => {
      const currentUrl = window.location.href;

      const leadSourceType = getLeadSourceTypeFromConfigParameter(
        currentUrl,
        externalData,
        leadSource,
      );

      const {
        title,
        firstName,
        lastName,
        dateOfBirth,
        country,
        emailAddress,
        password,
        recieveLatestNews,
      } = values;
      const subscriber = {};
      const credentials = {};
      subscriber.AdditionalProperties = [];

      if (title && title !== 'Select') {
        subscriber.Title = title;
      }
      if (firstName) {
        subscriber.FirstName = firstName;
      }
      if (lastName) {
        subscriber.LastName = lastName;
      }
      if (dateOfBirth) {
        const birthDateDetails = dateOfBirth.split('/');
        const day =
          language === 'en-GB' || language === 'en-US'
            ? birthDateDetails[0]
            : birthDateDetails[1];
        const month =
          language === 'en-GB' || language === 'en-US'
            ? birthDateDetails[1]
            : birthDateDetails[0];
        const year = birthDateDetails[2];
        const birthDateTimestamp = new Date(
          `${day}/${month}/${year}`,
        ).toISOString();
        subscriber.BirthDate = birthDateTimestamp;
      }
      if (country && country !== 'Select') {
        subscriber.HomeCountry = country;
        subscriber.AdditionalProperties.push({
          ExternalReference: CONSTANTS.MARKETING_COUNTRY,
          Values: [country],
        });
      }
      if (emailAddress) {
        subscriber.Email = emailAddress;
        credentials.Login = emailAddress;
      }
      if (password) {
        credentials.Password = password;
      }

      if (profileType !== 'DATA_CAPTURE') {
        subscriber.AdditionalProperties.push({
          ExternalReference: CONSTANTS.CONSENT_TC,
          Values: ['1'],
        });
      }
      subscriber.AdditionalProperties.push({
        ExternalReference: CONSTANTS.CONSENT_CONTACT,
        Values: [recieveLatestNews ? 1 : 0],
      });
      subscriber.LeadSourceType = leadSourceType;

      //handleSubmit
      if (form.isValid) {
        console.log({ values });

        const postBody = {
          AutoLogin: true,
          Credentials: {
            ...credentials,
          },
          Subscriber: {
            ...subscriber,
          },
        };
        doApiGeeCall(postBody)
          .then((response) => {
            const result = response.data;
            let errorMessage = '';
            if (result.Fault) {
              const code = result.Fault.Code;
              if (!code) {
                const unknownFault = generateUnhandledFault(result);
                errorMessage = translateFault(unknownFault).translatedMessage;
              } else if (code === 113) {
                history.push('signIn');
              } else {
                errorMessage = translateFault(result).translatedMessage;
                setCreateSubscriberError(errorMessage);
              }
              console.log(`ERROR: `, errorMessage);
              postMessage('subscriber.error', { error: errorMessage });
            } else {
              postMessage('subscriber.created', result);
            }
          })
          .catch((error) => {
            console.log(`ERROR: `, error);
            postMessage('subscriber.error', error);
          });
      }
    },
  });
  const registrationForm = model.createForm(form, externalData, language);

  useEffect(() => {
    let isMounted = true;
    const countries = 59;
    const titles = 61;
    const subscriberRequirements = 166;
    const subscriberLeadSourceCode = 167;
    dispatch(setGlobalLoader(true));

    WebApi.requestAll([
      {
        type: 'code',
        forceRefresh: true,
        payload: [countries],
      },
      {
        type: 'code',
        forceRefresh: true,
        payload: [titles],
      },
      {
        type: 'code',
        forceRefresh: true,
        payload: [subscriberRequirements],
      },
      {
        type: 'code',
        forceRefresh: true,
        payload: [subscriberLeadSourceCode],
      },
    ])
      .then(() =>
        loadExternalValidationRules(ASCENDON_CONFIG.externalValidationRulesUrl),
      )
      .then((externalValidationRules) => {
        if (isMounted) {
          setExternalData({
            countryRules: WebApi.getMetadataItemByKey('code', countries),
            titleRules: WebApi.getMetadataItemByKey('code', titles),
            genericRules: WebApi.getMetadataItemByKey(
              'code',
              subscriberRequirements,
            ),
            leadSources: WebApi.getMetadataItemByKey(
              'code',
              subscriberLeadSourceCode,
            ),
            externalValidationRules: externalValidationRules,
          });

          dispatch(setGlobalLoader(false));
        }
      })
      .catch((error) => {
        if (isMounted) {
          console.info(error);
          dispatch(setGlobalLoader(false));
        }
      });
    return () => {
      isMounted = false;
    };
  }, [profileType]);

  if (showGlobalLoader) {
    return <GlobalLoader />;
  }

  if (externalData) {
    return (
      <Box mb={10} mt={3}>
        {createSubscriberError ? (
          <Box mb={3}>
            <Typography variant="body2" color="error">
              {createSubscriberError}
            </Typography>
          </Box>
        ) : null}
        <Box mb={6}>
          <Typography variant="h2">
            {t(LocaleKeys.registration.signUpf1)}
          </Typography>
        </Box>
        <form>
          {registrationForm}
          <Box component={Grid} mt={9} container>
            <Box component={Grid} item xs={6}>
              {showAlreadyHaveAccountMessage ? (
                <>
                  {t(LocaleKeys.registration.alreadyHaveAccount)}
                  <Link
                    color="textPrimary"
                    className={classes.link}
                    underline="none"
                    onClick={() => {
                      postMessage('module.loginButton', {});
                    }}
                  >
                    {t(LocaleKeys.signIn.signIn)}
                  </Link>
                </>
              ) : null}
            </Box>
            <Box component={Grid} item xs={6}>
              <Button
                className={classes.submitButton}
                variant="contained"
                color="primary"
                onClick={() => {
                  form.handleSubmit();
                }}
              >
                {t(LocaleKeys.registration.register)}
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    );
  }

  return (
    <Box mb={10} mt={3}>
      <Box mb={6}>
        <Typography variant="h2">
          {t(LocaleKeys.registration.serviceError)}
        </Typography>
      </Box>
    </Box>
  );
}

export default compose(withTranslation())(RegistrationForm);
