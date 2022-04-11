import { Box } from '@material-ui/core';
import { useFormik } from 'formik';
import LocaleKeys from '../../../../locales/keys';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import PasswordField from '../../../../common/forms/fields/components/passwordField';
import ButtonAction from '../../buttonAction';
import * as Yup from 'yup';
import { password } from '../../../../common/forms/validationSchemas';

const useStyles = makeStyles((theme) => ({
  'field__input--error': {
    borderColor: theme.palette.error.main,
    borderWidth: '2px',
  },
  nameControls: {
    padding: '0 15px',
  },
  alert: {
    color: '#8a6d3b',
    backgroundColor: ' #fcf8e3',
    borderColor: '#faebcc',
    marginBottom: '20px',
    padding: '15px',
    border: '1px solid transparent',
    borderRadius: '4px',
    fontFamily: 'Formula1-Bold',
    fontSize: '14px',
  },
  alertSpan: {
    color: ' #8a6d3b',
  },
}));

const PasswordForm = ({
  handleCancel,
  handleSave,
  codeTableData,
  language,
  formData,
  formName,
  credentialErrorMessage,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const passwordMessage = t(LocaleKeys.accountInfo.requiredPassword);
  const PasswordFieldSchema = Yup.object().shape({
    currentPassword: Yup.string().required(passwordMessage),
    newPassword: password('password', language, codeTableData),
  });

  const formik = useFormik({
    initialValues: { ...formData },
    enableReinitialize: true,
    validationSchema: PasswordFieldSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      handleSave({ name: formName, formik });
    },
  });

  return (
    <Box>
      {credentialErrorMessage ? (
        <Box className={classes.alert}>
          <span className={classes.alertSpan}>{credentialErrorMessage}</span>
        </Box>
      ) : null}
      <form onSubmit={formik.handleSubmit}>
        <Box>
          <Box
            className={`field field--title ${classes.nameControls}`}
            mb={4}
            sx={{ width: '50%' }}
          >
            <PasswordField
              name="currentPassword"
              label={t(LocaleKeys.accountInfo.currentPassword)}
              form={formik}
              key={1}
              isRule
              externalData={codeTableData}
              language={language}
            />
          </Box>
          <Box
            className={`field field--title ${classes.nameControls}`}
            mb={4}
            sx={{ width: '50%' }}
          >
            <PasswordField
              name="newPassword"
              label={t(LocaleKeys.accountInfo.newPassword)}
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

export default PasswordForm;
