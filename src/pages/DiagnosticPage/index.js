import { useNavigate } from 'react-router-dom';
import TeacherDiagnostic from '../../screens/TeacherDiagnostic';
import UserDiagnostic from '../../screens/UserDiagnostic';
import { useAuth } from '../../hooks/useAuth';
import { useEffect } from 'react';

export default function DiagnosticPage({ isAuth }) {
  const user = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    }
  }, [isAuth, navigate]);

  if (!isAuth) return null;

  return (
    <>
      {user.is_teacher === 'true' ? <TeacherDiagnostic /> : <UserDiagnostic />}
    </>
  );
}
