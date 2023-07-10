import { useCallback } from 'react';

import { goUnsigned } from '@services/mypage';

const Unsigned = ({ accessToken }) => {
  // 회원 탈퇴 통신
  const communicationUnsigned = useCallback(async () => {
    try {
      const unsignedToken = await goUnsigned(accessToken);
      alert('회원 탈퇴 성공');
    } catch (e) {
      alert('회원 탈퇴 실패');
    }
  }, [accessToken]);

  return (
    <div>
      <button type='button' onClick={communicationUnsigned}>
        회원탈퇴
      </button>
    </div>
  );
};

export default Unsigned;
