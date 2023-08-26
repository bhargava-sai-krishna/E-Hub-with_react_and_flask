import psycopg2
import s
import json

def fun(id):
    conn = psycopg2.connect(host=s.host, dbname=s.dbname, user=s.user, password=s.password, port=s.port)
    conn.autocommit = True
    cur = conn.cursor()
    cur.execute(f"SELECT project.project_id, project.client_id, project.project_name, project.project_log, project.domain, project_team.project_leader,project_team.members FROM project LEFT JOIN project_team ON project.project_id = project_team.project_id where project.project_leader=\'{id}\'")
    rows=cur.fetchall()
    column_names = [desc[0] for desc in cur.description]
    dict_rows = [dict(zip(column_names, row)) for row in rows]
    dict_rows = json.dumps(dict_rows)
    return dict_rows