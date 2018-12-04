# -*- coding:utf8 -*-

import re
import time 
import os
from common.extracter import Extracter
from common.generator import Generator

def gettext():
    import sys

    args = []
    for i in range(len(sys.argv)):
        if i % 2 == 1:
            args.append({ sys.argv[i].strip("-") : None})
        else:
            args[i-1] = sys.argv[i]
    print(args)
    langs = Extracter().from_js(".\source")

    export_file_path = "./export/"
    export_file_name = "zh-cn.js"
    export_full_path = "%s%s" % (export_file_path,export_file_name)
    if not os.path.exists(export_file_path):
        os.makedirs(export_file_path)

    if not os.access(export_full_path, os.F_OK):
        Generator("./export/zh-cn.js","a").load(langs).flush()
    else:
        Generator("./export/zh-cn.js","u").load(langs).flush()   

def main():
    gettext()

if __name__ == '__main__':
    main()
        
    
