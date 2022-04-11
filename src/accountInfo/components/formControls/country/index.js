import { Box } from '@material-ui/core';
import { useFormik } from 'formik';
import LocaleKeys from '../../../../locales/keys';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import CountryField from '../../../../common/forms/fields/components/countryField';
import ButtonAction from '../../buttonAction';
import { country } from '../../../../common/forms/validationSchemas';
import * as Yup from 'yup';

const useStyles = makeStyles((theme) => ({
  'field__input--error': {
    borderColor: theme.palette.error.main,
    borderWidth: '2px',
  },
  nameContainer: {
    marginBottom: '5%',
  },
  nameControls: {
    padding: '0 15px',
  },
}));

const CountryForm = ({
  handleCancel,
  handleSave,
  codeTableData,
  language,
  formData,
  formName,
}) => {
  const BirthDayFieldSchema = Yup.object().shape({
    country: country('country', language, codeTableData),
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
    <Box className={classes.nameContainer}>
      <form onSubmit={formik.handleSubmit}>
        <Box>
          <Box className={`field field--title ${classes.nameControls}`} mb={4}>
            <CountryField
              name="country"
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

export default CountryForm;
