import { NextApiRequest, NextApiResponse } from "next";
import { CimetAPIClient } from "../../lib";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authToken = req.headers["authorization"];
  if (!authToken) {
    return res.status(400).json({ message: "Auth token required" });
  }

  const apiClient = new CimetAPIClient(authToken);

  try {
    const responseData = await apiClient.getPlanList();
    res.status(200).json(responseData);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      error: error.message
    });
  }
}
