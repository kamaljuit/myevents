//This is the rootSaga where we can additional sagas as project complexity increases

import { all, call } from "redux-saga/effects";
import EventSagas from "./Events/Events.sagas";
import UserSagas from "./User/user.sagas";
function* rootSaga() {
  yield all([call(EventSagas), call(UserSagas)]);
}

export default rootSaga;
