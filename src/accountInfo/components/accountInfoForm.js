import { useContext, useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation, withTranslation } from 'react-i18next';
import compose from 'ramda/src/compose';
import { Box, Collapse, Paper, Typography, Fade } from '@material-ui/core';
import LocaleKeys from '../../locales/keys';
import { useRetrieveSubscriber } from '../../common/hooks/useRetrieveSubscriber';
import { useUpdateSubscriber } from '../../common/hooks/useUpdateSubscriber';
import { useUpdateCredentials } from '../../common/hooks/useUpdateCredentials';
import moment from 'moment';
import NameForm from './formControls/name';
import { useDispatch, useSelector } from 'react-redux';
import { WebApiContext } from 'ascendon-web-api';
import { setGlobalLoader } from '../../app/actions';
import loadExternalValidationRules from '../../utils/loadExternalValidationRules';
import GlobalLoader from '../../common/loader';
import BirthdayForm from './formControls/birthday';
import CountryForm from './formControls/country';
import EmailAddressForm from './formControls/emailAddress';
import PasswordForm from './formControls/password';
import RecieveLatestNewsForm from './formControls/receivedLatestNews';
import TransitionHeader from './header/transitionHeader';
import FadeHeader from './header/fadeHeader';
import { find, isEmpty, propEq } from 'ramda';
import CONSTANTS from '../../constants/externalReferences';
import { FORM_NAMES } from '../../constants/forms';

const useStyles = makeStyles((theme) => ({
  root: {
    '&.MuiCollapse-hidden': {
      display: 'none',
    },
  },
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
  headerText: {
    textTransform: 'uppercase',
    marginBottom: '4%',
    fontSize: '2rem',
  },
  panelNode: {
    justifyContent: 'space-between',
    display: 'flex',
    width: '100%',
  },
  buttonNode: {
    borderBottom: 'solid 2px #e00',
    borderRadius: '0',
    padding: '0',
    textTransform: 'capitalize',
  },
  baseButtoNode: {
    transform: 'none',
    height: '100%',
  },
  boxContainer: {
    marginBottom: '0px',
  },
  boxInnerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  paperContainer: {
    borderTop: 'none',
    borderRight: 'none',
    borderLeft: 'none',
    padding: '20px 0px',
  },
  heading: {
    fontFamily: 'Formula1-Bold',
  },
}));

