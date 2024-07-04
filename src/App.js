
import { Route, Routes } from 'react-router-dom';
import ManagementUpd from "./routes/management/ManagementUpd";
import TransactionList from "./routes/management/TransactionList";
import MoreDetail from "./routes/management/MoreDetail";
import RemitGetAlarm from "./routes/transaction/RemitGetAlarm";
import RemitPostTran from "./routes/transaction/RemitPostTran";
import RemitGetAlarmCopy from "./routes/transaction/RemitGetAlarmCopy";
import PostTransferReq from "./routes/transfer/PostTransferReq";
import GetTransferAlarm from "./routes/transfer/GetTransferAlarm";
import GetTransferAlarmCopy from "./routes/transfer/GetTransferAlarmCopy";
import GetTransferAlarmAccept from "./routes/transfer/GetTransferAlarmAccept";
import PostTransferEht from "./routes/transfer/PostTransferEht";
import MainComponent from "./routes/MainComponent";
import GetTransferAll from "./routes/transfer/GetTransferAll";
import GetTransferAllCopy from "./routes/transfer/GetTransferAllCopy";
import GetTransferReceipt from "./routes/transfer/GetTransferReceipt";
import GetEhtGoodsList from "./routes/eht/GetEhtGoodsList";
import GetMyToken from "./routes/transfer/GetMyToken";
import GetMyTokenCopy from "./routes/transfer/GetMyTokenCopy";
import PutBarter from "./routes/eht/PutBarter";
import PutIncinerate from "./routes/eht/PutIncinerate";
import GetEhtUseAll from "./routes/eht/GetEhtUseAll";
import './App.css';
import { pdfjs } from 'react-pdf'; // react-pdf 라이브러리 import
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// pdfjs.GlobalWorkerOptions.workerSrc 설정 추가
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.min.mjs`;



function App() {

  return (
    
    <div className="App">
          <Routes>
            <Route path="/api/management/transaction" element={<ManagementUpd />} />
            <Route path="/api/management/transaction/:itran" element={<ManagementUpd />} />
            <Route path="/api/management/all" element={<TransactionList />} />
            <Route path="/api/management/moredetail/:itran/:irole" element={<MoreDetail />} />
            <Route path="/api/management/download/:irole/:contractRoute" element={<MoreDetail />} />
            <Route path="/transaction/select" element={<RemitGetAlarm />} />
            <Route path="/transaction/resp" element={<RemitGetAlarm />} />
            <Route path="/write" element={<RemitPostTran />} />
            <Route path="/transaction/allcategory" element={<RemitPostTran />} />
            <Route path="/transaction/req" element={<RemitPostTran />} />
            <Route path="/transaction/selects" element={<RemitGetAlarmCopy />} />
            <Route path="/transaction/resps" element={<RemitGetAlarmCopy />} />
            <Route path="/transferreq" element={<PostTransferReq />} />
            <Route path="/transfer/req" element={<PostTransferReq />} />
            <Route path="/transfer/alarm" element={<GetTransferAlarm />} />
            <Route path="/transfer/alarms" element={<GetTransferAlarmCopy />} />
            <Route path="/transfer/resp" element={<GetTransferAlarm />} />
            <Route path="/transfer/alarm/accept" element={<GetTransferAlarmAccept />} />
            <Route path="/transfer/:itransAlarm" element={<PostTransferEht />} />
            <Route path="/transfer" element={<PostTransferEht />} />
            <Route path="/main/:itransfer" element={<MainComponent />} />
            <Route path="/transfer/all" element={<GetTransferAll />} />
            <Route path="/transfer/alls" element={<GetTransferAllCopy />} />
            <Route path="/transfer/receipt/:itransfer/:loginedIuser" element={<GetTransferReceipt />} />
            <Route path="/eht/goodslist" element={<GetEhtGoodsList />} />
            <Route path="/transfer/myeht" element={<GetMyToken />} />
            <Route path="/transfer/myehts" element={<GetMyTokenCopy />} />
            <Route path="/eht/card" element={<PutBarter />} />
            <Route path="/eht/barter/:iehtGoods/:ehtExchangePrice" element={<PutBarter />} />
            <Route path="/eht/incinerate/:loginedIuser" element={<PutIncinerate />} />
            <Route path="/eht/use" element={<GetEhtUseAll />} />
          </Routes>
    </div>
  
  );
}


export default App;
