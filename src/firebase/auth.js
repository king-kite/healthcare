import {
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signOut,
	updateEmail,
	updatePassword,
	updateProfile,
} from 'firebase/auth';

import { auth } from '.';
import { handleError } from './utils';
import { handleYupError } from '../validators';
import updateProfileSchema from '../validators/auth';

// get logged in user info
export async function getProfile() {
	try {
		if (auth.currentUser)
			return {
				data: {
					displayName: auth.currentUser.displayName,
					email: auth.currentUser.email,
					id: auth.currentUser.uid,
					image: auth.currentUser.photoURL,
					phone: auth.currentUser.phoneNumber,
				},
			};
		return null;
	} catch (error) {
		return {
			error: handleError(error),
		};
	}
}

// update user profile info and email as well
export function updateProfileInfo({ data }) {
	return new Promise((resolve, reject) => {
		// payload = { displayName: '', photoURL: '' }
		try {
			if (!auth.currentUser)
				throw new Error('Authentication credentials were not provided!');

			const valid = updateProfileSchema.validateSync(data, {
				abortEarly: false,
			});

			const payload = valid;
			const profile = { displayName: payload.full_name };
			if (payload.image) profile.photoURL = payload.image;
			updateProfile(auth.currentUser, profile)
				.then(() => updateEmail(auth.currentUser, payload.email))
				.then(() => {
					resolve({
						...payload,
						displayName: payload.full_name,
					});
				})
				.catch((err) => {
					const error = handleError(err);
					reject(error);
				});
		} catch (err) {
			const yupError = handleYupError(err);
			if (yupError) {
				reject(yupError);
			} else {
				// Firebase Error
				const error = handleError(err);
				reject(error);
			}
		}
	});
}

// Sign in with email and password
export function emailPasswordLogin({ email, password }) {
	return new Promise((resolve, reject) => {
		try {
			signInWithEmailAndPassword(auth, email, password)
				.then((credentials) => {
					if (credentials?.user) {
						resolve({
							displayName: credentials.user.displayName,
							email: credentials.user.email,
							id: credentials.user.uid,
							image: credentials.user.photoURL,
							phone: credentials.user.phoneNumber,
						});
					} else {
						reject({
							message: 'Unable to login with provided credentials',
						});
					}
				})
				.catch((err) => {
					const error = handleError(err);
					reject(error);
				});
		} catch (err) {
			const error = handleError(err);
			reject(error);
		}
	});
}

// Send password reset link
export function resetPassword({ email }) {
	return new Promise((resolve, reject) => {
		try {
			sendPasswordResetEmail(auth, email)
				.then(() => {
					resolve({
						message:
							'A password reset email was sent to your email address. Follow the instructions ot continue.',
					});
				})
				.catch((err) => {
					const error = handleError(err);
					reject(error);
				});
		} catch (err) {
			const error = handleError(error);
			reject(error);
		}
	});
}

// Logout user
export function logout() {
	return new Promise((resolve, reject) => {
		try {
			signOut(auth)
				.then(() => {
					resolve({ message: 'Signed out successfully!' });
				})
				.catch((err) => {
					const error = handleError(err);
					reject(error);
				});
		} catch (err) {
			const error = handleError(err);
			reject(error);
		}
	});
}

// Update/Change user password
export async function changePassword({ password }) {
	try {
		if (auth.currentUser) {
			await updatePassword(auth.currentUser, password);
			return {
				data: {
					message: 'Password updated successfully!',
				},
			};
		} else {
			return {
				error: {
					message: 'Authentication credentials were not provided!',
				},
			};
		}
	} catch (error) {
		return {
			error: handleError(error),
		};
	}
}
