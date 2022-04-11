import { useTranslation, withTranslation } from 'react-i18next';
import {
  Typography,
  Box,
  InputLabel,
  Input,
  FormControl,
} from '@material-ui/core';
import compose from 'ramda/src/compose';
import LocaleKeys from '../../../../../locales/keys';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  'field__input--error': {
    borderColor: theme.palette.error.main,
    borderWidth: '2px',
  },
}));

function FirstNameField(props) {
  const { form = {}, name } = props;
  const { values = {} } = form;
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Box className={`field field--${name}`} mb={4}>
      <InputLabel>
        <Typography variant="body1" color="textPrimary">
          {t(LocaleKeys.registration.firstName)}
        </Typography>
      </InputLabel>
      <FormControl className={`field__form-control`}>
        <Input
          data-cy="field__input"
          className={`field__input ${
            form?.errors?.[name] ? classes['field__input--error'] : ''
          }`}
          disableUnderline
          placeholder={t(LocaleKeys.registration.firstName)}
          fullWidth
          name={name}
          onChange={form.handleChange}
          value={values[name] || ''}
        />
      </FormControl>
      {form?.errors?.[name] ? (
        <Box ml={3} mt={2} className={`field__errorBox`}>
          <Typography variant="body2" color="error">
            {form.errors[name]}
          </Typography>
        </Box>
      ) : null}
    </Box>
  );
}

export default compose(withTranslation())(FirstNameField);
