let index = 0;
const overlay = '<div id="overlay"><div class="input-group input-edit"><input type="text" class="form-control form-edit" placeholder="Edit Task" maxlength="20"><div class="input-group-append"><span class="input-group-text"><i class="fa fa-pencil edited-task"></i></span></div></div></div>'

//ADD TASKS
$(document).on('click', '.fa-plus', function () {
    if ($('.form-control').val()) {
        let newTask = $('.form-control').val();
        let taskBlock = '<div class="task" ' + 'data-index="' + index + '"' + '><div class="input-group"><div class="input-group-prepend"><span class="input-group-text"><i class="fa fa-check off"></i></span></div><div class="task-text"><p>' + newTask + '</p></div><div class="input-group-append"><span class="input-group-text"><i class="fa fa-edit"></i></span><span class="input-group-text"><i class="fa fa-trash"></i></span></div></div></div>'
        index++
        $('.task-list').append(taskBlock)
        $('.form-control').val("")
    } else {
        alert("'Nothing' is not a task!")
    }
    console.log('index', index)
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
$(document).on('click', '.fa-edit', function () {
    $('.container').append(overlay)
    const $task = $(this).closest('.task')
    const $overlay = $('#overlay');
    onEdit($task, $overlay)

});

function onEdit($task, $overlay) {
    console.log('no es el mismo', $task)
    const currentValue = $task.find('p').text()
    
    $overlay.find('.form-edit').val(currentValue)

    $overlay.find('.edited-task').click(function () {
        let editedTask = $overlay.find('.form-edit').val();
        console.log(editedTask)
        if (editedTask) {
            
            $task.find('p').text(editedTask)
            
            $overlay.remove()
        } else {
            alert("Task cannot be empty!")
        }
    })
}

