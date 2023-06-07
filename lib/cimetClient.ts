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
    this.apiKey = "4NKQ3-815C2-8T5Q2-16318-55301";
    this.sessionId =
      "eyJpdiI6IkVNUkZ1N0hlSHhHSnJ3Vjl4aUlxc0E9PSIsInZhbHVlIjoieFlxa1wvVDYxQWl5U2pxMDFcL0R6ZVVvdEN6Mkk0R29TRDN3ZnN0U3VGcER0cEFMa2NVb0xNcDJudjlRTHRUbGJkIiwibWFjIjoiMTE0MmU0MGE5YmJhMzY4Nzc4MDExNmZkNTI1MjZhMGE3OTQyMDZmOTc1MTVmZDM1Mzc3ZmJmNjhmMzllOGYxYSJ9";
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
      throw new Error("Something went wrong!");
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
