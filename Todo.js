
        //DEFINITIONS
        var bullet = "- ";

        var button = $("<button>").attr("type", "submit").text("submit");
        var input = $("<input>").attr("type", "string");
        var label = $("<label>").append("Add an item <br>").append(this.input);

        var Icon = function(alt, src) {
            this.alt = alt;
            this.src = src;
        }
		
		var deleteIconAlt = "delete item";
        var deleteIconSrc = "https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_delete_48px-128.png";
		
		var statusIconAlt = [pending, started, finished, stopped]
		var statusIconSrc = [
			pending: "https://d30y9cdsu7xlg0.cloudfront.net/png/99630-200.png",
			started: "https://d30y9cdsu7xlg0.cloudfront.net/png/215093-200.png",
			finished: "https://d30y9cdsu7xlg0.cloudfront.net/png/13118-200.png",
			stopped: "https://cdn2.iconfinder.com/data/icons/player-rounded-set/154/player-stop-frame-video-music-256.png"
		]
		

        //LOAD DATA// make items array corresponding to what is stored in localStorage
        var savedData = JSON.parse(localStorage.getItem("items"));
		console.log("wowomg");
        if (!savedData) {
            var items = [];
        } else {
            var items = savedData;
            for (var i = 0; i < savedData.length; i++) {
                var $p = $("<p>")
				var statusIcon = new Icon(statusIconAlt[0], statusIconSrc[0]);
				var $statusIcon = $("<img>")
					.attr("class", "statusIcon")
                    .attr("src", statusIcon.src)
                    .attr("alt", statusIcon.alt)
				
				console.log($statusIcon)
                var deleteIcon = new Icon(deleteIconAlt, deleteIconSrc);
                var $deleteIcon = $("<img>")
					.attr("class", "deleteIcon")
                    .attr("src", deleteIcon.src)
                    .attr("alt", deleteIcon.alt)
                    .on("click", function(event) {
                        event.preventDefault();
                        var $target = $(event.currentTarget).closest("p");
                        $target.remove();
                    });
                var $answerP = $p.append($statusIcon).append(items[i]).append($deleteIcon).append($("<br>"));
                $(".list").append($answerP);
            }
        }

        var $mainForm = $("<form>").attr("class", "main-form").append(label).append(button).attr("input", input)
            .on("submit", function(event) {
                event.preventDefault();
                $(".dialog").text("");
                var inputAnswer = $(this).find("input").val();
                if (inputAnswer !== "") {
					var statusIcon = new Icon(statusIconAlt[0], statusIconSrc[0]);
					var $statusIcon = $("<img>")
						.attr("class", "statusIcon")
						.attr("src", statusIcon.src)
						.attr("alt", statusIcon.alt)
                    var deleteIcon = new Icon(deleteIconAlt, deleteIconSrc);
                    var $deleteIcon = $("<img>")
						.attr("class", "deleteIcon")
                        .attr("src", deleteIcon.src)
                        .attr("alt", deleteIcon.alt)
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
                    var $answerP = $p.append($statusIcon).append(bullet).append(inputAnswer).append($deleteIcon).append($("<br>"))
                    $(".list").append($answerP);
                }
            });

        $(".save-all").on("click", function(event) {
            event.preventDefault();
            items = [];
            $("p").each(function(index, element) {
                var text = $(element).text();
                items.push(text);
                }
            );
            localStorage.setItem("items", JSON.stringify(items));
        });

        $(".delete-all").on("click", function(event) {
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
        });

        //MAIN CODE//
        $mainForm.appendTo($(".form-space"));
