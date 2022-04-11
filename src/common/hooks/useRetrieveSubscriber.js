import { useContext, useState } from 'react';
import { WebApiContext } from 'ascendon-web-api';
import { translateFault, generateUnhandledFault } from '../../helpers/faults';

function useRetrieveSubscriber() {
  const [fault, setFault] = useState(null);
  const [uiModel, setUiModel] = useState(null);
  const WebApi = useContext(WebApiContext);

  const requestRetrieveSubscriber = (newRequestData) => {
    let isMounted = true;
    WebApi.subscriber({
      callName: 'RetrieveSubscriber',
      keyFactors: ['RetrieveSubscriber'],
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
  return [uiModel, fault, requestRetrieveSubscriber];
}

export { useRetrieveSubscriber };
export default useRetrieveSubscriber;
