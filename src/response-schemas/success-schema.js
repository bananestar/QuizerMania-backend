//! Message Success Résultat en object
class SuccessObjectResponse {
	constructor(result, status = 200) {
		this.result = result;
		this.status = status;
	}
}

//! Message Success Résultat en Array
class SuccessArrayResponse {
	constructor(results, count, status = 200) {
		this.results = results;
		this.count = count;
		this.status = status;
	}
}

module.exports = {
	SuccessObjectResponse,
	SuccessArrayResponse,
};
