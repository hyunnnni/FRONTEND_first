import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

//계약 송수신 기능 거래 신청 POST
const RemitPostTran = () => {
  const navigate = useNavigate();
  const [ctgy, setCtgy] = useState([]); // 초기 상태를 빈 배열로 설정
  const [error, setError] = useState(null);
  const [InsTranReqDto, setInsTranReqDto] = useState({
    loginedIuser: 1,
    targetIuser: 0,
    iconfctgy:0,
    confSubctgyCode:'',
    trsNm: '',
    trsPw:'',
    trsContractPrice:'0',
    trsDeposit:'0',
    trsPtMethods:'',
    trsMemo:null,
    trsPtType:'',
    trsPtdatedAt:'',
    trsStartdatedAt:'',
    trsEnddatedAt:null
  });

  const [selectedCategory, setSelectedCategory] = useState({
    major: '',
    middle: '',
    minor: '',
  });

  const { targetIuser, trsNm, trsPw, trsContractPrice, trsDeposit, trsPtMethods, trsMemo, trsPtType, trsPtdatedAt, trsStartdatedAt, trsEnddatedAt } = InsTranReqDto; // 비구조화 할당

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get('//localhost:3000/transaction/allcategory');
        if (typeof response.data === 'object') {
          setCtgy(response.data);
        }

        console.log(response.data)
      } catch (err) {
        setError(err);
        console.error(err);
      }
    };
    fetchCards();
  }, []);

  const formatAmount = (value) => {
    if (!value) return value;
    const onlyNums = value.replace(/[^0-9]/g, "");
    return onlyNums.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const onChange = (event) => {
    const { value, name } = event.target; // event.target에서 name과 value만 가져오기
    if (name === "trsContractPrice" || name === "trsDeposit") {
      setInsTranReqDto({
          ...InsTranReqDto,
          [name]: formatAmount(value)
      });
    } else {
      setInsTranReqDto({
          ...InsTranReqDto,
          [name]: value
      });
    }
  };

  const handleCategoryChange = (level, value) => {
    setSelectedCategory({
      ...selectedCategory,
      [level]: value,
    });

    if (level === 'major') {
      setInsTranReqDto({
        ...InsTranReqDto,
        iconfctgy: 0,
        confSubctgyCode: '',
      });
    } else if (level === 'middle') {
      const selectedMajorCategory = ctgy.find(category => category.mainCtgyCode === selectedCategory.major);
      const selectedMiddleCategory = selectedMajorCategory?.midCategoryList.find(category => category.midCtgyCode === value);
    
      setInsTranReqDto({
        ...InsTranReqDto,
        iconfctgy: selectedMiddleCategory?.iconfctgy || 0,
        confSubctgyCode: '',
      });
    } else if (level === 'minor') {
      setInsTranReqDto({
        ...InsTranReqDto,
        confSubctgyCode: value,
      });
    }
  };

  const saveBoard = async () => {
    const SelAllDto = {
        irole: 1,
        search: "",
        page: 1
    };
    const queryString = new URLSearchParams(SelAllDto).toString();

    try {
      const postData = {
        loginedIuser: InsTranReqDto.loginedIuser,
        targetIuser: parseInt(InsTranReqDto.targetIuser),
        trsNm: InsTranReqDto.trsNm,
        trsPw: InsTranReqDto.trsPw,
        iconfctgy: parseInt(InsTranReqDto.iconfctgy),
        confSubctgyCode: InsTranReqDto.confSubctgyCode,
        trsContractPrice: InsTranReqDto.trsContractPrice,
        trsDeposit: InsTranReqDto.trsDeposit,
        trsPtMethods: InsTranReqDto.trsPtMethods,
        trsMemo: InsTranReqDto.trsMemo,
        trsPtType: InsTranReqDto.trsPtType,
        trsPtdatedAt: InsTranReqDto.trsPtdatedAt,
        trsStartdatedAt: InsTranReqDto.trsStartdatedAt,
        trsEnddatedAt: InsTranReqDto.trsEnddatedAt
      };

      console.log(postData);
      await axios.post(`//localhost:8080/transaction/req`, postData).then((res) => {
        const itran = res.data;
        console.log(itran);

        if (itran > 0) {
          alert('거래가 요청되었습니다.');
          navigate(`/api/management/all?${queryString}`);
        } else {
          alert('거래 요청을 실패했습니다.');
          navigate(`/api/management/all?${queryString}`);
        }
      });
    } catch (err) {
      setError(err);
      console.error(err);
      window.alert(err.response?.data?.message || 'An error occurred');
      // 확인을 누르면 이전 화면으로 이동
      navigate(`/api/management/all?${queryString}`);
    }
  };

  const backToList = () => {
    const SelAllDto = {
      irole: 1,
      search: "",
      page: 1
    };
    const queryString = new URLSearchParams(SelAllDto).toString();

    navigate(`/api/management/all?${queryString}`);
  };

  const renderSubcategories = (majorCategory) => {
    const major = ctgy.find(category => category.mainCtgyCode === majorCategory);
    if (!major) return [];
    return major.midCategoryList || [];
  };

  const renderMinorCategories = (middleCategory) => {
    const major = ctgy.find(category => category.mainCtgyCode === selectedCategory.major);
    if (!major) return [];
    const middle = major.midCategoryList.find(category => category.midCtgyCode === middleCategory);
    if (!middle) return [];
    return middle.subCategoryList || [];
  };

  const handleEnddateCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setInsTranReqDto({
      ...InsTranReqDto,
      trsEnddatedAt: isChecked ? null : '', // 선택 안 함일 경우 null로 설정
    });
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
        <div style={{ marginRight: '10px' }}>
          <span>대분류 </span>
          <select value={selectedCategory.major} onChange={(e) => handleCategoryChange('major', e.target.value)}>
            <option value="">대분류 선택</option>
            {ctgy.map(category => (
              <option key={category.mainCtgyCode} value={category.mainCtgyCode}>{category.mainCtgyNm}</option>
            ))}
          </select>
        </div>

        <div style={{ marginRight: '10px' }}>
          <span>중분류 </span>
          <select value={selectedCategory.middle} onChange={(e) => handleCategoryChange('middle', e.target.value)}>
            <option value="">중분류 선택</option>
            {renderSubcategories(selectedCategory.major).map(category => (
              <option key={category.midCtgyCode} value={category.midCtgyCode}>{category.midCtgyName}</option>
            ))}
          </select>
        </div>

        <div>
          <span>소분류 </span>
          <select value={selectedCategory.minor} onChange={(e) => handleCategoryChange('minor', e.target.value)}>
            <option value="">소분류 선택</option>
            {renderMinorCategories(selectedCategory.middle).map(category => (
              <option key={category.confSubctgyCode} value={category.confSubctgyCode}>{category.confSubctgyName}</option>
            ))}
          </select>
        </div>
      </div>
      <br />
      <div>
        <span>거래명 </span>
        <input type="text" name="trsNm" value={trsNm} onChange={onChange} />
      </div>
      <br />
      <div>
        <span>수신자 </span>
        <input type="text" name="targetIuser" value={targetIuser} onChange={onChange}/>
      </div>
      <br />
      <div>
        <span>거래 비밀번호 </span>
        <input type="text" name="trsPw" value={trsPw} onChange={onChange} />
      </div>
      <br />
      <div>
        <span>거래금 </span>
        <input type="text" name="trsContractPrice" value={trsContractPrice} onChange={onChange} />
      </div>
      <br />
      <div>
        <span>보증금 </span>
        <input type="text" name="trsDeposit" value={trsDeposit} onChange={onChange} />
      </div>
      <br />
      <div>
        <span>거래금 지급 수단 </span>
        <select name="trsPtMethods" value={trsPtMethods} onChange={onChange}>
          <option value="">지급 수단 선택</option>
          <option value="001">계좌이체</option>
          <option value="002">현금</option>
          <option value="003">EHT 토큰 이체</option>
          <option value="004">물물교환</option>
          <option value="005">기타</option>
        </select>
      </div>
      <br />
      {trsPtMethods === '005' && ( // 기타를 선택했을 때만 메모 입력란 표시
        <div>
          <span>지급 수단 메모 </span>
          <input type="text" name="trsMemo" value={trsMemo} onChange={onChange} />
        </div>
      )}
      <br />
      <div>
        <span>거래금 지급방법 종류 </span>
        <select name="trsPtType" value={trsPtType} onChange={onChange}>
          <option value="">지급 방법 선택</option>
          <option value="001">달마다 지급</option>
          <option value="002">한 번에 지급</option>
        </select>
      </div>
      <br />
      (달마다 선택 시 선택한 날짜가 지급일 첫 날이며 매달 지급일로 정해집니다)
      <br />
      <br />
      <div>
        <span> 금액 지급일 </span>
        <input type="date" name="trsPtdatedAt" value={trsPtdatedAt} onChange={onChange} />
      </div>
      <br />
      <div>
        <span> 계약 시행일  </span>
        <input type="date" name="trsStartdatedAt" value={trsStartdatedAt} onChange={onChange} />
      </div>
      <br />
      <div>
        <span> 계약 종료일 </span>
        <input type="date" name="trsEnddatedAt" value={trsEnddatedAt || ''} onChange={onChange} />
        <label>
           OR  기한 없음
          <input type="checkbox" onChange={handleEnddateCheckboxChange} checked={!trsEnddatedAt} />
        </label>
      </div>
      <br />
      <div>
        <button onClick={saveBoard}>저장</button>
        <button onClick={backToList}>취소</button>
      </div>
    </div>
  );
};

export default RemitPostTran;