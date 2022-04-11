import { Box, Divider, ListItem, ListItemText } from '@material-ui/core';

const SubscriptionList = ({ classes, name, value }) => (
  <Box>
    <ListItem className={classes.listItemContainer}>
      <ListItemText primary={name} className={classes.listItemNode} />
      <ListItemText
        style={{ fontWeight: 700 }}
        className={classes.listItemNode}
        disableTypography
        primary={value}
      />
    </ListItem>
    <Divider />
  </Box>
);

export default SubscriptionList;
