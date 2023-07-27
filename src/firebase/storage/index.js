import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { storage } from "..";
import { handleError } from "../utils";

// function to upload file to firebase storage
export function upload({
	file,
	folder = "images/", // i.e. images/
}) {
	return new Promise((resolve, reject) => {
		try {
			// Create a reference to file
			const storageRef = ref(storage, folder + file.name);

			// Upload the file and metadata
			const uploadTask = uploadBytesResumable(storageRef, file);

			// Listen for state changes, errors, and completion of the upload.
			uploadTask.on(
				"state_changed",
				() => {},
				(error) => {
					throw error;
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
						resolve({ location: folder + file.name, url: downloadURL });
					});
				}
			);
		} catch (err) {
			const error = handleError(err);
			reject(error);
		}
	});
}
