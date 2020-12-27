#include <AFMotor.h>
 
 
AF_Stepper motor(48, 2);

// Logical pins
int cupSensor = 14; // Input pin from the cup detector.
int conveyorSensor = 15; // Input pin from the box detector.
int calibration = 16; // Input pin from the lid calibrator sensor.
int conveyorPin = 17; // Output pin.

// Variables
int boxCount = 24; // Default cups per box is 24.
int totalCups = 0; // The total number of cups manufactured throughout the day.
int stepCount = 43; // Number of steps needed to achieve a quarter rotation.
int motorSpeed = 500; // Speed of the motor.
auto power = SINGLE; // Amount of power for the stepper motor. SINGLE or DOUBLE.
bool cupDetected = false; // Used to determine if a cup has passed by.
bool runConveyor = false; // Used to begin running the conveyor.
bool boxDetected = false; // Used to check if there is a box obstructing the sensor on the conveyor.
bool stopConveyor = false; // Used to stop the conveyor.
bool conveyorIncremented = false; // Used to check if a new box has already been provided.

void setup() { 
  // Serial communication with main controller.
  Serial.begin(9600);

  Serial.println("Waiting for confirmation to start...");
  // Wait for the main controller to start.
  while(receiveMessage() != "START") {
    sendMessage("READY");
  }
  // Message to the main controller that hardware is ready.
  Serial.println("Confirmation received. Sending ready message...");
  
  motor.setSpeed(motorSpeed); // Stepper motor control.

  // Logical inputs.
  pinMode(cupSensor, INPUT);
  pinMode(conveyorSensor, INPUT);
  pinMode(calibration, INPUT);
  pinMode(conveyorPin, OUTPUT);

  // Calibrate the motor.
  calibrate();

  // Increment the conveyor to the first box.
  stopConveyor = true; // It is alright for a box to be preset for the initialization.
  incrementConveyor();

  // Open the cover.
  openCover();
}

// Write message -- encoded as bytes.
void sendMessage(String message) { // TODO: Change to print out a byte code.
  Serial.println(message);
}

// "" corresponds to no message received.
String receiveMessage() {
  if(Serial.available() > 0){
    return Serial.readStringUntil('\n'); // TODO: Change to read in an array of bytes.
  } else {
    return "";
  }
}

// Set the total number of cups. 
// Typically controlled by the main controller.
void setTotal(int newTotal) {
  totalCups = newTotal;
}


// TODO: I don't really think this method is important.
// Set a new box count.
void setBoxCount(int newBoxCount) {
  Serial.println("Set new box count to " + String(newBoxCount));
  boxCount = newBoxCount;
}

// TODO: Cover state should only be altered (there shouldn't be multiple accessor methods)
void changeCoverState() {

}

// Open the cover by a quarter turn.
void openCover() {
  int errorMargin = 5;
  motor.setSpeed(motorSpeed / 2);
  Serial.print("Opening Cover");
  motor.step(stepCount + errorMargin, FORWARD, power);
  for (int i = 0; i < 1000; i++) {
    delay(1);
    checkForCups();
  }
  motor.release(); 
  motor.setSpeed(motorSpeed);
}

// Close the cover by a quarter turn.
void closeCover() { 
  motor.setSpeed(motorSpeed / 1.5);
  for (int i = 0; i < 200; i++) {
    delay(1);
    checkForCups();
  }
  Serial.print("Closing Cover");
  motor.step(stepCount, BACKWARD, power); 
  for (int i = 0; i < 1000; i++) {
    delay(1);
    checkForCups();
  }
  motor.release(); 
  calibrate();
}


// TODO: remove this method -- it shouldn't work this way.
// Move the cover by a custom number of steps.
void moveCover(int steps, String direct) {
  String message = "";
  if (direct == "+") { // Move in the positive forward direction.
    motor.step(steps, FORWARD, power);   
    message = "Moving Cover Forward By " + String(steps) + " steps.";
  } else if (direct == "-") { // Move in the negative backward direction.
    motor.step(steps, BACKWARD, power);   
    message = "Moving Cover Backward By " + String(steps) + " steps.";
  } else {
    message = "Invalid Command.";
  }
  Serial.print(message);
  motor.release(); 
  delay(1000);
}

