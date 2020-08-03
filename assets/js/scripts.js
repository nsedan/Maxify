//ADD TASKS
let index = 1;
function taskBlock(){
    if($('#theme').hasClass('light-background')){
        let newTaskText = $('.form-control').val();
        let htmlDivBlock = `<div class="task" data-index="${index}"><div class="input-group">
        <div class="input-group-prepend"><span class="input-group-text"><i class="fa fa-check off">
        </i></span></div><div class="task-text"><p>${newTaskText}</p></div><div class="input-group-append">
        <span class="input-group-text"><i class="fa fa-edit"></i></span><span class="input-group-text">
        <i class="fa fa-trash"></i></span></div></div></div>`;
        storagedTasks[index] = newTaskText;
        localStorage.setItem('storagedTasks', JSON.stringify(storagedTasks));
        $('.task-list').append(htmlDivBlock)
        
    }else if ($('#theme').hasClass('dark-background')) {
        let newTaskText = $('.form-control').val();
        let htmlDivBlock = `<div class="task" data-index="${index}"><div class="input-group">
        <div class="input-group-prepend"><span class="input-group-text input-group-text-dark">
        <i class="fa fa-check fa-check-dark off"></i></span></div><div class="task-text task-text-dark">
        <p>${newTaskText}</p></div><div class="input-group-append"><span class="input-group-text input-group-text-dark">
        <i class="fa fa-edit"></i></span><span class="input-group-text input-group-text-dark">
        <i class="fa fa-trash"></i></span></div></div></div>`
        storagedTasks[index] = newTaskText;
        localStorage.setItem('storagedTasks', JSON.stringify(storagedTasks));
        $('.task-list').append(htmlDivBlock)
    }
}

function taskFunction() {/* Main function to add new tasks*/
    $('.pop-up-trophy').remove()
    if ($('.form-control').val()) {
        if (!trophy1Awarded) {
            taskBlock()
            index++
            if ($('#theme').hasClass('light-background')) {
                firstTrophyPopUp();
            } else if ($('#theme').hasClass('dark-background')) {
                firstTrophyDarkPopUp();
            }
            trophy1Awarded = true
        } else {
            taskBlock()
            index++
        }
    } else {
        alert("'Nothing' is not a task!")
    }
    $('.form-control').val("")
}

$(document).on("click", '.fa-plus', function () {
    taskFunction()
})

$(document).on("keypress", '#main-input', function (event) {
    const keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        taskFunction()
    }
});

//DELETE BUTTON
$(document).on('click', '.fa-trash', function () {
    const $task = $(this).closest('.task')
    $task.remove();
    /*change to local storage below*/
    const dataIndex = $task.data("index")
    delete storagedTasks[dataIndex]
    localStorage.setItem('storagedTasks', JSON.stringify(storagedTasks))
});


//CHECK BUTTON
$(document).on('click', '.fa-check', function () {
    if ($(this).hasClass('off')) {
        $(this).removeClass('off').addClass('on');
    } else if ($(this).hasClass('on')) {
        $(this).removeClass('on').addClass('off')
    }
});


//EDIT BUTTON
const overlay = `<div id="overlay"><div class="input-group input-edit">
<input type="text" class="form-control form-edit"><div class="input-group-append">
<span class="input-group-text"><i class="fa fa-pencil"></i></span></div></div></div>`
const overlayDark = `<div id="overlay"><div class="input-group input-edit">
<input type="text" class="form-control form-edit form-control-dark form-edit-dark">
<div class="input-group-append"><span class="input-group-text input-group-text-dark">
<i class="fa fa-pencil"></i></span></div></div></div>`

$(document).on('click', '.fa-edit', function () { 
    if ($('#theme').hasClass('light-background')) {
        $('.tasks-main').append(overlay)
    } else if ($('#theme').hasClass('dark-background')) {
        $('.tasks-main').append(overlayDark)
    }
    const $task = $(this).closest('.task')
    const $overlay = $('#overlay');
    onEdit($task, $overlay)
});

