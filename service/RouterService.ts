import axios from "axios";

const apiUrl = "https://localhost:7102/api";

const RouterService = {
  getPersons: async () => {
    const response = await fetch(`${apiUrl}/GetAll`, { mode: "cors" });
    const data = await response.json();

    return data;
  },
};

export default RouterService;
