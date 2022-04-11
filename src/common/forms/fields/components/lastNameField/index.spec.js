import { mount } from '@cypress/react'; // or @cypress/vue
import LastNameField from './';

describe('LastNameField', () => {
  it('renders with a field class', () => {
    mount(<LastNameField form={{}} name="field" />);
    cy.get('.field').should('exist');
  });
  it('renders an Input component', () => {
    mount(<LastNameField form={{}} name="field" />);
    cy.get('[data-cy=field__input]').should('exist');
  });
  it('renders an error box when an error is passed in', () => {
    mount(<LastNameField form={{ errors: { field: 'error' } }} name="field" />);
    cy.get('.field__errorBox').should('exist');
  });
});
