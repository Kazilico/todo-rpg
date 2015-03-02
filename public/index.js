var templates = {}

$(document).on("ready", function() {
	var templateString = $("#task-template").text()
	
	templates.task = Handlebars.compile(templateString)
	
	getAllTasks()
	getCompletedTasks()
	getIncompleteTasks()

	var viewAll = []
})

var getAllTasks = function(){
	$.ajax({
		url:"/tasks",
		method:"GET",

		success: createTaskHtml
	})
}

var getCompletedTasks = function(){
	$.ajax({
		url:"/tasks/complete",
		method:"GET",

		success: createTaskHtml

	})
}

var getIncompleteTasks = function(){
	$.ajax({
		url:"/tasks/incomplete",
		method:"GET",

		success: createTaskHtml

	})
}

var addTasks = function(){

	var data = {
		task:$("#task").val(),
		value:$("#point-value").val(),

	}
	$.ajax({
		url:"/tasks",
		method:"PUT",

		data: data,
		success: function(data) {
			getAllTasks()
		}
	})
}

var createTaskHtml = function(data) {
	$("#taskList").html("")

	_.each(data, function(task){
		var htmlString = templates.task(task)
		var $taskHtml = $(htmlString)
		$("#taskList").append($taskHtml)
		$taskHtml.on("click", function(){
			var id = $(this).attr("data-id")

			$.ajax({
				url:"/tasks/" + id + "/close",
				method: "POST",

				success: function(data) {
					getAllTasks()
				}

			})
		})
	})
}


$("#viewAll").on("click", function(){
	getAllTasks()
})

$("#viewComplete").on("click", function(){
	getCompletedTasks()
})

$("#viewIncomplete").on("click", function(){
	getIncompleteTasks()
})

$("#new-task-button").on("click", function(){
	addTasks()
})