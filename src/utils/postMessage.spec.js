import { postMessage } from './postMessage';

describe('postMessage', () => {
  describe('For subscriber.created', () => {
    const message = postMessage('subscriber.created', {
      registered: true,
    });
    it('It should return "event" as the type value', () => {
      expect(message.type).to.be.equal('event');
    });
    it('It should return "subscriber.created" as the route value', () => {
      expect(message.data.route).to.be.equal('subscriber.created');
    });
    it('It should return "true" as the registered value', () => {
      expect(message.data.params.registered).to.be.equal(true);
    });
  });
});
