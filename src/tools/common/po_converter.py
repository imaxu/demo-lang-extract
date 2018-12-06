# -*- coding:utf-8 -*-

class PoConverter(object):

    def __init__(self,pofile):
        import os
        if not os.path.exists(pofile):
            raise RuntimeError("file not exists:%s" % pofile)
        self.file = open(pofile,"r",encoding='UTF-8')
    
    def __find_all__(self,s):
        import re
        regex = r"\"(.*?)\""
        pattern = re.compile(regex, re.I)
        match = pattern.findall(s)
        return match

    def dicts(self):

        body_start = False
        msgid_mode = False
        msgstr_mode = False
        key = []
        val = []
        dicts = []
        for index,line in enumerate(self.file):
            if line.startswith("#"):
                msgid_mode = False
                msgstr_mode = False
                body_start = True
                continue

            if body_start:

                if line.startswith("\n") and msgstr_mode == True:
                    dict_item = { "".join(key):"".join(val) }
                    dicts.append(dict_item)
                    msgid_mode = False
                    msgstr_mode = False                    
                    key = []
                    val = []
                    continue
                if line.startswith("\""):
                    if msgid_mode:
                        key = key + self.__find_all__(line)
                    if msgstr_mode:
                        val = val + self.__find_all__(line)
                    continue
                if line.startswith("msgid"):
                    # 提取母语字段
                    msgid_mode = True
                    key = key + self.__find_all__(line)
                    continue
                if line.startswith("msgstr"):
                    msgid_mode = False
                    msgstr_mode = True
                    # 提取目标翻译字段
                    val = val + self.__find_all__(line)
                    continue
        return dicts

if __name__ == "__main__":
    print(PoConverter("..\..\sample\zh.po").dicts())