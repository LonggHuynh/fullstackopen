import { useEffect, useState } from "react";
const Filter = ({ persons, setFilteredPersons }) => {
  const [filterTerm, setFilterTerm] = useState("")

  useEffect(() => {
    setFilteredPersons(persons.filter(person => person.name.toLowerCase().includes(filterTerm.toLowerCase())))
  }, [filterTerm, persons, setFilteredPersons])
  return (
    <>
      filter shown with
      <input value={filterTerm} onChange={e => setFilterTerm(e.target.value)} />
    </>
  );
};

export default Filter;
