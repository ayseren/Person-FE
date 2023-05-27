import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Person from "../src/pages/Person";
import { ProtectedRoute } from "./ProtectedRoute";

const Router: React.FC = () => {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" index element={<Person />} />
            <Route path="/person" index element={<Person />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
