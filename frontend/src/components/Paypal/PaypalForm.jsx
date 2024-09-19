import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PayPalForm = ({ price }) => {
    const [message, setMessage] = useState('');

    const createOrder = async (data, actions) => {
        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cart: [
                        {
                            id: 'YOUR_PRODUCT_ID',
                            quantity: 'YOUR_PRODUCT_QUANTITY',
                        },
                    ],
                }),
            });

            const orderData = await response.json();

            if (orderData.id) {
                return orderData.id;
            }

            const errorDetail = orderData?.details?.[0];
            const errorMessage = errorDetail
                ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                : JSON.stringify(orderData);

            throw new Error(errorMessage);
        } catch (error) {
            console.error(error);
            setMessage(`Could not initiate PayPal Checkout...<br><br>${error}`);
        }
    };

    const onApprove = async (data, actions) => {
        try {
            const response = await fetch(`/api/orders/${data.orderID}/capture`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const orderData = await response.json();

            const errorDetail = orderData?.details?.[0];

            if (errorDetail?.issue === 'INSTRUMENT_DECLINED') {
                return actions.restart();
            } else if (errorDetail) {
                throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
            } else if (!orderData.purchase_units) {
                throw new Error(JSON.stringify(orderData));
            } else {
                const transaction =
                    orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
                    orderData?.purchase_units?.[0]?.payments?.authorizations?.[0];
                setMessage(
                    `Transaction ${transaction.status}: ${transaction.id}<br>
                    <br>See console for all available details`
                );
                console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
            }
        } catch (error) {
            console.error(error);
            setMessage(`Sorry, your transaction could not be processed...<br><br>${error}`);
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
