const imageArray = ["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg"];
var y = setInterval(slide, 1000);
function slide() {
  var x = document.getElementById("img1");
  for (i = 0; i < imageArray.length; i++) {
    let ff = x.src.split("/");

    if (ff[ff.length - 1] === imageArray[i]) {
      var y = i + 1;
      if (y == imageArray.length) {
        y = 0;
      }
      x.src = imageArray[y];
    }
  }
}


}
