import MySQLdb as mysql
import s

def newProjId():
    conn = mysql.connect(
        host=s.host,
        user=s.user,
        passwd=s.password,
        db=s.dbname,
    )
    conn.autocommit(True)
    cur = conn.cursor()
    cur.execute("SELECT project_id FROM project ORDER BY project_id DESC LIMIT 1")
    rows = cur.fetchone()
    string = rows[0]
    stringnumber = int(string[3:])
    stringnumber = stringnumber + 1
    string = "PRJ{:03}".format(stringnumber)
    return string
