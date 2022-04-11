import { Button, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const ButtonAction = (props) => {
  const {
    size,
    buttonClasses,
    typographyClasses,
    variant,
    color,
    handler,
    label,
  } = props;

  const typographyStyle = typographyClasses ? typographyClasses : null;

  return (
    <Button
      size={size}
      className={buttonClasses}
      variant={variant}
      color={color}
      disableElevation
      disableRipple
      onClick={() => handler()}
    >
      <Typography variant="button" className={typographyStyle}>
        {label}
      </Typography>
    </Button>
  );
};

ButtonAction.propTypes = {
  size: PropTypes.string.isRequired,
  buttonClasses: PropTypes.string,
  typographyClasses: PropTypes.string,
  variant: PropTypes.string,
  color: PropTypes.string,
  handler: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default ButtonAction;
