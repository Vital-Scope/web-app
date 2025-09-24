import { z } from "zod";

const formSchema = z.object({
  lastName: z.string().min(1, "Фамилия обязательна"),
  firstName: z.string().min(1, "Имя обязательно"),
  middleName: z.string().nullable(),
  birthDate: z.number("Дата рождения обязательна"), // timestamp
  clientId: z.string().nullable(), // id интеграции
  pregnancyWeek: z.string().min(0).max(45).nullable(), // неделя беременности
  pregnancyNumber: z.string().min(1).nullable(), // какая по счету беременность
  dueDate: z.number().optional().nullable(), // timestamp
  anamnesis: z.string(),
  doctorNotes: z.string(),
  avatar: z.string().nullable(),
});

export default formSchema;
