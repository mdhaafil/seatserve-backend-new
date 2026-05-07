import Seat from "../../models/Seat";

export const seedSeats = async () => {
  await Seat.deleteMany({}); // clear old data

  const rows = "ABCDEFGHIJ".split(""); // A → J
  const seats = [];

  for (const row of rows) {
    for (let num = 1; num <= 10; num++) {
      seats.push({
        seatId: `${row}${num}`, // A1, A2...
        row,
        number: num,
        type: row <= "C" ? "PLATINUM" : "GOLD",
        price: row <= "C" ? 250 : 180,
        isBooked: false,
      });
    }
  }

  await Seat.insertMany(seats);
  console.log("✅ Seats seeded A → J");
};
