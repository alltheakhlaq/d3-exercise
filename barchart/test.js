const arr = ["Rob", "Sara", "Alex", "Ruthie"];

const rob = arr[0];
const sara = arr[1];
const [otherRob, otherSara] = arr;

const myObject = { attr1: "cheese", attr2: "ham" };

const otherAttr1 = myObject.attr1;
const otherAttr2 = myObject.attr2;
const { attr1, attr2 } = myObject;

function logThing(someArray) {
  console.log(someArray[1]);
}
function otherLogThing([_, value]) {
  console.log(value);
}
