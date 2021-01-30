var addToDoToLocal = function (note, completed) {
    // retrieve it (Or create a blank array if there isn't any info saved yet),
    var todoNotes = JSON.parse(localStorage.getItem('todoNotes')) || [];
    // add to it,
    todoNotes.push({ note: note, completed: completed });
    // then put it back.
    localStorage.setItem('todoNotes', JSON.stringify(todoNotes));
}

var deleteToDoFromLocal = function (note) {
    // retrieve it (Or create a blank array if there isn't any info saved yet),
    var todoNotes = JSON.parse(localStorage.getItem('todoNotes')) || [];
    // add to it,
    var indexToDelete = todoNotes.indexOf(todoNotes.filter(ele => ele.note==note)[0])
    console.log(`ndex to delete : ${indexToDelete}`)
    todoNotes.splice(indexToDelete,1);
    // then put it back.
    localStorage.setItem('todoNotes', JSON.stringify(todoNotes));
}

var getToDoFromLocal = function () {
    // retrieve it (Or create a blank array if there isn't any info saved yet),
    var todoNotes = JSON.parse(localStorage.getItem('todoNotes')) || [];
    for (let i = 0; i < todoNotes.length; i++) {
        formAndAppend(todoNotes[i].note, todoNotes[i].completed)
    }
}

var ModifyToDoStatus = function (note,isCompleted) {
    // retrieve it (Or create a blank array if there isn't any info saved yet),
    var todoNotes = JSON.parse(localStorage.getItem('todoNotes')) || [];
    var index = todoNotes.indexOf(todoNotes.filter(ele => ele.note==note)[0])
    todoNotes[index].completed=isCompleted;
    // then put it back.
    localStorage.setItem('todoNotes', JSON.stringify(todoNotes));
    $("#notesTable tbody").empty();
    $("#completeTable tbody").empty();

    for (let i = 0; i < todoNotes.length; i++) {
        formAndAppend(todoNotes[i].note, todoNotes[i].completed)
    }
}

function formAndAppend(todoNote, completed) {
    console.log(completed)
    if (completed == 0) {
        var row = `<tr><td>${todoNote}</td><td><img src="add.png" alt=""></td></td><td><img src="remove.png" alt=""></td></tr>`;
        $("#notesTable tbody").append(row).children().last().hide().show(1000);
    } else {
        var row = `<tr><td>${todoNote}</td><td><img src="uncomp.png" alt=""></td></td><td><img src="remove.png" alt=""></td></tr>`;
        $("#completeTable tbody").append(row).children().last().hide().show(1000);
        
    }
}

var todoNote;
var todo = [];
getToDoFromLocal();

$("#addTodo").click((e) => {
    todoNote = $("#todoNote").val();
    if (todoNote != "") {
        console.log(`Note : ${todoNote}`)
        formAndAppend(todoNote,0)
        addToDoToLocal(todoNote,0);
    }
})

//Todo Notes
$("#notesTable tbody").on("click", "img", function () {
    let rowIndex = $(this).parent().parent().index();
    let imgIndex = $(this).parent().index();
    let todoNoteText = $("#notesTable tbody").children().eq(rowIndex).children().eq(0).text();

    if (imgIndex == 1) {
        console.log(`note text : ${todoNoteText}`)
        //Completed
        ModifyToDoStatus(todoNoteText,1)
    }
    else {
        //Delete
        deleteToDoFromLocal(todoNoteText)
        $("#notesTable tbody tr")[rowIndex].remove();
    }
    console.log(`ImageIndex : ${imgIndex}`)
})

//Completed Notes
$("#completeTable tbody").on("click", "img", function () {
    let rowIndex = $(this).parent().parent().index();
    let imgIndex = $(this).parent().index();
    let todoNoteText = $("#completeTable tbody").children().eq(rowIndex).children().eq(0).text();

    if (imgIndex == 1) {
        //Completed
        ModifyToDoStatus(todoNoteText,0)
    }
    else {
        deleteToDoFromLocal(todoNoteText)
        //Delete
        $("#completeTable tbody tr")[rowIndex].remove();
    }
})






























// var canvas = document.getElementById("artBoard");
// canvas.oncontextmenu = new Function("return false;")
// canvas.width = canvas.getBoundingClientRect().width;
// canvas.height = canvas.getBoundingClientRect().height;

