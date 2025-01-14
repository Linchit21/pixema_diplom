import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthActivationThunk } from '@/redux/auth-slice';
import { useNavigate, useParams } from 'react-router';
import { AppDispatch, RootState } from '@/redux/store';

export function AuthActivation() {
  const { uid, token } = useParams();
  const { isActivated } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const body = {
      uid,
      token,
    };

    dispatch(fetchAuthActivationThunk(body));
  }, []);

  if (isActivated) {
    navigate('/');
  }

  return <div>Ошибка</div>;
}
