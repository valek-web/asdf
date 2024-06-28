import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.scss';

import LogoutIcon from './icons/LogoutIcon';
import Backdrop from '../../elements/Backdrop';
import { useEffect, useRef } from 'react';
import { removeUser } from '../../../store/slices/userSlice';
import { useDispatch } from 'react-redux';
import { navigation, navigationDiagnostic } from '../../../data/navigation';
import { useAuth } from '../../../hooks/useAuth';

export default function Sidebar({ open, closeClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useAuth();
  const navigationDataRef = useRef([]);

  const handleLogout = () => {
    dispatch(removeUser());
    localStorage.clear();
    navigate('/login');
  };

  useEffect(() => {
    closeClick();
    navigationDataRef.current =
      user.is_teacher &&
      location.pathname.includes('/diagnostic') |
        location.pathname.includes('/test')
        ? navigationDiagnostic
        : navigation;
  }, [location.pathname, user.is_teacher]);

  return (
    <>
      <nav className={`${styles.Sidebar} ${open ? styles.SidebarOpened : ''}`}>
        <ul className={styles.List}>
          {navigationDataRef.current.map((item, index) => (
            <li className={styles.ListItem} key={index}>
              <Link to={item.link}>
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
          <li className={styles.ListItem}>
            <button onClick={handleLogout}>
              <LogoutIcon />
              Выход
            </button>
          </li>
        </ul>
      </nav>
      <Backdrop show={open} onClick={closeClick} />
    </>
  );
}
