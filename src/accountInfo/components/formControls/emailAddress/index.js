import { Box } from '@material-ui/core';
import { useFormik } from 'formik';
import LocaleKeys from '../../../../locales/keys';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import EmailField from '../../../../common/forms/fields/components/emailField';
import PasswordField from '../../../../common/forms/fields/components/passwordField';
import ButtonAction from '../../buttonAction';
import * as Yup from 'yup';
import { emailAddress } from '../../../../common/forms/validationSchemas';

const useStyles = makeStyles((theme) => ({
  'field__input--error': {
    borderColor: theme.palette.error.main,
    borderWidth: '2px',
  },
  nameControls: {
    padding: '0 15px',
    width: '50%',
  },
  formInnerContainer: {
    display: 'flex',
    flexWrap: 'wrap',
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

const EmailAddressForm = ({
  handleCancel,
  handleSave,
  codeTableData,
  language,
  formData,
  formName,
  credentialErrorMessage,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const emailAddressmessage = t(LocaleKeys.accountInfo.emailAddressError);
  const passwordMessage = t(LocaleKeys.accountInfo.requiredPassword);
  const EmailAddressFieldSchema = Yup.object().shape({
    newEmailAddress: emailAddress('emailAddress', language, codeTableData),
    confirmNewEmailAddress: Yup.string()
      .oneOf([Yup.ref('newEmailAddress'), null], emailAddressmessage)
      .emailAddress('emailAddress', language, codeTableData),
    currentPassword: Yup.string().required(passwordMessage),
  });

  const formik = useFormik({
    initialValues: { ...formData },
    enableReinitialize: true,
    validationSchema: EmailAddressFieldSchema,
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
        <Box className={classes.formInnerContainer}>
          <Box className={`field field--title ${classes.nameControls}`} mb={4}>
            <EmailField
              name="newEmailAddress"
              label={t(LocaleKeys.accountInfo.newEmailAddress)}
              form={formik}
              key={1}
              externalData={codeTableData}
              language={language}
            />
          </Box>
          <Box className={`field field--title ${classes.nameControls}`} mb={4}>
            <EmailField
              name="confirmNewEmailAddress"
              label={t(LocaleKeys.accountInfo.confirmNewEmailAddress)}
              form={formik}
              key={1}
              externalData={codeTableData}
              language={language}
            />
          </Box>
          <Box className={`field field--title ${classes.nameControls}`} mb={4}>
            <PasswordField
              name="currentPassword"
              label="Current password"
              isRule
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

export default EmailAddressForm;
