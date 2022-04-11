import { useState } from 'react';
import {
  Box,
  Collapse,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import LocaleKeys from '../../../locales/keys';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import DeviceType from './components/DeviceType';
import DeviceEditForm from './DeviceEditForm';
import DeviceDate from './components/DeviceDate';
import ButtonAction from '../../../common/buttonAction';

const useStyles = makeStyles((theme) => ({
  devices: {
    border: 'solid 2px #d0d0d2',
    borderRadius: '10px',
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '0 30px',
    [theme.breakpoints.down('sm')]: {
      paddingBottom: '15px',
    },
  },
  deviceNamewrapper: {
    borderRadius: '10px',
    backgroundColor: '#f7f4f1',
    display: 'flex',
    padding: '20px 10px',
    width: '100%',
  },
  deviceName: {
    padding: '0 15px',
  },
  editDeviceButton: {
    borderBottom: 'solid 2px #e00',
    borderRadius: 'unset',
    float: 'right',
    padding: '0',
    marginRight: '15px',
    minWidth: '3%',
  },
  editDeviceButtonText: {
    fontWeight: '600',
    lineHeight: '1',
    textTransform: 'capitalize',
  },
  deviceDateWrapper: {
    borderTop: 'solid 1px #d0d0d2',
    marginTop: '15px',
    width: '100%',
  },
  deviceListContainer: {
    height: '0',
    display: 'none',
  },
}));

const DeviceListItem = ({ deviceItem, updateRegisterDevicesList }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const startDate = moment(deviceItem.Start).utc().format('DD/MM/YYYY');

  const [FadeInEditForm, setFadeInEditForm] = useState(false);
  const [nickName, setNickName] = useState(
    nickName ? nickName : deviceItem.Nickname,
  );

  const editFormHandler = () => {
    setFadeInEditForm((prevState) => !prevState);
  };

  const deviceItemNickNameHandler = (nickName) => {
    setNickName(nickName);
  };

  return (
    <Box
      className={`panel-default ${classes.devices} ${
        !FadeInEditForm ? `devices-List-Item` : `devices-Edit-Form`
      }`}
    >
      <Collapse in={!FadeInEditForm}>
        <DeviceType deviceType={deviceItem?.DeviceTypeName || ' '} />

        <ListItem className={classes.deviceNamewrapper}>
          <ListItemText
            primary={<Typography variant="h5">{nickName}</Typography>}
            className={classes.deviceName}
          />
          <ButtonAction
            size="small"
            buttonClasses={classes.editDeviceButton}
            typographyClasses={classes.editDeviceButtonText}
            text="primary"
            handler={editFormHandler}
            label={t(LocaleKeys.subscriptionInfo.devices.edit)}
          />
        </ListItem>

        <DeviceDate classes={classes.deviceDateWrapper} startDate={startDate} />
      </Collapse>

      <DeviceEditForm
        editFormHandler={editFormHandler}
        deviceItem={deviceItem}
        deviceItemNickName={nickName}
        startDate={startDate}
        deviceItemNickNameHandler={deviceItemNickNameHandler}
        FadeInEditForm={FadeInEditForm}
        updateRegisterDevicesList={updateRegisterDevicesList}
      />
    </Box>
  );
};

DeviceListItem.propTypes = {
  deviceItem: PropTypes.object,
};

export default DeviceListItem;
