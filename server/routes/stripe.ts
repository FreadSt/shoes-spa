import { RequestHandler } from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

// Make sure your .env file is in the project root and contains:
// STRIPE_SECRET_KEY=sk_test_...
// VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
// The server uses STRIPE_SECRET_KEY, the client uses VITE_STRIPE_PUBLISHABLE_KEY

const stripe = new Stripe("sk_test_51RGRsTQbiHOSieT9XUx3ZlXvZOKbefBG18313IEyP6zCEowx70lx8TqQca5MF07CCNcvLgZqCNO0S7q92j3UCVBH00eGbrQ8Ts", {
  apiVersion: "2025-06-30.basil",
});

export const createCheckoutSession: RequestHandler = async (req, res) => {
  try {
    const { price, quantity = 1, customer_email } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price, // Stripe Price ID
          quantity,
        },
      ],
      mode: "payment",
      customer_email,
      success_url: "http://localhost:8080/success",
      cancel_url: "http://localhost:8080/product",
    });

    res.json({ sessionId: session.id });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createPaymentIntent: RequestHandler = async (req, res) => {
  try {
    const { amount, currency = "usd", metadata = {} } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        error: "Invalid amount. Amount must be greater than 0.",
      });
    }

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

// Debug route to test Stripe Price ID
import { Request, Response } from "express";

export const debugPrice: RequestHandler = async (req: Request, res: Response) => {
  try {
    const price = await stripe.prices.retrieve(req.params.id);
    res.json(price);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
