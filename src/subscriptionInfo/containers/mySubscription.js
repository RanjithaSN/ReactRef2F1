import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation, withTranslation } from 'react-i18next';
import compose from 'ramda/src/compose';
import { Box, Container, Divider, Typography } from '@material-ui/core';
import useSubscription from '../../common/hooks/useSubscription';
import { setGlobalLoader } from '../../app/actions';
import moment from 'moment';
import Currency from 'react-currency-formatter';
import SubscriptionLogoStatus from '../components/subscriptionLogoStatus';
import SubscriptionContainer from '../components/subscriptionContainer';
import PaymentMethod from '../components/paymentMethod';
import useRetrieveDefaultPayment from '../../common/hooks/useRetrieveDefaultPayment';
import useMetaDataCodes from '../../common/hooks/useMetaDataCodes';
import LocaleKeys from '../../locales/keys';
import useUpdateSubscription from '../../common/hooks/useUpdateSubscription';
import useRetrieveSubscription from '../../common/hooks/useRetrieveSubscription';
import ErrorScreen from '../../common/errorScreen';
import useRetrieveAddresses from '../../common/hooks/useRetrieveAddresses';
import GlobalLoader from '../../common/loader';
import { getUpdatedPaymentInstrumentPayload } from '../helpers/paymentMethodFormSubmit';
import useUpdatePaymentInstrument from '../../common/hooks/useUpdatePaymentInstrument';
import { readSubscriberCountry } from '../../utils/common';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    backgroundColor: theme.palette.common.white,
    borderRadius: '10px',
    border: `2px solid ${theme.palette.custom.frame}`,
    padding: '30px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '20px',
  },
  headerText: {
    textTransform: 'uppercase',
    padding: '10px 0 20px 0',
  },
  boxContainer: {
    marginBottom: '0px',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    textTransform: 'capitalize',
  },
  iconText: {
    fontFamily: 'Formula1-Wide',
  },
  iconNode: {
    justifyContent: 'space-around',
    display: 'flex',
  },
  buttonNode: {
    borderBottom: `solid 2px ${theme.palette.custom.darkRed}`,
    borderRadius: '0',
    padding: '0',
    fontSize: '15px',
    fontWeight: 700,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: 'unset',
      color: theme.palette.custom.darkRed,
    },
  },
  changeButtonNode: {
    borderBottom: `solid 2px ${theme.palette.custom.darkRed}`,
    borderRadius: '0',
    padding: '0',
    textTransform: 'capitalize',
    fontSize: '13px',
    lineHeight: 1,
  },
  baseButtoNode: {
    margin: '1rem 0 2rem',
    padding: 0,
  },

  listItemNode: {
    flex: '1 1 50%',
    letterSpacing: '.2px',
    [theme.breakpoints.between('xs', 'md')]: {
      margin: 0,
    },
  },
  paymentNode: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '20px',
  },
  innerNode: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '50%',
    flexWrap: 'wrap',
    [theme.breakpoints.between('xs', 'md')]: {
      flexDirection: 'column',
    },
  },
  outerNode: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '50%',
    flexWrap: 'wrap',
  },
  wcNode: {
    fontFamily: 'Formula1-Bold',
    fontWeight: 700,
    alignSelf: 'center',
    [theme.breakpoints.between('xs', 'md')]: {
      alignSelf: 'flex-start',
    },
  },
  logoContainer: {
    [theme.breakpoints.between('xs', 'md')]: {
      marginBottom: '20px',
    },
  },
  listItemContainer: {
    padding: '15px 0 0 0',
    [theme.breakpoints.between('xs', 'md')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
}));

