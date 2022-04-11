import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Divider } from '@material-ui/core';
import { useFormik } from 'formik';
import LocaleKeys from '../../../locales/keys';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import NameOnCardField from '../../../common/forms/fields/components/nameOnCardField';
import CardNumberField from '../../../common/forms/fields/components/cardNumberField';
import ExpirationField from '../../../common/forms/fields/components/expirationField';
import SecurityCodeField from '../../../common/forms/fields/components/securityCodeField';
import BillingAddressField from '../../../common/forms/fields/components/billingAddressField';
import ButtonAction from '../buttonAction';
import FormDialog from '../dialog';
import {
  firstName,
  expirationDate,
  securityCode,
  nameOnCard,
  postalCode,
} from '../../../common/forms/validationSchemas';
import { getSelecetdCreditCardName } from '../../../utils/common';
import SubscriptionEditCardError from '../subscriptionEditCardError';
import RemovePaymentButtonAction from '../../components/removePaymentButtonAction';
import useRemovePaymentInstrument from '../../../common/hooks/useRemovePaymentInstrument';
import AddNewAddress from '../addNewAddress/AddNewAddress';
import { exceptionalCountries } from '../../../constants/exceptionalCountries';
import {
  getSelectedCountryPostalCodeRegex,
  getSelectedCountryZipCodeMask,
} from './country.selectors';
import pathOr from 'ramda/src/pathOr';

const useStyles = makeStyles((theme) => ({
  'field__input--error': {
    borderColor: theme.palette.error.main,
    borderWidth: '2px',
  },
  nameContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '5%',
    flexDirection: 'column',
  },
  nameContainerNode: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  nameControls: {
    padding: 0,
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
      color: '#23527c',
    },
  },
  fieldBoxContainer: {
    width: '47%',
    [theme.breakpoints.between('xs', 'md')]: {
      width: '100%',
    },
  },
  iconContainer: {
    alignSelf: 'center',
    width: '15px',
    height: '15px',
    marginLeft: '4px',
    marginTop: '1px',
    [theme.breakpoints.between('xs', 'md')]: {
      marginLeft: '5px',
    },
  },
  imageContainer: {
    width: '100%',
  },
  errorContainer: {
    padding: '5px 10px',
    marginBottom: '20px',
    fontFamily: 'Formula1-Bold',
    fontSize: '14px',
    color: theme.palette.custom.darkRed,
    border: '1px solid transparent',
    borderRadius: '4px',
    backgroundColor: theme.palette.custom.lightGrayishRed,
    borderColor: '#ebccd1',
  },
}));

