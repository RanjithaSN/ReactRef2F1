import { useContext, useState } from 'react';
import { WebApiContext } from 'ascendon-web-api';
import { translateFault, generateUnhandledFault } from '../../helpers/faults';

function useRetrieveDefaultPayment() {
  const [fault, setFault] = useState(null);
  const [uiModel, setUiModel] = useState(null);
  const WebApi = useContext(WebApiContext);

  const requestRetrieveDefaultPayment = (newRequestData) => {
    let isMounted = true;
    WebApi.subscriber({
      callName: 'RetrieveWallet',
      keyFactors: ['RetrieveWallet'],
      forceRefresh: true,
      payload: newRequestData,
    })
      .then((response) => {
        if (isMounted) {
          const paymentInstruments = response?.data?.PaymentInstruments || [];
          const getCreditPaymentInstruments = paymentInstruments.filter(
            (item) => item.hasOwnProperty('CreditCard'),
          );
          const retrievePaymentInstrumentRequestAll =
            getCreditPaymentInstruments.reduce((defaultValue, item) => {
              defaultValue.push({
                callName: 'RetrievePaymentInstrument',
                keyFactors: ['RetrievePaymentInstrument'],
                forceRefresh: true,
                payload: { Id: item.Id },
              });
              return defaultValue;
            }, []);

          const uiModelResponse = (responseData) =>
            responseData.reduce((all, item) => {
              all.push({ ...item.data.PaymentInstrument });
              return all;
            }, []);
          if (retrievePaymentInstrumentRequestAll.length) {
            WebApi.requestAll([...retrievePaymentInstrumentRequestAll])
              .then((response) => {
                setUiModel(uiModelResponse(response.data));
              })
              .catch((error) => {
                console.warn({ error });
                if (isMounted) {
                  const code = error?.data?.data?.Code;
                  let errorMsg;
                  if (!code) {
                    const unknownFault = generateUnhandledFault(
                      error.data.data,
                    );
                    errorMsg = translateFault(unknownFault).translatedMessage;
                    setFault(errorMsg);
                  } else {
                    errorMsg = translateFault(
                      error.data.data,
                    ).translatedMessage;
                    setFault(errorMsg);
                  }
                }
              });
          } else {
            setUiModel({});
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
  return [uiModel, fault, requestRetrieveDefaultPayment];
}

export { useRetrieveDefaultPayment };
export default useRetrieveDefaultPayment;
