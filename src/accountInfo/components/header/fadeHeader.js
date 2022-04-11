import { Box, Button, Fade, Typography } from '@material-ui/core';

const FadeHeader = ({
  headingLabel,
  buttonLabel,
  headingValue,
  classes,
  fadeIn,
  name,
  clickHandler,
}) => (
  <Box className={classes.boxInnerContainer}>
    <Box>
      <Typography className={classes.heading}>{headingLabel}</Typography>
      <p>{headingValue}</p>
    </Box>
    <Fade in={!fadeIn}>
      <Button
        disableRipple
        disableFocusRipple
        size="small"
        className={classes.baseButtoNode}
        onClick={() => clickHandler(name)}
      >
        <Typography className={classes.buttonNode}>{buttonLabel}</Typography>
      </Button>
    </Fade>
  </Box>
);

export default FadeHeader;
