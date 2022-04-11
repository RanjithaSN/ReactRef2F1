import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import { Collapse, ListItem } from '@material-ui/core';
import NickNameField from './formControls/nickNameField/index';
import useUpdateDevice from '../../../common/hooks/useUpdateDevice';
import useUnregisterDevice from '../../../common/hooks/useUnregisterDevice';
import { firstName } from '../../../common/forms/validationSchemas/';
import ErrorScreen from '../../../common/errorScreen/index';
import DeviceType from './components/DeviceType';
import DeviceDate from './components/DeviceDate';
import SaveDevice from './containers/saveDevice';
import RemoveDevice from './containers/removeDevice';

const useStyles = makeStyles((theme) => ({
  deviceDateWrapper: {
    borderTop: `solid 1px ${theme.palette.custom.frame}`,
    marginTop: '15px',
    width: '100%',
  },
  deviceEditFormContainer: {
    height: '0',
    display: 'none',
  },
}));

const DeviceEditForm = ({
  editFormHandler,
  deviceItem,
  deviceItemNickName,
  startDate,
  deviceItemNickNameHandler,
  FadeInEditForm,
  updateRegisterDevicesList,
}) => {
  const { Nickname, ...deviceItemWithoutNickName } = deviceItem;
  const { DeviceId } = deviceItem;
  const classes = useStyles();

  /** useSelector */
  const language = useSelector((state) => state.ascendon.settings.language);

  const [updateDeviceResponse, updateDeviceFault, requestUpdateDevice] =
    useUpdateDevice();
  const [
    UnregisterDeviceResponse,
    UnregisterDeviceFault,
    requestUnregisterDevice,
  ] = useUnregisterDevice();

  /** useState */
  const [removeDeviceStatus, setRemoveDeviceStatus] = useState(false);
  const [errors, setErrors] = useState([]);
  let requestFaults = [updateDeviceFault, UnregisterDeviceFault];

  useEffect(() => {
    if (updateDeviceResponse) {
      deviceItemNickNameHandler(updateDeviceResponse.SubscriberDevice.Nickname);
      editFormHandler();
    }
  }, [updateDeviceResponse]);

  useEffect(() => {
    if (UnregisterDeviceResponse?.message === 'ok') {
      updateRegisterDevicesList(DeviceId);
      editFormHandler();
      setRemoveDeviceStatus((prevState) => !prevState);
      formik.setSubmitting(false);
    } else {
      formik.setSubmitting(true);
    }
  }, [UnregisterDeviceResponse]);

  useEffect(() => {
    const filterFaults = requestFaults.filter((fault) => !!fault);
    if (filterFaults.length) {
      const currentFault = filterFaults[0];
      setErrors([...errors, currentFault]);
    }
  }, [...requestFaults]);

  const NickNameFieldSchema = Yup.object().shape({
    NickName: firstName('deviceName', language),
  });

  const formik = useFormik({
    initialValues: {
      NickName: deviceItemNickName,
    },
    enableReinitialize: false,
    validationSchema: NickNameFieldSchema,
    validateOnChange: false,
    onSubmit: (values) => {
      const updatedDevice = {
        ...deviceItemWithoutNickName,
        Nickname: values.NickName,
      };
      requestUpdateDevice({ SubscriberDevice: updatedDevice });
    },
    onReset: () => {
      handleCancel();
    },
  });

  const handleCancel = () => {
    editFormHandler();
  };

  const removeDeviceContainerHandler = () => {
    setRemoveDeviceStatus((prevState) => !prevState);
  };

  const deleteDeviceHandler = () => {
    requestUnregisterDevice({ DeviceId: DeviceId });
    formik.setSubmitting(true);
  };

  return (
    <>
      {formik.isSubmitting && errors && errors.length !== 0 && (
        <ErrorScreen
          error={errors[0]}
          mt={5}
          mb={5}
          removeStyle={true}
          variant="h2"
        />
      )}
      <Collapse in={FadeInEditForm}>
        <DeviceType deviceType={deviceItem?.DeviceTypeName || ' '} />

        {FadeInEditForm && <NickNameField name="NickName" form={formik} />}

        <DeviceDate classes={classes.deviceDateWrapper} startDate={startDate} />

        <ListItem disableGutters>
          {!removeDeviceStatus ? (
            <SaveDevice
              formik={formik}
              removeDeviceContainerHandler={removeDeviceContainerHandler}
            />
          ) : (
            <RemoveDevice
              removeDeviceContainerHandler={removeDeviceContainerHandler}
              deleteDeviceHandler={deleteDeviceHandler}
            />
          )}
        </ListItem>
      </Collapse>
    </>
  );
};

DeviceEditForm.propTypes = {
  editFormHandler: PropTypes.func.isRequired,
  deviceItem: PropTypes.object.isRequired,
  deviceItemNickName: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  deviceItemNickNameHandler: PropTypes.func.isRequired,
};

export default DeviceEditForm;
