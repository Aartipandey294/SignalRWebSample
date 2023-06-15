let lbl_houseJoined = document.getElementById("lbl_houseJoined");


let btn_un_group1 = document.getElementById("btn_un_group1");
let btn_un_group2 = document.getElementById("btn-un_group2");
let btn_un_group3 = document.getElementById("btn-un_group3");
let btn_un_group4 = document.getElementById("btn-un_group4");
let btn_group1 = document.getElementById("btn_group1");
let btn_group2 = document.getElementById("btn_group2");
let btn_group3 = document.getElementById("btn_group3");
let btn_group4 = document.getElementById("btn_group4");

let btn_tr_group1 = document.getElementById("btn_tr_group1");
let btn_tr_group2 = document.getElementById("btn_tr_group2");
let btn_tr_group3 = document.getElementById("btn_tr_group3");
let btn_tr_group4 = document.getElementById("btn_tr_group4");


//create connection
var connectionHouse = new signalR.HubConnectionBuilder()
    //.configureLogging(signalR.LogLevel.Information)
    .withUrl("/hubs/houseGroup").build();

btn_group1.addEventListener("click", function (event) {
    connectionHouse.send("JoinHouse", "Group1");
    event.preventDefault();
});
btn_group2.addEventListener("click", function (event) {
    connectionHouse.send("JoinHouse", "Group2");
    event.preventDefault();
});
btn_group3.addEventListener("click", function (event) {
    connectionHouse.send("JoinHouse", "Group3");
    event.preventDefault();
});
btn_group4.addEventListener("click", function (event) {
    connectionHouse.send("JoinHouse", "Group4");
    event.preventDefault();
});


btn_tr_group1.addEventListener("click", function (event) {
    connectionHouse.send("TriggerHouseNotify", "Group1");
    event.preventDefault();
});
btn_tr_group2.addEventListener("click", function (event) {
    connectionHouse.send("TriggerHouseNotify", "Group2");
    event.preventDefault();
});
btn_tr_group3.addEventListener("click", function (event) {
    connectionHouse.send("TriggerHouseNotify", "Group3");
    event.preventDefault();
});
btn_tr_group4.addEventListener("click", function (event) {
    connectionHouse.send("TriggerHouseNotify", "Group4");
    event.preventDefault();
});



btn_un_group1.addEventListener("click", function (event) {
    connectionHouse.send("LeaveHouse", "Group1");
    event.preventDefault();
});
btn_un_group2.addEventListener("click", function (event) {
    connectionHouse.send("LeaveHouse", "Group2");
    event.preventDefault();
});
btn_un_group3.addEventListener("click", function (event) {
    connectionHouse.send("LeaveHouse", "Group3");
    event.preventDefault();
});
btn_un_group4.addEventListener("click", function (event) {
    connectionHouse.send("LeaveHouse", "Group4");
    event.preventDefault();
});

connectionHouse.on("triggerHouseNotification", (houseName) => {
    toastr.success(`A new notification for ${houseName} has been launched.`);
});

connectionHouse.on("newMemberAddedToHouse", (houseName) => {
    toastr.success(`Member has subscribed to ${houseName}`);
});

connectionHouse.on("newMemberRemovedFromHouse", (houseName) => {
    toastr.warning(`Member has unsubscribed from ${houseName}`);
});

connectionHouse.on("subscriptionStatus", (strGroupsJoined, houseName, hasSubscribed) => {
    lbl_houseJoined.innerText = strGroupsJoined;

    if (hasSubscribed) {
        //subscribe to

        switch (houseName) {
            case 'Group1':
                btn_group1.style.display = "none";
                btn_un_group1.style.display = "";
                break;
            case 'Group2':
                btn_group2.style.display = "none";
                btn_un_group2.style.display = "";
                break;
            case 'Group3':
                btn_group3.style.display = "none";
                btn_un_group3.style.display = "";
                break;
            case 'Group4':
                btn_group1.style.display = "none";
                btn_un_group4.style.display = "";
                break;
            default:
                break;
        }

        toastr.success(`You have Subscribed Successfully. ${houseName}`);
    }
    else {
        //unsubscribe
        switch (houseName) {
            case 'Group1':
                btn_group1.style.display = "";
                btn_un_group1.style.display = "none";
                break;
            case 'Group2':
                btn_group2.style.display = "";
                btn_un_group2.style.display = "none";
                break;
            case 'Group3':
                btn_group3.style.display = "";
                btn_un_group3.style.display = "none";
                break;
            case 'Group4':
                btn_group4.style.display = "";
                btn_un_group4.style.display = "none";
                break;
            default:
                break;
        }

        toastr.success(`You have Unsubscribed Successfully. ${houseName}`);
    }

})



//start connection
function fulfilled() {
    //do something on start
    console.log("Connection to User Hub Successful");
}
function rejected() {
    //rejected logs
}

connectionHouse.start().then(fulfilled, rejected);