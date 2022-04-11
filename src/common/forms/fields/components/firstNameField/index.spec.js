import { mount } from '@cypress/react'; // or @cypress/vue
import FirstNameField from './';

describe('FirstNameField', () => {
  it('renders with a field class', () => {
    mount(<FirstNameField form={{}} name="field" />);
    cy.get('.field').should('exist');
  });
  it('renders an Input component', () => {
    mount(<FirstNameField form={{}} name="field" />);
    cy.get('[data-cy=field__input]').should('exist');
  });
  it('renders an error box when an error is passed in', () => {
    mount(
      <FirstNameField form={{ errors: { field: 'error' } }} name="field" />,
    );
    cy.get('.field__errorBox').should('exist');
  });
});
