import { useContext, useState } from 'react';
import { WebApiContext } from 'ascendon-web-api';
import { translateFault, generateUnhandledFault } from '../../helpers/faults';
import loadExternalValidationRules from '../../utils/loadExternalValidationRules';
import { payloadTypes } from '../../constants/metaDataPayloadTypes';

function useMetaDataCodes() {
  const { countries, states } = payloadTypes;

  const [fault, setFault] = useState(null);
  const [externalDataCountries, setExternalDataCountries] = useState(null);
  const [externalDataStates, setExternalDataStates] = useState(null);
  const WebApi = useContext(WebApiContext);

  let isMounted = true;

  const getWebApiRequest = (payloadValue) =>
    WebApi.requestAll([
      {
        type: 'code',
        forceRefresh: true,
        payload: [payloadValue],
      },
    ]);

  const getValidCountriesList = (countriesResponse) =>
    countriesResponse?.data?.Codes.filter(
      (countryItem) => countryItem.Value !== 'UNK',
    );

  const requestMetaDataCodes = (newRequestData) => {
    let payload;

    switch (newRequestData) {
      case 'countries':
        payload = countries;
        break;
      case 'states':
        payload = states;
        break;
      default:
        break;
    }

    getWebApiRequest(payload)
      .then(() =>
        loadExternalValidationRules(ASCENDON_CONFIG.externalValidationRulesUrl),
      )
      .then((externalValidationRules) => {
        if (isMounted) {
          if (payload === 59) {
            setExternalDataCountries({
              countryRules: getValidCountriesList(
                WebApi.getMetadataItemByKey('code', payload),
              ),
              externalValidationRules: externalValidationRules,
            });
          } else if (payload === 60) {
            setExternalDataStates({
              stateRules: WebApi.getMetadataItemByKey('code', payload),
              externalValidationRules: externalValidationRules,
            });
          }
        }
      })
      .catch((error) => {
        console.warn({ error });
        if (isMounted) {
          const code = error?.data?.data?.Code;
          let errorMsg;
          if (!code) {
            const unknownFault = generateUnhandledFault(error.data);
            errorMsg = translateFault(unknownFault).translatedMessage;
            setFault(errorMsg);
          } else {
            errorMsg = translateFault(error.data.data).translatedMessage;
            setFault(errorMsg);
          }
        }
      });
  };

  return [
    externalDataCountries,
    externalDataStates,
    fault,
    requestMetaDataCodes,
  ];
}

export default useMetaDataCodes;
