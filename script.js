class Employee {
  constructor(name, age, payRate, hours) {
    this.name = name;
    this.age = age;
    this.payRate = payRate;
    this.hours = hours;
  }

  calculatePay() {
    // Implement the logic to calculate pay
  }
}

class PartTime extends Employee {
  constructor(name, age, payRate, hours) {
    super(name, age, payRate, hours);
    this.employeeType = "Part-Time";
    this.annualSalary = this.payRate * this.hours * 52;
  }

  calculatePay() {
    this.annualSalary = this.payRate * this.hours * 52;
  }
}

class Manager extends Employee {
  constructor(name, age, payRate, hours = 40) {
    super(name, age, payRate, hours);
    this.employeeType = "Manager";
    this.annualSalary = this.payRate * this.hours * 52;
  }

  calculatePay() {
    this.annualSalary = this.payRate * this.hours * 52;
  }
}

class Main {
  constructor() {
    this.employees = [
      new Manager("Alice", 30, 50, 40),
      new PartTime("Bobby", 22, 15, 20),
      new Manager("Charles", 45, 60, 40),
    ];
    this.displayEmployees(false); // Display employees initially without showing the menu again
    this.displayMenu();
  }

  displayMenu() {
    console.clear();
    this.displayEmployees(false); // Display employees without showing the menu again
    const menu = `
      JohnnyBoy's INC\n
      1. Add Employee
      2. Remove Employee
      3. Edit Employee
      4. Display Employees
    `;
    const choice = prompt(menu + "\nEnter your choice: ");
    if (choice === null) return; // Stop if the user presses Cancel
    switch (choice) {
      case "1":
        this.addEmployee();
        break;
      case "2":
        this.removeEmployee();
        break;
      case "3":
        this.editEmployee();
        break;
      case "4":
        this.displayEmployees();
        break;
      default:
        console.log("Invalid choice. Please try again.");
        this.displayMenu();
    }
  }

  addEmployee() {
    const name = prompt("Enter name: ");
    if (name === null) return this.displayMenu();
    const age = parseInt(prompt("Enter age: "));
    if (isNaN(age)) return this.displayMenu();
    const payRate = parseFloat(prompt("Enter pay rate: "));
    if (isNaN(payRate)) return this.displayMenu();
    const hours = parseInt(prompt("Enter hours per week: "));
    if (isNaN(hours)) return this.displayMenu();
    let employee;
    if (hours <= 40) {
      employee = new PartTime(name, age, payRate, hours);
    } else {
      employee = new Manager(name, age, payRate, hours);
    }
    this.employees.push(employee);
    this.displayEmployees();
  }

  removeEmployee() {
    const identifier = prompt("Enter employee number or name to remove: ");
    if (identifier === null) return this.displayMenu();
    if (isNaN(identifier)) {
      this.employees = this.employees.filter((emp) => emp.name !== identifier);
    } else {
      const index = parseInt(identifier) - 1;
      if (index >= 0 && index < this.employees.length) {
        this.employees.splice(index, 1);
      }
    }
    this.displayEmployees();
  }

  editEmployee() {
    const index = parseInt(prompt("Enter employee number to edit: ")) - 1;
    if (isNaN(index) || index < 0 || index >= this.employees.length)
      return this.displayMenu();
    const newPayRate = parseFloat(prompt("Enter new pay rate: "));
    if (isNaN(newPayRate)) return this.displayMenu();
    this.employees[index].payRate = newPayRate;
    this.employees[index].calculatePay();
    this.displayEmployees();
  }

  displayEmployees(showMenu = true) {
    console.clear();
    console.log("JohnnyBoy's INC\n");
    console.log(
      "ID".padEnd(5) +
        "Name".padEnd(15) +
        "Age".padEnd(5) +
        "Salary".padEnd(10) +
        "Hours".padEnd(10) +
        "Pay Rate".padEnd(10) +
        "Type".padEnd(15)
    );
    this.employees.forEach((emp, index) => {
      console.log(
        `${(index + 1).toString().padEnd(5)}` +
          `${emp.name.padEnd(15)}` +
          `${emp.age.toString().padEnd(5)}` +
          `${emp.annualSalary.toString().padEnd(10)}` +
          `${emp.hours.toString().padEnd(10)}` +
          `${emp.payRate.toString().padEnd(10)}` +
          `${emp.employeeType.padEnd(15)}`
      );
    });
    if (showMenu) {
      this.displayMenu();
    }
  }
}

(() => {
  new Main();
})();
