import s
import psycopg2
import json

def fun():
    conn = psycopg2.connect(host=s.host, dbname=s.dbname, user=s.user, password=s.password, port=s.port)
    conn.autocommit=True
    cur = conn.cursor()
    cur.execute(f"select emp_id,name,email from employee natural join person where employee.emp_id=person.id")
    rows=cur.fetchall()
    column_names = [desc[0] for desc in cur.description]
    dict_rows = [dict(zip(column_names, row)) for row in rows]
    dict_rows = json.dumps(dict_rows)
    return dict_rows