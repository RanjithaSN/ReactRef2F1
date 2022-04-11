import { Grid, Typography } from '@material-ui/core';
import { withTranslation, useTranslation } from 'react-i18next';
import compose from 'ramda/src/compose';
import { makeStyles } from '@material-ui/core/styles';
import LocaleKeys from '../../../locales/keys';

const useStyles = makeStyles(() => ({
  noOrders: {
    textAlign: 'center',
  },
}));

const OrderHistoryNoOrders = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography className={classes.noOrders} variant="body1">
          {t(LocaleKeys.orderHistory.noOrders)}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default compose(withTranslation())(OrderHistoryNoOrders);
