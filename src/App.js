import { Route, Routes } from "react-router-dom";
//import TransactionList from "./routes/TransactionList";
import React from "react";
import ManagementUpd from "./routes/ManagementUpd";
import TransactionList from "./routes/TransactionList";
import MoreDetail from "./routes/MoreDetail";
import RemitGetAlarm from "./routes/RemitGetAlarm";
import RemitPostTran from "./routes/RemitPostTran";
import RemitGetAlarmCopy from "./routes/RemitGetAlarmCopy";



function App() {
  return (
    <Routes>

      <Route path="/api/management/transaction" element={<ManagementUpd />} />
      <Route path="/api/management/transaction/:itran" element={<ManagementUpd />} />
      <Route path="/api/management/all" element={<TransactionList />} />
      <Route path="/api/management/moredetail/:itran/:irole" element={<MoreDetail/>} />
      <Route path="/transaction/select" element={<RemitGetAlarm/>} />
      <Route path="/transaction/resp" element={<RemitGetAlarm/>} />
      <Route path="/write" element={<RemitPostTran />} />
      <Route path="/transaction/req" element={<RemitPostTran />} />
      <Route path="/transaction/selects" element={<RemitGetAlarmCopy />} />
      <Route path="/transaction/resps" element={<RemitGetAlarmCopy />} />
    </Routes>
  );
}

export default App;
