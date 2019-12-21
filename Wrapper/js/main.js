var studentData = null;
var permUserName;
var permPassword;

function incorrectFlag(){
    var inputs = document.getElementsByClassName('validate-input');
    for (var i = 0; i < inputs.length; i++ ) {
        inputs[i].classList.add("alert-validate");
    }
}

function correctFlag(){
    var inputs = document.getElementsByClassName('validate-input');
    for (var i = 0; i < inputs.length; i++ ) {
        if(inputs[i].classList.contains("alert-validate")){
            inputs[i].classList.remove("alert-validate");
        }
    }
}

function switchNineWeeks(nine_weeks){
    
    

    reloadGrades(nine_weeks);
    
}

function transformLogin(height){
  var tableHeight = 60 + (50 * height);
  var tableHeightString = String(tableHeight) + "px";
  
  $("#login-box").empty().css({
      position: "absolute",
      width: "60vw",
      height: tableHeightString
    
        
    }).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',   
    function(e) {
        setTimeout(function(){
                $("#cssload-contain").addClass("hidden");
                $(".parent-table-wrap").removeClass("hidden");
                $(".parent-login-wrap").addClass("hidden");
                $(".wrap-table100").fadeTo(200, 1);
            }, 1000);
  });
   
}

function simpleLoad(){
    $("#login-box").children().hide();
    $("#cssload-contain").toggleClass("hidden");
}

function revertSimpleLoad() {
    $("#login-box").children().show();
    $("#cssload-contain").toggleClass("hidden");
}

function getPoints(data){
    var pointsEarned;
    var pointsPossible;
    var courses = Object.keys(data);
    var finalData = {};

    for(i=0; i<courses.length; i++){
        pointsEarned = pointsPossible = 0;
        var assignments = data[courses[i]][0];
        for(j=0; j<assignments.length; j++){
            if(assignments[j][5]==="Missing" || assignments[j][5]==="Entered") {
                pointsEarned += assignments[j][2];
                pointsPossible += assignments[j][3];

            }
        }
        finalData[courses[i]] = [pointsEarned, pointsPossible];
    }
    return finalData;
}
  
function generateAssignmentTable(data, index){
    var courses = Object.keys(data);
    var selectedAssignments = data[courses[index]][0];

    $("#main-table-body").find("tr").remove();
    
    for(var i=0; i < selectedAssignments.length; i++){


        var tr = $('<tr/>').appendTo($("#main-table-body"));
        tr.addClass("tableAssignmentRow");
        tr.append('<td ' + 'class="assignmentName"' + '>' + selectedAssignments[i][0] + '</td>');
        tr.append('<td ' + 'class="assignmentGrade"' + '>' + selectedAssignments[i][1] + '</td>');
        tr.append('<td ' + 'class="assignmentPointsEarned"' + '>' + selectedAssignments[i][2] + '</td>');
        tr.append('<td ' + 'class="assignmentPointsPossible"' + '>' + selectedAssignments[i][3] + '</td>');
        tr.append('<td ' + 'class="assignmentPercentage"' + '>' + selectedAssignments[i][4] + '</td>');
        console.log(selectedAssignments[i][6]);


    }
}


function generateTable(data) {
    var points = getPoints(data);
    console.log(points);

    var courses = Object.keys(data);
    
    for(i=0; i < courses.length; i++){
        var tr = $('<tr/>').appendTo($("#main-table-body"));
        tr.addClass("tableGradeRow");
        tr.append('<td ' + 'class="courseName"' + '>' + courses[i] + '</td>');
        tr.append('<td ' + 'class="courseGrade"' + '>' + data[courses[i]][1][1] + '</td>');
        tr.append('<td ' + 'class="coursePointsEarned"' + '>' + Math.round(points[courses[i]][0] * 100)/100 + '</td>');
        tr.append('<td ' + 'class="coursePointsPossible"' + '>' + Math.round(points[courses[i]][1] * 100)/100  + '</td>');
        tr.append('<td ' + 'class="coursePercentage"' + '>' + data[courses[i]][1][0] + '%' + '</td>');
        tr.append('<td ' + 'class="coursePercentage"' + '>' + data[courses[i]][1][0] + '%' + '</td>');

    }
    
}
//this shit reloads the table when user clicks new nine weeks
/*
function reloadGrades(nineWeeks){
    var userRef = permUserName;
    var passRef = permPassword;
    
  
    
    var uName = "username";
    var uPass = "password";
    var uNineWeeks = "nineWeeks";

    var obj = {};

    obj[uName] = userRef;
    obj[uPass] = passRef;
    obj[uNineWeeks] = nineWeeks;

    var myJSON = JSON.stringify(obj);

    console.log("Getting Grades...");
    simpleLoad();

    var lambda = new AWS.Lambda({
        region: "us-east-1",
        accessKeyId: 'AKIAIRX337IJIDKNCCCQ',
        secretAccessKey: '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'
    });

    lambda.invoke({
        FunctionName: "tyler_final_version",
        Payload: myJSON

    }, function (err, data) {
        if (!err) {
            result = JSON.parse(data.Payload);
            studentData = result;
            console.log(studentData);
              permUserName = userRef;
              permPassword = passRef;

            if(result === false){
				incorrectFlag();
				revertSimpleLoad();
			} else{
                transformLogin(Object.keys(result).length);
                generateTable(result);

            }

        } else {
            console.log(err);
        }
    });
}

*/

function checkLogin(nineWeeks) {

    var userRef = document.getElementById("userRef").value.toString();
    var passRef = document.getElementById("passRef").value.toString();
    
  
    
    var uName = "username";
    var uPass = "password";
    var uNineWeeks = "nineWeeks";

    var obj = {};

    obj[uName] = userRef;
    obj[uPass] = passRef;
    obj[uNineWeeks] = nineWeeks;

    var myJSON = JSON.stringify(obj);

    console.log("Getting Grades...");
    simpleLoad();

    var lambda = new AWS.Lambda({
        region: "us-east-1",
        accessKeyId: 'AKIAIRX337IJIDKNCCCQ',
        secretAccessKey: '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'
    });

    lambda.invoke({
        FunctionName: "tyler_final_version",
        Payload: myJSON

    }, function (err, data) {
        if (!err) {
            result = JSON.parse(data.Payload);
            studentData = result;
            console.log(studentData);
              permUserName = userRef;
              permPassword = passRef;

            if(result === false){
				incorrectFlag();
				revertSimpleLoad();
			} else{
                transformLogin(Object.keys(result).length);
                generateTable(result);
                /*document.location.href="http://localhost:63342/Wrapper_In_Progress/Wrapper/environment/dashboard.html";*/

            }

        } else {
            console.log(err);
        }
    });
    
}

$(document).ready(function(){
    $("#login_button").click(function(){

        if($("#userRef").val().length !== 6 || $("#passRef").val().length === 0) {
            incorrectFlag();
        } else{
            checkLogin('9-3');
            //simpleLoad();
            //transformLogin(6);
            
        }

    });
    $( "#main-table-body" ).on( "click", "tr", function() {
      console.log( $( this ).index() );
      generateAssignmentTable(studentData, $( this ).index());
    });
});