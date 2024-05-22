import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


const BoardUpdate = () => {
    const navigate = useNavigate();
    const {itran} = useParams();
    const [SelTranAndConDeDto, setSelTranAndConDeDto] = useState({//eslint-disable-line no-unused-vars

        irole: 1,
        itran: itran
    });
    const [board, setBoard] = useState({
        itran:itran,
        trNm: '',
        trState:'',
        trCreatedAt:'',
        trStartAt:'',
        trEndedAt:'',
        hostNm:'',
        hostUid:'',
        hostRole:'',
        host: 0,
        guestUsers: [{
            guest:0,
            guestNm:'',
            guestUid:'',
            alAccept:0,
            alUpdatedAt:''
        }]
    });
    

    

    const [error, setError] = useState(null);

    const {host, trNm, guestUsers} = board;

    const onChange = (event) => {
        const{value, name} = event.target;
        setBoard({
            ...board,
            [name]: value,
        });
    };

    const onGuestChange = (index, event) => {
        const { value, name } = event.target;
        const updatedGuests = [...guestUsers];
        updatedGuests[index] = {
            ...updatedGuests[index],
            [name]: value
        };
        setBoard({
            ...board, 
            guestUsers: updatedGuests
        });
    };
    
    const addGuest = () => {
      setBoard({
          ...board,
          guestUsers: [...guestUsers, { guest: 0, guestNm: '', guestUid: '', alAccept: 0, alUpdatedAt: '' }]
      });
  };

    const getBoard = useCallback(async () => {
        try{
        const queryString = new URLSearchParams(SelTranAndConDeDto).toString();
        const resp = await(await axios.get(`//localhost:8080/management/edit?${queryString}`)).data;
        setBoard(resp);

    }catch (err) {
        setError(err);
      }
    },[SelTranAndConDeDto]);

    console.log(board);
    
    const updateBoard = async () => {

        
    
        const postData = {
            irole:1,
            host:parseInt(board.host),
            itran:board.itran,
            trNm:board.trNm,
            guestUsers:guestUsers
            .filter(guest => guest.guest) // guest 값이 유효한 경우만 필터링
            .map(guest => parseInt(guest.guest))
        };
        console.log(postData);
        await axios.put(`//localhost:8080/management/transaction`, postData).then((res) => {
          alert('수정되었습니다.');
          navigate(`/management/detail/${itran}/${1}`);
        });
      };
    
      const backToDetail = () => {
        //const queryString = new URLSearchParams(SelTranAndConDeDto).toString();
        navigate(`/management/detail/${itran}/${1}`);
      };

      useEffect(() => {

        getBoard();

      }, [getBoard]);

      if(error){
        return <h2>error: {error.message}</h2>
      }

      return (
        <div>
          <div>
            <span>거래 제목</span>
            <input type="text" name="trNm" value={trNm} onChange={onChange} />
          </div>
          <br />
          <div>
            <span>거래 생성자</span>
            <input type="text" name="host" value={host} onChange={onChange} />
          </div>
          <br />
          <div>
            <span>거래 수신자</span>
            {guestUsers.map((guest, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            name="guest"
                            value={guest.guest}
                            onChange={(event) => onGuestChange(index, event)}
                        />
                        </div>
            ))}
            <button onClick={addGuest}>수신자 추가</button>
          </div>
          <br />
          <div>
            <button onClick={updateBoard}>수정</button>
            <button onClick={backToDetail}>취소</button>
          </div>
        </div>
      );
    };
    
    export default BoardUpdate;