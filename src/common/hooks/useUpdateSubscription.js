import { useContext, useState } from 'react';
import { WebApiContext } from 'ascendon-web-api';
import { translateFault, generateUnhandledFault } from '../../helpers/faults';

function useUpdateSubscription() {
  const [fault, setFault] = useState(null);
  const [uiModel, setUiModel] = useState(null);
  const WebApi = useContext(WebApiContext);

  const requestUpdateSubscription = (newRequestData) => {
    let isMounted = true;
    WebApi.subscriber({
      callName: 'UpdateSubscription',
      keyFactors: ['UpdateSubscription'],
      forceRefresh: true,
      payload: newRequestData,
    })
      .then((response) => {
        if (isMounted) {
          const updateSubscription = response.data;
          setUiModel(updateSubscription);
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
  return [uiModel, fault, requestUpdateSubscription];
}

export { useUpdateSubscription };
export default useUpdateSubscription;