// fillColorInput = document.getElementById("fillColor")
// strokeColorInput = document.getElementById("strokeColor")

// fillColorInput.value = "#ff0000"
// var fillColor = fillColorInput.value;
// console.log(fillColor)
// strokeColorInput.value = "#ccb7b7"
// var strokeColor = strokeColorInput.value;
// console.log(strokeColor)

// var shape = "line"
// var context = canvas.getContext("2d");
// var position = { x: 0, y: 0 }
// var mouse = { x: 0, y: 0 };

// mouseDown=false;

// function drawLine(startPosition, endPosition) {
//     context.strokeStyle = strokeColor;
//     context.lineWidth = 5;
//     // draw a red line
//     context.beginPath();
//     context.moveTo(startPosition.x, startPosition.y);
//     context.lineTo(endPosition.x, endPosition.y);
//     context.stroke();
// }

// function drawCircle(startPosition, endPosition) {
//     context.beginPath();
//     radius = getRadius(startPosition, endPosition)
//     context.arc(startPosition.x, startPosition.y, radius, 0, 2 * Math.PI);
//     context.lineWidth = 5;
//     context.fillStyle = fillColor; //green
//     context.strokeStyle = strokeColor;
//     context.stroke();
//     context.fill();
// }
// function drawRect(startPosition, endPosition) {
//     context.beginPath();
//     width =Math.abs(endPosition.x-startPosition.x) ;
//     height= Math.abs(endPosition.y-startPosition.y);
//     context.rect(startPosition.x, startPosition.y, width, height);
//     console.log(width)
//     console.log(height)
//     context.lineWidth = 5;
//     context.fillStyle = fillColor; //green
//     context.strokeStyle = strokeColor;
//     context.stroke();
//     context.fill();
// }
// function drawEraser(startPosition, endPosition) {
//     context.beginPath();
//     radius = getRadius(startPosition, endPosition)
//     context.arc(startPosition.x, startPosition.y, radius, 0, 2 * Math.PI);
//     context.lineWidth = 5;
//     context.fillStyle = "black"; //green
//     context.strokeStyle = "black";
//     context.stroke();
//     context.fill();
// }

// function getRadius(pos1, pos2) {
//     diffX = pos2.x - pos1.x;
//     diffY = pos2.y - pos1.y;
//     return Math.sqrt(diffX * diffX + diffY * diffY);
// }
// document.addEventListener("mousemove", (e) => {
//     const bounds = canvas.getBoundingClientRect();
//     mouse.x = e.pageX - bounds.left - scrollX;
//     mouse.y = e.pageY - bounds.top - scrollY;
//     if(mouseDown){
//         drawLine(position,mouse);
//         position.x = mouse.x;
//         position.y = mouse.y;    }
//     //  console.log(`MouseX = ${this.mouse.x}, MouseY = ${this.mouse.y}`)
// });

// fillColorInput.addEventListener("change", (e) => {
//     fillColor = fillColorInput.value
//     console.log(fillColor)
// })
// strokeColorInput.addEventListener("change", (e) => {
//     strokeColor = strokeColorInput.value
//     console.log(strokeColor)
// })


// //detect the mouse down for continous isShooting
// canvas.addEventListener('mousedown', (e) => {
//     position.x = mouse.x;
//     position.y = mouse.y;
//     if(shape=="freeHand"){
//         mouseDown=true;
//     }
// })
// //detect the mouse down for continous isShooting
// canvas.addEventListener('mouseup', (e) => {
//     switch (shape) {
//         case "line":
//             drawLine(position, mouse);
//             break;
//         case "circle":
//             drawCircle(position, mouse);
//             break;
//         case "rect":
//             drawRect(position, mouse);
//             break;
//         case "eraser":
//             drawEraser(position,mouse)
//             break;
//         case "freeHand":

//             break;
//     }
//     mouseDown=false;
// })




// $("#line").click(() => {
//     shape = "line";
// })
// $("#circle").click(() => {
//     shape = "circle";
// })
// $("#rect").click(() => {
//     shape = "rect";
// })
// $("#freeHand").click(() => {
//     shape = "freeHand";
// })
// $("#eraser").click(() => {
//     shape = "eraser";
// })

