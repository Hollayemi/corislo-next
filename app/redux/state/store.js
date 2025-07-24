import { configureStore } from '@reduxjs/toolkit';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import expireIn from 'redux-persist-transform-expire-in';
import { myReducers } from './combineReducers';

const expirationKey = 'VAWAUFLENCE';

const persistConfig = {
    key: 'k98dnhljhklkklknmlfkj;lzxarrwelnlknasfgvj;',
    version: 1,
    storage,
    setTimeout: 1000,
    transforms: [expireIn(6000 * 60 * 60, expirationKey, [])],
};

const persistedReducer = persistReducer(persistConfig, myReducers);

export const store = configureStore({
  reducer: {
    reducer: persistedReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredPaths: ["chatsContacts.0.chat.lastMessage.time"],
      },
    }),
});
