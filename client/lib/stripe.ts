import { loadStripe } from "@stripe/stripe-js";

// Load Stripe with your publishable key
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ||
    "pk_test_51234567890abcdefghijklmnopqrstuvwxyz123456789",
);

export default stripePromise;

export const createPaymentIntent = async (amount: number, currency = "usd") => {
  try {
    const response = await fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount * 100, // Convert to cents
        currency,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create payment intent");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating payment intent:", error);
    throw error;
  }
};
