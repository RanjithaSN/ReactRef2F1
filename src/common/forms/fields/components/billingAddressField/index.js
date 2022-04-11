import { useTranslation, withTranslation } from 'react-i18next';
import {
  Box,
  Typography,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from '@material-ui/core';
import compose from 'ramda/src/compose';
import LocaleKeys from '../../../../../locales/keys';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  'field__select--error': {
    borderColor: theme.palette.error.main,
    borderWidth: '2px',
  },
  fieldSelect: {
    fontSize: '15px',
    color: theme.palette.custom.lightBlack,
    '&.MuiInputBase-root': {
      '&.Mui-focused': {
        boxShadow: '0 0 10px #9ecaed',
      },
    },
  },
  field__disabled: {
    color: theme.palette.text.disabled,
  },
}));

function BillingAddressField(props) {
  const {
    form = {},
    name,
    externalData = [],
    fieldLabel,
    billingAddressId,
    billingIdHandler,
  } = props;
  const { values = {} } = form;
  const { t } = useTranslation();
  const classes = useStyles();
  const options = externalData;

  return (
    <Box className={`field field--${name}`} mb={4}>
      <InputLabel>
        <Typography variant="body1" color="textPrimary">
          {fieldLabel}
        </Typography>
      </InputLabel>
      <FormControl className={`field__form-control`}>
        <Select
          data-cy="field__select"
          className={` field__select ${classes.fieldSelect} ${
            form?.errors?.[name] ? classes['field__select--error'] : ''
          } ${
            !values[name] || values[name] === 'Select'
              ? classes['field__disabled']
              : ''
          }`}
          disableUnderline
          name={name}
          value={values[name] || 'Select'}
          onChange={(event) => {
            form.setFieldValue(name, event.target.value);
            billingAddressId && billingIdHandler();
          }}
        >
          <MenuItem
            value="Select"
            disabled
            classes={{ root: classes['field__disabled'] }}
          >
            {t(LocaleKeys.registration.select)}
          </MenuItem>
          {options
            ? options.map((title, index) => (
                <MenuItem value={title.Id} key={index}>
                  {title.displayName}
                </MenuItem>
              ))
            : []}
        </Select>
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

export default compose(withTranslation())(BillingAddressField);
