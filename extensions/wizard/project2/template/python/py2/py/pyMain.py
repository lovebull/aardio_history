#-*-coding:utf-8-*-
import requests
import aardio

def getHtml(url): 
    r = requests.get(url,verify=True)
    r.encoding='utf-8'
    aardio.setText(r.text)
    return r.text 