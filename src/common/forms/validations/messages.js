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
      firstName: 'Prénom',
      lastName: 'Nom',
      dateOfBirth: 'Date de naissance',
      country: 'Pays de résidence',
      emailAddress: 'E-mail',
      password: 'Mot de passe',
      recieveLatestNews: '',
      confirmationTC: '',
      deviceName: 'Surnom',
      dataRuleValueInvalidDate: 'Veuillez saisir une date valide',
      regExPatternNoMatch: "n'est pas valide",
      dataRuleNumeric: 'doit comporter des chiffres',
      nameOnCard: 'Nom sur la carte',
      securityCode: 'Code de sécurité',
      paymentFormSecurityCodeInvalid:
        'Cryptogramme invalide pour le type de carte sélectionné.',
      creditCardExpiredError:
        'Carte expirée. Merci de mettre les informations à jour.',
      addressLineOne: 'Adresse de facturation',
      city: 'Ville',
      state: 'État',
      region: 'Région',
      province: 'Région/Province',
      postalCode: 'Code postal',
      zipCode: 'Code ZIP',
    },
    'es-MX': {
      required: 'es requerido',
      invalid: 'no es válida',
      invalidFormat: `no es válida ${
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
      title: 'Título',
      firstName: 'Nombre',
      lastName: 'Apellido',
      dateOfBirth: 'Fecha de nacimiento',
      country: 'País de residencia',
      emailAddress: 'Email',
      password: 'Contraseña',
      recieveLatestNews: '',
      confirmationTC: '',
      deviceName: 'Nick',
      dataRuleValueInvalidDate: 'Por favor, introduce una fecha válida',
      regExPatternNoMatch: 'no es válido',
      dataRuleNumeric: 'debe ser numérico',
      nameOnCard: 'Nombre en la tarjeta',
      securityCode: 'Código de seguridad',
      paymentFormSecurityCodeInvalid:
        'CVV no válido para el tipo de tarjeta seleccionado.',
      creditCardExpiredError: 'La tarjeta de crédito ha caducado',
      addressLineOne: 'Línea de dirección de correo 1',
      city: 'Localidad',
      state: 'Estado',
      region: 'Comunidad Autónoma',
      province: 'Provincia',
      postalCode: 'Código postal',
      zipCode: 'Código postal',
    },
    'de-DE': {
      required: 'ist erforderlich',
      invalid: 'ist ungültig',
      invalidFormat: `ist ungültig ${
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
      dataRuleValueInvalidDate: 'Bitte geben Sie ein gültiges Datum ein',
      regExPatternNoMatch: 'ist ungültig',
      dataRuleNumeric: 'muss eine Zahl sein',
      nameOnCard: 'Name auf der Karte',
      securityCode: 'Prüfnummer',
      paymentFormSecurityCodeInvalid:
        'Ungültige Prüfnummer für die gewählte Kartenart.',
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
      required: 'é exigida',
      invalid: 'é inválida',
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
      title: 'Título',
      firstName: 'Nome',
      lastName: 'Sobrenome',
      dateOfBirth: 'Data de nascimento',
      country: 'País de residência',
      emailAddress: 'E-mail',
      password: 'Senha',
      recieveLatestNews: '',
      confirmationTC: '',
      deviceName: 'Apelido',
      dataRuleValueInvalidDate: 'Inserir uma data válida',
      regExPatternNoMatch: 'não teve equivalência com o padrão',
      dataRuleNumeric: 'deve ser numérico',
      nameOnCard: 'Nome no cartão',
      securityCode: 'Código de segurança',
      paymentFormSecurityCodeInvalid:
        'CVV inválido para o tipo de cartão selecionado.',
      creditCardExpiredError: 'O cartão de crédito expirou',
      addressLineOne: 'Linha de endereço 1',
      city: 'Cidade',
      state: 'Estado',
      region: 'Região',
      province: 'Província',
      postalCode: 'Código postal',
      zipCode: 'CEP',
    },
  };
  return `${translations[locale][field] || ''} ${translations[locale][error]}`;
};
