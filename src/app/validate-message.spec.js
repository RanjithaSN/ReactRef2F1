import validateMessage from './validate-message';

const NOT_REGISTRATION = {
  page: '/',
  params: {
    language: 'fr-FR',
  },
};

const ALL_FIELDS = {
  page: 'registration',
  params: {
    language: 'en-GB',
    sessionInfo: {},
    profileType: 'UNLOCKED_FULL',
    leadSource: 'Lead Source',
    apiUrl: 'https://example.com/security-api',
    apiKey: 'API_KEY_1234',
    showBackButton: true,
    showAlreadyHaveAccountMessage: false,
  },
};

const removeFields = (input, fieldList) => {
  const result = {
    page: input.page,
    params: { ...input.params },
  };
  fieldList.forEach((field) => {
    delete result.params[field];
  });
  return result;
};

describe('Message Validator', () => {
  it('Success with all fields', () => {
    const messageParameters = validateMessage(ALL_FIELDS);
    expect(messageParameters.isValid).equal(true);
    expect(messageParameters.errors.length).equal(0);
  });

  it('Success with minimal fields', () => {
    const testData = removeFields(ALL_FIELDS, [
      'showBackButton',
      'showAlreadyHaveAccountMessage',
      'leadSource',
    ]);
    const messageParameters = validateMessage(testData);
    expect(messageParameters.isValid).equal(true);
    expect(messageParameters.errors.length).equal(0);
    expect(messageParameters.showAlreadyHaveAccountMessage).equal(true);
    expect(messageParameters.showBackButton).equal(true);
    expect(messageParameters.leadSource).equal(undefined);
  });

  it('Success default language', () => {
    const testData = removeFields(ALL_FIELDS, ['language']);
    const messageParameters = validateMessage(testData);
    expect(messageParameters.isValid).equal(true);
    expect(messageParameters.errors.length).equal(0);
    expect(messageParameters.language).equal('en-GB');
  });

  it('Success with optional fields', () => {
    const testData = removeFields(ALL_FIELDS, [
      'showBackButton',
      'showAlreadyHaveAccountMessage',
      'leadSource',
      'apiKey',
    ]);
    testData.params.showBackButton = false;
    testData.params.showAlreadyHaveAccountMessage = false;
    const messageParameters = validateMessage(testData);
    expect(messageParameters.isValid).equal(true);
    expect(messageParameters.errors.length).equal(0);
    expect(messageParameters.showAlreadyHaveAccountMessage).equal(false);
    expect(messageParameters.showBackButton).equal(false);
    expect(messageParameters.leadSource).equal(undefined);
  });

  it('Success with empty object - default language', () => {
    const messageParameters = validateMessage({});
    expect(messageParameters.isValid).equal(true);
    expect(messageParameters.errors.length).equal(0);
    expect(messageParameters.language).equal('en-GB');
  });

  it('Success with empty params - default language', () => {
    const messageParameters = validateMessage({ params: {} });
    expect(messageParameters.isValid).equal(true);
    expect(messageParameters.errors.length).equal(0);
    expect(messageParameters.language).equal('en-GB');
  });

  it('Failure with no fields', () => {
    const testData = removeFields(ALL_FIELDS, [
      'language',
      'sessionInfo',
      'profileType',
      'leadSource',
      'apiUrl',
      'apiKey',
      'showBackButton',
      'showAlreadyHaveAccountMessage',
    ]);
    const messageParameters = validateMessage(testData);
    expect(messageParameters.isValid).equal(false);
    expect(messageParameters.errors.length).equal(2);
  });

  it('Failure missing Profile Type', () => {
    const testData = removeFields(ALL_FIELDS, ['profileType']);
    const messageParameters = validateMessage(testData);
    expect(messageParameters.isValid).equal(false);
    expect(messageParameters.errors.length).equal(1);
    expect(messageParameters.errors[0]).equal('profileType');
  });

  it('Failure missing API URL', () => {
    const testData = removeFields(ALL_FIELDS, ['apiUrl']);
    const messageParameters = validateMessage(testData);
    expect(messageParameters.isValid).equal(false);
    expect(messageParameters.errors.length).equal(1);
    expect(messageParameters.errors[0]).equal('apiUrl');
  });

  it('Success other path - default language', () => {
    const testData = removeFields(NOT_REGISTRATION, ['language']);
    const messageParameters = validateMessage(testData);
    expect(messageParameters.isValid).equal(true);
    expect(messageParameters.errors.length).equal(0);
    expect(messageParameters.language).equal('en-GB');
  });

  it('Success other path with language', () => {
    const testData = removeFields(NOT_REGISTRATION, []);
    const messageParameters = validateMessage(testData);
    expect(messageParameters.isValid).equal(true);
    expect(messageParameters.errors.length).equal(0);
    expect(messageParameters.language).equal('fr-FR');
  });
});
