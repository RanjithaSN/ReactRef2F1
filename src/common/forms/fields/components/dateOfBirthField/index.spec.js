import { mount } from '@cypress/react'; // or @cypress/vue
import DateOfBirthField from './';

describe('DateOfBirthField', () => {
  it('renders with a field class', () => {
    mount(<DateOfBirthField form={{}} name="field" />);
    cy.get('.field').should('exist');
  });
  it('renders an Input component', () => {
    mount(<DateOfBirthField form={{}} name="field" />);
    cy.get('[data-cy=field__input]').should('exist');
  });
  it('renders an error box when an error is passed in', () => {
    mount(
      <DateOfBirthField form={{ errors: { field: 'error' } }} name="field" />,
    );
    cy.get('.field__errorBox').should('exist');
  });
});
