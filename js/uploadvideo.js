// video navitem click page load hide item start
$('#uploadvideo-form').hide();
$('#uploadvideo-table').hide();

// video navitem click page load hide item end

// start add video upload function
$('#add-video-btn').click(function (e) {
    e.preventDefault();
    $('#uploadvideo-table').hide();
    $('#uploadvideo-form').show();
});
// end add video upload function


// start video upload function
$('#uploadvideo-form').submit(function (e) {
    e.preventDefault();
    let uploadVideoObjectData = {
        uploadvideoTile: $('#video-upload-title').val(),
        uploadvideodesc: $('#video-upload-description').val(),
        uploadvideoUrl: $('#video-upload-url').val(),
        uploadvideoImgUrl: $('#video-upload-imgurl').val()
    }
    // console.log(uploadVideoObjectData)
    let videouploaddataget = localStorage.getItem('uploadvideosetdata')
    if (videouploaddataget == null) {
        videouploadArray = []
    } else {
        videouploadArray = JSON.parse(videouploaddataget)
    }
    videouploadArray.push(uploadVideoObjectData)
    localStorage.setItem('uploadvideosetdata', JSON.stringify(videouploadArray))
    // hide and show properity
    $('#uploadvideo-table').show();
    $('#uploadvideo-form').hide();
    // $('#uploadvideo-form').html().reset();
    document.getElementById('uploadvideo-form').reset()
    uploadvideotableform()
});
// end video upload function

// uploadvideo form table function
function uploadvideotableform() {
    let videouploaddataget = localStorage.getItem('uploadvideosetdata')
    if (videouploaddataget == null) {
        videouploadArray = []
    } else {
        videouploadArray = JSON.parse(videouploaddataget)
    }
    let html = '';
    videouploadArray.forEach((item, index) => {
        html += `
    <tr class="">
    <td class="">${index + 1}</td>
    <td class="">${item.uploadvideoTile}</td>
    <td class="uploadvideo-videourl">${item.uploadvideoUrl}</td>
    <td class=" action-btn">
        <button class="border-0 text-info fw-bold" id="${index}" onclick="videouploadEditbtn(this.id)"> <span class="bg-success text-white px-1 py-1 rounded"><i class="fa-solid fa-pen"></i></span></button>
        <button class="border-0 text-info fw-bold" id="${index}" onclick="videouploadviewbtn(this.id)"> <span class="bg-warning text-white px-1 py-1 rounded"><i class="fa-solid fa-eye text-white "></i></span></button>
        <button class="border-0 text-info fw-bold" id="${index}" onclick="uploadvideodeletebtn(this.id)"><span class="bg-danger text-white px-1 py-1 rounded"><i class="fa-solid fa-trash"></i></span></button>
    </td>
</tr>`;
    });
    if (videouploadArray.length != 0) {
        // uploadtableBody.innerHTML = html;
        $('#video-upload-tbody').html(html);
    } else {
        // uploadtableBody.innerHTML = 'upload video 0'
        $('#video-upload-tbody').html('upload video 0');
    }
}
// delete btn start
function uploadvideodeletebtn(index) {
    console.log(index)
    let videouploaddataget = localStorage.getItem('uploadvideosetdata')
    if (videouploaddataget == null) {
        videouploadArray = []
    } else {
        videouploadArray = JSON.parse(videouploaddataget)
    }
    videouploadArray.splice(index, 1)
    localStorage.setItem('uploadvideosetdata', JSON.stringify(videouploadArray))
    uploadvideotableform()
}
// delete btn end

// upload video.html page load  function start
function videouploadPageLoad() {
    uploadvideotableform()
    $('#uploadvideo-form').hide();
    $('#uploadvideo-table').show();
}
// upload video.html page load  function end

// Edit button start
function videouploadEditbtn(index) {
    window.location.href = `Edit-video.html?id=${index}`
}
// edit-vide.html page load function
function onEditvideoPageLoad() {
    const urlParams = new URLSearchParams(window.location.search);
    const index = urlParams.get('id');
    if (index !== null) {
        videouploaddataget = localStorage.getItem('uploadvideosetdata');
        if (videouploaddataget) {
            videouploadArray = JSON.parse(videouploaddataget)
            $('#edit-video-title').val(videouploadArray[index].uploadvideoTile);
            $('#edit-video-description').val(videouploadArray[index].uploadvideodesc);
            $('#edit-video-url').val(videouploadArray[index].uploadvideoUrl);
            $('#edit-img-video-url').val(videouploadArray[index].uploadvideoImgUrl);
        }
        console.log(videouploadArray)
    } else {
        console.error('index is not prodive in the url')
    }
}
// edit form submit function
$('#edit-video-form').submit(function (e) {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const index = urlParams.get('id');
    const videouploadArray = JSON.parse(videouploaddataget);
    if (videouploadArray) {
        videouploadArray[index].uploadvideoTile = $('#edit-video-title').val();
        videouploadArray[index].uploadvideodesc = $('#edit-video-description').val();
        videouploadArray[index].uploadvideoUrl = $('#edit-video-url').val();
        videouploadArray[index].uploadvideoImgUrl = $('#edit-img-video-url').val();
    }
    localStorage.setItem('uploadvideosetdata', JSON.stringify(videouploadArray))
    uploadvideotableform()
    console.warn(videouploadArray);
    window.location.href = "uploadvideo.html";
});
// end edit button

// view button function start
function videouploadviewbtn(index) {
    window.location.href = `upload-video-player.html?id=${index}`;
}
function uploadvideoplayerPageload() {
    const urlParams = new URLSearchParams(window.location.search);
    const index = urlParams.get('id');
    const videouploaddataget = localStorage.getItem('uploadvideosetdata');
    if (videouploaddataget) {
        videouploadArray = JSON.parse(videouploaddataget);
        videoelement = document.getElementById('my-video');
        player = videojs(videoelement)
        player.src({
            type: "video/mp4",
            src: videouploadArray[index].uploadvideoUrl
        });
        console.log(videouploadArray)
    }
}
// view button function end



// for each loop card list index page
$(document).ready(function () {
    const videouploaddataget = localStorage.getItem('uploadvideosetdata');
    if (videouploaddataget) {
        videouploadArray = JSON.parse(videouploaddataget);
        let cardlist = '';
        videouploadArray.forEach((viditem, index) => {
            console.log('card list', viditem);
            cardlist += `
                <div class=" videouploadcard  col" ${index}>
                <a href="#" onclick="changevideo('${viditem.uploadvideoUrl}','video/mp4')"  >
                <img src="${viditem.uploadvideoImgUrl}" class="uploadimg" alt=""></a>
                <h3 class="text-white fw-bold">${viditem.uploadvideoTile}</h3>
            </div>
                `;
        });
        if (videouploadArray.length != 0) {
            // uploadtableBody.innerHTML = html;
            $('#card-container-upload-video').html(cardlist);
        } else {
            // uploadtableBody.innerHTML = 'upload video 0'
            $('#card-container-upload-video').html('Video Is Not Found');
        }
    }
});


// click function video change
function changevideo(url, type) {
    window.location.href = `videoplayer.html?watch=${url}&type=${type}`;

}
function videoplayerpageload() {
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
}
