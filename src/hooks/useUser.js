import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/userSlice';

export const useUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('Token not found');
        }

        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/api/v1/user/get_info`,
          {},
          {
            headers: {
              'X-Auth': token,
            },
          },
        );

        dispatch(setUser(response.data));
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);
};
