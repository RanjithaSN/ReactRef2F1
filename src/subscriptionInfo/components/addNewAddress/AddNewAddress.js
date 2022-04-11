import { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LocaleKeys from '../../../locales/keys';
import { useTranslation } from 'react-i18next';
import InputField from '../../../common/forms/fields/components/inputField';
import StateField from '../../../common/forms/fields/components/stateField';
import CountryField from '../../../common/forms/fields/components/countryField';
import {
  exceptionalCountries,
  zipCodeMaskValueUSA,
  addNewAddressDefaultErrorFields,
  getCountryBasedConfigurations,
} from '../../../constants/exceptionalCountries';

const useStyles = makeStyles((theme) => ({
  gridItemContainer: {
    [theme.breakpoints.down('lg')]: {
      flexDirection: 'row',
    },
  },
  gridItemContainerStateError: {
    [theme.breakpoints.up('lg')]: {
      marginTop: '0.8rem',
    },
  },
  addressLineGridItem: {
    [theme.breakpoints.up('lg')]: {
      width: '95%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  addressLineTwo: {
    margin: '1rem 0',
  },
  cityFieldGridItem: {
    [theme.breakpoints.up('lg')]: {
      width: '95%',
      marginLeft: '1rem',
    },
  },
  regionFieldGridItem: {
    [theme.breakpoints.up('lg')]: {
      marginLeft: '1rem',
      marginRight: '1rem',
      marginTop: '0.2rem',
    },
    [theme.breakpoints.down('md')]: {
      marginTop: '2rem',
    },
  },
  postalCodeFieldGridItem: {
    [theme.breakpoints.up('lg')]: {
      marginLeft: '1.5rem',
      marginTop: '0.2rem',
    },
    [theme.breakpoints.down('md')]: {
      marginTop: '2rem',
    },
  },
  countryFieldGridItem: {
    [theme.breakpoints.up('lg')]: {
      maxWidth: '18.082%',
    },
    [theme.breakpoints.down('md')]: {
      marginTop: '2rem',
    },
  },
}));

const AddNewAddress = (props) => {
  const { externalData, externalDataState, form, zipCodeMask } = props;
  const { values = {}, errors } = form;
  const { Province, Region, State, ZipCode, PostalCode } = errors;
  const { Country } = values;
  const classes = useStyles();
  const { t } = useTranslation();

  const [zipCode, showZipCode] = useState(false);
  const [inputName, setInputName] = useState('');
  const [inputLabel, setInputLabel] = useState('');
  const [addNewAddressFields, setAddNewAddressFields] = useState([]);
  const [maskValue, setMaskValue] = useState(null);

  useEffect(() => {
    if (exceptionalCountries?.includes(Country)) {
      const { zipCode, inputName, inputLabel, addNewAddressFields } =
        getCountryBasedConfigurations(Country);
      showZipCode(zipCode);
      setInputName(inputName);
      setInputLabel(t(LocaleKeys.subscriptionInfo.subscriptions[inputLabel]));
      setAddNewAddressFields(addNewAddressFields);
    } else {
      showZipCode(false);
      setInputName('');
      setAddNewAddressFields(addNewAddressDefaultErrorFields);
    }
    setMaskValue('');
  }, [Country]);

  useEffect(() => {
    if (Country && Country === 'USA') {
      setMaskValue(zipCodeMaskValueUSA);
    } else if (zipCodeMask?.Value) {
      const mask = zipCodeMask?.Value.replace(/#/g, 9);
      setMaskValue(mask);
    }
  }, [Country === 'USA', zipCodeMask]);

  return (
    <>
      <Grid container>
        <Grid item container direction="column" xs={12} lg={6}>
          <Grid item className={classes.addressLineGridItem}>
            <InputField
              id="addressLineOne"
              maxLength="80"
              name="AddressLineOne"
              form={form}
              required={true}
              label={t(
                LocaleKeys.subscriptionInfo.subscriptions.addressFormLineOne,
              )}
            />
          </Grid>
          <Grid
            item
            className={`${classes.addressLineGridItem} ${classes.addressLineTwo}`}
          >
            <InputField
              id="addressLineTwo"
              maxLength="50"
              name="AddressLineTwo"
              form={form}
              label={`${t(
                LocaleKeys.subscriptionInfo.subscriptions.addressFormLineTwo,
              )} ${t(LocaleKeys.subscriptionInfo.subscriptions.optional)}`}
            />
          </Grid>
        </Grid>

        <Grid
          item
          container
          className={classes.gridItemContainer}
          xs={12}
          lg={6}
        >
          <Grid item xs={12} lg={12} className={classes.cityFieldGridItem}>
            <InputField
              id="city"
              maxLength="40"
              name="City"
              form={form}
              required={true}
              label={t(
                LocaleKeys.subscriptionInfo.subscriptions.addressFormCity,
              )}
            />
          </Grid>
          <Grid
            item
            container
            className={`${
              (Province || Region || State || ZipCode || PostalCode) &&
              classes.gridItemContainerStateError
            }`}
          >
            {!exceptionalCountries.some(
              (countryItem) => countryItem === form?.values?.Country,
            ) ? (
              <Grid item xs={12} lg={5} className={classes.regionFieldGridItem}>
                <InputField
                  id="region"
                  name="Region"
                  form={form}
                  addNewAddressFields={addNewAddressFields}
                  label={t(
                    LocaleKeys.subscriptionInfo.subscriptions.addressFormRegion,
                  )}
                />
              </Grid>
            ) : (
              <Grid item xs={12} lg={5} className={classes.regionFieldGridItem}>
                <StateField
                  externalData={externalDataState}
                  form={form}
                  name={inputName}
                  addNewAddressFields={addNewAddressFields}
                  label={inputLabel}
                />
              </Grid>
            )}

            <Grid
              item
              xs={12}
              lg={5}
              className={classes.postalCodeFieldGridItem}
            >
              <InputField
                id={zipCode ? 'zipCode' : 'postalCode'}
                name={zipCode ? 'ZipCode' : 'PostalCode'}
                maxLength="9"
                form={form}
                required={true}
                mask={maskValue}
                label={
                  zipCode
                    ? t(
                        LocaleKeys.subscriptionInfo.subscriptions
                          .addressFormZipCode,
                      )
                    : t(
                        LocaleKeys.subscriptionInfo.subscriptions
                          .addressFormPostalCode,
                      )
                }
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item container direction="column">
          <Grid item xs={12} lg={6} className={classes.countryFieldGridItem}>
            <CountryField
              externalData={externalData}
              form={form}
              name="Country"
              addNewAddressFields={addNewAddressFields}
              label={t(
                LocaleKeys.subscriptionInfo.subscriptions.addressFormCountry,
              )}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default AddNewAddress;
