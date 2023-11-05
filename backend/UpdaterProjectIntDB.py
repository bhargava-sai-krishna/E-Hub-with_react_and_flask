import MySQLdb as mysql
import s

def fun(project_id, project_leader, members):
    conn = mysql.connect(
        host=s.host,
        user=s.user,
        passwd=s.password,
        db=s.dbname,
    )
    conn.autocommit(True)
    cur = conn.cursor()
    cur.execute(f"UPDATE project_team SET members = '{members}' WHERE project_id = '{project_id}'")
    cur.execute(f"UPDATE project_team SET project_leader = '{project_leader}' WHERE project_id = '{project_id}'")
    cur.close()
    conn.close()
