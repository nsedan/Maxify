
$(document).on('click', '.fa-plus', function(){
    if ($('.form-control').val()) {
        let newTask = $('.form-control').val();
        let taskBlock = '<div class="task"><div class="input-group"><div class="input-group-prepend"><div class="input-group-text"><input class="checkbox" type="checkbox"></div></div><div class="task-text">'+newTask+'</div><div class="input-group-append"><span class="input-group-text"><i class="fa fa-edit"></i></span><span class="input-group-text"><i class="fa fa-trash"></i></span></div></div></div>'
        $('.task-list').append(taskBlock)
        $('.form-control').val("")
    } else {
        alert("'Nothing' is not a task!")
    }
})


$(document).on('click', '.fa-trash', function(){
    $(this).closest('.task').remove();
});