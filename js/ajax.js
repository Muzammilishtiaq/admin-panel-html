
// api data fetch ajax start======
function livestreamloadajax() {
    $.ajax({
        type: "GET",
        url: "http://localhost/admin-panel/Data/data.json",
        dataType: "json",
        success: function (response) {
            // console.log(response.livestreamArray);
            displaylivestream(response.livestreamArray);
            displayuploadvideo(response.uploadvideoArray);
        },
        error: function (error) {
            console.log(error)
        }
    });
}
// stream.html page function start====
function displaylivestream(livestreamcard) {
    // console.log(livestreamcard)
    let cardlist = '';
    livestreamcard.forEach((viditem, index) => {
        // console.log('card list', viditem.liveimg);
        cardlist += `
    <div class="col position-relative" ${index}>
  <a href="#" onclick="streamchangevideo('${viditem.liveUrl}','application/x-mpegURL')" >
  <div class="" style="width: 18rem;">
  <img src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/WhatCarCanYouGetForAGrand.jpg" class="card-img-top" alt="...">
  <h4 class="text-white">${viditem.liveTitle}</h4>
</div>
  </a>
    <h6 class="text-white bg-danger position-absolute top-0 ms-3 mt-5 fw-bold  p-1 rounded">Live ${index + 1}</h6>
</div>
        `;
    });
    if (livestreamcard.length != 0) {
        // uploadtableBody.innerHTML = html;
        $('#card-container-live-stream').html(cardlist);
    } else {
        // uploadtableBody.innerHTML = 'upload video 0'
        $('#card-container-live-stream').html('live stream  Video Is Not Found');
    }
}
// stream.html page function end====



// index.html upload video page function start====
function displayuploadvideo(uploadvideocard) {
    console.log(uploadvideocard)
    let cardlist = '';
    uploadvideocard.forEach((viditem, index) => {
        console.log('card list', viditem);
        cardlist += `
        <div class=" videouploadcard  col" ${index}>
        <a href="#" onclick="indexchangevideo('${viditem.uploadvideoUrl}','video/mp4')"  >
        <img src="${viditem.uploadvideoImgUrl}" class="uploadimg" alt=""></a>
        <h6 class="text-white" style="font-size:20px">${viditem.uploadvideoTile}</h6>
    </div>
        `;
    });
    if (uploadvideocard.length != 0) {
        // uploadtableBody.innerHTML = html;
        $('#card-container-upload-video').html(cardlist);
    } else {
        // uploadtableBody.innerHTML = 'upload video 0'
        $('#card-container-upload-video').html('Video Is Not Found');
    }
}

// index.html page upload video function end====



$(document).ready(function () {
    livestreamloadajax();
});
// api data fetch fetch ajax end=====



// video change stream.html page start=====
function streamchangevideo(url, type) {
    window.location.href = `videoplayer.html?watch=${url}&type=${type}`;
}
$(document).ready(function () {
    // Get the parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);

    // Extract the 'watch' and 'type' parameters
    const url = urlParams.get('watch');
    const type = urlParams.get('type');

    // Now you can use the 'url' and 'type' variables in your videoplayerpageload function
    console.log('URL:', url);
    console.log('Type:', type);

    let videoelement = document.getElementById('my-video');
    var player = videojs(videoelement)
    player.src({
        type: type,
        src: url
    });

});
// video change stream.html page end======

//==================================================================

// click function video change index start=====
function indexchangevideo(url, type) {
    window.location.href = `videoplayer.html?watch=${url}&type=${type}`;

}
$(document).ready(function () {
    // Get the parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);

    // Extract the 'watch' and 'type' parameters
    const url = urlParams.get('watch');
    const type = urlParams.get('type');

    // Now you can use the 'url' and 'type' variables in your videoplayerpageload function
    console.log('URL:', url);
    console.log('Type:', type);

    let videoelement = document.getElementById('my-video');
    player = videojs(videoelement)
    player.src({
        type: type,
        src: url
    });
});
// click function video change index end====
