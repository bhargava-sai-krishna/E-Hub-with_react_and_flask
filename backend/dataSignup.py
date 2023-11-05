import MySQLdb as mysql
import s

def addClient(userName, password, email, company):
    conn = mysql.connect(
        host=s.host,
        user=s.user,
        passwd=s.password,
        db=s.dbname,
    )
    conn.autocommit(True)
    cur = conn.cursor()
    cur.execute('SELECT * FROM client')
    rows = cur.fetchall()
    num = 0
    for row in rows:
        temp = row[0]
        temp = int(temp[3:])
        if num < temp:
            num = temp + 1
    num = str(num)
    while len(num) < 3:
        num = '0' + num
    id = 'CLI' + num
    cur.execute(f"INSERT INTO person VALUES ('{id}', '{userName}', '{email}')")
    cur.execute(f"INSERT INTO login VALUES ('{id}', '{userName}', '{password}', '{email}')")
    cur.execute(f"INSERT INTO client VALUES ('{id}', '{company}', 0)")
    cur.close()
    conn.close()
