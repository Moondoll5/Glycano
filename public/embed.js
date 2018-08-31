function getArgs(){
	var args = prompt("Enter CarbBuilder arguments");
	var spawn = require('cross-spawn').spawn;
	spawn('C:/Users/naziedoll/Documents/Honours/FirebaseWeb/public/files/jsmol/CBv2.1.25/CarbBuilder2.exe', args.split(" "));

	//window.open('file:///C:/Users/naziedoll/Documents/Honours/ThesisCode/Jmol-14.29.17-binary/jmol-14.29.17/jsmol/cb.bat').execute();

	//Runtime.getRuntime().exec("C:/Users/naziedoll/Documents/Honours/FirebaseWeb/public/files/jsmol/CBv2.1.25/CarbBuilder2.exe");
}

