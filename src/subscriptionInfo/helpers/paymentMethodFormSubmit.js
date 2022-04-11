import {
  paymentInstrumentTypes,
  getSelecetdCreditCardName,
} from '../../utils/common';
import LocaleKeys from '../../locales/keys';
import i18next from 'i18next';
import { exceptionalCountries } from '../../constants/exceptionalCountries';

const getAccountNumberDisplay = (type, card) => {
  if (type === paymentInstrumentTypes.creditCard) {
    return card?.AccountNumber || '';
  }
};

const canEdit = (type) => type !== paymentInstrumentTypes.iTunesAccount;
const canDelete = function (type) {
  return (
    type !== paymentInstrumentTypes.iTunesAccount &&
    type !== paymentInstrumentTypes.externalBill
  );
};

const iconClassType = {
  paymentInstrumentIconTypeCard: 0,
  paymentInstrumentIconType5: 5,
  paymentInstrumentIconType4: 4,
  paymentInstrumentIconType6: 6,
};

const iconClass = (type, classType) => {
  const getSelectedName = getSelecetdCreditCardName(type, classType);
  return `${i18next.t(
    LocaleKeys.subscriptionInfo.subscriptions[getSelectedName.cardName],
  )}`;
};

const getName = (card) => ({ cardName: `CC ${card.AccountNumber.substr(-4)}` });

const getExpirationDate = (expirationDateNode) => {
  const splitExpirationDate = expirationDateNode.split('/');
  const expirationMonth = splitExpirationDate[0];
  const expirationYear = `20${splitExpirationDate[1]}`;
  const expirationDate = `${expirationMonth}/${expirationYear}`;
  return {
    expirationMonth,
    expirationYear,
    expirationDate,
  };
};

export const getUpdatedPaymentInstrumentPayload = (
  formvalues,
  paymentInstrtrument,
  showAddNewAddress,
  postalCodeRegularExpression,
) => {
  let setUpdatedFormvalues;
  const {
    AddressLineOne,
    AddressLineTwo,
    City,
    Country,
    ExpirationDate,
    NameOnCard,
    PostalCode,
    Province,
    Region,
    SecurityCode,
    State,
    ZipCode,
  } = formvalues;
  const { BillingAddress, ...paymentInstrtrumentNode } = paymentInstrtrument;
  const { expirationMonth, expirationYear, expirationDate } =
    getExpirationDate(ExpirationDate);
  const { cardName } = getName(paymentInstrtrumentNode.CreditCard);

  const DefaultPayload = {
    AccountNumberDisplay: getAccountNumberDisplay(
      paymentInstrtrumentNode.Type,
      paymentInstrtrumentNode.CreditCard,
    ),
    CanDelete: canDelete(paymentInstrtrumentNode.Type),
    CanEdit: canEdit(paymentInstrtrumentNode.Type),
    CaptchaEnabledForCreate: false,
    CaptchaEnabledForEdit: false,
    CaptchaResponse: null,
    DisplayName: paymentInstrtrumentNode.Name,
    IconClass: iconClass(paymentInstrtrumentNode.Type, iconClassType),
    IsExpired: false,
    IsRestricted: false,
    Nickname: cardName,
    Name: cardName,
  };

  const postalCodeformatted = (postalCode) => {
    if (Country === 'USA' && postalCode && postalCode.length === 9) {
      postalCode = postalCode.replace(/(\w{5})(\w{4})/, '$1-$2');
    }
    return postalCode;
  };

  const BillingAddressPayload = {
    City: City,
    Country: Country,
    CountryHasStates: exceptionalCountries.includes(Country) ? true : false,
    County: null,
    Created: null,
    DefaultBilling: false,
    DefaultShipping: false,
    GeoCode: null,
    Latitude: null,
    LineOne: AddressLineOne,
    LineTwo: AddressLineTwo,
    Longitude: null,
    Name: NameOnCard,
    PhoneNumber: null,
    PostalCode: PostalCode || ZipCode,
    PostalCodeFormatted: postalCodeformatted(PostalCode || ZipCode),
    PostalCodeRegex: postalCodeRegularExpression || null,
    ShipToName: null,
    State: exceptionalCountries.includes(Country)
      ? State || Province || Region
      : null,
    Status: 1,
    StatusName: null,
  };

  if (showAddNewAddress) {
    setUpdatedFormvalues = {
      BillingAddress: BillingAddressPayload,
      ...paymentInstrtrumentNode,
      CreditCard: {
        ...paymentInstrtrumentNode.CreditCard,
        BillingAddressId: null,
        ExpirationDate: expirationDate,
        ExpirationMonth: expirationMonth,
        ExpirationYear: expirationYear,
        NameOnCard: NameOnCard,
        Cvv: SecurityCode,
      },
      Default: true,
      ...DefaultPayload,
    };
  } else {
    setUpdatedFormvalues = {
      ...paymentInstrtrumentNode,
      BillingAddressId: formvalues.BillingAddress,
      CreditCard: {
        ...paymentInstrtrumentNode.CreditCard,
        ExpirationDate: expirationDate,
        ExpirationMonth: expirationMonth,
        ExpirationYear: expirationYear,
        NameOnCard: NameOnCard,
        Cvv: SecurityCode,
      },
      ...DefaultPayload,
    };
  }

  return setUpdatedFormvalues;
};
