//The global redux store along with peristedStore
import { createStore, applyMiddleware } from "redux";
import reduxLogger from "redux-logger";
import rootReducer from "./rootReducer";
import createSaga from "redux-saga";
import { persistStore } from "redux-persist";
import rootSaga from "./rootSaga";
const sagaMiddleware = createSaga();

const middlewares = [reduxLogger, sagaMiddleware];

const store = createStore(rootReducer, applyMiddleware(...middlewares));
const persistedStore = persistStore(store);
sagaMiddleware.run(rootSaga);
export default {
  store,
  persistedStore
};
