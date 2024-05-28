import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import '../App.css'; 


const Contract = () => {
    
        const [loading, setLoading] = useState(true);
        const [ContractList, setContractList] = useState({});
        const [error, setError] = useState(null);
        const [page, setPage] = useState(1);
        

        const getContractList = useCallback(async (queryString) => {
          try{
            const resp = await(await axios.get(`//localhost:8080/api/management/all?${queryString}`)).data;
            setContractList(resp);
            setLoading(false);
            console.log(resp);
       
            }catch (err) {
                setError(err);
                setLoading(false);
                console.error(error);
                return error;
              }

        },[error]);

        console.log(ContractList);

  useEffect(() => {

    const SelAllDto = {
        irole : 1 ,
        search : "",
        page : page
    };
    const queryString = new URLSearchParams(SelAllDto).toString();

    console.log(queryString)

    getContractList(queryString);
  }, [getContractList,page]);

  if(error){
    return <h2>error: {error.message}</h2>
  }


    const getAcceptStatus = (alAccept) => {
        if (alAccept === 1) {
          return "진행 중";
        } else if (alAccept === 2) {
          return "거절로 인한 취소";
        } else if (alAccept === 3) {
          return "거래 완료";
        } else if (alAccept === 4) {
          return "관리자 or 호스트로 인해 알람 취소";
        }else {
          return "확인 전";
        }
      };
      const irole = 1;

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
            {ContractList.length === 0 ?(
              <h2>조회할 데이터가 없습니다.</h2>
            ):(
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>계약명</th>
                  <th>개인 계약명</th>
                  <th>생성자</th>
                  <th>생성자 ID</th>
                  <th>생성자 등급</th>
                  <th>수신자</th>
                  <th>수신자 ID</th>
                  <th>수신자 등급</th>
                  <th>계약 상태</th>
                  <th>계약 생성일</th>
                  <th>계약 진행일</th>
                  <th>계약 완료일</th>
                </tr>
              </thead>
              <tbody>
                {ContractList.map((contract,index) => (
                   <tr key={contract.ialarm}> 
                    <td><a href={`/api/management/moredetail/${contract.ialarm}/${irole}`}>{index+1+((page-1)*10)}</a></td>
                    <td>{contract.trNm}</td>
                    <td>{contract.eachTrNm}</td>
                    <td>{contract.hostNm}</td>
                    <td>{contract.hostUid}</td>
                    <td>{contract.hostRole}</td>
                    <td>{contract.guestNm}</td>
                    <td>{contract.guestUid}</td>
                    <td>{contract.guestRole}</td>
                    <td>{getAcceptStatus(contract.alAccept)}</td>
                    <td>{contract.alCreatedAt}</td>
                    <td>{contract.alUpdatedAt}</td>
                    <td>{contract.alEndedAt}</td>
                    
                  </tr>
                ))}
              </tbody>
              <hr />
            </table> 
          )}
        </div>
      )}
    </div>
  );
};

export default Contract;