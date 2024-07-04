import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import '../../App.css'; 
import { Link } from 'react-router-dom';

// 송금 기능 수락된 송금 알람 조회 후 송금 GET/POST 클라이언트 1 입장
const GetTransferAlarmAccept = () => {
    const [loading, setLoading] = useState(false);
    const [TransferAlarmAcceptList, setTransferAlarmAcceptList] = useState([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    

    const getTransferAlarmAcceptList = useCallback(async (queryString) => {
        setLoading(true);
        try {
            const resp = await axios.get(`//localhost:8080/transfer/alarm/accept?${queryString}`);
            setTransferAlarmAcceptList(resp.data);
            setLoading(false);
            console.log(resp.data);
        } catch (err) {
            setTransferAlarmAcceptList([]); // 오류 발생 시 빈 리스트로 설정
            setLoading(false);
            setError(err);
            window.alert(err.response?.data?.message || 'An error occurred');
            
        }
    }, []);

    console.error(error);
    
    useEffect(() => {
        const SelTransferAlarmAcceptDto = {
            loginedIuser: 2,
            page: page
        };
        const queryString = new URLSearchParams(SelTransferAlarmAcceptDto).toString();
        console.log(queryString);
        getTransferAlarmAcceptList(queryString);
    }, [getTransferAlarmAcceptList, page]);

    const getAcceptStatus = (transAlState) => {
        if (transAlState === 1) {
            return "요청 수락";
        }
    };



    return (
        <div>
            <div>
                <button onClick={() => setPage(page - 1)} disabled={page === 1}> 이전 페이지 </button>
                <span>| {page} |</span>
                <button onClick={() => setPage(page + 1)}>다음 페이지</button>
            </div>
            {loading ? (
                <h2>loading...</h2>
            ) : (
                <div>
                    
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>이름</th>
                                <th>ID</th>
                                <th>송금 상태</th>
                                <th>요청 송금 금액</th>
                                <th>송금 요청일</th>
                                <th>알람 확인일</th>
                                <th>송금하기</th>
                            </tr>
                        </thead>
                        <tbody>
                            {TransferAlarmAcceptList.length === 0 ? (
                                <tr>
                                    <td colSpan="8">조회할 데이터가 없습니다.</td>
                                </tr>
                            ) : (
                                TransferAlarmAcceptList.map((alarm, index) => (
                                    <tr key={alarm.itransAlarm}>
                                        <td>{index + 1 + ((page - 1) * 10)}</td>
                                        <td>{alarm.userNm}</td>
                                        <td>{alarm.uid}</td>
                                        <td>{getAcceptStatus(alarm.transAlState)}</td>
                                        <td>{alarm.transAmount}</td>
                                        <td>{alarm.transAlCreatedAt}</td>
                                        <td>{alarm.transAlUpdatedAt}</td>
                                        <td><Link to={`/transfer/${alarm.itransAlarm}`}>송금</Link></td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default GetTransferAlarmAccept;