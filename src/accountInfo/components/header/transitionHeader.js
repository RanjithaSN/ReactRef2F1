import { Box, Button, Fade, Typography } from '@material-ui/core';

const TransitionHeader = ({
  headingLabel,
  buttonLabel,
  headingValue,
  classes,
  fadeIn,
  name,
  clickHandler,
  height,
  heightAnimation,
}) => (
  <Box
    style={
      fadeIn
        ? {
            ...heightAnimation,
            margin: 0,
          }
        : {
            ...heightAnimation,
            height: height || 'auto',
          }
    }
  >
    <Fade in={!fadeIn}>
      <Box className={classes.boxInnerContainer}>
        <Box>
          <Typography className={classes.heading}>{headingLabel}</Typography>
          <p>{headingValue}</p>
        </Box>
        <Button
          className={classes.baseButtoNode}
          onClick={() => clickHandler(name)}
          disableRipple
          disableFocusRipple
          size="small"
        >
          <Typography className={classes.buttonNode}>{buttonLabel}</Typography>
        </Button>
      </Box>
    </Fade>
  </Box>
);

export default TransitionHeader;
