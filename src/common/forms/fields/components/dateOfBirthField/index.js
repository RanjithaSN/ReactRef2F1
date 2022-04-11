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
import InputMask from 'react-input-mask';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  'field__input--error': {
    borderColor: theme.palette.error.main,
    borderWidth: '2px',
  },
}));

const MaskedInput = (props) => (
  <InputMask
    alwaysShowMask
    mask="99/99/9999"
    value={props.value}
    onChange={props.onChange}
    placeholder={props.placeholder}
    name={props.name}
    className={`field__input ${
      props.form?.errors?.[props.name]
        ? props.classes['field__input--error']
        : ''
    }`}
    data-cy="field__input"
    maskChar=" "
  >
    {(inputProps) => <Input disableUnderline fullWidth {...inputProps} />}
  </InputMask>
);

function DateOfBirthField(props) {
  const { form = {}, name } = props;
  const { values = {} } = form;
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Box className={`field field--${name}`} mb={4}>
      <InputLabel>
        <Typography variant="body1" color="textPrimary">
          {t(LocaleKeys.registration.dateOfBirth)}
        </Typography>
      </InputLabel>
      <FormControl className={`field__form-control`}>
        <MaskedInput
          value={values[name] || ''}
          onChange={form.handleChange}
          name={name}
          placeholder={t(LocaleKeys.registration.dateOfBirth)}
          form={form}
          classes={classes}
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

export default compose(withTranslation())(DateOfBirthField);
