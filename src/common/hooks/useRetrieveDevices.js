import { useContext, useState } from 'react';
import { WebApiContext } from 'ascendon-web-api';
import { translateFault, generateUnhandledFault } from '../../helpers/faults';

function useRetrieveDevices() {
  const [fault, setFault] = useState(null);
  const [uiModel, setUiModel] = useState(null);
  const WebApi = useContext(WebApiContext);

  const requestRetrieveDevices = () => {
    let isMounted = true;
    WebApi.subscriber({
      callName: 'RetrieveDevices',
      keyFactors: ['RetrieveDevices'],
      forceRefresh: true,
      payload: {},
    })
      .then((response) => {
        if (isMounted) {
          const retrieveDevices = response.data;
          setUiModel(retrieveDevices);
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
  return [uiModel, fault, requestRetrieveDevices];
}

export { useRetrieveDevices };
export default useRetrieveDevices;
