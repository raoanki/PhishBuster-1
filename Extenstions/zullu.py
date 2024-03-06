# app.py
from flask import Flask, render_template, request, jsonify
import joblib

app = Flask(__name__)

# Load the machine learning model using joblib
phish_model_ls = joblib.load("/home/rakessh/Documents/new testing model/templates1/phishing1.pkl")

@app.route("/")
def home():
    return render_template("home1.html")

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        feature = data['feature']

        X_predict = [str(feature)]
        y_Predict = phish_model_ls.predict(X_predict)

        result = "☠️This is a Phishing Site ⚠️" if y_Predict == "bad" else "This is not a Phishing Site 😁"

        return jsonify({'result': result})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == "__main__":
    app.run(port=8000, debug=True)