function MySubscriptions(props) {
  const { showDevicesContainerHandler } = props;
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const cardTypeUrl = 'https://account-staging.formula1.com/';
  const boxRef = useRef(null);

  /** useSelector */
  const showGlobalLoader = useSelector(
    (state) => state?.app?.ui?.showGlobalLoader || false,
  );

  const language = useSelector((state) => state.ascendon.settings.language);

  /** web api hooks */
  const [
    externalDataCountries,
    externalDataStates,
    retrieveMetaDataFault,
    requestMetaDataCodes,
  ] = useMetaDataCodes();

  const [subscriptionUiModel, subscriptionFault, requestSubscription] =
    useSubscription();

  const [
    retrievesubscriptionUiModel,
    retrievesubscriptionFault,
    requestRetrieveSubscription,
  ] = useRetrieveSubscription();

  const [
    retrieveDefaultPaymentUiModel,
    retrieveDefaultPaymentFault,
    requestRetrieveDefaultPayment,
  ] = useRetrieveDefaultPayment();

  const [
    updateSubscriptionUiModel,
    updateSubscriptiontFault,
    requestUpdateSubscription,
  ] = useUpdateSubscription();

  const [
    retrieveAddressesUiModel,
    retrieveAddressesFault,
    requestRetrieveAddresses,
  ] = useRetrieveAddresses();

  const [
    updatePaymentInstrumentUiModel,
    updatePaymentInstrumentFault,
    requestUpdatePaymentInstrument,
  ] = useUpdatePaymentInstrument();

  /** use state */
  const [subscriptionList, setSubscriptionList] = useState([]);
  const [paymentMethodList, setPaymentMethodList] = useState([]);
  const [isChangeClicked, setIsChangeClicked] = useState(false);
  const [statusName, setStatusName] = useState('');
  const [subscriptionId, setSubscriptionId] = useState(0);
  const [editSelectedId, setEditSelectedId] = useState(null);
  const [updatePaymentinstrument, setUpdatePaymentinstrument] = useState(null);
  const [addressList, setAddressList] = useState([]);
  const [retrievePaymentInstrument, setRetrievePaymentInstrument] =
    useState(null);
  const [defaultCard, setDefaultCard] = useState(null);
  const [removePaymentInstrumentStatus, setRemovePaymentInstrumentStatus] =
    useState(false);
  const [errors, setErrors] = useState([]);
  const requestFaults = [
    subscriptionFault,
    retrievesubscriptionFault,
    retrieveDefaultPaymentFault,
    updateSubscriptiontFault,
    retrieveAddressesFault,
    retrieveMetaDataFault,
  ];
  const [hidewhiteBackground, setHidewhiteBackground] = useState(false);
  const [hidePaymentMethodContainer, setHidePaymentMethodContainer] =
    useState(false);
  const [isMountedState, setIsMountedState] = useState(true);
  const [paymentMethodFormFault, setPaymentMethodFormFault] = useState('');
  const [isSequenceUpdateForm, setIsSequenceUpdateForm] = useState(false);
  const [
    showRemovePaymentInstrumentFault,
    setShowRemovePaymentInstrumentFault,
  ] = useState(null);
  const [formikStateValues, setFromikStateValues] = useState({});
  const [sessionCountry, setSessionCountry] = useState(null);
  const [updatedBillingId, setUpdatedBillingId] = useState(null);
  const [retrieveAddressApiCallStatus, setRetrieveAddressApiCallStatus] =
    useState(null);

  /** Helper functions */

  const getSubscriptionListModel = (subscriptionUiNode) => [
    {
      name: `${t(
        LocaleKeys.subscriptionInfo.subscriptions.subscriptionAmountLabel,
      )}`,
      value: subscriptionUiNode?.details?.RenewAmount ? (
        <Currency
          quantity={subscriptionUiNode?.details?.RenewAmount}
          currency="USD"
        />
      ) : (
        ''
      ),
      id: 'subscriptionAmount',
    },
    {
      name: `${t(
        LocaleKeys.subscriptionInfo.subscriptions
          .subscriptionItemNextPaymentDateLabel,
      )}`,
      value: moment
        .utc(subscriptionUiNode?.details?.CycleDate)
        .format('MM/DD/YYYY'),
      id: 'nextPaymentData',
    },
  ];

  const getPaymentListModel = (subscriptionUiNode, subscriptionIdNode) => [
    {
      ...subscriptionUiNode?.details?.PaymentInstrument?.CreditCard,
      Default: subscriptionUiNode?.details?.PaymentInstrument?.Default,
      Id: subscriptionIdNode,
      PaymentInstrumentId: subscriptionUiNode?.details?.PaymentInstrument?.Id,
      BillingAddress: {
        ...subscriptionUiNode?.details?.PaymentInstrument?.BillingAddress,
      },
    },
  ];

  const getStatusName = (name) => {
    if (name !== 'Active') {
      return name;
    }
    return t(LocaleKeys.subscriptionInfo.subscriptions.statusName);
  };

  const getPaymentInstrumentList = (
    retrievePaymentInstrument,
    subscriptionIdNode,
    removePaymentInstrumentStatus,
  ) =>
    (retrievePaymentInstrument || []).reduce((all, item) => {
      if (item?.CreditCard && !removePaymentInstrumentStatus) {
        all.push({
          ...item?.CreditCard,
          Default: item?.Default,
          PaymentInstrumentId: item?.Id,
          Id: subscriptionIdNode,
          BillingAddress: { ...item?.BillingAddress },
        });
      } else {
        all.push({
          ...item,
          Default: item?.Default,
          PaymentInstrumentId: item?.PaymentInstrumentId,
          Id: subscriptionIdNode,
          BillingAddress: { ...item?.BillingAddress },
        });
      }
      return all;
    }, []);

  const getSubscriptionUiModel = (subscriptionUiModelNode) => {
    setEditSelectedId(null);
    setIsChangeClicked(false);
    setIsSequenceUpdateForm(false);
    dispatch(setGlobalLoader(false));
    const getSubscriptionId = subscriptionUiModelNode?.details?.Id;
    const statusNameFromUiModel = subscriptionUiModelNode?.details?.StatusName;
    setStatusName(getStatusName(statusNameFromUiModel));
    setSubscriptionId(getSubscriptionId);
    setSubscriptionList([...getSubscriptionListModel(subscriptionUiModelNode)]);
    const getSubscriptionNode = [
      ...getPaymentListModel(subscriptionUiModelNode, getSubscriptionId),
    ];
    setDefaultCard(getSubscriptionNode);
    setPaymentMethodList(getSubscriptionNode);
  };

  const getUiModelAddresslist = (addressListNodes) =>
    (addressListNodes || []).reduce((all, item) => {
      const displayName = `${item?.LineOne || ''} ${item?.City || ''}, ${
        item?.State || ''
      } ${item?.PostalCode || ''}`;
      all.push({ ...item, displayName });
      return all;
    }, []);

  const isSequenceUpdateFormNode = (initValues, updatedValues) => {
    const getUpdateKeyValues = Object.entries(updatedValues);
    const getUpdatedNodes = (getUpdateKeyValues || []).reduce((all, item) => {
      const [key, value] = item;
      if (initValues[key] !== value) {
        all = true;
      }
      return all;
    }, false);
    return getUpdatedNodes;
  };

  const filteredPaymentInstrumentList = (paymentInstrumentId) => {
    const filteredPaymentMethodList = paymentMethodList.filter(
      (item) => item.PaymentInstrumentId !== paymentInstrumentId,
    );
    setRemovePaymentInstrumentStatus(true);
    setRetrievePaymentInstrument(filteredPaymentMethodList);
    setPaymentMethodList(defaultCard);
    setEditSelectedId(null);
    setIsChangeClicked(false);
  };

  const setRetrievePaymentInstrumentNode = (
    paymentInstrumentMethodList,
    paymentInstrumentId,
    cardDetails,
    billingAddress,
  ) =>
    paymentInstrumentMethodList.reduce((all, item) => {
      if (item.Id === paymentInstrumentId) {
        all.push({
          ...item,
          BillingAddress: billingAddress,
          CreditCard: { ...item.CreditCard, ...cardDetails },
        });
      } else {
        all.push(item);
      }
      return all;
    }, []);

  const setPaymentMethodNode = (
    paymentMethodListNode,
    paymentInstrumentId,
    formikValues,
    addressListNode,
  ) => {
    const { BillingAddress, ExpirationDate, NameOnCard } = formikValues;
    const getBillingAddressBasedonId = (addresslist, addressId) => {
      const getAddressNode = addresslist.find((item) => item.Id === addressId);
      const { displayName, ...restAddressNode } = getAddressNode;
      return restAddressNode;
    };
    const getPaymethodList = paymentMethodListNode.reduce(
      (all, item) => {
        if (item.PaymentInstrumentId === paymentInstrumentId) {
          const cardDetails = {
            NameOnCard: NameOnCard,
            ExpirationMonth: ExpirationDate.split('/')[0],
            ExpirationYear: `20${ExpirationDate.split('/')[1]}`,
          };
          const billAddressValues = getBillingAddressBasedonId(
            addressListNode,
            BillingAddress,
          );
          all.paymentMethodListValues.push({
            ...item,
            ...cardDetails,
            BillingAddress: billAddressValues,
          });
          all.creditCardDetails = { ...cardDetails };
          all.billngAddressDetails = { ...billAddressValues };
        } else {
          all.paymentMethodListValues.push(item);
        }
        return all;
      },
      {
        paymentMethodListValues: [],
        creditCardDetails: null,
        billngAddressDetails: null,
      },
    );
    return getPaymethodList;
  };

  const removePaymentInstrumentFaultHandler = (
    removePaymentInstrumentFault,
  ) => {
    setShowRemovePaymentInstrumentFault(removePaymentInstrumentFault);
  };

  /**use Effect */

  /** Get External Data Like Country Codes, Title, etc..*/

  const getIsSessionCountrySupported = (
    externalDataCountries,
    sessionCountry,
  ) =>
    externalDataCountries?.countryRules?.some(
      (countryItem) => countryItem.Value === sessionCountry?.toUpperCase(),
    );

  useEffect(() => {
    const sessionCountry = readSubscriberCountry();

    // See if the session country is available in the list of countries
    const countryIsSupported = getIsSessionCountrySupported(
      externalDataCountries,
      sessionCountry,
    );

    if (countryIsSupported) {
      setSessionCountry(sessionCountry);
      requestMetaDataCodes('states');
    }
  }, [externalDataCountries]);

  useEffect(() => {
    requestMetaDataCodes('countries');
  }, [props.profileType]);

  /**Initial Load */
  useEffect(() => {
    if (isMountedState) {
      dispatch(setGlobalLoader(true));
      requestSubscription();
      requestRetrieveAddresses();
      requestRetrieveDefaultPayment({ EnforceSessionCountry: false });
    }
    return () => {
      setIsMountedState(false);
    };
  }, []);

  const [dummy, setDummy] = useState(false)

  useEffect(() => {
    console.log("hi");
    axios
      .get(`https://jsonplaceholder.typicode.com/users`)
      .then((res) => console.log(res));
      setDummy(true);
  }, []);

  useEffect(() => {
    if (subscriptionUiModel) {
      getSubscriptionUiModel(subscriptionUiModel);
      showDevicesContainerHandler(true);
    }
  }, [subscriptionUiModel]);

  useEffect(() => {
    if (retrievesubscriptionUiModel) {
      getSubscriptionUiModel(retrievesubscriptionUiModel);
      retrieveAddressApiCallStatus && setUpdatedBillingId(null);
    }
  }, [retrievesubscriptionUiModel]);

  /** updateSubscriptionUiModel */
  useEffect(() => {
    if (updateSubscriptionUiModel) {
      requestRetrieveSubscription({
        Id: subscriptionId,
        IncludeChangeOptions: true,
      });
    }
  }, [updateSubscriptionUiModel]);

  useEffect(() => {
    if (subscriptionFault) {
      setHidewhiteBackground(true);
    } else if (retrievesubscriptionFault) {
      showDevicesContainerHandler(false);
      setHidewhiteBackground(true);
    } else if (
      retrieveDefaultPaymentFault ||
      updateSubscriptiontFault ||
      retrieveAddressesFault ||
      retrieveMetaDataFault
    ) {
      setHidePaymentMethodContainer(true);
      setHidewhiteBackground(false);
    }
    const filterFaults = requestFaults.filter((fault) => !!fault);
    if (filterFaults.length) {
      const currentFault = filterFaults[0];
      setErrors([...errors, currentFault]);
    }
  }, [...requestFaults]);

  /** retrieveAddressesUiModel */
  useEffect(() => {
    if (retrieveAddressesUiModel) {
      const addressUiModel = retrieveAddressesUiModel?.Addresses || [];
      const getAddressList = getUiModelAddresslist(addressUiModel);
      setAddressList([
        ...getAddressList,
        {
          Id: 0,
          displayName: t(
            LocaleKeys.subscriptionInfo.subscriptions.paymentFormAddNewAddress,
          ),
        },
      ]);
      retrieveAddressApiCallStatus &&
        setUpdatedBillingId(
          updatePaymentInstrumentUiModel?.PaymentInstrument.BillingAddress?.Id,
        );
    }
  }, [retrieveAddressesUiModel]);

  useEffect(() => {
    retrieveDefaultPaymentUiModel &&
      setRetrievePaymentInstrument(retrieveDefaultPaymentUiModel);
  }, [retrieveDefaultPaymentUiModel]);

  useEffect(() => {
    if (updatePaymentInstrumentUiModel) {
      if (isSequenceUpdateForm) {
        const { Id, PaymentInstrumentId } = updatePaymentinstrument;
        const {
          paymentMethodListValues,
          creditCardDetails,
          billngAddressDetails,
        } = setPaymentMethodNode(
          paymentMethodList,
          PaymentInstrumentId,
          formikStateValues,
          addressList,
        );
        const getRetrievePaymentInstrumentNode =
          setRetrievePaymentInstrumentNode(
            retrievePaymentInstrument,
            PaymentInstrumentId,
            creditCardDetails,
            billngAddressDetails,
          );
        const paymentMethodListvalues = paymentMethodListValues.filter(
          (item) => item.PaymentInstrumentId === PaymentInstrumentId,
        );
        boxRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        requestUpdateSubscription({ Renew: true, Id, PaymentInstrumentId });
        setPaymentMethodList(paymentMethodListvalues);
        setRetrievePaymentInstrument(getRetrievePaymentInstrumentNode);
        setIsChangeClicked(false);
      }
      setEditSelectedId(null);
      retrieveAddressApiCallStatus && requestRetrieveAddresses();
    }
  }, [updatePaymentInstrumentUiModel]);

  useEffect(() => {
    if (updatePaymentInstrumentFault) {
      setPaymentMethodFormFault(updatePaymentInstrumentFault);
    }
  }, [updatePaymentInstrumentFault]);

  /** Event handlers */
  const handleChangeClick = () => {
    const elementSort = (a, b) => b.Id - a.Id;
    const getSortedDefaultPaymentUiModel = (defaultPaymentUiModel) =>
      defaultPaymentUiModel.sort(elementSort);
    const sortedDefaultPaymentUiModel = getSortedDefaultPaymentUiModel(
      retrievePaymentInstrument,
    );
    const getNode = [
      ...getPaymentInstrumentList(
        sortedDefaultPaymentUiModel,
        subscriptionId,
        removePaymentInstrumentStatus,
      ),
    ];
    setPaymentMethodList(getNode);
    setIsChangeClicked(true);
  };

  const handleSelectClick = (selectedNode) => {
    boxRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    const { Id, PaymentInstrumentId } = selectedNode;
    requestUpdateSubscription({ Renew: true, Id, PaymentInstrumentId });
  };

  const handleEditClick = (selectedEditNode) => {
    if (editSelectedId) {
      return;
    }
    setEditSelectedId(selectedEditNode?.PaymentInstrumentId);
  };

  const handleButtonCancel = (selectedEditNode) => {
    setPaymentMethodFormFault('');
    setEditSelectedId(null);
    setShowRemovePaymentInstrumentFault(null);
  };

  const handleSave = (saveNode) => {
    const { name, formik, showAddNewAddress, postalCodeRegularExpression } =
      saveNode;
    const { initialValues, values } = formik;
    const { SecurityCode, ...restUpdateValues } = values;
    setFromikStateValues({ ...values });
    setPaymentMethodFormFault('');
    setUpdatePaymentinstrument({
      Id: subscriptionId,
      PaymentInstrumentId: name,
    });
    const getSelectedPaymentInstrument = retrievePaymentInstrument.find(
      (item) => item.Id === name,
    );
    const getUpdatedPaymentInstruments = getUpdatedPaymentInstrumentPayload(
      values,
      getSelectedPaymentInstrument,
      showAddNewAddress,
      postalCodeRegularExpression,
    );

    const getisSequenceFormUpdate = isSequenceUpdateFormNode(
      initialValues,
      restUpdateValues,
    );
    setIsSequenceUpdateForm(getisSequenceFormUpdate);
    requestUpdatePaymentInstrument({
      PaymentInstrument: { ...getUpdatedPaymentInstruments },
    });
    showAddNewAddress && setRetrieveAddressApiCallStatus(true);
  };

  const billingIdHandler = () => {
    setUpdatedBillingId(null);
  };

  /** Loader */
  if (showGlobalLoader) {
    return <GlobalLoader />;
  }

  return (
    <Box>
      {dummy ? <h1>hi hello</h1> : <h1>useless</h1>}
      <Box mb={6} style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
        <Typography variant="h2" className={classes.headerText}>
          {t(LocaleKeys.subscriptionInfo.subscriptions.subscriptionsHeader)}
        </Typography>
      </Box>
      <Container
        mb={10}
        className={`${!hidewhiteBackground && classes.container}`}
        width={733}
      >
        {errors && errors.length && !hidePaymentMethodContainer ? (
          <ErrorScreen error={errors[0]} mt={5} mb={5} variant="body1" />
        ) : (
          <Box mt={1} ml={1} mr={1}>
            <Box>
              <Box
                mb={1}
                mt={1}
                className={classes.root}
                ref={(element) => (boxRef.current = element)}
              >
                <Box>
                  <SubscriptionLogoStatus
                    classes={classes}
                    imageUrl={
                      subscriptionUiModel?.details?.Items[0]?.Product?.ImageUrl
                    }
                    statusName={statusName}
                  />
                  <SubscriptionContainer
                    classes={classes}
                    subscriptionList={subscriptionList}
                    cancelSubscriptionLabel={t(
                      LocaleKeys.subscriptionInfo.subscriptions
                        .subscriptionItemCancelSubscriptionButtonLabel,
                    )}
                  />
                  {!hidePaymentMethodContainer ? (
                    <PaymentMethod
                      classes={classes}
                      paymentMethodList={paymentMethodList}
                      cardTypeUrl={cardTypeUrl}
                      handleChange={handleChangeClick}
                      handleSelectClick={handleSelectClick}
                      handleEditClick={handleEditClick}
                      isChangeClicked={isChangeClicked}
                      paymentInstrumentLength={
                        retrievePaymentInstrument?.length
                      }
                      editSelectedId={editSelectedId}
                      handleButtonCancel={handleButtonCancel}
                      addressList={addressList}
                      handleSave={handleSave}
                      paymentMethodFormFault={paymentMethodFormFault}
                      filteredPaymentInstrumentList={
                        filteredPaymentInstrumentList
                      }
                      removePaymentInstrumentFaultHandler={
                        removePaymentInstrumentFaultHandler
                      }
                      showRemovePaymentInstrumentFault={
                        showRemovePaymentInstrumentFault
                      }
                      language={language}
                      sessionCountry={sessionCountry}
                      externalData={externalDataCountries}
                      externalDataState={externalDataStates}
                      billingAddressId={updatedBillingId}
                      billingIdHandler={billingIdHandler}
                    />
                  ) : (
                    <ErrorScreen
                      error={errors[0]}
                      mt={5}
                      mb={5}
                      variant="body1"
                    />
                  )}
                  <Divider style={{ marginTop: '10px' }} />
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default compose(withTranslation())(MySubscriptions);
