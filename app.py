from flask import Flask, render_template
app = Flask(__name__)


@app.route('/payload')
def payload():
    return render_template('payload.html')


if __name__ == '__main__':
    app.run(debug=True, port=5000)
