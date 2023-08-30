import s
import psycopg2

def fun(project_id,project_leader,members):
    conn = psycopg2.connect(host=s.host, dbname=s.dbname, user=s.user, password=s.password, port=s.port)
    conn.autocommit=True
    cur = conn.cursor()
    cur.execute(f"update project_team set members=\'{members}\' where project_id=\'{project_id}\'")
    cur.execute(f"update project_team set project_leader=\'{project_leader}\' where project_id=\'{project_id}\'")
    cur.close()
    conn.close()
    