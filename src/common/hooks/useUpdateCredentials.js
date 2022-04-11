import { useContext, useState } from 'react';
import { WebApiContext } from 'ascendon-web-api';
import { translateFault, generateUnhandledFault } from '../../helpers/faults';

function useUpdateCredentials() {
  const [fault, setFault] = useState(null);
  const [uiModel, setUiModel] = useState(null);
  const WebApi = useContext(WebApiContext);

  const requestUpdateCredentials = (newRequestData) => {
    let isMounted = true;
    // Subscriber async request for UpdateCredentials API
    WebApi.subscriber({
      callName: 'UpdateCredentials',
      keyFactors: ['UpdateCredentials'],
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
        setFault('');
        // Error handling goes here.
        const faultCodeGenerate = (data) => {
          if (data?.faultCode && data?.Code === 113) {
            return {
              ...data,
              faultCode: `${data?.faultCode}-${data?.faultCode}`,
            };
          }
          return { ...data };
        };
        if (isMounted) {
          const code = error?.data?.Code;
          let errorMsg;
          if (!code) {
            const unknownFault = generateUnhandledFault(error.data);
            errorMsg = translateFault(unknownFault).translatedMessage;
            setFault(errorMsg);
          } else {
            errorMsg = translateFault(
              faultCodeGenerate(error.data),
            ).translatedMessage;
            setFault(errorMsg);
          }
        }
      });
  };
  return [uiModel, fault, requestUpdateCredentials];
}

export { useUpdateCredentials };
export default useUpdateCredentials;
