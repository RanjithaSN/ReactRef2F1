import { mount } from '@cypress/react';
import RecieveNewsField from './';

describe('RecieveNewsField', () => {
  it('renders with a field class', () => {
    mount(<RecieveNewsField name="field" />);
    cy.get('.field').should('exist');
  });
  it('renders a Checkbox component', () => {
    mount(<RecieveNewsField name="field" />);
    cy.get('[data-cy=field__checkbox]').should('exist');
  });
  it('renders an error box when an error is passed in', () => {
    mount(
      <RecieveNewsField form={{ errors: { field: 'error' } }} name="field" />,
    );
    cy.get('.field__errorBox').should('exist');
  });
});
