import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  createPaymentIntent,
  confirmPayment,
  createCustomer,
} from "./routes/stripe";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Hello from Express server v2!" });
  });

  app.get("/api/demo", handleDemo);

  // Stripe API routes
  app.post("/api/create-payment-intent", createPaymentIntent);
  app.post("/api/confirm-payment", confirmPayment);
  app.post("/api/create-customer", createCustomer);

  return app;
}
