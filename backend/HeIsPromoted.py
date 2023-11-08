import MySQLdb as mysql
import s

def fun(emp_id):
    conn = mysql.connect(
        host=s.host,
        user=s.user,
        passwd=s.password,
        db=s.dbname,
    )
    conn.autocommit(True)
    cur = conn.cursor()
    cur.execute("UPDATE employee SET role='Leader' WHERE emp_id=%s", (emp_id,))
    cur.close()
    conn.close()