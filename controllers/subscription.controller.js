import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });
    res.status(201).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};
export const getUserSubscriptions = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      console.log("params and uer don't match");
      const error = new Error("You are not the owner of this account");
      error.status = 401;
      throw error;
    }
    const subscriptions = await Subscription.find({ user: req.params.id });
    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    next(error);
  }
};
export const getSubscription = async (req, res, next) => {
  try {
    // extract sub id
    const subId = req.params.id;
    // find sub based on id
    const subscription = await Subscription.findById(subId);
    // check if sub.user === req.user.id
    if (subscription.user.toString() !== req.user.id) {
      console.log("ids do not match");
      const error = new Error("You are not the owner of this subscription");
      error.status = 403;
      throw error;
    }
    res.status(200).send({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};

export const editSubscription = async (req, res, next) => {
  try {
    const subId = req.params.id;
    const {
      name,
      price,
      currency,
      frequency,
      category,
      paymentMethod,
      status,
      startDate,
      renewalDate,
    } = req.body;

    // Find the subscription
    const subscription = await Subscription.findById(subId);
    // Check if subscription exists
    if (!subscription) {
      const error = new Error("Subscription not found");
      error.status = 404;
      throw error;
    }

    // Verify ownership
    if (subscription.user.toString() !== req.user.id) {
      const error = new Error(
        "You are not authorized to edit this subscription"
      );
      error.status = 403;
      throw error;
    }

    const updatedSubscription = await Subscription.findByIdAndUpdate(
      subId,
      {
        name,
        price,
        currency,
        frequency,
        category,
        paymentMethod,
        status,
        startDate,
        renewalDate,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    );

    res.status(200).send({
      success: true,
      data: updatedSubscription,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSubscription = async (req, res, next) => {
  try {
    // extract sub id
    const subId = req.params.id;
    // find sub based on id
    const subscription = await Subscription.findById(subId);
    // check if sub.user === req.user.id
    if (subscription.user.toString() !== req.user.id) {
      console.log("ids do not match");
      const error = new Error("You are not the owner of this subscription");
      error.status = 403;
      throw error;
    }
    // delete the sub
    const deleted = await Subscription.findByIdAndDelete(subId);
    res.status(200).send({ success: true, data: deleted });
  } catch (error) {
    next(error);
  }
};