function onEdit($task, $overlay) { /* edit task function*/ 
    const currentValue = $task.find('p').text()
    $overlay.find('.form-edit').val(currentValue)
    $overlay.find('.fa-pencil').click(function () {
        let editedTask = $overlay.find('.form-edit').val();
        if (editedTask) {
            $task.find('p').text(editedTask)
            $overlay.remove()
            /*change to local storage below*/
            const dataIndex = $task.data("index")
            storagedTasks[dataIndex] = editedTask;
            localStorage.setItem('storagedTasks', JSON.stringify(storagedTasks))

        } else {
            alert("Task cannot be empty!")
        }
    })
}

//ACHIEVMENTS
$(document).on('click', '.fa-trophy', function () {
    $('.tasks-main').css('display', 'none')
    $('.trophy-section').css('display', 'block')
    $('.pop-up-trophy').remove()
})

$(document).on('click', '.fa-home', function () {
    $('.tasks-main').css('display', 'block')
    $('.trophy-section').css('display', 'none')
    $('.pop-up-trophy').remove()
})

const completed = ' <span style="color: rgba(255, 0, 0, 0.8); text-decoration: none">COMPLETED</span>'

let trophy1Awarded = false;

const firstTrophyPopUp = function () {
    const trophy1 = '<div class="pop-up-trophy"><p class="pop-up-close">x</p><h6>Congratulations on creating your first task!</h6><h6>You just earned a trophy!</h6></div>'
    setTimeout(function () {
        $('#trophy1').html('<span style="text-decoration: line-through;">Add a task!</span>' + completed);
        $('header').append(trophy1)
    }, 750);
};

const firstTrophyDarkPopUp = function () {
    const trophy1 = '<div class="pop-up-trophy pop-up-trophy-dark"><p class="pop-up-close">x</p><h6>Congratulations on creating your first task!</h6><h6>You just earned a trophy!</h6></div>'
    setTimeout(function () {
        $('#trophy1').html('<span style="text-decoration: line-through;">Add a task!</span>' + completed);
        $('header').append(trophy1)
    }, 750);
};

$(document).one("click", '.fa-trash', function () { /* deleted task trophy*/
    const trophy2 = '<div class="pop-up-trophy"><p class="pop-up-close">x</p><h6>You deleted a task and earned a trophy!</h6></div>'
    const trophy2Dark = '<div class="pop-up-trophy pop-up-trophy-dark"><p class="pop-up-close">x</p><h6>You deleted a task and earned a trophy!</h6></div>'

    if ($('#theme').hasClass('light-background')) {
        $('.pop-up-trophy').remove()
        setTimeout(function () {
            $('#trophy2').html('<span style="text-decoration: line-through;">Delete a task!</span>' + completed);
            $('header').append(trophy2)
        }, 750);
    } else if ($('#theme').hasClass('dark-background')) {
        $('.pop-up-trophy').remove()
        setTimeout(function () {
            $('#trophy2').html('<span style="text-decoration: line-through;">Delete a task!</span>' + completed);
            $('header').append(trophy2Dark)
        }, 750);
    }
});

$(document).one("click", '.fa-check', function () { /* completed task trophy*/
    const trophy3 = '<div class="pop-up-trophy"><p class="pop-up-close">x</p><h6>Kudos on finishing your first task!</h6><h6>You just earned a trophy!</h6></div>'
    const trophy3Dark = '<div class="pop-up-trophy pop-up-trophy-dark"><p class="pop-up-close">x</p><h6>Kudos on finishing your first task!</h6><h6>You just earned a trophy!</h6></div>'

    if ($('#theme').hasClass('light-background')) {
        $('.pop-up-trophy').remove()
        setTimeout(function () {
            $('#trophy3').html('<span style="text-decoration: line-through;">Finish a task!</span>' + completed);
            $('header').append(trophy3)
        }, 750);
    } else if ($('#theme').hasClass('dark-background')) {
        $('.pop-up-trophy').remove()
        setTimeout(function () {
            $('#trophy3').html('<span style="text-decoration: line-through;">Finish a task!</span>' + completed);
            $('header').append(trophy3Dark)
        }, 750);
    }
});

