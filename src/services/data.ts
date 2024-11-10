import axios from "axios";

const options = {
  method: "GET",
  url: "https://openapiv1.coinstats.app/coins",
  headers: {
    accept: "application/json",
    "X-API-KEY": "99BUdeQpq/YUAO9bGRKfOv433DqLic+R7zu6oUHAYeU=",
  },
};

export async function getData() {
  try {
    const result = await axios.request(options);
    return result.data;
  } catch (e: any) {
    throw e;
  }
}
