import { ref, onValue, set } from "firebase/database";

import { db } from ".";
import { handleError } from "./utils";

// Read the parameters from the realtime database
export async function readParameters({ onError, onSuccess }) {
  try {
    // get reference to data
    const reference = ref(db, "/parameters");

    onValue(reference, (snapshot) => {
      if (snapshot.exists()) {
        const value = snapshot.val();
        onSuccess(value);
      } else onError({ message: "Unable to get route parameters" });
    });
  } catch (err) {
    const error = handleError(err);
    if (onError) onError(error);
    return { error };
  }
}

// Reset the parameters on the realtime database
export async function resetParameters(options = {}) {
  const { onError, onSuccess } = options;
  try {
    // get the reference to the parameters data
    const reference = ref(db, "/parameters");

    const data = {
      height: "0",
      weight: "0",
      temperature: "0",
      pulse: "0",
      loading: "1",
    };

    // set data on reference
    await set(reference, data);

    if (onSuccess) onSuccess(data);
    return { data };
  } catch (err) {
    const error = handleError(err);
    if (onError) onError(error);
    return { error };
  }
}
