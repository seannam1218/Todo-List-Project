
//DEFINITIONS
var bullet = "- ";

var button = $("<button>").attr("type", "submit").text("submit");
var input = $("<input>").attr("type", "string");
var label = $("<label>").append("Add an item <br>").append(this.input);

var icon = function(src) {
  this.alt = "delete item";
  this.src = src;
  this.width = "30px";
  this.initialOpacity = 0.1;
}

//LOAD DATA// make items array corresponding to what is stored in localStorage
var savedData = JSON.parse(localStorage.getItem("items"));

if (!savedData) {
  var items = [];
} else {
  var items = savedData;
  for (var i = 0; i < savedData.length; i++) {
      var $p = $("<p>")
      var deleteIcon = new icon("https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_delete_48px-128.png");
      var $deleteIcon = $("<img>")
        .attr("src", deleteIcon.src)
        .attr("alt", deleteIcon.alt)
        .attr("width", deleteIcon.width)
        .attr("style", String("opacity: " + deleteIcon.initialOpacity))
        .on("mouseenter", function(event) {
          event.preventDefault();
          this.style.opacity = 1;
          }
        )
        .on("mouseout", function(event) {
          event.preventDefault();
          this.style.opacity = deleteIcon.initialOpacity;
          }
        )
        .on("click", function(event) {
          event.preventDefault();
          var $target = $(event.currentTarget).closest("p");
          $target.remove();
          }
        )
      var $answerP = $p.append(items[i]).append($deleteIcon).append($("<br>"))
      $(".list").append($answerP);
    }
}

var $mainForm = $("<form>").attr("class", "mainForm").append(label).append(button).attr("input", input)
.on("submit", function(event) {
  event.preventDefault();
  $(".dialog").text("");
  var inputAnswer = $(this).find("input").val();
  if (inputAnswer !== "") {
    var deleteIcon = new icon("https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_delete_48px-128.png");
    var $deleteIcon = $("<img>")
      .attr("src", deleteIcon.src)
      .attr("alt", deleteIcon.alt)
      .attr("width", deleteIcon.width)
      .attr("style", String("opacity: " + deleteIcon.initialOpacity))
      .on("mouseenter", function(event) {
        event.preventDefault();
        this.style.opacity = 1;
        }
      )
      .on("mouseout", function(event) {
        event.preventDefault();
        this.style.opacity = deleteIcon.initialOpacity;
        }
      )
      .on("click", function(event) {
      event.preventDefault();
      var $target = $(event.currentTarget).closest("p");
      $target.remove();
      }
    )

    if (items === null) {
      var $p = $("<p>")
    } else {
      var $p = $("<p>")
    }

    var $answerP = $p.append(bullet).append(inputAnswer).append($deleteIcon).append($("<br>"))
    $(".list").append($answerP);
  }
  }
)

$(".saveAll").on("click", function(event) {
  event.preventDefault();
  items = [];
  $("p").each(function(index, element) {   //JQuery looping technique
    var text = $(element).text();
    items.push(text);
    }
  );
  localStorage.setItem("items", JSON.stringify(items));
  }
);

$(".deleteAll").on("click", function(event) {
    event.preventDefault();
    //dialog pop-up
    if ($(".dialog").text() === "") {
      var yesButton = $("<button>").attr("type", "submit").text("hell yeah")
        .on("click", function(event) {
          items = [];
          $(".list").html("");
          $(".dialog").html("");
          }
        )

      var noButton = $("<button>").attr("type", "submit").text("nah")
        .on("click", function(event) {
          $(".dialog").html("");
          return;
          }
        )

      $(".dialog").append("Are you sure you want to delete everything?").append("<br>").append(yesButton).append(noButton);
    }
  }
)

//MAIN CODE//
$mainForm.appendTo($(".formSpace"));
