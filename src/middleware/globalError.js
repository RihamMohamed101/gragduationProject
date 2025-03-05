

export const globalError = (err, req, res, next) => {
    res.status(err.statusCode || 500)
        .json(
            {
                error: "error",
                message: err.message,
                code: err.statusCode
            })
}