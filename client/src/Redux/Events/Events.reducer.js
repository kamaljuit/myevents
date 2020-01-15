import EventTypes from "./Events.types";

/*
a
*/

const INITIAL_STATE = {
  allEvents: [],
  selfEvents: [],
  errorMessage: undefined
};

const CategoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EventTypes.SET_ALL_EVENTS:
      return {
        ...state,
        allEvents: action.payload
      };

    case EventTypes.SET_SELF_EVENTS:
      return {
        ...state,
        selfEvents: action.payload
      };

    case EventTypes.SET_EVENT_ERROR:
      return {
        ...state,
        errorMessage: action.payload
      };
    default:
      return state;
  }
};

export default CategoryReducer;
