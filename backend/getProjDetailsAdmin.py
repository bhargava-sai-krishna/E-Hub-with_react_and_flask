import MySQLdb as mysql
import json
import s

def getProjDetsAdmin():
    conn = mysql.connect(
        host=s.host,
        user=s.user,
        passwd=s.password,
        db=s.dbname,
    )
    conn.autocommit(True)
    cur = conn.cursor()
    cur.execute("SELECT project.project_id, project.client_id, project.project_name, project.project_log, project.domain, project_team.project_leader, project_team.members FROM project LEFT JOIN project_team ON project.project_id = project_team.project_id;")
    rows = cur.fetchall()
    column_names = [desc[0] for desc in cur.description]
    dict_rows = [dict(zip(column_names, row)) for row in rows]
    dict_rows = json.dumps(dict_rows)
    return dict_rows
