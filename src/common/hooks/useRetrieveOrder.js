import { useContext, useState } from 'react';
import { WebApiContext } from 'ascendon-web-api';
import pathOr from 'ramda/src/pathOr';
import { translateFault, generateUnhandledFault } from '../../helpers/faults';

function useRetrieveOrder() {
  const [fault, setFault] = useState(null);
  const [uiModel, setUiModel] = useState(null);
  const WebApi = useContext(WebApiContext);

  const requestRetrieveOrder = (newRequestData) => {
    let isMounted = true;
    WebApi.subscriber({
      callName: 'RetrieveOrder',
      keyFactors: ['RetrieveOrder'],
      forceRefresh: true,
      payload: newRequestData,
    })
      .then((response) => {
        if (isMounted) {
          setUiModel(response.data);
          if (response.data.Order.AdditionalProperties) {
            const trackingNumber = pathOr(
              0,
              ['Values', 0],
              response.data.Order.AdditionalProperties.find(
                (extRef) => extRef.ExternalReference === 'Tracking_Number',
              ),
            );
            const shippedStatus = pathOr(
              '',
              ['Values', 0],
              response.data.Order.AdditionalProperties.find(
                (extRef) => extRef.ExternalReference === 'Primary_Color_Status',
              ),
            );
            setUiModel({
              ...response.data,
              trackingNumber: trackingNumber,
              shippedStatus: shippedStatus,
            });
          }
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
  return [uiModel, fault, requestRetrieveOrder];
}

export { useRetrieveOrder };
export default useRetrieveOrder;
