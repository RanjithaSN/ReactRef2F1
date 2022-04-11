import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  pagination: {
    '& .MuiPaginationItem-textPrimary': {
      '&.Mui-selected': {
        backgroundColor: theme.palette.background.default,
        border: `solid 1px ${theme.palette.primary.main}`,
        color: theme.palette.text.primary,
      },
    },
    '& .MuiSvgIcon-root': {
      color: theme.palette.primary.main,
    },
  },
}));

const OrderHistoryPagination = ({ pageCount, handleChangePage }) => {
  const classes = useStyles();
  return (
    <Box className="ascendonOrderPager" pl={4} pr={4}>
      <Grid container direction="column" alignItems="flex-end">
        <Grid item xs={12}>
          <Pagination
            className={classes.pagination}
            count={pageCount}
            color="primary"
            onChange={(event, page) => handleChangePage(page)}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

OrderHistoryPagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired,
};

export default OrderHistoryPagination;
