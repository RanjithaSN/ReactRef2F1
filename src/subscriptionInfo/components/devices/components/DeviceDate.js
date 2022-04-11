import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { ListItem, ListItemText } from '@material-ui/core';
import LocaleKeys from '../../../../locales/keys';

const DeviceDate = ({ classes, startDate }) => {
  const { t } = useTranslation();
  return (
    <ListItem className={classes} disableGutters>
      <ListItemText
        primary={`${t(LocaleKeys.subscriptionInfo.devices.added)} ${startDate}`}
      />
    </ListItem>
  );
};

DeviceDate.propTypes = {
  classes: PropTypes.string,
  startDate: PropTypes.string,
};

export default DeviceDate;
