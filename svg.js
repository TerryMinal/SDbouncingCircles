var pic = document.getElementById("vimage");
var clearBtn = document.getElementById("clear")
var dots = [];
var intervalID;
var beginAnimation = true;
//clears the screen
var clearScreen = function(e){
  clearInterval(intervalID);
  dots.forEach((a) => a.element.remove());
  dots = [];
  beginAnimation = true;
  console.log("Cleared Screen.");
}

var makeDot = function(x, y) {
  var cl = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  return {
    x : x,
    y : y,
    dx : Math.pow(-1, Math.round(Math.random() * 4)) * Math.random() * 10,
    dy : Math.pow(-1, Math.round(Math.random() * 4)) * Math.random() * 10,
    r : 15,
    fill : "#9A98C0",
    element : cl,
    move : function() {
      if (this.x <= this.r || this.x >= 500 - this.r) {
        this.dx *= -1;
      }
      if (this.y <= this.r || this.y >= 500 - this.r) {
        this.dy *= -1;
      }
      this.x += this.dx;
      this.y += this.dy;
    },
    displayMe : function() {
      cl.setAttribute("cx", this.x);
      cl.setAttribute("cy", this.y);
      cl.setAttribute("r", this.r);
      cl.setAttribute("fill", this.fill);
      pic.appendChild(cl);
    }
  };
}

//a blank space on svg container is clicked -- make circle
var svg_clicked = function(e){
  if (beginAnimation) {
    intervalID = setInterval(animate, 20);
    beginAnimation = !beginAnimation;
  }
  if (e.target == this){  //<-- toElement is undefined
    r = 15;
    x = (Math.random() * (500 - 2 * r)) + r + 1;
    y = (Math.random() * (500 - 2 * r)) + r + 1;
    console.log("coords: ", x, ", ", y);
    var dot = makeDot(x, y);
    dots.push(dot);
    // dot.display();
  };
}

var animate = function() {
  dots.forEach((a) => a.move());
  dots.forEach((a) => a.displayMe());
}


clearBtn.addEventListener("click", clearScreen)
pic.addEventListener("click", svg_clicked)
