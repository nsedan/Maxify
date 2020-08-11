let index = 0;
let taskDivBlock;
let storagedTasks = [];
let retrieveTasks = JSON.parse(localStorage.getItem('storagedTasks')) || [];

let completedTrophies = []
let retrieveTrophies = JSON.parse(localStorage.getItem('completedTrophies')) || [];

let finishedTasks = 0;
let retrieveFinishedTasks = JSON.parse(localStorage.getItem('finishedTasks')) || [];


// LOCAL STORAGE
$(document).ready(function () { /* users theme prefence*/
    let theme = localStorage.getItem('theme')
    if (theme == 'dark') {
        darkThemeStyle()
    } else {
        lightThemeStyle()
    }
    firstTimeEnter()
    storagedTasks = retrieveTasks
    completedTrophies = retrieveTrophies
    localStorage.setItem('completedTrophies', JSON.stringify(completedTrophies));
    reloadTasks()
    reloadTrophies()
    finishedTasks = retrieveFinishedTasks
})

function completedTask(task, lsIndex) {
    $('.task').each(function () {
        if (task.completed === true) {
            if ($(this).data('index') === lsIndex) {
                $(this).find('.fa-check').removeClass('off').addClass('on');
            }
        }
    });
}

function reloadTasks() { /* saved tasks will load on refresh*/
    for (const [lsIndex, task] of retrieveTasks.entries()) {
        let taskBlockLight = `<div class="task" data-index="${lsIndex}"><div class="input-group">
            <div class="input-group-prepend"><span class="input-group-text"><i class="fa fa-check off">
            </i></span></div><div class="task-text"><p>${task.text}</p></div><div class="input-group-append">
            <span class="input-group-text"><i class="fa fa-edit"></i></span><span class="input-group-text">
            <i class="fa fa-trash"></i></span></div></div></div>`;
        let taskBlockDark = `<div class="task" data-index="${lsIndex}"><div class="input-group">
            <div class="input-group-prepend"><span class="input-group-text input-group-text-dark">
            <i class="fa fa-check fa-check-dark off"></i></span></div><div class="task-text task-text-dark">
            <p>${task.text}</p></div><div class="input-group-append"><span class="input-group-text input-group-text-dark">
            <i class="fa fa-edit"></i></span><span class="input-group-text input-group-text-dark">
            <i class="fa fa-trash"></i></span></div></div></div>`

        if ($('#theme').hasClass('light-background')) { taskDivBlock = taskBlockLight }
        else { taskDivBlock = taskBlockDark }
        $('.task-list').append(taskDivBlock)
        completedTask(task, lsIndex)
        index++
    }
}

function reloadTrophies() { /* saved trophies will load on refresh*/
    if (retrieveTrophies.includes('firstTaskTrophy')) {
        $('#addTaskTrophy').html(`<span style="text-decoration: line-through;">Add a task!</span>${completed}`)
    }
    if (retrieveTrophies.includes('editTaskTrophy')) {
        $('#editTaskTrophy').html(`<span style="text-decoration: line-through;">Edit a task!</span>${completed}`)
    }
    if (retrieveTrophies.includes('deleteTaskTrophy')) {
        $('#deleteTaskTrophy').html(`<span style="text-decoration: line-through;">Delete a task!</span>${completed}`)
    }
    if (retrieveTrophies.includes('checkTaskTrophy')) {
        $('#finishTaskTrophy').html(`<span style="text-decoration: line-through;">Finish a task!</span>${completed}`)
    }
    if (retrieveTrophies.includes('finish10TasksTrophy')) {
        $('#finish10TasksTrophy').html(`<span style="text-decoration: line-through;">Finish 10 tasks!</span>${completed}`)
    }
    if (retrieveTrophies.includes('finish20TasksTrophy')) {
        $('#finish20TasksTrophy').html(`<span style="text-decoration: line-through;">Finish 20 tasks!</span>${completed}`)
    }
}

function dataIndexReset() { /* after deleting or adding a task data-index of task will reorder to avoid jumps in index number*/
    $('.task').remove()
    retrieveTasks = storagedTasks
    reloadTasks()
}

let firstTime = localStorage.getItem('intro')
const popUpIntro = `<div class="pop-up-intro"><p class="pop-up-close">x</p><h3>Welcome to Maxify!</h3>
<h6>The propose of this app is to manage tasks to increase personal productivity</h6><h5>Here you can:</h5>
<ul><li>Add new tasks</li><li>Edit tasks</li><li>Mark tasks as finished</li><li>Delete tasks</li><li>Change to dark mode</li></ul></div>`

