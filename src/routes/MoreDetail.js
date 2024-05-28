import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MoreDetailCp from '../components/MoreDetailCp';

const MoreDetail = () => {

    const { ialarm } = useParams();
    
        const [loading, setLoading] = useState(true);
        const [MoreDetail, setMoreDetail] = useState({});
        const [error, setError] = useState(null);
        
        

        const getMoreDetail= useCallback(async (queryString) => {
            try{
        const resp = await(await axios.get(`//localhost:8080/api/management/moredetail?${queryString}`)).data;
        setMoreDetail(resp);
        setLoading(false);
       
            }catch (err) {
                setError(err);
                setLoading(false);
              }

        },[]);

        console.log(MoreDetail);

  useEffect(() => {

    const SelTranAndConDeDto = {
        irole : 1 ,
        ialarm : ialarm
    };
    const queryString = new URLSearchParams(SelTranAndConDeDto).toString();

    console.log(queryString)

    getMoreDetail(queryString);
  }, [getMoreDetail,ialarm]);

  if(error){
    return <h2>error: {error.message}</h2>
  }

  return (
    <div>
      {loading ? (
        <h2>loading...</h2>
      ) : (
        <MoreDetailCp
          ialarm={MoreDetail.ialarm}
          trNm={MoreDetail.trNm}
          eachTrNm={MoreDetail.eachTrNm}
          hostNm={MoreDetail.hostNm}
          hostUid={MoreDetail.hostUid}
          hostRole={MoreDetail.hostRole}
          guestNm={MoreDetail.guestNm}
          guestUid={MoreDetail.guestUid}
          guestRole={MoreDetail.guestRole}
          alAccept={MoreDetail.alAccept}
          alCreatedAt={MoreDetail.alCreatedAt}
          alUpdatedAt={MoreDetail.alUpdatedAt}
          alEndedAt={MoreDetail.alEndedAt}
        />
      )}
    </div>
  );
};

export default MoreDetail;