from flask import Flask, render_template, request
from ticketmaster_data import get_data_frame_from_ticketmaster
from seatgeek_data import get_data_frame_from_seatgeek
from stubhub_data import get_data_frame_from_stubhub
import requests
import pandas as pd
from flask import jsonify
import json
import pytz
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    return render_template("search.html")

@app.route("/search")
# @CORS(app, resources={r"/search": {"origins": "http://localhost:3000"}})
def search():
    query = request.args.get("query")
    try:
        result_seatgeek = get_data_frame_from_seatgeek(query)
        result_ticketmaster = get_data_frame_from_ticketmaster(query)
        result_stubhub = get_data_frame_from_stubhub(query)

        #Parse the dataframes to list of dictionaries
        json_result_seatgeek = result_seatgeek.to_dict(orient='records')
        json_result_ticketmaster = result_ticketmaster.to_dict(orient='records')
        json_result_stubhub = result_stubhub.to_dict(orient='records')

        # loop through the list and convert timezone to timezone name
        for item in json_result_stubhub:
            tzname = item['timeZone'].tzname(None)
            item['timeZone'] = tzname

        return jsonify(dict(json_result_seatgeek=json_result_seatgeek, json_result_ticketmaster=json_result_ticketmaster, json_result_stubhub=json_result_stubhub))
    except:
        return jsonify(dict(json_result_seatgeek=list(), json_result_ticketmaster=list(), json_result_stubhub=list()))
    # return render_template("comparison_table.html", template1=render_template("results.html", result=result_ticketmaster.to_dict(orient='records'), tablename='seatgeek'), template2=render_template("results.html", result=result_seatgeek.to_dict(orient='records'), tablename="ticketmaster"),template3=render_template("results.html", result=result_stubhub.to_dict(orient='records'), tablename="stubhub"))

if __name__ == "__main__":
    app.run(debug=True)
