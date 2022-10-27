from flask import *
import json,time,os
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
rootpath = "E:/"
app.config["JSON_AS_ASCII"] = True
@app.route("/token/<token>")
def send(token):
    filelist = []
    
    try:
        path = request.args.get("path")
        files = os.listdir(os.path.join(rootpath,path))
    except Exception:
        return {
            "files":[{
                "filename":"",
                "filetype":"folder"
            }]
        }
    for file in files:
        try:
            
            if os.path.isdir(os.path.join(os.path.join(rootpath,path),file)):
                filedir = {
                "filename":file,
                "filetype":"folder"
                }

            else:
                filedir = {
                "filename":file,
                "filetype":"file"
                }
            filelist.append(filedir)
        except NotADirectoryError:
            filedir = {
                "filename":file,
                "filetype":"file"
            }
    if token:
        files = {"files":filelist}
        return files
@app.route("/")
def BDrive():
    return render_template_string(open("index.html",encoding="utf-8").read())
@app.route("/<dir>/<path>/<name>")
def sendfile(dir,path,name):
    return send_file(os.path.join(dir,path,name))
@app.route("/newfile",methods=["POST",])
def newfile():
    name = request.form.get("filename")
    print("got filename "+name)
    return "ok"
if __name__ == "__main__":
    app.run(debug=True)