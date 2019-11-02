var config = {
    apiKey: "AIzaSyDz86O5p3DfWUI5i4mWS2XFKPAoB-rQ6kc",
    authDomain: "train-time-c6847.firebaseapp.com",
    databaseURL: "https://train-time-c6847.firebaseio.com",
    projectId: "train-time-c6847",
    storageBucket: "train-time-c6847.appspot.com",
    messagingSenderId: "545879984886",
    appId: "1:545879984886:web:ce3f191571690831b97ad7"
};
firebase.initializeApp(config);

var database = firebase.database();


var traintime;
var destiny;
var firsttime;
var frequent;
var nextarrival;
var minsAway;













$("#submit-btn").on("click", function (event) {
    console.log("test")
    event.preventDefault();

    //pull and store values from input
    traintime = $("#train-time").val().trim();
    destiny = $("#destination").val().trim();
    firsttime = $("#1train-time").val().trim();
    frequent = $("#frequency-min").val().trim();

    var tFrequency = frequent;

    // Time is 3:30 AM
    var firstTime = traintime;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    nextTrain = moment(nextTrain).format("hh:mm");




    database.ref().push({
        traintime: traintime,
        destiny: destiny,
        firsttime: firsttime,
        arrivalTime: nextTrain,
        frequent: frequent,
        minutesAway: tMinutesTillTrain

    });
});

database.ref().on("child_added", function (snapshot) {
    var trainTable = $(".table");
    traintime = snapshot.val().traintime;
    destiny = snapshot.val().destiny;
    firsttime = snapshot.val().firsttime;
    frequent = snapshot.val().frequent;
    minutesAway = snapshot.val().minutesAway;
    console.log(snapshot.val());
    console.log(traintime);




    row = $("<tr>");
    row.append("<td>" + snapshot.val().traintime + "</td>");
    row.append("<td>" + snapshot.val().destiny + "</td>");
    row.append("<td>" + snapshot.val().firsttime + "</td>");
    row.append("<td>" + snapshot.val().frequent + "</td>");
    row.append("<td>" + snapshot.val().minutesAway + "</td>");
    trainTable.append(row);
})


