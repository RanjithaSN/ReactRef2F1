import WebValidations from './index';

describe('WebValidations', () => {
  describe('firstName', () => {
    describe('If "FirstName" is passed in', () => {
      const validation = WebValidations.firstName('FirstName', 'firstname');
      it('It should validate as true', () => {
        expect(validation.isValid).to.be.equal(true);
      });
    });
    describe('If more than 50 characters are passed in', () => {
      const validation = WebValidations.firstName(
        'MORE_THAN_50_CHARACTERS*************************************************',
        'firstname',
      );
      it('It should validate as false', () => {
        expect(validation.isValid).to.be.equal(false);
      });
    });
  });
  describe('lastName', () => {
    describe('If "lastName" is passed in', () => {
      const validation = WebValidations.lastName('lastName', 'lastname');
      it('It should validate as true', () => {
        expect(validation.isValid).to.be.equal(true);
      });
    });
    describe('If more than 80 characters are passed in', () => {
      const validation = WebValidations.lastName(
        'MORE_THAN_80_CHARACTERS*******************************************************************************************************',
        'firstname',
      );
      it('It should validate as false', () => {
        expect(validation.isValid).to.be.equal(false);
      });
    });
  });

  describe('emailAddress', () => {
    describe('If "ricardo@csgi.com" is passed in', () => {
      const validation = WebValidations.emailAddress(
        'ricardo@csgi.com',
        'email',
      );
      it('It should validate as true', () => {
        expect(validation.isValid).to.be.equal(true);
      });
    });
    describe('If "ricardo@csgi.com." is passed in', () => {
      const validation = WebValidations.emailAddress(
        'ricardo@csgi.com.',
        'email',
      );
      it('It should validate as false', () => {
        expect(validation.isValid).to.be.equal(false);
      });
    });
  });

  describe('dateOfBirth', () => {
    describe('If "04/01/1990" is passed in', () => {
      const validation = WebValidations.dateOfBirth('04/01/1990', 'dob');
      it('It should validate as true', () => {
        expect(validation.isValid).to.be.equal(true);
      });
    });
    describe('If "31/5/5" is passed in', () => {
      const validation = WebValidations.dateOfBirth('55555', 'dob');
      it('It should validate as false', () => {
        expect(validation.isValid).to.be.equal(false);
      });
    });
  });
  describe('country', () => {
    describe('If "ARG" is passed in', () => {
      const validation = WebValidations.country('ARG', 'country');
      it('It should validate as true', () => {
        expect(validation.isValid).to.be.equal(true);
      });
    });
    describe('If "Select" is passed in', () => {
      const validation = WebValidations.country('Select', 'country');
      it('It should validate as false', () => {
        expect(validation.isValid).to.be.equal(false);
      });
    });
  });
});
