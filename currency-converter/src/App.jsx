// App.js

import React, { useState, useEffect } from 'react';
import { FaDollarSign, FaEuroSign } from 'react-icons/fa';
import './App.css';

function App() {
    const [amount, setAmount] = useState('');
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [conversionResult, setConversionResult] = useState(null);

    // Dummy function for conversion; replace with API call for real data
    const convertCurrency = () => {
        // Simulate a conversion rate
        const rate = 0.85; // Example rate from USD to EUR
        const result = (amount * rate).toFixed(2);
        setConversionResult(result);
    };

    return (
        <div className="converter">
            <h2>Currency Converter</h2>
            <div className="input-group">
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                />
            </div>
            <div className="currency-select">
                <label>From:</label>
                <FaDollarSign />
                <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    {/* Add more options as needed */}
                </select>
                <label>To:</label>
                <FaEuroSign />
                <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
                    <option value="EUR">EUR</option>
                    <option value="USD">USD</option>
                    {/* Add more options as needed */}
                </select>
            </div>
            <button onClick={convertCurrency}>Convert</button>
            {conversionResult && (
                <p>
                    {amount} {fromCurrency} = {conversionResult} {toCurrency}
                </p>
            )}
        </div>
    );
}

export default App;
