import moment from 'moment';
import * as Yup from 'yup';
import {
  creditCardValidationRegex,
  expirationCardDateValidator,
} from './helpers';
import { getValidationMessage } from './messages';

const WebValidations = (() => {
  const validateExternalPasswordRules = (
    fieldInput,
    field,
    externalRules,
    errors,
  ) => {
    const ruleContainer =
      externalRules?.externalValidationRules?.fields?.[0]?.[field];
    const rules = ruleContainer?.rules || [];

    rules.forEach((rule) => {
      const matchesPatternTest = Yup.object().shape({
        test: Yup.string().matches(rule.regex),
      });
      const isRuleValid = matchesPatternTest.isValidSync({
        test: fieldInput || '',
      });
      if (!isRuleValid) {
        errors.push(rule.name);
      }
    });
    return errors;
  };
  const firstName = (
    fieldInput,
    field,
    locale = 'en-US',
    externalRules = {},
  ) => {
    const maxLength = 50;
    let errors = [];
    let isRequired = Yup.object().shape({
      test: Yup.string().required(),
    });
    let max = Yup.object().shape({
      test: Yup.string().max(maxLength),
    });
    const validateIsRequired = isRequired.isValidSync({
      test: fieldInput,
    });
    const validateMax = max.isValidSync({
      test: fieldInput,
    });
    // Catch which tests failed
    if (!validateIsRequired) {
      errors.push('required');
    }
    if (!validateMax) {
      errors.push('maxLength');
    }
    return {
      isValid: errors.length ? false : true,
      errors: errors,
      errorMessage: errors.length
        ? getValidationMessage(field, locale, errors[0], {
            maxLength: maxLength,
          })
        : '',
    };
  };
  const lastName = (
    fieldInput,
    field,
    locale = 'en-US',
    externalRules = {},
  ) => {
    const maxLength = 80;
    let errors = [];
    let isRequired = Yup.object().shape({
      test: Yup.string().required(),
    });
    let max = Yup.object().shape({
      test: Yup.string().max(maxLength),
    });
    const validateIsRequired = isRequired.isValidSync({
      test: fieldInput,
    });
    const validateMax = max.isValidSync({
      test: fieldInput,
    });
    // Catch which tests failed
    if (!validateIsRequired) {
      errors.push('required');
    }
    if (!validateMax) {
      errors.push('maxLength');
    }
    return {
      isValid: errors.length ? false : true,
      errors: errors,
      errorMessage: errors.length
        ? getValidationMessage(field, locale, errors[0], {
            maxLength: maxLength,
          })
        : '',
    };
  };
  const emailAddress = (
    fieldInput,
    field,
    locale = 'en-US',
    externalRules = {},
  ) => {
    const pattern =
      /^(?!.*\.{2})[a-zA-Z0-9_.+-]+@[a-zA-Z0-9_.]+?\.[a-zA-Z]{2,3}$/;
    let errors = [];
    let isRequired = Yup.object().shape({
      test: Yup.string().required(),
    });
    let matchesPattern = Yup.object().shape({
      test: Yup.string().matches(pattern),
    });
    const validateIsRequired = isRequired.isValidSync({
      test: fieldInput,
    });
    const validatePattern = matchesPattern.isValidSync({
      test: fieldInput,
    });
    // Catch which tests failed
    if (!validateIsRequired) {
      errors.push('required');
    }
    if (!validatePattern) {
      errors.push('pattern');
    }
    return {
      isValid: errors.length ? false : true,
      errors: errors,
      errorMessage: errors.length
        ? getValidationMessage(field, locale, errors[0], {
            pattern: pattern,
          })
        : '',
    };
  };
  const dateOfBirth = (
    fieldInput,
    field,
    locale = 'en-US',
    externalRules = {},
  ) => {
    const dateFormat =
      locale === 'en-GB' || locale === 'en-US' ? 'MM/DD/YYYY' : 'DD/MM/YYYY';
    let errors = [];

    let isRequired = Yup.object().shape({
      test: Yup.string().required(),
    });
    const validateIsRequired = isRequired.isValidSync({
      test: fieldInput,
    });
    if (!validateIsRequired) {
      errors.push('required');
    }
    const additionalProperties =
      externalRules?.genericRules?.data?.Codes[1]?.AdditionalProperties || [];
    const minFilter = additionalProperties.filter(
      (item) => item.Key === 'minimum_age',
    );
    const maxFilter = additionalProperties.filter(
      (item) => item.Key === 'maximum_age',
    );
    const min = minFilter.length ? Number(minFilter[0].Value) : 0;
    const max = maxFilter.length ? Number(maxFilter[0].Value) : 120;

    if (moment(fieldInput, dateFormat, true).isValid()) {
      if (min !== 0 && max !== 0) {
        let minAge = Yup.object().shape({
          test: Yup.string().test('minAge', 'minAge', function (birthdate) {
            const dob = moment(birthdate, dateFormat);
            return moment().diff(dob, 'years') >= min;
          }),
        });
        let maxAge = Yup.object().shape({
          test: Yup.string().test('maxAge', 'maxAge', function (birthdate) {
            const dob = moment(birthdate, dateFormat);
            return moment().diff(dob, 'years') <= max;
          }),
        });
        const validateMinAge = minAge.isValidSync({
          test: fieldInput,
        });
        const validateMaxAge = maxAge.isValidSync({
          test: fieldInput,
        });
        // Catch which tests failed
        if (!validateMinAge) {
          errors.push('minAge');
        }
        if (!validateMaxAge) {
          errors.push('maxAge');
        }
      }
    } else {
      errors.push('invalidFormat');
    }
    return {
      isValid: errors.length ? false : true,
      errors: errors,
      errorMessage: errors.length
        ? getValidationMessage(field, locale, errors[0], {
            minAge: min,
            maxAge: max,
            format: dateFormat,
          })
        : '',
    };
  };
  const country = (fieldInput, field, locale = 'en-US', externalRules = {}) => {
    let errors = [];

    const validateIsRequired = fieldInput !== 'Select';
    // Catch which tests failed
    if (!validateIsRequired) {
      errors.push('required');
    }
    return {
      isValid: errors.length ? false : true,
      errors: errors,
      errorMessage: errors.length
        ? getValidationMessage(field, locale, errors[0])
        : '',
    };
  };
  const password = (
    fieldInput,
    field,
    locale = 'en-US',
    externalRules = {},
  ) => {
    let errors = [];
    let isRequired = Yup.object().shape({
      test: Yup.string().required(),
    });
    const validateIsRequired = isRequired.isValidSync({
      test: fieldInput,
    });
    if (!validateIsRequired) {
      errors.push('required');
    }

    validateExternalPasswordRules(fieldInput, field, externalRules, errors);

    let errorMessage = '';
    errors.forEach((error) => {
      errorMessage += `${error}, `;
    });
    errorMessage = errorMessage.substring(0, errorMessage.length - 2);
    return {
      isValid: errors.length ? false : true,
      errors: errors,
      errorMessage: errors.length ? errorMessage : '',
    };
  };

  const expirationDate = (fieldInput, field, locale = 'en-GB') => {
    const pattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
    let errors = [];
    let matchesPattern = Yup.object().shape({
      test: Yup.string().matches(pattern),
    });
    let isRequired = Yup.object().shape({
      test: Yup.string().required(),
    });
    const validateIsRequired = isRequired.isValidSync({
      test: fieldInput,
    });
    const validatePattern = matchesPattern.isValidSync({
      test: fieldInput,
    });
    if (!validateIsRequired) {
      errors.push('required');
    }
    if (!validatePattern) {
      errors.push('dataRuleValueInvalidDate');
    }
    if (validatePattern) {
      const validateExpirationCardDate =
        expirationCardDateValidator(fieldInput);
      if (validateExpirationCardDate) {
        errors.push('creditCardExpiredError');
      }
    }
    return {
      isValid: errors.length ? false : true,
      errors: errors,
      errorMessage: errors.length
        ? getValidationMessage(field, locale, errors[0])
        : '',
    };
  };

  const securityCode = (
    fieldInput,
    field,
    locale = 'en-GB',
    externalRules = {},
  ) => {
    const getCardType =
      externalRules?.cardName || externalRules?.defaultCardType;
    const choosePattern = creditCardValidationRegex[getCardType];
    const pattern = choosePattern?.cvvRegex;
    const numberPattern = /^\d+$/;
    let errors = [];
    const inValidName = 'paymentFormSecurityCodeInvalid';
    const numericName = 'dataRuleNumeric';
    const requiredName = 'required';
    const isFieldEnabled = (field, errors, errorName) => {
      if (errors.length && errors[0] === errorName) {
        return '';
      }
      return field;
    };
    let matchesNumberPattern = Yup.object().shape({
      test: Yup.string().matches(numberPattern),
    });
    let matchesPattern = Yup.object().shape({
      test: Yup.string().matches(pattern),
    });
    let isRequired = Yup.object().shape({
      test: Yup.string().required(),
    });
    const validateIsRequired = isRequired.isValidSync({
      test: fieldInput,
    });
    const validateNumberPattern = matchesNumberPattern.isValidSync({
      test: fieldInput,
    });
    const validatePattern = matchesPattern.isValidSync({
      test: fieldInput,
    });
    if (!validateIsRequired) {
      errors.push(requiredName);
    }
    if (!validateNumberPattern) {
      errors.push(numericName);
    }
    if (!validatePattern) {
      errors.push(inValidName);
    }
    return {
      isValid: errors.length ? false : true,
      errors: errors,
      errorMessage: errors.length
        ? getValidationMessage(
            isFieldEnabled(field, errors, inValidName),
            locale,
            errors[0],
          )
        : '',
    };
  };
  const nameOnCard = (fieldInput, field, locale = 'en-GB') => {
    const maxLength = 40;
    const pattern = /^(a-z|A-Z|0-9)*[^#@$%^&*()"]*$/;
    let errors = [];
    let matchesPattern = Yup.object().shape({
      test: Yup.string().matches(pattern),
    });
    let isRequired = Yup.object().shape({
      test: Yup.string().required(),
    });
    let max = Yup.object().shape({
      test: Yup.string().max(maxLength),
    });
    const validateIsRequired = isRequired.isValidSync({
      test: fieldInput,
    });
    const validateMax = max.isValidSync({
      test: fieldInput,
    });
    const validatePattern = matchesPattern.isValidSync({
      test: fieldInput,
    });
    if (!validateIsRequired) {
      errors.push('required');
    }
    if (!validateMax) {
      errors.push('maxLength');
    }
    if (!validatePattern) {
      errors.push('regExPatternNoMatch');
    }
    return {
      isValid: errors.length ? false : true,
      errors: errors,
      errorMessage: errors.length
        ? getValidationMessage(field, locale, errors[0])
        : '',
    };
  };

  const postalCode = (fieldInput, field, locale, pattern) => {
    let errors = [];
    let isRequired = Yup.object().shape({
      test: Yup.string().required(),
    });
    const validateIsRequired = isRequired.isValidSync({
      test: fieldInput,
    });

    let matchesPattern = Yup.object().shape({
      test: Yup.string().matches(pattern),
    });

    const validatePattern = matchesPattern.isValidSync({
      test: fieldInput,
    });

    // Catch which tests failed
    if (!validateIsRequired) {
      errors.push('required');
    }

    if (!validatePattern) {
      errors.push('regExPatternNoMatch');
    }

    return {
      isValid: errors.length ? false : true,
      errors: errors,
      errorMessage: errors.length
        ? getValidationMessage(field, locale, errors[0])
        : '',
    };
  };

  return {
    firstName: firstName,
    lastName: lastName,
    emailAddress: emailAddress,
    dateOfBirth: dateOfBirth,
    country: country,
    password: password,
    expirationDate: expirationDate,
    securityCode: securityCode,
    nameOnCard: nameOnCard,
    postalCode: postalCode,
  };
})();
export default WebValidations;
