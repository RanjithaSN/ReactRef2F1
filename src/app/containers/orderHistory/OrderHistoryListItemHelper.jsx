import compose from 'ramda/src/compose';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import { withTranslation } from 'react-i18next';

const OrderHistoryListItemHelper = ({
  classNameItemcontainer,
  columnSizeXs,
  columnSizeLg,
  classNameItemName,
  variant1,
  ListItemName,
  classNameItemValue,
  variant2,
  ListItemValue,
}) => {
  const columnSizeXsValue = columnSizeXs ? columnSizeXs : 6;
  const columnSizeLgValue = columnSizeLg ? columnSizeLg : 6;

  const variantItemName = variant1 ? variant1 : 'body1';
  const variantItemValue = variant2 ? variant2 : 'h5';

  return (
    <Grid item container className={classNameItemcontainer}>
      <Grid item xs={columnSizeXsValue} lg={columnSizeLgValue}>
        <Typography variant={variantItemName} className={classNameItemName}>
          {ListItemName}
        </Typography>
      </Grid>
      <Grid item xs={columnSizeXsValue} lg={columnSizeLgValue}>
        <Typography variant={variantItemValue} className={classNameItemValue}>
          {ListItemValue}
        </Typography>
      </Grid>
    </Grid>
  );
};

OrderHistoryListItemHelper.propTypes = {
  classNameItemcontainer: PropTypes.string,
  columnSizeXs: PropTypes.number,
  columnSizeLg: PropTypes.number,
  classNameItemName: PropTypes.string,
  variant1: PropTypes.string,
  ListItemName: PropTypes.string,
  classNameItemValue: PropTypes.string,
  variant2: PropTypes.string,
  ListItemValue: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default compose(withTranslation())(OrderHistoryListItemHelper);
