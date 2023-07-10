import { useCallback, useState } from 'react';

import Input from '@components/wrapper/Input';

const RegisterButton = () => {
  const [checkBox, setCheckBox] = useState({
    service: false,
    marketing: false,
  });

  const { service, marketing } = checkBox;

  const onChecked = useCallback((e) => {
    setCheckBox((prevCheckBox) => ({
      ...prevCheckBox,
      [e.target.name]: e.target.checked,
    }));
  }, []);

  return (
    <div className='check_assign'>
      <Input
        name='service'
        checked={service}
        onChange={onChecked}
        type='checkbox'
      >
        <span>(필수) 서비스 이용약관</span>
      </Input>
      <Input
        name='marketing'
        checked={marketing}
        onChange={onChecked}
        type='checkbox'
      >
        <span>(선택) 개인정보 이용</span>
      </Input>
      <div className='signbtn'>
        <button
          type='submit'
          className={service ? 'check_btn' : 'Ncheck_btn'}
          disabled={!service}
        >
          가입하기
        </button>
      </div>
    </div>
  );
};

export default RegisterButton;
