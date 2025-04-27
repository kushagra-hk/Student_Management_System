// document.addEventListener("DOMContentLoaded", function () {
//   const form = document.getElementById("student-form");
//   const studentList = document.getElementById("student-list");

//   // Fetch all students on page load
//   fetch("http://localhost:5000/api/students")
//     .then((response) => response.json())
//     .then((data) => {
//       data.forEach(addStudentToTable);
//     })
//     .catch((error) => console.error("Error fetching students:", error));

//   // Handle form submission
//   form.addEventListener("submit", function (event) {
//     event.preventDefault();

//     const studentData = {
//       first_name: document.getElementById("first_name").value,
//       last_name: document.getElementById("last_name").value,
//       email: document.getElementById("email").value,
//       enrollment_date: document.getElementById("enrollment_date").value,
//     };

//     fetch("http://localhost:5000/api/students", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(studentData),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.student) {
//           addStudentToTable(data.student);
//           form.reset();
//         } else {
//           alert("Error adding student");
//         }
//       })
//       .catch((error) => console.error("Error:", error));
//   });

//   function addStudentToTable(student) {
//     const row = document.createElement("tr");
//     const studentId = student.student_id || student.id;
//     row.setAttribute("data-id", studentId);
//     row.innerHTML = `
//       <td>${studentId}</td>
//       <td>${student.first_name || student.name.split(' ')[0]}</td>
//       <td>${student.last_name || student.name.split(' ')[1]}</td>
//       <td>${student.email || '—'}</td>
//       <td>${student.enrollment_date || '—'}</td>
//       <td><button class="delete-btn">Delete</button></td>
//     `;

//     const deleteBtn = row.querySelector(".delete-btn");
//     deleteBtn.addEventListener("click", function () {
//       const confirmDelete = confirm("Are you sure you want to delete this student?");
//       if (!confirmDelete) return;

//       fetch(`http://localhost:5000/api/students/${studentId}`, {
//         method: "DELETE",
//       })
//         .then((response) => {
//           if (response.ok) {
//             row.remove();
//           } else {
//             alert("Failed to delete student.");
//           }
//         })
//         .catch((error) => console.error("Error deleting student:", error));
//     });

//     studentList.appendChild(row);
//   }
// });


// script.js

document.addEventListener("DOMContentLoaded", function () {
  fetchStudents();
  fetchGrades();
  fetchAttendance();

  // Add Student
  document.getElementById("studentForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const studentData = {
      first_name: document.getElementById("firstName").value,
      last_name: document.getElementById("lastName").value,
      email: document.getElementById("email").value,
      enrollment_date: document.getElementById("enrollmentDate").value,
    };

    fetch("http://localhost:5000/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(studentData),
    })
      .then((res) => res.json())
      .then((data) => {
        fetchStudents();
        e.target.reset();
      });
  });

  // Add Grade
  document.getElementById("gradeForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const gradeData = {
      student_id: document.getElementById("gradeStudentId").value,
      subject: document.getElementById("subject").value,
      grade: parseFloat(document.getElementById("grade").value),
    };

    fetch("http://localhost:5000/api/grades", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(gradeData),
    })
      .then((res) => res.json())
      .then((data) => {
        fetchGrades();
        e.target.reset();
      });
  });

  // Add Attendance
  document.getElementById("attendanceForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const attendanceData = {
      student_id: document.getElementById("attendanceStudentId").value,
      date: document.getElementById("attendanceDate").value,
      status: document.getElementById("status").value,
    };

    fetch("http://localhost:5000/api/attendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(attendanceData),
    })
      .then((res) => res.json())
      .then((data) => {
        fetchAttendance();
        e.target.reset();
      });
  });
});

function fetchStudents() {
  fetch("http://localhost:5000/api/students")
    .then((res) => res.json())
    .then((data) => {
      const table = document.getElementById("studentTableBody");
      table.innerHTML = "";
      data.forEach((student) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${student.student_id}</td>
          <td>${student.first_name}</td>
          <td>${student.last_name}</td>
          <td>${student.email}</td>
          <td>${student.enrollment_date}</td>
          <td><button class="delete-btn" onclick="deleteStudent(${student.student_id})">Delete</button></td>
        `;
        table.appendChild(row);
      });
    });
}

function deleteStudent(id) {
  fetch(`http://localhost:5000/api/students/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      fetchStudents();
    });
}

// Fetch Grades
function fetchGrades() {
  fetch("http://localhost:5000/api/grades")
    .then((res) => res.json())
    .then((data) => {
      const table = document.getElementById("gradesTableBody");
      table.innerHTML = "";
      data.forEach((grade) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${grade.grade_id}</td>
          <td>${grade.student_id}</td>
          <td>${grade.subject}</td>
          <td>${grade.grade}</td>
          <td><button class="delete-btn" onclick="deleteGrade(${grade.grade_id})">Delete</button></td>
        `;
        table.appendChild(row);
      });
    });
}

function deleteGrade(id) {
  fetch(`http://localhost:5000/api/grades/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      fetchGrades();
    });
}

// Fetch Attendance
function fetchAttendance() {
  fetch("http://localhost:5000/api/attendance")
    .then((res) => res.json())
    .then((data) => {
      const table = document.getElementById("attendanceTableBody");
      table.innerHTML = "";
      data.forEach((att) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${att.attendance_id}</td>
          <td>${att.student_id}</td>
          <td>${att.date}</td>
          <td>${att.status}</td>
          <td><button class="delete-btn" onclick="deleteAttendance(${att.attendance_id})">Delete</button></td>
        `;
        table.appendChild(row);
      });
    });
}

function deleteAttendance(id) {
  fetch(`http://localhost:5000/api/attendance/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      fetchAttendance();
    });
}
