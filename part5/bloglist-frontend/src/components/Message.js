const Message = ({ sentMessage, type }) => {
    if (sentMessage) {
        return (<div className={type}>{sentMessage}</div>)
    }
    else {
        return null
    }
}
export default Message