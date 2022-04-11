import { Box, Button, Divider, List, Typography } from '@material-ui/core';
import SubscriptionList from '../subscriptionList';

const SubscriptionContainer = ({
  classes,
  subscriptionList,
  cancelSubscriptionLabel,
}) => (
  <Box mb={9} className={classes.boxContainer}>
    <List
      component="nav"
      className={classes.root}
      aria-label="subscription list"
    >
      {subscriptionList.map((item) => (
        <SubscriptionList
          classes={classes}
          name={item.name}
          value={item.value}
          key={item.id}
        />
      ))}
      <Button
        disableRipple
        disableFocusRipple
        size="small"
        className={classes.baseButtoNode}
        onClick={() => console.log('button clicked')}
      >
        <Typography className={classes.buttonNode}>
          {cancelSubscriptionLabel}
        </Typography>
      </Button>
      <Divider />
    </List>
  </Box>
);

export default SubscriptionContainer;
