from solver import Solver
from flask import jsonify, Flask, request
from flask_cors import *
from flask import Flask, render_template
import json
import sys
sys.path.append('./')

app = Flask(__name__, static_url_path='')
CORS(app, supports_credentials=True)
solv = Solver()


@app.route("/", methods=["GET"])
def index():
    return app.send_static_file('index.html')


@app.route("/face_img", methods=["GET", "POST"])
def receive_img():
    if request.method == "POST":
        data = json.loads(request.get_data().decode('utf-8'))
        width = data['width']
        height = data['height']
        img_arr = list(data['data'].values())
        gray_img_array = solv.one_dim_arr_to_img(img_arr, width, height)
        res = jsonify(
            {"succ": True, "data": solv.predict(gray_img_array).tolist()})
        return res
    else:
        return jsonify({"succ": False, "msg": "not support GET"})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

    # app.run(host='0.0.0.0',port=8080,debug=True,ssl_context=('*.crt','*.key'))
