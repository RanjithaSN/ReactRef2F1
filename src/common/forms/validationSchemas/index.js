import * as Yup from 'yup';
import WebValidations from '../../../common/forms/validations';

Yup.addMethod(Yup.string, 'firstName', function (field, locale, externalRules) {
  return this.test('firstName', 'message', function (value) {
    const { path, createError } = this;
    const validate = WebValidations.firstName(
      value,
      field,
      locale,
      externalRules,
    );
    return (
      validate.isValid ||
      createError({ message: validate.errorMessage, path: path })
    );
  });
});

Yup.addMethod(Yup.string, 'lastName', function (field, locale, externalRules) {
  return this.test('lastName', 'message', function (value) {
    const { path, createError } = this;
    const validate = WebValidations.lastName(
      value,
      field,
      locale,
      externalRules,
    );
    return (
      validate.isValid ||
      createError({ message: validate.errorMessage, path: path })
    );
  });
});

Yup.addMethod(
  Yup.string,
  'emailAddress',
  function (field, locale, externalRules) {
    return this.test('emailAddress', 'message', function (value) {
      const { path, createError } = this;
      const validate = WebValidations.emailAddress(
        value,
        field,
        locale,
        externalRules,
      );
      return (
        validate.isValid ||
        createError({ message: validate.errorMessage, path: path })
      );
    });
  },
);

Yup.addMethod(
  Yup.string,
  'dateOfBirth',
  function (field, locale, externalRules) {
    return this.test('dateOfBirth', 'message', function (value) {
      const { path, createError } = this;
      const validate = WebValidations.dateOfBirth(
        value,
        field,
        locale,
        externalRules,
      );
      return (
        validate.isValid ||
        createError({ message: validate.errorMessage, path: path })
      );
    });
  },
);

Yup.addMethod(Yup.string, 'country', function (field, locale, externalRules) {
  return this.test('country', 'message', function (value) {
    const { path, createError } = this;
    const validate = WebValidations.country(
      value,
      field,
      locale,
      externalRules,
    );
    return (
      validate.isValid ||
      createError({ message: validate.errorMessage, path: path })
    );
  });
});

Yup.addMethod(Yup.string, 'password', function (field, locale, externalRules) {
  return this.test('password', 'message', function (value) {
    const { path, createError } = this;
    const validate = WebValidations.password(
      value,
      field,
      locale,
      externalRules,
    );

    return (
      validate.isValid ||
      createError({
        message: validate.errorMessage,
        path: path,
        params: { errors: validate.errors },
      })
    );
  });
});

Yup.addMethod(
  Yup.string,
  'expirationDate',
  function (field, locale, externalRules) {
    return this.test('expirationDate', 'message', function (value) {
      const { path, createError } = this;
      const validate = WebValidations.expirationDate(
        value,
        field,
        locale,
        externalRules,
      );
      return (
        validate.isValid ||
        createError({ message: validate.errorMessage, path: path })
      );
    });
  },
);

Yup.addMethod(
  Yup.string,
  'securityCode',
  function (field, locale, externalRules) {
    return this.test('securityCode', 'message', function (value) {
      const { path, createError } = this;
      const validate = WebValidations.securityCode(
        value,
        field,
        locale,
        externalRules,
      );
      return (
        validate.isValid ||
        createError({ message: validate.errorMessage, path: path })
      );
    });
  },
);

Yup.addMethod(
  Yup.string,
  'nameOnCard',
  function (field, locale, externalRules) {
    return this.test('nameOnCard', 'message', function (value) {
      const { path, createError } = this;
      const validate = WebValidations.nameOnCard(
        value,
        field,
        locale,
        externalRules,
      );
      return (
        validate.isValid ||
        createError({ message: validate.errorMessage, path: path })
      );
    });
  },
);

Yup.addMethod(Yup.string, 'postalCode', function (field, locale, pattern) {
  return this.test('postalCode', 'message', function (value) {
    const { path, createError } = this;
    const validate = WebValidations.postalCode(value, field, locale, pattern);
    return (
      validate.isValid ||
      createError({ message: validate.errorMessage, path: path })
    );
  });
});

export const firstName = (field, locale, externalRules) =>
  Yup.string().firstName(field, locale, externalRules);

export const lastName = (field, locale, externalRules) =>
  Yup.string().lastName(field, locale, externalRules);

export const emailAddress = (field, locale, externalRules) =>
  Yup.string().emailAddress(field, locale, externalRules);

export const dateOfBirth = (field, locale, externalRules) =>
  Yup.string().dateOfBirth(field, locale, externalRules);

export const dataConfirmation = (field, locale, externalRules) =>
  Yup.string().dataConfirmation(field, locale, externalRules);

export const country = (field, locale, externalRules) =>
  Yup.string().country(field, locale, externalRules);

export const password = (field, locale, externalRules) =>
  Yup.string().password(field, locale, externalRules);

export const expirationDate = (field, locale, externalRules) =>
  Yup.string().expirationDate(field, locale, externalRules);

export const securityCode = (field, locale, externalRules) =>
  Yup.string().securityCode(field, locale, externalRules);

export const nameOnCard = (field, locale, externalRules) =>
  Yup.string().nameOnCard(field, locale, externalRules);

export const postalCode = (field, locale, pattern) =>
  Yup.string().postalCode(field, locale, pattern);
