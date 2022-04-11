import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  loading: {
    backgroundColor: theme.palette.custom.darkTransparent,
    width: '100%',
    height: '100vh',
    position: 'fixed',
    top: '0',
    left: '0',
    zIndex: '999',
  },
  loading__loader: {
    background: `#15151e`,
    borderRadius: `10px`,
    height: `100px`,
    width: `100px`,
    position: `absolute`,
    top: `50%`,
    left: `50%`,
    marginTop: `-100px`,
    marginLeft: `-50px`,
  },
  loading__circle: {
    width: `40px`,
    height: `40px`,
    position: `relative`,
    margin: `auto`,
    top: `50%`,
    transform: `translateY(-50%)`,
  },
  loading__circleChild: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: '0',
    top: '0',
    '&:before': {
      content: '""',
      display: 'block',
      margin: '0 auto',
      width: '15%',
      height: '15%',
      backgroundColor: '#ffffff',
      borderRadius: '100%',
      animation: '$circleBounceDelay 1.2s infinite ease-in-out both',
    },
  },
  loading__circleChild1: {},
  loading__circleChild2: {
    transform: 'rotate(30deg)',
    '&:before': {
      animationDelay: '-1.1s',
    },
  },
  loading__circleChild3: {
    transform: 'rotate(60deg)',
    '&:before': {
      animationDelay: '-1s',
    },
  },
  loading__circleChild4: {
    transform: 'rotate(90deg)',
    '&:before': {
      animationDelay: '-0.9s',
    },
  },
  loading__circleChild5: {
    transform: 'rotate(120deg)',
    '&:before': {
      animationDelay: '-0.8s',
    },
  },
  loading__circleChild6: {
    transform: 'rotate(150deg)',
    '&:before': {
      animationDelay: '-0.7s',
    },
  },
  loading__circleChild7: {
    transform: 'rotate(180deg)',
    '&:before': {
      animationDelay: '-0.6s',
    },
  },
  loading__circleChild8: {
    transform: 'rotate(210deg)',
    '&:before': {
      animationDelay: '-0.5s',
    },
  },
  loading__circleChild9: {
    transform: 'rotate(240deg)',
    '&:before': {
      animationDelay: '-0.4s',
    },
  },
  loading__circleChild10: {
    transform: 'rotate(270deg)',
    '&:before': {
      animationDelay: '-0.3s',
    },
  },
  loading__circleChild11: {
    transform: 'rotate(300deg)',
    '&:before': {
      animationDelay: '-0.2s',
    },
  },
  loading__circleChild12: {
    transform: 'rotate(330deg)',
    '&:before': {
      animationDelay: '-0.1s',
    },
  },
  '@keyframes circleBounceDelay': {
    '0%': {
      transform: 'scale(0)',
    },
    '80%': {
      transform: 'scale(0)',
    },
    '100%': {
      transform: 'scale(0)',
    },
    '40%': {
      transform: 'scale(1)',
    },
  },
}));

function Loader(props) {
  const classes = useStyles();

  return (
    <div className={`loading ${classes.loading}`}>
      <div className={`loading__loader ${classes['loading__loader']}`}>
        <div className={`loading__circle ${classes['loading__circle']}`}>
          <div
            className={`loading__circleChild loading__circleChild1 ${classes['loading__circleChild']} ${classes['loading__circleChild1']}`}
          ></div>
          <div
            className={`loading__circleChild loading__circleChild2 ${classes['loading__circleChild']} ${classes['loading__circleChild2']}`}
          ></div>
          <div
            className={`loading__circleChild loading__circleChild3 ${classes['loading__circleChild']} ${classes['loading__circleChild3']}`}
          ></div>
          <div
            className={`loading__circleChild loading__circleChild4 ${classes['loading__circleChild']} ${classes['loading__circleChild4']}`}
          ></div>
          <div
            className={`loading__circleChild loading__circleChild5 ${classes['loading__circleChild']} ${classes['loading__circleChild5']}`}
          ></div>
          <div
            className={`loading__circleChild loading__circleChild6 ${classes['loading__circleChild']} ${classes['loading__circleChild6']}`}
          ></div>
          <div
            className={`loading__circleChild loading__circleChild7 ${classes['loading__circleChild']} ${classes['loading__circleChild7']}`}
          ></div>
          <div
            className={`loading__circleChild loading__circleChild8 ${classes['loading__circleChild']} ${classes['loading__circleChild8']}`}
          ></div>
          <div
            className={`loading__circleChild loading__circleChild9 ${classes['loading__circleChild']} ${classes['loading__circleChild9']}`}
          ></div>
          <div
            className={`loading__circleChild loading__circleChild10 ${classes['loading__circleChild']} ${classes['loading__circleChild10']}`}
          ></div>
          <div
            className={`loading__circleChild loading__circleChild11 ${classes['loading__circleChild']} ${classes['loading__circleChild11']}`}
          ></div>
          <div
            className={`loading__circleChild loading__circleChild12 ${classes['loading__circleChild']} ${classes['loading__circleChild12']}`}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
