# Blog Info Extractor
# keyword extract => bs4 (text extract) => konlpy
import requests
from bs4 import BeautifulSoup
from flask import Flask, request, jsonify
from konlpy.tag import Okt
from collections import Counter

app = Flask(__name__)
okt = Okt()

def getKeywords(text):
    noun = okt.nouns(text)
    for i, v in enumerate(noun):
        if len(v) < 2:
            noun.pop(i)
    count = Counter(noun)
    noun_list = count.most_common(10)
    return [n for n, c in noun_list]

def getThumbnail():

@app.route('/extract', methods=['POST'])
def extract():
    params = request.get_json()
    response = requests.get(params['postUrl'])
    html = response.text
    soup = BeautifulSoup(html, "html.parser")

    text = ''
    for tag in soup.find_all():
        text += tag.text + ' '

    keywords = getKeywords(text)
    thumbnail = getThumbnail()
    return jsonify({'keywords': keywords, 'thumbnail': thumbnail})


if __name__ == '__main__':
    app.run(debug=True, port=8081)
