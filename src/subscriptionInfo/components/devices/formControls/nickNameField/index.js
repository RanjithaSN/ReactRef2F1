import { useEffect, useRef } from 'react';
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
  deviceNickName: {
    fontSize: '15px',
    color: theme.palette.text.secondary,
    '&.MuiInputBase-root': {
      '&.Mui-focused': {
        boxShadow: '0 0 10px #9ecaed',
      },
    },
  },
}));

function NickNameField(props) {
  const { form = {}, name } = props;
  const { values = {} } = form;
  const classes = useStyles();
  const { t } = useTranslation();

  const elementInputRef = useRef(null);

  useEffect(() => {
    if (!form.isValid && form.submitCount !== 0 && form.isSubmitting) {
      elementInputRef && elementInputRef.current.focus();
    }
  }, [form.submitCount, form.isValid, form.errors, form.isSubmitting]);

  return (
    <Box className={`field field--${name}`}>
      <InputLabel>
        <Typography variant="body1" color="textPrimary">
          {t(LocaleKeys.subscriptionInfo.devices.nickName)}
        </Typography>
      </InputLabel>
      <FormControl className={`field__form-control`}>
        <Input
          className={`field__input ${
            form?.errors?.[name] ? classes['field__input--error'] : ''
          } ${classes.deviceNickName}`}
          disableUnderline
          name={name}
          onChange={form.handleChange}
          value={values.NickName}
          inputRef={elementInputRef}
          autoFocus={true}
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

export default compose(withTranslation())(NickNameField);
