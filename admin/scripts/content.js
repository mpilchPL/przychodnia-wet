DOC_REF = db.collection('test-doctor');



// doctor img listener
DOC_REF.onSnapshot( snapshot => {
    snapshot.docs.forEach(doc => {
        console.log('doc ref snapshot', doc.data().photo);
        $('#selected-image').attr('src', doc.data().photo);
    });
    

    
});
