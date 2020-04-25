class ValidationHandler {
  constructor() {
    this.code = "";
  }

  handleValidationErrors(errorObj) {
    const errorKeys = errorObj === undefined ? [] : Object.keys(errorObj.errors);
    const errData = [];
    if (errorKeys.length) {
      for (let count = 0; count < errorKeys.length; count++) {
        errData.push({
          type: 'ERROR',
          message: errorObj.errors[errorKeys[count]].message,
        });
      }
      return errData;
    }
    return false;
  }
}

export default new ValidationHandler();
