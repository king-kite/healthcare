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
} from "firebase/firestore";

import { auth, firestore } from "..";
import { handleError } from "../utils";
import { handleYupError } from "../../validators";
import patientSchema from "../../validators/patient";

const ref = "patients";
const testRef = "tests";

// Get the patients data from the firestore
export async function getPatients({ onSuccess, onSettled, onError }) {
	try {
		// Not Logged In, throw error
		if (!auth.currentUser)
			throw new Error("Authentication credentials were not provided!");

		// Get the patients data from the firestore collection
		// and order by first_name in ascending order
		const patientsRef = collection(firestore, ref);
		const patients = await getDocs(
			query(patientsRef, orderBy("first_name", "asc"))
		);

		// Get the data from each doc in the patients array
		const data = patients.docs.map((doc) => {
			const info = doc.data();

			return {
				id: doc.id,
				first_name: info.first_name,
				last_name: info.last_name,
				email: info.email,
				image: info.image,
				dob: info.dob.toDate(),
				gender: info.gender,
				phone: info.phone,
				created_at: info.created_at,
			};
		});

		if (onSuccess) onSuccess(data);

		return { data };
	} catch (err) {
		const error = handleError(err);
		if (onError) onError(error);
		return { error };
	} finally {
		if (onSettled) onSettled();
	}
}

// Get single patient data from the firestore
export async function getPatient({ id, onSuccess, onSettled, onError }) {
	try {
		// Not Logged In, throw error
		if (!auth.currentUser)
			throw new Error("Authentication credentials were not provided!");

		// Check id is valid
		if (!id) throw new Error("An ID was not provided!");

		// Get the patient data from the firestore
		const patientRef = doc(firestore, ref, id);
		const document = await getDoc(patientRef);

		// Get the data from the document
		const patient = document.data();
		const data = {
			id: document.id,
			first_name: patient.first_name,
			last_name: patient.last_name,
			email: patient.email,
			image: patient.image,
			dob: patient.dob.toDate(),
			gender: patient.gender,
			phone: patient.phone,
			created_at: patient.created_at,
		};

		if (onSuccess) onSuccess(data);

		return { data };
	} catch (err) {
		const error = handleError(err);
		if (onError) onError(error);
		return { error };
	} finally {
		if (onSettled) onSettled();
	}
}

// Add patient data to the firestore
export async function addPatient({ data, onSuccess, onSettled, onError }) {
	try {
		// Not Logged In, throw error
		if (!auth.currentUser)
			throw new Error("Authentication credentials were not provided!");

		// Check data is provided
		if (!data) throw new Error("Patient data is required!");

		// Validate the data using the schema
		const payload = await patientSchema.validate(data);

		// Structure the data to be saved
		const patient = {
			first_name: payload.first_name,
			last_name: payload.last_name,
			email: payload.email,
			image: payload.image,
			image_ref: payload.image_ref,
			phone: payload.phone,
			gender: payload.gender,
			dob: Timestamp.fromDate(new Date(payload.dob)),
			created_by: auth.currentUser.id,
			created_at: Timestamp.fromDate(new Date()),
			updated_at: Timestamp.fromDate(new Date()),
		};

		// Save the patient
		await addDoc(collection(firestore, ref), patient);

		if (onSuccess) onSuccess(patient);
		return { data: patient };
	} catch (err) {
		// check yup error
		const yupError = handleYupError(err);
		if (yupError) {
			if (onError) onError(yupError);
			return { error: yupError };
		} else {
			// Firebase Error
			const error = handleError(err);
			if (onError) onError(error);
			return { error };
		}
	} finally {
		if (onSettled) onSettled();
	}
}

// Edit patient data on the firestore
export async function editPatient({ id, data, onSuccess, onSettled, onError }) {
	try {
		// Not Logged In, throw error
		if (!auth.currentUser)
			throw new Error("Authentication credentials were not provided!");

		// Check id is valid
		if (!id) throw new Error("An ID was not provided!");

		// Check data is provided
		if (!data) throw new Error("Patient data is required!");

		// Validate the data using the schema
		const payload = await patientSchema.validate(data);

		// Structure the data to be saved
		const patient = {
			first_name: payload.first_name,
			last_name: payload.last_name,
			email: payload.email,
			image: payload.image,
			phone: payload.phone,
			gender: payload.gender,
			dob: Timestamp.fromDate(new Date(payload.dob)),
			updated_at: Timestamp.fromDate(new Date()),
		};

		// Save the patient
		await updateDoc(doc(firestore, ref, id), patient);

		if (onSuccess) onSuccess(data);

		return { data };
	} catch (err) {
		// check yup error
		const yupError = handleYupError(err);
		if (yupError) {
			if (onError) onError(yupError);
			return { error: yupError };
		} else {
			// Firebase Error
			const error = handleError(err);
			if (onError) onError(error);
			return { error };
		}
	} finally {
		if (onSettled) onSettled();
	}
}

// Delete patient data from the firestore
export async function deletePatient({ id, onSuccess, onSettled, onError }) {
	try {
		// Not Logged In, throw error
		if (!auth.currentUser)
			throw new Error("Authentication credentials were not provided!");

		// Check id is valid
		if (!id) throw new Error("An ID was not provided!");

		// Delete the patient
		await deleteDoc(doc(firestore, ref, id));

		// Remove the related test data associated with the patient
		// Get the tests data from the firestore collection
		// where the test id is the same
		const testsRef = collection(firestore, testRef);
		const tests = await getDocs(query(testsRef, where("test_id", "==", id)));

		// store the promises of the deleteDoc query and await them
		const promises = [];
		tests.docs.forEach((doc) =>
			promises.push(deleteDoc(firestore, testRef, doc.id))
		);
		await Promise.all(promises);

		const result = {
			message: "Patient with the specified ID was deleted successfully!",
		};

		if (onSuccess) onSuccess(result);
		return { data: result };
	} catch (err) {
		const error = handleError(err);
		if (onError) onError(error);
		return { error };
	} finally {
		if (onSettled) onSettled();
	}
}
