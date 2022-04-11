import { Box, Button, Collapse, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.palette.custom.darkRed,
    color: '#fff',
    borderRadius: '5px',
    margin: '15px 0',
    fontWeight: 500,
    letterSpacing: 0.5,
    lineHeight: 1,
    padding: '12px 15px',
  },
  selectButton: {
    '&:hover': {
      boxShadow: `0 0 0 2px ${theme.palette.primary.dark} inset`,
      color: theme.palette.custom.black,
    },
  },
  defaultPaymentCardLabel: {
    fontFamily: 'titillium-regular',
    fontSize: '17px',
    letterSpacing: '.2px',
  },
  nameOncardLabel: {
    fontFamily: 'Formula1-Bold',
    fontWeight: 700,
    fontSize: '18px',
    [theme.breakpoints.between('xs', 'md')]: {
      lineHeight: 1.43,
    },
  },
  paymentFontWeight: {
    fontWeight: 700,
    letterSpacing: '.2px',
    fontSize: '17px',
    padding: '0 5px',
    [theme.breakpoints.between('xs', 'md')]: {
      padding: 0,
      margin: 0,
    },
  },
  imageContainer: {
    lineHeight: 0,
    [theme.breakpoints.between('xs', 'md')]: {
      lineHeight: 1.43,
    },
  },
}));

const PaymentMethodList = ({
  classes,
  cardTypeUrl,
  isChangeClicked,
  handleSelectClick,
  handleEditClick,
  paymentMethodNode,
  paymentMethodIndex,
  defaultPaymentCardLabel,
  editcardDetailsLabel,
  selectButtonLabel,
}) => {
  const paymentMethodListClasses = useStyles();
  return (
    <Box key={paymentMethodIndex}>
      {paymentMethodNode?.Default ? (
        <Box
          pb={2}
          className={paymentMethodListClasses.defaultPaymentCardLabel}
        >
          {defaultPaymentCardLabel}
        </Box>
      ) : null}
      <Box className={classes.paymentNode}>
        <Box className={classes.innerNode}>
          <Box mr={4} className={paymentMethodListClasses.imageContainer}>
            <img src={cardTypeUrl} alt="" />
          </Box>
          <Box className={classes.wcNode}>
            <Typography className={paymentMethodListClasses.nameOncardLabel}>
              {paymentMethodNode?.NameOnCard}
            </Typography>
          </Box>
        </Box>
        <Box className={classes.outerNode}>
          <Box mr={5} className={paymentMethodListClasses.paymentFontWeight}>
            {paymentMethodNode?.AccountNumber}
          </Box>
          <Box
            pr={4}
            className={paymentMethodListClasses.paymentFontWeight}
          >{`${
            paymentMethodNode?.ExpirationMonth
          }/${paymentMethodNode?.ExpirationYear?.slice(-2)}`}</Box>
        </Box>
      </Box>
      <Box>
        <Button
          disableRipple
          disableFocusRipple
          size="small"
          onClick={() => {
            handleEditClick(paymentMethodNode);
          }}
          style={{ backgroundColor: 'unset', padding: 0 }}
        >
          <Typography
            variant="h6"
            style={{ fontSize: '14px' }}
            className={`${classes.changeButtonNode}`}
          >
            {editcardDetailsLabel}
          </Typography>
        </Button>
      </Box>

      <Collapse in={isChangeClicked} timeout={0}>
        <Box>
          {isChangeClicked ? (
            <Button
              className={`${paymentMethodListClasses.button} ${paymentMethodListClasses.selectButton}`}
              disableElevation
              disableRipple
              onClick={() => {
                handleSelectClick(paymentMethodNode);
              }}
            >
              {selectButtonLabel}
            </Button>
          ) : null}
        </Box>
      </Collapse>
    </Box>
  );
};

export default PaymentMethodList;
