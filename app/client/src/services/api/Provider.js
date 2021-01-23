import Client from "./Client";

export const httpClient = {
  getSlots: () => {
    return Client.get("/getAppointments");
  },
};
