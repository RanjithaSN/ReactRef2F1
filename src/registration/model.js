import { fields } from '../common/forms/fields';
import * as Yup from 'yup';

export default class RegistrationModel {
  constructor(profileType) {
    this.profileType = profileType;
  }

  #UNLOCKED_FULL = [
    {
      type: 'title',
    },
    {
      type: 'firstName',
    },
    {
      type: 'lastName',
    },
    {
      type: 'dateOfBirth',
    },
    {
      type: 'country',
    },
    {
      type: 'emailAddress',
    },
    {
      type: 'password',
    },
    {
      type: 'recieveLatestNews',
    },
    {
      type: 'confirmationTC',
    },
  ];

  #UNLOCKED_SKINNY_DOB = [
    {
      type: 'dateOfBirth',
    },
    {
      type: 'emailAddress',
    },
    {
      type: 'password',
    },
    {
      type: 'recieveLatestNews',
    },
    {
      type: 'confirmationTC',
    },
  ];

  #UNLOCKED_SKINNY = [
    {
      type: 'emailAddress',
    },
    {
      type: 'password',
    },
    {
      type: 'recieveLatestNews',
    },
    {
      type: 'confirmationTC',
    },
  ];

  #DATA_CAPTURE = [
    {
      type: 'emailAddress',
    },
    {
      type: 'recieveLatestNews',
    },
  ];

  getFormConfig() {
    let formConfig;
    switch (this.profileType) {
      case 'UNLOCKED_FULL':
        formConfig = this.#UNLOCKED_FULL;
        break;
      case 'UNLOCKED_SKINNY_DOB':
        formConfig = this.#UNLOCKED_SKINNY_DOB;
        break;
      case 'UNLOCKED_SKINNY':
        formConfig = this.#UNLOCKED_SKINNY;
        break;
      case 'DATA_CAPTURE':
        formConfig = this.#DATA_CAPTURE;
        break;
      default:
        formConfig = [];
    }
    return formConfig;
  }

  createForm(form, externalData, language) {
    const config = this.getFormConfig();
    return config.map((fieldConfig, index) => {
      const field = fields[fieldConfig.type];
      const FieldComponent = field.component;

      return (
        <FieldComponent
          name={fieldConfig.name || fieldConfig.type}
          form={form}
          key={index}
          externalData={externalData}
          language={language}
        />
      );
    });
  }

  getInitialValues() {
    const config = this.getFormConfig();
    let initialValues = {};
    config.forEach((fieldConfig) => {
      const field = fields[fieldConfig.type];
      const name = fieldConfig.name || fieldConfig.type;
      initialValues[name] = fieldConfig.initialValue || field.initialValue;
    });
    return initialValues;
  }
  getValidationSchema(locale, externalRules) {
    const config = this.getFormConfig();
    let validationObject = {};
    config.forEach((fieldConfig) => {
      const field = fields[fieldConfig.type];
      const name = fieldConfig.name || fieldConfig.type;
      const validation = fieldConfig.validation || field.validation;
      if (validation) {
        validationObject[name] = validation(name, locale, externalRules);
      }
    });
    return Yup.object().shape(validationObject);
  }
}
