// start live stream naviten click window time hide 
$('#add-livestream-form').hide();
$('#livestream-table').hide();
// end 

//  start add live stream button function
$('#add-livestream-btn').click(function (e) {
    e.preventDefault();
    $('#livestream-table').hide();
    $('#add-livestream-form').show();
    // $('#add-livestream-btn').hide();
});
// end add live stream button function

// start add live stream form function 
$('#add-livestream-form').submit(function (e) {
    e.preventDefault();
    console.log('success')
    const liveStreamData = {
        liveTile: $('#live-stream-title').val(),
        liveDes: $('#live-stream-description').val(),
        liveUrl: $('#live-stream-url').val(),
        liveimg: $('#live-stream-imgurl').val()
    }
    // start localstorage data set and get
    const liveStreamDataGet = localStorage.getItem('liveStreamData')
    if (liveStreamDataGet == null) {
        liveStreamArray = [];
    } else {
        liveStreamArray = JSON.parse(liveStreamDataGet)
    }
    liveStreamArray.push(liveStreamData)

    localStorage.setItem('liveStreamData', JSON.stringify(liveStreamArray))
    // end localstorage data set and get

    // data push array variable

    // input text reset properity
    document.getElementById('add-livestream-form').reset();
    // hide and show properity
    $('#livestream-table').show();
    $('#add-livestream-form').hide();
    livestreamtableform();


});

// livesream form table function
function livestreamtableform() {
    const liveStreamDataGet = localStorage.getItem('liveStreamData')
    if (liveStreamDataGet == null) {
        liveStreamArray = [];
    } else {
        liveStreamArray = JSON.parse(liveStreamDataGet)
    }

    var html = '';
    liveStreamArray.forEach((item, index) => {
        html += `
            <tr class="">
            <td class="">${index + 1}</td>
            <td class="">${item.liveTile}</td>
            <td class=" livestream-url ">${item.liveUrl}</td>
            <td class=" action-btn">
                <button id="${index}" class="border-0 text-white fw-bold"  onclick="livestreameditbtn(this.id)"> <span class="bg-success text-white px-1 py-1 rounded"><i class="fa-solid fa-pen"></i></span></button>
                <button class="border-0 text-info fw-bold" id='${index}'  onclick="livestreamviewbtn(this.id)"> <span class="bg-warning text-white px-1 py-1 rounded"><i class="fa-solid fa-eye text-white "></i></span></button>
                <button id="${index}" class="border-0 text-info fw-bold" onclick="livestreamdetetebtn(this.id)"> <span class="bg-danger text-white px-1 py-1 rounded"><i class="fa-solid fa-trash"></i></span></button>
            </td>
        </tr>`;
    });

    // let tableBody = document.getElementById('live-stream-tbody');
    if (liveStreamArray.length != 0) {
        $('#live-stream-tbody').html(html);
        // tableBody.innerHTML = html;
    } else {
        $('#live-stream-tbody').html('live stream 0');
    }
}


// delete button
function livestreamdetetebtn(index) {
    console.log(index)
    const liveStreamDataGet = localStorage.getItem('liveStreamData')
    if (liveStreamDataGet == null) {
        liveStreamArray = [];
    } else {
        liveStreamArray = JSON.parse(liveStreamDataGet)
    }
    liveStreamArray.splice(index, 1)
    localStorage.setItem('liveStreamData', JSON.stringify(liveStreamArray))
    livestreamtableform()
}

// live stream page load function start
function livestreamPageLoad() {
    $('#livestream-table').show();
    livestreamtableform()

}

// edit button function start
function livestreameditbtn(index) {
    window.location.href = `edit-live-stream.html?id=${index}`;
}
function onEditPageLoad() {
    const urlParams = new URLSearchParams(window.location.search);
    const index = urlParams.get('id');

    // Check if the index is valid
    if (index !== null) {
        const liveStreamDataGet = localStorage.getItem('liveStreamData');
        if (liveStreamDataGet) {
            liveStreamArray = JSON.parse(liveStreamDataGet);
            // Set values in the form
            $('#edit-live-stream-title').val(liveStreamArray[index].liveTile);
            $('#edit-live-stream-description').val(liveStreamArray[index].liveDes);
            $('#edit-live-stream-url').val(liveStreamArray[index].liveUrl);
            $('#edit-live-stream-imgurl').val(liveStreamArray[index].liveimg);
        }
        console.log(liveStreamArray);
    } else {
        console.error('Index not provided in the URL.');
    }
}
// Handle form submission for updating data edit button
$('#edit-livestream-form').submit(function (e) {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const index = urlParams.get('id');
    // Update the live stream data in the array
    const liveStreamDataGet = localStorage.getItem('liveStreamData');
    if (liveStreamDataGet) {
        liveStreamArray = JSON.parse(liveStreamDataGet);
        liveStreamArray[index].liveTile = $('#edit-live-stream-title').val();
        liveStreamArray[index].liveDes = $('#edit-live-stream-description').val();
        liveStreamArray[index].liveUrl = $('#edit-live-stream-url').val();
        liveStreamArray[index].liveimg = $('#edit-live-stream-imgurl').val();
    }

    // Update the data in local storage
    localStorage.setItem('liveStreamData', JSON.stringify(liveStreamArray));
    // Hide the edit form
    console.log(liveStreamArray)
    // Update the live stream table on the page
    livestreamtableform();
    window.location.href = 'live-stream.html';
});
// end edit function

// view button function start
function livestreamviewbtn(index) {
    window.location.href = `livestreamVPL.html?id=${index}`;
}
function livestreamVPLPageload() {
    const urlParams = new URLSearchParams(window.location.search);
    const index = urlParams.get('id');
    // Update the live stream data in the array
    const liveStreamDataGet = localStorage.getItem('liveStreamData');
    if (liveStreamDataGet) {
        liveStreamArray = JSON.parse(liveStreamDataGet);
        videoelement = document.getElementById('my-video');
        player = videojs(videoelement)
        player.src({
            type: "application/x-mpegURL",
            src: liveStreamArray[index].liveUrl
        });
    }
}
// view button function end





// for each loop card list stream page
$(document).ready(function () {
    const liveStreamDataGet = localStorage.getItem('liveStreamData');
    if (liveStreamDataGet) {
        liveStreamArray = JSON.parse(liveStreamDataGet);
        let cardlist = '';
        liveStreamArray.forEach((viditem, index) => {
            console.log('card list', viditem.liveimg);
            cardlist += `
            <div class="col position-relative" ${index}>
          <a href="#" onclick="changevideo('${viditem.liveUrl}','application/x-mpegURL')" >
          <div class="" style="width: 18rem;">
          <img src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/WhatCarCanYouGetForAGrand.jpg" class="card-img-top" alt="...">
          <h2 class="text-white">${viditem.liveTile}</h2>
      </div>
          </a>
            <h6 class="text-white bg-danger position-absolute top-0 ms-3 mt-5 fw-bold  p-1 rounded">Live ${index + 1}</h6>
        </div>
                `;
        });
        if (liveStreamArray.length != 0) {
            // uploadtableBody.innerHTML = html;
            $('#card-container-live-stream').html(cardlist);
        } else {
            // uploadtableBody.innerHTML = 'upload video 0'
            $('#card-container-live-stream').html('live stream  Video Is Not Found');
        }
    }
});
// video change index page
function changevideo(url,type){
    window.location.href=`videoplayer.html?watch=${url}&type=${type}`;
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


