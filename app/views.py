from app import app
import time

from flask import Flask, render_template, request, url_for

from .cleaner import *

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/edits/<name>')
def drafts(name):
    key = name
    return render_template('drafts.html',
                            key = key)

@app.route('/new/<name>')
def blank(name):
    key = name
    return render_template('blank.html',
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