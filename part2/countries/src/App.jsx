import axios from "axios";
import { useEffect, useState } from "react";
import Country from "./components/Country";

function App() {
  const [query, setQuery] = useState("");
  const [allCountries, setAllCountries] = useState([])
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null)


  const url = "https://restcountries.com/v3.1/all";




  useEffect(() => {
    axios.get(url)
      .then((response) => response.data)
      .then((data) => setAllCountries(data));
  }, []);


  useEffect(() => {

    setSelectedCountry(null)
    setCountries(allCountries.filter(country => country.name.common.toLowerCase().includes(query.toLowerCase())))
  }, [allCountries, query])


  useEffect(() => {
    if (countries.length === 1) setSelectedCountry(countries[0])
  }, [countries])


  return (
    <div>
      <p>
        find countries: <input value={query} onChange={e => setQuery(e.target.value)} />
      </p>
      <div>
        {countries.length > 10 && <p>Too many countries </p>}
        {countries.length > 1 && countries.length <= 10 && countries.map(
          (country, ind) => <div key={ind}>{country.name.common} <button onClick={() => setSelectedCountry(country)}>View </button></div>
        )}

        {selectedCountry && <Country country={selectedCountry} />}
      </div>
    </div>
  );
}

export default App;
