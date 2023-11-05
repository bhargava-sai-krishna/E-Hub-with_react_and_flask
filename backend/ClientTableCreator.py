import MySQLdb as mysql
import s

def createTable(data):
    conn = mysql.connect(
        host=s.host,
        user=s.user,
        passwd=s.password,
        db=s.dbname,
    )
    conn.autocommit(True)
    cur = conn.cursor()
    cur.execute(f"INSERT INTO project (project_id, client_id, project_name, project_log, domain, project_leader) VALUES ('{data['projectId']}', '{data['clientId']}', '{data['projectName']}', '{data['projectLog']}', '{data['domain']}', 'EMP001')")
    cur.execute(f"INSERT INTO project_team (project_id, emp_id, role) VALUES ('{data['projectId']}', 'EMP000', 'NA')")
    cur.close()
    conn.close()
