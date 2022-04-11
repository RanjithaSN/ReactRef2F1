import compose from 'ramda/src/compose';
import { Avatar, Divider, Grid } from '@material-ui/core';
import { withTranslation, useTranslation } from 'react-i18next';
import Currency from 'react-currency-formatter';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import LocaleKeys from '../../../locales/keys';
import { makeStyles } from '@material-ui/core/styles';
import OrderHistoryListItemHelper from './OrderHistoryListItemHelper.jsx';

const useStyles = makeStyles((theme) => ({
  dividerBlack: {
    backgroundColor: 'black',
  },
  orderHistoryPanelBody: {
    paddingLeft: '15px',
    paddingRight: '15px',
  },
  orderList: {
    backgroundColor: theme.palette.common.white,
    borderRadius: '10px',
    border: `solid 2px ${theme.palette.custom.frame}`,
    marginBottom: '20px',
    padding: '20px',
  },
  orderHistoryRow: {
    paddingTop: '15px',
    paddingBottom: '3px',
    marginBottom: '5px',
  },
  pricingPlanItems: {
    padding: '0px 15px',
  },
  pricingPlanItemsValue: {
    textAlign: 'right',
  },
  ProductLogo: {
    marginBottom: '20px',
    marginTop: '10px',
    width: '219px',
    height: '25px',
  },
  totalAmount: {
    [theme.breakpoints.down('lg')]: {
      fontSize: '20px',
    },
  },
}));

const OrderHistoryListItem = ({ searchOrders }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const orderDate = moment(searchOrders?.Completed || searchOrders?.Ordered)
    .utc()
    .format('DD/MM/YYYY');

  const OrderHistoryListHeader = ({ productThumbnailUrl, pricingPlanUrl }) => (
    <Grid item container>
      <Grid item xs={6}>
        <Avatar
          alt="Product logo"
          src={productThumbnailUrl}
          variant="square"
          className={classes.ProductLogo}
        />
      </Grid>
      {pricingPlanUrl && (
        <Grid item xs={6}>
          <Avatar
            alt="Affiliate Partnership Logo"
            src={pricingPlanUrl}
            variant="square"
            className={classes.ProductLogo}
          />
        </Grid>
      )}
    </Grid>
  );

  return searchOrders?.OrderItems.map((orderItem) => (
    <Grid container className={classes.orderList} key={uuid()}>
      <Grid item container className={classes.orderHistoryPanelBody}>
        {orderItem.PricingPlan.SubscriptionBillingCycleName.toLowerCase().includes(
          'affiliateplan',
        ) ? (
          <OrderHistoryListHeader
            productThumbnailUrl={orderItem.Product.ThumbnailUrl}
            pricingPlanUrl={orderItem.PricingPlan.ImageUrl}
          />
        ) : (
          <OrderHistoryListHeader
            productThumbnailUrl={orderItem.Product.ThumbnailUrl}
          />
        )}
        <Grid item container className="orderHistoryListBody">
          <OrderHistoryListItemHelper
            classNameItemcontainer={classes.orderHistoryRow}
            columnSizeXs={12}
            columnSizeLg={6}
            classNameItemName={classes.pricingPlanItems}
            variant1="h5"
            ListItemName={t(LocaleKeys.orderHistory.orderType)}
            classNameItemValue={classes.pricingPlanItems}
            ListItemValue={orderItem.PricingPlan.Name}
          />
          <Divider className={classes.dividerBlack} />

          <OrderHistoryListItemHelper
            classNameItemcontainer={classes.orderHistoryRow}
            columnSizeXs={12}
            columnSizeLg={6}
            classNameItemName={classes.pricingPlanItems}
            ListItemName={t(LocaleKeys.orderHistory.orderDate)}
            classNameItemValue={classes.pricingPlanItems}
            ListItemValue={orderDate}
          />
          <Divider />

          <OrderHistoryListItemHelper
            classNameItemcontainer={classes.orderHistoryRow}
            columnSizeXs={12}
            columnSizeLg={6}
            classNameItemName={classes.pricingPlanItems}
            ListItemName={t(LocaleKeys.orderHistory.orderNumber)}
            classNameItemValue={classes.pricingPlanItems}
            ListItemValue={searchOrders.OrderNumber}
          />
          <Divider />

          <OrderHistoryListItemHelper
            classNameItemcontainer={classes.orderHistoryRow}
            columnSizeXs={12}
            columnSizeLg={6}
            classNameItemName={classes.pricingPlanItems}
            ListItemName={t(LocaleKeys.orderHistory.type)}
            classNameItemValue={classes.pricingPlanItems}
            ListItemValue={searchOrders.TypeName}
          />
          <Divider />

          <OrderHistoryListItemHelper
            classNameItemcontainer={classes.orderHistoryRow}
            columnSizeXs={12}
            columnSizeLg={6}
            classNameItemName={classes.pricingPlanItems}
            ListItemName={t(LocaleKeys.orderHistory.status)}
            classNameItemValue={classes.pricingPlanItems}
            ListItemValue={searchOrders.OrderStatusName}
          />
          <Divider />

          <OrderHistoryListItemHelper
            classNameItemcontainer={classes.orderHistoryRow}
            columnSizeXs={6}
            classNameItemName={classes.pricingPlanItems}
            ListItemName={t(LocaleKeys.orderHistory.subTotal)}
            classNameItemValue={`${classes.pricingPlanItems} ${classes.pricingPlanItemsValue}`}
            ListItemValue={
              <Currency
                quantity={searchOrders.Totals.SubTotalAmount}
                currency="USD"
              />
            }
          />
          <Divider />

          <OrderHistoryListItemHelper
            classNameItemcontainer={classes.orderHistoryRow}
            columnSizeXs={6}
            classNameItemName={classes.pricingPlanItems}
            ListItemName={t(LocaleKeys.orderHistory.tax)}
            classNameItemValue={`${classes.pricingPlanItems} ${classes.pricingPlanItemsValue}`}
            ListItemValue={
              <Currency
                quantity={searchOrders.Totals.TaxAmount}
                currency="USD"
              />
            }
          />
          <Divider className={classes.dividerBlack} />

          <OrderHistoryListItemHelper
            classNameItemcontainer={classes.orderHistoryRow}
            columnSizeXs={6}
            classNameItemName={classes.pricingPlanItems}
            variant1="h5"
            ListItemName={t(LocaleKeys.orderHistory.orderTotal)}
            classNameItemValue={`${classes.pricingPlanItems} ${classes.pricingPlanItemsValue} ${classes.totalAmount}`}
            variant2="h2"
            ListItemValue={
              <Currency
                quantity={searchOrders.Totals.NetTotalAmount}
                currency="USD"
              />
            }
          />
        </Grid>
      </Grid>
    </Grid>
  ));
};

OrderHistoryListItem.propTypes = {
  searchOrders: PropTypes.object.isRequired,
};

export default compose(withTranslation())(OrderHistoryListItem);
