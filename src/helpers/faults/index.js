import i18next from 'i18next';
import ApiFaultCodes from '../../constants/api/';
import LocaleKeys from '../../locales/keys';

const retrieveFaultTranslation = (faultCode) =>
  i18next.t(`${LocaleKeys.fault_prefix}${faultCode}`);

export const getFaultCode = (fault) => {
  if (fault.faultCode) {
    return fault.faultCode;
  }

  return `${fault.Code.toString()}${fault.Subcode ? `-${fault.Subcode}` : ''}`;
};

export const translateFaultCode = (faultCode, mainCode) => {
  let translatedMessage = retrieveFaultTranslation(faultCode);

  // fallback to main code if subcode translation isn't available
  if (
    translatedMessage === `${LocaleKeys.fault_prefix}${faultCode}` &&
    mainCode
  ) {
    translatedMessage = retrieveFaultTranslation(mainCode);
  }

  if (
    translatedMessage === `${LocaleKeys.fault_prefix}${faultCode}` ||
    translatedMessage === `${LocaleKeys.fault_prefix}${mainCode}`
  ) {
    translatedMessage = `${retrieveFaultTranslation(
      ApiFaultCodes.UNKNOWN,
    )} - ${faultCode}`;
  }

  return translatedMessage;
};

export const translateFault = (fault) => {
  const faultCode = getFaultCode(fault);
  const mainCode = fault.Subcode ? fault.Code : null;
  const translatedMessage = translateFaultCode(faultCode, mainCode);

  return {
    ...fault,
    translatedMessage,
    faultCode,
  };
};

export const generateUnhandledFault = (response) => ({
  Code: parseInt(ApiFaultCodes.UNKNOWN, 10),
  Status: response ? response.status : null,
  OriginalError: response,
});
