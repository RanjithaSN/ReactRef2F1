import { useContext, useState } from 'react';
import { WebApiContext } from 'ascendon-web-api';
import { translateFault, generateUnhandledFault } from '../../helpers/faults';

function useSubscription() {
  const [fault, setFault] = useState(null);
  const [uiModel, setUiModel] = useState(null);
  const WebApi = useContext(WebApiContext);

  const requestSubscription = (newRequestData) => {
    let isMounted = true;
    WebApi.subscriber({
      callName: 'SearchSubscriptions',
      keyFactors: ['SearchSubscriptions'],
      forceRefresh: true,
      payload: {},
    })
      .then((response) => {
        if (isMounted) {
          const searchSubscriptions = response.data;
          const subscriptions = searchSubscriptions?.Subscriptions || [];
          const currentSubscription = subscriptions[0];
          WebApi.subscriber({
            callName: 'RetrieveSubscription',
            keyFactors: ['RetrieveSubscription'],
            forceRefresh: true,
            payload: {
              Id: currentSubscription.Id,
              IncludeChangeOptions: true,
            },
          })
            .then((response) => {
              const retrieveSubscription = response.data;
              setUiModel({
                overview: subscriptions[0],
                details: retrieveSubscription.Subscription,
              });
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
        }
      })
      .catch((error) => {
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
      });
  };
  return [uiModel, fault, requestSubscription];
}

export { useSubscription };
export default useSubscription;
