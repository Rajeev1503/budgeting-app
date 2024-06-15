export default function SuccessResponse(res, statusCode, data) {
    return res.status(statusCode).json({error: null, data: data});
}