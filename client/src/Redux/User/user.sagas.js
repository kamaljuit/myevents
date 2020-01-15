/**
 * User Saga to log-in and log-out the user and handle important Redux state
 * to maintain the authentication of the user
 * Only responsible for the API call and not any validataion or data sanitization
 */
import { takeLatest, put, all } from "redux-saga/effects";
import {
  setCurrentUser,
  setLoginError,
  logoutUser,
  setSignupError
} from "./user.action";

import { getAllEvents, getSelfEvents } from "../Events/Events.action";

import UserTypes from "./user.types";
const fetch = window.fetch;
function* loginUserAsync(action) {
  try {
    const rawResponse = yield fetch(
      // `${process.env.REACT_APP_API_URL}/api/user/login`,
      `/api/v1/user/login`,

      {
        method: "POST",

        body: JSON.stringify({
          email: action.payload.email,
          password: action.payload.password
        }),
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        mode: "same-origin"
      }
    );
    var response = yield rawResponse.json();
    if (rawResponse.ok) {
      const user = response.data;

      yield put(setCurrentUser(user));
      yield put(getAllEvents());
      yield put(getSelfEvents());
    } else {
      yield put(logoutUser());
      yield put(setLoginError(response.message));
    }
  } catch (error) {}
}

function* signupUserAsync(action) {
  console.log("Hello");
  try {
    const rawResponse = yield fetch(
      // `${process.env.REACT_APP_API_URL}/api/user/signup`,
      `/api/v1/user/signup`,

      {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          name: action.payload.name,
          email: action.payload.email,
          password: action.payload.password
        }),
        mode: "same-origin",
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        }
      }
    );
    console.log("Hi");
    var response = yield rawResponse.json();
    if (rawResponse.ok) {
      const user = response.data;

      yield put(setCurrentUser(user));
      yield put(getAllEvents());
      yield put(getSelfEvents());
    } else {
      yield put(logoutUser());
      yield put(setSignupError(response.message));
    }
  } catch (error) {
    console.log(error);
  }
}

function* logoutUserAsync() {
  try {
    const response = yield fetch(
      // `${process.env.REACT_APP_API_URL}/api/user/logout`,
      `/api/v1/user/logout`,

      {
        method: "GET",
        credentials: true,
        mode: "same-origin"
      }
    );
    yield put(logoutUser());
  } catch (error) {
    yield put(logoutUser());
  }
}

export default function* UserSaga() {
  yield all([
    takeLatest(UserTypes.LOGIN_USER_START, loginUserAsync),
    takeLatest(UserTypes.SIGNUP_USER_START, signupUserAsync),
    takeLatest(UserTypes.LOGOUT_USER_START, logoutUserAsync)
  ]);
}