let firstTimeEnter = () => {
    if (!firstTime) {
        $('header').append(popUpIntro)
        localStorage.setItem('intro', true);
    }
}

//ADD TASKS
function taskBlock() {
    let newTaskText = $('.form-control').val();
    let repeatedTask = storagedTasks.some((task) => { return task.text === newTaskText })
    let taskBlockLight = `<div class="task" data-index="${index}"><div class="input-group">
        <div class="input-group-prepend"><span class="input-group-text"><i class="fa fa-check off">
        </i></span></div><div class="task-text"><p>${newTaskText}</p></div><div class="input-group-append">
        <span class="input-group-text"><i class="fa fa-edit"></i></span><span class="input-group-text">
        <i class="fa fa-trash"></i></span></div></div></div>`;
    let taskBlockDark = `<div class="task" data-index="${index}"><div class="input-group">
        <div class="input-group-prepend"><span class="input-group-text input-group-text-dark">
        <i class="fa fa-check fa-check-dark off"></i></span></div><div class="task-text task-text-dark">
        <p>${newTaskText}</p></div><div class="input-group-append"><span class="input-group-text input-group-text-dark">
        <i class="fa fa-edit"></i></span><span class="input-group-text input-group-text-dark">
        <i class="fa fa-trash"></i></span></div></div></div>`
    let pushTaskToLS = () => storagedTasks.push({ text: newTaskText, completed: false });

    if ($('#theme').hasClass('light-background')) { taskDivBlock = taskBlockLight }
    else { taskDivBlock = taskBlockDark }

    $('.task-list').append(taskDivBlock)
    pushTaskToLS()
    localStorage.setItem('storagedTasks', JSON.stringify(storagedTasks));
    dataIndexReset()

    if (repeatedTask) { alert('Beware! A task with that name already exists.') }
}

function taskFunction() {/* Main function to add new tasks*/
    let newTaskText = $('.form-control').val();
    popupRemove()
    if (newTaskText) {
        if (!retrieveTrophies.includes('firstTaskTrophy')) {
            setTimeout(function () {
                if ($('#theme').hasClass('light-background')) { firstTrophyPopUp() }
                else { firstTrophyDarkPopUp() }
            }, 500);
            completedTrophies.push('firstTaskTrophy')
            localStorage.setItem('completedTrophies', JSON.stringify(completedTrophies));
        }
    } else {
        alert("'Nothing' is not a task!")
    }
    taskBlock()
    index++
    $('.form-control').val("")
}

$(document).on("click", '.fa-plus', () => { taskFunction() })

$(document).on("keypress", '#main-input', (event) => {
    const keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') { taskFunction() }
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
    localStorage.setItem('storagedTasks', JSON.stringify(storagedTasks));
    dataIndexReset()
});


//CHECK BUTTON
$(document).on('click', '.fa-check', function () {
    const $task = $(this).closest('.task')
    const text = $task.find('p').text()
    const dataIndex = $task.data("index")
    if ($(this).hasClass('off')) {
        $(this).removeClass('off').addClass('on');
        for (let [lsIndex, task] of retrieveTasks.entries()) {
            if (lsIndex === dataIndex) {
                task.text = text
                task.completed = true
                localStorage.setItem('storagedTasks', JSON.stringify(storagedTasks));

                finishedTasks++
                localStorage.setItem('finishedTasks', JSON.stringify(finishedTasks));
                finishedTasks_10n20()
            }
        }
    } else {
        $(this).removeClass('on').addClass('off')
        for (let [lsIndex, task] of retrieveTasks.entries()) {
            if (lsIndex === dataIndex) {
                task.text = text
                task.completed = false
                localStorage.setItem('storagedTasks', JSON.stringify(storagedTasks));

                finishedTasks--
                localStorage.setItem('finishedTasks', JSON.stringify(finishedTasks));
                finishedTasks_10n20()
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
    } else {
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
                } return task
            })
            storagedTasks = tasks
            localStorage.setItem('storagedTasks', JSON.stringify(tasks))
        } else {
            alert("Task cannot be empty!")
        }
    })
}

//ACHIEVMENTS
const popupRemove = () => { $('.pop-up-trophy').remove(); $('.pop-up-intro').hide() }

$(document).on('click', '.fa-trophy', () => {
    $('.tasks-main').hide()
    $('.trophy-section').show()
    popupRemove()
})

