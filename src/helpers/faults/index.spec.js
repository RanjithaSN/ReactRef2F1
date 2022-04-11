import i18next from 'i18next';
import {
  getFaultCode,
  translateFaultCode,
  translateFault,
  generateUnhandledFault,
} from './index';

i18next.init({
  lng: 'en-GB',
  react: {
    useSuspense: false,
    wait: true,
  },
  resources: {
    'en-GB': {
      translation: {
        fault: {
          113: 'The requested login already exists',
        },
      },
    },
    'es-MX': {
      translation: {
        fault: {
          113: 'The requested login already exists',
        },
      },
    },
  },
});

describe('Fault Helpers', () => {
  beforeEach(() => {});
  describe('getFaultCode', () => {
    const fault = {
      Code: 113,
      Message:
        'The login, testtesttest@sharklasers.com, is already used by a subscriber in this business unit.',
      Severity: 4,
    };
    const method = getFaultCode(fault);
    it('It should return fault code "113"', () => {
      expect(method).to.be.equal('113');
    });
  });
  describe('translateFaultCode', () => {
    const method = translateFaultCode(113);
    it('It should return the message "The requested login already exists"', () => {
      expect(method).to.be.equal('The requested login already exists');
    });
  });
  describe('translateFault', () => {
    const fault = {
      Code: 113,
      Message:
        'The login, testtesttest@sharklasers.com, is already used by a subscriber in this business unit.',
      Severity: 4,
    };
    const method = translateFault(fault);
    it('It should the translated message "The requested login already exists"', () => {
      expect(method.translatedMessage).to.be.equal(
        'The requested login already exists',
      );
    });
  });
  describe('generateUnhandledFault', () => {
    const response = 'original error';
    const method = generateUnhandledFault(response);
    it('It should return a fault code of 0', () => {
      expect(method.Code).to.be.equal(0);
    });
    it('It should return the original error', () => {
      expect(method.OriginalError).to.be.equal(response);
    });
  });
});
