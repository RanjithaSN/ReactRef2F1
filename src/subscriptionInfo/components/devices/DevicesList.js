import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeviceListItem from './DeviceListItem';
import NoDevices from './NoDevices';

const useStyles = makeStyles(() => ({
  ascendonDevicesList: {
    marginTop: '20px',
    overflowY: 'hidden',
  },
}));

const DevicesList = ({ RetrieveDevicesResponse }) => {
  const classes = useStyles();

  const [retrieveDevices, setRetrieveDevices] = useState(
    RetrieveDevicesResponse?.Devices,
  );

  const updateRegisterDevicesList = (DeviceId) => {
    const filteredRetrieveDevices = retrieveDevices.filter(
      (item) => item.DeviceId !== DeviceId,
    );
    setRetrieveDevices(filteredRetrieveDevices);
  };

  return (
    <List className={classes.ascendonDevicesList}>
      {retrieveDevices && retrieveDevices.length !== 0 ? (
        retrieveDevices.map((deviceItem) => (
          <DeviceListItem
            key={uuid()}
            deviceItem={deviceItem}
            updateRegisterDevicesList={updateRegisterDevicesList}
          />
        ))
      ) : (
        <NoDevices />
      )}
    </List>
  );
};

export default DevicesList;
