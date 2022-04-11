import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import LocaleKeys from '../../../locales/keys';
import ButtonAction from '../../../common/buttonAction';

const useStyles = makeStyles((theme) => ({
  button: {
    borderRadius: '5px',
    color: theme.palette.custom.white,
    padding: '10px 15px',
    height: '37px',
  },
  cancelButton: {
    backgroundColor: theme.palette.custom.darkGreyBg,
    width: '90%',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.custom.white,
    },
  },
  removeButton: {
    backgroundColor: '#d9534f',
    width: '100%',
    '&:hover': {
      backgroundColor: '#c9302c',
      borderColor: '#ac2925',
    },
  },
  removePaymentConfirmationText: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: '20px',
    },
  },
}));

const RemovePaymentButtonAction = ({
  removePaymentInstrumentContainerHandler,
  deletePaymentInstrumentHandler,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Grid container>
      <Grid item xs={12} className={classes.removePaymentConfirmationText}>
        <Typography variant="body1">
          {t(
            LocaleKeys.subscriptionInfo.subscriptions
              .removePaymentConfirmationText,
          )}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <ButtonAction
          size="small"
          variant="contained"
          buttonClasses={`${classes.button} ${classes.cancelButton}`}
          handler={removePaymentInstrumentContainerHandler}
          label={t(
            LocaleKeys.subscriptionInfo.subscriptions.removePaymentCancel,
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <ButtonAction
          size="small"
          buttonClasses={`${classes.button} ${classes.removeButton}`}
          variant="contained"
          color="primary"
          handler={deletePaymentInstrumentHandler}
          label={t(
            LocaleKeys.subscriptionInfo.subscriptions.removePaymentRemove,
          )}
        />
      </Grid>
    </Grid>
  );
};

RemovePaymentButtonAction.propTypes = {
  removePaymentInstrumentContainerHandler: PropTypes.func.isRequired,
  deletePaymentInstrumentHandler: PropTypes.func.isRequired,
};

export default RemovePaymentButtonAction;
