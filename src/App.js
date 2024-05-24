import { Route, Routes } from "react-router-dom";
import BoardList from "./routes/BoardList";
import React from "react";
import BoardDetail from "./routes/BoardDetail";
import BoardUpdate from "./routes/BoardUpdate";
import Contract from "./routes/Contract";
import MoreDetail from "./routes/MoreDetail";


function App() {
  return (
    <Routes>
      <Route path="/management/alluser" element={<BoardList/>}/>
      <Route path ="/management/detail/:itran/:irole"element={<BoardDetail/>}/>
      <Route path="/management/transaction" element={<BoardUpdate />} />
      <Route path="/management/transaction/:ialarm" element={<BoardUpdate />} />
      <Route path="/management/edit/:itran/:irole" element={<BoardUpdate />} />
      <Route path="/management/all" element={<Contract />} />
      <Route path="/management/moredetail/:ialarm/:irole" element={<MoreDetail/>} />
    </Routes>
  );
}

export default App;
