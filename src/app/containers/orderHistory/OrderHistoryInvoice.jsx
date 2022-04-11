import compose from 'ramda/src/compose';
import { Avatar, Divider, Grid, Typography } from '@material-ui/core';
import { withTranslation, useTranslation } from 'react-i18next';
import Currency from 'react-currency-formatter';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import LocaleKeys from '../../../locales/keys';
import moment from 'moment';
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
  orderListItem: {
    borderBottom: '1px solid #15151e',
    marginBottom: '5px',
    letterSpacing: '0.2px',
    paddingTop: '15px',
    paddingBottom: '3px',
  },
  invoiceSupplier: {
    marginBottom: '5px',
    borderBottom: '1px solid #d0d0d2',
    paddingTop: '15px',
    paddingBottom: '3px',
  },
  invoiceAddress: {
    whiteSpace: 'pre-line',
  },
  inVoiceDate: {
    paddingLeft: '15px',
    paddingRight: '15px',
  },
  invoiceOrderIdValue: {
    paddingLeft: '15px',
    paddingRight: '15px',
  },
  orderHistoryRow: {
    paddingTop: '15px',
    paddingBottom: '3px',
    marginBottom: '5px',
  },
  orderHistoryRowTax: {
    marginLeft: '24px',
  },
  invoicePlanItems: {
    padding: '0px 15px',
  },
  invoicePlanItemsValue: {
    textAlign: 'right',
  },
  ProductLogo: {
    width: '219px',
    height: '25px',
  },
  totalAmount: {
    [theme.breakpoints.down('lg')]: {
      fontSize: '20px',
    },
  },
}));

