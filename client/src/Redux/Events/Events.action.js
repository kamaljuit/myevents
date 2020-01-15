import EventTypes from "./Events.types";

export const setAllEvents = allEvents => {
  return {
    type: EventTypes.SET_ALL_EVENTS,
    payload: allEvents
  };
};

export const setSelfEvents = selfEvents => {
  return {
    type: EventTypes.SET_SELF_EVENTS,
    payload: selfEvents
  };
};

export const addEventStart = event => {
  return {
    type: EventTypes.ADD_EVENT_START,
    payload: event
  };
};

export const setEventError = errorMessage => {
  return {
    type: EventTypes.SET_EVENT_ERROR,
    payload: errorMessage
  };
};

export const getAllEvents = () => {
  return {
    type: EventTypes.GET_ALL_EVENTS,
    payload: null
  };
};

export const getSelfEvents = () => {
  return {
    type: EventTypes.GET_SELF_EVENTS,
    payload: null
  };
};
