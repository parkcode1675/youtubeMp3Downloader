const YTDL = require("@yohancolla/ytdl");
window.$ = window.jQuery = require('jquery');

function download(url,path){
    //Configure YoutubeDownloader with your settings
    var ytdl = new YTDL({
        "outputPath": path + '\\',                     // Output file location (default: the home directory)
        "queueParallelism": 2,                  // Download parallelism (default: 1)
        "progressTimeout": 2000,                // Interval in ms for the progress reports (default: 1000)
        "deleteTimeout": 60                     // Interval in seconds for delete the file (default: 0 [no delete])
    });

    // url
    // https://www.youtube.com/watch?v=tvdoDwwSf4Q
    // https://www.youtube.com/watch?v=uwnPp0A2NwY

    if(urlValidation(url) && pathValiation(path)){
        ytdl.toMp3(url, "highestaudio");

        let id = url.substring(url.indexOf('?v=') + 3,url.length) ;

        let date = new Date();

        document.getElementById('DownBtn').className = 'fluid ui green button disabled loading';

        ytdl.on("finish", function(err, data) {
            console.log(JSON.stringify(data));

            let htmlF = "";

            htmlF += '<div class="sixteen wide column">' +
                     'Artist : ' + data.author.artist + '<br>' +
                     'Title : ' + data.author.title + '<br>' +
                     'Output : ' + data.output + '<br>' +
                     'Timestamp : ' + date + '<br>' +
                     '</div>' +
                     '<div class="ui divider"></div>';

            $('#History').prepend(htmlF);

            document.getElementById('DownBtn').className = 'fluid ui green button';
        });
    
        ytdl.on("error", function(error) {
            console.log(error);

            $('#Progress').prepend(JSON.stringify(error));

            document.getElementById('DownBtn').className = 'fluid ui green button';
        });
    
        ytdl.on("progress", function(progress) {
            console.log(JSON.stringify(progress));

            let htmlP = "";
            
            htmlP += '<div class="sixteen wide column">' +
                     'Id : ' + id + '<br>' +
                     'Percent : ' + Math.floor(progress.progress.percentage) + '%' + '<br>' +
                     'Timestamp : ' + date + '<br>' +
                     '</div>' +
                     '<div class="ui divider"></div>';

            console.log(htmlP);

            $('#Progress').prepend(htmlP);

        });
    }
}

function urlValidation(url){
    if(!url){
        $('#Progress').prepend('url empty <br><div class="ui divider"></div>');
        return false;
    }else{
        if(url.includes('https://www.youtube.com/watch?v')){
            return true;
        }else{
            $('#Progress').prepend('url must have https://www.youtube.com/watch?v <br><div class="ui divider"></div>');
            return false;
        }
    }
}

function pathValiation(path){
    if(!path){
        $('#Progress').prepend('path empty <br><div class="ui divider"></div>');
        return false;
    }else{
        return true;
    }
}