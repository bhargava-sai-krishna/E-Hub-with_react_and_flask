import psycopg2
import s

def newProjId():
    conn = psycopg2.connect(host=s.host, dbname=s.dbname, user=s.user, password=s.password, port=s.port)
    conn.autocommit = True
    cur = conn.cursor()
    cur.execute(f"SELECT project_id FROM project ORDER BY project_id DESC LIMIT 1")
    rows=cur.fetchone()
    string=rows[0]
    stringnumber=int(string[3:])
    stringnumber=stringnumber+1
    string="PRJ{:03}".format(stringnumber)
    return string