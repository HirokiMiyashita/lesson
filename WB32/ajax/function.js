$.ajax({
        url: 'index.php',
        type: 'GET'
    })

    .done((data, type) => {
        $('#output').text(data);
        console.log(data);

    })

    .fail((XMLHttpRequest, textStatus, errorThrown) => {
        $('#output').text(textStatus);
        console.log(textStatus);
    })

    .always((XMLHttpRequest, textStatus) => {
        $('#output').text(textStatus);
        console.log(textStatus);
    })
