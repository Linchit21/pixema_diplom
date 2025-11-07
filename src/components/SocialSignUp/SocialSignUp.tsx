import React from 'react';
import styles from './SocialSignUp.module.scss';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import googleIcon from '../../assets/google.png';
import { auth } from '@/firebaseConfig';

const SocialSignup: React.FC = () => {
  const provider = new GoogleAuthProvider();

  const signInWithGoogle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
       await signInWithPopup(auth, provider);


      //TODO: 
      // const result = await signInWithPopup(auth, provider)
      // const user = result.user

      // const userPath = `Users/${user.displayName}_${user.uid}`

      // await set(ref(db, userPath), {
      //   uid: user.uid,
      //   name: user.displayName,
      //   birthDay: '',
      //   email: user.email,
      //   createdAt: new Date().toISOString(),
      // })
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };

  return (
    <div className={styles.social}>
      <p className={styles.text}>Authorization through Google</p>{' '}
      <div className={styles.links}>
        <button onClick={signInWithGoogle} className={styles.block}>
          <img className={styles.img} src={googleIcon} alt="google" />{' '}
        </button>
      </div>
    </div>
  );
};

export { SocialSignup };
