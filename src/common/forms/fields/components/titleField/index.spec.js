import { mount } from '@cypress/react';
import TitleField from './';

describe('TitleField', () => {
  it('renders with a field class', () => {
    mount(<TitleField name="field" />);
    cy.get('.field').should('exist');
  });
  it('renders a Select component', () => {
    mount(<TitleField name="field" />);
    cy.get('[data-cy=field__select]').should('exist');
  });
  it('renders an error box when an error is passed in', () => {
    mount(<TitleField form={{ errors: { field: 'error' } }} name="field" />);
    cy.get('.field__errorBox').should('exist');
  });
});
