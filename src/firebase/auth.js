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
export async function updateProfileInfo({ email, ...payload }) {
	// payload = { displayName: '', photoURL: '' }
	try {
		if (auth.currentUser) {
			const data = await updateProfile(auth.currentUser, payload);
			updateEmail(auth.currentUser, email);

			return {
				data: {
					email,
					...data,
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
