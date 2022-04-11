const getLeadSourceTypeFromConfigParameter = (
  currentUrl,
  externalData,
  inputLeadSource,
) => {
  const invalidLeadSourceName = 'invalid';
  const webAccountLeadSourceName = 'web_account';

  const findLeadSource = (leadSources, name) => {
    const candidate = leadSources.find(
      (candidate) => candidate.Name.toLowerCase() === name,
    );
    return candidate;
  };

  const findLeadSourceValue = (leadSources, name) => {
    const candidate = findLeadSource(leadSources, name);
    if (candidate && candidate.Value) {
      return parseInt(candidate.Value, 10);
    }
    return undefined;
  };

  const leadSources = externalData?.leadSources?.data?.Codes || [];

  const overrideLeadSource =
    currentUrl.indexOf('localHost') ||
    currentUrl.indexOf('account-qa.f1.lbi.co.uk') ||
    currentUrl.indexOf('account.formula1.com') >= 0;

  const candidateLeadSource = findLeadSource(leadSources, inputLeadSource);

  let result;
  if (candidateLeadSource && candidateLeadSource.Name && inputLeadSource) {
    result = parseInt(candidateLeadSource.Value, 10);
  } else if (
    (leadSources &&
      typeof candidateLeadSource === 'undefined' &&
      inputLeadSource) ||
    inputLeadSource === ''
  ) {
    result = findLeadSourceValue(leadSources, invalidLeadSourceName);
  } else if (leadSources && inputLeadSource === null && overrideLeadSource) {
    result = findLeadSourceValue(leadSources, webAccountLeadSourceName);
  }

  return result;
};

export default getLeadSourceTypeFromConfigParameter;
