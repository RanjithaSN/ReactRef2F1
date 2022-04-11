import { equal } from 'assert';
import getLeadSourceTypeFromConfigParameter from './getLeadSourceTypeFromConfigParameter';

const externalData = {
  leadSources: {
    data: {
      Codes: [
        {
          AdditionalProperties: [],
          Description: 'Test 1',
          Name: 'test1',
          Value: '10001',
        },
        {
          AdditionalProperties: [],
          Description:
            'Set when an invalid value has been passed in the lead_source parameter.',
          Name: 'invalid',
          Value: '10002',
        },
        {
          AdditionalProperties: [],
          Description: 'Test 2',
          Name: 'test2',
          Value: '10003',
        },
        {
          AdditionalProperties: [],
          Description: 'formula1.com',
          Name: 'web_account',
          Value: '10004',
        },
        {
          AdditionalProperties: [],
          Description: 'Test 3',
          Name: 'test3',
          Value: '10005',
        },
      ],
    },
  },
};

const TEST_DATA = [
  {
    testName: 'Success First Item',
    leadSource: 'test1',
    origin: 'http://localhost:9000',
    expectedResult: 10001,
  },
  {
    testName: 'Success Third Item',
    leadSource: 'test2',
    origin: 'http://localhost:9000',
    expectedResult: 10003,
  },
  {
    testName: 'Success Last Item',
    leadSource: 'test3',
    origin: 'http://localhost:9000',
    expectedResult: 10005,
  },
  {
    testName: 'Invalid lead source',
    leadSource: 'not_a_lead_source',
    origin: 'http://localhost:9000',
    expectedResult: 10002,
  },
  {
    testName: 'No lead source - no default',
    leadSource: undefined,
    origin: 'http://not.a.matching.domain.com',
    expectedResult: undefined,
  },
  {
    testName: 'Null Lead Source - default value QA',
    leadSource: null,
    origin: 'account-qa.f1.lbi.co.uk',
    expectedResult: 10004,
  },
  {
    testName: 'Null Lead Source - default value production',
    leadSource: null,
    origin: 'account.formula1.com',
    expectedResult: 10004,
  },
];
TEST_DATA.forEach((testData) => {
  const result = getLeadSourceTypeFromConfigParameter(
    testData.origin,
    externalData,
    testData.leadSource,
  );
  console.log(
    `${testData.testName}: Expected ${
      testData.expectedResult
    } Actual was ${result} : ${testData.expectedResult === result}`,
  );
});

describe('Get Lead Source', () => {
  it('Run Tests', () => {
    TEST_DATA.forEach((testData) => {
      const result = getLeadSourceTypeFromConfigParameter(
        testData.origin,
        externalData,
        testData.leadSource,
      );
      equal(
        result,
        testData.expectedResult,
        `${testData.testName}: Expected ${testData.expectedResult} Actual was ${result}`,
      );
    });
  });
});
