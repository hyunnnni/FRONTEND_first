import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import GetTransferReceiptCp from '../../components/GetTransferReceiptCp';
import {useNavigate} from'react-router-dom';

//송금 기능 송금 내역 상세조회 GET
const GetTransferReceipt = () => {

    const { itransfer } = useParams();
    const { loginedIuser } = useParams();
    
        const [loading, setLoading] = useState(true);
        const [transferReceipt, SetTransferReceipt] = useState({});
        const [error, setError] = useState(null);
        const navigate = useNavigate();
        

        const getTransferReceipt= useCallback(async (queryString) => {
            try{
                console.log(queryString);
        const resp = await(await axios.get(`//localhost:8080/transfer/receipt?${queryString}`)).data;
        SetTransferReceipt(resp);
        setLoading(false);
       
            }catch (err) {
                setError(err);
                setLoading(false);
                window.alert(err.response?.data?.message || 'An error occurred');
                // 확인을 누르면 이전 화면으로 이동
                navigate(-1);
              }

        },[navigate]);

        console.log(transferReceipt);

  useEffect(() => {

    const SelTransferReceiptDto = {
        loginedIuser : loginedIuser ,
        itransfer : itransfer
    };
    const queryString = new URLSearchParams(SelTransferReceiptDto).toString();

    console.log(queryString)

    getTransferReceipt(queryString);
  }, [getTransferReceipt,itransfer,loginedIuser]);

  if(error){
    alert(error.message)
  }

  return (
    <div>
      {loading ? (
        <h2>loading...</h2>
      ) : (
        <GetTransferReceiptCp
        itransfer ={transferReceipt.itransfer}
        itransAlarm={transferReceipt.itransAlarm}
        toIuser={transferReceipt.toIuser}
        toIuserNm={transferReceipt.toIuserNm}
        fromIuser={transferReceipt.fromIuser}
        fromIuserNm={transferReceipt.fromIuserNm}
        balance={transferReceipt.balance}
        transferAmount={transferReceipt.transferAmount}
        transCreatedAt={transferReceipt.transCreatedAt}
        transRe={transferReceipt.transRe}
        />
      )}
    </div>
  );
};

export default GetTransferReceipt;