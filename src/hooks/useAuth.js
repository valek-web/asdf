import { useSelector } from 'react-redux';

export const useAuth = () => {
  const {
    login,
    email,
    surname,
    name,
    patronymic,
    form_education,
    is_teacher,
    speciality,
  } = useSelector(state => state.user);

  return {
    isAuth: !!login,
    login,
    email,
    surname,
    name,
    patronymic,
    form_education,
    is_teacher,
    speciality,
  };
};
