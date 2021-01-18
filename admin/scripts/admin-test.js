/* #region ################# test ################# */

const DOC_TEST_REF = db.collection('test-doctor').doc('rQV6RT4MZsKcK99Ny2V0');

/* #endregion ########################################### */


const storageRef = storage.ref();
const docImagesRef = storageRef.child('images/doctors');
let file;
$('#upload-doc-img').change(function (e) { 
    e.preventDefault();
    console.log('change');
    file = this.files[0];
    console.log(file);
});

$('#send-img').click(function (e) { 
    e.preventDefault();
    if( file == undefined) { return; }
    else if ( !file.type.includes('image')) {
        console.error('File type is not an image');
        return;
    }
    console.log('File OK');
    sendFileToStorage(file);
});

function sendFileToStorage(newFile) {
    var uploadTask = docImagesRef.child(`/${newFile.name}`).put(file);
    // // Pause the upload
    // uploadTask.pause();

    // // Resume the upload
    // uploadTask.resume();

    // // Cancel the upload
    // uploadTask.cancel();
    uploadTask.on('state_changed', function(snapshot){
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      }, function(error) {
        // Handle unsuccessful uploads
      }, function() {
        // Handle successful uploads on complete
        updateImagesList();
      });
}



/* #region ################# DOWNLOAD AND DISPLAY IMG ################# */


$('#select-img-from-storage').click(function (e) { 
    e.preventDefault();
    renderImagesInModal();
});


// selecting img in modal


// save button click
$('#modal-save-img-btn').click(function (e) { 
    e.preventDefault();
    // one image must be selected
    if ($('.img-selected').length != 1) {
        alert('Błąd. Wybierz zdjęcie.');
        return;
    }
    // get src attribute from selected image
    let selected = $('.img-selected > img').attr('src');
    // TODO update db data 
    DOC_TEST_REF.update({
        photo: selected
    });
    // set new image
    // $('#selected-image').attr('src', selected);
    //hide modal
    $('#selectImage').modal('hide');
});

// update imgs in modal
function updateImagesList() {
    docImagesRef.listAll().then(images => {
        let modalContent = '';
        images.items.forEach( img => {
            img.getDownloadURL().then( url => {
                modalContent += `
                    <div class="modal-img-container">
                        <img src="${url}" class="img-fluid" alt="">
                    </div>
                `;
                renderImagesInModal(modalContent);
            });
        });
    });
}
// render images + add click listener
function renderImagesInModal(htmlCode) { 
    $('#modal-doctor-images').html(htmlCode);
    $('.modal-img-container').click(function (e) { 
        e.preventDefault();
        $('.modal-img-container').removeClass('img-selected');
        $(this).addClass('img-selected');
    });
}

/* #endregion ########################################### */


$(function () {
    updateImagesList();
});

