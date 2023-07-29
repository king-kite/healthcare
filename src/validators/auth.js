import { object, string } from 'yup';

const schema = object({
	full_name: string().required().label('Full Name'),
	email: string().email().required().label('Email Address'),
	phone: string().required().label('Phone Number'),
	image: string().nullable().label('Image'),
});

export default schema;
