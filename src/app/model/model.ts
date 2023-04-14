export interface Student {
  id: number;
  name: string;
  birthdate: Date;
  number: number;
}

export interface Group {
  id: number;
  name: string;
  students: Student[];
}

export interface GroupCreationModalData {
  group: Group;
}

export interface StudentEditingModalData {
  student: Student;
}
export interface UserAccount {
  username: string;
  password: string;
  role: string;
}
