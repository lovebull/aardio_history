#-*-coding:utf-8-*-
import requests
import aardio

def getHtml(url): 
    res = requests.get("https://bbs.aardio.com/static/image/common/aardio.png",verify=True)
    aardio.setImage(res.content)
    
    r = requests.get(url,verify=True)
    r.encoding='utf-8'
    return r.text 