import { RequestHandler } from "express";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_demo_key", {
  apiVersion: "2025-06-30.basil",
});

export const createPaymentIntent: RequestHandler = async (req, res) => {
  try {
    const { amount, currency = "usd", metadata = {} } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        error: "Invalid amount. Amount must be greater than 0.",
      });
    }

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // Ensure amount is an integer
      currency,
      metadata,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({
      error: "Failed to create payment intent",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const confirmPayment: RequestHandler = async (req, res) => {
  try {
    const { paymentIntentId } = req.body;

    if (!paymentIntentId) {
      return res.status(400).json({
        error: "Payment Intent ID is required",
      });
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    res.json({
      status: paymentIntent.status,
      paymentIntent,
    });
  } catch (error) {
    console.error("Error confirming payment:", error);
    res.status(500).json({
      error: "Failed to confirm payment",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const createCustomer: RequestHandler = async (req, res) => {
  try {
    const { email, name, phone } = req.body;

    if (!email) {
      return res.status(400).json({
        error: "Email is required",
      });
    }

    const customer = await stripe.customers.create({
      email,
      name,
      phone,
    });

    res.json({
      customerId: customer.id,
      customer,
    });
  } catch (error) {
    console.error("Error creating customer:", error);
    res.status(500).json({
      error: "Failed to create customer",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
