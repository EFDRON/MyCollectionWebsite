/*
Directions:
Create an object called facebookProfile. The object should have 3 properties:

your name
the number of friends you have, and
an array of messages you've posted (as strings) -- include at least two messages.
The object should also have 4 methods:

postMessage(message) - adds a new message string to the array
deleteMessage(index) - removes the message corresponding to the index provided
addFriend() - increases the friend count by 1
removeFriend() - decreases the friend count by 1
HINT! Here are some array methods you might want to use:

addition at the end is done using the push() method - MDN: Array.prototype.push()(opens in a new tab)
addition or removal at a specific index is done using the splice() method - Array.prototype.splice()(opens in a new tab)
deletion from the end is done using the pop() method - MDN: Array.prototype.pop()(opens in a new tab)


*/
const facebookProfile={
    name:'John',
    friends:15,
    messages:["hello","how are you"],
    postMessage:function(message){
        facebookProfile.messages.push(message);

    },
    deleteMessage:function(message,index){
        facebookProfile.messages.splice(index,1);
    },
    addFriend:function(){
        facebookProfile.friends+=1;
    },
    removeFriend:function(){
        facebookProfile.friends-=1;

    }


}

console.log("Name: ", facebookProfile.name);
console.log("Messages: ", facebookProfile.messages);
facebookProfile.postMessage("New message!");
console.log("Messages: ",  facebookProfile.messages);
facebookProfile.deleteMessage(2);
console.log("Messages: ",  facebookProfile.messages);
console.log("Friends: ", facebookProfile.friends);
facebookProfile.addFriend();
console.log("Friends: ", facebookProfile.friends);
facebookProfile.removeFriend();
console.log("Friends: ", facebookProfile.friends);


const donuts = [
    { type: "Jelly", cost: 1.22 },
    { type: "Chocolate", cost: 2.45 },
    { type: "Cider", cost: 1.59 },
    { type: "Boston Cream", cost: 5.99 }
  ];

  donuts.forEach(function(donut){
    console.log(donut.type+" donuts cost $"+ donut.cost+" each!")
  })
