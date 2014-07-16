import os, random, sys, time
from flask import Flask, render_template, request, redirect, url_for
# from app import app
import cleaner

# reload(sys)
# sys.setdefaultencoding("utf-8")

app = Flask(__name__)
app.secret_key = 'F34TF$($e34D'


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/new')
def blank():
    return render_template('blank.html')


@app.route('/edits/<name>')
def drafts(name):
    key = name
    return render_template('drafts.html',
                            key = key)


@app.route('/results', methods=['GET', 'POST'])
def results():
    if request.method == 'GET':
        return render_template('results.html')
    elif request.method == 'POST':
        time.sleep(3)
        text = ""
        text = request.form['text']
        # print text
        # f = open('input.txt', 'w')
        # f.write(text)
        # f.close()

        output = cleaner.clean(text)
        # print output

        return render_template('results.html', 
                                original = text,
                                clean = output)


if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, host='0.0.0.0', port=port)



