interface Props {
    error: Error | null
}

const ErrorAlert = ( { error } : Props ) => {
    return error ? (
        <div className="alert alert-danger" role="alert">
            {error.message}
        </div>
    ) : null;
}

export default ErrorAlert;