import { useEffect, useState } from 'react';
import styles from './ToastNotification.module.css';

interface ToastNotificationProps {
  message: string;
  deleteTime: number;
}

const ToastNotification = ({ message, deleteTime }: ToastNotificationProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, deleteTime);
  }, [deleteTime]);

  return (
    <div
      className={`${styles['toast-container']} ${
        visible ? styles.visible : ''
      }`}
    >
      {message}
    </div>
  );
};

export default ToastNotification;
