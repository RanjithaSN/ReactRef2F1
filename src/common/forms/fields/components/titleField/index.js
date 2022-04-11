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
  field__disabled: {
    color: theme.palette.text.disabled,
  },
}));

function TitleField(props) {
  const { form = {}, name, externalData } = props;
  const { values = {} } = form;
  const { t } = useTranslation();
  const classes = useStyles();
  const options = externalData?.titleRules?.data?.Codes;

  return (
    <Box className={`field field--${name}`} mb={4}>
      <InputLabel>
        <Typography variant="body1" color="textPrimary">
          {t(LocaleKeys.registration.title)}
        </Typography>
      </InputLabel>
      <FormControl className={`field__form-control`}>
        <Select
          data-cy="field__select"
          className={`field__select ${
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
                <MenuItem value={title.Value} key={index}>
                  {title.Name}
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

export default compose(withTranslation())(TitleField);
