var fs = require("fs");
fs.open('C:\\lol\\英雄联盟\\TCLS\\Client.exe','r', (err, fd) => {
	if(err) {
		console.log(err)
	};
	console.log(fd);	
})