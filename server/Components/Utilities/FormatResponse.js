//Utility method to send consistent response via the API
// Following jsend JSON format for the API responses

function formatResponse(statusCode, data, message = undefined) {
  let statusMessage = toString(statusCode).startsWith("2")
    ? "sucess"
    : toString(statusCode).startsWith("4")
    ? "failed"
    : "error";

  if (statusCode === 500) data = undefined;
  return {
    status: statusMessage,
    message,
    data
  };
}
module.exports = formatResponse;
