;
var link = (function() {
    var url_pipe = function(url) {
        return './database/' + url
    }

    return function(url) {
        url = url_pipe(url);

        fetch(url)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                console.log(data.title, data)
            }, function() {
                //   404文章不存在
            });
    }
})();
