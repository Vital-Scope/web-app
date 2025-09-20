import z from "zod";

const formSchema = z.object({
  firstName: z.string().min(1, "Имя обязательно"),
  lastName: z.string().min(1, "Фамилия обязательна"),
  information: z.string(),
  age: z
    .number()
    .min(10, "Минимальный возраст 10")
    .max(70, "Максимальный возраст 70")
    .optional()
    .nullable(),
  pregnancyWeek: z
    .number()
    .min(1, "Минимум 1 неделя")
    .max(42, "Максимум 42 недели")
    .optional()
    .nullable(),
});

export default formSchema;
