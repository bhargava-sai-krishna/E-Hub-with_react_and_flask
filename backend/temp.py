import psycopg2
import json

conn = psycopg2.connect(host="localhost", dbname="E-Hub", user="postgres", password="sbskln2412S", port=5432)
conn.autocommit = True
cur = conn.cursor()
cur.execute(f"select * from project where client_id='CLI001'")
rows=cur.fetchall()
print(rows)
rows=json.dumps(rows)
print(rows)
print(type(rows))