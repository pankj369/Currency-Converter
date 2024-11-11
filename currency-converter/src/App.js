import React, { useEffect, useState } from 'react';
// Import currency icons from React Icons library
import { FaDollarSign, FaEuroSign, FaPoundSign, FaYenSign } from 'react-icons/fa';
import './App.css';

const App = () => {
    // Define state variables for storing currency data and user inputs
    const [currencies, setCurrencies] = useState([]);   // List of currency codes
    const [fromCurrency, setFromCurrency] = useState("USD");   // Default 'from' currency
    const [toCurrency, setToCurrency] = useState("EUR");       // Default 'to' currency
    const [amount, setAmount] = useState("");   // Amount to convert
    const [result, setResult] = useState("");   // Result of the conversion

    // Define the base API URL for currency data
    const apiUrl = "https://api.exchangerate-api.com/v4/latest/";

    // Fetch the list of available currencies when the component first loads
    useEffect(() => {
        fetch(`${apiUrl}USD`)
            .then((response) => response.json())
            .then((data) => {
                const currencyNames = Object.keys(data.rates);  // Get list of currency codes
                setCurrencies(currencyNames);  // Save list to 'currencies' state
            });
    }, []);  // Empty dependency array ensures this only runs once on mount

    // Function to handle currency conversion
    const convertCurrency = () => {
        // Validate if an amount is entered
        if (!amount) {
            setResult("Please enter an amount.");  // Show a message if amount is missing
            return;
        }

        // Fetch exchange rate data for the selected 'from' currency
        fetch(`${apiUrl}${fromCurrency}`)
            .then((response) => response.json())
            .then((data) => {
                const rate = data.rates[toCurrency];  // Get the exchange rate for 'to' currency
                const convertedAmount = (amount * rate).toFixed(2);  // Calculate converted amount
                setResult(`${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`);
            })
            .catch(() => setResult("Error retrieving exchange rate."));  // Handle fetch errors
    };

    // Function to display appropriate icon for common currencies
    const getCurrencyIcon = (currency) => {
        switch (currency) {
            case "USD":
                return <FaDollarSign />;
            case "EUR":
                return <FaEuroSign />;
            case "GBP":
                return <FaPoundSign />;
            case "JPY":
                return <FaYenSign />;
            default:
                return null;
        }
    };

    return (
        <div className="converter">
            {/* Main Title */}
            <h2>Currency Converter</h2>

            {/* Input field for amount to convert */}
            <div className="input-group">
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                />
            </div>

            {/* Dropdowns for selecting currencies */}
            <div className="currency-select">
                {/* 'From' currency dropdown */}
                <label>
                    From: {getCurrencyIcon(fromCurrency)}
                    <select
                        value={fromCurrency}
                        onChange={(e) => setFromCurrency(e.target.value)}
                    >
                        {/* Populate options with available currencies */}
                        {currencies.map((currency) => (
                            <option key={currency} value={currency}>
                                {currency}
                            </option>
                        ))}
                    </select>
                </label>

                {/* 'To' currency dropdown */}
                <label>
                    To: {getCurrencyIcon(toCurrency)}
                    <select
                        value={toCurrency}
                        onChange={(e) => setToCurrency(e.target.value)}
                    >
                        {/* Populate options with available currencies */}
                        {currencies.map((currency) => (
                            <option key={currency} value={currency}>
                                {currency}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            {/* Button to trigger currency conversion */}
            <button onClick={convertCurrency}>Convert</button>

            {/* Display the result */}
            <p id="result">{result}</p>
        </div>
    );
};

export default App;
