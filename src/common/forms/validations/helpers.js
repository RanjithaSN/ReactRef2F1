export const expirationCardDateValidator = (
  fieldInput = '',
  startYear = '20',
) => {
  const getMonth = fieldInput.split('/')[0];
  const getYear = `${startYear}${fieldInput.split('/')[1]}`;
  const currentDate = new Date();
  return (
    (parseInt(getYear) === currentDate.getFullYear() &&
      parseInt(getMonth) < currentDate.getMonth() + 1) ||
    parseInt(getYear) < currentDate.getFullYear()
  );
};

export const creditCardValidationRegex = {
  Visa: {
    numberRegex: /^4[0-9]{15}$/,
    cvvRegex: /^[0-9]{3}$/,
  },
  MasterCard: {
    numberRegex:
      /(^5[1-5][0-9]{14}$)|((^222[1-9]|^22[3-9][0-9]|^2[3-6][0-9][0-9]|^27[0-1][0-9]|^2720)[0-9]{12}$)/,
    cvvRegex: /^[0-9]{3}$/,
  },
  AmericanExpress: {
    numberRegex: /^[39][47][0-9]{13}$/,
    cvvRegex: /^[0-9]{4}$/,
  },
  Discover: {
    numberRegex:
      /(^6011[0-9]{2}|^65[0-9]{4}|^622(1(2[6-9]|[3-9][0-9])|[2-8][0-9]|9([0-1][0-9]|2[0-5]))|^64[4-9][0-9]{3})[0-9]{10}$/,
    cvvRegex: /^[0-9]{3}$/,
  },
  JCB: {
    numberRegex:
      /(^35(2[8-9]|[3-8][0-9])|^3088|^3096|^3112|^3158|^3337)[0-9]{12}$/,
    cvvRegex: /^[0-9]{3}$/,
  },
  DinersClub: {
    numberRegex: /(^5[4-5][0-9]{14}$)|(^30[0-5][0-9]{11}$)/,
    cvvRegex: /^[0-9]{3}$/,
  },
  MaestroUK: {
    numberRegex:
      /(^5018|^5020|^5038|^6304|^6759|^6761|^6763)[0-9]{8}((?:[0-9])?(?:[0-9])?(?:[0-9])?(?:[0-9])?(?:[0-9])?(?:[0-9])?(?:[0-9])?)$/,
    cvvRegex: /^[0-9]{3}$/,
  },
  MaestroInternational: {
    numberRegex:
      /(^5018|^5020|^5038|^6304|^6759|^6761|^6763)[0-9]{8}((?:[0-9])?(?:[0-9])?(?:[0-9])?(?:[0-9])?(?:[0-9])?(?:[0-9])?(?:[0-9])?)$/,
    cvvRegex: null,
  },
  Solo: {
    numberRegex: /(^6334|^6767)[0-9]{12}(?:[0-9]{2,3})?$/,
    cvvRegex: null,
  },
  VisaElectron: {
    numberRegex:
      /(^4026[0-9]{2}|^417500|^4508[0-9]{2}|^4844[0-9]{2}|^4913[0-9]{2}|^4917[0-9]{2})[0-9]{10}$/,
    cvvRegex: null,
  },
  Laser: {
    numberRegex:
      /(^6304|^6706|^6771|^6709)[0-9]{12}((?:[0-9])?(?:[0-9])?(?:[0-9])?)$/,
    cvvRegex: null,
  },
  BrandedVisa: {
    numberRegex: /^4[0-9]{15}$/,
    cvvRegex: /^[0-9]{3}$/,
  },
  BrandedMasterCard: {
    numberRegex:
      /(^5[1-5][0-9]{14}$)|((^222[1-9]|^22[3-9][0-9]|^2[3-6][0-9][0-9]|^27[0-1][0-9]|^2720)[0-9]{12}$)^[0-9]{3}$/,
    cvvRegex: /^[0-9]{3}$/,
  },
};
