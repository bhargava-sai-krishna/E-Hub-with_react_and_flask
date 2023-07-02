from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import dataSignup

app = Flask(__name__)
CORS(app)

@app.route('/signin', methods=['GET','POST'])
def signin():
    data=request.get_json()
    userId = data['userId']
    password = data['password']
    conn = psycopg2.connect(host="localhost", dbname="E-Hub", user="postgres", password="sbskln2412S", port=5432)
    cur = conn.cursor()
    cur.execute("select * from Login")
    rows= cur.fetchall()
    flag="False"
    for row in rows:
        if((userId==row[0] and password==row[2])or(userId==row[3] and password==row[2])):
            flag=row[0]
    cur.close()
    conn.close()
    return flag

@app.route('/signup', methods=['GET','POST'])
def signup():
    creds=request.get_json()
    userName = creds['userName']
    password = creds['password']
    email=creds['email']
    company=creds['company']
    dataSignup.addClient(userName,password,email,company)
    return 'done'


if __name__ == "__main__":
    app.run(debug=True)
