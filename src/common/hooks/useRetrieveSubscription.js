import { useContext, useState } from 'react';
import { WebApiContext } from 'ascendon-web-api';
import { translateFault, generateUnhandledFault } from '../../helpers/faults';

function useRetrieveSubscription() {
  const [fault, setFault] = useState(null);
  const [uiModel, setUiModel] = useState(null);
  const WebApi = useContext(WebApiContext);

  const requestRetrieveSubscription = (newRequestData) => {
    let isMounted = true;
    WebApi.subscriber({
      callName: 'RetrieveSubscription',
      keyFactors: ['RetrieveSubscription'],
      forceRefresh: true,
      payload: newRequestData,
    })
      .then((response) => {
        if (isMounted) {
          const retrieveSubscription = response.data;
          setUiModel({
            details: retrieveSubscription.Subscription,
          });
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
  return [uiModel, fault, requestRetrieveSubscription];
}

export { useRetrieveSubscription };
export default useRetrieveSubscription;
