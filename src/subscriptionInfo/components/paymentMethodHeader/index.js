import { Box, Button, Fade, Typography } from '@material-ui/core';

const PaymentMethodHeader = ({
  classes,
  handleChange,
  isChangeClicked,
  paymentInstrumentLength,
  paymentMethodLabel,
  buttonLabel,
  paymentMethodClasses,
}) => (
  <Box className={classes.paymentNode}>
    <Box>
      <Typography
        variant="h2"
        className={paymentMethodClasses.paymentMethodLabelNode}
      >
        {paymentMethodLabel}
      </Typography>
    </Box>
    <Box display={isChangeClicked ? 'none' : 'block'}>
      <Fade in={!isChangeClicked && paymentInstrumentLength > 1}>
        <Button
          disableRipple
          disableFocusRipple
          size="small"
          onClick={() => {
            handleChange();
          }}
          style={{
            padding: 0,
            backgroundColor: 'unset',
            justifyContent: 'end',
            minWidth: '50px',
          }}
        >
          <Typography className={classes.changeButtonNode}>
            {buttonLabel}
          </Typography>
        </Button>
      </Fade>
    </Box>
  </Box>
);

export default PaymentMethodHeader;
