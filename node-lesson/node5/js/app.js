const send = document.getElementById('form_get');
const nameButton = document.getElementById('name_button');
const form = document.getElementById('form');
const update = document.getElementById('update');
const searchUpdate = document.getElementById('searchUpdate');
send.addEventListener('click', function() {
    console.log("hello");
    var send_data = {
        name: $('input[name="name_get"]').val(),
        val1: $('input[name="val1_get"]').val(),
        val2: $('input[name="val2_get"]').val(),
    };
    $.ajax({
        url: "/users",
        type: "POST",
        data: send_data
    }).done(function(data, status, xhr) {
        $('#output').empty();
        console.log(data);
        for (var item = 0; item < data.length; item++) {
            $("#output").append('<li>name:' + data[item].name + "　" + "val1:" + data[item].val1 + "　" + "val2:" + data[item].val2 + '</li>');
        }
    })
})
nameButton.addEventListener('click', function() {
    if (document.getElementById('name').value == "") {
        const data = {
            sort: Number(document.getElementById('sort').value),
            number: Number(document.getElementById('number').value),
            offset: Number(document.getElementById('offset').value)
        }
        console.log(data);
        $.ajax({
            url: '/users',
            data: data,
            type: "GET",
        }).done(function(data, status, xhr) {
            $('#output').empty();
            for (var i = 0; i < data.length; i++) {
                $("#output").append('<li>name:' + data[i].name + "　" + "val1:" + data[i].val1 + "　" + "val2:" + data[i].val2 + '</li>');
            }
        })
    } else {
        const url = "/users/" + document.getElementById('name').value;
        console.log(url);
        $.ajax({
            url: url,
            type: "GET",
        }).done(function(data, status, xhr) {
            $('#output').empty();
            for (var i = 0; i < data.length; i++) {
                $("#output").append('<li>name:' + data[i].name + "　" + "val1:" + data[i].val1 + "　" + "val2:" + data[i].val2 + '</li>');
            }
        })
    }
})

form.addEventListener('click', function() {
    let data = {
        delete: document.getElementById('delete').value
    }
    $.ajax({
        url: "/delete",
        data: data,
        type: "POST",
    }).done(function(data, status, xhr) {
        $('#output').empty();
        for (var i = 0; i < data.length; i++) {
            $("#output").append('<li>name:' + data[i].name + "　" + "val1:" + data[i].val1 + "　" + "val2:" + data[i].val2 + '</li>');
        }
    })
})
searchUpdate.addEventListener('click', function() {
    let searchform = { name: document.getElementById('searchform').value }
    $.ajax({
        url: "/search",
        data: searchform,
        type: "GET",
    }).done(function(data, status, xhr) {
        $('#output').empty();
        console.log(data);
        document.getElementById('searchName').value = data[0].name;
        document.getElementById('searchVal1').value = data[0].val1;
        document.getElementById('searchVal2').value = data[0].val2;
        document.getElementById('searchSignup').value = data[0].signup
    })
})
update.addEventListener('click', function() {
    let data = {
        name: document.getElementById('searchName').value,
        val1: document.getElementById('searchVal1').value,
        val2: document.getElementById('searchVal2').value,
        signup: document.getElementById('searchSignup').value
    }
    $.ajax({
        url: "/search",
        data: data,
        type: "PUT",
    }).done(function(data, status, xhr) {
        $('#output').empty();
        $('#searchform').empty();
        $('#searchName').empty();
        $('#searchVal1').empty();
        $('#searchVal2').empty();
        $('#searchSignup').empty();
        for (var i = 0; i < data.length; i++) {
            $("#output").append('<li>name:' + data[i].name + "　" + "val1:" + data[i].val1 + "　" + "val2:" + data[i].val2 + '</li>');
        }
    })
})