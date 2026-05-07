export const contactValidation = (body: any) => {
  const { name, phone, email, message } = body;

  if (!name || !phone || !email || !message) {
    return "All fields are required";
  }

  return null;
};
