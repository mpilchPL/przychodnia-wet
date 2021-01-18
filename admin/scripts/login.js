
const LOGIN_FORM = $('#login-form');
const LOGIN_PANEL = $('#login-container');
const LOGIN_BTN = $('#loginBTN');
const ADMIN_PANEL = 'admin.html';
const HIDDEN_CONTENT_REF = db.collection('test').doc('testMe');



/* #region ################# LOGIN ################# */
LOGIN_BTN.click(e => {
    e.preventDefault();
    $('#loading-spinner').removeClass('d-none');
    const login = $('#loginTF').val();
    const password = $('#passwordTF').val();
    
    auth.signInWithEmailAndPassword(login, password).then( userSnap => {

        // USER OK
        console.log(userSnap.user.email);
        $('#loading-spinner').addClass('d-none');
        
        $('#login-info').html('');
        
        // if (testQuery(userSnap.user)) {
        //     // window.location.replace(`${ADMIN_PANEL}`);
        //     console.log('user admin ok');
        // } else {
        //     console.error('user cant read data')
        // }
        testQuery(userSnap.user);
        

    }).catch( error => {
        // ERROR
        console.log(error.code);
        console.log(error.message);
        $('#loading-spinner').addClass('d-none');
        if(error.code == 'auth/wrong-password') {
            $('#login-info').html('Niepoprawne hasło lub nazwa użytkownika.');
        }
    });
});
/* #endregion ########################################### */


function testQuery (user) { 
    HIDDEN_CONTENT_REF.update({
        showHiddenContent: true
    }).then(() => {
        // user is in fact admin
        console.log('user ok - admin');
        // proceed to admin page
        window.location.replace(`${ADMIN_PANEL}`);
    }).catch(e => {
        console.error(`Access denied. User ${user.email} is not an admin.`);
        $('#login-info').html(`
        <div>
        Access denied. 
        User <span style="color: blue;">${user.email}</span> 
        is not an admin.
        </div>
        `);
        return false;
    });
    
 }