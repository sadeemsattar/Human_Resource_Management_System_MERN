create database hr;
use hr;

CREATE TABLE SYS_ADMIN(
ADMIN_ID VARCHAR(25) PRIMARY KEY,
FIRST_NAME VARCHAR(25),
LAST_NAME VARCHAR(25),
PASSOWRD VARCHAR(255),
CNIC VARCHAR(13)
);

CREATE TABLE HR(
HR_ID VARCHAR(25) PRIMARY KEY,
FIRST_NAME VARCHAR(25),
LAST_NAME VARCHAR(25),
PASSOWRD VARCHAR(255),
EMAIL VARCHAR(50),
PHONE_NUMBER INT,
DOB DATE,
HIRE_DATE DATE,
ADDRESS VARCHAR(50),
CNIC VARCHAR(13),
ADMIN_ID VARCHAR(25) ,
FOREIGN KEY (ADMIN_ID) REFERENCES SYS_ADMIN(ADMIN_ID)
);
CREATE TABLE EMPLOYEE (
EMP_ID VARCHAR(25) PRIMARY KEY,
FIRST_NAME VARCHAR(25),
LAST_NAME VARCHAR(25),
PASSOWRD VARCHAR(255),
EMAIL VARCHAR(50),
PHONE_NUMBER INT,
DOB DATE,
HIRE_DATE DATE,
ADDRESS VARCHAR(50),
CNIC VARCHAR(13),
HR_ID VARCHAR(25),
FOREIGN KEY (HR_ID) REFERENCES HR(HR_ID),
DEPARTMENT_ID VARCHAR(25) ,
FOREIGN KEY (DEPARTMENT_ID) REFERENCES DEPARTMENT(DEPARTMENT_ID),
DESIGNATION_ID VARCHAR(25),
FOREIGN KEY (DESIGNATION_ID) REFERENCES DESIGNATION(DESIGNATION_ID)
);

