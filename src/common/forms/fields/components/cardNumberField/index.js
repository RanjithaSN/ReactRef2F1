import { withTranslation } from 'react-i18next';
import {
  Typography,
  Box,
  InputLabel,
  Input,
  FormControl,
} from '@material-ui/core';
import compose from 'ramda/src/compose';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  'field__input--error': {
    borderColor: theme.palette.error.main,
    borderWidth: '2px',
  },
  disabledNode: {
    cursor: 'not-allowed',
  },
  fieldCardNumber: {
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

function CardNumberField(props) {
  const { form = {}, name, fieldLabel, isDisabled } = props;
  const { values = {} } = form;
  const classes = useStyles();
  const addExternalClassesForInput = (element, classNameNode) => {
    if (!element.className.includes(classNameNode)) {
      element.className = `${element.className} ${classes[classNameNode]}`;
    }
  };
  return (
    <Box className={`field field--${name} ${classes.input}`} mb={4}>
      <InputLabel>
        <Typography variant="body1" color="textPrimary">
          {fieldLabel}
        </Typography>
      </InputLabel>
      <FormControl className={`field__form-control`}>
        <Input
          type="number"
          data-cy="field__input"
          className={`field__input ${classes.fieldCardNumber} ${
            form?.errors?.[name] ? classes['field__input--error'] : ''
          }`}
          inputRef={(el) => {
            if (el?.className && isDisabled) {
              addExternalClassesForInput(el, 'disabledNode');
            }
          }}
          disableUnderline
          disabled={isDisabled}
          fullWidth
          name={name}
          onChange={form.handleChange}
          value={values[name] || ''}
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

export default compose(withTranslation())(CardNumberField);
