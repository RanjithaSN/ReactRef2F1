import { mount } from '@cypress/react'; // or @cypress/vue
import EmailField from './';

describe('FirstNameField', () => {
  it('renders with a field class', () => {
    mount(<EmailField form={{}} name="field" />);
    cy.get('.field').should('exist');
  });
  it('renders an Input component', () => {
    mount(<EmailField form={{}} name="field" />);
    cy.get('[data-cy=field__input]').should('exist');
  });
  it('renders an error box when an error is passed in', () => {
    mount(<EmailField form={{ errors: { field: 'error' } }} name="field" />);
    cy.get('.field__errorBox').should('exist');
  });
});
