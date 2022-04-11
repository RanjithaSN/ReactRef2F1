import { makeStyles } from '@material-ui/core/styles';
import LocaleKeys from '../../../locales/keys';
import { Box, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(() => ({
  row: {
    marginTop: '15px',
    padding: '0 15px',
    border: 'solid 2px #d0d0d2',
    borderRadius: '10px',
    backgroundColor: '#fff',
  },
  noDevices: {
    padding: '20px 0',
    textAlign: 'center',
  },
}));

const NoDevices = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <Box className={classes.row} sm={12}>
      <Typography variant="h5" className={classes.noDevices}>
        {t(LocaleKeys.subscriptionInfo.devices.noDevices)}
      </Typography>
    </Box>
  );
};

export default NoDevices;
