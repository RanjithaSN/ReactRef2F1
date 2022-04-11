import { useTranslation, withTranslation } from 'react-i18next';
import {
  Typography,
  Box,
  InputLabel,
  Input,
  FormControl,
  InputAdornment,
  Link,
} from '@material-ui/core';
import { useState } from 'react';
import compose from 'ramda/src/compose';
import LocaleKeys from '../../../../../locales/keys';
import { makeStyles } from '@material-ui/core/styles';
import showIcon from '../../../../../images/icon-show.svg';
import hideIcon from '../../../../../images/icon-hide.svg';

const useStyles = makeStyles((theme) => ({
  'field__input--error': {
    borderColor: theme.palette.error.main,
    borderWidth: '2px',
  },
  password__requirement: {
    display: 'inline-block',
    marginRight: 26,
  },
  incorrect_password__requirement: {
    display: 'inline-block',
    color: theme.palette.error.main,
    marginRight: 26,
  },
  link: {
    borderStyle: 'none',
    marginRight: '12px',
  },
}));

function PasswordField(props) {
  const { form = {}, name, externalData, language, isRule, label } = props;
  const { values = {} } = form;
  const { t } = useTranslation();
  const classes = useStyles();
  const bullet = '\u25CF\xa0';
  const [showPassword, setShowPassword] = useState(false);

  const errors = form?.errors?.[name];

  const hasError = (field) => errors?.indexOf(field) > -1;
  const hasAnyError = () => errors?.length > 0;

  const displayRuleElements = [];

  const ruleContainer =
    externalData?.externalValidationRules?.fields?.[0]?.['password'];
  const rules = ruleContainer?.rules || [];

  rules.forEach((rule) => {
    const ruleDescription =
      rule.description[language] || rule.description['default'];
    displayRuleElements.push(
      <Typography
        key={rule.name}
        display="inline"
        className={
          hasError(rule.name)
            ? classes.incorrect_password__requirement
            : classes.password__requirement
        }
        variant="body2"
        color="textSecondary"
        data-cy={rule.name}
      >
        {bullet}
        {ruleDescription}
      </Typography>,
    );
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Box className={`field field--${name}`} mb={4}>
      <InputLabel>
        <Typography variant="body1" color="textPrimary">
          {label || t(LocaleKeys.registration.password)}
        </Typography>
      </InputLabel>
      <FormControl className={`field__form-control`}>
        <Input
          data-cy="field__input"
          type={showPassword ? 'text' : 'password'}
          className={`field__input ${
            form?.errors?.[name] ? classes['field__input--error'] : ''
          }`}
          disableUnderline
          placeholder={t(LocaleKeys.registration.password)}
          fullWidth
          name={name}
          onChange={form.handleChange}
          value={values[name] || ''}
          endAdornment={
            <InputAdornment position="end">
              <Link
                className={classes.link}
                underline="none"
                onClick={togglePasswordVisibility}
              >
                <img
                  src={showPassword ? showIcon : hideIcon}
                  alt={
                    showPassword
                      ? t(LocaleKeys.registration.hidePassword)
                      : t(LocaleKeys.registration.showPassword)
                  }
                />
              </Link>
            </InputAdornment>
          }
        />
      </FormControl>
      {!isRule ? (
        <Box ml={3} mt={3}>
          <Typography
            variant="body2"
            color="textSecondary"
            data-cy="password__requirement"
            className={
              hasAnyError()
                ? classes.incorrect_password__requirement
                : classes.password__requirement
            }
          >
            {t(LocaleKeys.registration.passwordRequirement)}
          </Typography>
          <br />
          {displayRuleElements}
        </Box>
      ) : form?.errors?.[name] ? (
        <Box ml={3} mt={3}>
          <Typography
            variant="body2"
            color="textSecondary"
            data-cy="password__requirement"
            className={
              hasAnyError()
                ? classes.incorrect_password__requirement
                : classes.password__requirement
            }
          >
            {form?.errors?.[name]}
          </Typography>
        </Box>
      ) : null}
    </Box>
  );
}

export default compose(withTranslation())(PasswordField);
