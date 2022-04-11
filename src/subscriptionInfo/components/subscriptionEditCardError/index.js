import { Box } from '@material-ui/core';

const SubscriptionEditCardError = ({ paymentMethodFormFault, classes }) => {
  const [errorMessagesHeading, unknownError] =
    paymentMethodFormFault.split('-');
  return (
    <Box>
      <Box className={classes.errorContainer}>
        <Box>
          <strong>{errorMessagesHeading}</strong>
        </Box>
        <Box mt={1}>
          <strong>{unknownError}</strong>
        </Box>
      </Box>
    </Box>
  );
};

export default SubscriptionEditCardError;