$(document).one("click", '.fa-pencil', function () { /* edited task trophy*/
    const trophy4 = '<div class="pop-up-trophy"><p class="pop-up-close">x</p><h6>You edited a task and earned another trophy!</h6></div>'
    const trophy4Dark = '<div class="pop-up-trophy pop-up-trophy-dark"><p class="pop-up-close">x</p><h6>You edited a task and earned another trophy!</h6></div>'

    if ($('#theme').hasClass('light-background')) {
        $('.pop-up-trophy').remove()
        setTimeout(function () {
            $('#trophy4').html('<span style="text-decoration: line-through;">Edit a task!</span>' + completed);
            $('header').append(trophy4)
        }, 750);
    } else if ($('#theme').hasClass('dark-background')) {
        $('.pop-up-trophy').remove()
        setTimeout(function () {
            $('#trophy4').html('<span style="text-decoration: line-through;">Edit a task!</span>' + completed);
            $('header').append(trophy4Dark)
        }, 750);
    }
});

$(document).on('click', '.pop-up-close', function () {
    $('.pop-up-trophy').css('display', 'none')
})


// THEME CHANGE
const darkThemeStyle = function (){
    $('#theme').addClass('dark-background').removeClass('light-background');
    $('#maxify').css('text-shadow', '3px 3px rgb(99, 99, 99)');
    $('.links').addClass('links-dark')
    $('.input-group-text').addClass('input-group-text-dark')
    $('.form-control').addClass('form-control-dark')
    $('.task-text').addClass('task-text-dark')
    $('.fa-check').addClass('fa-check-dark')
    $('.pop-up-trophy').addClass('pop-up-trophy-dark')
    $('.trophy-div').addClass('trophy-div-dark')
}

const lightThemeStyle = function (){
    $('#theme').addClass('light-background').removeClass('dark-background')
    $('#maxify').css('text-shadow', '3px 3px rgb(43, 35, 155)');
    $('.links').removeClass('links-dark')
    $('.input-group-text').removeClass('input-group-text-dark')
    $('.form-control').removeClass('form-control-dark')
    $('.task-text').removeClass('task-text-dark')
    $('.fa-check').removeClass('fa-check-dark')
    $('.pop-up-trophy').removeClass('pop-up-trophy-dark')
    $('.trophy-div').removeClass('trophy-div-dark')
}


$(document).on('click', '.fa-adjust', function () { /*change theme preference function*/ 
    if ($('#theme').hasClass('light-background')) {
        darkThemeStyle()
        localStorage.setItem('theme', 'dark')

    } else if ($('#theme').hasClass('dark-background')) {
        lightThemeStyle()
        localStorage.setItem('theme', 'light')
    }
})


// LOCAL STORAGE

$( document ).ready(function(){ /* users theme prefence*/
    let theme = localStorage.getItem('theme')
    if(theme == 'dark'){
        darkThemeStyle()
    } else if (theme == 'light'){
        lightThemeStyle()
    }
})


let storagedTasks = {};
let retrieveTasks = JSON.parse(localStorage.getItem('storagedTasks'));
let taskList = Object.entries(retrieveTasks)

for (const [indexNum, text] of taskList) {
    if($('#theme').hasClass('light-background')){
        let htmlDivBlock = `<div class="task" data-index="${indexNum}"><div class="input-group">
        <div class="input-group-prepend"><span class="input-group-text"><i class="fa fa-check off">
        </i></span></div><div class="task-text"><p>${text}</p></div><div class="input-group-append">
        <span class="input-group-text"><i class="fa fa-edit"></i></span><span class="input-group-text">
        <i class="fa fa-trash"></i></span></div></div></div>`;
        $('.task-list').append(htmlDivBlock)
        storagedTasks[index] = text;
        index++
        
    }else if ($('#theme').hasClass('dark-background')) {
        let htmlDivBlock = `<div class="task" data-index="${indexNum}"><div class="input-group">
        <div class="input-group-prepend"><span class="input-group-text input-group-text-dark">
        <i class="fa fa-check fa-check-dark off"></i></span></div><div class="task-text task-text-dark">
        <p>${text}</p></div><div class="input-group-append"><span class="input-group-text input-group-text-dark">
        <i class="fa fa-edit"></i></span><span class="input-group-text input-group-text-dark">
        <i class="fa fa-trash"></i></span></div></div></div>`
        $('.task-list').append(htmlDivBlock)
        storagedTasks[index] = text;
        index++
    }
  }
