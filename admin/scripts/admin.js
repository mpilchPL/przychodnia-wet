
// TODO poloczyc firestore z wlasciwa stronka
// dodac storage i wrzucic tam zdjecie z projektu
// zrobic panel logowania z przekierowaniem na oddzielny dokument ?? moze
// dodac przynajmniej sekcje edycji segmentu o mnie i uslugi

// zrobic CV lepsze pod web deva, wyslac aplikacje do onetu i poszukac innych
// naprawic baner na stronie mpilch.pl


const ABOUT_US = `<div id="about-us-section">
                        <div class="d-flex inner-section">
                            <textarea name="" wrap="off" maxlength="50" id="about-us-title" cols="30" rows="1" disabled></textarea>
                            <div class="status align-self-end"></div>
                            <button class="editBTN align-self-end ml-auto btn-sm btn-dark">EDYTUJ</button>
                        </div>
                        
                        <div class="d-flex inner-section">
                            <textarea name="" maxlength="50" id="about-us-content" cols="30" rows="10" disabled></textarea>
                            <button class="editBTN align-self-end ml-auto btn-sm btn-dark">EDYTUJ</button>
                        </div>
                        <div class="d-flex">
                            <button class="saveBTN ml-auto btn-lg btn-primary" data-source="#about-us-section">Zapisz zmiany</button>
                        </div>
                    </div>`;

let adminOK = false;
const LOGOUT_BTN = $('.logoutBTN');
const LOGIN_PANEL = 'login.html';
const EDIT_BTN = $('.editBTN');

const DOCUMENTS = { // references to documents
    test_doc : db.collection('test').doc('testMe'), // TEST QUERY
    about_doc: db.collection('aboutUs'),

}




/* #region ################# USER STATE LISTENER ################# */
auth.onAuthStateChanged( user => {
    if (user) { // LOGIN
        console.log('User logged in.', user.uid);
        DOCUMENTS.test_doc.get().then( doc => {
            console.log('user is admin');
            adminOK = true;
        }).catch(e => {
            console.error(`Access denied. User ${user.email} is not an admin.`);
            $('#login-info').html(`Access denied. User ${user.email} is not an admin.`);

        });
    } else { 
        // LOGOUT
        adminOK = false;
    }
});
/* #endregion ########################################### */

$(document).ready(function () {
    updateListeners();
});

/* #region ################# LOGOUT ################# */
LOGOUT_BTN.click( (e) => { 
    e.preventDefault();
    logoutUser();
});

function logoutUser () { 
    auth.signOut().then((user) => {
        console.log('User signed out successfully.');
        window.location.replace(`${LOGIN_PANEL}`);
        adminOK = false;
    }).catch( error => {
        console.log(error.code);
        console.log(error.message);
        
    });
 }
/* #endregion ########################################### */





/* #region ################# SIDE NAV ################# */

$('.sidebar-item').click(function (e) { 
    e.preventDefault();
    let target = $(this).attr('data-target');
    if (target != undefined && !$(this).hasClass('sidebar-item-active')) {
        let currentElement = $('.sidebar-item-active');
        updateContent(target, currentElement);
        console.log('updating content');
    }
    setNavActiveElement(this);
});


/* #endregion ########################################### */





function updateContent (newContent, oldContent) { 
    switch(newContent) {
        case 'about-us-section':
            checkForChanges(oldContent);

            $('.content').html(ABOUT_US);  // set basic content
            updateListeners();
            // update data of new content 
            DOCUMENTS.about_doc.orderBy('created').get().then( docs => { 
                let documents = [];
                docs.forEach(doc => {
                    documents.push(doc.data());
                });
                console.log(documents);
                $('#about-us-title').html(documents[0].title);
                $('#about-us-content').html(documents[0].content);
             })

             // TODO bedzie zmiana taktyki: onload ladujemy to co sie wyswielta na dzien dobry i
             // zapisujemy to do zmiennej np current about us (tablica obiektow),
            // pozniej za kazda zmiana contentu sprawdzamy czy zmienna nie jest pusta, jezeli jest to ladujemy
            // rowniez przy zmianie trzeba sprawdzic czy w poprzedniej zakladce dokonano zmian
            // trzeba bedzie porownac dane z zmiennych i te z contentu aktualnie wyswietlanego
            // najlepiej bedzie to narysowac na diagramie
            // 
            
            break;

        case 'services-section':
            //update section
            $('.content').html('');  // set basic content
            console.log(newContent);
            break;
        case 'doctors-section':
            //update section
            $('.content').html('');  // set basic content
            console.log(newContent);
            break;
        default:
            console.error(`There is no option "${newContent}" in switch loop admin.js, function updateContent()`);
            break;
    }
 }

function setNavActiveElement(ele) {
    $('.sidebar-item').removeClass('sidebar-item-active');
    $(ele).addClass('sidebar-item-active');
}

function updateListeners() {
    // edit buttons
    $('.editBTN').click(function (e) { 
        e.preventDefault();
        $(this).parent().children('textarea').removeAttr('disabled');
        console.log('asdasd');
    
    });
    
    // save button
    $('.saveBTN').click(function (e) { 
        e.preventDefault();
        $('.dialogue-confirm-outer').fadeIn(50);
        console.log($(this).attr('data-source'));
    });
    // confirm save ( on dialogue window )
    $('.closePopup').click(function (e) { 
        e.preventDefault();
        $('.dialogue-confirm-outer').fadeOut();
    });
}

function checkForChanges(content) {

}