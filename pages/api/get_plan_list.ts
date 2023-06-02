import fetch from "node-fetch";

export default async function handler(req, res) {
  const authToken = req.headers["authorization"];
  if (!authToken) {
    return res.status(400).json({ message: "Auth token required" });
  }
  const headers = new Headers();

  headers.append("Api-key", "4NKQ3-815C2-8T5Q2-16318-55301");
  headers.append("Auth-token", authToken);
  headers.append("Content-Type", "application/json");

  const payload = JSON.stringify({
    session_id:
      "eyJpdiI6IkVNUkZ1N0hlSHhHSnJ3Vjl4aUlxc0E9PSIsInZhbHVlIjoieFlxa1wvVDYxQWl5U2pxMDFcL0R6ZVVvdEN6Mkk0R29TRDN3ZnN0U3VGcER0cEFMa2NVb0xNcDJudjlRTHRUbGJkIiwibWFjIjoiMTE0MmU0MGE5YmJhMzY4Nzc4MDExNmZkNTI1MjZhMGE3OTQyMDZmOTc1MTVmZDM1Mzc3ZmJmNjhmMzllOGYxYSJ9"
  });

  const reqOptions = {
    method: "POST",
    headers: headers,
    body: payload
  };

  const response = await fetch(
    "https://devcore02.cimet.io/v1/plan-list",
    reqOptions
  );

  const responseData = await response.json();

  res.status(200).json(responseData);
}
