import { withTranslation, useTranslation } from 'react-i18next';
import { Box, Container, Typography, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import compose from 'ramda/src/compose';
import RegistrationForm from './components/registrationForm';
import { postMessage } from '../utils/postMessage';
import LocaleKeys from '../locales/keys';
import backArrow from '../images/icon-left.svg';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.common.white,
    borderRadius: '30px',
    border: `2px solid ${theme.palette.custom.frame}`,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  link: {
    '&:hover': {
      color: theme.palette.primary.main,
      cursor: 'pointer',
    },
  },
  backArrow: {
    float: 'left',
  },
  back: {
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));

function Registration(props) {
  const {
    profileType,
    showAlreadyHaveAccountMessage,
    showBackButton,
    leadSource,
    apiUrl,
    apiKey,
  } = props;

  const classes = useStyles();
  const { t } = useTranslation();

  if (profileType) {
    return (
      <Container className={classes.container} width={733}>
        <Box mt={10} ml={20} mr={20}>
          <Box>
            {showBackButton ? (
              <Link
                className={classes.link}
                underline="none"
                onClick={() => {
                  postMessage('module.backButton', {});
                }}
              >
                <Typography color="primary" className={classes.backArrow}>
                  <img src={backArrow} alt={t(LocaleKeys.registration.back)} />
                </Typography>

                <Typography
                  color="textPrimary"
                  variant="h6"
                  className={classes.back}
                >
                  {t(LocaleKeys.registration.back)}
                </Typography>
              </Link>
            ) : null}
          </Box>
          <RegistrationForm
            profileType={profileType}
            showAlreadyHaveAccountMessage={showAlreadyHaveAccountMessage}
            leadSource={leadSource}
            apiUrl={apiUrl}
            apiKey={apiKey}
          />
        </Box>
      </Container>
    );
  }
  return null;
}

export default compose(withTranslation())(Registration);
