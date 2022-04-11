import { withTranslation } from 'react-i18next';
import {
  Typography,
  Box,
  InputLabel,
  Input,
  FormControl,
} from '@material-ui/core';
import compose from 'ramda/src/compose';
import InputMask from 'react-input-mask';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  'field__input--error': {
    borderColor: theme.palette.error.main,
    borderWidth: '2px',
  },
  fieldExpiration: {
    fontSize: '15px',
    color: theme.palette.custom.lightBlack,
    '&.MuiInputBase-root': {
      '&.Mui-focused': {
        boxShadow: '0 0 10px #9ecaed',
      },
    },
  },
  fieldError: {
    color: theme.palette.custom.darkRed,
    fontFamily: 'Formula1-Regular',
    fontSize: '12px',
    letterSpacing: '.5px',
    fontWeight: 500,
  },
}));

const MaskedInput = (props) => (
  <InputMask
    alwaysShowMask
    mask="99/99"
    value={props.value}
    onChange={props.onChange}
    onFocus={(event) => {
      event.target.select();
    }}
    placeholder={props.placeholder}
    name={props.name}
    className={`field__input ${props.classes.fieldExpiration} ${
      props.form?.errors?.[props.name]
        ? props.classes['field__input--error']
        : ''
    }`}
    data-cy="field__input"
    maskChar="_"
  >
    {(inputProps) => <Input disableUnderline fullWidth {...inputProps} />}
  </InputMask>
);

function ExpirationField(props) {
  const { form = {}, name, fieldLabel } = props;
  const { values = {} } = form;
  const classes = useStyles();

  return (
    <Box className={`field field--${name}`} mb={4}>
      <InputLabel>
        <Typography variant="body1" color="textPrimary">
          {fieldLabel}
        </Typography>
      </InputLabel>
      <FormControl className={`field__form-control`}>
        <MaskedInput
          value={values[name] || ''}
          onChange={form.handleChange}
          name={name}
          form={form}
          classes={classes}
        />
      </FormControl>
      {form?.errors?.[name] ? (
        <Box ml={3} mt={2} className={`field__errorBox`}>
          <Typography
            className={classes.fieldError}
            variant="body2"
            color="error"
          >
            {form.errors[name]}
          </Typography>
        </Box>
      ) : null}
    </Box>
  );
}

export default compose(withTranslation())(ExpirationField);
