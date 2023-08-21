import psycopg2
import json
import s

def getEmployeeNames():
    conn = psycopg2.connect(host=s.host, dbname=s.dbname, user=s.user, password=s.password, port=s.port)
    conn.autocommit = True
    cur = conn.cursor()
    cur.execute(f"select emp_id from employee")
    dict_row=cur.fetchall()
    cur.close()
    conn.close()
    dict_row = json.dumps(dict_row)
    return dict_row


