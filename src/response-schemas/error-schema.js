//! Message Erreur connection
class ErrorResponse {
	constructor(message, status = 400) {
		this.status = status;
		this.message = message;
	}
}

//! Message Erreur not found
class NotFoundErrorResponse extends ErrorResponse {
	constructor(message) {
		super(message, 404);
	}
}

//! Message Erreur des champs
class InvalidFieldErrorResponse extends ErrorResponse {
	constructor(message, fieldErrors, status = 422) {
		super(message, status);
		this.fieldErrors = fieldErrors;
	}
}

module.exports = {
	ErrorResponse,
	NotFoundErrorResponse,
	InvalidFieldErrorResponse,
};
