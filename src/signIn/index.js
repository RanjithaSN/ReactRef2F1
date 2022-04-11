import { withTranslation, useTranslation } from 'react-i18next';
import { Box, Container, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import compose from 'ramda/src/compose';
import { postMessage } from '../utils/postMessage';
import LocaleKeys from '../locales/keys';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.common.white,
    borderRadius: '30px',
    border: `2px solid ${theme.palette.custom.frame}`,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  signInButton: {
    paddingLeft: '15px',
    paddingRight: '15px',
  },
}));

function SignIn(props) {
  const { profileType } = props;
  const classes = useStyles();
  const { t } = useTranslation();

  if (profileType) {
    return (
      <Container className={classes.container} width={733}>
        <Box pt={26} ml={20} mr={20}>
          <Typography variant="h2">
            {t(LocaleKeys.signIn.emailAlreadyRegistered)}
          </Typography>
        </Box>
        <Box mt={6} ml={20} mr={20}>
          <Typography variant="body1" color="textPrimary">
            {t(LocaleKeys.signIn.signInAccount)}
          </Typography>
        </Box>
        <Box mt={7} ml={20} mb={16}>
          <Button
            className={classes.signInButton}
            variant="contained"
            color="primary"
            onClick={() => {
              postMessage('module.loginButton', {});
            }}
          >
            {t(LocaleKeys.signIn.signIn)}
          </Button>
        </Box>
      </Container>
    );
  }
  return null;
}

export default compose(withTranslation())(SignIn);
