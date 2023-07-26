import { ValidationError } from 'yup';

export function handleYupError(err) {
	if (err instanceof ValidationError) {
		if (err.inner.length > 0) {
			let error = null;
			err.inner.forEach((error) => {
				const { message } = error;
				if (!error) error = message;
			});
			return { message: error };
		} else {
			const error = err.errors[0] || err.message;
			return { message: error };
		}
	}
	return undefined;
}
