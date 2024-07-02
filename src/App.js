import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://crio-location-selector.onrender.com/countries"
        );
        console.log("Countries API Response:", response.data);
        setCountries(response.data);
      } catch (err) {
        console.log("Error fetching countries", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        if (selectedCountry) {
          const response = await axios.get(
            `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
          );
          console.log("States API Response:", response.data);
          setStates(response.data);
          setCities([]);
          setSelectedState("");
          setSelectedCity("");
        }
      } catch (err) {
        console.log("Error fetching states", err);
      }
    };

    fetchStates();
  }, [selectedCountry]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        if (selectedCountry && selectedState) {
          const response = await axios.get(
            `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
          );
          console.log("Cities API Response:", response.data);
          setCities(response.data);
          setSelectedCity("");
        }
      } catch (err) {
        console.log("Error fetching cities", err);
      }
    };

    fetchCities();
  }, [selectedCountry, selectedState]);

  return (
    <div className="App">
      <h1>Select Location</h1>
      <select
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
      >
        <option value="" disabled>
          Select Country
        </option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
      <select
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
        disabled={!selectedCountry}
      >
        <option value="">Select State</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>
      <select
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
        disabled={!selectedState}
      >
        <option value="" disabled>
          Select City
        </option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
      <div>
        {selectedCity && (
          <h3>
            You selected{" "}
            <span style={{ fontSize: "25px" }}>{selectedCity}</span>,
            <span style={{ color: "GrayText" }}>
              {" "}
              {selectedState},{selectedCountry}
            </span>
          </h3>
        )}
      </div>
    </div>
  );
}

export default App;
