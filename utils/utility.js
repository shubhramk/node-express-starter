const { validationResult } = require('express-validator');
const HttpStatus = require("../constant/http-status");
const ErrorCode = require("../constant/error-code");

/**
 * Get unique error field name
 */
const uniqueMessage = error => {
  let output;
  try {
      let fieldName = error.message.substring(error.message.lastIndexOf('.$') + 2, error.message.lastIndexOf('_1'));
      output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ' already exists';
  } catch (e) {
      output = 'Unique field already exists';
  }

  return output;
};

/**
* Get the error message from error object
*/
const errorHandler = error => {
  let message = '';

  if (error.code) {
      switch (error.code) {
          case 11000:
          case 11001:
              message = uniqueMessage(error);
              break;
          default:
              message = 'Something went wrong';
      }
  } else {
      for (let errorName in error.errorors) {
          if (error.errorors[errorName].message) message = error.errorors[errorName].message;
      }
  }

  return message;
};


module.exports = {
  handleError: (res, statuscode, errorcode, message) => {
    return res.status(statuscode).json({
      message: message,
      code: errorcode
    });
  },
  handleErrorWithMsg :(res, statuscode, errorcode, dbError) => {
    return res.status(statuscode).json({
      message: errorHandler(dbError),
      code: errorcode
    });
  },
  handleSuccess: (res, statuscode, data, message) => {
    return res.status(statuscode).json({
      data: data,
      message: message
    });
  },
  runValidation : (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
          message: errors.array()[0].msg,
          code: ErrorCode.RESOURCE.INVALID_REQUEST
        });
    }
    next();
  }
};