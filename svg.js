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
            this.x += this.dx;
            this.y += this.dy;
            if (x <= this.r || x >= 500 - this.r) {
                this.dx *= -1;
            }
            if (y <= this.r || y >= 500 - this.r) {
                this.dy *= -1;
            }

        },
        display : function() {
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
        console.log("coords: ", e.offsetX, ", ", e.offsetY);
        var dot = makeDot(e.offsetX,e.offsetY);
        dots.push(dot);
        // dot.display();
    };
}

var animate = function() {
  dots.forEach((a) => a.move());
  dots.forEach((a) => a.display());
}


clearBtn.addEventListener("click", clearScreen)
pic.addEventListener("click", svg_clicked)
