import { useTranslation, withTranslation } from 'react-i18next';
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
  securityCodeLabel: {
    [theme.breakpoints.between('xs', 'md')]: {
      fontSize: '17px',
    },
  },
  fieldSecurityCode: {
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

function SecurityCodeField(props) {
  const { form = {}, name, fieldLabel, isDisabled, icon } = props;
  const { values = {} } = form;
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Box className={`field field--${name}`} mb={4}>
      <InputLabel style={{ display: 'flex' }}>
        <Typography
          variant="body1"
          color="textPrimary"
          className={classes.securityCodeLabel}
        >
          {fieldLabel}
        </Typography>
        {icon}
      </InputLabel>
      <FormControl className={`field__form-control`}>
        <Input
          data-cy="field__input"
          className={`field__input ${classes.fieldSecurityCode}  ${
            form?.errors?.[name] ? classes['field__input--error'] : ''
          }`}
          disableUnderline
          disabled={isDisabled}
          fullWidth
          name={name}
          onChange={form.handleChange}
          value={values[name] || ''}
          onInput={(e) => {
            e.target.value = e.target.value.slice(0, 4);
          }}
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

export default compose(withTranslation())(SecurityCodeField);
