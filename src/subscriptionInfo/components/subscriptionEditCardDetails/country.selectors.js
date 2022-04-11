import { createSelector } from 'reselect';
import {
  zipCodeRegExpressionKey,
  zipCodeMaskKey,
} from '../../../constants/countryProperties';

export const countrySelector = (state) =>
  state.ascendon.metadata.code[59].Codes || {};

export const selectedCountryProperties = (state, selectedCountry) =>
  countrySelector(state).find(
    (countryItem) => countryItem.Value === selectedCountry,
  );

const getAdditionalProperty = (properties, key) =>
  properties?.AdditionalProperties?.find(
    (additionalPropertyItem) =>
      additionalPropertyItem.Key === key && additionalPropertyItem.Value,
  );

export const getSelectedCountryPostalCodeRegex = createSelector(
  selectedCountryProperties,
  (countryProperties) =>
    getAdditionalProperty(countryProperties, zipCodeRegExpressionKey),
);

export const getSelectedCountryZipCodeMask = createSelector(
  selectedCountryProperties,
  (countryProperties) =>
    getAdditionalProperty(countryProperties, zipCodeMaskKey),
);
