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
} from 'firebase/firestore';

import { getPatient } from './patients';
import { auth, firestore } from '..';
import { handleError } from '../utils';
import { handleYupError } from '../../validators';
import testSchema from '../../validators/test';

const reference = 'tests';

function getDateString(value) {
	let date = value.getDate();
	let month = value.getMonth() + 1;
	let year = value.getFullYear();
	date = date > 9 ? date : date.toString().padStart(2, '0');
	month = month > 9 ? month : month.toString().padStart(2, '0');
	year = year > 999 ? year : year.toString().padStart(4, '0');
	return `${year}-${month}-${date}`;
}

// Get the serialized test data from the document
async function serializeTest(doc) {
	const info = doc.data();

	let patient = null;

	try {
		patient = await getPatient({ id: info.patient_id });
	} catch (error) {
		patient = null;
	}

	return {
		id: doc.id,
		patient,
		height: info.height,
		temperature: info.temperature,
		weight: info.weight,
		pulse: info.pulse,
		created_at: info.created_at
			? getDateString(info.created_at.toDate())
			: undefined,
	};
}

// Get the tests data from the firestore
export function getTests() {
	return new Promise((resolve, reject) => {
		try {
			// Not Logged In, throw error
			if (!auth.currentUser)
				throw new Error('Authentication credentials were not provided!');

			// Get the tests data from the firestore collection
			// and order by created_at in descending order
			const testsRef = collection(firestore, reference);
			getDocs(query(testsRef, orderBy('created_at', 'desc')))
				.then(async (tests) => {
					// Get the data from each doc in the tests array
					const data = await Promise.all(
						tests.docs.map((doc) => serializeTest(doc))
					);
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

// Get single test data from the firestore
export function getTest({ id }) {
	return new Promise((resolve, reject) => {
		try {
			// Not Logged In, throw error
			if (!auth.currentUser)
				throw new Error('Authentication credentials were not provided!');

			// Check id is valid
			if (!id) throw new Error('An ID was not provided!');

			// Get the test data from the firestore
			const testRef = doc(firestore, reference, id);
			getDoc(testRef)
				.then(async (document) => {
					// Get the data from the document
					const data = await serializeTest(document);
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

// Add test data to the firestore
export function addTest({ data }) {
	return new Promise((resolve, reject) => {
		try {
			// Not Logged In, throw error
			if (!auth.currentUser)
				throw new Error('Authentication credentials were not provided!');

			// Check data is provided
			if (!data) throw new Error('Test data is required!');

			// Validate the data using the schema
			const payload = testSchema.validateSync(data, { abortEarly: false });

			// Structure the data to be saved
			const test = {
				patient_id: payload.patient_id,
				height: payload.height,
				weight: payload.weight,
				temperature: payload.temperature,
				pulse: payload.pulse,
				created_by: auth.currentUser.uid,
				created_at: Timestamp.fromDate(new Date()),
			};

			// Save the test document
			addDoc(collection(firestore, reference), test)
				.then((doc) => {
					resolve({
						id: doc.id,
						...payload,
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

// Delete test data from the firestore
export function deleteTest({ id }) {
	return new Promise((resolve, reject) => {
		try {
			// Not Logged In, throw error
			if (!auth.currentUser)
				throw new Error('Authentication credentials were not provided!');

			// Check id is valid
			if (!id) throw new Error('An ID was not provided!');

			// Delete the test
			deleteDoc(doc(firestore, reference, id))
				.then(() => {
					resolve({
						message: 'Test with the specified Id was deleted successfully!',
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
