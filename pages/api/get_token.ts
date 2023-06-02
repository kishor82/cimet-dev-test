import fetch from "node-fetch";

export default async function handler(req, res) {
  const url = "https://devcore02.cimet.io/v1/generate-token";
  const headers = {
    "Content-Type": "application/json",
    "Api-key": "4NKQ3-815C2-8T5Q2-16318-55301"
  };

  const options = {
    method: "POST",
    headers: headers
  };

  const response = await fetch(url, options);

  const responseData = await response.json();

  res.status(200).json(responseData);
}
