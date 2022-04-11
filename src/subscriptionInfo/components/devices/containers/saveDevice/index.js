import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
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
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: '5px',
    padding: '5px 15px',
    height: '37px',
    width: '134px',
  },
  cancelButton: {
    color: theme.palette.text.primary.main,
    [theme.breakpoints.down('md')]: {
      width: '90%',
    },
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.custom.white,
    },
  },
  saveButton: {
    '&:hover': {
      backgroundColor: theme.palette.custom.white,
      color: theme.palette.custom.black,
    },
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  removeDevice: {
    borderBottom: `2px solid ${theme.palette.primary.main}`,
    borderRadius: 'unset',
    padding: 'unset',
    top: '4px',
    '&:hover': {
      backgroundColor: 'unset',
      color: '#23527c',
    },
    [theme.breakpoints.down('md')]: {
      marginLeft: '0',
    },
  },
  removeDeviceText: {
    fontWeight: '600',
    textTransform: 'capitalize',
  },
}));

const SaveDevice = ({ formik, removeDeviceContainerHandler }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Grid container>
      <Grid item xs={6} lg={3} className={classes.buttonContainer}>
        <ButtonAction
          size="small"
          buttonClasses={`${classes.button} ${classes.cancelButton}`}
          handler={formik.handleReset}
          label={t(LocaleKeys.subscriptionInfo.devices.cancel)}
        />
      </Grid>
      <Grid item xs={6} lg={3} className={classes.buttonContainer}>
        <ButtonAction
          size="small"
          buttonClasses={`${classes.button} ${classes.saveButton}`}
          variant="contained"
          color="primary"
          handler={formik.handleSubmit}
          label={t(LocaleKeys.subscriptionInfo.devices.save)}
        />
      </Grid>
      <Grid item xs={12} lg={4}>
        <ButtonAction
          size="small"
          buttonClasses={classes.removeDevice}
          typographyClasses={classes.removeDeviceText}
          variant="text"
          handler={removeDeviceContainerHandler}
          label={t(LocaleKeys.subscriptionInfo.devices.deviceRemove)}
        />
      </Grid>
    </Grid>
  );
};

SaveDevice.propTypes = {
  formik: PropTypes.object.isRequired,
  removeDeviceContainerHandler: PropTypes.func.isRequired,
};

export default SaveDevice;
