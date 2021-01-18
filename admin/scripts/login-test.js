// const form = document.querySelector('#login-form');
// form.addEventListener('submit', e => {
//     e.preventDefault();
// });
const LOGIN_FORM = $('#login-form');
const LOGOUT_BTN = $('#logoutBTN');
const LOGIN_PANEL = $('#login-container');
const ADMIN_PANEL = $('#admin-container');
const HIDDEN_CONTENT_REF = db.collection('options').doc('content');
/* #region ################# USER STATE LISTENER ################# */

auth.onAuthStateChanged( user => {
    if (user) { // LOGIN
        setupPosts([]);
        console.log('User logged in.', user.uid);
        
        
        HIDDEN_CONTENT_REF.update({
            showHiddenContent: true
        }).catch(e => {
            console.error(`Access denied. User ${user.email} is not an admin.`);
            $('#login-info').html(`Access denied. User ${user.email} is not an admin.`);
        });
        HIDDEN_CONTENT_REF.get().then( doc => {
            let displayHiddenContent = doc.data().showHiddenContent;
            if (displayHiddenContent) {
            LOGIN_PANEL.addClass('d-none');
            ADMIN_PANEL.removeClass('d-none');
        } else {
            ADMIN_PANEL.addClass('d-none');
            LOGIN_PANEL.removeClass('d-none');
        }
        });
        
        
        
    } else { // LOGOUT
        setupPosts([]);
        ADMIN_PANEL.addClass('d-none');
        LOGIN_PANEL.removeClass('d-none');
    }
});

/* #endregion ########################################### */


/* #region ################# LOGIN ################# */
LOGIN_FORM.submit(e => {
    e.preventDefault();
    $('#loading-spinner').removeClass('d-none');
    const login = $('#loginTF').val();
    const password = $('#passwordTF').val();
    
    auth.signInWithEmailAndPassword(login, password).then( user => {

        // SIGNED IN
        console.log(user);
        $('#loading-spinner').addClass('d-none');
        LOGIN_FORM.get(0).reset();
        $('#login-info').html('');

    }).catch( error => {
        // ERROR
        console.log(error.code);
        console.log(error.message);
        $('#loading-spinner').addClass('d-none');
        if(error.code == 'auth/wrong-password') {
            $('#login-info').html('Niepoprawne hasło lub nazwa użytkownika.');
        }
    });
    console.log(login, password);
});
/* #endregion ########################################### */




/* #region ################# LOGOUT ################# */
LOGOUT_BTN.click( (e) => { 
    e.preventDefault();
    auth.signOut().then((user) => {
        console.log('User signed out successfully.');
    }).catch( error => {
        console.log(error.code);
        console.log(error.message);
    });
});

/* #endregion ########################################### */


// var unsubscribe = db.collection('posts').orderBy('date').onSnapshot( data => {
//     setupPosts(data);
// });

const setupPosts = (data) => {

    let html = '';
    data.forEach(doc => {
        const post = doc.data();
        const li = `<li>${post.title}</li>`;
        html += li;
    });
    $('#testList').html(html);

};

