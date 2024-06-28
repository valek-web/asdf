import React, { useState, useEffect } from 'react';
import './Result.css';
import axios from 'axios';

export const Result = () => {
  const [resultQ, setResultQ] = useState([]);
  const authToken = localStorage.getItem('authToken');
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/api/v1/tests/get_solved_tests`,
          {},
          {
            headers: {
              'X-Auth': authToken,
            },
          },
        );
        console.log(response);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    fetchQuestions();
  }, []);
  return <div className="bsp">Result</div>;
};
