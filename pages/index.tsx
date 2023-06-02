import React, { useEffect, useState } from "react";
import { Card, IData } from "../components/Card";
import DOMPurify from "dompurify";

type Props = {
  serverData: {
    status: number;
    message: string;
    data: {
      electricity: [IData];
    };
  };
};

const getToken = async () => {
  const response = await fetch("/api/get_token");
  if (response.ok) {
    const authToken = await response.json();
    localStorage.setItem("token", JSON.stringify(authToken));
  }
};

const Listing = () => {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    (async () => {
      const cachedToken = localStorage.getItem("token");
      if (!cachedToken) {
        await getToken();
        setRefresh(true);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      console.log({ retryCount });
      if (retryCount > 5) {
        return alert("Too many failed attempts");
      }
      const cachedToken = localStorage.getItem("token");
      if (cachedToken) {
        const { data } = JSON.parse(cachedToken);

        const response = await fetch("/api/get_plan_list", {
          headers: {
            Authorization: data.token
          }
        });
        if (response.ok) {
          const serverData = await response.json();
          if (serverData.status) {
            const sanitizeData = serverData.data.electricity.map(
              (data, index) => {
                return {
                  ...data,
                  dmo_content: {
                    ...data.dmo_content,
                    Ausgrid: DOMPurify.sanitize(data.dmo_content.Ausgrid)
                  },
                  view_benefit: DOMPurify.sanitize(data.view_benefit),
                  view_bonus: DOMPurify.sanitize(data.view_bonus),
                  view_contract: DOMPurify.sanitize(data.view_contract),
                  view_exit_fee: DOMPurify.sanitize(data.view_exit_fee)
                };
              }
            );
            setData(sanitizeData);
          } else {
            console.log({ serverData });
            if (serverData.message === "Your token has been expired.") {
              await getToken();
              setRetryCount((prev) => {
                return prev + 1;
              });
              setRefresh(!refresh);
            }
          }
        }
      }
    })();
  }, [refresh, retryCount]);

  return (
    <div>
      {data
        ? data.map((data, index) => <Card key={data.id} data={data} />)
        : "Failed to fetch data"}
    </div>
  );
};

export default Listing;
