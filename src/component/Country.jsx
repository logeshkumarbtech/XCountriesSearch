import { useState, useEffect } from "react";
import axios from "axios";

export default function Country() {
  const [countries, setCountries] = useState([]);
  const [input, setInput] =useState("");  
  const callApi = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      const data = await response["data"];
      if(!input){        
        setCountries(data);
      }else{
       let filteredData = data.filter((countri)=> (countri.name.common).toLowerCase().includes(input.toLowerCase())
        );        
        setCountries(filteredData);
      }
      
    } catch (err) {
      console.error("Error fetching data: ", err);
    }
  };

  useEffect(() => {
    callApi();
  }, [input]);

  const imageStyle={
    height:"100px",
    width:"100px",
  }

  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",    
  };

  const cardStyle = {
    width: "200px",       
    border: "1px solid #ccc",
    borderRadius: "10px",
    margin: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const navbar = {
    display:"flex",
    justifyContent:"center",
    height:"2em",
    backgroundColor: "white",
    
  }
  const textBox = {  
    margin: "2px",  
    width:"60%"
  }

  const inputName =(e) =>{
    setTimeout(() => {
        setInput(e.target.value);
    }, 2000);
  }

  return (
    <div>
    <div style={navbar}>
        <input type="text" style={textBox} onChange={inputName} placeholder="Search for countires..."></input>
    </div>
    <div style={containerStyle}>
      {countries.map((country) => {
        return (
          <div key={country.cca3} style={cardStyle} className="countryCard">
            <img
              src={country.flags.png}
              alt={`Flag of ${country.name.common}`}
              style={imageStyle}
            />
            <h2> {country.name.common}</h2>
          </div>
        );
      })}
    </div>
    </div>
  );
}
