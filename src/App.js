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
      <Route path="/api/management/alluser" element={<BoardList/>}/>
      <Route path ="/api/management/detail/:itran/:irole"element={<BoardDetail/>}/>
      <Route path="/api/management/transaction" element={<BoardUpdate />} />
      <Route path="/api/management/transaction/:ialarm" element={<BoardUpdate />} />
      <Route path="/api/management/edit/:irole/:ialarm" element={<BoardUpdate />} />
      <Route path="/api/management/all" element={<Contract />} />
      <Route path="/api/management/moredetail/:ialarm/:irole" element={<MoreDetail/>} />
    </Routes>
  );
}

export default App;
