from flask import Flask, jsonify
from flask_cors import CORS
from graph_z import Vertex, Graph

app = Flask(__name__)
cors = CORS(app, origins='http://localhost:5173')


@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST'
    return response


g = Graph([Vertex(7, 343), Vertex(97, 96)])
g.add_vertex(Vertex(16, 288213))
g.add_vertex(Vertex(23, 0))
g.add_path(7, 97, 5)
g.add_path(7, 23, 9)
values = g.get_detailed_dataframe()['Values'].to_list()


@app.route("/getVertexIDs")
def getVertexIDs():
    response = jsonify(g.ids)
    return response


@app.route("/getVertexValues")
def getVertexValues():
    response = jsonify(values)
    return response


@app.route("/getVertexPaths")
def getVertexPaths():
    response = jsonify(g.all_paths)
    return response
