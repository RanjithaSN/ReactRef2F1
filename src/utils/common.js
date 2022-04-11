import i18next from 'i18next';
import LocaleKeys from '../locales/keys';

/**
 * Reads session from localStorage
 *
 * @return {string}      user session
 */
export function readSession() {
  const sessionObj = localStorage.getItem('ascSessionInfo');
  if (sessionObj === null) {
    return {};
  }
  return sessionObj && JSON.parse(sessionObj);
}

export function readSessionId() {
  return readSession().SessionId || '';
}

export function readSubscriberId() {
  return readSession()?.SessionSummary?.SubscriberId || null;
}

export function readSubscriberCountry() {
  return readSession()?.Country || null;
}

export function setSession(sessionObj) {
  if (sessionObj?.SessionId) {
    localStorage.setItem('ascSessionInfo', JSON.stringify(sessionObj));
  } else {
    // remove storage
    removeSession();
  }
}

export function removeSession() {
  localStorage.removeItem('ascSessionInfo');
  localStorage.removeItem('redirectURL');
}

export function getUserEmail() {
  return readSession()?.SessionSummary?.Email || '';
}

/**
 * Get Type of Credit Card
 *
 * @param  {string} number card number
 *
 * @return {object}      card type value
 */
export const getCreditCardType = (_number) => {
  const validationRegex = {
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
  };
  const number = _number.replace(/-/g, '');

  if (number.match(validationRegex.Visa.numberRegex) != null)
    return { Type: 1, number };

  if (number.match(validationRegex.MasterCard.numberRegex) != null)
    return { Type: 2, number };

  if (number.match(validationRegex.AmericanExpress.numberRegex) != null)
    return { Type: 3, number };

  return { Type: 0, number };
};

export const ssoToken = function () {
  var Sha1 = {};
  Sha1.hash = function (msg, utf8encode) {
    utf8encode = typeof utf8encode === 'undefined' ? true : utf8encode;
    if (utf8encode) {
      msg = Utf8.encode(msg);
    }
    var K = [1518500249, 1859775393, 2400959708, 3395469782];
    msg += String.fromCharCode(128);
    var l = msg.length / 4 + 2;
    var N = Math.ceil(l / 16);
    var M = new Array(N);
    var i = null;
    for (i = 0; i < N; i++) {
      M[i] = new Array(16);
      for (var j = 0; j < 16; j++) {
        M[i][j] =
          (msg.charCodeAt(i * 64 + j * 4) << 24) |
          (msg.charCodeAt(i * 64 + j * 4 + 1) << 16) |
          (msg.charCodeAt(i * 64 + j * 4 + 2) << 8) |
          msg.charCodeAt(i * 64 + j * 4 + 3);
      }
    }
    M[N - 1][14] = ((msg.length - 1) * 8) / Math.pow(2, 32);
    M[N - 1][14] = Math.floor(M[N - 1][14]);
    M[N - 1][15] = ((msg.length - 1) * 8) & 4294967295;
    var H0 = 1732584193;
    var H1 = 4023233417;
    var H2 = 2562383102;
    var H3 = 271733878;
    var H4 = 3285377520;
    var W = new Array(80);
    var a, b, c, d, e;
    for (i = 0; i < N; i++) {
      var t = null;
      for (t = 0; t < 16; t++) {
        W[t] = M[i][t];
      }
      for (t = 16; t < 80; t++) {
        W[t] = Sha1.ROTL(W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16], 1);
      }
      a = H0;
      b = H1;
      c = H2;
      d = H3;
      e = H4;
      for (t = 0; t < 80; t++) {
        var s = Math.floor(t / 20);
        var T =
          (Sha1.ROTL(a, 5) + Sha1.f(s, b, c, d) + e + K[s] + W[t]) & 4294967295;
        e = d;
        d = c;
        c = Sha1.ROTL(b, 30);
        b = a;
        a = T;
      }
      H0 = (H0 + a) & 4294967295;
      H1 = (H1 + b) & 4294967295;
      H2 = (H2 + c) & 4294967295;
      H3 = (H3 + d) & 4294967295;
      H4 = (H4 + e) & 4294967295;
    }
    return (
      Sha1.toHexStr(H0) +
      Sha1.toHexStr(H1) +
      Sha1.toHexStr(H2) +
      Sha1.toHexStr(H3) +
      Sha1.toHexStr(H4)
    );
  };
  Sha1.f = function (s, x, y, z) {
    switch (s) { // eslint-disable-line
      case 0:
        return (x & y) ^ (~x & z);

      case 1:
        return x ^ y ^ z;

      case 2:
        return (x & y) ^ (x & z) ^ (y & z);

      case 3:
        return x ^ y ^ z;
    }
  };
  Sha1.ROTL = function (x, n) {
    return (x << n) | (x >>> (32 - n));
  };
  Sha1.toHexStr = function (n) {
    var s = '',
      v;
    for (var i = 7; i >= 0; i--) {
      v = (n >>> (i * 4)) & 15;
      s += v.toString(16);
    }
    return s;
  };
  var Utf8 = {};
  Utf8.encode = function (strUni) {
    var strUtf = strUni.replace(/[\u0080-\u07ff]/g, function (c) {
      var cc = c.charCodeAt(0);
      return String.fromCharCode(192 | (cc >> 6), 128 | (cc & 63));
    });
    strUtf = strUtf.replace(/[\u0800-\uffff]/g, function (c) {
      var cc = c.charCodeAt(0);
      return String.fromCharCode(
        224 | (cc >> 12),
        128 | ((cc >> 6) & 63),
        128 | (cc & 63),
      );
    });
    return strUtf;
  };
  Utf8.decode = function (strUtf) {
    var strUni = strUtf.replace(
      /[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,
      function (c) {
        var cc =
          ((c.charCodeAt(0) & 15) << 12) |
          ((c.charCodeAt(1) & 63) << 6) |
          (c.charCodeAt(2) & 63);
        return String.fromCharCode(cc);
      },
    );
    strUni = strUni.replace(/[\u00c0-\u00df][\u0080-\u00bf]/g, function (c) {
      var cc = ((c.charCodeAt(0) & 31) << 6) | (c.charCodeAt(1) & 63);
      return String.fromCharCode(cc);
    });
    return strUni;
  };
  return {
    generate: function (systemId, ssoLogin, extRef, ssoSalt, ssoNonce) {
      var ssoToken = '';
      try {
        if (!ssoSalt) {
          ssoSalt = '& pepper';
        }
        if (!ssoNonce) {
          ssoNonce = '';
        }
        if (extRef) {
          ssoLogin = extRef;
        }
        if (ssoLogin.length > 0) {
          var d = new Date();
          var currYear = d.getUTCFullYear();
          var currMonth = d.getUTCMonth() + 1;
          var currDay = d.getUTCDate();
          var currHour = d.getUTCHours();
          var currMin = d.getUTCMinutes();
          var currSec = d.getUTCSeconds();
          var currMs = d.getUTCMilliseconds();
          if (currMonth < 10) {
            currMonth = `0${currMonth}`;
          }
          if (currDay < 10) {
            currDay = `0${currDay}`;
          }
          if (currHour < 10) {
            currHour = `0${currHour}`;
          }
          if (currMin < 10) {
            currMin = `0${currMin}`;
          }
          if (currSec < 10) {
            currSec = `0${currSec}`;
          }
          var currDate = `${currYear}-${currMonth}-${currDay}T${currHour}:${currMin}:${currSec}.${currMs}Z`;
          ssoToken = `${ssoNonce};${currDate};${Sha1.hash(
            `${ssoSalt};${systemId};${ssoLogin};${ssoNonce};${currDate};${ssoSalt}`,
          )}`;
        }
      } catch (error) {
        ssoToken = false;
      }
      return ssoToken;
    },
  };
};

