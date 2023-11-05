import MySQLdb as mysql
import s

def fun(emp_id, name, email):
    conn = mysql.connect(
        host=s.host,
        user=s.user,
        passwd=s.password,
        db=s.dbname,
    )
    conn.autocommit(True)
    cur = conn.cursor()
    cur.execute(f"UPDATE project_team SET members = REPLACE(members, '{emp_id}', 'EMP000') WHERE members LIKE '%{emp_id}%';")
    cur.execute(f"UPDATE project_team SET project_leader = 'EMP000' WHERE project_leader = '{emp_id}'")
    cur.execute(f"DELETE FROM login WHERE id = '{emp_id}'")
    cur.execute(f"DELETE FROM employee WHERE emp_id = '{emp_id}'")
    cur.execute(f"DELETE FROM person WHERE id = '{emp_id}'")
    cur.execute(f"UPDATE project SET project_leader = 'EMP000' WHERE project_leader = '{emp_id}'")
    cur.close()
    conn.close()
