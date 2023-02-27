var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem101' //rename to the name of your port
var dataIn; //some data coming in over serial!


function setup() {
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);       // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
 
  serial.list();                      // list the serial ports
  serial.open(portName);              // open a serial port
  createCanvas(1200, 800);
  background(0x08, 0x16, 0x40);
}
 
// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
   print(i + " " + portList[i]);
 }
}

function serverConnected() {
  print('connected to server.');
}
 
function portOpen() {
  print('the serial port opened.')
}
 
function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  print('The serial port closed.');
}

function serialEvent() {
  if (serial.available()) {
  	dataIn = Number(serial.readLine());
        //console.log(datain);
  } 
}

function draw() {
  if (dataIn != 0 && dataIn != 1) {
    if (dataIn >= 30 && dataIn <= 50) {
      background(0);
    } else if (dataIn >= 50 && dataIn <= 80) {
      background("#00008B");
    } else if (dataIn >= 80 && dataIn <= 120) {
      background("#0000FF");
    } else {
      background("#ADD8E6 ");
    }
  }

  if (dataIn == 1) {
      text("button is pressed", 30,30);
  } else {
      text("", 30,30);
  }

  function mouseClicked() {
    serial.write('120');
  }
}
