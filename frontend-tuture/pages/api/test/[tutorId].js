export default async function handler(req, res) {
  await fetch(`http://${process.env.API_URL}/student/chooseTutor`, {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      studentId: "62051ce13dd882be338c2d2b",
      tutorId: req.query,
    }),
  });
  res.status(200).json({ yay: "Yay" });
}
