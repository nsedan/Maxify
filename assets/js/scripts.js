//ADD TASKS
$(document).on('click', '.fa-plus', function () {
    if ($('.form-control').val()) {
        let newTask = $('.form-control').val();
        let taskBlock = '<div class="task"><div class="input-group"><div class="input-group-prepend"><span class="input-group-text"><i class="fa fa-check off"></i></span></div><div class="task-text"><p>' + newTask + '</p></div><div class="input-group-append"><span class="input-group-text"><i class="fa fa-edit"></i></span><span class="input-group-text"><i class="fa fa-trash"></i></span></div></div></div>'
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
    } else if ($(this).hasClass('on')) {
        $(this).removeClass('on').addClass('off')
    }
});


//EDIT BUTTON
$(document).on('click', '.fa-edit', function () {
    $(this).closest('.task').remove();
    $('#overlay').css('display', 'block');
    // pop up input


});

$(document).on('click', '.edited-task', function () {
    if ($('.form-edit').val()) {
        $('#overlay').css('display', 'none');
        let editedTask = $('.form-edit').val();
        let taskEdit = '<div class="task"><div class="input-group"><div class="input-group-prepend"><span class="input-group-text"><i class="fa fa-check off"></i></span></div><div class="task-text"><p>' + editedTask + '</p></div><div class="input-group-append"><span class="input-group-text"><i class="fa fa-edit"></i></span><span class="input-group-text"><i class="fa fa-trash"></i></span></div></div></div>'
        $('.task-list').append(taskEdit)
        $('.form-edit').val("")
    } else {
        alert("'Nothing' is not a task!")
    }
})

