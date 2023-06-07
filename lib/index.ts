export * from "./cimetClient";
import toast from "react-hot-toast";

export const getCleanText = (strInputCode: string) =>
  strInputCode.replace(/<\/?[^>]+(>|$)/g, "");

export const notifyError = (error: any, name: string, id?: string) => {
  toast.error(
    error.message ? error.message : `${name}: Something went wrong!`,
    {
      id
    }
  );
};
