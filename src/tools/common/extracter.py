# -*- coding:utf-8 -*-

import os,re

class Extracter(object):

    def __init__(self):
        pass

    def from_js(self,path,tag="_"):
        langs = []
        for root, dirs, files in os.walk(path, topdown=False):
            for name in files:
                if not str.endswith(name,".js"):
                    continue
                file = os.path.join(root, name)
                f = open(file,"r",encoding='UTF-8')
                for line in f.readlines():    
                    line = line.strip()
                    regex = r"%s\((.*?)\)" % tag
                    pattern = re.compile(regex, re.I)
                    match_result = pattern.findall(line)
                    if len(match_result) > 0:
                        langs = langs + match_result      
        langs = list(map(lambda x:x.strip("'").strip("\""),set(langs)))
        return langs