import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import MainPage from './pages/MainPage';
import Layout from './components/layout/Layout';
import ProfilePage from './pages/Profile';
import ManualPage from './pages/ManualPage';
import DiagnosticPage from './pages/DiagnosticPage';
import CreateTestPage from './pages/CreateTestPage';
import { useUser } from './hooks/useUser';
import { useAuth } from './hooks/useAuth';
import PassingTestPage from './pages/PassingTestPage';
import QuestionsPage from './pages/QuestionsPage';
import { Result } from './pages/Result/Result';

function App() {
  useUser();
  const { isAuth } = useAuth();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage isAuth={isAuth} />} />
          <Route path="/profile" element={<ProfilePage isAuth={isAuth} />} />
          <Route path="/manual" element={<ManualPage isAuth={isAuth} />} />
          <Route
            path="/diagnostic"
            element={<DiagnosticPage isAuth={isAuth} />}
          />
          <Route
            path="/test/create"
            element={<CreateTestPage isAuth={isAuth} />}
          />
          <Route
            path="/test/passing/:id"
            element={<PassingTestPage isAuth={isAuth} />}
          />
          <Route
            path="/test/questions/:id"
            element={<QuestionsPage isAuth={isAuth} />}
          />
          <Route path="/result" element={<Result />} />
        </Route>
        <Route path="/register" element={<RegisterPage isAuth={isAuth} />} />
        <Route path="/login" element={<LoginPage isAuth={isAuth} />} />
      </Routes>
    </div>
  );
}

export default App;
