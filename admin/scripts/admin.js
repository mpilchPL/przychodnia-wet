
// stworzyc strone do logowania
// i strone panelu

// TODO poloczyc firestore z wlasciwa stronka
// dodac storage i wrzucic tam zdjecie z projektu
// zrobic panel logowania z przekierowaniem na oddzielny dokument ?? moze
// dodac przynajmniej sekcje edycji segmentu o mnie i uslugi

// zrobic CV lepsze pod web deva, wyslac aplikacje do onetu i poszukac innych
// naprawic baner na stronie mpilch.pl

let adminOK = false;
const LOGOUT_BTN = $('.logoutBTN');
const LOGIN_PANEL = 'login.html';
const MODAL_BTN = $('.modalBTN');
const DOCUMENTS = {
    test_doc : db.collection('test').doc('testMe'), // TEST QUERY
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



/* #region ################# WEB CONTENT ################# */





/* #endregion ########################################### */

/* #region ################# MODALS ################# */

MODAL_BTN.click(function (e) { 
    // e.preventDefault();
    
});

/* #endregion ########################################### */