const OrderHistoryInvoice = ({ retrieveOrder }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const invoiceDate = moment(retrieveOrder?.Completed)
    .utc()
    .format('DD MMMM YYYY');

  if (retrieveOrder) {
    var totalReturnedAmount =
      retrieveOrder.Totals && retrieveOrder.Totals.TotalReturnAmount
        ? retrieveOrder.Totals.TotalReturnAmount
        : 0;
    var returnAmount =
      retrieveOrder.Totals && retrieveOrder.Totals.ReturnAmount
        ? retrieveOrder.Totals.ReturnAmount
        : 0;
    var hasRefundTaxAmount =
      totalReturnedAmount !== 0 &&
      Math.abs(totalReturnedAmount) > Math.abs(returnAmount);
    var refundTaxAmount = hasRefundTaxAmount
      ? Math.abs(totalReturnedAmount - returnAmount)
      : 0;
  }

  const OrderHistoryListHeader = ({ productThumbnailUrl }) => (
    <Grid
      item
      container
      className={`orderHistoryListHeader ${classes.orderHistoryPanelBody} ${classes.orderHistoryRow}`}
    >
      <Grid item xs={6} className={classes.invoicePlanItems}>
        <Avatar
          alt="logo"
          src={productThumbnailUrl}
          variant="square"
          className={classes.ProductLogo}
        />
      </Grid>

      <Grid item sm={6}>
        <Typography variant="h5" className={classes.invoicePlanItems}>
          {t(LocaleKeys.orderHistory.taxInvoice)}
        </Typography>
      </Grid>
    </Grid>
  );

  return retrieveOrder?.Items.map((orderItem) => (
    <Grid container className={classes.orderList} key={uuid()}>
      <OrderHistoryListHeader
        productThumbnailUrl={orderItem.Product.ThumbnailUrl}
      />
      <Grid
        item
        container
        className={`orderHistoryListBody ${classes.orderHistoryPanelBody}`}
      >
        <OrderHistoryListItemHelper
          classNameItemcontainer={classes.orderListItem}
          classNameItemName={classes.inVoiceDate}
          variant1="h5"
          ListItemName={invoiceDate}
          classNameItemValue={classes.invoiceOrderIdValue}
          variant2="h5"
          ListItemValue={`#${retrieveOrder.OrderNumber}`}
        />
        <OrderHistoryListItemHelper
          classNameItemcontainer={classes.invoiceSupplier}
          columnSizeXs={12}
          columnSizeLg={12}
          classNameItemName="invoiceSupplierName"
          variant1="h5"
          ListItemName={t(LocaleKeys.orderHistory.f1DigitalManagement)}
          classNameItemValue={classes.invoiceAddress}
          variant2="body1"
          ListItemValue={t(LocaleKeys.orderHistory.f1Address)}
        />
        <OrderHistoryListItemHelper
          classNameItemcontainer={classes.orderHistoryRow}
          classNameItemName={classes.invoicePlanItems}
          ListItemName={t(LocaleKeys.orderHistory.orderType)}
          classNameItemValue={`${classes.invoicePlanItems} ${classes.invoicePlanItemsValue}`}
          ListItemValue={orderItem.PricingPlan.Name}
        />
        <OrderHistoryListItemHelper
          classNameItemcontainer={classes.orderHistoryRow}
          classNameItemName={classes.invoicePlanItems}
          ListItemName={t(LocaleKeys.orderHistory.type)}
          classNameItemValue={`${classes.invoicePlanItems} ${classes.invoicePlanItemsValue}`}
          ListItemValue={retrieveOrder.TypeName}
        />
        <OrderHistoryListItemHelper
          classNameItemcontainer={classes.orderHistoryRow}
          classNameItemName={classes.invoicePlanItems}
          ListItemName={t(LocaleKeys.orderHistory.originalAmount)}
          classNameItemValue={`${classes.invoicePlanItems} ${classes.invoicePlanItemsValue}`}
          ListItemValue={
            <Currency quantity={orderItem.GrossAmount} currency="USD" />
          }
        />
        <OrderHistoryListItemHelper
          classNameItemcontainer={classes.orderHistoryRow}
          classNameItemName={classes.invoicePlanItems}
          ListItemName={t(LocaleKeys.orderHistory.discountApplied)}
          classNameItemValue={`${classes.invoicePlanItems} ${classes.invoicePlanItemsValue}`}
          ListItemValue={
            <Currency
              quantity={retrieveOrder.Totals.DiscountAmount}
              currency="USD"
            />
          }
        />
        <Divider className={classes.dividerBlack} />
        <OrderHistoryListItemHelper
          classNameItemcontainer={classes.orderHistoryRow}
          classNameItemName={classes.invoicePlanItems}
          ListItemName={t(LocaleKeys.orderHistory.refundAmount)}
          classNameItemValue={`${classes.invoicePlanItems} ${classes.invoicePlanItemsValue}`}
          ListItemValue={
            <Currency
              quantity={retrieveOrder.Totals.TotalReturnAmount}
              currency="USD"
            />
          }
        />
        <OrderHistoryListItemHelper
          classNameItemcontainer={classes.orderHistoryRow}
          classNameItemName={classes.invoicePlanItems}
          ListItemName={t(LocaleKeys.orderHistory.subTotalAmount)}
          classNameItemValue={`${classes.invoicePlanItems} ${classes.invoicePlanItemsValue}`}
          ListItemValue={
            <Currency
              quantity={retrieveOrder.Totals.SubTotalAmount}
              currency="USD"
            />
          }
        />
        {retrieveOrder.TaxItems &&
          retrieveOrder.TaxItems.length &&
          retrieveOrder.TaxItems.map((TaxItem) => (
            <OrderHistoryListItemHelper
              key={uuid()}
              classNameItemcontainer={`${classes.orderHistoryRow} ${classes.orderHistoryRowTax}`}
              classNameItemName={classes.invoicePlanItems}
              ListItemName={TaxItem.Name}
              classNameItemValue={`${classes.invoicePlanItems} ${classes.invoicePlanItemsValue}`}
              ListItemValue={
                <Currency quantity={TaxItem.Amount} currency="USD" />
              }
            />
          ))}
        <OrderHistoryListItemHelper
          classNameItemcontainer={`${classes.orderHistoryRow} ${classes.orderHistoryRowTax}`}
          classNameItemName={classes.invoicePlanItems}
          ListItemName={t(LocaleKeys.orderHistory.taxRefund)}
          classNameItemValue={`${classes.invoicePlanItems} ${classes.invoicePlanItemsValue}`}
          ListItemValue={<Currency quantity={refundTaxAmount} currency="USD" />}
        />
        <OrderHistoryListItemHelper
          classNameItemcontainer={classes.orderHistoryRow}
          classNameItemName={classes.invoicePlanItems}
          ListItemName={t(LocaleKeys.orderHistory.tax)}
          classNameItemValue={`${classes.invoicePlanItems} ${classes.invoicePlanItemsValue}`}
          ListItemValue={
            <Currency
              quantity={retrieveOrder.Totals.TaxAmount}
              currency="USD"
            />
          }
        />
        <Divider className={classes.dividerBlack} />
        <OrderHistoryListItemHelper
          classNameItemcontainer={classes.orderHistoryRow}
          classNameItemName={classes.invoicePlanItems}
          variant1="h5"
          ListItemName={t(LocaleKeys.orderHistory.totalAmount)}
          classNameItemValue={`${classes.invoicePlanItems} ${classes.invoicePlanItemsValue} ${classes.totalAmount}`}
          variant2="h2"
          ListItemValue={
            <Currency
              quantity={retrieveOrder.Totals.NetTotalAmount}
              currency="USD"
            />
          }
        />
      </Grid>
    </Grid>
  ));
};

OrderHistoryInvoice.propTypes = {
  retrieveOrder: PropTypes.object.isRequired,
};

export default compose(withTranslation())(OrderHistoryInvoice);
