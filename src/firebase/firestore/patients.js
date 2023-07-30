import {
	Timestamp,
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	orderBy,
	query,
	updateDoc,
	where,
} from 'firebase/firestore';

import { auth, firestore } from '..';
import { handleError } from '../utils';
import { handleYupError } from '../../validators';
import patientSchema from '../../validators/patient';

const reference = 'patients';
const testRef = 'tests';

function getDateString(date) {
	let month = date.getMonth() + 1;
	month = month > 9 ? month : month.toString().padStart(2, '0');
	return `${date.getFullYear()}-${month}-${date.getDate()}`;
}

// Get the serialized patient data from the document
function serializePatient(doc) {
	const info = doc.data();

	return {
		id: doc.id,
		first_name: info.first_name,
		last_name: info.last_name,
		full_name: info.first_name + ' ' + info.last_name,
		email: info.email,
		image: info.image,
		dob: info.dob ? getDateString(info.dob.toDate()) : undefined,
		gender: info.gender,
		phone: info.phone,
		address: info.address,
		created_at: info.created_at
			? getDateString(info.created_at.toDate())
			: undefined,
		updated_at: info.updated_at
			? getDateString(info.updated_at.toDate())
			: undefined,
	};
}

// Get the patients data from the firestore
export function getPatients() {
	return new Promise((resolve, reject) => {
		try {
			// Not Logged In, throw error
			if (!auth.currentUser)
				throw new Error('Authentication credentials were not provided!');

			// Get the patients data from the firestore collection
			// and order by created_at in descending order
			const patientsRef = collection(firestore, reference);
			getDocs(query(patientsRef, orderBy('created_at', 'desc')))
				.then((patients) => {
					// Get the data from each doc in the patients array
					const data = patients.docs.map((doc) => serializePatient(doc));
					resolve(data);
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

// Get single patient data from the firestore
export function getPatient({ id }) {
	return new Promise((resolve, reject) => {
		try {
			// Not Logged In, throw error
			if (!auth.currentUser)
				throw new Error('Authentication credentials were not provided!');

			// Check id is valid
			if (!id) throw new Error('An ID was not provided!');

			// Get the patient data from the firestore
			const patientRef = doc(firestore, reference, id);
			getDoc(patientRef)
				.then((document) => {
					// Get the data from the document
					const data = serializePatient(document);
					resolve(data);
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

// Add patient data to the firestore
export function addPatient({ data }) {
	return new Promise((resolve, reject) => {
		try {
			// Not Logged In, throw error
			if (!auth.currentUser)
				throw new Error('Authentication credentials were not provided!');

			// Check data is provided
			if (!data) throw new Error('Patient data is required!');

			// Validate the data using the schema
			const payload = patientSchema.validateSync(data, { abortEarly: false });

			// Structure the data to be saved
			const patient = {
				first_name: payload.first_name,
				last_name: payload.last_name,
				email: payload.email,
				image: payload.image ? payload.image : null,
				image_ref: payload.image_ref ? payload.image_ref : null,
				phone: payload.phone,
				address: payload.address,
				gender: payload.gender,
				dob: Timestamp.fromDate(new Date(payload.dob)),
				created_by: auth.currentUser.uid,
				created_at: Timestamp.fromDate(new Date()),
				updated_at: Timestamp.fromDate(new Date()),
			};

			// Save the patient document
			addDoc(collection(firestore, reference), patient)
				.then((doc) => {
					resolve({
						id: doc.id,
						...payload,
						dob: new Date(payload.dob).toDateString(),
					});
				})
				.catch((err) => {
					const error = handleError(err);
					reject(error);
				});
		} catch (err) {
			// check yup error
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

// Edit patient data on the firestore
export function editPatient({ id, data }) {
	return new Promise((resolve, reject) => {
		try {
			// Not Logged In, throw error
			if (!auth.currentUser)
				throw new Error('Authentication credentials were not provided!');

			// Check id is valid
			if (!id) throw new Error('An ID was not provided!');

			// Check data is provided
			if (!data) throw new Error('Patient data is required!');

			// Validate the data using the schema
			const payload = patientSchema.validateSync(data);

			// Structure the data to be saved
			const patient = {
				first_name: payload.first_name,
				last_name: payload.last_name,
				email: payload.email,
				phone: payload.phone,
				address: payload.address,
				gender: payload.gender,
				dob: Timestamp.fromDate(new Date(payload.dob)),
				updated_at: Timestamp.fromDate(new Date()),
			};
			if (payload.image_ref) patient.image_ref = payload.image_ref;
			if (payload.image) patient.image = payload.image;

			// Save the patient
			updateDoc(doc(firestore, reference, id), patient)
				.then(() => {
					resolve({
						id,
						...payload,
						dob: new Date(payload.dob).toDateString(),
					});
				})
				.catch((err) => {
					const error = handleError(err);
					reject(error);
				});
		} catch (err) {
			// check yup error
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

// Delete patient data from the firestore
export function deletePatient({ id }) {
	return new Promise((resolve, reject) => {
		try {
			// Not Logged In, throw error
			if (!auth.currentUser)
				throw new Error('Authentication credentials were not provided!');

			// Check id is valid
			if (!id) throw new Error('An ID was not provided!');

			// Delete the patient
			deleteDoc(doc(firestore, reference, id))
				.then(() => {
					// Remove the related test data associated with the patient
					// Get the tests data from the firestore collection
					// where the test id is the same
					const testsRef = collection(firestore, testRef);
					return getDocs(query(testsRef, where('patient_id', '==', id)));
				})
				.then(async (tests) => {
					// store the promises of the deleteDoc query and await them
					const promises = [];
					tests.docs.forEach((doc) =>
						promises.push(deleteDoc(firestore, testRef, doc.id))
					);
					await Promise.all(promises);
					resolve({
						message: 'Patient with the specified ID was deleted successfully!',
					});
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
