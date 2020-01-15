const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Event Format
 * title:
 * startTime
 * endTime
 * description
 * notify ==> true ? Send Push Notification : Not required
 * startDate ==> Can be a Virtual
 * duration ==> Can be a virtual (in ms)
 */

const EventSchema = new Schema({
  title: {
    type: String,
    required: [true, "An Event must have a Title!"],
    trim: true,
    minlength: [3, "A title cannot have less than 3 characters!!"]
  },
  description: {
    type: String,
    required: [true, "An Event must have a Description!"],
    trim: true
  },
  startDate: {
    type: Date,
    required: [true, "An Event must have a Start Date!"]
  },
  startTime: {
    type: Date,
    required: [true, "An Event must have a Start Time!"]
  },
  endTime: {
    type: Date,
    required: [true, "An Event must have an End Time!"]
  },
  notify: {
    type: Boolean,
    default: false
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
