import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { ListItem, ListItemText } from '@material-ui/core';
import LocaleKeys from '../../../../locales/keys';

const DeviceType = ({ deviceType }) => {
  const { t } = useTranslation();
  return (
    <ListItem disableGutters>
      <ListItemText
        primary={`${t(
          LocaleKeys.subscriptionInfo.devices.deviceType,
        )} ${deviceType}`}
      />
    </ListItem>
  );
};

DeviceType.propTypes = {
  deviceType: PropTypes.string.isRequired,
};

export default DeviceType;
