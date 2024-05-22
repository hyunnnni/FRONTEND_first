import { Route, Routes } from "react-router-dom";
import BoardList from "./routes/BoardList";
import React from "react";
import BoardDetail from "./routes/BoardDetail";
import BoardUpdate from "./routes/BoardUpdate";


function App() {
  return (
    <Routes>
      <Route path="/management/all" element={<BoardList/>}/>
      <Route path ="/management/detail/:itran/:irole"element={<BoardDetail/>}/>
      <Route path="/management/transaction" element={<BoardUpdate />} />
      <Route path="/management/transaction/:itran" element={<BoardUpdate />} />
      <Route path="/management/edit/:itran/:irole" element={<BoardUpdate />} />
    </Routes>
  );
}

export default App;
