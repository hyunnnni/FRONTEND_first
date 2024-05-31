import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


const ManagementUpd = () => {
    const navigate = useNavigate();
    const {itran} = useParams();
    const [selMoreDetailDto, setSelMoreDetailDto] = useState({//eslint-disable-line no-unused-vars

      irole: 1,
      itran: itran
  });
  console.log(selMoreDetailDto);
    const [board, setBoard] = useState({
        itran:itran,
        ialarm:0,
        trNm: '',
        hostNm:'',
        hostUid:'',
        hostRole:'',
        guest:0,
        guestNm:'',
        guestUid:'',
        guestRole:'',
        alState:0,
        trCreatedAt:'',
        trUpdateAt:'',
        trEndedAt:'',
        icon:0,
        contract:''
    });

    const [error, setError] = useState(null);

    const {trNm, trPw, alState} = board;

    const onChange = (event) => {
        const{value, name} = event.target;
        setBoard({
            ...board,
            [name]: value,
        });
    };
    


    const getBoard = useCallback(async () => {
        try{
          const queryString = new URLSearchParams(selMoreDetailDto).toString();
          
        console.log(queryString);
        const resp = await(await axios.get(`//localhost:8080/api/management/moredetail?${queryString}`));
        
        console.log(resp);
        setBoard(resp.data);

    }catch (err) {
        setError(err);
        console.error(err)
        window.alert(err.response?.data?.message || 'An error occurred');
                // 확인을 누르면 이전 화면으로 이동
                navigate(-1);
      }
    },[selMoreDetailDto,navigate]);

    console.log(board);
    
    const updateBoard = async () => {
        const postData = {
            irole:1,
            ialarm:board.ialarm,
            trNm:board.trNm,
            trPw:board.trPw,
            alState:parseInt(board.alState)
        };
        console.log(postData);

        try{
          const res = await axios.put(`//localhost:8080/api/management/transaction`, postData);

          if(res.data === 1){
            alert('수정되었습니다.');
          }else{
            alert('수정을 실패했습니다.');
          }

          navigate(`/api/management/moredetail/${itran}/${1}`);
        }catch(err){
          console.error(err)
          alert(err.message)
          navigate(`/api/management/moredetail/${itran}/${1}`);
        }

        
      };
    
      const backToDetail = () => {
        navigate(`/api/management/moredetail/${itran}/${1}`);
      };

      useEffect(() => {

        getBoard();

      }, [getBoard]);

      if(error){
        alert(error.message)
      }

      return (
        <div>
          <div>
            <h4>
            <span>거래명 : </span>
            <input type="text" name="trNm" value={trNm} onChange={onChange} />
            </h4>
          </div>
          <div> 계약 생성일 : {board.trCreatedAt} | 계약 진행일 : {board.trUpdateAt} | 계약 완료일 : {board.trEndedAt}</div>
          <br />
          <div>계약 생성자 이름 : {board.hostNm} | 계약 생성자 ID : {board.hostUid} | 계약 생성자 등급 : {board.hostRole}</div>
          <div>계약 수신자 이름 : {board.guestNm} | 계약 수신자 ID : {board.guestUid} | 계약 수신자 등급 : {board.guestRole}</div>
          <br />
          <div>
            <h4>
            <span>거래비밀번호 : </span>
            <input type="text" name="trPw" value={trPw} onChange={onChange} />
            </h4>
          </div>
          <div>
          <h4>
            <span>거래 상태 : </span>
            <input type="text" name="alState" value={alState} onChange={onChange} />
            </h4>
          </div>
          <div>완료, 관리자 취소 상태에선 재요청 불가 | 수신자의 수락여부는 변경 불가(재요청, 거래 완료, 거래 취소만 가능)</div>
          <br />
          <div>
            <button onClick={updateBoard}>수정</button>
            <button onClick={backToDetail}>취소</button>
          </div>
        </div>
      );
    };
    
    export default ManagementUpd;