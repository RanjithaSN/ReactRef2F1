const recordResult = (currentValue, lastValidationResult) => {
  if (lastValidationResult) {
    return currentValue;
  } else {
    return lastValidationResult;
  }
};

const validiateRequiredParameter = (bundle, candidate, name, defaultValue) => {
  if (candidate) {
    bundle[name] = candidate;
    return true;
  } else if (defaultValue) {
    bundle[name] = defaultValue;
    return true;
  }
  bundle.errors.push(name);
  return false;
};

const validateOptionalParameter = (bundle, candidate, name, defaultValue) => {
  const result = candidate !== undefined ? candidate : defaultValue;
  bundle[name] = result;
};

const fieldsForValidationByPage = {
  registration: [
    {
      isRequired: true,
      name: 'language',
      defaultValue: 'en-GB',
    },
    {
      isRequired: true,
      name: 'profileType',
    },
    {
      isRequired: true,
      name: 'apiUrl',
    },
    {
      isRequired: false,
      name: 'apiKey',
      defaultValue: '',
    },
    {
      isRequired: false,
      name: 'showBackButton',
      defaultValue: true,
    },
    {
      isRequired: false,
      name: 'showAlreadyHaveAccountMessage',
      defaultValue: true,
    },
    {
      isRequired: false,
      name: 'leadSource',
      defaultValue: undefined,
    },
  ],
};

const validateMessage = (message) => {
  const bundle = {
    isValid: true,
    errors: [],
  };
  const params = message?.params || [];
  const page = message?.page || '/';

  const fieldsForValidation = fieldsForValidationByPage[page] || [
    {
      isRequired: true,
      name: 'language',
      defaultValue: 'en-GB',
    },
  ];
  if (fieldsForValidation.length > 0) {
    fieldsForValidation.forEach((fieldForValidation) => {
      if (fieldForValidation.isRequired) {
        bundle.isValid = recordResult(
          bundle.isValid,
          validiateRequiredParameter(
            bundle,
            params[fieldForValidation.name],
            fieldForValidation.name,
            fieldForValidation.defaultValue,
          ),
        );
      } else {
        validateOptionalParameter(
          bundle,
          params[fieldForValidation.name],
          fieldForValidation.name,
          fieldForValidation.defaultValue,
        );
      }
    });
  }
  return bundle;
};

export default validateMessage;
