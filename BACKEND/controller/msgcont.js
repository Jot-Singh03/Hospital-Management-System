import { catcherr } from "../middlewares/catcherr.js";
import { Message } from "../model/mess_sch.js";
import ErrorHandler from "../middlewares/errmiddleware.js";

export const sendMessage = catcherr(async (req, res, next) => {
  const { firstName, lastName, email, phone, message } = req.body;
 
  if (!firstName || !lastName || !email || !phone || !message) {
    return next(new ErrorHandler("Please Fill All Fields"))
  }

  await Message.create({ firstName, lastName, email, phone, message });
  res.status(200).json({
    success: true,
    message: "Message Sent!",
  });
})

export const getAllMessages = catcherr(async (req, res, next) => {
  const messages = await Message.find();
  res.status(200).json({
    success: true,
    messages,
  });
});
