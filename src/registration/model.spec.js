import RegistrationModel from './model';

const UNLOCKED_FULL = [
  'title',
  'firstName',
  'lastName',
  'dateOfBirth',
  'country',
  'emailAddress',
  'password',
  'recieveLatestNews',
  'confirmationTC',
];

const UNLOCKED_SKINNY_DOB = [
  'dateOfBirth',
  'emailAddress',
  'password',
  'recieveLatestNews',
  'confirmationTC',
];

const UNLOCKED_SKINNY = [
  'emailAddress',
  'password',
  'recieveLatestNews',
  'confirmationTC',
];

const DATA_CAPTURE = ['emailAddress', 'recieveLatestNews'];

describe('RegistrationModel', () => {
  describe('getFormConfig', () => {
    describe('When model is passed in UNLOCKED_FULL', () => {
      it(`It should configure the form with following fields: ${UNLOCKED_FULL}`, () => {
        const model = new RegistrationModel('UNLOCKED_FULL');
        const config = model.getFormConfig();
        const fields = config.map((field) => field.type);
        expect(
          fields.sort().join(',') === UNLOCKED_FULL.sort().join(','),
        ).to.be.equal(true);
      });
    });
    describe('When model is passed in UNLOCKED_SKINNY_DOB', () => {
      it(`It should configure the form with following fields: ${UNLOCKED_SKINNY_DOB}`, () => {
        const model = new RegistrationModel('UNLOCKED_SKINNY_DOB');
        const config = model.getFormConfig();
        const fields = config.map((field) => field.type);
        expect(
          fields.sort().join(',') === UNLOCKED_SKINNY_DOB.sort().join(','),
        ).to.be.equal(true);
      });
    });
    describe('When model is passed in UNLOCKED_SKINNY', () => {
      it(`It should configure the form with following fields: ${UNLOCKED_SKINNY}`, () => {
        const model = new RegistrationModel('UNLOCKED_SKINNY');
        const config = model.getFormConfig();
        const fields = config.map((field) => field.type);
        expect(
          fields.sort().join(',') === UNLOCKED_SKINNY.sort().join(','),
        ).to.be.equal(true);
      });
    });
    describe('When model is passed in DATA_CAPTURE', () => {
      it(`It should configure the form with following fields: ${DATA_CAPTURE}`, () => {
        const model = new RegistrationModel('DATA_CAPTURE');
        const config = model.getFormConfig();
        const fields = config.map((field) => field.type);
        expect(
          fields.sort().join(',') === DATA_CAPTURE.sort().join(','),
        ).to.be.equal(true);
      });
    });
  });
  describe('createForm', () => {
    describe('When model is passed in UNLOCKED_FULL', () => {
      it(`It should create all field components with the following properties: form, name, externalData`, () => {
        const model = new RegistrationModel('UNLOCKED_FULL');
        const form = model.createForm({}, {});
        console.log(form);
        expect(
          form.every(
            (field) =>
              field.props.form && field.props.name && field.props.externalData,
          ),
        ).to.be.equal(true);
      });
    });
  });
});
