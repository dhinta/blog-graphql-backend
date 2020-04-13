class ValidationHandler {
  constructor() {
    this.code = "";
  }

  handleValidationErrors(errorObj) {
    const errorKeys = errorObj === undefined ? [] : Object.keys(errorObj.errors);
    const errData = [];
    console.log(errorKeys);
    if (errorKeys.length) {
      for (let count = 0; count < errorKeys.length; count++) {
        errData.push({
          type: errorObj.errors[errorKeys[count]].name,
          message: errorObj.errors[errorKeys[count]].message,
        });
      }
      return errData;
    }
    return false;
  }
}

export default new ValidationHandler();
