# -*- coding:utf8 -*-

import re
import time 
import os
from common.extracter import Extracter
from common.generator import Generator

def gettext():
    import sys

    args = [{}]
    for i in range(len(sys.argv)):

        if i == 0:
            continue
        k,v = sys.argv[i].split("=")
        args.append({ k : v})

    for arg in args:
        if "--source" in arg:
            path = arg["--source"]
        if "--export" in arg:
            export = arg["--export"] 
        if "--lang" in arg:
            lang = arg["--lang"]                       
    
    if not path:
        raise RuntimeError("required argument --source.")
    if not export:
        raise RuntimeError("required argument --export")
    if not lang:
        raise RuntimeError("required argument --lang.")   
     
    langs = Extracter().from_js(path)
    if len(langs) == 0 :
        print("WARN:\tfound 0 words.")
        return
    export_file_path = export
    export_file_name = "%s.js" % lang
    export_full_path = "%s%s" % (export_file_path,export_file_name)
    if not os.path.exists(export_file_path):
        os.makedirs(export_file_path)

    if not os.access(export_full_path, os.F_OK):
        Generator(export_full_path,"a").load(langs).flush()
    else:
        Generator(export_full_path,"u").load(langs).flush()   

def main():
    gettext()

if __name__ == '__main__':
    main()
        
    
