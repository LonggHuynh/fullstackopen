import axios from "axios";

const url = "http://localhost:3001/persons";

export const getPersons = () => axios.get(url).then((response) => response.data);

export const addPerson = (person) =>
  axios.post(url, person).then((response) => response.data);

export const deletePerson = (id) =>
  axios.delete(`${url}/${id}`).then((response) => response.data);

export const updatePerson = (person) => {
  return axios.put(`${url}/${person.id}`, person).then((response) => response.data);
};

