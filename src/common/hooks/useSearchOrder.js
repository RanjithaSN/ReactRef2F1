import { useContext, useState } from 'react';
import { WebApiContext } from 'ascendon-web-api';
import { translateFault, generateUnhandledFault } from '../../helpers/faults';

function useSearchOrders() {
  const [fault, setFault] = useState(null);
  const [uiModel, setUiModel] = useState(null);
  const WebApi = useContext(WebApiContext);

  const requestSearchOrders = (orderHistoryDateRange, selectedPage) => {
    let isMounted = true;
    const startDateVal = orderHistoryDateRange;
    let startDate = new Date();

    if (startDateVal >= 0) {
      startDate.setMonth(startDate.getMonth() - startDateVal);
    } else {
      startDate = null;
    }

    WebApi.subscriber({
      callName: 'SearchOrders',
      keyFactors: ['SearchOrders'],
      forceRefresh: true,
      payload: {
        PageNumber: selectedPage,
        PageSize: 1,
        Start: startDate,
        Statuses: [],
      },
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
  return [uiModel, fault, requestSearchOrders];
}

export { useSearchOrders };
export default useSearchOrders;
