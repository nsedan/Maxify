//ADD TASKS
let index = 0;

const addTask = function () {
    let newTask = $('.form-control').val();
    let taskBlock = '<div class="task" data-index="' + index + '"' + '><div class="input-group"><div class="input-group-prepend"><span class="input-group-text"><i class="fa fa-check off"></i></span></div><div class="task-text"><p>' + newTask + '</p></div><div class="input-group-append"><span class="input-group-text"><i class="fa fa-edit"></i></span><span class="input-group-text"><i class="fa fa-trash"></i></span></div></div></div>'
    index++
    $('.task-list').append(taskBlock)
    $('.form-control').val("")
};

$(document).on("click", '.fa-plus', function () {
    $('.pop-up-trophy').remove()
    if ($('.form-control').val()) {
        if (!trophy1Awarded) {
            addTask();
            firstTrophyPopUp();
            trophy1Awarded = true
        } else {
            addTask();
        }
    } else {
        alert("'Nothing' is not a task!")
    }
})

//DELETE BUTTON
$(document).on('click', '.fa-trash', function () {
    $(this).closest('.task').remove();
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
const overlay = '<div id="overlay"><div class="input-group input-edit"><input type="text" class="form-control form-edit" placeholder="Edit Task" maxlength="20"><div class="input-group-append"><span class="input-group-text"><i class="fa fa-pencil edited-task"></i></span></div></div></div>'

$(document).on('click', '.fa-edit', function () {
    $('.tasks-main').append(overlay)
    const $task = $(this).closest('.task')
    const $overlay = $('#overlay');
    onEdit($task, $overlay)
});

function onEdit($task, $overlay) {
    const currentValue = $task.find('p').text()
    $overlay.find('.form-edit').val(currentValue)
    $overlay.find('.edited-task').click(function () {
        let editedTask = $overlay.find('.form-edit').val();
        if (editedTask) {
            $task.find('p').text(editedTask)
            $overlay.remove()
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

const completed = ' <span style="color: rgba(255, 0, 0, 0.623); text-decoration: none">COMPLETED</span>'

let trophy1Awarded = false;

const firstTrophyPopUp = function () {
    const trophy1 = '<div class="pop-up-trophy"><p class="pop-up-close">x</p><h6>Congratulations on creating your first task!</h6><h6>You just earned a trophy!</h6></div>'
    setTimeout(function () {
        $('#trophy1').html('<span style="text-decoration: line-through;">Add a task!</span>' + completed);
        $('header').append(trophy1)
    }, 750);
};

$(document).one("click", '.fa-trash', function () {
    const trophy2 = '<div class="pop-up-trophy"><p class="pop-up-close">x</p><h6>You deleted a task and earned a trophy!</h6></div>'
    $('.pop-up-trophy').remove()
    setTimeout(function () {
        $('#trophy2').html('<span style="text-decoration: line-through;">Delete a task!</span>' + completed);
        $('header').append(trophy2)
    }, 750);
});

$(document).one("click", '.fa-check', function () {
    const trophy3 = '<div class="pop-up-trophy"><p class="pop-up-close">x</p><h6>Kudos on finishing your first task!</h6><h6>You just earned a trophy!</h6></div>'
    $('.pop-up-trophy').remove()
    setTimeout(function () {
        $('#trophy3').html('<span style="text-decoration: line-through;">Finish a task!</span>' + completed);
        $('header').append(trophy3)
    }, 750);
});

$(document).one("click", '.fa-pencil', function () {
    const trophy4 = '<div class="pop-up-trophy"><p class="pop-up-close">x</p><h6>You edited a task and earned another trophy!</h6></div>'
    $('.pop-up-trophy').remove()
    setTimeout(function () {
        $('#trophy4').html('<span style="text-decoration: line-through;">Edit a task!</span>' + completed);
        $('header').append(trophy4)
    }, 750);
});

$(document).on('click', '.pop-up-close', function () {
    $('.pop-up-trophy').css('display', 'none')
})
