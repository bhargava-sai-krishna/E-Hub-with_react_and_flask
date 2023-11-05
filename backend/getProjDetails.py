import MySQLdb as mysql
import json
import s

def getProjDets(id):
    conn = mysql.connect(
        host=s.host,
        user=s.user,
        passwd=s.password,
        db=s.dbname,
    )
    conn.autocommit(True)
    cur = conn.cursor()
    cur.execute(f"SELECT * FROM project WHERE client_id = '{id}'")
    rows = cur.fetchall()
    column_names = [desc[0] for desc in cur.description]
    dict_rows = [dict(zip(column_names, row)) for row in rows]
    dict_rows = json.dumps(dict_rows)
    return dict_rows
