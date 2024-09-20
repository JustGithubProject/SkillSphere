import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

import axios from 'axios';
import Cookies from 'js-cookie';

const PayPalForm = ({ price }) => {
    const [message, setMessage] = useState('');

    const createOrder = async (data, actions) => {
        try {
            const accessToken = Cookies.get("access_token");
            const response = await axios.post(
                "http://localhost:8000/paypal/create-order",
                {
                    price: price,
                    currency_code: "USD", // FOR A WHILE WILL BE USD AS DEFAULT
                    access_token: accessToken 
                },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                }

            );
            console.log("Success");

        } catch(error) {
            console.log("Failed to top-up-balance: ", error);
        }

            
    };

    return (
        <PayPalScriptProvider options={{ 'client-id': 'Af-7rH7yIOw2FPwIQVVPg-A_7aQycoFmXSJQUeY7PcTlamLpQfl2anHmQLNExL-dqSMcrAUiXl3fjTdA' }}>
            <div>
                <div id="paypal-button-container">
                    <PayPalButtons
                        style={{
                            shape: 'rect',
                            layout: 'vertical',
                            color: 'gold',
                            label: 'paypal',
                        }}
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={(err) => {
                            console.error(err);
                            setMessage(`Sorry, your transaction could not be processed...<br><br>${err}`);
                        }}
                    />
                </div>
                <p id="result-message" dangerouslySetInnerHTML={{ __html: message }}></p>
            </div>
        </PayPalScriptProvider>
    );
};

export default PayPalForm;
