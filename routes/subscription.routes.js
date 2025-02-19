import { Router } from "express";
const subscriptionRouter = Router();
import {
  createSubscription,
  deleteSubscription,
  getSubscription,
  getUserSubscriptions,
} from "../controllers/subscription.controller.js";
import authorize from "../middlewares/auth.middleware.js";

subscriptionRouter.get("/", (req, res) => {
  res.send({
    title: "GET all subscriptions",
  });
});
subscriptionRouter.get("/:id", authorize, getSubscription);
subscriptionRouter.post("/", authorize, createSubscription);
subscriptionRouter.put("/:id", (req, res) => {
  res.send({
    title: "UPDATE subscription",
  });
});
subscriptionRouter.delete("/:id", authorize, deleteSubscription);
subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);
subscriptionRouter.put("/:id/cancel", (req, res) => {
  res.send({
    title: "CANCEL subscription",
  });
});
subscriptionRouter.get("/upcoming-renewals", (req, res) => {
  res.send({
    title: "GET upcoming renewals",
  });
});

export default subscriptionRouter;
