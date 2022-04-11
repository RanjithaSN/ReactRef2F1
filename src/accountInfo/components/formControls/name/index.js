import { Box } from '@material-ui/core';
import { useFormik } from 'formik';
import LocaleKeys from '../../../../locales/keys';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import TitleField from '../../../../common/forms/fields/components/titleField';
import FirstNameField from '../../../../common/forms/fields/components/firstNameField';
import LastNameField from '../../../../common/forms/fields/components/lastNameField';
import ButtonAction from '../../buttonAction';
import * as Yup from 'yup';
import {
  firstName,
  lastName,
} from '../../../../common/forms/validationSchemas';

const useStyles = makeStyles((theme) => ({
  'field__input--error': {
    borderColor: theme.palette.error.main,
    borderWidth: '2px',
  },
  nameContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '5%',
  },
  nameContainerNode: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  nameControls: {
    padding: '0 15px',
  },
}));

const NameForm = ({
  handleCancel,
  handleSave,
  codeTableData,
  language,
  formData,
  formName,
}) => {
  const NameFieldSchema = Yup.object().shape({
    FirstName: firstName('firstName', language, codeTableData),
    LastName: lastName('lastName', language, codeTableData),
  });
  const classes = useStyles();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: { ...formData },
    enableReinitialize: true,
    validationSchema: NameFieldSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      handleSave({ name: formName, formik });
    },
  });

  return (
    <Box className={classes.nameContainer}>
      <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
        <Box className={classes.nameContainerNode}>
          <Box
            className={`field field--title ${classes.nameControls}`}
            mb={4}
            sx={{ flexGrow: 1 }}
          >
            <TitleField
              name="Title"
              form={formik}
              key={1}
              externalData={codeTableData}
              language={language}
            />
          </Box>
          <Box
            className={`field field--firstname  ${classes.nameControls}`}
            mb={4}
          >
            <FirstNameField
              name="FirstName"
              form={formik}
              key={2}
              externalData={codeTableData}
              language={language}
            />
          </Box>
          <Box
            className={`field field--lastName  ${classes.nameControls}`}
            mb={4}
          >
            <LastNameField
              name="LastName"
              form={formik}
              key={3}
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

export default NameForm;
