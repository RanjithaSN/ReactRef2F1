import { useContext, useState } from 'react';
import { WebApiContext } from 'ascendon-web-api';
import { translateFault, generateUnhandledFault } from '../../helpers/faults';

function useRemovePaymentInstrument() {
  const [fault, setFault] = useState(null);
  const [uiModel, setUiModel] = useState(null);
  const WebApi = useContext(WebApiContext);

  const requestRemovePaymentInstrument = (newRequestData) => {
    let isMounted = true;
    WebApi.subscriber({
      callName: 'RemovePaymentInstrument',
      keyFactors: ['RemovePaymentInstrument'],
      forceRefresh: true,
      payload: newRequestData,
    })
      .then((response) => {
        if (isMounted) {
          const RemovePaymentInstrument = response;
          setUiModel(RemovePaymentInstrument);
        }
      })
      .catch((error) => {
        console.warn({ error });
        if (isMounted) {
          const code = error?.data?.Code;
          let errorMsg;
          if (!code) {
            const unknownFault = generateUnhandledFault(error.data);
            errorMsg = translateFault(unknownFault).translatedMessage;
            setFault(errorMsg);
          } else {
            errorMsg = translateFault(error.data).translatedMessage;
            setFault(errorMsg);
          }
        }
      });
  };
  return [uiModel, fault, requestRemovePaymentInstrument];
}

export { useRemovePaymentInstrument };
export default useRemovePaymentInstrument;
