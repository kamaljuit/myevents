import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import EventReducer from "../Redux/Events/Events.reducer";
import UserReducer from "../Redux/User/user.reducer";
//Enabling persistance of the redux state in local storage

const persistConfig = {
  key: "root",
  storage
};

const rootReducer = combineReducers({
  Event: EventReducer,
  User: UserReducer
});

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export default persistedReducer;

export default rootReducer;
