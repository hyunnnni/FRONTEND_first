import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import '../../App.css'; 

//송금 기능 송금 내역 조회 GET 클라이언트 1 입장
const GetTransferAll = () => {
    
    const [loading, setLoading] = useState(false); // 초기에는 로딩 상태를 false로 설정
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [selTransferAllList, setSelTransferAllList] = useState([]);
    const [fromOrTo, setFromOrTo] = useState(0); // 초기 상태를 null로 설정하여 조회를 막음
    const loginedIuser = 1;

    const getSelTransferAllList = useCallback(async (queryString) => {
        setLoading(true);
        try {
            const resp = await (await axios.get(`//localhost:8080/transfer/all?${queryString}`)).data;
            setSelTransferAllList(resp);
            setLoading(false);
            console.log(resp);
        } catch (err) {
            setSelTransferAllList([]); // 오류 발생 시 빈 리스트로 설정
            setError(err);
            
            setLoading(false);
            window.alert(err.response?.data?.message || 'An error occurred');
        }
    }, []);
    console.log(error)

    useEffect(() => {
        
            const SelAlarmDto = {
                loginedIuser: 1,
                fromOrTo: fromOrTo,
                page: page
            }
            
            const queryString = new URLSearchParams(SelAlarmDto).toString();
            console.log(queryString);
            getSelTransferAllList(queryString);

        }, [getSelTransferAllList, page, fromOrTo]);


    return (
        <div>
            <div>
            <button onClick={() => setFromOrTo(0)}>전체 내역</button>
                <button onClick={() => setFromOrTo(1)}>내가 송금한 내역</button>
                <button onClick={() => setFromOrTo(2)}>내가 송금받은 내역</button>
            </div>
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
                                <th>명세서</th>
                                <th>받은 사람</th>
                                <th>보낸 사람</th>
                                <th>나의 잔액</th>
                                <th>송금액</th>
                                <th>송금일</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selTransferAllList.length === 0 ? (
                                <tr>
                                <td colSpan="8">조회할 데이터가 없습니다.</td>
                                </tr>
                            ) : (
                                selTransferAllList.map((transfer, index) => (
                                    <tr key={transfer.itransfer}>
                                    <td><a href={`/transfer/receipt/${transfer.itransfer}/${loginedIuser}`}>{index+1+((page-1)*10)}</a></td>
                                    <td style={{ color: transfer.toIuser === loginedIuser ? 'red' : 'black' }}>{transfer.toIuserNm}</td>
                                    <td style={{ color: transfer.fromIuser === loginedIuser ? 'red' : 'black' }}>{transfer.fromIuserNm}</td>
                                    <td>{transfer.balance}</td>
                                    <td>{transfer.transferAmount}</td>
                                    <td>{transfer.transCreatedAt}</td>
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

export default GetTransferAll;