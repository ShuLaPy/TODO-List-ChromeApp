//localStorage
let todos = new Array;
chrome.storage.local.get('todo', function(data){
        todos = JSON.parse(data.todo);
        for(let i = 0; i < todos.length; i++){
            $("ul").append(`<li>${todos[i]} <span class="fas icon-minus-circle"></span></li>`);
        }
});

const get_todos = () => {
    return todos
}

//---------------------
$("ul").on("click", "li", function () {
    $(this).toggleClass("completed");
})


$("ul").on("click", "span", function (event) {
    $(this).parent().fadeOut(500, function () {
        let id = $(this).index();
    	let todos = get_todos();
    	todos.splice(id, 1);
        let theValue = JSON.stringify(todos);
        chrome.storage.local.set({'todo': theValue});
        $(this).remove();
    });
    event.stopPropagation();
})

$("input[type='text']").keypress(function (event) {
    if (event.which === 13) {
        let text = $(this).val();

        //localStorage
        let todos = get_todos();
        todos.push(text);
        let theValue = JSON.stringify(todos);
        chrome.storage.local.set({'todo': theValue});
        //----------------

        $(this).val("");
        $("ul").append(`<li>${text} <span class="fas icon-minus-circle"></span></li>`);
    }
})

$(".icon-plus-circle").click(function () {
    $("input[type='text']").fadeToggle("fast");
})