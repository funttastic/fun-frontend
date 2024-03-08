import {setUser, signOutSuccess, useAppDispatch,} from '@/store'
import appConfig from '@/configs/app.config'
import {useNavigate} from 'react-router-dom'

export const useHandleUnauthorized = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleUnauthorized = () => {
    dispatch(signOutSuccess());
    dispatch(
      setUser({
        avatar: '',
        userName: '',
        email: '',
        authority: [],
      }),
    );
    navigate(appConfig.unAuthenticatedEntryPath);
  };

  return handleUnauthorized;
};
