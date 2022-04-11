import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import Typography from '@material-ui/core/Typography';
import { Box, Slide } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import LocaleKeys from '../../../locales/keys';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1.5),
    top: theme.spacing(0),
    color: theme.palette.custom.black,
    opacity: 0.2,
    paddingTop: '12px',
    '&:hover': {
      backgroundColor: 'unset',
      opacity: 0.5,
    },
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    color: theme.palette.custom.white,
    borderRadius: '5px',
    margin: '15px 10px',
    fontWeight: 500,
    letterSpacing: 0.5,
    padding: '12px 15px',
    lineHeight: 1,
  },
  closeIcon: {
    fontSize: '21px',
    fontWeight: '700',
    lineHeight: 1,
    textShadow: `0 1px 0 ${theme.palette.custom.white}`,
    padding: '3px 0',
    '&:hover': {
      textDecoration: 'none',
      cursor: 'pointer',
    },
  },
  closeButtonContent: {
    width: '30%',
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      boxShadow: `0 0 0 2px ${theme.palette.primary.dark} inset`,
      color: theme.palette.custom.lightBlack,
      background: theme.palette.custom.white,
    },
    [theme.breakpoints.between('xs', 'md')]: {
      width: '100%',
    },
  },
  dialogTitle: {
    fontSize: '32px',
    lineHeight: 1.42,
    [theme.breakpoints.between('xs', 'md')]: {
      fontSize: '22px',
    },
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h2" className={classes.dialogTitle}>
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
          disableRipple
          disableFocusRipple
          variant="text"
          size="small"
        >
          <CloseRoundedIcon className={classes.closeIcon} />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogModal = withStyles(styles)((props) => {
  const { children, classes, onClose, handleClose, open, ...other } = props;
  return (
    <Dialog
      onClose={handleClose}
      TransitionComponent={Transition}
      aria-labelledby="subscription-dialog-title"
      open={open}
      maxWidth="md"
      fullWidth
      {...other}
    >
      {children}
    </Dialog>
  );
});

const DialogButtonAction = withStyles(styles)((props) => {
  const { children, classes, handleClose, ...other } = props;
  return (
    <Button
      autoFocus
      className={`${classes.button} ${classes.closeButtonContent}`}
      onClick={handleClose}
      {...other}
    >
      {children}
    </Button>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function FormDialog({ handleClose, open }) {
  const { t } = useTranslation();
  return (
    <div>
      <DialogModal handleClose={handleClose} open={open}>
        <DialogTitle
          id="subscription-dialog-title"
          style={{ padding: '15px', textTransform: 'uppercase' }}
          onClose={handleClose}
        >
          {t(
            LocaleKeys.subscriptionInfo.subscriptions
              .paymentFormSecurityCodeField,
          )}
        </DialogTitle>
        <DialogContent
          dividers
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h5"
            style={{
              fontFamily: 'Formula1-Regular',
              margin: '24px 0px',
              fontWeight: 500,
              fontSize: '18px',
              lineFeight: '1.1',
            }}
          >
            {t(LocaleKeys.subscriptionInfo.subscriptions.threeOnBack)}
          </Typography>
          <Box>
            <img
              src="https://account-staging.formula1.com/images/cc3Digit.png"
              alt="card-cvv"
            ></img>
          </Box>
        </DialogContent>
        <DialogActions>
          <DialogButtonAction handleClose={handleClose}>
            {t(LocaleKeys.subscriptionInfo.subscriptions.close)}
          </DialogButtonAction>
        </DialogActions>
      </DialogModal>
    </div>
  );
}
