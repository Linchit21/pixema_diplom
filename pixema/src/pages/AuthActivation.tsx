import React, { useEffect, useRef, ChangeEvent, FormEvent } from 'react';
import { FormField } from '@/components/FormField';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthActivationThunk, fetchSignUpThunk } from '@/redux/auth-slice';

import styles from './index.module.scss';
import { FormFieldElement } from '@/components/FormField/types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { RootState } from '@/redux/store';

export function AuthActivation() {
  const { uid, token } = useParams();
  const { isActivated } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    const body = {
      uid,
      token,
    };
    dispatch(fetchAuthActivationThunk(body));
  }, []);

  return <div>{isActivated ? 'Ваш аккаунт был активирован' : 'Ошибка'}</div>;
}
