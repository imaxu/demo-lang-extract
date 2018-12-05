# -*- coding:utf8 -*-

# @Name         词汇自动提取工具
# @Desc         从文本文件中提取出所有tag("xx")并将xx输出到language.js中
# @Auth         xuwh
# @Vers         1.0
# @Date         2018-12-5
# @Useage:      python lang_extract.py --source=..\sample\scripts\ --export=..\i18n\ --lang=us-en
# @Dependency:  python3.6+ 

def gettext():

    import re,time,os,sys
    from common.extracter import Extracter
    from common.generator import Generator

    args = []
    for i in range(len(sys.argv)):

        if i == 0:
            continue
        k,v = sys.argv[i].split("=")
        args.append({ k : v})

    # 默认源码目录，多个目录可英文逗号分隔
    watch = ".{sep}source".format(sep=os.path.sep)
    # 默认输出目录
    export = ".{sep}i18n".format(sep=os.path.sep)
    # 要生成的资源名称，默认为zh-cn
    lang = "zh-cn"
    # 查找的函数标记，默认为lang
    tag = "lang"

    for arg in args:
        if "--watch" in arg:

            watch = arg["--watch"]
        if "--export" in arg:
            export = arg["--export"] 
        if "--lang" in arg:
            lang = arg["--lang"]  
        if "--tag" in arg:
            tag = arg["--tag"]                                  
    try:
       
        print("* Extracter is extracting words from %s  " % watch)
        langs = Extracter().read(watch.split(","),tag)
        if len(langs) == 0 :
            print("WARN:\tfound 0 words.")
            return
        print("* We got %s words,preparing to save..." % (len(langs)))
        export_file_path = export if export.endswith(os.path.sep) else "{0}{sep}".format(export,sep=os.path.sep)
        export_file_name = "%s.js" % lang
        export_full_path = "%s%s" % (export_file_path,export_file_name)
        if not os.path.exists(export_file_path):
            os.makedirs(export_file_path)

        if not os.access(export_full_path, os.F_OK):
            Generator(export_full_path,"A",lang).load(langs).flush()
        else:
            Generator(export_full_path,"U",lang).load(langs).flush()   
        print("*...Done! You can find %s.js where %s" % (lang,os.path.abspath(export)))
    except Exception as e:
        print("*...ERROR!!! Some errors raised during the extraction: %s" % str(e))
def main():
    gettext()

if __name__ == '__main__':
    main()
        
    
