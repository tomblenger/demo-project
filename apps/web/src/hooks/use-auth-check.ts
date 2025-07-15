"use client"
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { RootState } from './../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { userLoggedIn } from '@/redux/auth/authSlice';

export default function useAuthCheck() {
  const dispatch = useDispatch();
  const {user} = useSelector((state:RootState) => state.auth)
  const [authChecked, setAuthChecked] = useState<boolean>(false); // Start as false

  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      const localAuth = Cookies.get('adminInfo')

      if (localAuth) {
        try {
          const auth = JSON.parse(localAuth);
          if (auth?.accessToken && auth?.user) {
            dispatch(
              userLoggedIn({
                accessToken: auth.accessToken,
                user: auth.user,
              })
            );
          }
        } catch (error) {
          console.error('Error parsing auth cookie:', error);
          // Clear invalid cookie
          Cookies.remove('adminInfo');
        }
      }
      // Always set authChecked to true after checking
      setAuthChecked(true);
    }
  }, [dispatch]);

  return {
    authChecked,
    user,
  };
  
}