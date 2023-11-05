import MySQLdb as mysql
import s

def fun(data):
    conn = mysql.connect(
        host=s.host,
        user=s.user,
        passwd=s.password,
        db=s.dbname,
    )
    conn.autocommit(True)
    cur = conn.cursor()
    cur.execute(f"UPDATE project SET project_leader = '{data['editedProjectLeader']}' WHERE project_id = '{data['project_id']}'")
    cur.execute(f"UPDATE project SET project_log = '{data['editedLog']}' WHERE project_id = '{data['project_id']}'")
    cur.execute(f"UPDATE project_team SET project_leader = '{data['editedProjectLeader']}' WHERE project_id = '{data['project_id']}'")
    cur.execute(f"UPDATE project_team SET members = '{data['membersString']}' WHERE project_id = '{data['project_id']}'")
    cur.close()
    conn.close()