// Calibrate the motor in case if becomes disaligned.
void calibrate() {
  Serial.println("Calibrating Motor...");
  motor.setSpeed(50);
  while(digitalRead(calibration)) {
    motor.step(1, BACKWARD, power);
    motor.release();
    delay(50);
  }
  motor.setSpeed(motorSpeed);
  Serial.println("Motor Calibrated.");
}

// TODO: Review this method and be sure it is still checking for cups correctly.
// Increment to the next box on the conveyor.
void incrementConveyor() {

    // Run the conveyor, and assume that a box is obstructing the sensor.
    runConveyor = true;
    boxDetected = true;

    Serial.print("Incrementing Conveyor...");

    // Start running the conveyor.
    while (runConveyor) {
      if (checkConveyorControl()) {
        return;
      }
      digitalWrite(conveyorPin, HIGH); // Move the conveyor.
      checkForCups(); // Must continue checking for cups in case they fall while the conveyor is incrementing.
      
      if (!digitalRead(conveyorSensor)) { // If a box is detected, set the boolean accordingly.
        boxDetected = true;
      } else {
        boxDetected = false;
      }

      // If no box is detected, get ready to stop the conveyor.
      if (!boxDetected && !stopConveyor) {
        stopConveyor = true;
      }

      // If a box is detected and it is time to stop the conveyor, stop running.
      if (boxDetected && stopConveyor) {
        runConveyor = false;
        stopConveyor = false;
      }
    }

    digitalWrite(conveyorPin, LOW);
    Serial.print("Conveyor Incremented.");
}

// TODO: Evaluate if this is neccessary.
void showError(int error) {
  
}

bool checkConveyorControl() {
  String message = receiveMessage();
  if (message == "SC") {
    Serial.print("Stopping Conveyor...");
    digitalWrite(conveyorPin, LOW);
    return true;
  } else {
    return false;
  }
}

void startConveyor() {
  Serial.print("Running Conveyor...");
  while (!checkConveyorControl()) {
    digitalWrite(conveyorPin, HIGH);
  }
}

// TODO: Completely rework this method to agree with the codes defined in the server code.
void handleInput() {
  String message = receiveMessage();
  if (message == "OC") { // Open the conveyor cover.
    openCover();
  }else if (message == "CC") { // Close the conveyor cover.
    closeCover();
  }else if (message.substring(0,2) == "MC") { // Move the cover a custom number of steps.
    moveCover(message.substring(3).toInt(), message.substring(2,3));
  } else if (message == "AC") { // Manually add a cup.
    addCup();
  } else if (message == "IC") { // Move the conveyor.
    incrementConveyor();
  } else if (message == "RC") { // Run the conveyor continuously.
    startConveyor();
  } else if (message.substring(0,3) == "CBC") { //Change the box count.
    setBoxCount(message.substring(3).toInt());
  } else if (message == "") { // No message.
    
  } else {
    Serial.print("Invalid Command.");
  }
}

void checkForCups() {
  if (!digitalRead(cupSensor) && !cupDetected) {
    cupDetected = true;
    addCup();
  } 
  
  if (digitalRead(cupSensor) && cupDetected) {
    cupDetected = false;
  }
}

// TODO: Alter this method so that it sends a code rather than a string.
// Add a cup and alert the main controller of an added cup.
void addCup() {
  Serial.write('+');
  totalCups++;
  Serial.println(totalCups);
}

// TODO: Double check to make sure this is working properly.
void loop() {  
  // First check if the controller is attempting to control the device.
  handleInput();
  checkForCups();

  // If a box has reached capacity and a new box hasn't arrived yet, close the cover, increment the conveyor, and open the cover.
  if (totalCups % boxCount == 0 && totalCups > 0 && !conveyorIncremented) {
    conveyorIncremented = true;
    closeCover();
    incrementConveyor();
    openCover();
  }

  // The conveyor will not have been incremented for a partially full box, prepping for the if statement above.
  if (totalCups % boxCount != 0) {
    conveyorIncremented = false;
  }
}