$(document).on('click', '.fa-home', () => {
    $('.tasks-main').show()
    $('.trophy-section').hide()
    popupRemove()
})

const completed = '<span style="color: rgba(255, 0, 0, 0.8); text-decoration: none"> COMPLETED</span>'

const firstTrophyPopUp = function () {
    const addTaskTrophy = `<div class="pop-up-trophy"><p class="pop-up-close">x</p>
    <h6>Congratulations on creating your first task!</h6><h6>You just earned a trophy!</h6></div>`
    $('#addTaskTrophy').html(`<span style="text-decoration: line-through;">Add a task!</span>${completed}`);
    $('header').append(addTaskTrophy)
};
const firstTrophyDarkPopUp = function () {
    const addTaskTrophy = `<div class="pop-up-trophy pop-up-trophy-dark"><p class="pop-up-close">x</p>
    <h6>Congratulations on creating your first task!</h6><h6>You just earned a trophy!</h6></div>`
    $('#addTaskTrophy').html(`<span style="text-decoration: line-through;">Add a task!</span>${completed}`);
    $('header').append(addTaskTrophy)
};

$(document).one("click", '.fa-trash', function () { /* deleted task trophy*/
    const deleteTaskTrophy = `<div class="pop-up-trophy"><p class="pop-up-close">x</p>
    <h6>You deleted a task and earned a trophy!</h6></div>`
    const deleteTaskTrophyDark = `<div class="pop-up-trophy pop-up-trophy-dark">
    <p class="pop-up-close">x</p><h6>You deleted a task and earned a trophy!</h6></div>`

    if (!retrieveTrophies.includes('deleteTaskTrophy')) {
        completedTrophies.push('deleteTaskTrophy')
        localStorage.setItem('completedTrophies', JSON.stringify(completedTrophies));
        popupRemove()
        setTimeout(function () {
            if ($('#theme').hasClass('light-background')) {
                $('#deleteTaskTrophy').html(`<span style="text-decoration: line-through;">Delete a task!</span>${completed}`);
                $('header').append(deleteTaskTrophy)
            } else {
                $('#deleteTaskTrophy').html(`<span style="text-decoration: line-through;">Delete a task!</span>${completed}`);
                $('header').append(deleteTaskTrophyDark)
            }
        }, 500);
    }
});

$(document).one("click", '.fa-check', function () { /* completed task trophy*/
    const finishTaskTrophy = `<div class="pop-up-trophy"><p class="pop-up-close">x</p>
    <h6>Kudos on finishing your first task!</h6><h6>You just earned a trophy!</h6></div>`
    const finishTaskTrophyDark = `<div class="pop-up-trophy pop-up-trophy-dark"><p class="pop-up-close">x</p>
    <h6>Kudos on finishing your first task!</h6><h6>You just earned a trophy!</h6></div>`

    if (!retrieveTrophies.includes('checkTaskTrophy')) {
        completedTrophies.push('checkTaskTrophy')
        localStorage.setItem('completedTrophies', JSON.stringify(completedTrophies));
        popupRemove()
        setTimeout(function () {
            if ($('#theme').hasClass('light-background')) {
                $('#finishTaskTrophy').html(`<span style="text-decoration: line-through;">Finish a task!</span>${completed}`);
                $('header').append(finishTaskTrophy)
            } else {
                $('#finishTaskTrophy').html(`<span style="text-decoration: line-through;">Finish a task!</span>${completed}`);
                $('header').append(finishTaskTrophyDark)
            }
        }, 500);
    }
});

$(document).one("click", '.fa-pencil', function () { /* edited task trophy*/
    const editTaskTrophy = `<div class="pop-up-trophy"><p class="pop-up-close">x</p>
    <h6>Now you know how to edit a task. You earned another trophy!</h6></div>`
    const editTaskTrophyDark = `<div class="pop-up-trophy pop-up-trophy-dark"><p class="pop-up-close">x</p>
    <h6>Now you know how to edit a task. You earned another trophy!</h6></div>`

    if (!retrieveTrophies.includes('editTaskTrophy')) {
        completedTrophies.push('editTaskTrophy')
        localStorage.setItem('completedTrophies', JSON.stringify(completedTrophies));
        popupRemove()
        setTimeout(function () {
            if ($('#theme').hasClass('light-background')) {
                $('#editTaskTrophy').html(`<span style="text-decoration: line-through;">Edit a task!</span>${completed}`);
                $('header').append(editTaskTrophy)
            } else {
                $('#editTaskTrophy').html(`<span style="text-decoration: line-through;">Edit a task!</span>${completed}`);
                $('header').append(editTaskTrophyDark)
            }
        }, 500);
    }
});

