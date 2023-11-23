import { faker } from '@faker-js/faker';

import { addPatient, getPatients } from '../firebase/firestore/patients';
import { addTest as createTest } from '../firebase/firestore/tests';

const patients = Array.from({ length: 50 }).map(() => {
  const sex = faker.person.sexType();
  const firstName = faker.person.firstName(sex);
  const lastName = faker.person.lastName(sex);

  const created_at = faker.date.recent();
  const updated_at = faker.date.future({ years: 0.00096154, refDate: created_at })

  const patient = {
    first_name: firstName,
    last_name: lastName,
    email: faker.internet.email({ firstName, lastName, allowSpecialCharacters: true }),
    image: null,
    image_ref: null,
    phone: faker.phone.number(),
    address: faker.location.streetAddress({ useFullAddress: true }),
    gender: sex === 'male' ? 'M' : 'F',
    dob: faker.date.birthdate(),
    created_at,
    updated_at
  };
  return patient;
})

export function createPatients() {
  return patients.map(patient => addPatient({data: patient}));
}

export async function createDummyData() {
	await createPatients();
	await createTests();
}

export async function createTests() {
	const patients = await getPatients()

	const tests = patients.reduce((acc, patient) => {
		const patientTests = Array.from({ length: faker.number.int({ min: 1, max: 5 }) }).map(() => ({
			patient_id: patient.id,
	    activity: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
	    height: faker.number.int({
	      min: 140,
	      max: 207
	    }),
	    weight: faker.number.int({
	      min: 48,
	      max: 100,
	    }),
	    temperature: faker.number.float({
	      min: 33,
	      max: 35.5,
	      precision: .1
	    }),
	    pulse: faker.number.int({ min: 55, max: 100 }),
	    created_at: faker.date.future({ years: 0.00096154, refDate: patient.created_at })
		}))

	  return [...acc, ...patientTests]
	}, [])

	return tests.map(test => createTest({ data: test }))
}
