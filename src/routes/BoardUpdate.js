import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


const BoardUpdate = () => {
    const navigate = useNavigate();
    const {ialarm} = useParams();
    const [EditDto, setEditDto] = useState({//eslint-disable-line no-unused-vars

      irole: 1,
      ialarm: ialarm
  });
    const [board, setBoard] = useState({
        ialarm:ialarm,
        hostNm:'',
        hostUid:'',
        hostRole:'',
        trNm: '',
        eachTrNm:'',
        alAccept:0,
        alCreatedAt:'',
        alUpdateAt:'',
        alEndedAt:'',
        guest:0,
        guestNm:'',
        guestUid:'',
        guestRole:''
    });

    const [error, setError] = useState(null);

    const {eachTrNm, guest, alAccept} = board;

    const onChange = (event) => {
        const{value, name} = event.target;
        setBoard({
            ...board,
            [name]: value,
        });
    };
    


    const getBoard = useCallback(async () => {
        try{
          const queryString = new URLSearchParams(EditDto).toString();
          
        console.log(queryString);
        const resp = await(await axios.get(`//localhost:8080/api/management/edit?${queryString}`));
        
        console.log(resp);
        setBoard(resp.data);

    }catch (err) {
        setError(err);
        console.error(err)
      }
    },[EditDto]);

    console.log(board);
    
    const updateBoard = async () => {
        const postData = {
            irole:1,
            guest:parseInt(board.guest),
            ialarm:board.ialarm,
            eachTrNm:board.eachTrNm,
            alAccept:parseInt(board.alAccept)
        };
        console.log(postData);

        try{
          const res = await axios.put(`//localhost:8080/api/management/transaction`, postData);

          if(res.data === 1){
            alert('수정되었습니다.');
          }else{
            alert('수정을 실패했습니다.');
          }

          navigate(`/api/management/moredetail/${ialarm}/${1}`);
        }catch(err){
          console.error(err)
          alert(err.message)
          navigate(`/api/management/moredetail/${ialarm}/${1}`);
        }

        
      };
    
      const backToDetail = () => {
        //const queryString = new URLSearchParams(SelTranAndConDeDto).toString();
        navigate(`/api/management/moredetail/${ialarm}/${1}`);
      };

      useEffect(() => {

        getBoard();

      }, [getBoard]);

      if(error){
        alert(error.message)
      }

      return (
        <div>
          <div><h2>계약명 : {board.trNm}</h2></div>
          <div>
            <h4>
            <span>개인 계약명 : </span>
            <input type="text" name="eachTrNm" value={eachTrNm} onChange={onChange} />
            </h4>
          </div>
          <div> 계약 생성일 : {board.alCreatedAt} | 계약 진행일 : {board.alUpdateAt} | 계약 완료일 : {board.alEndedAt}</div>
          <br />
          <div>계약 생성자 이름 : {board.hostNm} | 계약 생성자 ID : {board.hostUid} | 계약 생성자 등급 : {board.hostRole}</div>
          <br />
          <div>
            <h4>
            <span>거래 수신자 : </span>
            <input type="text" name="guest" value={guest} onChange={onChange} />
            </h4>
          </div>
          
          <div>
          <h4>
            <span>거래 상태 : </span>
            <input type="text" name="alAccept" value={alAccept} onChange={onChange} />
            </h4>
          </div>
          <div>완료, 관리자 취소 상태에선 요청 불가 | 기존 수신자 거절 상태 or 새로운 수신자 재요청만 가능</div>
          <br />
          <div>
            <button onClick={updateBoard}>수정</button>
            <button onClick={backToDetail}>취소</button>
          </div>
        </div>
      );
    };
    
    export default BoardUpdate;