
export interface Student {
  name: string;
  surname: string;
  age: number;
  married: boolean;
  grades: number[];
}

export enum SortType {
  Name,
  Surname,
  Age,
  Married,
  AverageGrade
}

function getAverage(grades: number[]): number {
  return grades.length ? grades.reduce((a, b) => a + b, 0) / grades.length : 0;
}

export type SortOrder = 'asc' | 'desc';

export function sortStudents(
  students: Student[],
  sortBy: SortType,
  order: SortOrder,
): Student[] {
  return [...students].sort((a, b) => {
    const getValue = (s: Student): string | number => {
      switch (sortBy) {
        case SortType.Name: return s.name;
        case SortType.Surname: return s.surname;
        case SortType.Age: return s.age;
        case SortType.Married: return s.married ? 1 : 0;
        case SortType.AverageGrade: return getAverage(s.grades);
        default: return '';
      }
    };

    const valA = getValue(a);
    const valB = getValue(b);

    if (typeof valA === 'string' && typeof valB === 'string') {
      return order === 'asc'
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    }

    return order === 'asc'
      ? (valA as number) - (valB as number)
      : (valB as number) - (valA as number);
  });
}
