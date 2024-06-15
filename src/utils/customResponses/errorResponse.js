export default function ErrorResponse(res, statusCode, error) {
    return res.status(statusCode).json({error: error});
}
