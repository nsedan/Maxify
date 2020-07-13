//ADD TASKS
let index = 0;

$(document).on('click', '.fa-plus', function () {
    if ($('.form-control').val()) {
        let newTask = $('.form-control').val();
        let taskBlock = '<div class="task" data-index="' + index + '"' + '><div class="input-group"><div class="input-group-prepend"><span class="input-group-text"><i class="fa fa-check off"></i></span></div><div class="task-text"><p>' + newTask + '</p></div><div class="input-group-append"><span class="input-group-text"><i class="fa fa-edit"></i></span><span class="input-group-text"><i class="fa fa-trash"></i></span></div></div></div>'
        index++
        $('.task-list').append(taskBlock)
        $('.form-control').val("")
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
        $()
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
})

$(document).on('click', '.fa-home', function () {
    $('.tasks-main').css('display', 'block')
    $('.trophy-section').css('display', 'none')
})

const completed = ' <span style="color: rgba(255, 0, 0, 0.623); text-decoration: none">COMPLETED</span>'

$(document).one("click", '.fa-plus', function () {
    setTimeout(function () {
        $('#trophy1').html('<span style="text-decoration: line-through;">Add a task!</span>' + completed);
        alert('Congratulations! You just earned a trophy!');
    }, 750);
}); // FIX, WORKS WITH EMPTY INPUT

$(document).one("click", '.fa-trash', function () {
    setTimeout(function () {
        $('#trophy2').html('<span style="text-decoration: line-through;">Delete a task!</span>' + completed);
        alert('Congratulations! You just earned a trophy!');
    }, 750);
});

$(document).one("click", '.fa-check', function () {
    setTimeout(function () {
        $('#trophy3').html('<span style="text-decoration: line-through;">Finish a task!</span>' + completed);
        alert('Congratulations! You just earned a trophy!');
    }, 750);
});

$(document).one("click", '.fa-pencil', function () {
    setTimeout(function () {
        $('#trophy4').html('<span style="text-decoration: line-through;">Edit a task!</span>' + completed);
        alert('Congratulations! You just earned a trophy!');
    }, 750);
});
