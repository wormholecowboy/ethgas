import './App.css';
import React from 'react';
import { useEffect, useState } from 'react';

const API_KEY = process.env.REACT_APP_ES_API_KEY;
const apiURL = `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${API_KEY}`;

function App() {
  const [gas, setGas] = useState([]);

  const grabGas = async () => {
    try {
      const res = await fetch(apiURL);
      const listItems = await res.json();
      console.log(listItems);
      setGas(listItems.result);
      console.log(`gas variable: ${JSON.stringify(gas)}`);
    } catch (err) {
      console.error(err.stack);
    }
  };

  useEffect(() => {
    (async () => await grabGas())();
  }, []);

  const mainDiv = {
    display: 'flex',
    'background-color': 'red',
  };

  const div1 = {
    'background-color': 'blue',
    color: 'white',
  };

  // use this to set timer: https://upmostly.com/tutorials/setinterval-in-react-components-using-hooks

  return (
    <div className="App" style={mainDiv}>
      <div style={div1}>Block: {gas.LastBlock}</div>
      <div id="divStyle2">Low: {gas.SafeGasPrice}</div>
      <div>Average: {gas.ProposeGasPrice}</div>
      <div>Fast: {gas.FastGasPrice}</div>
    </div>
  );
}

export default App;