function AccountInfoForm(props) {
  const WebApi = useContext(WebApiContext);
  const { profileType } = props;
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const defaultFormat = 'MM/DD/YYYY';
  const defaultTitle = 'Mr';
  const externalReferenceProp = 'ExternalReference';
  const animationInMilliSeconds = 350;
  const timeout = {
    appear: animationInMilliSeconds,
    enter: animationInMilliSeconds,
    exit: animationInMilliSeconds,
  };
  const heightAnimation = {
    height: 0,
    transition: `height ${animationInMilliSeconds}ms`,
  };

  /**useRef */

  const elementNameRef = useRef(null);
  const elementBirthdayRef = useRef(null);
  const elementCountryRef = useRef(null);
  const elementBoxContainerRef = useRef(null);

  /** useSelector */
  const showGlobalLoader = useSelector(
    (state) => state.app.ui.showGlobalLoader || false,
  );
  const language = useSelector((state) => state.ascendon.settings.language);

  /** useSate */
  /** useState to store the form container height based on the ref provided */
  const [nameHeight, setNameHeight] = useState(0);
  const [birthdayHeight, setBirthdayHeight] = useState(0);
  const [countryHeight, setCountryHeight] = useState(0);
  const [boxContainerHeight, setBoxContainerHeight] = useState(0);

  const [externalData, setExternalData] = useState(null);
  const [toggleBox, setToggleBox] = useState({
    name: false,
    birthday: false,
    countryOfResidence: false,
    emailAddress: false,
    password: false,
  });
  const [retrieveSubscriberDetails, setRetrieveSubscriberDetails] = useState(
    {},
  );
  const [headingNameValue, setHeadingNameValue] = useState('');
  const [countryLabel, setCountryLabel] = useState('');
  const [nameForm, setNameForm] = useState({
    FirstName: '',
    LastName: '',
    Title: '',
  });
  const [dateOfBirth, setDateOfBirth] = useState({
    BirthDate: '',
  });
  const [countryOfResidence, setCountryOfResidence] = useState({
    country: '',
  });
  const [emailAddress] = useState({
    newEmailAddress: '',
    confirmNewEmailAddress: '',
    currentPassword: '',
  });
  const [password] = useState({
    currentPassword: '',
    newPassword: '',
  });
  const [receivedLatestNews, setReceivedLatestNews] = useState({
    receivedLatestNews: '',
  });
  const [passwordCredentialError, setPasswordCredentialError] = useState('');
  const [emailCredentialError, setEmailCredentialError] = useState('');
  const [currentClickName, setCurrentClickName] = useState({});
  const [emailAddressValue, setEmailAddressValue] = useState('');

  /** Web Api Hooks */
  const [
    updateCredentialsResponse,
    updateCredentialsFault,
    requestUpdateCredentials,
  ] = useUpdateCredentials();
  const [
    updateSubscriberResponse,
    updateSubscriberFault,
    requestUpdateSubscriber,
  ] = useUpdateSubscriber();
  const [
    retrieveSubscriberResponse,
    retrieveSubscriberFault,
    requestRetrieveSubscriber,
  ] = useRetrieveSubscriber();

  /** Helper functions */

  const getAdditionalProperties = (
    additionalProp = [],
    externalReference,
    key = externalReferenceProp,
  ) => find(propEq(key, externalReference))(additionalProp);

  const setToogleBoxContainer = (eventType, isActive) => {
    const getCheckedValue = { ...toggleBox, [eventType]: isActive };
    setToggleBox(getCheckedValue);
  };

  const getBirthDatePayloadUTC = (dateOfBirthString) => {
    const birthDateDetails = dateOfBirthString.split('/');
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
      `${day}/${month}/${year}UTC`,
    ).toISOString();
    return birthDateTimestamp;
  };

  const isUdpdateCred = (name) =>
    name === FORM_NAMES.EMAILADDRESS || name === FORM_NAMES.PASSWORD;

  const getEmailPasswordPayload = (name, formikValues = {}) => {
    const isEmailAddress = name === FORM_NAMES.EMAILADDRESS;
    return {
      CurrentPassword: formikValues.currentPassword,
      NewLogin: isEmailAddress ? formikValues.confirmNewEmailAddress : null,
      NewPassword: isEmailAddress ? null : formikValues.newPassword,
    };
  };

  const getUpdateSubscriberPayload = (
    name,
    subscriberDetails,
    formikValues = {},
    isUdpdateCred = false,
  ) => {
    if (isUdpdateCred) {
      // update Credential Api Payload goes here...
      return getEmailPasswordPayload(name, formikValues);
    }
    if (name === FORM_NAMES.BIRTHDAY) {
      return {
        Subscriber: {
          ...subscriberDetails,
          BirthDate: getBirthDatePayloadUTC(formikValues.BirthDate),
        },
      };
    }
    if (name === FORM_NAMES.RECEIVEDLATESTNEWS) {
      const getSubscriberDetailsProps = [
        {
          ExternalReference: CONSTANTS.CONSENT_CONTACT,
          Values: [formikValues.receivedLatestNews ? 1 : 0],
        },
      ];
      return {
        Subscriber: {
          ...subscriberDetails,
          AdditionalProperties: getSubscriberDetailsProps,
        },
      };
    }
    if (name === FORM_NAMES.COUNTRYOFRESIDENCE) {
      const getSubscriberDetailsProps = [
        {
          ExternalReference: CONSTANTS.MARKETING_COUNTRY,
          Values: [formikValues.country],
        },
      ];
      return {
        Subscriber: {
          ...subscriberDetails,
          AdditionalProperties: getSubscriberDetailsProps,
        },
      };
    }
    return { Subscriber: { ...subscriberDetails, ...formikValues } };
  };

  const credentialsErrorNode = (message, currentSaveName) => {
    if (currentSaveName === FORM_NAMES.EMAILADDRESS) {
      setEmailCredentialError(message);
    }
    if (currentSaveName === FORM_NAMES.PASSWORD) {
      setPasswordCredentialError(message);
    }
  };

  const getEmailAddressPayloadForUpdateSubscriber = (
    name,
    emailValue,
    subscriberDetails,
  ) => ({
    payload: {
      Subscriber: {
        ...subscriberDetails,
        Email: emailValue,
        Login: emailValue,
      },
    },
    isEmailAddressSave: name === FORM_NAMES.EMAILADDRESS,
  });

  const setEmailAddress = (value) => {
    if (value) {
      setEmailAddressValue(value);
    }
  };

  const setElementHeight = (elementRef) =>
    elementRef?.current?.clientHeight || 0;

  /** useEffects */

  /**Element Refs For Animation Toggle */

  useEffect(() => {
    setNameHeight(setElementHeight(elementNameRef));
    setBirthdayHeight(setElementHeight(elementBirthdayRef));
    setCountryHeight(setElementHeight(elementCountryRef));
    setBoxContainerHeight(setElementHeight(elementBoxContainerRef));
  }, []);

  /** Retrieve Subscriber */
  useEffect(() => {
    dispatch(setGlobalLoader(true));
    requestRetrieveSubscriber(); // async
  }, []);

  useEffect(() => {
    if (retrieveSubscriberResponse) {
      setRetrieveSubscriberDetails(retrieveSubscriberResponse.Subscriber);
      dispatch(setGlobalLoader(false));
    }
  }, [retrieveSubscriberResponse]);

  useEffect(() => {
    console.info(retrieveSubscriberFault);
  }, [retrieveSubscriberFault]);

  /** Update Subscriber */

  useEffect(() => {
    if (updateSubscriberResponse?.Subscriber) {
      const { name } = currentClickName;
      setToogleBoxContainer(name, false);
      // requestRetrieveSubscriber(); // since the response of the updateSubscriberResponse is equal to the retrieveSubscriberResponse, set up the values to the RetrieveSubscriberDetails;
      setRetrieveSubscriberDetails(updateSubscriberResponse.Subscriber);
    }
  }, [updateSubscriberResponse]);

  useEffect(() => {
    console.info(updateSubscriberFault);
  }, [updateSubscriberFault]);

  /** Update Credentials */

  useEffect(() => {
    if (updateCredentialsResponse) {
      //Call the update subscriber Api to update the email field in the subscriber
      const { name, formik } = currentClickName;
      const requestUpdateSubscriberPayload =
        getEmailAddressPayloadForUpdateSubscriber(
          name,
          emailAddressValue,
          retrieveSubscriberDetails,
        );
      if (requestUpdateSubscriberPayload.isEmailAddressSave) {
        requestUpdateSubscriber(requestUpdateSubscriberPayload.payload); // async
      }
      setToogleBoxContainer(name, false);
      formik.resetForm();
      credentialsErrorNode('', name);
    }
  }, [updateCredentialsResponse]);

  /** update Credential fault message set the api fault error in the UI*/
  useEffect(() => {
    if (updateCredentialsFault) {
      const { name } = currentClickName;
      credentialsErrorNode(updateCredentialsFault, name);
    }
  }, [updateCredentialsFault]);

  /** Set Form Values based on the  RetrieveSubscriber Response*/
  useEffect(() => {
    if (isEmpty(retrieveSubscriberDetails)) {
      return;
    }
    const getCountryNode = getAdditionalProperties(
      retrieveSubscriberDetails.AdditionalProperties,
      CONSTANTS.MARKETING_COUNTRY,
    )?.Values[0];

    const getReceivedLatestNews = getAdditionalProperties(
      retrieveSubscriberDetails.AdditionalProperties,
      CONSTANTS.CONSENT_CONTACT,
    )?.Values[0];

    setNameForm({
      Title: retrieveSubscriberDetails.Title || defaultTitle,
      FirstName: retrieveSubscriberDetails.FirstName,
      LastName: retrieveSubscriberDetails.LastName,
    });

    setDateOfBirth({
      BirthDate: moment(retrieveSubscriberDetails.BirthDate).format(
        defaultFormat,
      ),
    });

    setCountryOfResidence({
      country: getCountryNode,
    });

    setReceivedLatestNews({
      receivedLatestNews: getReceivedLatestNews === '1',
    });

    setHeadingNameValue(
      `${retrieveSubscriberDetails.Title || `${defaultTitle}.`} ${
        retrieveSubscriberDetails.FirstName
      } ${retrieveSubscriberDetails.LastName}`,
    );
  }, [retrieveSubscriberDetails]);

  /** Get External Data Like Country Codes, Title, etc..*/

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
      setExternalData(null);
    };
  }, [profileType]);
  /** Set the Country label based on the external data country value */
  useEffect(() => {
    const getCountryNode = getAdditionalProperties(
      retrieveSubscriberDetails.AdditionalProperties,
      CONSTANTS.MARKETING_COUNTRY,
    )?.Values[0];
    if (externalData?.countryRules?.data?.Codes) {
      const getCountryName = externalData.countryRules.data.Codes.find(
        (item) => item.Value === getCountryNode,
      );
      setCountryLabel(getCountryName?.Name || '');
    }
  }, [externalData, retrieveSubscriberDetails]);

  /** Event Handlers */

  const handleSaveClick = (eventType) => {
    const { name, formik } = eventType;
    if (Object.keys(retrieveSubscriberDetails).length && formik.isValid) {
      const isUdpdateCredNode = isUdpdateCred(name);
      const getUpdateSubscriberPayloadNode = getUpdateSubscriberPayload(
        name,
        retrieveSubscriberDetails,
        formik.values,
        isUdpdateCredNode,
      );
      if (isUdpdateCredNode) {
        setEmailAddress(getUpdateSubscriberPayloadNode.NewLogin);
        requestUpdateCredentials(getUpdateSubscriberPayloadNode);
      } else {
        requestUpdateSubscriber(getUpdateSubscriberPayloadNode);
      }
      setCurrentClickName({ name, formik });
    }
  };

  const handleClick = (eventType) => {
    setToogleBoxContainer(eventType, true);
  };

  const handleCancelClick = (eventType) => {
    const { name, formik } = eventType;
    formik.resetForm(); // need to call on save for email and password
    setToogleBoxContainer(name, false);
    credentialsErrorNode('', name);
  };

  if (showGlobalLoader) {
    return <GlobalLoader />;
  }

  return (
    <Box mb={10} mt={3} className={classes.root}>
      <Box mb={6} style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
        <Typography variant="h2" className={classes.headerText}>
          {t(LocaleKeys.accountInfo.personalInformationTitle)}
        </Typography>
      </Box>
      <Box>
        <Box mb={9} className={classes.boxContainer}>
          <Paper
            elevation={4}
            variant="outlined"
            square
            className={classes.paperContainer}
            ref={elementBoxContainerRef}
          >
            <TransitionHeader
              headingLabel={t(LocaleKeys.accountInfo.name)}
              buttonLabel={t(LocaleKeys.accountInfo.edit)}
              headingValue={headingNameValue}
              classes={classes}
              fadeIn={toggleBox.name}
              name={FORM_NAMES.NAME}
              clickHandler={handleClick}
              height={boxContainerHeight}
              heightAnimation={heightAnimation}
            />

            <div
              className={classes.container}
              style={
                !toggleBox.name
                  ? { ...heightAnimation }
                  : { ...heightAnimation, height: nameHeight }
              }
            >
              <Fade in={toggleBox.name} ref={elementNameRef} timeout={timeout}>
                <Paper elevation={0}>
                  <div className={classes.column} />
                  <div>
                    <NameForm
                      handleCancel={handleCancelClick}
                      handleSave={handleSaveClick}
                      codeTableData={externalData}
                      language={language}
                      formData={nameForm}
                      formName={FORM_NAMES.NAME}
                    ></NameForm>
                  </div>
                </Paper>
              </Fade>
            </div>
          </Paper>
        </Box>
        <Box mb={9} className={classes.boxContainer}>
          <Paper
            elevation={4}
            variant="outlined"
            className={classes.paperContainer}
            square
          >
            <TransitionHeader
              headingLabel={t(LocaleKeys.accountInfo.dateOfBirth)}
              buttonLabel={t(LocaleKeys.accountInfo.edit)}
              headingValue={dateOfBirth.BirthDate}
              classes={classes}
              fadeIn={toggleBox.birthday}
              name={FORM_NAMES.BIRTHDAY}
              clickHandler={handleClick}
              height={boxContainerHeight}
              heightAnimation={heightAnimation}
            />
            <div
              className={classes.container}
              style={
                !toggleBox.birthday
                  ? { ...heightAnimation }
                  : { ...heightAnimation, height: birthdayHeight }
              }
            >
              <Fade
                in={toggleBox.birthday}
                ref={elementBirthdayRef}
                timeout={timeout}
              >
                <Paper elevation={0}>
                  <div className={classes.column} />
                  <div>
                    <BirthdayForm
                      handleCancel={handleCancelClick}
                      handleSave={handleSaveClick}
                      codeTableData={externalData}
                      language={language}
                      formData={dateOfBirth}
                      formName={FORM_NAMES.BIRTHDAY}
                    />
                  </div>
                </Paper>
              </Fade>
            </div>
          </Paper>
        </Box>
        <Box mb={9} className={classes.boxContainer}>
          <Paper
            elevation={4}
            variant="outlined"
            className={classes.paperContainer}
            square
          >
            <TransitionHeader
              headingLabel={t(LocaleKeys.accountInfo.countryOfResidence)}
              buttonLabel={t(LocaleKeys.accountInfo.edit)}
              headingValue={countryLabel}
              classes={classes}
              fadeIn={toggleBox.countryOfResidence}
              name={FORM_NAMES.COUNTRYOFRESIDENCE}
              clickHandler={handleClick}
              height={boxContainerHeight}
              heightAnimation={heightAnimation}
            />
            <div
              className={classes.container}
              style={
                !toggleBox.countryOfResidence
                  ? { ...heightAnimation }
                  : { ...heightAnimation, height: countryHeight }
              }
            >
              <Fade
                in={toggleBox.countryOfResidence}
                timeout={timeout}
                ref={elementCountryRef}
              >
                <Paper elevation={0}>
                  <div className={classes.column} />
                  <div>
                    <CountryForm
                      handleCancel={handleCancelClick}
                      handleSave={handleSaveClick}
                      codeTableData={externalData}
                      language={language}
                      formData={countryOfResidence}
                      formName={FORM_NAMES.COUNTRYOFRESIDENCE}
                    />
                  </div>
                </Paper>
              </Fade>
            </div>
          </Paper>
        </Box>
        <Box mb={9} className={classes.boxContainer}>
          <Paper
            elevation={4}
            variant="outlined"
            className={classes.paperContainer}
            square
          >
            <FadeHeader
              headingLabel={t(LocaleKeys.accountInfo.emailAddress)}
              buttonLabel={t(LocaleKeys.accountInfo.edit)}
              headingValue={retrieveSubscriberDetails.Email}
              classes={classes}
              fadeIn={toggleBox.emailAddress}
              name={FORM_NAMES.EMAILADDRESS}
              clickHandler={handleClick}
            />
            <div className={classes.container}>
              <Collapse in={toggleBox.emailAddress} timeout={timeout}>
                <Paper elevation={0}>
                  <div className={classes.column} />
                  <div>
                    <EmailAddressForm
                      handleCancel={handleCancelClick}
                      handleSave={handleSaveClick}
                      codeTableData={externalData}
                      language={language}
                      formData={emailAddress}
                      formName={FORM_NAMES.EMAILADDRESS}
                      credentialErrorMessage={emailCredentialError}
                    />
                  </div>
                </Paper>
              </Collapse>
            </div>
          </Paper>
        </Box>
        <Box mb={9} className={classes.boxContainer}>
          <Paper
            elevation={4}
            variant="outlined"
            className={classes.paperContainer}
            square
          >
            <FadeHeader
              headingLabel={t(LocaleKeys.accountInfo.password)}
              buttonLabel={t(LocaleKeys.accountInfo.edit)}
              headingValue="••••••••••"
              classes={classes}
              fadeIn={toggleBox.password}
              name={FORM_NAMES.PASSWORD}
              clickHandler={handleClick}
            />
            <div className={classes.container}>
              <Collapse in={toggleBox.password} timeout={timeout}>
                <Paper elevation={0}>
                  <div className={classes.column} />
                  <div>
                    <PasswordForm
                      handleCancel={handleCancelClick}
                      handleSave={handleSaveClick}
                      codeTableData={externalData}
                      language={language}
                      formData={password}
                      formName={FORM_NAMES.PASSWORD}
                      credentialErrorMessage={passwordCredentialError}
                    />
                  </div>
                </Paper>
              </Collapse>
            </div>
          </Paper>
        </Box>
        <Box mb={9} className={classes.boxContainer}>
          <RecieveLatestNewsForm
            handleSave={handleSaveClick}
            codeTableData={externalData}
            language={language}
            formData={receivedLatestNews}
            formName={FORM_NAMES.RECEIVEDLATESTNEWS}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default compose(withTranslation())(AccountInfoForm);
