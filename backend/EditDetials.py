import MySQLdb as mysql
import s

def fun(project_id, editedLog):
    conn = mysql.connect(
        host=s.host,
        user=s.user,
        passwd=s.password,
        db=s.dbname,
    )
    conn.autocommit(True)
    cur = conn.cursor()
    cur.execute(f"UPDATE project SET project_log = '{editedLog}' WHERE project_id = '{project_id}'")
    cur.close()
    conn.close()
