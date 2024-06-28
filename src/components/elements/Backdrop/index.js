import styles from './Backdrop.module.scss';

export default function Backdrop({ show, onClick }) {
  return (
    <div
      className={`${styles.Backdrop} ${show ? styles.BackdropShow : ''}`}
      onClick={onClick}
    />
  );
}
