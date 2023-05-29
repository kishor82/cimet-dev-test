import React from "react";
import { Card, IData } from "../components/Card";

type Props = {
  serverData: {
    status: number;
    message: string;
    data: {
      electricity: [IData];
    };
  };
};

let cachedToken = null;
let tokenExpiration = null;

const getPlanList = async (authToken: string) => {
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

  try {
    const response = await fetch(
      "https://devcore02.cimet.io/v1/plan-list",
      reqOptions
    );

    return await response.json();
  } catch (error) {
    console.log({ error });
  }
};

const generateToken = async () => {
  const headers = new Headers();
  headers.append("Api-key", "4NKQ3-815C2-8T5Q2-16318-55301");

  const requestOptions = {
    method: "POST",
    headers: headers
  };

  const response = await fetch(
    "https://devcore02.cimet.io/v1/generate-token",
    requestOptions
  );

  return await response.json();
};

const getToken = async () => {
  if (
    cachedToken &&
    tokenExpiration &&
    new Date(tokenExpiration).getTime() > Date.now()
  ) {
    return cachedToken;
  } else {
    const {
      data: { token, token_expire_time }
    } = await generateToken();
    cachedToken = token;
    tokenExpiration = token_expire_time;

    return cachedToken;
  }
};

const Listing = ({ serverData }: Props) => {
  console.log({ serverData });
  return (
    <div>
      {serverData.status
        ? serverData.data.electricity.map((data) => (
            <div>
              <Card data={data} />
            </div>
          ))
        : "Failed to fetch data"}
    </div>
  );
};

export async function getServerSideProps() {
  const token = await getToken();
  const serverData = await getPlanList(token);

  // Pass the fetched data as props to the page component
  return {
    props: {
      serverData
    }
  };
}

export default Listing;
