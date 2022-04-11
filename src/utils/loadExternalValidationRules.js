import axios from 'axios';

const loadExternalValidationRules = (url) => {
  const defaultResult = {};
  return axios
    .get(url)
    .then((result) => result?.data || defaultResult)
    .catch((error) => defaultResult);
};

export default loadExternalValidationRules;
