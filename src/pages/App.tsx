import React from "react";
import dynamic from "next/dynamic";

const App: React.FC = () => {
  const DynamicRouter = dynamic(() => import("../../route/Router"));

  return (
    <div>
      <DynamicRouter />
    </div>
  );
};

export default App;
