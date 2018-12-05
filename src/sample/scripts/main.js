(function(win){

	// 普通文字
	window.document.writeln(_("疯一样的自由<br />"));
	window.document.writeln(_("新增文字重复内容"));
	window.document.writeln(_("新增文字重复内容"));
	window.document.writeln(_("新增文字内容2"));

	//变量
	var text = "这是变量文字";
	window.document.writeln(_(text));
})(window);