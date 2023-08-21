import psycopg2
import s

def createTable(data):
    conn = psycopg2.connect(host=s.host, dbname=s.dbname, user=s.user, password=s.password, port=s.port)
    conn.autocommit = True
    cur = conn.cursor()
    cur.execute(f"insert into project values(\'{data['projectId']}\',\'{data['clientId']}\',\'{data['projectName']}\',\'{data['projectLog']}\',\'{data['domain']}\',\'{data['projectLeader']}\')")
    cur.execute(f"insert into project_team values(\'{data['projectId']}\',\'{data['projectLeader']}\',\'{data['teammates']}\')")
    cur.close()
    conn.close()