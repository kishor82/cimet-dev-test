import React, { useEffect, useState } from "react";
import { Card } from "../components/Card";
import DOMPurify from "dompurify";
import toast, { Toaster } from "react-hot-toast";
import { notifyError } from "../lib";

// Function to generate access token and store in localstorage
const getToken = async () => {
  try {
    const response = await fetch("/api/get_token");
    if (response.ok) {
      const authToken = await response.json();
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

  const fetchLists = async (data) => {
    const loadingID = toast.loading(
      retryCount > 0 ? ` Retrying: ${retryCount}` : "Fetching plans..."
    );
    try {
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
        const { data } = JSON.parse(cachedToken);
        fetchLists(data);
      }
    })();
  }, [refresh, retryCount]);

  return (
    <div>
      {data
        ? data.map((data, index) => <Card key={data.id} data={data} />)
        : "Failed to fetch data"}
      <Toaster />
    </div>
  );
};

export default Listing;
