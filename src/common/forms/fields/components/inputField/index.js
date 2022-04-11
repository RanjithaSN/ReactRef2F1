import {
  Box,
  FormControl,
  Input,
  InputLabel,
  Typography,
} from '@material-ui/core';
import InputMask from 'react-input-mask';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  fieldInput: {
    color: theme.palette.custom.lightBlack,
    fontSize: '15px',
    '&.MuiInputBase-root': {
      '&.Mui-focused': {
        boxShadow: '0 0 10px #9ecaed',
      },
    },
  },
  'field__input--error': {
    borderColor: theme.palette.error.main,
    borderWidth: '2px',
  },
  fieldError: {
    fontFamily: 'Formula1-Regular',
    fontSize: '12px',
    letterSpacing: '.5px',
    fontWeight: 500,
  },
}));

const InputField = (props) => {
  const { id, maxLength, name, form = {}, label, required, mask } = props;
  const { values = {} } = form;
  const classes = useStyles();

  return (
    <Box className={`field field--${name}`} mb={4}>
      <InputLabel htmlFor={id}>
        <Typography variant="body1" color="textPrimary">
          {label}
        </Typography>
      </InputLabel>
      <FormControl className={`field__form-control`}>
        {!mask ? (
          <Input
            data-cy="field__input"
            className={`field__input ${classes.fieldInput}  ${
              form?.errors?.[name] ? classes['field__input--error'] : ''
            }`}
            type="text"
            id={id}
            disableUnderline
            fullWidth
            name={name}
            value={values[name]}
            onChange={form.handleChange}
            required={required}
            onInput={(e) => {
              e.target.value = e.target.value.slice(0, maxLength);
            }}
          />
        ) : (
          <InputMask
            alwaysShowMask={false}
            mask={mask}
            onChange={form.handleChange}
            value={values[name]}
            name={name}
            form={form}
            className={`field__input ${classes.fieldInput} ${
              form?.errors?.[props.name] ? classes['field__input--error'] : ''
            }`}
            maskChar="_"
          >
            {(inputProps) => (
              <Input disableUnderline fullWidth {...inputProps} />
            )}
          </InputMask>
        )}
      </FormControl>
      {form?.errors?.[name] ? (
        <Box ml={3} mt={2} className={`field__errorBox`}>
          <Typography
            variant="body2"
            color="error"
            className={classes.fieldError}
          >
            {form.errors[name]}
          </Typography>
        </Box>
      ) : null}
    </Box>
  );
};

export default InputField;
