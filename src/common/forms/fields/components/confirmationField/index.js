import { useTranslation, withTranslation } from 'react-i18next';
import { Box, Typography, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import compose from 'ramda/src/compose';
import LocaleKeys from '../../../../../locales/keys';
import { postMessage } from '../../../../../utils/postMessage';

const useStyles = makeStyles((theme) => ({
  link: {
    '&:hover': {
      color: theme.palette.primary.main,
      cursor: 'pointer',
    },
  },
}));

function ConfirmationField(props) {
  const { name, label } = props;
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Box className={`field field--${name}`} mt={2}>
      <Typography variant="body2" color="textPrimary">
        <span>
          {label || t(LocaleKeys.registration.confirmationTCPrelude)}
          <Link
            className={classes.link}
            color="textPrimary"
            underline="none"
            onClick={() => {
              postMessage('module.termsAndConditionsButton', {});
            }}
          >
            {t(LocaleKeys.registration.termsAndConditionsLink)}
          </Link>
          {t(LocaleKeys.registration.confirmationTCInterlude)}
          <Link
            className={classes.link}
            color="textPrimary"
            underline="none"
            onClick={() => {
              postMessage('module.privayPolicyButton', {});
            }}
          >
            {t(LocaleKeys.registration.privacyPolicyLink)}
          </Link>
          {t(LocaleKeys.registration.confirmationTCPostlude)}
        </span>
      </Typography>
    </Box>
  );
}

export default compose(withTranslation())(ConfirmationField);
