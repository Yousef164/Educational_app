const axios = require("axios");

const { paymobBase, apiKey, integrationId } = require("../config/env");

async function getAuthToken() {
  try {
    const resp = await axios.post(`${paymobBase}/auth/tokens`, {
      api_key: apiKey,
    });

    return resp.data.token;
  } catch (error) {
    console.error("Error getting auth token:", error);
    throw error;
  }
}

async function createOrder(authToken, amountCents, merchant_order_id) {
  try {
    const resp = await axios.post(`${paymobBase}/ecommerce/orders`, {
      auth_token: authToken,
      delivery_needed: "false",
      amount_cents: amountCents,
      currency: "EGP",
      merchant_order_id: merchant_order_id,
      items: [],
    });

    return resp.data.id;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}

async function getPaymentKey(authToken, amountCents, orderId, billingData) {
  try {
    const resp = await axios.post(`${paymobBase}/acceptance/payment_keys`, {
      auth_token: authToken,
      amount_cents: amountCents,
      expiration: 3600,
      order_id: orderId,
      billing_data: billingData,
      currency: "EGP",
      integration_id: integrationId,
    });

    return resp.data.token;
  } catch (error) {
    console.error("Error getting payment key:", error);
    throw error;
  }
}

module.exports = {
  getAuthToken,
  createOrder,
  getPaymentKey,
};
