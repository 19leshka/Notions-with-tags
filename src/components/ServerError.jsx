const ServerError = () => {
    return (
        <div className="serverErrorContainer">
            <div className="serverError">SERVER ERROR</div>
            <div className="errorHelp">type: <span>npm run server</span> in command line and refresh the page.</div>
        </div>
    )
}

export default ServerError;