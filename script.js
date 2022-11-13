// var Reloaded  = function(){
//     if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i
//         .test(navigator.userAgent)) {
    
//         console.log("Режим мобильное устройство (телефон или планшет).")
//         window.location = "./mobile.html"
    
//     } else {
//         console.log("Режим ПК")
//         window.location = 'pc.html';
//     }
// } //страницу перезагрузили

// window.onload = function() {
//     var loaded = sessionStorage.getItem('loaded');
//     if(loaded) {
//         Reloaded();
//     } else {
//         sessionStorage.setItem('loaded', false);
//     }
// }