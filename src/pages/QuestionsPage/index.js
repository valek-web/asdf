import styles from './QuestionsPage.module.scss';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Clock from '../../components/modules/Clock';
import { convertFieldResponseIntoMuiTextFieldProps } from '@mui/x-date-pickers/internals';

export default function QuestionsPage({ isAuth }) {
  const { id } = useParams();
  const authToken = localStorage.getItem('authToken');
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  const [sendQuestion, setSendQuestion] = useState([]);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/api/v1/tests/get_questions_test`,
          {
            test_uid: id,
          },
          {
            headers: {
              'X-Auth': authToken,
            },
          },
        );

        setQuestions(response.data.questions);
        console.log(response);
        setSendQuestion(
          response.data.questions.map(question => {
            if (question.type == 1) {
              return {
                uid_quest: question.uid_quest,
                tasks: question.tasks.map(i => {
                  return {
                    uid_task: i.uid,
                    response: 0,
                  };
                }),
              };
            }
            if (question.type == 2) {
              return {
                uid_quest: question.uid_quest,
                tasks: question.tasks.map(i => {
                  return {
                    uid_task: i.uid,
                    response: 0,
                  };
                }),
              };
            }
            if (question.type == 3) {
              return {
                uid_quest: question.uid_quest,
                tasks: question.tasks.map(i => {
                  return {
                    uid_task: i.uid,
                    response: '',
                  };
                }),
              };
            }
            if (question.type == 4) {
              return {
                uid_quest: question.uid_quest,
                tasks: question.tasks.map(i => {
                  return {
                    uid_task: i.uid,
                    response: '',
                  };
                }),
              };
            }
            if (question.type == 5) {
              return {
                uid_quest: question.uid_quest,
                tasks: question.tasks.map(i => {
                  return {
                    uid_task: i.uid,
                    response: '',
                  };
                }),
              };
            }
            if (question.type == 6) {
              return {
                uid_quest: question.uid_quest,
                tasks: question.tasks.map(i => {
                  return {
                    uid_task: i.uid,
                    response: 0,
                  };
                }),
              };
            }
          }),
        );
      } catch (error) {
        console.log(error);
      }
    };
    if (isAuth) fetchTest();
  }, []);

  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState();

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/api/v1/tests/get_tests_user`,
          {},
          {
            headers: {
              'X-Auth': authToken,
            },
          },
        );

        console.log(response.data);
        setTests(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTest();
  }, []);

  useEffect(() => {
    const foundTest = tests.find(test => test.uid === id);

    setSelectedTest(foundTest);
  }, [id, tests, selectedTest]);

  useEffect(() => {});

  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    }
  }, [isAuth, navigate]);

  if (!isAuth) return null;

  const typeOneClick = (uid_quest, uid_task) => {
    setSendQuestion(
      sendQuestion.map(quest => {
        debugger;
        if (quest.uid_quest === uid_quest) {
          debugger;
          return {
            ...quest,
            tasks: quest.tasks.map(task => {
              if (task.uid_task === uid_task) {
                return { ...task, response: 1 };
              }
              return { ...task, response: 0 };
            }),
          };
        }
        return quest;
      }),
    );
  };

  const typeTwoClick = (uid_quest, uid_task) => {
    setSendQuestion(
      sendQuestion.map(quest => {
        debugger;
        if (quest.uid_quest === uid_quest) {
          debugger;
          return {
            ...quest,
            tasks: quest.tasks.map(task => {
              if (task.uid_task === uid_task) {
                return {
                  ...task,
                  response: task.response == 1 ? 0 : task.response == 0 ? 1 : 0,
                };
              }
            }),
          };
        }
        return quest;
      }),
    );
  };

  return (
    <>
      <div className={styles.Questions}>
        {questions.map((question, index) => {
          if (question.type == 1) {
            return (
              <QuestionItem
                formulation={question.formulation}
                indexItem={index}
              >
                {question.tasks.map(task => {
                  const isActive = sendQuestion
                    .find(obj => question.uid_quest === obj.uid_quest)
                    .tasks.find(mtask => mtask.uid_task === task.uid).response;
                  console.log(isActive);
                  return (
                    <div
                      onClick={() => typeOneClick(question.uid_quest, task.uid)}
                      className={`${styles.radioQuestion} ${isActive ? styles.radioQuestionActive : ''}`}
                    >
                      {task.formulation}
                    </div>
                  );
                })}
              </QuestionItem>
            );
          }
          if (question.type == 2) {
            return (
              <QuestionItem
                formulation={question.formulation}
                indexItem={index}
              >
                {question.tasks.map(task => {
                  const isActive = sendQuestion.find(
                    obj => question.uid_quest === obj.uid_quest,
                  );
                  console.log(isActive);
                  return (
                    <div
                      onClick={() => typeTwoClick(question.uid_quest, task.uid)}
                      className={`${styles.checkQuestion} ${isActive ? styles.checkQuestionActive : ''}`}
                    >
                      {task.formulation}
                    </div>
                  );
                })}
              </QuestionItem>
            );
          }
        })}
      </div>
      <Clock exec={selectedTest?.time_exec} />
      <button className={styles.EndTestButton}>Завершить</button>
    </>
  );
}

const QuestionItem = ({ formulation, children, indexItem }) => {
  return (
    <div className={styles.Question}>
      <h3 className={styles.Title}>{formulation}</h3>
      <span className={styles.OrderNumber}>{indexItem + 1}</span>
      <div className={styles.Options}>{children}</div>
    </div>
  );
};

// {
//   question.type == 1 ? (
//     question.tasks.map((task, index) => {
//       console.log(task);

//       return (
//         <div className={styles.Option} key={index}>
//           <input
//             className={styles.RadioInput}
//             type="radio"
//             name={`question-${question.uid_quest}`}
//           />
//           <span>{task.formulation}</span>
//         </div>
//       );
//     })
//   ) : question.type == 2 ? (
//     question.tasks.map((task, index) => {
//       console.log(task);

//       return (
//         <div className={styles.Option} key={index}>
//           <input
//             className={styles.RadioInput}
//             type="checkbox"
//             name={`question-${question.uid_quest}`}
//           />
//           <span>{task.formulation}</span>
//         </div>
//       );
//     })
//   ) : question.type == 3 ? (
//     <div className={styles.Option} key={index}>
//       <input
//         className={styles.RadioInput}
//         type="text"
//         name={`question-${question.uid_quest}`}
//       />
//     </div>
//   ) : question.type == 4 ? (
//     <div className={styles.Option} key={index}>
//       <input
//         className={styles.RadioInput}
//         type="file"
//         name={`question-${question.uid_quest}`}
//       />
//     </div>
//   ) : question.type == 5 ? (
//     question.tasks.map((task, index) => {
//       console.log(task);

//       return (
//         <div className={styles.Option} key={index}>
//           <input
//             className={styles.RadioInput}
//             type="radio"
//             name={`question-${question.uid_quest}`}
//           />
//           <span>{task.formulation}</span>
//         </div>
//       );
//     })
//   ) : question.type == 6 ? (
//     question.tasks.map((task, index) => {
//       console.log(task);

//       return (
//         <div className={styles.Option} key={index}>
//           <input
//             className={styles.RadioInput}
//             type="radio"
//             name={`question-${question.uid_quest}`}
//           />
//           <span>{task.formulation}</span>
//         </div>
//       );
//     })
//   ) : null;
// }
