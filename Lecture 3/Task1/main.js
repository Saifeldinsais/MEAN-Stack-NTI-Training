class person {
    #email;
    #id;

    constructor(name, email, id) {
        this.name = name;
        this.setEmail(email);
        this.setID(id);
    }

    setEmail(email) {
        if (email.includes("@")) {
            this.#email = email;
        } else {
            throw new Error("Invalid Email");
        }
    }
    setID(id) {
        if (id > 0) {
            this.#id = id;
        } else {
            throw new Error("Invalid Id");
        }
    }

    get id() {
        return this.#id;
    }
    get email() {
        return this.#email;
    }

    perform() {
        console.log("General Task");
    }
}

class principal extends person {
    constructor(name, email, id) {
        super(name, email, id);
        this.members = [];
    }

    addMember(member) {
        this.members.push(member);
        console.log(`${member.name} has been added as a member.`);
    }

    removeMember(member) {
        const index = this.members.indexOf(member);
        if (index === -1) {
            console.log(`${member.name} is not a member.`);
        } else {
            this.members.splice(index, 1);
            console.log(`${member.name} has been removed successfully from the members`)
        }
    }

    listMembers() {
        if (this.members.length === 0) {
            console.log("No members in the system.");
        } else {
            console.log("__________________")
            console.log("list of members:");
            this.members.forEach((member) => {
                console.log(`Member name: ${member.name}`);
            });
            console.log("__________________")
        }
    }

    perform() {
        console.log("Principal Task");
    }

}

class teacher extends person {
    constructor(name, email, id, subject) {
        super(name, email, id);
        this.subject = subject;

        this.gradedStudents = [];
    }

    gradeStudent(student, grade) {
        this.gradedStudents.push({ student: student.name, grade: grade });
        console.log(`Graded ${student.name} with ${grade}`);
    }

    listGrades() {
        if (this.gradedStudents.length === 0) {
            console.log(`No grades recorded for ${this.name}`);
        } else {
            console.log("__________________")
            console.log(`Grades for ${this.name}:`);
            this.gradedStudents.forEach((index) => {
                console.log(`${index.student} - Grade: ${index.grade}`);
            });
            console.log("__________________")
        }
    }

    perform() {
        console.log("Teacher Task");
    }
}

class student extends person {
    constructor(name, email, id) {
        super(name, email, id);
        this.subjects = [];
    }

    enrollSubject(subject) {
        this.subjects.push(subject);
        console.log(`${this.name} has enrolled in ${subject}`);
    }

    listSubjects() {
        if (this.subjects.length === 0) {
            console.log(`No subjects enrolled for ${this.name}`);
        } else {
            console.log("__________________")
            console.log(`${this.name} is enrolled in the following subjects:`);
            this.subjects.forEach((subject) => {
                console.log(`${subject}`);
            });
            console.log("__________________")
        }
    }

    perform() {
        console.log("Student Task");
    }
}

const saif = new principal("Saif", "saif@gmail.com", 1);
const ahmed = new teacher("Ahmed", "ahmed@gmail.com", 2, "Math");
const dahy = new student("Dahy", "dahy@gmail.com", 3);

saif.perform();
ahmed.perform();
dahy.perform();

saif.addMember(ahmed);
saif.addMember(dahy);
saif.listMembers();
ahmed.gradeStudent(dahy, "A+");
ahmed.listGrades();
dahy.enrollSubject("Math");
dahy.enrollSubject("Ai");
dahy.listSubjects();
saif.removeMember(ahmed);
saif.listMembers();
