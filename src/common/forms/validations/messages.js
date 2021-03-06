export const getValidationMessage = (
  field = '',
  locale,
  error,
  additionalProps = {},
) => {
  const translations = {
    'en-US': {
      required: 'is required',
      invalid: 'is invalid',
      invalidFormat: `is in an invalid format ${
        additionalProps.format ? additionalProps.format : ''
      }`,
      maxLength: `exceeds max character length  ${
        additionalProps.maxLength ? additionalProps.maxLength : ''
      }`,
      minLength: `does not meet minimum character length  ${
        additionalProps.minLength ? additionalProps.minLength : ''
      }`,
      maxAge: `exceeds maximum age  ${
        additionalProps.maxAge ? additionalProps.maxAge : ''
      }`,
      minAge: `does not meet minimum age  ${
        additionalProps.minAge ? additionalProps.minAge : ''
      }`,
      pattern: `does not match pattern ${
        additionalProps.pattern ? additionalProps.pattern : ''
      }`,
      title: 'Title',
      firstName: 'First Name',
      lastName: 'Last Name',
      dateOfBirth: 'Date of Birth',
      country: 'Country of Residence',
      emailAddress: 'Email Address',
      password: 'Password',
      recieveLatestNews: '',
      confirmationTC: '',
      deviceName: 'Device Name',
      dataRuleValueInvalidDate: 'Please enter a valid date',
      regExPatternNoMatch: 'did not match pattern',
      dataRuleNumeric: 'must be numeric',
      nameOnCard: 'Name on card',
      securityCode: 'Security code',
      paymentFormSecurityCodeInvalid:
        'Invalid CVV for your selected card type.',
      creditCardExpiredError: 'The credit card has expired',
      addressLineOne: 'Address line 1',
      city: 'City',
      state: 'State',
      region: 'Region',
      province: 'Province',
      postalCode: 'Postal code',
      zipCode: 'Zip code',
    },
    'en-GB': {
      required: 'is required',
      invalid: 'is invalid',
      invalidFormat: `is in an invalid format ${
        additionalProps.format ? additionalProps.format : ''
      }`,
      maxLength: `exceeds max character length  ${
        additionalProps.maxLength ? additionalProps.maxLength : ''
      }`,
      minLength: `does not meet minimum character length  ${
        additionalProps.minLength ? additionalProps.minLength : ''
      }`,
      maxAge: `exceeds maximum age  ${
        additionalProps.maxAge ? additionalProps.maxAge : ''
      }`,
      minAge: `does not meet minimum age  ${
        additionalProps.minAge ? additionalProps.minAge : ''
      }`,
      pattern: `does not match pattern ${
        additionalProps.pattern ? additionalProps.pattern : ''
      }`,
      title: 'Title',
      firstName: 'First Name',
      lastName: 'Last Name',
      dateOfBirth: 'Date of Birth',
      country: 'Country of Residence',
      emailAddress: 'Email Address',
      password: 'Password',
      recieveLatestNews: '',
      confirmationTC: '',
      deviceName: 'Device Name',
      dataRuleValueInvalidDate: 'Please enter a valid date',
      regExPatternNoMatch: 'did not match pattern',
      dataRuleNumeric: 'must be numeric',
      nameOnCard: 'Name on card',
      securityCode: 'Security code',
      paymentFormSecurityCodeInvalid:
        'Invalid CVV for your selected card type.',
      creditCardExpiredError: 'The credit card has expired',
      addressLineOne: 'Address line 1',
      city: 'City',
      state: 'State',
      region: 'Region',
      province: 'Province',
      postalCode: 'Postal code',
      zipCode: 'Zip code',
    },
    'fr-FR': {
      required: 'est requis(e)',
      invalid: 'est invalide',
      invalidFormat: `est invalide ${
        additionalProps.format ? additionalProps.format : ''
      }`,
      maxLength: `exceeds max character length  ${
        additionalProps.maxLength ? additionalProps.maxLength : ''
      }`,
      minLength: `does not meet minimum character length  ${
        additionalProps.minLength ? additionalProps.minLength : ''
      }`,
      maxAge: `exceeds maximum age  ${
        additionalProps.maxAge ? additionalProps.maxAge : ''
      }`,
      minAge: `does not meet minimum age  ${
        additionalProps.minAge ? additionalProps.minAge : ''
      }`,
      pattern: `does not match pattern ${
        additionalProps.pattern ? additionalProps.pattern : ''
      }`,
      title: 'Titre',
      firstName: 'Pr??nom',
      lastName: 'Nom',
      dateOfBirth: 'Date de naissance',
      country: 'Pays de r??sidence',
      emailAddress: 'E-mail',
      password: 'Mot de passe',
      recieveLatestNews: '',
      confirmationTC: '',
      deviceName: 'Surnom',
      dataRuleValueInvalidDate: 'Veuillez saisir une date valide',
      regExPatternNoMatch: "n'est pas valide",
      dataRuleNumeric: 'doit comporter des chiffres',
      nameOnCard: 'Nom sur la carte',
      securityCode: 'Code de s??curit??',
      paymentFormSecurityCodeInvalid:
        'Cryptogramme invalide pour le type de carte s??lectionn??.',
      creditCardExpiredError:
        'Carte expir??e. Merci de mettre les informations ?? jour.',
      addressLineOne: 'Adresse de facturation',
      city: 'Ville',
      state: '??tat',
      region: 'R??gion',
      province: 'R??gion/Province',
      postalCode: 'Code postal',
      zipCode: 'Code ZIP',
    },
    'es-MX': {
      required: 'es requerido',
      invalid: 'no es v??lida',
      invalidFormat: `no es v??lida ${
        additionalProps.format ? additionalProps.format : ''
      }`,
      maxLength: `exceeds max character length  ${
        additionalProps.maxLength ? additionalProps.maxLength : ''
      }`,
      minLength: `does not meet minimum character length  ${
        additionalProps.minLength ? additionalProps.minLength : ''
      }`,
      maxAge: `exceeds maximum age  ${
        additionalProps.maxAge ? additionalProps.maxAge : ''
      }`,
      minAge: `does not meet minimum age  ${
        additionalProps.minAge ? additionalProps.minAge : ''
      }`,
      pattern: `does not match pattern ${
        additionalProps.pattern ? additionalProps.pattern : ''
      }`,
      title: 'T??tulo',
      firstName: 'Nombre',
      lastName: 'Apellido',
      dateOfBirth: 'Fecha de nacimiento',
      country: 'Pa??s de residencia',
      emailAddress: 'Email',
      password: 'Contrase??a',
      recieveLatestNews: '',
      confirmationTC: '',
      deviceName: 'Nick',
      dataRuleValueInvalidDate: 'Por favor, introduce una fecha v??lida',
      regExPatternNoMatch: 'no es v??lido',
      dataRuleNumeric: 'debe ser num??rico',
      nameOnCard: 'Nombre en la tarjeta',
      securityCode: 'C??digo de seguridad',
      paymentFormSecurityCodeInvalid:
        'CVV no v??lido para el tipo de tarjeta seleccionado.',
      creditCardExpiredError: 'La tarjeta de cr??dito ha caducado',
      addressLineOne: 'L??nea de direcci??n de correo 1',
      city: 'Localidad',
      state: 'Estado',
      region: 'Comunidad Aut??noma',
      province: 'Provincia',
      postalCode: 'C??digo postal',
      zipCode: 'C??digo postal',
    },
    'de-DE': {
      required: 'ist erforderlich',
      invalid: 'ist ung??ltig',
      invalidFormat: `ist ung??ltig ${
        additionalProps.format ? additionalProps.format : ''
      }`,
      maxLength: `exceeds max character length  ${
        additionalProps.maxLength ? additionalProps.maxLength : ''
      }`,
      minLength: `does not meet minimum character length  ${
        additionalProps.minLength ? additionalProps.minLength : ''
      }`,
      maxAge: `exceeds maximum age  ${
        additionalProps.maxAge ? additionalProps.maxAge : ''
      }`,
      minAge: `does not meet minimum age  ${
        additionalProps.minAge ? additionalProps.minAge : ''
      }`,
      pattern: `does not match pattern ${
        additionalProps.pattern ? additionalProps.pattern : ''
      }`,
      title: 'Titel',
      firstName: 'Vorname',
      lastName: 'Nachname',
      dateOfBirth: 'Geburtsdatum',
      country: 'Wohnsitz',
      emailAddress: 'E-Mail',
      password: 'Passwort',
      recieveLatestNews: '',
      confirmationTC: '',
      deviceName: 'Spitzname',
      dataRuleValueInvalidDate: 'Bitte geben Sie ein g??ltiges Datum ein',
      regExPatternNoMatch: 'ist ung??ltig',
      dataRuleNumeric: 'muss eine Zahl sein',
      nameOnCard: 'Name auf der Karte',
      securityCode: 'Pr??fnummer',
      paymentFormSecurityCodeInvalid:
        'Ung??ltige Pr??fnummer f??r die gew??hlte Kartenart.',
      creditCardExpiredError: 'Die Kreditkarte ist abgelaufen',
      addressLineOne: 'Adresszeile 1',
      city: 'Ort',
      state: 'Bundesland',
      region: 'Region',
      province: 'Kreis',
      postalCode: 'PLZ',
      zipCode: 'PLZ',
    },
    'nl-NL': {
      required: 'is vereist',
      invalid: 'is ongeldig',
      invalidFormat: `is vereist ${
        additionalProps.format ? additionalProps.format : ''
      }`,
      maxLength: `exceeds max character length  ${
        additionalProps.maxLength ? additionalProps.maxLength : ''
      }`,
      minLength: `does not meet minimum character length  ${
        additionalProps.minLength ? additionalProps.minLength : ''
      }`,
      maxAge: `exceeds maximum age  ${
        additionalProps.maxAge ? additionalProps.maxAge : ''
      }`,
      minAge: `does not meet minimum age  ${
        additionalProps.minAge ? additionalProps.minAge : ''
      }`,
      pattern: `does not match pattern ${
        additionalProps.pattern ? additionalProps.pattern : ''
      }`,
      title: 'Aanhef',
      firstName: 'Voornaam',
      lastName: 'Achternaam',
      dateOfBirth: 'Geboortedatum',
      country: 'Land',
      emailAddress: 'E-mailadres',
      password: 'Wachtwoord',
      recieveLatestNews: '',
      confirmationTC: '',
      deviceName: 'Bijnaam',
      dataRuleValueInvalidDate: 'Gelieve een correcte datum in te voeren',
      regExPatternNoMatch: 'kwam niet overeen met patroon',
      dataRuleNumeric: 'moet numeriek zijn',
      nameOnCard: 'Naam op kaart',
      securityCode: 'Beveiligingscode',
      paymentFormSecurityCodeInvalid:
        'Ongeldige CVV voor het geselecteerde type kaart.',
      creditCardExpiredError: 'De creditcard is verlopen',
      addressLineOne: 'Adresregel 1',
      city: 'Plaats',
      state: 'Land',
      region: 'Regio',
      province: 'Provincie',
      postalCode: 'Postcode',
      zipCode: 'Postcode',
    },
    'pt-BR': {
      required: '?? exigida',
      invalid: '?? inv??lida',
      invalidFormat: `is in an invalid format ${
        additionalProps.format ? additionalProps.format : ''
      }`,
      maxLength: `exceeds max character length  ${
        additionalProps.maxLength ? additionalProps.maxLength : ''
      }`,
      minLength: `does not meet minimum character length  ${
        additionalProps.minLength ? additionalProps.minLength : ''
      }`,
      maxAge: `exceeds maximum age  ${
        additionalProps.maxAge ? additionalProps.maxAge : ''
      }`,
      minAge: `does not meet minimum age  ${
        additionalProps.minAge ? additionalProps.minAge : ''
      }`,
      pattern: `does not match pattern ${
        additionalProps.pattern ? additionalProps.pattern : ''
      }`,
      title: 'T??tulo',
      firstName: 'Nome',
      lastName: 'Sobrenome',
      dateOfBirth: 'Data de nascimento',
      country: 'Pa??s de resid??ncia',
      emailAddress: 'E-mail',
      password: 'Senha',
      recieveLatestNews: '',
      confirmationTC: '',
      deviceName: 'Apelido',
      dataRuleValueInvalidDate: 'Inserir uma data v??lida',
      regExPatternNoMatch: 'n??o teve equival??ncia com o padr??o',
      dataRuleNumeric: 'deve ser num??rico',
      nameOnCard: 'Nome no cart??o',
      securityCode: 'C??digo de seguran??a',
      paymentFormSecurityCodeInvalid:
        'CVV inv??lido para o tipo de cart??o selecionado.',
      creditCardExpiredError: 'O cart??o de cr??dito expirou',
      addressLineOne: 'Linha de endere??o 1',
      city: 'Cidade',
      state: 'Estado',
      region: 'Regi??o',
      province: 'Prov??ncia',
      postalCode: 'C??digo postal',
      zipCode: 'CEP',
    },
  };
  return `${translations[locale][field] || ''} ${translations[locale][error]}`;
};
