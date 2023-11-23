import { date, object, number, string } from 'yup';

const schema = object({
	activity: number().required().min(1).max(5).label('Activity Level'),
	patient_id: string().nullable().optional().label('Patient ID'),
	height: string().required().label('Height'),
	weight: string().required().label('Weight'),
	temperature: string().required().label('Temperature'),
	pulse: string().required().label('Pulse'),
	created_at: date().optional().nullable().label('Date')
});

export default schema;
