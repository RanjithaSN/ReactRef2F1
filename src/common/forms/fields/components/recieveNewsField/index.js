import { useTranslation, withTranslation } from 'react-i18next';
import {
  Box,
  Grid,
  InputLabel,
  Typography,
  Checkbox,
  FormControl,
} from '@material-ui/core';
import compose from 'ramda/src/compose';
import LocaleKeys from '../../../../../locales/keys';
import sanitizeHtml from 'sanitize-html';

function RecieveNewsField(props) {
  const { form = {}, name } = props;
  const { values = {} } = form;
  const { t } = useTranslation();

  return (
    <Box className={`field field--${name} `} mt={3}>
      <Box component={Grid} container>
        <Box component={Grid} item xs={1}>
          <FormControl className={`field__form-control`}>
            <Checkbox
              data-cy="field__checkbox"
              color="secondary"
              className={`field__checkbox`}
              name={name}
              checked={values[name] || false}
              onChange={(e) => {
                form.setFieldValue(name, !values[name]);
              }}
            />
          </FormControl>
        </Box>
        <Box component={Grid} item xs={11}>
          <InputLabel>
            <Typography variant="body2" color="textPrimary">
              <span
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(
                    t(LocaleKeys.registration.recieveLatestNews),
                  ),
                }}
              />
            </Typography>
          </InputLabel>
        </Box>
        <Box component={Grid} item xs={12}>
          {form?.errors?.[name] ? (
            <Box ml={3} mt={2} className={`field__errorBox`}>
              <Typography variant="body2" color="error">
                {form.errors[name]}
              </Typography>
            </Box>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
}

export default compose(withTranslation())(RecieveNewsField);
