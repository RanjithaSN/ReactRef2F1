import { Box } from '@material-ui/core';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';

const SubscriptionLogoStatus = ({ classes, imageUrl, statusName }) => (
  <Box mb={1} className={classes.boxContainer}>
    <Box className={classes.logoContainer}>
      <img src={imageUrl} alt="F1Logo" />
    </Box>
    <Box className={classes.iconNode}>
      <CheckCircleRoundedIcon
        style={{ color: '#12c000', fontSize: '1.3rem', marginRight: '5px' }}
      />
      <span className={classes.iconText}>{statusName}</span>
    </Box>
  </Box>
);

export default SubscriptionLogoStatus;
