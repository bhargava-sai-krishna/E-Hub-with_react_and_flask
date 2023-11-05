import MySQLdb as mysql
import json
import s

def getEmployeeNames():
    conn = mysql.connect(
        host=s.host,
        user=s.user,
        passwd=s.password,
        db=s.dbname,
    )
    conn.autocommit(True)
    cur = conn.cursor()
    cur.execute("SELECT emp_id FROM employee")
    dict_row = cur.fetchall()
    cur.close()
    conn.close()
    dict_row = json.dumps(dict_row)
    return dict_row
