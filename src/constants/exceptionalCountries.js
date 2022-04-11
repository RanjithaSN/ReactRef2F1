export const exceptionalCountries = ['AUS', 'USA', 'CAN'];

export const zipCodeMaskValueUSA = '99999';

export const addNewAddressDefaultErrorFields = ['AddressLineOne', 'City'];

export const addNewAddressAUSErrorFields = [
  ...addNewAddressDefaultErrorFields,
  'Region',
];

export const addNewAddressCANErrorFields = [
  ...addNewAddressDefaultErrorFields,
  'Province',
  'PostalCode',
];

export const addNewAddressUSAErrorFields = [
  ...addNewAddressDefaultErrorFields,
  'State',
  'ZipCode',
];

export const getCountryBasedConfigurations = (countryName) => {
  const countryConfiguartion = {
    AUS: {
      zipCode: false,
      inputName: 'Region',
      inputLabel: 'addressFormRegion',
      addNewAddressFields: addNewAddressAUSErrorFields,
    },
    CAN: {
      zipCode: false,
      inputName: 'Province',
      inputLabel: 'addressFormProvince',
      addNewAddressFields: addNewAddressCANErrorFields,
    },
    USA: {
      zipCode: true,
      inputName: 'State',
      inputLabel: 'addressFormState',
      addNewAddressFields: addNewAddressUSAErrorFields,
    },
  };
  return countryConfiguartion[countryName];
};
