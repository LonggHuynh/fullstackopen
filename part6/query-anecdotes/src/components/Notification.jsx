import NotificationContext from '../NotificationContext'
import { useContext, useEffect } from 'react'


const Notification = () => {
  const [notification, dispatch] = useContext(NotificationContext)


  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatch({ type: 'CLEAR' })
      }, 5000)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [notification, dispatch])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }


  return (
    <>
      {notification &&
        <div style={style}>
          {notification}
        </div>}
    </>
  )
}

export default Notification
