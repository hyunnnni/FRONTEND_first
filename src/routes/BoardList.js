import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

const BoardList = () => {
  const [boardList, setBoardList] = useState([]);

  const getBoardList = async (SelTranAndConAllDto) => {

    try{
        const queryString = new URLSearchParams(SelTranAndConAllDto).toString();
        const resp = await axios.get(`//localhost:8080/management/alluser?${queryString}`); // 2) 게시글 목록 데이터에 할당  
        setBoardList(resp.data);
        console.log('Response data:', resp.data);


        const pngn = resp.pagination;
        console.log(pngn);

    
        }catch (error) {
            console.error(error);
            return error;
          }
    }

  useEffect(() => {

    const SelTranAndConAllDto = {
        irole : 1,
        page : 1,
        search : ""
    };
    getBoardList(SelTranAndConAllDto); // 1) 게시글 목록 조회 함수 호출
  }, []);

  console.log()

  const irole = 1;

  return (
    <div>
        <ul>
        {boardList.length > 0 ? (
          
            boardList.map((board) => (
              
          // 4) map 함수로 데이터 출력
          
          <li key={board.itran}>
            <Link to={`/management/detail/${board.itran}/${irole}`}>{board.trNm}</Link>
            -  거래 생성일 : {board.trCreatedAt}
          </li>
        ))
    ):(
        <li>No data available</li>
    )}
      </ul>
    </div>
  );
};

export default BoardList;
