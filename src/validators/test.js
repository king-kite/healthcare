import { object, string } from "yup";

const schema = object({
  patient_id: string().required().label("Patient ID"),
  height: string().required().label("Height"),
  weight: string().required().label("Weight"),
  temperature: string().required().label("Temperature"),
  pulse: string().required().label("Pulse"),
});

export default schema;
