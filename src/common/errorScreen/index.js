import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  defaultErrorScreenTypogarpghy: {
    textAlign: 'center',
  },
  removeDeviceOrPaymentErrorScreen: {
    backgroundColor: theme.palette.custom.lightGrayishRed,
    borderRadius: '5px',
    borderColor: '#ebccd1',
    color: theme.palette.error.dark,
    fontSize: '14px',
    padding: '5px 10px',
    marginBottom: '20px',
  },
}));
//Function can accept styling attribute as props that can be applied to Box Component
const ErrorScreen = ({
  error,
  color,
  classname,
  variant,
  removeStyle,
  ...props
}) => {
  const classes = useStyles();

  const errorScrenStyle =
    classname ||
    (removeStyle
      ? classes.removeDeviceOrPaymentErrorScreen
      : classes.defaultErrorScreenTypogarpghy);

  return (
    <Box {...props}>
      <Typography variant={variant} color={color} className={errorScrenStyle}>
        {error}
      </Typography>
    </Box>
  );
};

export default ErrorScreen;
