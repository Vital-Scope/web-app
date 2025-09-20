import { z } from "zod";

const formSchema = z.object({
  lastName: z.string().min(1, "Фамилия обязательна"),
  firstName: z.string().min(1, "Имя обязательно"),
  middleName: z.string().optional(),
  birthDate: z.number("Дата рождения обязательна"), // timestamp
  clientId: z.string().optional(),
  pregnancyWeek: z.number().min(0).max(45).optional().nullable(),
  pregnancyNumber: z.number().min(1).optional().nullable(),
  dueDate: z.number().optional().nullable(), // timestamp
  anamnesis: z.string().optional(),
  doctorNotes: z.string().optional(),
  avatar: z.string().optional().nullable(),
});

export default formSchema;
