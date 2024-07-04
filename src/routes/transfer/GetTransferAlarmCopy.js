import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import '../../App.css'; 
import {useNavigate} from'react-router-dom';

//송금 기능 송금 알람 조회 후 수락/거절 GET/PUT 클라이언트 2 입장
const GetTransferAlarmCopy = () => {
    
    const [loading, setLoading] = useState(false); // 초기에는 로딩 상태를 false로 설정
    const [TransferAlarmList, setTransferAlarmList] = useState([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const [fromOrTo, setFromOrTo] = useState(null); // 초기 상태를 null로 설정하여 조회를 막음

    const getTransferAlarmList = useCallback(async (queryString) => {
        setLoading(true);
        try {
            const resp = await (await axios.get(`//localhost:8080/transfer/alarms?${queryString}`)).data;
            setTransferAlarmList(resp);
            setLoading(false);
            console.log(resp);
        } catch (err) {
            setError(err);
            setLoading(false);
            console.error(err);
            window.alert(err.response?.data?.message || 'An error occurred');
            navigate(-1);
        }
    }, [navigate]);

    useEffect(() => {
        if (fromOrTo !== null) { // fromOrTo가 설정되었을 때만 조회 수행
            const SelTransferAlarmDto = {
                loginedIuser: 2,
                fromOrTo: fromOrTo,
                page: page
            };
            const queryString = new URLSearchParams(SelTransferAlarmDto).toString();
            console.log(queryString);
            getTransferAlarmList(queryString);
        }
    }, [getTransferAlarmList, page, fromOrTo]);

    if (error) {
        return <h2>error: {error.message}</h2>
    }

    const resp = async (itransAlarm, transAlState) => {
        const postData = {
            loginedIuser: 2,
            itransAlarm: itransAlarm,
            transAlState :transAlState
        };

        console.log(postData);

        try {
          const res = await axios.put(`//localhost:8080/transfer/resp`, postData);
          if(res.data === 1 && postData.transAlState === 2){
            alert('거절하였습니다.');
          }else if(res.data === 1 && postData.transAlState === 1){
            alert('수락하였습니다.');
          }else{
            alert('응답을 보내는 것에 실패하였습니다.');
          }
          setFromOrTo(null);

      } catch (error) {
          console.error(error);
          window.alert(error.response?.data?.message || 'An error occurred');
          setFromOrTo(null);
      }
        
    };

    const getAcceptStatus = (transAlState) => {
        if (transAlState === 0) {
            return "요청 중";
        }
    };

    return (
        <div>
            <div>
                <button onClick={() => setFromOrTo(1)}>내가 송금 요청한 알람</button>
                <button onClick={() => setFromOrTo(2)}>내가 송금 요청받은 알람</button>
            </div>
            {fromOrTo !== null && ( // fromOrTo가 설정된 이후에만 나머지 부분을 렌더링
                <>
                    <div>
                        <button onClick={() => setPage(page - 1)} disabled={page === 1}> 이전 페이지 </button>
                        <span>| {page} |</span>
                        <button onClick={() => setPage(page + 1)}>다음 페이지</button>
                    </div>
                    {loading ? (
                        <h2>loading...</h2>
                    ) : (
                        <div>
                            {TransferAlarmList.length === 0 ? (
                                <h2>조회할 데이터가 없습니다.</h2>
                            ) : (
                                <table>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>이름</th>
                                            <th> ID </th>
                                            <th>송금 상태</th>
                                            <th>요청 송금 금액</th>
                                            <th>송금 요청일</th>
                                            <th>알람 확인일</th>
                                            {fromOrTo === 2 && <th>수락/거절</th>} {/* 요청받은 알람일 때만 버튼 헤더 추가 */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {TransferAlarmList.map((alarm, index) => (
                                            <tr key={alarm.itransAlarm}>
                                                <td>{index + 1 + ((page - 1) * 10)}</td>
                                                <td>{alarm.unm}</td>
                                                <td>{alarm.uid}</td>
                                                <td>{getAcceptStatus(alarm.alState)}</td>
                                                <td>{alarm.transAmount}</td>
                                                <td>{alarm.transAlCreatedAt}</td>
                                                <td>{alarm.transAlUpdatedAt}</td>
                                                {fromOrTo === 2 && (
                                                    <td>
                                                        <button onClick={() => resp(alarm.itransAlarm, 1)}>수락</button>
                                                        <button onClick={() => resp(alarm.itransAlarm, 2)}>거절</button>
                                                    </td>
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default GetTransferAlarmCopy;