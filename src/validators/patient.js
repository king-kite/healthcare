import { date, object, string } from 'yup';

const schema = object({
	first_name: string().required().label('First Name'),
	last_name: string().required().label('Last Name'),
	email: string().email().required().label('Email Address'),
	dob: date().required().label('Date of Birth'),
	gender: string().oneOf(['Male', 'Female']).required().label('Gender'),
	phone: string().required().label('Phone Number'),
});

export default schema;
