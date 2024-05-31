import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MoreDetailCp from '../components/MoreDetailCp';
import {useNavigate} from'react-router-dom';

const MoreDetail = () => {

    const { itran } = useParams();
    
        const [loading, setLoading] = useState(true);
        const [MoreDetail, setMoreDetail] = useState({});
        const [error, setError] = useState(null);
        const navigate = useNavigate();
        

        const getMoreDetail= useCallback(async (queryString) => {
            try{
        const resp = await(await axios.get(`//localhost:8080/api/management/moredetail?${queryString}`)).data;
        setMoreDetail(resp);
        setLoading(false);
       
            }catch (err) {
                setError(err);
                setLoading(false);
                window.alert(err.response?.data?.message || 'An error occurred');
                // 확인을 누르면 이전 화면으로 이동
                navigate(-1);
              }

        },[navigate]);

        console.log(MoreDetail);

  useEffect(() => {

    const SelTranAndConDeDto = {
        irole : 1 ,
        itran : itran
    };
    const queryString = new URLSearchParams(SelTranAndConDeDto).toString();

    console.log(queryString)

    getMoreDetail(queryString);
  }, [getMoreDetail,itran]);

  if(error){
    alert(error.message)
  }

  return (
    <div>
      {loading ? (
        <h2>loading...</h2>
      ) : (
        <MoreDetailCp
          itran ={MoreDetail.itran}
          ialarm={MoreDetail.ialarm}
          trNm={MoreDetail.trNm}
          hostNm={MoreDetail.hostNm}
          hostUid={MoreDetail.hostUid}
          hostRole={MoreDetail.hostRole}
          guest={MoreDetail.guest}
          guestNm={MoreDetail.guestNm}
          guestUid={MoreDetail.guestUid}
          guestRole={MoreDetail.guestRole}
          alState={MoreDetail.alState}
          trCreatedAt={MoreDetail.trCreatedAt}
          trUpdatedAt={MoreDetail.trUpdatedAt}
          trEndedAt={MoreDetail.trEndedAt}
          icon={MoreDetail.icon}
          contract={MoreDetail.contract}
        />
      )}
    </div>
  );
};

export default MoreDetail;