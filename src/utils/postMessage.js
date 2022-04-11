function postMessage(route, params) {
  const message = {
    type: 'event',
    data: {
      route,
      params,
    },
  };
  window.parent.postMessage(JSON.stringify(message), document.referrer);
  return message;
}

export default postMessage;
export { postMessage };
