# -*- coding:utf-8 -*-

import os,re

class Extracter(object):

    def __init__(self):
        pass

    def read(self,watch_dirs=[],tag="lang"):
        """从目录列表中提取词组

        """
        langs = []
        file_types = [".js",".cshtml",".html",".htm",".vue"]
        for d in watch_dirs:
            for root, dirs, files in os.walk(d, topdown=False):
                for name in files:
                    n,ext = os.path.splitext(name)
                    if ext not in file_types:
                        continue
                    file = os.path.join(root, name)
                    f = open(file,"r",encoding='UTF-8')
                    for index,line in enumerate(f):
                        line = line.strip()
                        regex = r"%s\([\"\'](.*?)[\"\']\)" % tag
                        pattern = re.compile(regex, re.I)
                        match_result = pattern.findall(line)
                        if len(match_result) > 0:
                            #langs.append("// file#%s,row#%s" % (name,index+1))
                            langs = langs + match_result
        print("total:%s" % len(langs))    
        final_langs = list(map(lambda x:x.strip("'").strip("\""),set(langs)))
        final_langs.sort(key=langs.index)
        print("final(except repeat):%s" % len(final_langs))
        return final_langs