## E-Hub-with_react_and_flask

## Sumary:
E-hub is a software company that provides various types of software solutions to clients across India. Design a system that enables the end user to view, add, edit or delete employee details of the organisation. The user can retrieve employee details just by entering their employee ID. Similarly, maintain their client details so that the end user can view, add, edit or delete client details. Also they can generate reports on their deliverables, employee and client details.<br>The application we made is primarily aimed towards the company admin and the various clients working with the company.

-----

The hosting is now totally complete link for website https://e-hub-with-react-and-flask.vercel.app/

-----

## Please consider watching this PPT for better understanding

[E-Hub.website.pptx](https://github.com/bhargava-sai-krishna/E-Hub-with_react_and_flask/files/13634861/E-Hub.website.pptx)

-----

## please consider watching this video for further understanding

https://drive.google.com/file/d/152yvvYL-PvYGeLL2wNvOQPDDqae4Y1HT/view?usp=sharing

-----

for working of website create a s.py file with the parameters host, dbname ,user ,password
```python
host=""
dbname=""
user=""
password=""
```

-----

# Temporary client:
id: CLI001<br>
password: something

# Temporary Admin:
id: ADM001<br>
password: 12345678

# Temporary Employee:
id: EMP001<br>
password: qwerty

-----

> #### <b>Note</b>: After signup of a client the client will not recieve a mail regarding we are planning to add it on the next update
## Next update details:
1) client will recieve a mail on signup
2) Change the password or forgot password button
3) Enhancing data security within the database through the application of the Caesar cipher.

-----

## Python package requirments
```python
pip install flask
```
```python
pip install psycopg2
```

```python
pip install -U flask-cors
```

-----

## Data Base setup
```sql
create table login(
    id varchar(20),
    username varchar(30),
    password varchar(30),
    email varchar(50)
    primary key(id)
);

cerate table person(
    id varchar(20),
    name varchar(40),
    email varchar(50),
    primary key(id)
);

create table client(
    client_id varchar(20),
    company varchar(30),
    primary key(client_id)
);

create table employee(
    emp_id varchar(20),
    experience int,
    emp_join_date date,
    role varchar(30)
    primary key(emp_id)
);

create table project(
    project_id varchar(20),
    client_id varchar(20),
    project_name varchar(20),
    project_log varchar(1000),
    domain varchar(20),
    project_leader varchar(20),
    primary key(project_id)
);

create table project_team(
  project_id varchar(20),
  project_leader varchar(20),
  members varchar(500)
);
```
