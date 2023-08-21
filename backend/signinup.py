from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import dataSignup
import getProjDetails
import getProjDetailsAdmin
import getEmployeeListfile
import getNewProjid
import TableCreator
import s
import ClientTableCreator

app = Flask(__name__)
CORS(app)

@app.route('/signin', methods=['GET','POST'])
def signin():
    data=request.get_json()
    userId = data['userId']
    password = data['password']
    conn = psycopg2.connect(host=s.host, dbname=s.dbname, user=s.user, password=s.password, port=s.port)
    cur = conn.cursor()
    cur.execute("select * from Login")
    rows= cur.fetchall()
    flag="False"
    name=""
    for row in rows:
        if((userId==row[0] and password==row[2])or(userId==row[3] and password==row[2])):
            flag=row[0]
            name=row[1]
    cur.close()
    conn.close()
    data={
        "flag" : flag,
        "name" : name,
    }
    return data

@app.route('/signup', methods=['GET','POST'])
def signup():
    creds=request.get_json()
    userName = creds['userName']
    password = creds['password']
    email=creds['email']
    company=creds['company']
    dataSignup.addClient(userName,password,email,company)
    return 'done'

@app.route('/getProject', methods=['GET','POST'])
def getProject():
  idJSON = request.get_json()
  id=idJSON['userId']
  data = getProjDetails.getProjDets(id)
  return jsonify(data)


@app.route('/getProjectForAdmin',methods=['GET','POST'])
def GetProjectAdmin():
    data=getProjDetailsAdmin.getProjDetsAdmin()
    return jsonify(data)


@app.route('/getEmployeeListDropDown',methods=['GET','POST'])
def getEmployeeList():
    data=getEmployeeListfile.getEmployeeNames()
    return jsonify(data)

@app.route('/getNewProjectId',methods=['GET','POST'])
def idGenerator():
    data=getNewProjid.newProjId()
    return data

@app.route('/AssignProject',methods=["GET","POST"])
def assignProject():
    Projdata=request.get_json()
    TableCreator.createTable(Projdata)
    return 'done'

@app.route('/AssignProjectByClient',methods=["GET","POST"])
def assignProjectByClient():
    projData=request.get_json()
    ClientTableCreator.createTable(projData)
    return 'done'


if __name__ == "__main__":
    app.run(debug=True)
