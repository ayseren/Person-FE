import { Button } from "devextreme-react";
import React from "react";

const Person: React.FC = () => {
  const sayHelloWorld = () => {
    alert("Hello");
  };

  return <Button text="Click me" onClick={sayHelloWorld} />;
};

export default Person;
