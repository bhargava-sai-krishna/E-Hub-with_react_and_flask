import psycopg2
import s
import json

def fun():
    conn = psycopg2.connect(host=s.host, dbname=s.dbname, user=s.user, password=s.password, port=s.port)
    conn.autocommit = True
    cur = conn.cursor()
    cur.execute(f"SELECT client.client_id, client.company,person.name,person.email,COUNT(DISTINCT project.project_id) AS number_of_projects FROM client LEFT JOIN person ON client.client_id = person.id LEFT JOIN project ON client.client_id = project.client_id GROUP BY client.client_id, client.company, person.name, person.email ORDER BY client.company;")
    rows=cur.fetchall()
    column_names = [desc[0] for desc in cur.description]
    dict_rows = [dict(zip(column_names, row)) for row in rows]
    dict_rows = json.dumps(dict_rows)
    return dict_rows