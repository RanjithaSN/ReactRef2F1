import { mount } from '@cypress/react';
import CountryField from './';

describe('TitleField', () => {
  it('renders with a field class', () => {
    mount(<CountryField name="field" />);
    cy.get('.field').should('exist');
  });
  it('renders a Select component', () => {
    mount(<CountryField name="field" />);
    cy.get('[data-cy=field__select]').should('exist');
  });
  it('renders an error box when an error is passed in', () => {
    mount(<CountryField form={{ errors: { field: 'error' } }} name="field" />);
    cy.get('.field__errorBox').should('exist');
  });
});
