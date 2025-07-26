// object
// dot notation
// bracket notation
// constructor function
// prototype
// class
// inheritance
// polymorphism
// Encapsulation
// getter setter
// Abstraction

class User {
  #id;
  #email;

  constructor(name, email, id) {
    this.name = name;
    this.email = email;
    this.id = id;
  }

  get email() {
    return this.#email;
  }
  set email(email) {
    if (email.includes("@")) {
      this.#email = email;
    } else {
      throw new Error("Invalid Email");
    }
  }

  get id() {
    return this.#id;
  }

  set id(id) {
    if (id > 0) {
      this.#id = id;
    } else {
      throw new Error("Invalid Id");
    }
  }

  perform() {
    console.log("General Task");
  }
}

class patient extends User {
  constructor(name, email, id) {
    super(name, email, id);
    this.appointments = [];
  }

  bookAppointment(doctor, date) {
    this.appointments.push({ doctor: doctor.name, date: date });
    console.log(`Appointment booked with Dr. ${doctor.name} on ${date}`);
  }

  listAppointments() {
    if (this.appointments.length === 0) {
      console.log(`No appointments booked for ${this.name}`);
    } else {
      console.log(`Appointments for ${this.name}:`);
      this.appointments.forEach((appointment, index) => {
        console.log(`${index + 1}. Dr. ${appointment.doctor} on ${appointment.date}`);
      });
    }
  }

  perform() {
    console.log(`Patient ${this.name} is seeking medical attention`);
  }
}

class doctor extends User {
  constructor(name, email, id, specialization) {
    super(name, email, id);
    this.specialization = specialization;
    this.diagnosedUsers = []; // keep name consistent
  }

  diagnose(user, disease) {
    this.diagnosedUsers.push({ patientName: user.name, disease: disease });
    console.log(`Doctor ${this.name} diagnosed user ${user.name} with ${disease}`);
  }

  listDiagnosedUsers() {
    if (this.diagnosedUsers.length === 0) {
      console.log(`Doctor ${this.name} has no diagnosed users.`);
    } else {
      console.log(`Diagnosed Patients by Dr. ${this.name}:`);
      this.diagnosedUsers.forEach((entry, index) => {
        console.log(`${index + 1}. ${entry.patientName} - ${entry.disease}`);
      });
    }
  }

  perform() {
    console.log(`Doctor ${this.name} specialized in ${this.specialization}`);
  }
}

class Admin extends User {
  constructor(name, email, id) {
    super(name, email, id);
    this.users = [];
  }

  addUser(user) {
    
    this.users.push(user);
    console.log(`Admin ${this.name} added ${user.name}`);
  }

  removeUser(userId) {
    this.users = this.users.filter((user) => {
      user.id !== userId;
    });
    console.log(`Admin ${this.name} remove user with id ${userId}`);
  }

  listUsers() {
    this.users.forEach((user) => {
      console.log(`- user name ${user.name}`);
    });
  }
  perform() {
    console.log(`Admin managing users`);
  }
}

const ahmed = new Admin("ahmed", "admin@.com", 5)
const saif = new doctor("Dr.saif","saif@gmail.com", 1 ,"cardiology")
const dahy = new patient("dahy", "dahy@gmail.com", 2)

saif.perform();
dahy.perform();
ahmed.perform();

dahy.bookAppointment(saif, "2023-10-01");
dahy.listAppointments();

saif.diagnose(dahy, "Flu");
saif.listDiagnosedUsers();
