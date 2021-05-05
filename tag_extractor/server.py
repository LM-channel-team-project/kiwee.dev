# Blog Info Extractor
# keyword extract => bs4 (text extract) => konlpy
import requests
import json
from bs4 import BeautifulSoup
from flask import Flask, request, jsonify
from konlpy.tag import Okt
from collections import Counter

app = Flask(__name__)
okt = Okt()

keywords = []
with open('./keywords.json') as f:
  for key in json.load(f)['keywords']:
      keywords.append(key)

def getKeywords(text):
    noun = okt.nouns(text)
    for i, v in enumerate(noun):
        if len(v) < 2:
            noun.pop(i)

    count = Counter(noun)
    noun_list = count.most_common(50)
    tags = []
    for noun, count in noun_list:
        print(noun)
        if noun in keywords:
            tags.append(noun)
    print(tags)
    return tags

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
    # thumbnail = getThumbnail()
    thumbnail = ''
    return jsonify({'keywords': keywords, 'thumbnail': ''})


if __name__ == '__main__':
    app.run(debug=True, port=8081)
