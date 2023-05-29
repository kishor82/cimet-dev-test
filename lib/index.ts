export const getCleanText = (strInputCode: string) =>
  strInputCode.replace(/<\/?[^>]+(>|$)/g, "");
