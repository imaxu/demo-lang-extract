# -*- coding:utf-8 -*-


# @Name         从PO文件转换成language.js
# @Desc         
# @Auth         xuwh
# @Vers         1.0
# @Date         2018-12-6
# @Useage:      python po_to_js.py --po=..\sample\zh.po --export=..\i18n\ --lang=us-en
# @Dependency:  python3.6+ 

from common.po_converter import PoConverter
from common.generator import Generator
import sys
import os

def main():
    
    # po文件路径
    po = "files/default.po"
    # 默认输出目录
    export = ".{sep}i18n".format(sep=os.path.sep)
    # 要生成的资源名称，默认为zh-cn
    lang = "zh-cn"

    # 处理输入参数
    args = []
    for i in range(len(sys.argv)):
        if i == 0:
            continue
        k,v = sys.argv[i].split("=")
        args.append({ k : v})
    for arg in args:
        if "--po" in arg:
            po = arg["--po"]
        if "--export" in arg:
            export = arg["--export"] 
        if "--lang" in arg:
            lang = arg["--lang"]            

    langs = PoConverter(po).dicts()

    export_path = export if export.endswith(os.path.sep) else "{0}{sep}".format(export,sep=os.path.sep)
    export_name = "%s.js" % lang
    export_full_path = "%s%s" % (export_path,export_name)

    if not os.access(export_full_path, os.F_OK):
        Generator(export_full_path,"A",lang).load(langs).flush()
    else:
        Generator(export_full_path,"U",lang).load(langs).flush()     

if __name__ == '__main__':
    main()
    