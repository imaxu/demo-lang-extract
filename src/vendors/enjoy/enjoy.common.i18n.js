function lang(key){

	if(_dict != undefined 
		&& "lang_name" in _dict 
		&& key in _dict 
		&& (typeof _dict[key] =='string') && _dict[key].constructor == String
		&& _dict[key] != ""){

		return _dict[key];
	}
	else{
		return key;
	}


};