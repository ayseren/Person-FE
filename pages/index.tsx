import {Button} from 'devextreme-react';

const Home = () => {
  const sayHelloWorld = () => {
    alert('Hello world!');
  };

  return <Button text="Click me" onClick={sayHelloWorld} />;
};

export default Home;
