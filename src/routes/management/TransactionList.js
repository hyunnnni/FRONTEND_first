import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import '../../App.css'; 
import {useNavigate} from'react-router-dom';

//관리자 기능 모든 거래 목록 조회 GET
const TransactionList = () => {
    
        const [loading, setLoading] = useState(true);
        const [TransactionList, setTransactionList] = useState([]);
        const [error, setError] = useState(null);
        const [page, setPage] = useState(1);
        const navigate = useNavigate();
        

        const getTransactionList = useCallback(async (queryString) => {
          try{
            const resp = await(await axios.get(`//localhost:8080/api/management/all?${queryString}`)).data;
            setTransactionList(resp);
            setLoading(false);
            console.log(resp);
       
            }catch (err) {
                setError(err);
                setLoading(false);
                console.error(err);
                window.alert(err.response?.data?.message || 'An error occurred');
                // 확인을 누르면 이전 화면으로 이동
                navigate(-1);
              }

        },[navigate]);

        console.log(TransactionList);

  useEffect(() => {

    const SelAllDto = {
        irole : 1 ,
        search : "",
        page : page
    };
    const queryString = new URLSearchParams(SelAllDto).toString();

    console.log(queryString)

    getTransactionList(queryString);
  }, [getTransactionList,page]);

  if(error){
    return <h2>error: {error.message}</h2>
  }


    const getAcceptStatus = (alState) => {
        if (alState === 1) {
          return "진행 중";
        } else if (alState === 2) {
          return "거절로 인한 취소";
        } else if (alState === 3) {
          return "거래 완료";
        } else if (alState === 4) {
          return "관리자 or 호스트로 인한 취소";
        } else {
          return "요청 중";
        }
      };

      const irole = 1;

      const colorBox = (mainCtgyCode) => {
        if (mainCtgyCode === '001') {
          return "highlight-pink";
        } else if (mainCtgyCode === '002') {
          return "highlight-yellow";
        } else{
          return "highlight-green";
        }
      };

    return (
        <div>
          <div>
            <button onClick={() => setPage(page-1)} disabled={page === 1}> 이전 페이지 </button>
            <span>| {page} |</span>
            <button onClick={()=> setPage(page+1)}>다음 페이지</button>
          </div>
          {loading ? (
          <h2>loading...</h2>
        ) : (
          <div>
            {TransactionList.length === 0 ?(
              <h2>조회할 데이터가 없습니다.</h2>
            ):(
            <div>
              <div className="transaction-type-info">
                고용/노무 <span className="color-box highlight-pink"></span> 
                일반민사 <span className="color-box highlight-yellow"></span>
                지식재산 <span className="color-box highlight-green"></span>
              </div>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>거래명</th>
                  <th>생성자</th>
                  <th>생성자 ID</th>
                  <th>수신자</th>
                  <th>수신자 ID</th>
                  <th>거래 상태</th>
                  <th>거래 생성일</th>
                  <th>거래 체결일</th>
                  <th>거래 완료일</th>
                </tr>
              </thead>
              <tbody>
                {TransactionList.map((Transaction,index) => (
                   <tr key={Transaction.ialarm}> 
                    <td className={colorBox(Transaction.mainCtgyCode)}><a href={`/api/management/moredetail/${Transaction.itran}/${irole}`}>{index+1+((page-1)*10)}</a></td>
                    <td className={colorBox(Transaction.mainCtgyCode)}>{Transaction.trsNm}</td>
                    <td className={colorBox(Transaction.mainCtgyCode)}>{Transaction.hostNm}</td>
                    <td className={colorBox(Transaction.mainCtgyCode)}>{Transaction.hostUid}</td>
                    <td className={colorBox(Transaction.mainCtgyCode)}>{Transaction.guestNm}</td>
                    <td className={colorBox(Transaction.mainCtgyCode)}>{Transaction.guestUid}</td>
                    <td className={colorBox(Transaction.mainCtgyCode)}>{getAcceptStatus(Transaction.alState)}</td>
                    <td className={colorBox(Transaction.mainCtgyCode)}>{Transaction.trsCreatedAt}</td>
                    <td className={colorBox(Transaction.mainCtgyCode)}>{Transaction.trsExecutiondatedAt}</td>
                    <td className={colorBox(Transaction.mainCtgyCode)}>{Transaction.trsEnddatedAt === null ? '기한 없음' : Transaction.trsEnddatedAt} </td>
                    
                  </tr>
                ))}
              </tbody>
              <hr />
            </table>
            </div> 
          )}
        </div>
      )}
    </div>
  );
};

export default TransactionList;