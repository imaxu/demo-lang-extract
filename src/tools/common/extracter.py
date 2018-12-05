# -*- coding:utf-8 -*-

import os,re

class Extracter(object):

    def __init__(self):
        pass

    def read(self,watch_dirs=[],tag="lang"):
        """从目录列表中提取词组

        """
        langs = []
        file_types = [".js",".cshtml",".html","htm",".vue"]
        for d in watch_dirs:
            for root, dirs, files in os.walk(d, topdown=False):
                for name in files:
                    n,ext = os.path.splitext(name)
                    if ext not in file_types:
                        continue
                    file = os.path.join(root, name)
                    f = open(file,"r",encoding='UTF-8')
                    for line in f.readlines():    
                        line = line.strip()
                        regex = r"%s\([\"\'](.*?)[\"\']\)" % tag
                        pattern = re.compile(regex, re.I)
                        match_result = pattern.findall(line)
                        if len(match_result) > 0:
                            langs = langs + match_result  
        print("total:%s" % len(langs))    
        langs = list(map(lambda x:x.strip("'").strip("\""),set(langs)))
        print("final(no repeat):%s" % len(langs))   
        return langs