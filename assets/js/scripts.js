$('.fa-plus').click(function () {
    if ($('.form-control').val()) {
        let newTask = $('.form-control').val();
        let taskBlock = '<div class="task"><div class="input-group"><div class="input-group-prepend"><div class="input-group-text"><input class="checkbox" type="checkbox"></div></div><div class="task-text"><span>' + newTask + '</span></div><div class="input-group-append"><span class="input-group-text"><i class="fa fa-edit"></i></span><span class="input-group-text"><i class="fa fa-trash"></i></span></div></div></div>'
        $('.task-list').append(taskBlock)
        $('.form-control').val("")
    } else {
        alert('Empty')
    }
})



$('.fa-trash').click(function () {
    $(".task").remove();
})
