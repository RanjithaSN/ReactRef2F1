import { useEffect, useState } from 'react';
import useRetrieveDevices from '../../common/hooks/useRetrieveDevices';
import LocaleKeys from '../../locales/keys';
import sanitizeHtml from 'sanitize-html';
import { useTranslation } from 'react-i18next';
import { Box, Divider, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DevicesList from '../components/devices/DevicesList';
import NoDevices from '../components/devices/NoDevices';
import ErrorScreen from '../../common/errorScreen';

const useStyles = makeStyles(() => ({
  ascendonDevicesHeader: {
    padding: '10px 0 20px 0',
  },
}));

const Devices = (props) => {
  const { showDevicesContainer } = props;
  const { t } = useTranslation();
  const classes = useStyles();

  const [
    RetrieveDevicesResponse,
    RetrieveDevicesFault,
    requestRetrieveDevices,
  ] = useRetrieveDevices();

  const [remainingDeviceAssociations, setRemainingDeviceAssociations] =
    useState(null);
  const [error, setError] = useState([]);
  const [isMountedState, setIsMountedState] = useState(true);

  useEffect(() => {
    if (isMountedState) {
      requestRetrieveDevices();
    }

    return () => {
      setIsMountedState(false);
    };
  }, []);

  useEffect(() => {
    RetrieveDevicesResponse &&
      setRemainingDeviceAssociations(
        RetrieveDevicesResponse.RemainingDeviceAssociations,
      );
  }, [RetrieveDevicesResponse]);

  useEffect(() => {
    if (RetrieveDevicesFault && RetrieveDevicesFault.length) {
      setError(RetrieveDevicesFault);
    }
  }, [RetrieveDevicesFault]);

  return (
    showDevicesContainer && (
      <>
        <Box className="devices panel-default">
          <Box className="panel-heading">
            <Typography variant="h2" className={classes.ascendonDevicesHeader}>
              {t(LocaleKeys.subscriptionInfo.devices.devicesHeader)}
            </Typography>
            <Divider />
          </Box>
          {error && error.length ? (
            <ErrorScreen error={error} mt={5} mb={5} variant="body1" />
          ) : (
            <Box className="panel-body">
              <Typography variant="body1">
                <span
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(
                      t(LocaleKeys.subscriptionInfo.devices.deviceSubHeader),
                    ),
                  }}
                />
              </Typography>

              {RetrieveDevicesResponse &&
                remainingDeviceAssociations &&
                remainingDeviceAssociations === 999 && <NoDevices />}

              {RetrieveDevicesResponse &&
                remainingDeviceAssociations &&
                remainingDeviceAssociations !== 999 && (
                  <DevicesList
                    RetrieveDevicesResponse={RetrieveDevicesResponse}
                  />
                )}
            </Box>
          )}
        </Box>
      </>
    )
  );
};

export default Devices;