const creditCardType = {
  Visa: 1,
  MasterCard: 2,
  AmericanExpress: 3,
  Discover: 4,
  JCB: 5,
  DinersClub: 6,
  MaestroUK: 7,
  MaestroInternational: 8,
  Solo: 9,
  VisaElectron: 15,
  Laser: 17,
  BrandedVisa: 21,
  BrandedMastercard: 22,
};

export const paymentInstrumentTypes = {
  creditCard: 0,
  eCheck: 1,
  storedValueAccount: 2,
  giftCard: 3,
  externalBill: 4,
  paypalAccount: 5,
  iTunesAccount: 6,
  directDebit: 8,
  xboxAccount: 9,
  externalGiftCard: 10,
  rokuAccount: 11,
};

const imageUrls = {
  visaIconUrl: 'images/visa.svg',
  mastercardIconUrl: 'images/mastercard.svg',
  amexIconUrl: 'images/amex.svg',
  dinersIconUrl: 'images/diners.svg',
  discoverIconUrl: 'images/discover.svg',
  jcbIconUrl: 'images/jcb.svg',
  maestroIconUrl: 'images/maestro.svg',
  defaultCardIconUrl: 'images/defaultcard.svg',
};

const getcardUrl = (cardName) => imageUrls[cardName];

export const getCreditCardIconByType = (cardType) => {
  switch (parseInt(cardType)) {
    case creditCardType.Visa:
    case creditCardType.VisaElectron:
    case creditCardType.BrandedVisa:
      return getcardUrl('visaIconUrl');
    case creditCardType.MasterCard:
    case creditCardType.BrandedMastercard:
      return getcardUrl('mastercardIconUrl');
    case creditCardType.AmericanExpress:
      return getcardUrl('amexIconUrl');
    case creditCardType.DinersClub:
      return getcardUrl('dinersIconUrl');
    case creditCardType.Discover:
      return getcardUrl('discoverIconUrl');
    case creditCardType.JCB:
      return getcardUrl('jcbIconUrl');
    case creditCardType.MaestroInternational:
    case creditCardType.MaestroUK:
      return getcardUrl('maestroIconUrl');
    default:
      return getcardUrl('defaultCardIconUrl');
  }
};

export const getSelecetdCreditCardName = (
  cardType,
  cardList = creditCardType,
) => {
  const getcardName = (Object.entries(cardList) || []).reduce((all, item) => {
    const [key, value] = item;
    if (value === cardType) {
      all = { cardName: key, cardType: value };
    }
    return all;
  }, {});
  return getcardName;
};

export const generateCreditCardDescriptor = (creditCardNumber) => {
  const getCreditCardetails = getCreditCardType(creditCardNumber);
  const cardName = getCreditCardetails.display;
  const lastFour = creditCardNumber.substring(creditCardNumber.length - 4);
  const endingText = i18next.t(LocaleKeys.common.creditCardDescriptor);
  return `${cardName} ${endingText} ${lastFour}`;
};
