import React, { useEffect, useState } from "react";
import { Card } from "../components/Card";
import DOMPurify from "dompurify";
import toast, { Toaster } from "react-hot-toast";
import { notifyError } from "../lib";
import { TokenData, ElectricityPlansResponse } from "../lib/types";

// Function to generate access token and store in localstorage
const getToken = async () => {
  try {
    const tokenResponse = await fetch("/api/get_token");
    if (tokenResponse.ok) {
      const { data: authToken } = await tokenResponse.json();
      localStorage.setItem("token", JSON.stringify(authToken));
    }
  } catch (e) {
    notifyError(e, "getToken");
  }
};

const Listing = () => {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const fetchLists = async (tokenData: TokenData) => {
    const loadingID = toast.loading(
      retryCount > 0 ? ` Retrying: ${retryCount}` : "Fetching plans..."
    );
    try {
      const planListResponse = await fetch("/api/get_plan_list", {
        headers: {
          Authorization: tokenData.token
        }
      });
      if (planListResponse.ok) {
        const serverData: ElectricityPlansResponse =
          await planListResponse.json();
        if (serverData.status) {
          console.log({ serverData });
          const sanitizeData = serverData.data.electricity.map((data) => {
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
          });
          setData(sanitizeData);
          toast.success(serverData.message || "Success!", {
            id: loadingID
          });
        } else {
          if (serverData.message === "Your token has been expired.") {
            await getToken();
            setRetryCount((prev) => {
              return prev + 1;
            });
            setRefresh(!refresh);
          }
          if (retryCount === 0) {
            notifyError(serverData, "getPlanList", loadingID);
          }
        }
      }
    } catch (e) {
      toast.dismiss();
      notifyError(e, "getPlanList", loadingID);
    }
  };

  useEffect(() => {
    (async () => {
      const cachedToken = localStorage.getItem("token");

      if (!cachedToken) {
        await getToken();
        setRefresh(true);
      } else {
        const tokenData = JSON.parse(cachedToken);
        if (tokenData && !tokenData.token) {
          await getToken();
          setRefresh(true);
        }
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      // On second try show error message and stop, retryCount can be increase as per the requirements.
      if (retryCount > 0) {
        toast.dismiss();
        return toast.error("Failed to generate new token!");
      }
      const cachedToken = localStorage.getItem("token");
      if (cachedToken) {
        const tokenData = JSON.parse(cachedToken);
        if (tokenData.token) {
          fetchLists(tokenData);
        }
      }
    })();
  }, [refresh, retryCount]);

  return (
    <div>
      {data
        ? data.map((data) => <Card key={data.id} data={data} />)
        : "Failed to fetch data"}
      <Toaster />
    </div>
  );
};

export default Listing;
