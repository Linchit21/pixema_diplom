// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router';
// import { AppDispatch, RootState } from '@/redux/store';

// export function AuthActivation() {
//   const { uid, token } = useParams();
//   const { isActivated } = useSelector((state: RootState) => state.auth);
//   const navigate = useNavigate();
//   const dispatch: AppDispatch = useDispatch();

//   useEffect(() => {
//     const body = {
//       uid,
//       token,
//     };

//   }, []);

//   if (isActivated) {
//     navigate('/');
//   }

//   return <div>Ошибка</div>;
// }
