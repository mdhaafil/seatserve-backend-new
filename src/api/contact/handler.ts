import { Request, ResponseToolkit } from "@hapi/hapi";
import {
  saveContactQuery,
  getAllContacts,
} from "../../operations/contact.operation";
import { contactValidation } from "../../shared/validation/contact.validation";

export const createContactHandler = async (
  req: Request,
  h: ResponseToolkit,
) => {
  const error = contactValidation(req.payload);
  if (error) {
    return h.response({ message: error }).code(400);
  }

  try {
    const result = await saveContactQuery(req.payload);
    return h
      .response({
        success: true,
        message: "Contact submitted successfully",
        data: result,
      })
      .code(201);
  } catch (err) {
    return h.response({ message: "Server error" }).code(500);
  }
};

export const getAllContactsHandler = async (
  _req: Request,
  h: ResponseToolkit,
) => {
  try {
    const contacts = await getAllContacts();
    return h.response(contacts).code(200);
  } catch (err) {
    return h.response({ message: "Server error" }).code(500);
  }
};
