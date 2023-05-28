import { Button } from "devextreme-react";
import React, { useEffect, useState } from "react";
import RouterService from "../../service/RouterService";

const Person: React.FC = () => {
  const [persons, setPersons] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const itemsData = await RouterService.getItems();
      console.log(itemsData);
    };

    fetchData();
  }, []);

  return <Button text="Click me" onClick={() => {}} />;
};

export default Person;
