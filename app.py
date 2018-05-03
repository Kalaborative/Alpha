from flask import Flask, render_template, request, jsonify
import requests, json

app = Flask(__name__)

carOrHouse = ""
purchaseMethod = ""
priceRange = ""

@app.route("/")
def index():
	return render_template("splashPage.html")

@app.route("/setBasic", methods=["POST"])
def setBasic():
	if request.method == "POST":
		chosen1 = request.json['data']
		global carOrHouse
		carOrHouse = chosen1
		return jsonify({"success": "Yes"})

@app.route("/setMethod", methods=["POST"])
def setMethod():
	if request.method == "POST":
		chosen1 = request.json['data']
		global purchaseMethod
		purchaseMethod = chosen1
		return jsonify({"success": "Yes"})

@app.route("/setPrice", methods=["POST"])
def setPrice():
	if request.method == "POST":
		chosen1 = request.json['data']
		global priceRange
		priceRange = chosen1
		return jsonify({"success": "Yes"})

@app.route("/confirm")
def confirm():
	return render_template('confirm.html', cat=carOrHouse, met=purchaseMethod, ran=priceRange)


@app.route("/wizard1")
def wizard1():
	return render_template('choice1.html')

@app.route('/wizard2')
def wizard2():
	return render_template('choice2.html')

@app.route('/wizard3')
def wizard3():
	return render_template('choice3.html')

@app.route('/wizard4')
def wizard4():
	return render_template('choice4.html')

@app.route('/login')
def login():
	return render_template('login.html')

if __name__ == "__main__":
	app.run(debug=True)