/*
    Copyright 2024 Hartbeat Track Club. All rights reserved.
    This file or parts thereof may not be reproduced in any form, stored in any retrieval system,
    or transmitted in any form by any means—electronic, mechanical, photocopy, recording, or
    otherwise, without prior written permission of Hartbeat Track Club, except as provided by
    United States of America copyright law and fair use.
    */

import { useEffect, useState } from 'react';
import { AuthFormProps } from '../../interfaces/AuthFormProps';
import { loginUser } from '../../redux/features/authSlice';
import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import { useAppDispatch } from '../../redux/store';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';

// import { login, logout } from '../../redux/features/authSlice';

import { auth } from '../../firebase';

const inputClasses = 'flex flex-col justify-between w-full';

const AuthForm = ({ name, capName }: AuthFormProps) => {
  const [displayName, setDisplayName] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (name === 'signup') {
      const newDisplayName = `${firstName} ${lastName}`;
      setDisplayName(newDisplayName);
    }
  }, [name, firstName, lastName]);
  const onFormSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await dispatch(loginUser({ displayName, email, password, name })).then(
        () => {
          navigate('/dashboard');
        }
      );
    } catch (error) {
      setLoading(false);
      console.log('error in creating user', error);
    }
  };

  return (
    <div className='max-w-lg w-full mx-auto flex flex-col items-center justify-start h-[520px]'>
      <h1>{capName}</h1>
      {errorMessage && (
        <p className='bg-red-400 px-3 py-2 text-center rounded-md text-white'>
          {errorMessage}
        </p>
      )}

      <form
        id={name}
        name={name}
        className='flex flex-col items-center justify-center w-full'
        onSubmit={onFormSubmit}
      >
        {name === 'signup' && (
          <>
            <div className={inputClasses}>
              <label htmlFor='fistName'>First name</label>
              <input
                id='fistName'
                type='text'
                className='border-black border-2'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className={inputClasses}>
              <label htmlFor='lastName'>Last name</label>
              <input
                id='lastName'
                type='text'
                className='border-black border-2'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </>
        )}
        <div className={inputClasses}>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='email'
            className='border-black border-2'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={inputClasses}>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            className='border-black border-2'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type='submit' disabled={loading}>
          Enter
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
