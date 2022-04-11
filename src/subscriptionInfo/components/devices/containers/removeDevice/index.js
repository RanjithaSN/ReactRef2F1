import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import LocaleKeys from '../../../../../locales/keys';
import ButtonAction from '../../../../../common/buttonAction';

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    [theme.breakpoints.up('lg')]: {
      maxWidth: '22%',
    },
  },
  button: {
    borderRadius: '5px',
    color: theme.palette.custom.white,
    padding: '10px 15px',
    width: '119px',
    height: '37px',
  },
  cancelButton: {
    backgroundColor: '#38383f',
    [theme.breakpoints.down('md')]: {
      width: '90%',
    },
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: 'white',
    },
  },
  removeButton: {
    backgroundColor: '#d9534f',
    height: '37px',
    '&:hover': {
      backgroundColor: '#c9302c',
      borderColor: '#ac2925',
    },
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  removeDeviceConfirmationText: {
    whiteSpace: 'pre-line',
    [theme.breakpoints.down('md')]: {
      paddingTop: '20px',
      whiteSpace: 'unset',
    },
  },
}));

const RemoveDevice = ({
  removeDeviceContainerHandler,
  deleteDeviceHandler,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Grid container>
      <Grid item xs={6} lg={3} className={classes.buttonContainer}>
        <ButtonAction
          size="small"
          variant="contained"
          buttonClasses={`${classes.button} ${classes.cancelButton}`}
          handler={removeDeviceContainerHandler}
          label={t(LocaleKeys.subscriptionInfo.devices.cancel)}
        />
      </Grid>
      <Grid item xs={6} lg={3} className={classes.buttonContainer}>
        <ButtonAction
          size="small"
          buttonClasses={`${classes.button} ${classes.removeButton}`}
          variant="contained"
          color="primary"
          handler={deleteDeviceHandler}
          label={t(LocaleKeys.subscriptionInfo.devices.remove)}
        />
      </Grid>
      <Grid
        item
        xs={12}
        lg={5}
        className={classes.removeDeviceConfirmationText}
      >
        <Typography variant="body1">
          {t(LocaleKeys.subscriptionInfo.devices.deviceListDeleteConfirmation)}
        </Typography>
      </Grid>
    </Grid>
  );
};

RemoveDevice.propTypes = {
  removeDeviceContainerHandler: PropTypes.func.isRequired,
  deleteDeviceHandler: PropTypes.func.isRequired,
};

export default RemoveDevice;
