import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';
import Cookies from 'js-cookie';

const PayPalForm = ({ price }) => {
    const [message, setMessage] = useState('');
    console.log(price);

    const createOrder = async (data, actions) => {
        try {
            const accessToken = Cookies.get("access_token");
            const response = await axios.post(
                "http://127.0.0.1:8000/paypal/create-order/",
                {
                    price: price.slice(1),
                    currency_code: "USD"
                },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                }
            );

            console.log("Response data: ", response.data);

            if (response.data && response.data.id) {
                return response.data.id;
            } else {
                throw new Error("Order ID not found in response");
            }

        } catch(error) {
            console.error("Error creating order: ", error);
            setMessage(`Sorry, your transaction could not be processed...<br><br>${error.message}`);
            return null;
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
                            color: 'blue',
                            label: 'paypal',
                        }}
                        createOrder={createOrder}
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
