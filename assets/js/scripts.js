let index = 0;
let storagedTasks = [];
let retrieveTasks = JSON.parse(localStorage.getItem('storagedTasks')) || [];

// LOCAL STORAGE
$(document).ready(function () { /* users theme prefence*/
    let theme = localStorage.getItem('theme')
    if (theme == 'dark') {
        darkThemeStyle()
    } else if (theme == 'light') {
        lightThemeStyle()
    }
    storagedTasks = retrieveTasks

    for (const [lsIndex, task] of retrieveTasks.entries()) {
        function completedTask() {
            $('.task').each(function () {
                if (task.completed === true) {
                    if ($(this).data('index') === lsIndex) {
                        $(this).find('.fa-check').removeClass('off').addClass('on');
                    }
                }
            });
        }
        /* saved tasks will load on refresh*/
        if ($('#theme').hasClass('light-background')) {
            let taskBlock = `<div class="task" data-index="${lsIndex}"><div class="input-group">
            <div class="input-group-prepend"><span class="input-group-text"><i class="fa fa-check off">
            </i></span></div><div class="task-text"><p>${task.text}</p></div><div class="input-group-append">
            <span class="input-group-text"><i class="fa fa-edit"></i></span><span class="input-group-text">
            <i class="fa fa-trash"></i></span></div></div></div>`;
            $('.task-list').append(taskBlock)
            completedTask()
            index++

        } else if ($('#theme').hasClass('dark-background')) {
            let taskBlock = `<div class="task" data-index="${lsIndex}"><div class="input-group">
            <div class="input-group-prepend"><span class="input-group-text input-group-text-dark">
            <i class="fa fa-check fa-check-dark off"></i></span></div><div class="task-text task-text-dark">
            <p>${task.text}</p></div><div class="input-group-append"><span class="input-group-text input-group-text-dark">
            <i class="fa fa-edit"></i></span><span class="input-group-text input-group-text-dark">
            <i class="fa fa-trash"></i></span></div></div></div>`
            $('.task-list').append(taskBlock)
            completedTask()
            index++
        }
    }
})

//ADD TASKS
function taskBlock() {
    if ($('#theme').hasClass('light-background')) {
        let newTaskText = $('.form-control').val();
        let taskBlock = `<div class="task" data-index="${index}"><div class="input-group">
        <div class="input-group-prepend"><span class="input-group-text"><i class="fa fa-check off">
        </i></span></div><div class="task-text"><p>${newTaskText}</p></div><div class="input-group-append">
        <span class="input-group-text"><i class="fa fa-edit"></i></span><span class="input-group-text">
        <i class="fa fa-trash"></i></span></div></div></div>`;
        storagedTasks.push({
            text: newTaskText,
            completed: false,
        });
        $('.task-list').append(taskBlock)

    } else if ($('#theme').hasClass('dark-background')) {
        let newTaskText = $('.form-control').val();
        let taskBlock = `<div class="task" data-index="${index}"><div class="input-group">
        <div class="input-group-prepend"><span class="input-group-text input-group-text-dark">
        <i class="fa fa-check fa-check-dark off"></i></span></div><div class="task-text task-text-dark">
        <p>${newTaskText}</p></div><div class="input-group-append"><span class="input-group-text input-group-text-dark">
        <i class="fa fa-edit"></i></span><span class="input-group-text input-group-text-dark">
        <i class="fa fa-trash"></i></span></div></div></div>`
        storagedTasks.push({
            text: newTaskText,
            completed: false,
        });
        $('.task-list').append(taskBlock)
    }
    localStorage.setItem('storagedTasks', JSON.stringify(storagedTasks));
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
    /*delete from local storage*/
    storagedTasks = []
    $('.task').each(function () {
        let text = $(this).find('p').text()
        let status;
        if ($(this).find('i').hasClass('off')) {
            status = false
        } else {
            status = true
        }
        storagedTasks.push({
            text: text,
            completed: status,
        });
    });
    retrieveTasks = storagedTasks
    localStorage.setItem('storagedTasks', JSON.stringify(storagedTasks));

});



