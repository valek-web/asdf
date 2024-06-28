import { useState } from 'react';
import styles from './Header.module.scss';
import Sidebar from '../Sidebar';

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <header className={styles.Header}>
        <button className={styles.MenuButton} onClick={() => setOpenMenu(true)}>
          <span />
          <span />
          <span />
        </button>
        <h1 className={styles.Title}>Личный кабинет</h1>
      </header>
      <Sidebar open={openMenu} closeClick={() => setOpenMenu(false)} />
    </>
  );
}
