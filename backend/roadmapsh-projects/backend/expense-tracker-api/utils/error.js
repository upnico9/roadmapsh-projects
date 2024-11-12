export default function getError(error) {
    if (error.code && error.message) {
        return error;
    }
    let err = {code: 500, message: "Internal Server Error"};
    if (error.name === "ValidationError") {
        err.code = 400;
        err.message = error.message;
    } else if (error.name === "MongoError" && error.code === 11000) {
        err.code = 409;
        err.message = "Duplicate key";
    }
    return err;
}