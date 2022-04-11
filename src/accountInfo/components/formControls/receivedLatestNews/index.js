import { Box } from '@material-ui/core';
import { useFormik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import RecieveNewsField from '../../../../common/forms/fields/components/recieveNewsField';
import ConfirmationField from '../../../../common/forms/fields/components/confirmationField';
import { useEffect, useRef } from 'react';

const useStyles = makeStyles((theme) => ({
  'field__input--error': {
    borderColor: theme.palette.error.main,
    borderWidth: '2px',
  },
  dateContainer: {
    margin: '5% 0px',
  },
  nameContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '5%',
  },
  nameControls: {
    padding: '0px',
  },
}));

const RecieveLatestNewsForm = ({
  handleSave,
  codeTableData,
  language,
  formData,
  formName,
}) => {
  const classes = useStyles();
  const isFirstRun = useRef(true);

  const formik = useFormik({
    initialValues: { ...formData },
    enableReinitialize: true,
    onSubmit: (values) => {
      // Form Submit
    },
  });

  useEffect(() => {
    if (typeof formik.values.receivedLatestNews !== 'boolean') {
      return;
    }
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    handleSave({ name: formName, formik });
  }, [formik.values.receivedLatestNews]);

  return (
    <Box className={classes.dateContainer}>
      <form onSubmit={formik.handleSubmit}>
        <Box>
          <Box className={`field field--title ${classes.nameControls}`} mb={4}>
            <RecieveNewsField
              name="receivedLatestNews"
              form={formik}
              key={1}
              externalData={codeTableData}
              language={language}
            />
          </Box>
          <Box>
            <ConfirmationField label></ConfirmationField>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default RecieveLatestNewsForm;
