# Human Resource Management System - MERN
This is the fifth semester project - HRMS implemented with MySql DataBase, Express JS, React JS, Node JS and Material UI.

# Introduction
The Human Resource Management System (HRMS) aims to facilitate the management operation in an organization. 
It focuses on the communication of three entities including Admin, HR and Employee. 
Its objective is to automate the daily activities carried out by these activities.

The Bcrypt hashing is used to hash the users passwords.

The JWT Tokenization and Cookies are implemented to safeguard the users data and authorization in the login system of the respective users. 

The SMTP protocol is implemented with NodeMailer whenever any Employee is registered with our system, an email is send to that employee for successfull registration.

The QRScanner is implemented to scan QR for the attendance. Furthermore, the client IP is then authenticated with the organization’s IP to check whether the client is connected with the organization network and is within the premises to mark the attendance.  

# Architecture

The HRMS is composed on the Client Server Architecture. 

The users of the system provide the request to the web based HRMS system to fetch their respective data and page portal. It will generate the HTTP client request that will be accepted by the server with the TCP Protocol to assess the HTTP request [2]. The server then provides with the accurate result as per the client request and respond with the HTTP response.

# Features

The HRMS consist on three entities that include Admin, HR and Employee with their respective dashboards and functionalities which are mentioned below:

### Admin:

The following are the functionalities of Admin:

* Add HR Details
* Update HR Details
* Delete HR Details
* Manage Departments
* Manage Designation
* View its respective details

### HR:

The following are the functionalities of HR:

* Manage Employees
* Approve Leave
* Approve Resignation
* Generate Payroll
* View Details

### Employee:

The following are the functionalities of Employee:

* View Details
* Add Attendance
* Apply Leave
* Submit Resignation
* Receive Payroll

