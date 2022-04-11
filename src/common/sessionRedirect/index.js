import { useEffect } from 'react';
import { postMessage } from '../../utils/postMessage';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Typography, Box } from '@material-ui/core';

function SessionRedirect(props) {
  const history = useHistory();
  const clientSettings = useSelector((state) => state.ascendon.settings);
  postMessage('session.expired', clientSettings);

  useEffect(() => {
    setTimeout(function () {
      history.push('/login');
    }, 1000);
  }, []);

  return (
    <Box>
      <Typography variant="h2">Session Expired.</Typography>
      <Typography variant="body1" color="textPrimary">
        Redirecting to Login Page...
      </Typography>
    </Box>
  );
}

export default SessionRedirect;
export { SessionRedirect };
