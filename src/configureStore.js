/**
 * Create the store with dynamic reducers
 */
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { apiMiddleware, ascendonReducer } from 'ascendon-web-api';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import appReducer from './app/reducer';
import { readSession, removeSession } from './utils/common';

export default function buildStore(initialState = {}, history) {
  const middlewareItems = getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false,
  }).concat([
    thunk,
    apiMiddleware({
      readSession: readSession,
      removeSession: removeSession,
    }),
    /*your custom project middleware can go here*/
    routerMiddleware(history),
  ]);

  return configureStore({
    reducer: combineReducers({
      ascendon: ascendonReducer,
      // Your custom project reducer can go here.
      router: connectRouter(history),
      app: appReducer,
    }),
    middleware: middlewareItems,
  });
}
