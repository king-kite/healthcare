import { object, string } from 'yup';

const schema = object({
	full_name: string().required().label('Full Name'),
	email: string().email().required().label('Email Address'),
	image: string().nullable().label('Image'),
});

export default schema;
