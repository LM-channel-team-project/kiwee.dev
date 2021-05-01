from bs4 import BeautifulSoup
import codecs

f=codecs.open('./velog_test.html', 'r', 'utf-8')
soup= BeautifulSoup(f.read(), "html.parser")

thumbnail_selector = [
  'figure.imageblock img',
  'figure img',
  '.se_image .se_mediaImage'
]

thumbnail = soup.find('img', alt='post-thumbnail')['src']
print(thumbnail)