const SubscriptionEditCardDetailsForm = ({
  handleCancel,
  handleSave,
  language,
  formData,
  formName,
  isCardFieldDisabled,
  editSelectedId,
  autoFocusRef,
  addressList,
  paymentMethodIndex,
  iconTypeUrl,
  cardType,
  paymentMethodFormFault,
  filteredPaymentInstrumentList,
  removePaymentInstrumentFaultHandler,
  sessionCountry,
  externalData,
  externalDataState,
  billingAddressId,
  billingIdHandler,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  /**  --- useState--- **/

  const [open, setOpen] = useState(false);
  const [removeDeviceStatus, setRemoveDeviceStatus] = useState(false);
  const [showAddNewAddress, setShowAddNewAddress] = useState(false);
  const [postalCodeRegularExpression, setPostalCodeRegularExpression] =
    useState(null);

  const [
    exceptionalCountriesValidationSchema,
    setExceptionalCountriesValidationSchema,
  ] = useState(null);
  const [
    defaultCountriesValidationSchema,
    setDefaultCountriesValidationSchema,
  ] = useState(null);

  const paymentMethodForm = Yup.object().shape({
    NameOnCard: nameOnCard('nameOnCard', language),
    CardNumber: Yup.string(),
    ExpirationDate: expirationDate('expirationDate', language),
    SecurityCode: securityCode(
      'securityCode',
      language,
      getSelecetdCreditCardName(cardType),
    ),
    BillingAddress: Yup.string(),
  });

  const addNewAddressFormInitialValues = {
    AddressLineOne: '',
    AddressLineTwo: '',
    City: '',
    Region: '',
    PostalCode: '',
    ZipCode: '',
    State: '',
    Province: '',
    Country: sessionCountry,
  };
  const formik = useFormik({
    initialValues: { ...formData, ...addNewAddressFormInitialValues },
    enableReinitialize: true,
    validationSchema: !showAddNewAddress
      ? paymentMethodForm
      : exceptionalCountriesValidationSchema ||
        defaultCountriesValidationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: () => {
      handleSave({
        name: formName,
        formik,
        showAddNewAddress,
        postalCodeRegularExpression,
      });
    },
  });

  /**  --- useSelector --- **/
  // captures specific postalcode regex and zip code mask from the metadata coutry code api

  const { dummyCountry } = useSelector((state) => ({
    dummyCountry: state.ascendon.metadata.code[59].Codes,
  }));
  console.log('dummyCountry', dummyCountry);

  const newValue = pathOr(null, ['Name'], dummyCountry)
    ? dummyCountry.find((item) => item.Name === 'Afghanistan')
    : "hi";
  console.log('newValue', newValue);

  const { postalCodeRegex, zipCodeMask } = useSelector((state) => ({
    postalCodeRegex: getSelectedCountryPostalCodeRegex(
      state,
      formik?.values?.Country,
    ),
    zipCodeMask: getSelectedCountryZipCodeMask(state, formik?.values?.Country),
  }));

  const addNewAddressForm = Yup.object().shape({
    AddressLineOne: firstName('addressLineOne', language),
    City: firstName('city', language),
    ...paymentMethodForm.fields,
  });

  const addNewAddressFormCAN = Yup.object().shape({
    PostalCode: postalCode('postalCode', language, postalCodeRegex?.Value),
    Province: firstName('province', language),
    ...addNewAddressForm.fields,
  });

  const addNewAddressFormAUS = Yup.object().shape({
    Region: firstName('region', language),
    ...addNewAddressForm.fields,
  });

  const addNewAddressFormUSA = Yup.object().shape({
    ZipCode: postalCode('zipCode', language, postalCodeRegex?.Value),
    State: firstName('state', language),
    ...addNewAddressForm.fields,
  });

  const [
    removePaymentInstrumentResponse,
    removePaymentInstrumentFault,
    requestRemovePaymentInstrument,
  ] = useRemovePaymentInstrument();

  useEffect(() => {
    formik.resetForm();
  }, [editSelectedId]);

  useEffect(() => {
    if (removePaymentInstrumentResponse?.message === 'ok') {
      filteredPaymentInstrumentList(editSelectedId);
    }
  }, [removePaymentInstrumentResponse]);

  useEffect(() => {
    removePaymentInstrumentFault &&
      removePaymentInstrumentFaultHandler(removePaymentInstrumentFault);
  }, [removePaymentInstrumentFault]);

  useEffect(() => {
    if (billingAddressId) {
      formik.setFieldValue('BillingAddress', billingAddressId);
    }
    if (!billingAddressId && !formik?.values?.BillingAddress) {
      setShowAddNewAddress(true);
    } else {
      setShowAddNewAddress(false);
    }
  }, [formik?.values?.BillingAddress, billingAddressId]);

  useEffect(() => {
    postalCodeRegex && setPostalCodeRegularExpression(postalCodeRegex.Value);
  }, [postalCodeRegex]);

  const getExceptionalCountryValidationSchema = (countryName) => {
    const countryValidationSchema = {
      AUS: {
        addNewAddressForm: addNewAddressFormAUS,
      },
      CAN: {
        addNewAddressForm: addNewAddressFormCAN,
      },
      USA: {
        addNewAddressForm: addNewAddressFormUSA,
      },
    };
    return countryValidationSchema[countryName];
  };

  useEffect(() => {
    const { Country } = formik?.values;
    if (exceptionalCountries?.includes(Country)) {
      const { addNewAddressForm } =
        getExceptionalCountryValidationSchema(Country);
      setExceptionalCountriesValidationSchema(addNewAddressForm);
      setDefaultCountriesValidationSchema(null);
    } else {
      setDefaultCountriesValidationSchema(addNewAddressForm);
      setExceptionalCountriesValidationSchema(null);
    }
  }, [formik?.values?.Country]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const removePaymentInstrumentContainerHandler = () => {
    setRemoveDeviceStatus((prevState) => !prevState);
  };

  const deletePaymentInstrumentHandler = () => {
    requestRemovePaymentInstrument({ Id: editSelectedId });
    removePaymentInstrumentFault &&
      removePaymentInstrumentFaultHandler(removePaymentInstrumentFault);
  };

  return (
    <Box className={classes.nameContainer}>
      {paymentMethodFormFault && (
        <SubscriptionEditCardError
          paymentMethodFormFault={paymentMethodFormFault}
          classes={classes}
        />
      )}
      <FormDialog open={open} handleClose={handleClose} />
      <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
        <Box className={classes.nameContainerNode} mb={4}>
          <Box
            className={`field field--title ${classes.nameControls}`}
            sx={{ flexGrow: 1 }}
          >
            <NameOnCardField
              name="NameOnCard"
              fieldLabel={t(
                LocaleKeys.subscriptionInfo.subscriptions.paymentFormNameField,
              )}
              form={formik}
              key={1}
              language={language}
              autoFocusRef={autoFocusRef}
              index={paymentMethodIndex}
            />
          </Box>
          <Box
            className={`field field--firstname  ${classes.nameControls}`}
            mb={4}
          >
            <CardNumberField
              name="CardNumber"
              fieldLabel={t(
                LocaleKeys.subscriptionInfo.subscriptions
                  .paymentFormCardNumberField,
              )}
              form={formik}
              isDisabled={isCardFieldDisabled}
              key={2}
              language={language}
            />
          </Box>
          <Box
            className={`field field--lastName  ${classes.nameControls}`}
            mb={4}
          >
            <Box display="flex" justifyContent="space-between" flexWrap="wrap">
              <Box className={classes.fieldBoxContainer}>
                <ExpirationField
                  name="ExpirationDate"
                  fieldLabel={t(
                    LocaleKeys.subscriptionInfo.subscriptions
                      .paymentFormExpirationDateField,
                  )}
                  form={formik}
                  key={1}
                  language={language}
                />
              </Box>
              <Box className={classes.fieldBoxContainer}>
                <SecurityCodeField
                  name="SecurityCode"
                  fieldLabel={t(
                    LocaleKeys.subscriptionInfo.subscriptions
                      .paymentFormSecurityCodeField,
                  )}
                  form={formik}
                  key={1}
                  language={language}
                  icon={
                    <Box
                      onClick={handleClickOpen}
                      className={classes.iconContainer}
                    >
                      <img
                        src={iconTypeUrl}
                        alt="info"
                        className={classes.imageContainer}
                      ></img>
                    </Box>
                  }
                />
              </Box>
            </Box>
          </Box>
          {!showAddNewAddress ? (
            <Box
              className={`field field--billingAddressField  ${classes.nameControls}`}
            >
              <BillingAddressField
                name="BillingAddress"
                fieldLabel={t(
                  LocaleKeys.subscriptionInfo.subscriptions
                    .paymentFormBillingAddress,
                )}
                form={formik}
                key={1}
                externalData={addressList}
                language={language}
                billingAddressId={billingAddressId}
                billingIdHandler={billingIdHandler}
              />
              <Divider
                style={{
                  marginTop: 30,
                  backgroundColor: 'rgb(208, 208, 210, 1)',
                }}
              />
            </Box>
          ) : (
            <>
              <Divider
                style={{
                  marginBottom: 15,
                  backgroundColor: '#d0d0d2',
                  height: 2,
                }}
              />
              <AddNewAddress
                externalData={externalData}
                externalDataState={externalDataState}
                form={formik}
                language={language}
                zipCodeMask={zipCodeMask}
              />
            </>
          )}
        </Box>
        <Box>
          {!removeDeviceStatus ? (
            <ButtonAction
              cancelHandler={handleCancel}
              removeDeviceContainerHandler={
                removePaymentInstrumentContainerHandler
              }
              formik={formik}
              saveLabel={t(
                LocaleKeys.subscriptionInfo.subscriptions.paymentFormSave,
              )}
              cancelLabel={t(
                LocaleKeys.subscriptionInfo.subscriptions.paymentFormCancel,
              )}
              removeLabel={t(
                LocaleKeys.subscriptionInfo.subscriptions.removePayment,
              )}
              classes={classes}
              name={formName}
            />
          ) : (
            <RemovePaymentButtonAction
              removePaymentInstrumentContainerHandler={
                removePaymentInstrumentContainerHandler
              }
              deletePaymentInstrumentHandler={deletePaymentInstrumentHandler}
            />
          )}
          <Divider
            style={{
              marginTop: 20,
              backgroundColor: 'rgb(208, 208, 210, 1)',
            }}
          />
        </Box>
      </form>
    </Box>
  );
};

export default SubscriptionEditCardDetailsForm;
