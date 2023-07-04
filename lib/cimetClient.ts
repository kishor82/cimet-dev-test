import fetch, { RequestInit } from "node-fetch";

export class CimetAPIClient {
  private apiKey: string;
  private sessionId: string;
  authToken: string;
  baseURL: string;
  headers: {
    [key: string]: string;
  };
  constructor(authToken?: string) {
    this.authToken = authToken;
    this.baseURL = "https://devcore02.cimet.io/v1";
    this.apiKey = process.env.API_KEY;
    this.sessionId = process.env.SESSION_ID;
    this.headers = {
      "Content-Type": "application/json",
      "Api-key": this.apiKey,
      "Auth-token": this.authToken
    };
  }

  async request(endpoint: string, reqOptions?: RequestInit) {
    try {
      const response = await fetch(endpoint, reqOptions);
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getPlanList() {
    const endpoint = `${this.baseURL}/plan-list`;
    const reqOptions = {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        session_id: this.sessionId
      })
    };

    return await this.request(endpoint, reqOptions);
  }

  async generateToken() {
    const endpoint = `${this.baseURL}/generate-token`;
    const reqOptions = {
      method: "POST",
      headers: this.headers
    };

    return await this.request(endpoint, reqOptions);
  }
}
