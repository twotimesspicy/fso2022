const displayNotification = (text, setNotificationMessage) => {
    setNotificationMessage(text)
    setTimeout(() => {
        setNotificationMessage(null)
    }, 5000)
}

export default {
    displayNotification: displayNotification
}
