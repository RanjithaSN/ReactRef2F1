import { mount } from '@cypress/react';
import ConfirmationField from './';

describe('ConfirmationField', () => {
  it('renders with a field class', () => {
    mount(<ConfirmationField form={{}} name="field" />);
    cy.get('.field').should('exist');
  });
});
