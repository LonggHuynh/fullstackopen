import './Notification.css'

const Notification = ({ message, success }) => {


  if (message === null) {
    return null;
  }

  return <div className={`notification ${success ? '' : 'err'}`}>{message}</div>;
};

export default Notification;
