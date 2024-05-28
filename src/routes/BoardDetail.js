import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Board from '../components/Board';

const BoardDetail = () => {

    const { itran } = useParams();
    
        const [loading, setLoading] = useState(true);
        const [board, setBoard] = useState({});
        const [error, setError] = useState(null);
        
        

        const getBoard = useCallback(async (queryString) => {
            try{
        const resp = await(await axios.get(`//localhost:8080/api/management/detail?${queryString}`)).data;
        setBoard(resp);
        setLoading(false);
       
            }catch (err) {
                setError(err);
                setLoading(false);
              }

        },[]);

        console.log(board);

  useEffect(() => {

    const SelTranAndConDeDto = {
        irole : 1 ,
        itran : itran
    };
    const queryString = new URLSearchParams(SelTranAndConDeDto).toString();

    console.log(queryString)

    getBoard(queryString);
  }, [getBoard,itran]);

  if(error){
    return <h2>error: {error.message}</h2>
  }

  return (
    <div>
      {loading ? (
        <h2>loading...</h2>
      ) : (
        <Board
          itran={board.itran}
          trNm={board.trNm}
          trCreatedAt={board.trCreatedAt}
          host={board.host}
          hostNm={board.hostNm}
          hostUid={board.hostUid}
          hostRole={board.hostRole}
          guestUsers={board.guestUsers}
        />
      )}
    </div>
  );
};

export default BoardDetail;