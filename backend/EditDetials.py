import psycopg2
import s

def fun(project_id,editedLog):
    conn = psycopg2.connect(host=s.host, dbname=s.dbname, user=s.user, password=s.password, port=s.port)
    conn.autocommit = True
    cur = conn.cursor()
    cur.execute(f"update project set project_log=\'{editedLog}\' where project_id=\'{project_id}\'")
    cur.close()
    conn.close()