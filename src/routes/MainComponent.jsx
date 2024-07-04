import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default function MainComponent() {
    const [selTransferDetail, setSelTransferDetail] = useState([]);
    const { itransfer } = useParams();
    const [peers, setPeers] = React.useState(() => {
        // 로컬 스토리지에서 이전 상태를 가져옵니다.
        const storedPeers = localStorage.getItem('peers');
        return storedPeers ? JSON.parse(storedPeers) : [];
    });
    const [miners, setMiners] = React.useState({
        ECDL_pf: '',
        miner: '',
        timestamp: '',
        task_id: ''
    });
    const [transaction,setTransaction] = React.useState(()=>{
        const storedtransaction = localStorage.getItem('transaction');
        return storedtransaction ? JSON.parse(storedtransaction) : [];
    })

    const getselTransferDetail = useCallback(async (queryString) => {
        
        try {
            const resp = await axios.get(`//localhost:8080/transfer/receipt?${queryString}`);
            setSelTransferDetail(resp.data);
            
            console.log(resp.data);
        } catch (err) {
            window.alert(err.response?.data?.message || 'An error occurred');
            
        }
        setMiners({
            ECDL_pf: "진행중...",
            miner: "",
            timestamp: ""
        })
        try {
            let k = 0;
            const connectedElements = peers.filter(item => item.status === 'connected');
            k = connectedElements.length;
            const addresses = connectedElements.map(item => item.address.startsWith("ws://") ? item.address.replace("ws://", "http://") : item.address);
            let task_id = (Math.floor(Math.random() * (10000 - 10 + 1)) + 10).toString();
            const postData = {
                'k': k,
                'node': addresses,
                "task_id": task_id,
                "from":selTransferDetail.fromIuserNm,
                "to":selTransferDetail.toIuserNm,
                "value":selTransferDetail.transferAmount
            }
            console.log(postData);
            if(k===1){
                setMiners({
                    ...miners,
                    ECDL_pf:'켜져있는 서버가 하나 이상이어야합니다.'
                })
            }
            else{
                const res=axios.post('http://192.168.0.110:5000/getr', postData)
                console.log(res)
            }
        } catch (error) {
            console.error('Error occurred:', error);
        }
    }, [])
    
    console.log(itransfer);

    useEffect(() => {
        const SelTransferAlarmAcceptDto = {
            loginedIuser: 2,
            itransfer: itransfer
        };
        const queryString = new URLSearchParams(SelTransferAlarmAcceptDto).toString();
        console.log(queryString);
        getselTransferDetail(queryString);
    }, [getselTransferDetail, itransfer]);



    // 실시간 노드 연결상태 띄우기
    React.useEffect(() => {

        const socket = io.connect('http://192.168.0.110:3000', {
            reconnectionAttempts: 5, // 재시도 횟수
            reconnectionDelay: 2000, // 재시도 간격 (밀리초)
            timeout: 10000000, // 연결 시도 타임아웃 (밀리초)
            transports: ['websocket', 'polling'] // 사용 가능한 트랜스포트 설정
          });
        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });
        socket.on('error', (err) => {
            console.error('Socket error:', err);
            // 클라이언트 연결 실패나 다른 오류를 여기서 처리
        });

        socket.on('pageUpdate', (data) => {
            console.log('Received pageUpdate event:', data);
            // 처리 로직 추가
        });
        // peers 이벤트를 받으면 상태를 업데이트
        socket.on('pageUpdate', (data) => {
            setPeers(data.peers);
            localStorage.setItem('peers', JSON.stringify(data.peers));
        });
        // 컴포넌트가 언마운트되면 소켓 연결을 종료
        return () => {
            socket.disconnect();
        };
    }, []);

    // 실시간 트랜잭션 띄우기
    React.useEffect(() => {
        const socket = io.connect('http://192.168.0.164:30108', {
            reconnectionAttempts: 5, // 재시도 횟수
            reconnectionDelay: 2000, // 재시도 간격 (밀리초)
            timeout: 10000000, // 연결 시도 타임아웃 (밀리초)
            transports: ['websocket', 'polling'] // 사용 가능한 트랜스포트 설정
          });
        // peers 이벤트를 받으면 상태를 업데이트
        socket.on('transaction', async() => {
            const res = await axios.get('http://192.168.0.164:30108/api/block/allBlock');
            await setTransaction(res.data);
            localStorage.setItem('transaction', JSON.stringify(res.data));
   
        });
        // 컴포넌트가 언마운트되면 소켓 연결을 종료
        return () => {
            socket.disconnect();
        };
    }, []);

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
      
        return `${year}-${month}-${day} ${hours}:${minutes}`;
      };

    // miner 띄우기
    React.useEffect(() => {

        const socket1 = io.connect('http://192.168.0.164:30108', {
            reconnectionAttempts: 5, // 재시도 횟수
            reconnectionDelay: 2000, // 재시도 간격 (밀리초)
            timeout: 10000000, // 연결 시도 타임아웃 (밀리초)
            transports: ['websocket', 'polling'] // 사용 가능한 트랜스포트 설정
          });
        // peers 이벤트를 받으면 상태를 업데이트
        socket1.on('miner', (data) => {
            console.log(data.ECDL_pf)
            if (data.ECDL_pf !== "No request completed in 10 seconds"&&data.ECDL_pf !=='Cancelled') {
                setMiners({
                    ECDL_pf: data.ECDL_pf,
                    miner: data.miner,
                    timestamp: data.timestamp,
                    task_id: data.task_id
                })
            }
            else if(data.ECDL_pf==="No request completed in 10 seconds"){
                setMiners({
                    ...miners,
                    ECDL_pf: "[서버 에러] 채굴자 선정에 실패하였습니다. 다시 시도해주세요."
                })
            }
        });

        // 컴포넌트가 언마운트되면 소켓 연결을 종료
        return () => {
            socket1.disconnect();
        };
    }, [miners.ECDL_pf]);

    return (
        <main id='main'>
            <div className="container">
                <div className="gap">
                    <div className="title">
                        <h2>노드 접속 정보</h2>
                        <Link to="/coin">내 코인</Link>
                    </div>
                    <div className="content">
                        <div className="node_table">
                            <table>
                                <thead>
                                    <tr key={0}>
                                        <th>#</th>
                                        <th>주소</th>
                                        <th>접속상태</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        peers.length > 0 ? peers.map((item, id) => {
                                            return (
                                                <tr key={id + 1}>
                                                    <td>{id + 1}</td>
                                                    <td>{item.address}</td>
                                                    <td>{item.status}</td>
                                                </tr>
                                            )
                                        })
                                            :
                                            <tr>
                                                <td colSpan="3" className='no_peers'>No peers connected</td>
                                            </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="miner_table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>task_id</th>
                                        <th>노드명</th>
                                        <th>timestamp</th>
                                        <th>ECDL_pf</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        miners.ECDL_pf ===  "[서버 에러] 채굴자 선정에 실패하였습니다. 다시 시도해주세요." ||miners.ECDL_pf ===  "진행중..."||miners.ECDL_pf === '켜져있는 서버가 하나 이상이어야합니다.'?
                                        <tr>
                                            <td  className='no_res' colSpan="5" >{miners.ECDL_pf}</td>
                                        </tr>
                                        :
                                        <tr>
                                            <td>1</td>
                                            <td>{miners.task_id}</td>
                                            <td>{miners.miner}</td>
                                            <td>{miners.timestamp}</td>
                                            <td>{miners.ECDL_pf}</td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="transaction">
                            <h2>TRANSACTION</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>from</th>
                                        <th>to</th>
                                        <th>value</th>
                                        <th>timestamp</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        transaction?transaction.map((item,id)=>{
                                            return(
                                                <tr>
                                                    <td>{id+1}</td>
                                                    <td>{item.from}</td>
                                                    <td>{item.to}</td>
                                                    <td>{item.value}</td>
                                                    <td>{formatDate(item.createdAt)}</td>
                                                </tr>
                                            )
                                        })
                                        :
                                        <p>트랜잭션이 발생하지 않았습니다.</p>
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};