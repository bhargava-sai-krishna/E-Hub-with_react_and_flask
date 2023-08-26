import psycopg2
import s

def fun(data):
    conn = psycopg2.connect(host=s.host, dbname=s.dbname, user=s.user, password=s.password, port=s.port)
    conn.autocommit = True
    cur = conn.cursor()
    cur.execute(f"update project set project_leader=\'{data['editedProjectLeader']}\' where project_id=\'{data['project_id']}\'")
    cur.execute(f"update project set project_log=\'{data['editedLog']}\' where project_id=\'{data['project_id']}\'")
    cur.execute(f"update project_team set project_leader=\'{data['editedProjectLeader']}\' where project_id=\'{data['project_id']}\'")
    cur.execute(f"update project_team set members=\'{data['membersString']}\' where project_id=\'{data['project_id']}\'")
    cur.close()
    conn.close()