CREATE TABLE DESIGNATION (
DESIGNATION_ID VARCHAR(25) PRIMARY KEY,
DESIGNATION_NAME VARCHAR(25),
BASIC_SALARY FLOAT,
ALLOUNCE FLOAT,
ADMIN_ID VARCHAR(25) ,
FOREIGN KEY (ADMIN_ID) REFERENCES SYS_ADMIN(ADMIN_ID)
);
-- insert into sys_admin(ADMIN_ID) values('a1');
-- insert into hr(HR_ID,admin_id) values("h1","a1")
-- -- insert into employee() values(
CREATE TABLE DEPARTMENT (
DEPARTMENT_ID VARCHAR(25) PRIMARY KEY,
DEPARTMENT_NAME VARCHAR(25),
ADMIN_ID VARCHAR(25) ,
FOREIGN KEY (ADMIN_ID) REFERENCES SYS_ADMIN(ADMIN_ID)
);

CREATE TABLE RESIGNATION(
REASON VARCHAR(1000),
APPLY_DATE DATE,
APPROVED_STATUS varchar(20),
EMP_ID VARCHAR(25) ,
FOREIGN KEY (EMP_ID) REFERENCES EMPLOYEE(EMP_ID),
CONSTRAINT RES_KEY PRIMARY KEY (EMP_ID,APPLY_DATE)
);


CREATE TABLE PROJECT (
PROJECT_ID VARCHAR(25) PRIMARY KEY,
PROJECT_NAME VARCHAR(25),
START_DATE DATE,
FNISH_STATUS BOOL,
END_DATE DATE
);

CREATE TABLE ATTENDENCE(
MARK VARCHAR (1),
MARK_DATE DATE,
EMP_ID VARCHAR(25) ,
FOREIGN KEY (EMP_ID) REFERENCES EMPLOYEE(EMP_ID),
CONSTRAINT ATT_KEY PRIMARY KEY (EMP_ID,MARK_DATE)
);


CREATE TABLE LEAVE_REQUEST(
START_DATE DATE,
END_DATE DATE,
REASON VARCHAR(100),
LEAVE_STATUS varchar(20),
EMP_ID VARCHAR(25) ,
FOREIGN KEY (EMP_ID) REFERENCES EMPLOYEE(EMP_ID),
HR_ID VARCHAR(25),
FOREIGN KEY (HR_ID) REFERENCES EMPLOYEE(HR_ID),
CONSTRAINT LEAVE_KEY PRIMARY KEY (EMP_ID,START_DATE)
);

CREATE TABLE PAYROLL (
SALARY FLOAT ,
SALARY_DATE DATE,
EMP_ID VARCHAR(25) ,
FOREIGN KEY (EMP_ID) REFERENCES EMPLOYEE(EMP_ID),
HR_ID VARCHAR(25),
CONSTRAINT LEAVE_KEY PRIMARY KEY (EMP_ID,HR_ID,SALARY_DATE),
FOREIGN KEY (HR_ID) REFERENCES EMPLOYEE(HR_ID)
);

CREATE TABLE WORK_ON (
EMP_ID VARCHAR(25) ,
FOREIGN KEY (EMP_ID) REFERENCES EMPLOYEE(EMP_ID),
PROJECT_ID VARCHAR(25) ,
FOREIGN KEY (PROJECT_ID) REFERENCES PROJECT(PROJECT_ID),
CONSTRAINT WORK_KEY PRIMARY KEY(EMP_ID,PROJECT_ID),
WORKING_HOUR INT
);


CREATE TABLE DEPARTMENT_MANGER(
EMP_ID VARCHAR(25) ,
FOREIGN KEY (EMP_ID) REFERENCES EMPLOYEE(EMP_ID),
DEPARTMENT_ID VARCHAR(25) ,
FOREIGN KEY (DEPARTMENT_ID) REFERENCES DEPARTMENT(DEPARTMENT_ID),
START_DATE DATE,
CONSTRAINT MNG_KEY PRIMARY KEY (EMP_ID,DEPARTMENT_ID) 
);

CREATE TABLE EMAIL_MSG (
EMP_ID VARCHAR(25) ,
FOREIGN KEY (EMP_ID) REFERENCES EMPLOYEE(EMP_ID),
EMP_EMAIL VARCHAR(25) ,
HR_EMAIL VARCHAR(25) ,
SEND_DATE DATE,
MESSAGE VARCHAR(300) 
);
-- 
drop table sys_Admin;
drop table hr;
drop table employee;
drop table attendance;
drop table department;
drop table designation;
drop table leave_request;
drop table payroll;
drop table project;
drop table resignation;
drop table works_on;

insert into sys_Admin(admin_id,passowrd) values("a3","$10$96nsk6tBw1VJfCvwlBhm/uVXl29yj6o32IAWpJGzuAkRn7m3h91Dq");
insert into hr(hr_id,passowrd,admin_id) values("h2","123","a2");
insert into designation(designation_id,DESIGNATION_NAME,BASIC_SALARY,ALLOUNCE,admin_id) values("1","xs","1000","1222","a2")
select * from hr
select * from sys_admin
select * from designation
select * from department
select * from employee
select * from attendence
select * from payroll
-- delete  from payroll
select * from leave_request
delete from hr where 1=1
delete  from hr where hr_id="h9"
select * from leave_request
SELECT 21 BETWEEN 10 AND 20;
select E.EMP_ID from employee E,leave_request L where E.EMP_ID='e1' AND L.EMP_ID='e1' AND sysdate() between date_format(L.Start_date, '%Y-%m-%d' ) and date_format(L.end_date, '%Y-%m-%d' ) and L.LEAVE_STATUS='approved'
select * from resignation
delete from employee where EMP_ID='e0'payroll
insert into hr values ('h2','sad','em','$2b$10$7zkA.uwqBwBu8eBhUum38.2rrilyM1vqzlBn6j2HNUvTLgPPb1BFm','sasasas','123','1999-12-12','2005-12-19','asas','13','a2')
insert into employee(EMP_ID,HR_ID,DEPARTMENT_ID,DESIGNATION_ID) values('e10','h3','2','2')
delete from employee where EMP_ID='e0'

-- /     "id": "h0",
-- //     "password": "e651b87edbce7d17bed284c89accf8bb51816c8d",
-- //     "loginAs": "Hr"
-- // }
--  "id": "e1",
--     "password": "76801027305862923d2fecbd9f35f7088c39eda6",
--     "loginAs": "Employee"
insert into leave_request(start_date,end_date,reason,leave_status,EMP_ID,HR_ID) values('2021-12-10','2021-12-11','hello','under review','e18',(select HR_ID from employee where EMP_ID='e0'))
select date_format(sysdate(), '%Y-%m-%d' )
select EMP_ID FROM EMPLOYEE WHERE EMP_ID='e1'
 IF EMP_ID NOT IN(select EMP_ID from resignation where EMP_ID='e1'and approved_status='under review') then 
	insert into resignation(reason,apply_date,approved_status,emp_id) values('i want to leave','2021-12-20','under review','e1')
END IF
insert into resignation(reason,apply_date,approved_status,emp_id,hr_id) values('i want to leave','2021-12-20','under review','e1','h0')



select E.EMP_ID from employee E where E.EMP_ID='e1'and  E.EMP_ID NOT IN (select L.EMP_ID from leave_request L where L.EMP_ID='e1' AND date_format(sysdate(), '%Y-%m-%d' ) between date_format(L.Start_date, '%Y-%m-%d' ) and date_format(L.end_date, '%Y-%m-%d' ) and L.LEAVE_STATUS='approved')and E.EMP_ID NOT IN (select EMP_ID FROM attendence where EMP_ID='e1'AND MARK_DATE=date_format(sysdate(), '%Y-%m-%d' ))
select * from employee where emp_id='e1' AND EMP_ID NOT IN(SELECT EMP_ID FROM RESIGNATION WHERE EMP_ID='e1' and APPROVED_STATUS='approved')