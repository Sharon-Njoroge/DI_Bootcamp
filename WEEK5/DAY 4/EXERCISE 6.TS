type Person = { name: string; age: number };
type Job = { position: "Manager" | "Developer"; department: string };

type Employee = Person & Job;

function describeEmployee(emp: Employee): string {
  if (emp.position === "Manager") {
    return `${emp.name} manages the ${emp.department} department.`;
  } else {
    return `${emp.name} is a developer in ${emp.department}.`;
  }
}