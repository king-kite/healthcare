import { object, number, string } from 'yup';

const schema = object({
	activity: number().required().min(1).max(5).label('Activity Level'),
	patient_id: string().required().label('Patient ID'),
	height: string().required().label('Height'),
	weight: string().required().label('Weight'),
	temperature: string().required().label('Temperature'),
	pulse: string().required().label('Pulse'),
});

export default schema;
