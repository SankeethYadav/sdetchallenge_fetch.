// This Test is to Find the Fake Gold Bar challenge the console output will 
//List of Weigings and Total Number of Weighings,the Aller message.

describe('Fake Gold Bar Challenge', function() {
  function printAllertMessage() {
      browser.switchTo().alert().then(function(alert) {
          alert.getText().then(function(actualMessage) {
            console.log(actualMessage);
        })
        });
}
// As we are using protoctor, jasmine, Node.js and JavaScript - We need to disable the wait for Angular.
  beforeAll(function() {
        browser.waitForAngularEnabled(false); // Disable waiting for Angular
    });
// This Function is used to resetPlates of the Grid After each operation
  function resetPlatesGrid() {
      element.all(by.id('reset')).get(1).click();
      browser.wait(ExpectedConditions.visibilityOf(element(by.id('reset'))), 3000);
      }
// This Function is uesd to Click on The fackGoldBar after the Completion of all the weighings and finding the result
// This Function also Prints the list of weighting and total Number of weighing
  function clickFakeGoldBarButton_ReturnTheWeighingList(fakeBarNumber) {
    // This code Gives us total Number of Weigings Done.
    let liElements = element.all(by.css('.game-info li'));
    liElements.count().then(function(count) {
      console.log("Total Number Weighings done = :", count);
    });
    
    // This is for Final List of weighings
      element(by.className('game-info')).getText().then(function(text){
      console.log("Final lsit of Weighings is ", text);
    });
    
    // This is the list of all the gold bars and based on the paramenet value we get i.e FakeBar Number That perticular Bar will be clicked
        const eleList= ['coin_0','coin_1','coin_2','coin_3','coin_4','coin_5','coin_6','coin_7','coin_8']
        element(by.id(eleList[fakeBarNumber])).click();
       }
    // This Function Is Like Helper Function for put Binary Search operation it takes 2 list left and right list to add on left and right
    // weigings respectively and perform weighing and will crate the List of weigings.
    function weighGoldBars(leftBars, rightBars) {
    
        const inputIds_left = ["left_0", "left_1", "left_2", "left_3","left_4"];
        const inputIds_right = ["right_0", "right_1", "right_2", "right_3","right_4"];
        // Populating the left side of the weighing sacle
        for (let i = 0; i < leftBars.length; i++) {
         
          const inputElement = element(by.id(inputIds_left[i]));
          inputElement.sendKeys(leftBars[i].toString());
          
        }
        // Populating the right side of the weighing Scale
        for (let i = 0; i < rightBars.length; i++) {
          
            const inputElement = element(by.id(inputIds_right[i]));
            inputElement.sendKeys(rightBars[i].toString());
            
          }
      // Clicking the weigh operation
      element(by.id('weigh')).click();
      browser.sleep(5000);
    }

   // Recursive Binary Search function function to find the fake gold bar
   function findFakeGoldBar(leftBars, rightBars) {
    // Will populate the weighings and compare the weights on left and right
    weighGoldBars(leftBars, rightBars);
    // if Both the left and right scale has only one bar rescpectively we can comapre them and retun the final answer(fake bar)
    if (leftBars.length === 1 && rightBars.length === 1) {
      element(by.id('reset')).getText().then(function(text) {
        // if the comparision is > the the right bar is defective else left bar.
        if (text === ">"){
          // function to get the output 
          clickFakeGoldBarButton_ReturnTheWeighingList(parseInt(rightBars[0]));
          console.log("The Defective GoldBar is : ", parseInt(rightBars[0]));
        }
        else{
       
          // Function to get the output
          clickFakeGoldBarButton_ReturnTheWeighingList(parseInt(leftBars[0]));
          console.log("The Defective GoldBar is : ", parseInt(leftBars[0]));
        }
      });
      return ;
    }
    // This is an edge case IF it is neighter and we get the output at the first attempt of the binary search the we need to return the 
    // mid element which is 4
    element(by.id('reset')).getText().then(function(text) {
      if (text ==="="){
        
        clickFakeGoldBarButton_ReturnTheWeighingList(4);
        console.log("The Defective Gold Bar is : ", "4");
      }
      // if the right side weighing is less the the defective bar is on right so we only need to search the right half.
      if (text === ">"){
        // Spilliting theis half into 2 halfs and first part is passed on to  the left weighing plate and second half to the right
        const midpoint = Math.ceil(rightBars.length / 2);
        const a = rightBars.slice(0, midpoint);
        const b = rightBars.slice(midpoint);
        resetPlatesGrid();
        // Recursive call
        findFakeGoldBar(a,b);
      }
      // if the left side weighing is less the the defective bar is on right so we only need to search the left half.
     else if (text === "<"){
      const midpoint = Math.ceil(leftBars.length / 2);
      // Spilliting theis half into 2 halfs and first part is passed on to  the left weighing plate and second half to the right
        const a = leftBars.slice(0, midpoint);
        const b = leftBars.slice(midpoint);
        resetPlatesGrid();
        // Recursive call
        findFakeGoldBar(a,b);
     }
    });
    }
  // Test call it is like Main Function.
    it('should find the fake gold bar', function() {
      browser.sleep(2000);
      // Loading the Browser
      browser.get('http://sdetchallenge.fetch.com/');
      browser.sleep(2000);
      // List of bars initially
      const allBars = [0, 1, 2, 3, 4, 5, 6, 7, 8];
      // Split bars into 2 halves for our binary search operation 
      const a = allBars.slice(0, Math.ceil(allBars.length / 2)-1)
      const b = allBars.slice(Math.ceil(allBars.length / 2))
      // Calling the function 
      // This Function will handle and print the required ouput to the console
      findFakeGoldBar(a, b);
      // Priging the alert message that we got
      printAllertMessage();
    });
   
  });
  