**Create patient**
```
type FormData = {
  lastName: string;
  firstName: string;
  middleName: string | null;
  birthDate: number;
  clientId: string | null;
  pregnancyWeek: number | null;
  pregnancyNumber: number | null;
  dueDate: number | null;
  anamnesis: string;
  doctorNotes: string;
  avatar: string | null;
};
```