//CHECK BUTTON
$(document).on('click', '.fa-check', function () {
    const $task = $(this).closest('.task')
    const text = ($task.find('p').text())
    const dataIndex = $task.data("index")
    if ($(this).hasClass('off')) {
        $(this).removeClass('off').addClass('on');
        for ([lsIndex, task] of storagedTasks.entries()) {
            if (lsIndex === dataIndex) {
                task.text = text
                task.completed = true
                localStorage.setItem('storagedTasks', JSON.stringify(storagedTasks));
                return false
            }
        }

    } else if ($(this).hasClass('on')) {
        $(this).removeClass('on').addClass('off')
        for ([lsIndex, task] of storagedTasks.entries()) {
            if (lsIndex === dataIndex) {
                task.text = text
                task.completed = false
                localStorage.setItem('storagedTasks', JSON.stringify(storagedTasks));
                return false
            }
        }
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
            let tasks = JSON.parse(localStorage.getItem('storagedTasks'))
            tasks = tasks.map(function (task, index) {
                if (dataIndex === index) {
                    task.text = editedTask
                }
                return task
            })
            storagedTasks = tasks
            localStorage.setItem('storagedTasks', JSON.stringify(tasks))
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

const completed = '<span style="color: rgba(255, 0, 0, 0.8); text-decoration: none"> COMPLETED</span>'

let trophy1Awarded = false;

const firstTrophyPopUp = function () {
    const trophy1 = `<div class="pop-up-trophy"><p class="pop-up-close">x</p>
    <h6>Congratulations on creating your first task!</h6><h6>You just earned a trophy!</h6></div>`
    setTimeout(function () {
        $('#trophy1').html('<span style="text-decoration: line-through;">Add a task!</span>' + completed);
        $('header').append(trophy1)
    }, 750);
};

const firstTrophyDarkPopUp = function () {
    const trophy1 = `<div class="pop-up-trophy pop-up-trophy-dark"><p class="pop-up-close">x</p>
    <h6>Congratulations on creating your first task!</h6><h6>You just earned a trophy!</h6></div>`
    setTimeout(function () {
        $('#trophy1').html('<span style="text-decoration: line-through;">Add a task!</span>' + completed);
        $('header').append(trophy1)
    }, 750);
};

$(document).one("click", '.fa-trash', function () { /* deleted task trophy*/
    const trophy2 = `<div class="pop-up-trophy"><p class="pop-up-close">x</p>
    <h6>You deleted a task and earned a trophy!</h6></div>`
    const trophy2Dark = `<div class="pop-up-trophy pop-up-trophy-dark">
    <p class="pop-up-close">x</p><h6>You deleted a task and earned a trophy!</h6></div>`

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
    const trophy3 = `<div class="pop-up-trophy"><p class="pop-up-close">x</p>
    <h6>Kudos on finishing your first task!</h6><h6>You just earned a trophy!</h6></div>`
    const trophy3Dark = `<div class="pop-up-trophy pop-up-trophy-dark"><p class="pop-up-close">x</p>
    <h6>Kudos on finishing your first task!</h6><h6>You just earned a trophy!</h6></div>`

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
    const trophy4 = `<div class="pop-up-trophy"><p class="pop-up-close">x</p>
    <h6>Now you know how to edit a task. You earned another trophy!</h6></div>`
    const trophy4Dark = `<div class="pop-up-trophy pop-up-trophy-dark"><p class="pop-up-close">x</p>
    <h6>Now you know how to edit a task. You earned another trophy!</h6></div>`

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

$(document).on('click', '.pop-up-close', function () { /*close popup after a trophy is awarded*/
    $('.pop-up-trophy').css('display', 'none')
})


// THEME CHANGE
const darkThemeStyle = function () {
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

const lightThemeStyle = function () {
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

