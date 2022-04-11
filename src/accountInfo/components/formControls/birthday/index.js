import { Box } from '@material-ui/core';
import { useFormik } from 'formik';
import LocaleKeys from '../../../../locales/keys';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import DateOfBirthField from '../../../../common/forms/fields/components/dateOfBirthField';
import ButtonAction from '../../buttonAction';
import * as Yup from 'yup';
import { dateOfBirth } from '../../../../common/forms/validationSchemas';

const useStyles = makeStyles((theme) => ({
  'field__input--error': {
    borderColor: theme.palette.error.main,
    borderWidth: '2px',
  },
  dateContainer: {
    marginBottom: '5%',
  },
  nameContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  nameControls: {
    padding: '0 15px',
  },
}));

const BirthdayForm = ({
  handleCancel,
  handleSave,
  codeTableData,
  language,
  formData,
  formName,
}) => {
  const BirthDayFieldSchema = Yup.object().shape({
    BirthDate: dateOfBirth('dateOfBirth', language, codeTableData),
  });
  const classes = useStyles();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: { ...formData },
    enableReinitialize: true,
    validationSchema: BirthDayFieldSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      handleSave({ name: formName, formik });
    },
  });
  return (
    <Box className={classes.dateContainer}>
      <form onSubmit={formik.handleSubmit}>
        <Box className={classes.nameContainer}>
          <Box
            className={`field field--title ${classes.nameControls}`}
            mb={4}
            sx={{ width: '50%' }}
          >
            <DateOfBirthField
              name="BirthDate"
              form={formik}
              key={1}
              externalData={codeTableData}
              language={language}
            />
          </Box>
        </Box>
        <ButtonAction
          cancelHandler={handleCancel}
          formik={formik}
          saveLabel={t(LocaleKeys.accountInfo.save)}
          cancelLabel={t(LocaleKeys.accountInfo.cancel)}
          classes={classes}
          name={formName}
        />
      </form>
    </Box>
  );
};

export default BirthdayForm;
