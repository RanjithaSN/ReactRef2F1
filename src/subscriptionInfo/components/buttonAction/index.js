import { Box, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    color: '#fff',
    borderRadius: '5px',
    margin: '0',
    fontWeight: 500,
    letterSpacing: 0.5,
    lineHeight: 1,
    padding: '12px 15px',
  },
  buttonContainer: {
    width: '50%',
  },
  cancelButton: {
    marginTop: 0,
    width: '100%',
    backgroundColor: theme.palette.custom.darkGreyBg,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  saveButton: {
    marginTop: 0,
    width: '100%',
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      boxShadow: `0 0 0 2px ${theme.palette.custom.darkRed} inset`,
      color: theme.palette.custom.lightBlack,
      background: theme.palette.custom.white,
    },
  },
}));

const ButtonAction = ({
  cancelHandler,
  removeDeviceContainerHandler,
  formik,
  saveLabel,
  cancelLabel,
  removeLabel,
  classes,
  name,
}) => {
  const buttonActionClasses = useStyles();
  return (
    <Box display="flex" justifyContent="flex-end" flexDirection="column">
      <Box mb={4} mt={4}>
        <Button
          disableRipple
          disableFocusRipple
          size="small"
          onClick={removeDeviceContainerHandler}
          className={classes.buttonNode}
        >
          <Typography
            variant="body1"
            className={classes.changeButtonNode}
            style={{ textTransform: 'capitalize', fontWeight: '500' }}
          >
            {removeLabel}
          </Typography>
        </Button>
      </Box>
      <Box display="flex" justifyContent="space-between" flexDirection="row">
        <Box className={buttonActionClasses.buttonContainer} pr={4}>
          <Button
            className={`${buttonActionClasses.button} ${buttonActionClasses.cancelButton}`}
            onClick={() => {
              cancelHandler({ name, formik });
            }}
          >
            {cancelLabel}
          </Button>
        </Box>
        <Box className={buttonActionClasses.buttonContainer} pl={4}>
          <Button
            className={`${buttonActionClasses.button} ${buttonActionClasses.saveButton}`}
            onClick={() => {
              formik.handleSubmit();
            }}
          >
            {saveLabel}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ButtonAction;
