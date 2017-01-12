var config = {
  apiKey: "AIzaSyAdaoctQsNRV1e2Oia0z0WxvIB-v6g-Wp0",
  authDomain: "fir-auth-practice-c4558.firebaseapp.com",
  databaseURL: "https://fir-auth-practice-c4558.firebaseio.com",
  storageBucket: "fir-auth-practice-c4558.appspot.com",
  messagingSenderId: "108698684324"
};
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(() => {
  if (firebase.auth().currentUser) {
    // logged in
    var email = firebase.auth().currentUser.email

    $('.login-page').addClass('hidden')
    $('.main-page').removeClass('hidden')
    $('.main-page h1').text(`Welcome ${email}`)
  } else {
    // logged out
    $('.login-page').removeClass('hidden')
    $('.main-page').addClass('hidden')
  }
})

$('.login-page form').submit((e) => {
  var email = $('input[type="email"]').val()
  var password = $('input[type="password"]').val()

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => $('form')[0].reset())

  e.preventDefault()
})

$('.logout').click(() => firebase.auth().signOut())

$('.main-page form').submit((e) => {
  var task = $('.main-page input[type="text"]').val()
  var uid = firebase.auth().currentUser.uid
  $.post(
    `https://fir-auth-practice-c4558.firebaseio.com//${uid}.json`,
    JSON.stringify({ task: task })
  ).then(res => console.log(res.name))

  e.preventDefault()
})
