import { mount } from '@cypress/react';
import PasswordField from './';

describe('PasswordField', () => {
  it('renders with a field class', () => {
    mount(<PasswordField name="field" />);
    cy.get('.field').should('exist');
  });
  it('renders a Input component', () => {
    mount(<PasswordField name="field" />);
    cy.get('[data-cy=field__input]').should('exist');
    cy.get(`[data-cy=password__requirement]`)
      .should('exist')
      .should('have.css', 'color', 'rgba(0, 0, 0, 0.54)');
  });
  it('renders an error box when an error is passed in', () => {
    const field = 'minMaxCharacter';
    mount(<PasswordField form={{ errors: { field: field } }} name="field" />);

    cy.get(`[data-cy=password__requirement]`)
      .should('exist')
      .should('have.css', 'color', 'rgb(244, 67, 54)');
  });
});
