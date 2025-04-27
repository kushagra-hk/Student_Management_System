from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)
CORS(app)

# Database connection function
def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="Password",
        database="student_management"
    )

# API: Add Student
@app.route('/api/students', methods=['POST'])
def add_student():
    data = request.json
    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        query = "INSERT INTO students (first_name, last_name, email, enrollment_date) VALUES (%s, %s, %s, %s)"
        values = (data['first_name'], data['last_name'], data['email'], data['enrollment_date'])
        cursor.execute(query, values)
        db.commit()
        student_id = cursor.lastrowid
        db.close()
        data['student_id'] = student_id
        return jsonify({"message": "Student added", "student": data}), 201
    except Error as e:
        return jsonify({"message": "Error adding student", "error": str(e)}), 500

# API: Get All Students
@app.route('/api/students', methods=['GET'])
def get_students():
    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT * FROM students")
        students = cursor.fetchall()
        db.close()
        return jsonify(students)
    except Error as e:
        return jsonify({"message": "Error retrieving students", "error": str(e)}), 500

# API: Delete Student
@app.route('/api/students/<int:student_id>', methods=['DELETE'])
def delete_student(student_id):
    try:
        db = get_db_connection()
        cursor = db.cursor()
        cursor.execute("DELETE FROM students WHERE student_id = %s", (student_id,))
        db.commit()
        db.close()
        return jsonify({"message": "Student deleted"}), 200
    except Error as e:
        return jsonify({"message": "Error deleting student", "error": str(e)}), 500

# API: Get Grades
@app.route('/api/grades', methods=['GET'])
def get_grades():
    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT * FROM grades")
        grades = cursor.fetchall()
        db.close()
        return jsonify(grades)
    except Error as e:
        return jsonify({"message": "Error retrieving grades", "error": str(e)}), 500

# API: Add Grade
@app.route('/api/grades', methods=['POST'])
def add_grade():
    data = request.json
    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        query = "INSERT INTO grades (student_id, subject, grade) VALUES (%s, %s, %s)"
        values = (data['student_id'], data['subject'], data['grade'])
        cursor.execute(query, values)
        db.commit()
        grade_id = cursor.lastrowid
        db.close()
        data['grade_id'] = grade_id
        return jsonify({"message": "Grade added", "grade": data}), 201
    except Error as e:
        return jsonify({"message": "Error adding grade", "error": str(e)}), 500

# API: Get Attendance
@app.route('/api/attendance', methods=['GET'])
def get_attendance():
    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT * FROM attendance")
        attendance = cursor.fetchall()
        db.close()
        return jsonify(attendance)
    except Error as e:
        return jsonify({"message": "Error retrieving attendance", "error": str(e)}), 500

# API: Add Attendance
@app.route('/api/attendance', methods=['POST'])
def add_attendance():
    data = request.json
    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        query = "INSERT INTO attendance (student_id, date, status) VALUES (%s, %s, %s)"
        values = (data['student_id'], data['date'], data['status'])
        cursor.execute(query, values)
        db.commit()
        attendance_id = cursor.lastrowid
        db.close()
        data['attendance_id'] = attendance_id
        return jsonify({"message": "Attendance record added", "attendance": data}), 201
    except Error as e:
        return jsonify({"message": "Error adding attendance", "error": str(e)}), 500
    
# API: Delete Attendance
@app.route('/api/attendance/<int:attendance_id>', methods=['DELETE'])
def delete_attendance(attendance_id):
    try:
        db = get_db_connection()
        cursor = db.cursor()
        cursor.execute("DELETE FROM attendance WHERE attendance_id = %s", (attendance_id,))
        db.commit()
        db.close()
        return jsonify({"message": "Attendance record deleted"}), 200
    except Error as e:
        return jsonify({"message": "Error deleting attendance", "error": str(e)}), 500

# API: Delete Grade
@app.route('/api/grades/<int:grade_id>', methods=['DELETE'])
def delete_grade(grade_id):
    try:
        db = get_db_connection()
        cursor = db.cursor()
        cursor.execute("DELETE FROM grades WHERE grade_id = %s", (grade_id,))
        db.commit()
        db.close()
        return jsonify({"message": "Grade record deleted"}), 200
    except Error as e:
        return jsonify({"message": "Error deleting grade", "error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)


