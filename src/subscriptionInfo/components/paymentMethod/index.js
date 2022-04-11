import { useRef } from 'react';
import { Box, Collapse } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PaymentMethodList from '../paymentMethodList';
import PaymentMethodHeader from '../paymentMethodHeader';
import LocaleKeys from '../../../locales/keys';
import { useTranslation } from 'react-i18next';
import SubscriptionEditCardDetailsForm from '../subscriptionEditCardDetails';
import { getCreditCardIconByType } from '../../../utils/common';
import ErrorScreen from '../../../common/errorScreen';

const useStyles = makeStyles((theme) => ({
  paymentMethodLabelNode: {
    fontFamily: 'Formula1-Regular',
    fontSize: '25px',
    textTransform: 'uppercase',
    fontWeight: 500,
    [theme.breakpoints.between('xs', 'md')]: {
      fontSize: '19px',
    },
  },
  paymentMethodContainer: {
    flexDirection: 'column',
    padding: '10px 0',
    marginBottom: 10,
    [theme.breakpoints.between('xs', 'md')]: {
      paddingBottom: '15px',
      marginBottom: 0,
    },
  },
}));

const PaymentMethod = ({
  classes,
  paymentMethodList,
  cardTypeUrl,
  handleChange,
  isChangeClicked,
  paymentInstrumentLength,
  handleSelectClick,
  handleEditClick,
  editSelectedId,
  handleButtonCancel,
  handleSave,
  addressList,
  paymentMethodFormFault,
  filteredPaymentInstrumentList,
  removePaymentInstrumentFaultHandler,
  showRemovePaymentInstrumentFault,
  language,
  sessionCountry,
  externalData,
  externalDataState,
  billingAddressId = null,
  billingIdHandler,
}) => {
  const { t } = useTranslation();
  const paymentMethodClasses = useStyles();
  const setFocusref = useRef([]);
  const iconUrlNode = 'images/info_icon.png';

  const paymentMethodFadeIn = (item, editSelectedId) =>
    !editSelectedId || !(item?.PaymentInstrumentId === editSelectedId);

  return (
    <Box mb={9} pt={4} className={paymentMethodClasses.paymentMethodContainer}>
      <PaymentMethodHeader
        classes={classes}
        paymentMethodClasses={paymentMethodClasses}
        handleChange={handleChange}
        isChangeClicked={isChangeClicked}
        paymentInstrumentLength={paymentInstrumentLength}
        paymentMethodLabel={t(
          LocaleKeys.subscriptionInfo.subscriptions.paymentHeader,
        )}
        buttonLabel={t(LocaleKeys.subscriptionInfo.subscriptions.change)}
      />

      {showRemovePaymentInstrumentFault && (
        <ErrorScreen
          error={showRemovePaymentInstrumentFault}
          variant="h2"
          removeStyle={true}
        />
      )}
      {paymentMethodList.map((item, index) => (
        <Box key={index}>
          <Box>
            <Collapse in={paymentMethodFadeIn(item, editSelectedId)}>
              <Box>
                <PaymentMethodList
                  classes={classes}
                  cardTypeUrl={`${cardTypeUrl}${getCreditCardIconByType(
                    item?.Type,
                  )}`}
                  isChangeClicked={isChangeClicked}
                  handleSelectClick={handleSelectClick}
                  paymentMethodNode={item}
                  paymentMethodIndex={index}
                  handleEditClick={handleEditClick}
                  defaultPaymentCardLabel={t(
                    LocaleKeys.subscriptionInfo.subscriptions
                      .paymentListDefault,
                  )}
                  editcardDetailsLabel={t(
                    LocaleKeys.subscriptionInfo.subscriptions.paymentListEdit,
                  )}
                  selectButtonLabel={t(
                    LocaleKeys.subscriptionInfo.subscriptions.select,
                  )}
                />
              </Box>
            </Collapse>
          </Box>
          <div>
            <Box pb={4}>
              <Collapse
                in={item?.PaymentInstrumentId === editSelectedId}
                onEntered={() => {
                  setFocusref?.current[index] &&
                    setFocusref?.current[index].focus();
                }}
              >
                <Box>
                  <SubscriptionEditCardDetailsForm
                    formData={{
                      NameOnCard: item?.NameOnCard || '',
                      CardNumber: '',
                      ExpirationDate: `${
                        item?.ExpirationMonth
                      }/${item?.ExpirationYear?.slice(-2)}`,
                      SecurityCode: '',
                      BillingAddress: item?.BillingAddress?.Id,
                    }}
                    handleCancel={handleButtonCancel}
                    formName={item?.PaymentInstrumentId}
                    isCardFieldDisabled={true}
                    classes={classes}
                    editSelectedId={editSelectedId}
                    autoFocusRef={setFocusref}
                    addressList={addressList}
                    paymentMethodIndex={index}
                    iconTypeUrl={`${cardTypeUrl}${iconUrlNode}`}
                    handleSave={handleSave}
                    cardType={item?.Type}
                    paymentMethodFormFault={paymentMethodFormFault}
                    filteredPaymentInstrumentList={
                      filteredPaymentInstrumentList
                    }
                    removePaymentInstrumentFaultHandler={
                      removePaymentInstrumentFaultHandler
                    }
                    language={language}
                    sessionCountry={sessionCountry}
                    externalData={externalData}
                    externalDataState={externalDataState}
                    billingAddressId={billingAddressId}
                    billingIdHandler={billingIdHandler}
                  />
                </Box>
              </Collapse>
            </Box>
          </div>
        </Box>
      ))}
    </Box>
  );
};

export default PaymentMethod;
