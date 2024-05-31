import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import '../App.css'; 
import {useNavigate} from'react-router-dom';

  const RemitGetAlarmCopy = () => {

    //수신자, 사용자 입장 코드

    const [loading, setLoading] = useState(false); // 초기에는 로딩 상태를 false로 설정
    const [AlarmList, setAlarmList] = useState([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const [selectedAlarm, setSelectedAlarm] = useState(null);
    const [trPw, setTrPw] = useState('');
    const [fromOrTo, setFromOrTo] = useState(null); // 초기 상태를 null로 설정하여 조회를 막음

    const getAlarmList = useCallback(async (queryString) => {
        setLoading(true);
        try {
            const resp = await (await axios.get(`//localhost:8080/transaction/selects?${queryString}`)).data;
            setAlarmList(resp);
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
            const SelAlarmDto = {
                loginedIuser: 2,
                fromOrTo: fromOrTo,
                page: page
            };
            const queryString = new URLSearchParams(SelAlarmDto).toString();
            console.log(queryString);
            getAlarmList(queryString);
        }
    }, [getAlarmList, page, fromOrTo]);

    if (error) {
        return <h2>error: {error.message}</h2>
    }

    const accept = (alarm) => {
        setSelectedAlarm(alarm);
    };

    const handleConfirm = async() => {
        if (!selectedAlarm) return;
        const postData = {
            itran: selectedAlarm.itran,
            ialarm: selectedAlarm.ialarm,
            loginedIuser: 2,
            trPw: trPw,
            alState: 1
        };

        

        try {
          const res = await axios.put(`//localhost:8080/transaction/resps`, postData);
          if(res.data === 1){
            alert('수락하였습니다.');
          }else{
            alert('수락을 실패했습니다.');
          }
          setFromOrTo(null);
          
      } catch (error) {
          console.error(error);
          window.alert(error.response?.data?.message || 'An error occurred');
          setFromOrTo(null);
      }
    };

    const refuse = async (itran, ialarm) => {
        const postData = {
            itran: itran,
            ialarm: ialarm,
            loginedIuser: 2,
            trPw: '',
            alState: 2
        };
        try {
          const res = await axios.put(`//localhost:8080/transaction/resps`, postData);
          if(res.data === 1){
            alert('거절하였습니다.');
          }else{
            alert('거절을 실패했습니다.');
          }
          setFromOrTo(null);

      } catch (error) {
          console.error(error);
          window.alert(error.response?.data?.message || 'An error occurred');
          setFromOrTo(null);
      }
        
    };

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

    return (
        <div>
            <div>
                <button onClick={() => setFromOrTo(0)}>내가 요청한 알람</button>
                <button onClick={() => setFromOrTo(1)}>내가 요청받은 알람</button>
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
                            {AlarmList.length === 0 ? (
                                <h2>조회할 데이터가 없습니다.</h2>
                            ) : (
                                <table>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>거래명</th>
                                            <th>이름</th>
                                            <th> ID </th>
                                            <th>거래 상태</th>
                                            <th>거래 생성일</th>
                                            <th>알람 확인일</th>
                                            {fromOrTo === 1 && <th>수락/거절</th>} {/* 요청받은 알람일 때만 버튼 헤더 추가 */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {AlarmList.map((alarm, index) => (
                                            <tr key={alarm.ialarm}>
                                                <td>{index + 1 + ((page - 1) * 10)}</td>
                                                <td>{alarm.trNm}</td>
                                                <td>{alarm.userNm}</td>
                                                <td>{alarm.uid}</td>
                                                <td>{getAcceptStatus(alarm.alState)}</td>
                                                <td>{alarm.trCreatedAt}</td>
                                                <td>{alarm.alUpdatedAt}</td>
                                                {fromOrTo === 1 && (
                                                    <td>
                                                        <button onClick={() => accept(alarm)}>수락</button>
                                                        <button onClick={() => refuse(alarm.itran, alarm.ialarm)}>거절</button>
                                                    </td>
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    )}
                    {selectedAlarm && (
                        <div>
                            <h2>비밀번호 입력</h2>
                            <input
                                type='password'
                                value={trPw}
                                onChange={(e) => setTrPw(e.target.value)}
                            />
                            <button onClick={handleConfirm}>확인</button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default RemitGetAlarmCopy;