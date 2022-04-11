/*
 * App Reducer
 */

// import { APP_CONST } from './app.actions';

// The initial state of the App
const initialState = {
  ui: {
    showGlobalLoader: false,
  },
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_GLOBAL_LOADER':
      return {
        ...state,
        ui: {
          ...state.ui,
          showGlobalLoader: action.payload,
        },
      };
    case 'SET_REDEEM_DETAILS':
      return {
        ...state,
        redeem: {
          ...state.redeem,
          redeemDetails: action.payload,
        },
      };
    case 'SET_GIFT_DETAILS':
      return {
        ...state,
        gift: {
          ...state.gift,
          giftDetails: action.payload,
        },
      };
    default:
      return state;
  }
};
export default appReducer;
