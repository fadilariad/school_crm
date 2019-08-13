import Translate from '../utils/translate'

class ExtendableError extends Error {
	constructor(message) {
		message = Translate.getString(message);
		super(message);
		this.name = this.constructor.name;
		if (typeof Error.captureStackTrace === 'function') {
			Error.captureStackTrace(this, this.constructor);
		} else {
			this.stack = (new Error(message)).stack;
		}
	}
}

export default ExtendableError
