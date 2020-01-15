import { takeEvery, put, all } from "redux-saga/effects";
import EventTypes from "./Events.types";
import { setAllEvents, setSelfEvents } from "./Events.action";

const fetch = window.fetch;
function* getAllEvents(action) {
  var rawResponse = yield fetch("/api/v1/events?query=all", {
    method: "GET"
  });
  var response = yield rawResponse.json();
  const events = response.data;
  yield put(setAllEvents(events));
}

function* getSelfEvents(action) {
  var rawResponse = yield fetch("/api/v1/events?query=self", {
    method: "GET"
  });
  var response = yield rawResponse.json();
  const events = response.data;
  yield put(setSelfEvents(events));
}

function* addEventAsync({ payload }) {
  var rawResponse = yield fetch("/api/v1/events", {
    method: "POST",
    body: JSON.stringify(payload),
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    }
  });
  var response = yield rawResponse.json();
  if (rawResponse.ok) {
    yield put({
      type: EventTypes.GET_ALL_EVENTS
    });
    yield put({
      type: EventTypes.GET_SELF_EVENTS
    });
  } else {
    yield put({
      type: EventTypes.SET_EVENT_ERROR,
      payload: response.message
    });
  }
}

function* ItemSaga() {
  yield all([
    takeEvery(EventTypes.GET_ALL_EVENTS, getAllEvents),
    takeEvery(EventTypes.GET_SELF_EVENTS, getSelfEvents),
    takeEvery(EventTypes.ADD_EVENT_START, addEventAsync)
  ]);
}

export default ItemSaga;
