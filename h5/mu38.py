import base64
import sys,time
import hashlib
import  re, requests, json
from urllib import parse
from Crypto.Cipher import AES
 
md5 = lambda value: hashlib.md5(value.encode('utf-8')).hexdigest()
 
 
 
def page_parse(video_url):
    url = 'https://jx.xihujx.com/index.php?url=' + video_url
    headers = {
        "Host": "jx.xihujx.com",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "Referer": "https://yparse.jn1.cc/",
        "Accept-Language": "zh-CN,zh;q=0.9"
    }
    res = requests.get(url=url, headers=headers)
    r = re.compile('eval\((.*?)\);')
    data = r.findall(res.text)
    key = eval(data[0])[-6:-2]
    encode_data = eval(data[1])[16:-4]
    return key, encode_data
 
 
def api_php(other, key, url_, time):
    url = 'https://jx.xihujx.com/api.php'
    headers = {
        "Host": "jx.xihujx.com",
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36",
        "Origin": "https://jx.xihujx.com",
        "Accept-Language": "zh-CN,zh;q=0.9"
    }
    data = f'referer={parse.quote_plus(other)}&time={time}&key={parse.quote_plus(key)}&url={parse.quote_plus(url_)}&type=0&up=0'
    res = requests.post(url=url, headers=headers, data=data)
    sign = json.loads(res.text)["sign"]
    return sign
 
def get_sign(text):
    key = bytes.fromhex(md5(text).encode().hex())
    iv = 'ren163com5201314'.encode()
    cryptor = AES.new(key=key, mode=AES.MODE_CBC, iv=iv)
    entext = cryptor.encrypt(text.encode())
    b64entext = base64.b64encode(entext).decode()
    return b64entext
 
def getToken(key):
    Nowtime = int(time.time())  # 获取当前时间戳
    time01 = Nowtime - Nowtime % 60
    return md5(md5(str(time01)+key))
 
def str_decode(encode_data, token):
    a = base64.b64decode(encode_data)
    a = list(a)
    d = len(token)
    e = ''
    for i in range(len(a)):
        k = i % d
        e += chr(a[i] ^ ord(token[k]))
    result = base64.b64decode(e).decode()
    return result
 
 
def xihujx_M3u8Url(video_url):
    key, encode_data = page_parse(video_url)
 
    token = getToken(key)
 
    result = str_decode(encode_data, token)
 
    r = re.compile('strdecode\("(.*?)"\)')
    l = r.findall(result)
    result = str_decode(l[1], token)
 
 
    r = re.compile("other : '(.*?)'")
    other = r.findall(result)[0]
    r = re.compile("key : sign\('(.*?)'\)")
    key = r.findall(result)[0]
    r = re.compile("url : '(.*?)'")
    url = r.findall(result)[0]
    r = re.compile("time : '(.*?)'")
    time = r.findall(result)[0]
 
    key = get_sign(key)
 
 
    url = str_decode(url, token)
    Sign = api_php(other, key, url, time)
 
    result = str_decode(Sign, token)
 
 
    info = json.loads(result)
    title = info.get("title")
    playurl = info["url"]
    playurl = str_decode(playurl, token)
    if not playurl.startswith("http"):
        playurl = "https:" + playurl
    info = info.get("info")
    if info:
        video = info[0]["video"]
        videos = []
        for v in video:
            v = v.split("$")
            videos.append({v[0]: v[1]})
        for video in videos:
            for k, v in video.items():
                print(f"{title}-{k}, PlayUrl: {v}")
    return playurl
 
 
if __name__ == '__main__':
 
    video_url = 'https://v.qq.com/x/cover/5y07fkhxzj48wcj.html'
    # video_url = 'https://www.iqiyi.com/v_1zot3lvetdk.html'
    # video_url = 'https://v.youku.com/v_show/id_XNTg1NTEzMTI4OA==.html'
    print("云解析成功：", xihujx_M3u8Url(video_url))