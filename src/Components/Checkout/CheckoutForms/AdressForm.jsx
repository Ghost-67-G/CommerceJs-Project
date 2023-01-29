/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { commerce } from "../../lib/commerce";
import { useForm, FormProvider } from "react-hook-form";
import { Link } from "react-router-dom";

const AdressForm = ({ checkoutToken, next }) => {
  const form = useForm();
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));

  const subdivisions = Object.entries(shippingSubdivisions).map(
    ([code, name]) => ({ id: code, label: name })
  );

  const options = shippingOptions.map((sO)=>({id:sO.id,label:`${sO.description} - ${sO.price.formatted_with_symbol}`}))


  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchSubdivisions = async (countryCode) => {
    const {subdivisions} =
      await commerce.services.localeListSubdivisions(countryCode);
    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (checkoutTokenId ,country ,region = null) => {
    const options =
      await commerce.checkout.getShippingOptions(checkoutTokenId,{country,region})
    setShippingOptions(options);
    setShippingOption(options[0].id);
  };

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

  useEffect(() => {
    if (shippingCountry) {
      fetchSubdivisions(shippingCountry);
    }
  }, [shippingCountry]);

  useEffect(()=>{
    if(shippingSubdivision){
      fetchShippingOptions(checkoutToken.id,shippingCountry,shippingSubdivision)
    }
  },[shippingSubdivision])

  return (
    <div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit((data)=>next({...data,shippingCountry,shippingSubdivision,shippingOption}))}>
          <div className="form-floating w-50 pe-1 d-inline-block mb-3">
            <input
              {...form.register("FirstName")}
              required
              type="text"
              className="form-control"
              //   id="floatingInput"
              placeholder="name@example.com"
            />
            <label for="floatingInput">First Name</label>
          </div>
          <div className="form-floating w-50 d-inline-block mb-3">
            <input
              {...form.register("LastName")}
              required
              type="text"
              className="form-control"
              //   id="floatingInput"
              placeholder="name@example.com"
            />
            <label for="floatingInput">Last Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              {...form.register("Email")}
              required
              type="email"
              className="form-control"
              //   id="floatingInput"
              placeholder="name@example.com"
            />
            <label for="floatingInput">Email address</label>
          </div>
          <div className="form-floating w-50 pe-1 d-inline-block mb-3">
            <input
              {...form.register("City")}
              required
              type="text"
              className="form-control "
              //   id="floatingInput"
              placeholder="name@example.com"
            />
            <label for="floatingInput">City</label>
          </div>
          <div className="form-floating w-50 d-inline-block mb-3">
            <input
              {...form.register("ZipCode")}
              required
              type="text"
              className="form-control "
              //   id="floatingInput"
              placeholder="name@example.com"
            />
            <label for="floatingInput">Zip / Postal Code</label>
          </div>
          <div className="form-floating pe-1 mb-3 w-50 d-inline-block">
            <select
              value={shippingCountry}
              onChange={(e) => {
                setShippingCountry(e.target.value);
              }}
              className="form-select"
            >
              {countries.map((country) => {
                return <option value={country.id}>{country.label}</option>;
              })}
            </select>
            <label for="floatingInput">Shipping Countries</label>
          </div>
          <div className="form-floating pe-1 mb-3 w-50 d-inline-block">
            <select
              value={shippingSubdivision}
              onChange={(e) => {
                setShippingSubdivision(e.target.value);
              }}
              className="form-select"
            >
              {subdivisions.map((subdivision) => {
                return (
                  <option value={subdivision.id}>{subdivision.label}</option>
                );
              })}
            </select>
            <label for="floatingInput">Shipping Subdivisions</label>
          </div>
          <div className="form-floating pe-1 mb-3 w-50 d-inline-block">
            <select
              value={shippingOption}
              onChange={(e) => {
                setShippingOption(e.target.value);
              }}
              className="form-select"
            >
              {options.map((option) => {
                return (
                  <option value={option.id}>{option.label}</option>
                );
              })}
            </select>
            <label for="floatingInput">Shipping Subdivisions</label>
          </div>
          <div className={`d-flex justify-content-between`}>
            <Link to='/cart' className={`btn btn-outline-dark`}>Back To Cart</Link>
            <button type="submit" className={`btn btn-primary`}>Next</button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AdressForm;
