import psycopg2
import s

def fun(name, email, password, join_date, experience):
    conn = psycopg2.connect(host=s.host, dbname=s.dbname, user=s.user, password=s.password, port=s.port)
    cur = conn.cursor()
    cur.execute('SELECT MAX(emp_id) FROM employee')
    result = cur.fetchone()[0]
    if result is None:
        next_num = 1
    else:
        next_num = int(result[3:]) + 1
    emp_id = 'EMP' + str(next_num).zfill(3)
    cur.execute(f"INSERT INTO person (id, name, email) VALUES (\'{emp_id}\', \'{name}\', \'{email}\')")
    cur.execute(f"INSERT INTO employee (emp_id, experience, emp_join_date) VALUES (\'{emp_id}\',\'{experience}\',\'{join_date}\')")
    cur.execute(f"INSERT INTO login (id, username, password, email) VALUES (\'{emp_id}\',\'{name}\' ,\'{password}\' ,\'{email}\' )")
    
    conn.commit()
    cur.close()
    conn.close()
