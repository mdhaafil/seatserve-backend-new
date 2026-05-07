import Contact from "../models/Contact";

export const saveContactQuery = async (data: any) => {
  return await Contact.create(data);
};

export const getAllContacts = async () => {
  return await Contact.find().sort({ createdAt: -1 });
};
