import { NextApiRequest, NextApiResponse } from "next";
import { CimetAPIClient } from "../../lib";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiClient = new CimetAPIClient();
  try {
    const responseData = await apiClient.generateToken();
    res.status(200).json(responseData);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      error: error.message
    });
  }
}
