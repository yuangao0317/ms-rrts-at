// https://redux-toolkit.js.org/tutorials/typescript

import { combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { useDispatch, useSelector } from 'react-redux';
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from 'src/features/auth/reducers/auth.reducer';
import logoutReducer from 'src/features/auth/reducers/logout.reducer';
import headerReducer from 'src/shared/headers/reducers/header.reducer';

import { api } from './api';

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['clientApi', '_persist']
};
export const combineReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  header: headerReducer,
  authUser: authReducer,
  logout: logoutReducer
});

export type RootState = ReturnType<typeof combineReducer>;
export const rootReducers: Reducer<RootState> = (state, action) => {
  // this is to reset the state to default when user logs out
  if (action.type === 'logout/logout') {
    state = {} as RootState;
  }
  return combineReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  devTools: true,
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(api.middleware)
});
setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;

// export const useAppDispatch: () => AppDispatch = useDispatch;
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