let finishedTasks_10n20 = () => { // trophies for 10 and 20 tasks completed
    const finish10TasksTrophy = `<div class="pop-up-trophy"><p class="pop-up-close">x</p>
    <h6>Congratulations! You have successfully completed 10 tasks.</h6></div>`
    const finish10TasksTrophyDark = `<div class="pop-up-trophy pop-up-trophy-dark"><p class="pop-up-close">x</p>
    <h6>Congratulations! You have successfully completed 10 tasks.</h6></div>`
    const finish20TasksTrophy = `<div class="pop-up-trophy"><p class="pop-up-close">x</p>
    <h6>Congratulations! You have successfully completed 20 tasks.</h6></div>`
    const finish20TasksTrophyDark = `<div class="pop-up-trophy pop-up-trophy-dark"><p class="pop-up-close">x</p>
    <h6>Congratulations! You have successfully completed 20 tasks.</h6></div>`

    if (!retrieveTrophies.includes('finish10TasksTrophy')) {
        if (finishedTasks === 10) {
            completedTrophies.push('finish10TasksTrophy')
            localStorage.setItem('completedTrophies', JSON.stringify(completedTrophies));
            popupRemove()
            setTimeout(() => {
                if ($('#theme').hasClass('light-background')) {
                    $('#finish10TasksTrophy').html(`<span style="text-decoration: line-through;">Finish 10 tasks!</span>${completed}`);
                    $('header').append(finish10TasksTrophy)
                } else {
                    $('#finish10TasksTrophy').html(`<span style="text-decoration: line-through;">Finish 10 tasks!</span>${completed}`);
                    $('header').append(finish10TasksTrophyDark)
                }
            }, 500);
        }
    }

    if (!retrieveTrophies.includes('finish20TasksTrophy')) {
        if (finishedTasks === 20) {
            completedTrophies.push('finish20TasksTrophy')
            localStorage.setItem('completedTrophies', JSON.stringify(completedTrophies));
            popupRemove()
            setTimeout(function () {
                if ($('#theme').hasClass('light-background')) {
                    $('#finish20TasksTrophy').html(`<span style="text-decoration: line-through;">Finish 20 tasks!</span>${completed}`);
                    $('header').append(finish20TasksTrophy)
                } else {
                    $('#finish20TasksTrophy').html(`<span style="text-decoration: line-through;">Finish 20 tasks!</span>${completed}`);
                    $('header').append(finish20TasksTrophyDark)
                }
            }, 500);
        }
    }
}
//close popup after a trophy is awarded
$(document).on('click', '.pop-up-close', () => { $('.pop-up-trophy').hide() })
$(document).on('click', '.pop-up-close', () => { $('.pop-up-intro').hide() })

// THEME CHANGE
const darkThemeStyle = () => {
    $('#theme').addClass('dark-background').removeClass('light-background');
    $('#maxify').css('text-shadow', '3px 3px rgb(99, 99, 99)');
    $('.links').addClass('links-dark')
    $('.input-group-text').addClass('input-group-text-dark')
    $('.form-control').addClass('form-control-dark')
    $('.task-text').addClass('task-text-dark')
    $('.fa-check').addClass('fa-check-dark')
    $('.pop-up-trophy').addClass('pop-up-trophy-dark')
    $('.pop-up-intro').addClass('pop-up-intro-dark')
    $('.trophy-div').addClass('trophy-div-dark')
}

const lightThemeStyle = () => {
    $('#theme').addClass('light-background').removeClass('dark-background')
    $('#maxify').css('text-shadow', '3px 3px rgb(43, 35, 155)');
    $('.links').removeClass('links-dark')
    $('.input-group-text').removeClass('input-group-text-dark')
    $('.form-control').removeClass('form-control-dark')
    $('.task-text').removeClass('task-text-dark')
    $('.fa-check').removeClass('fa-check-dark')
    $('.pop-up-trophy').removeClass('pop-up-trophy-dark')
    $('.pop-up-intro').removeClass('pop-up-intro-dark')
    $('.trophy-div').removeClass('trophy-div-dark')
}

$(document).on('click', '.fa-adjust', () => { /*change theme preference function*/
    if ($('#theme').hasClass('light-background')) {
        darkThemeStyle()
        localStorage.setItem('theme', 'dark')
    } else {
        lightThemeStyle()
        localStorage.setItem('theme', 'light')
    }
})




