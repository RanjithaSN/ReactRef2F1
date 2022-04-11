import { Box, Button } from '@material-ui/core';

const ButtonAction = ({
  cancelHandler,
  formik,
  saveLabel,
  cancelLabel,
  classes,
  name,
}) => (
  <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
    <Button
      className={classes.submitButton}
      style={{ margin: '0 15px' }}
      variant="contained"
      color="default"
      onClick={() => {
        cancelHandler({ name, formik });
      }}
    >
      {cancelLabel}
    </Button>
    <Button
      className={classes.submitButton}
      variant="contained"
      color="primary"
      onClick={() => {
        formik.handleSubmit();
      }}
    >
      {saveLabel}
    </Button>
  </Box>
);

export default ButtonAction;
