import axios from "axios";

const apiUrl = "https://localhost:7102/api";

enum GENDER {
  "FEMALE" = "Female",
  "MALE" = "Male",
}

type Person = {
  id: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  birthDate: Date;
  gender: GENDER;
  location: string;
};

const RouterService = {
  getPersons: async () => {
    const response = await fetch(`${apiUrl}/GetAll`, { mode: "cors" });
    const data = await response.json();

    return data;
  },

  getPerson: async (id: number) => {
    const response = await fetch(`${apiUrl}/GetById/${id}`, { mode: "cors" });
    const data = await response.json();

    return data;
  },

  addPerson: async (person: Person) => {
    const response = await axios.post(`${apiUrl}/Add`, person);
    console.log(response);

    return response;
  },

  updatePerson: async (id: number, person: Person) => {
    const response = await axios.put(`${apiUrl}/Update/${id}`, person);

    return response;
  },

  deletePerson: async (id: number) => {
    const response = await axios.delete(`${apiUrl}/Delete/${id}`);

    return response;
  },
};

export default RouterService;
