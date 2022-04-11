import TitleField from './components/titleField';
import FirstNameField from './components/firstNameField';
import LastNameField from './components/lastNameField';
import DateOfBirthField from './components/dateOfBirthField';
import CountryField from './components/countryField';
import EmailField from './components/emailField';
import PasswordField from './components/passwordField';
import RecieveNewsField from './components/recieveNewsField';
import ConfirmationField from './components/confirmationField';
import {
  firstName,
  lastName,
  emailAddress,
  dateOfBirth,
  country,
  password,
} from '../validationSchemas';
export const fields = {
  title: {
    initialValue: 'Select',
    component: TitleField,
  },
  firstName: {
    initialValue: '',
    component: FirstNameField,
    validation: firstName,
  },
  lastName: {
    initialValue: '',
    component: LastNameField,
    validation: lastName,
  },
  dateOfBirth: {
    initialValue: '',
    component: DateOfBirthField,
    validation: dateOfBirth,
  },
  country: {
    initialValue: 'Select',
    component: CountryField,
    validation: country,
  },
  emailAddress: {
    initialValue: '',
    component: EmailField,
    validation: emailAddress,
  },
  password: {
    initialValue: '',
    component: PasswordField,
    validation: password,
  },
  recieveLatestNews: {
    initialValue: false,
    component: RecieveNewsField,
  },
  confirmationTC: {
    initialValue: false,
    component: ConfirmationField,
  },
};
