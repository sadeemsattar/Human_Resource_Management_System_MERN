# Human Resource Management System

University project (5th semester, built 2021–2022) — a web-based HR management
system for three roles (Admin, HR, Employee), with a React frontend and an
Express/MySQL backend.

> Note on the repository name: despite "MERN", the database is **MySQL**, not
> MongoDB. The actual stack is MySQL + Express + React + Node.

## Features

- **Role-based portals** — a single login page routes Admins, HRs and
  Employees to their own dashboards.
- **Authentication** — bcrypt-hashed passwords, JWT access tokens delivered
  in an httpOnly cookie (30 min expiry), and per-role route guards.
- **Admin** — manage HR accounts, departments and designations.
- **HR** — manage employees, approve/reject leave and resignation requests,
  generate payroll.
- **Employee** — view profile, attendance and payroll; apply for leave;
  submit resignation.
- **QR attendance** — employees scan a QR code to mark attendance; the
  request is only accepted if the client IP matches the organization IP
  (`ORG_IP`), i.e. the employee is on the office network. Sample QR codes
  for testing live in `frontend/images/`.
- **Email notifications** — Nodemailer sends newly registered HRs/employees
  their generated credentials via Gmail SMTP.

## Tech stack

| Layer | Technology |
| --- | --- |
| Frontend | React 17 (Create React App 4), React Router 6, Material-UI, ApexCharts, material-table, axios |
| Backend | Node.js, Express 4, jsonwebtoken, bcrypt, Nodemailer |
| Database | MySQL (`mysql` driver), schema in `backend/db/hrDb.sql` |

## Repository structure

```
backend/
  server.js            Entry point (loads config/config.env, starts Express)
  app.js               Express app: middleware + route mounting
  config/database.js   MySQL connection (from env vars)
  config/config.env.example  Template for required env vars
  db/hrDb.sql          Database schema (+ sample seed statements)
  middleware/          JWT validation, role guards, attendance IP check
  routes/              /userLogin, /admin/*, /hr/*, /employee/*, /qr/*
  controller/          Query logic per role
frontend/
  src/                 CRA app: login, per-role dashboards, forms, tables
docs/                  Original coursework reports (ERD, schema, test plans,
                       proposal, network report)
```

## Getting started

Prerequisites: Node.js, a running MySQL server.

### 1. Database

```sql
-- in a MySQL shell
source backend/db/hrDb.sql;
```

This creates the `hr` database and its tables. You will need to insert an
initial `SYS_ADMIN` row manually (with a bcrypt-hashed password) to log in as
Admin — there is no seed script.

### 2. Backend

```bash
cd backend
npm install
cp config/config.env.example config/config.env   # then fill in real values
npm start        # or: npm run dev (nodemon)
```

The frontend expects the API on port **5000**, so set `PORT=5000`.
See `config/config.env.example` for all variables (MySQL credentials,
`JWT_SECRET`, Gmail SMTP account for registration emails, `ORG_IP` for
attendance).

### 3. Frontend

```bash
cd frontend
npm install
npm start        # CRA dev server on http://localhost:3000
```

The backend's CORS allowlist only permits `http://localhost:3000`.

## API overview

All routes except login and QR attendance require a valid `accessToken`
cookie and the matching role.

| Route | Methods | Role | Purpose |
| --- | --- | --- | --- |
| `/userLogin` | POST | — | Login (id, password, loginAs) |
| `/admin/addhr` | GET/POST/PUT/DELETE | Admin | Manage HR accounts |
| `/admin/managedepartment` | GET/POST/PUT/DELETE | Admin | Manage departments |
| `/admin/managedesignation` | GET/POST/PUT/DELETE | Admin | Manage designations |
| `/admin/getadmindata` | GET | Admin | Admin profile |
| `/hr/manageemployee` | GET/POST/PUT/DELETE | HR | Manage employees |
| `/hr/manageleave` | GET/PUT | HR | Approve/reject leave |
| `/hr/manageresignation` | GET/PUT | HR | Approve/reject resignations |
| `/hr/managepayroll` | GET/POST/PUT | HR | Generate payroll |
| `/employee/requestleave` | GET/POST/PUT/DELETE | Employee | Leave requests |
| `/employee/requestresignation` | GET/POST/PUT/DELETE | Employee | Resignation |
| `/employee/getEmployeeAttendance` | GET | Employee | Attendance history |
| `/employee/getEmployeePayroll` | GET | Employee | Payroll history |
| `/qr/read` | POST | (IP-gated) | Mark attendance via QR scan |

## Known limitations

This is preserved as a student project; it works as originally demonstrated
but is not production-grade:

- **SQL injection**: most controller queries build SQL by string
  concatenation of request values (only the login query is parameterized).
  Do not expose this backend to untrusted input.
- **Old toolchain**: Create React App 4 / React 17 will not build on current
  Node versions (fails on Node 17+ due to OpenSSL changes; use Node 14–16,
  e.g. via `nvm`, to run the frontend). Backend dependencies (Express 4,
  bcrypt 5) are similarly dated. Install/build was not re-verified on
  modern Node — the commands above are the intended usage.
- The frontend API base URL (`http://localhost:5000`) is hardcoded across
  components rather than configured in one place.
- No automated tests (jest is configured but no test suites exist; manual
  test cases and logs are in `docs/`).
- The Gmail SMTP credentials previously committed to this repository have
  been removed in favor of env vars and should be considered rotated/dead.

## Authors

Abdullah Tilal Khan, Sadeem Sattar, Salman Ahmed
