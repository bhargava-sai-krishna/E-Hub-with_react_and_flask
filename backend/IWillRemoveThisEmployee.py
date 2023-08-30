import s
import psycopg2

def fun(emp_id,name,email):
    conn=psycopg2.connect(host=s.host, dbname=s.dbname, user=s.user, password=s.password, port=s.port)
    conn.autocommit=True
    cur=conn.cursor()
    cur.execute(f"UPDATE project_team SET members = REPLACE(members, \'{emp_id}\', \'EMP000\') WHERE members LIKE \'%{emp_id}%\';")
    cur.execute(f"update project_team set project_leader=\'EMP000\' where project_leader like \'{emp_id}\'")
    cur.execute(f"delete from login where id=\'{emp_id}\'")
    cur.execute(f"delete from employee where emp_id=\'{emp_id}\'")
    cur.execute(f"delete from person where id=\'{emp_id}\'")
    cur.execute(f"update project set project_leader=\'EMP000\' where project_leader=\'{emp_id}\'")
    cur.close()
    conn.close()