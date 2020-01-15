const Event = require("./EventModel");
const AppError = require("../Utilities/AppError");
const formatResponse = require("../Utilities/FormatResponse");
/**
 *Functionalities
 add Event, remove event, get event


     title,
    description,
    startDate,
    endDate,
    startTime,
    endTime,
    duration,
    notify


    queries available with get event = all,self
 */

const addEvent = async (req, res, next) => {
  if (!req.user) next(new AppError("You are not Authorized!", 401));
  const event = req.body;

  try {
    const newEvent = await Event.create(event);
    const responseData = formatResponse(201, newEvent);
    return res.status(201).json(responseData);
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const removeEvent = async (req, res, next) => {
  try {
    if (!req.user) next(new AppError("You are not Authorized!", 401));
    const eventId = req.params._id;
    const userId = req.user._id;
    const event = await Event.findById(eventId).populate("user");
    if (!event) next(new AppError("No such event Exists", 400));
    if (event.user._id != userId)
      next(new AppError("You are not Authorized", 401));

    await event.remove();

    const responseData = formatResponse(201);
    return res.status(201).json(responseData);
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

//Pagination can also be applied to this ==> Skipping it for now!

const getEvent = async (req, res, next) => {
  try {
    if (!req.user) next(new AppError("You are not Authorized!", 401));
    const query = req.query.query;
    if (query == "all") {
      const allEvents = await Event.find().populate("user");
      const responseData = formatResponse(200, allEvents);
      return res.status(200).json(responseData);
    } else if (query == "self") {
      const userId = req.user._id;
      
      const events = await Event.find({ user: userId });
      const responseData = formatResponse(200, events);
      console.log(userId,events,"Debug")
      return res.status(200).json(responseData);
    } else {
      return next(new AppError("Not a valid Query!", 400));
    }
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

module.exports = {
  addEvent,
  removeEvent,
  getEvent
};
