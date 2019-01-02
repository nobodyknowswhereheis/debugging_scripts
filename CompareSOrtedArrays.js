// Simple POC to compare two sorted arrays in one pass.
// This algorithm should check an array against a copy of itself. 
// If any items have been removed from or inserted into the array since the copy was made it will log it.

// example data
let myIds = ["ffcf1080db78aa00fd8177a0cf9619cb",
    "ffcf1080db78aa00fd8177a0cf9619d2",
    "ffd0e8c0db78aa00fd8177a0cf9619a7",
    "ffd0e8c0db78aa00fd8177a0cf9619ae",
    "ffd16c44db78aa00fd8177a0cf96191d",
    "ffd16c44db78aa00fd8177a0cf961954",
    "ffe1ac44db78aa00fd8177a0cf9619b6",
    "ffe1ac44db78aa00fd8177a0cf9619bd",
    "ffe2a8c4db78aa00fd8177a0cf9619e5",
    "ffe7c7890fb81a00e7b6b36be1050e48",
    "ffea5d78dbea6a009bbbd400cf96194d",
    "ffebdc88db38aa00fd8177a0cf9619c9",
    "ffebdc88db38aa00fd8177a0cf9619d0",
    "ffec2ad50f4c5e002668317ce1050e73",
    "ffec580cdb38aa00fd8177a0cf9619b4"
]

// copy the data into a new array...
let staging = [...myIds];

// We'll add this into the array later...
let newId = "ffe5fc9d0f913100eb83e1b8b1050ef0";

// The actual algorithm we care about:
let checkArrays = (sourceArray, updatedArray) => {
    // base this off the length of the shortest array so we don't overflow.
    let myLen = (sourceArray.length <= updatedArray.length) ? sourceArray.length : updatedArray.length;
    var leftOffset = 0; // use offsets to "skip" updates.
    var rightOffset = 0;


    for (var i = 0; i < myLen; i++) {
        var li = i + leftOffset;
        var ri = i + rightOffset;

        if (sourceArray[li] == updatedArray[ri]) // they match!
        {
            console.log("They match!");
            continue;
        }
        else if (sourceArray[li] > updatedArray[ri]) {
            console.log("It looks like " + updatedArray[ri] + " was deleted.");
            rightOffset++;
        } else {
            // new record was inserted...
            console.log("looks like a new record was inserted");
            leftOffset++;
        }
    }
    // TODO: if we're done checking and there are unchecked items in the longer array, let's just find a good way to output that.
    console.log(leftOffset);
    console.log(rightOffset);

}

// example usage:
checkArrays(myIds, staging); // should see no changes
myIds.push(newId);
myIds = myIds.sort();
checkArrays(myIds, staging); // should see that a new item was inserted
var newIds = myIds.filter(id => id != "ffcf1080db78aa00fd8177a0cf9619d2");
var t0 = performance.now();
checkArrays(newIds, staging); // should show that an item was removed
var t1 = performance.now();
console.log("Took " + (t1 - t0) + " milliseconds.") // gotta know how long that took!
