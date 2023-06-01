const apiUrl = "https://localhost:7102/api";

type Person = {
  id?: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  birthDate: Date;
  gender: string;
  location: string;
};

const RouterService = {
  getPersons: () => {
    return fetch(`${apiUrl}/GetAll`, { mode: "cors" })
      .then((response) => response.json())
      .catch((error) => {
        console.error("ERROR", error);
        throw error;
      });
  },

  getPerson: (id: number) => {
    return fetch(`${apiUrl}/GetById/${id}`, { mode: "cors" })
      .then((response) => response.json())
      .catch((error) => {
        console.error("ERROR", error);
        throw error;
      });
  },

  addPerson: (person: Person) => {
    return fetch(`${apiUrl}/Add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("ERROR", error);
        throw error;
      });
  },

  updatePerson: (id: number, person: Person) => {
    return fetch(`${apiUrl}/Update/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("ERROR", error);
        throw error;
      });
  },

  deletePerson: (id: number) => {
    return fetch(`${apiUrl}/Delete/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key: id,
      }),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("ERROR", error);
        throw error;
      });
  },
};

export default RouterService;
