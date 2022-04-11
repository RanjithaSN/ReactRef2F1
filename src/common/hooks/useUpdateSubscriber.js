import { useContext, useState } from 'react';
import { WebApiContext } from 'ascendon-web-api';
import { translateFault, generateUnhandledFault } from '../../helpers/faults';

function useUpdateSubscriber() {
  const [fault, setFault] = useState(null);
  const [uiModel, setUiModel] = useState(null);
  const WebApi = useContext(WebApiContext);

  const requestUpdateSubscriber = (newRequestData) => {
    let isMounted = true;
    // Subscriber async request for UpdateSubscriber API
    WebApi.subscriber({
      callName: 'UpdateSubscriber',
      keyFactors: ['UpdateSubscriber'],
      forceRefresh: true,
      payload: newRequestData,
    })
      .then((response) => {
        if (isMounted) {
          setUiModel(response.data);
        }
      })
      .catch((error) => {
        console.warn({ error });
        // Error handling goes here.
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
  return [uiModel, fault, requestUpdateSubscriber];
}

export { useUpdateSubscriber };
export default useUpdateSubscriber;
