import ConstructorIcon from './icons/ConstructorIcon';
import DiagnosticIcon from './icons/DiagnosticIcon';
import MainIcon from './icons/MainIcon';
import ManualIcon from './icons/ManualIcon';
import ProfileIcon from './icons/ProfileIcon';
import ResultIcon from './icons/ResultIcon';

export const navigation = [
  {
    icon: <MainIcon />,
    name: 'Главная',
    link: '/',
  },
  {
    icon: <ProfileIcon />,
    name: 'Профиль',
    link: '/profile',
  },
  {
    icon: <DiagnosticIcon />,
    name: 'Диагностики',
    link: '/diagnostic',
  },
  {
    icon: <ManualIcon />,
    name: 'Справка',
    link: '/manual',
  },
  {
    icon: <ResultIcon />,
    name: 'Результат',
    link: '/result',
  },
];

export const navigationDiagnostic = [
  {
    icon: <MainIcon />,
    name: 'Главная',
    link: '/',
  },
  {
    icon: <DiagnosticIcon />,
    name: 'Диагностики',
    link: '/diagnostic',
  },
  {
    icon: <ConstructorIcon />,
    name: 'Конструктор',
    link: '/diagnostic',
  },
  {
    icon: <ResultIcon />,
    name: 'Результат',
    link: '/result',
  },
];
