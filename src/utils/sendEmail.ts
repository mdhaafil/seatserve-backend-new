import nodemailer from "nodemailer";

export const sendReceiptEmail = async (
  to: string,
  order: any
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "seatserve8@gmail.com",
      pass: "wddnzrvohksjawas",
    },
  });

  const itemsList = order.items
    .map(
      (item: any) =>
        `${item.name} x ${item.quantity}`
    )
    .join("<br/>");

  const mailOptions = {
    from: "SeatServe <seatserve8@gmail.com>",
    to,
    subject: "SeatServe - Order Receipt",
    html: `
      <h2>We appreciate your order! Sit back and enjoy the show with SeatServe🎬🍿🎉</h2>
      <p><strong>Seats:</strong> ${order.seats.join(", ")}</p>
      <p><strong>Items:</strong></p>
      ${itemsList}
      <p><strong>Total Amount:</strong> ₹${order.totalAmount}</p>
      <p>Status: ${order.status}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
