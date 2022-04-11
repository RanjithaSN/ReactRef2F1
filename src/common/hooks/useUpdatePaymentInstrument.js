import { useContext, useState } from 'react';
import { WebApiContext } from 'ascendon-web-api';
import { translateFault, generateUnhandledFault } from '../../helpers/faults';

function useUpdatePaymentInstrument() {
  const [fault, setFault] = useState(null);
  const [uiModel, setUiModel] = useState(null);
  const WebApi = useContext(WebApiContext);

  const requestUpdatePaymentInstrument = (newRequestData) => {
    let isMounted = true;
    WebApi.subscriber({
      callName: 'UpdatePaymentInstrument',
      keyFactors: ['UpdatePaymentInstrument'],
      forceRefresh: true,
      payload: newRequestData,
    })
      .then((response) => {
        if (isMounted) {
          const updateAddress = response.data;
          setUiModel(updateAddress);
        }
      })
      .catch((error) => {
        console.warn({ error });
        if (isMounted) {
          const code = error?.data?.Code;
          const errorMessagesHeading = 1000;
          const unknownError = 1001;
          let errorMsg;
          const faultCodeGenerate = (data, subCode) => {
            if (data?.Code === 118) {
              return {
                ...data,
                faultCode: `${data?.faultCode}-${subCode}`,
              };
            }
            return { ...data };
          };
          if (!code) {
            const unknownFault = generateUnhandledFault(error.data);
            errorMsg = translateFault(unknownFault).translatedMessage;
            setFault(errorMsg);
          } else {
            setFault('');
            if (error?.data?.Code === 118) {
              errorMsg = `${
                translateFault(
                  faultCodeGenerate(error.data, errorMessagesHeading),
                ).translatedMessage
              }-${
                translateFault(faultCodeGenerate(error.data, unknownError))
                  .translatedMessage
              }`;
            } else {
              errorMsg = translateFault(error.data).translatedMessage;
            }

            setFault(errorMsg);
          }
        }
      });
  };
  return [uiModel, fault, requestUpdatePaymentInstrument];
}

export { useUpdatePaymentInstrument };
export default useUpdatePaymentInstrument;
