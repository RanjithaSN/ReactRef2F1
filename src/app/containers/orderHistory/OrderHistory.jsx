import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withTranslation, useTranslation } from 'react-i18next';
import compose from 'ramda/src/compose';
import {
  Box,
  Container,
  Divider,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import { setGlobalLoader } from '../../actions';
import GlobalLoader from '../../../common/loader';
import { makeStyles } from '@material-ui/core/styles';
import LocaleKeys from '../../../locales/keys';
import useSearchOrders from '../../../common/hooks/useSearchOrder';
import useRetrieveOrder from '../../../common/hooks/useRetrieveOrder';
import OrderHistoryNoOrders from './OrderHistoryNoOrders.jsx';
import OrderHistoryInvoice from './OrderHistoryInvoice.jsx';
import OrderHistoryListItem from './OrderHistoryListItem.jsx';
import OrderHistoryPagination from './OrderHistoryPagination.jsx';

const useStyles = makeStyles((theme) => ({
  f1AccountSite: {
    margin: '20px auto',
    minHeight: '770px',
    padding: '10px',
  },
  divider: {
    margin: '20px 0px 5px',
  },
  orderHistoryPanel: {
    marginBottom: '20px',
  },
  orderHistoryTitle: {
    textTransform: 'uppercase',
    [theme.breakpoints.up('lg')]: {
      fontSize: '32px',
    },
  },
  orderHistoryPanelBody: {
    padding: '15px 15px 15px 0',
  },
  orderHistoryFilters: {
    marginBottom: '20px',
  },
  orderHistoryDropdown: {
    backgroundColor: theme.palette.common.white,
    borderRadius: '10px',
    marginBottom: '30px',
    width: 'calc(100% / 3)',
    [theme.breakpoints.down('sm')]: {
      width: '50%',
    },
  },
  menuItem: {
    minHeight: 'unset',
    paddingTop: '0px',
    paddingBottom: '0px',
  },
}));

const menus = [
  {
    Value: 1,
    name: `${LocaleKeys.orderHistory.last30Days}`,
  },
  {
    Value: 6,
    name: `${LocaleKeys.orderHistory.past6Months}`,
  },
  {
    Value: 12,
    name: `${LocaleKeys.orderHistory.past12Months}`,
  },
  {
    Value: -1,
    name: `${LocaleKeys.orderHistory.all}`,
  },
];

function OrderHistory() {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [searchOrdersResponse, searchOrdersFault, requestsearchOrders] =
    useSearchOrders();
  const [retrieveOrderUiModel, retrieveOrderFault, requestRetrieveOrder] =
    useRetrieveOrder();

  //Selectors
  const showGlobalLoader = useSelector(
    (state) => state.app.ui.showGlobalLoader || false,
  );

  const [orderHistoryDateRange, setOrderHistoryDateRange] = useState(1);
  const [searchOrders, setSearchOrders] = useState();
  const [pageCount, setPageCount] = useState();
  const [selectedPage, setSelectedPage] = useState(1);
  const [taxAmountStatus, setTaxAmountStatus] = useState(false);
  const [retrieveOrder, setRetrieveOrder] = useState();
  const [errors, setErrors] = useState([]);
  const requestFaults = [searchOrdersFault, retrieveOrderFault];

  useEffect(() => {
    dispatch(setGlobalLoader(true));
    requestsearchOrders(orderHistoryDateRange, selectedPage);
  }, [orderHistoryDateRange, selectedPage]);

  useEffect(() => {
    const filterFaults = requestFaults.filter((fault) => !!fault);
    if (filterFaults.length) {
      const currentFault = filterFaults[0];
      setErrors([...errors, currentFault]);
      dispatch(setGlobalLoader(false));
    }
  }, [...requestFaults]);

  useEffect(() => {
    searchOrdersResponse &&
      searchOrdersResponse?.Orders.length !== 0 &&
      setSearchOrders(searchOrdersResponse?.Orders[0]);

    searchOrdersResponse && dispatch(setGlobalLoader(false));

    searchOrdersResponse?.PageCount &&
      setPageCount(searchOrdersResponse.PageCount);
  }, [searchOrdersResponse]);

  useEffect(() => {
    searchOrders &&
      searchOrders.Totals &&
      searchOrders.Totals.TaxAmount &&
      setTaxAmountStatus(Boolean(searchOrders.Totals.TaxAmount));
  }, [searchOrders]);

  useEffect(() => {
    if (searchOrders && taxAmountStatus) {
      requestRetrieveOrder({ OrderId: searchOrders.Id });
      dispatch(setGlobalLoader(true));
    }
  }, [searchOrders, taxAmountStatus]);

  useEffect(() => {
    if (retrieveOrderUiModel) {
      setRetrieveOrder(retrieveOrderUiModel.Order);
      dispatch(setGlobalLoader(false));
    }
  }, [retrieveOrderUiModel]);

  const onChangeDropdownOption = (event) => {
    const { value } = event.target;
    setOrderHistoryDateRange(value);
  };

  const handleChangePage = (page) => {
    setSelectedPage(Number(page));
    setSearchOrders(undefined);
    setTaxAmountStatus((prevState) => prevState && !prevState);
    setRetrieveOrder(false);
  };

  return (
    <Container className={`orderHistoryContainer ${classes.f1AccountSite}`}>
      {showGlobalLoader && <GlobalLoader />}

      {errors && errors.length ? (
        <Box mt={40}>
          <Typography variant="body1">{errors[0]}</Typography>
        </Box>
      ) : (
        <Box className={classes.orderHistoryPanel}>
          <Typography variant="h2" className={classes.orderHistoryTitle}>
            {t(LocaleKeys.orderHistory.orderHistoryHeader)}
          </Typography>
          <Divider className={classes.divider} />
          <Box
            className={`${classes.orderHistoryPanel} ${classes.orderHistoryPanelBody}`}
          >
            <Box>
              <Box className={classes.orderHistoryFilters}>
                <FormControl>
                  <Select
                    className={classes.orderHistoryDropdown}
                    onChange={onChangeDropdownOption}
                    value={orderHistoryDateRange}
                    variant="outlined"
                    MenuProps={{
                      getContentAnchorEl: null,
                      anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                      },
                    }}
                  >
                    {menus.map((menu) => (
                      <MenuItem
                        key={menu.Value}
                        value={menu.Value}
                        className={classes.menuItem}
                      >
                        {t(menu.name)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Box>
              {searchOrdersResponse &&
                searchOrdersResponse?.Orders.length === 0 && (
                  <OrderHistoryNoOrders />
                )}

              {searchOrders && retrieveOrder && (
                <OrderHistoryInvoice retrieveOrder={retrieveOrder} />
              )}

              {searchOrders &&
                taxAmountStatus === false &&
                retrieveOrder === false && (
                  <OrderHistoryListItem searchOrders={searchOrders} />
                )}
            </Box>

            {pageCount && pageCount > 1 && (
              <OrderHistoryPagination
                pageCount={pageCount}
                handleChangePage={handleChangePage}
              />
            )}
          </Box>
        </Box>
      )}
    </Container>
  );
}

export default compose(withTranslation())(OrderHistory);
