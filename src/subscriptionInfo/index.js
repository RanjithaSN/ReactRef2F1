import { useState } from 'react';
import { Container } from '@material-ui/core';
import { compose } from 'ramda';
import { withTranslation } from 'react-i18next';
import MySubscriptions from './containers/mySubscription';
import Devices from './containers/Devices';

function SubscriptionInfo(props) {
  const [showDevicesContainer, setShowDevicesContainer] = useState(false);

  const showDevicesContainerHandler = (status) => {
    setShowDevicesContainer(status);
  };

  return (
    <Container style={{ minHeight: '500px' }}>
      <MySubscriptions
        showDevicesContainerHandler={showDevicesContainerHandler}
      />
      {/* ------------Devices container------------ */}
      <Devices showDevicesContainer={showDevicesContainer} />
    </Container>
  );
}

export default compose(withTranslation())(SubscriptionInfo);
