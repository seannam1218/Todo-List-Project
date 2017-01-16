	
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
		
		var statusIconAlt = ["pending", "started", "finished", "stopped"];
		var statusIconSrc = [
			"https://d30y9cdsu7xlg0.cloudfront.net/png/99630-200.png",   //pending
			"https://d30y9cdsu7xlg0.cloudfront.net/png/42732-200.png",	//started
			"https://cdn1.iconfinder.com/data/icons/materia-arrows-symbols-vol-6/24/018_237_ok_check_done_finished-128.png",	//finished
			"https://cdn2.iconfinder.com/data/icons/player-rounded-set/154/player-stop-frame-video-music-256.png" //stopped
		];

		
        //LOAD DATA// make items array corresponding to what is stored in localStorage
        var load = function() {
			var savedTexts = JSON.parse(localStorage.getItem("items"));
			var savedIconClasses = JSON.parse(localStorage.getItem("iconClasses"))
        
			if (!savedTexts) {
				var items = [];
				var IconClasses = [];
			} else {
				var items = savedTexts;
				var iconClasses = savedIconClasses;
				for (var i = 0; i < savedTexts.length; i++) {
					var $p = $("<p>")
					var index = iconClasses[i].substr(-1);
					
					var $statusIcon = $("<img>")
						.attr("class", iconClasses[i])
						.attr("src", statusIconSrc[index])
						.attr("alt", statusIconAlt[index])
						.on("click", function(event) {
							event.preventDefault();
							var $target = $(event.currentTarget);
							var $targetP = $(event.currentTarget).closest("p");
							console.log("clicked");
							
							if ($target.attr("class") == "status0") {
								$target.removeClass("status0")
									.attr("class", "status1")
									.attr("src", statusIconSrc[1])
									.attr("alt", statusIconAlt[1]);
								$targetP.attr("class", "status1");
							} else if ($target.attr("class") == "status1") {
								$target.removeClass("status1")
									.attr("class", "status2")
									.attr("src", statusIconSrc[2])
									.attr("alt", statusIconAlt[2]);	
								$targetP.attr("class", "status2");
							} else if ($target.attr("class") == "status2") {
								$target.removeClass("status2")
									.attr("class", "status3")
									.attr("src", statusIconSrc[3])
									.attr("alt", statusIconAlt[3]);	
								$targetP.attr("class", "status3");
							} else if ($target.attr("class") == "status3") {
								$target.removeClass("status3")
									.attr("class", "status0")
									.attr("src", statusIconSrc[0])
									.attr("alt", statusIconAlt[0]);		
								$targetP.attr("class", "status0");
							}
				 
							console.log($targetP.attr("class"));
						});
					
					var $deleteIcon = $("<img>")
						.attr("class", "deleteIcon")
						.attr("src", deleteIconSrc)
						.attr("alt", deleteIconAlt)
						.on("click", function(event) {
							event.preventDefault();
							var $target = $(event.currentTarget).closest("p");
							$target.remove();
						});
					var $answerP = $p.append($statusIcon).append(items[i]).append($deleteIcon).append($("<br>"));
					$(".list").append($answerP);
				}
			}
		}
		
		

        var $mainForm = $("<form>").attr("class", "main-form").append(label).append(button).attr("input", input)
            .on("submit", function(event) {
                event.preventDefault();
                $(".dialog").text("");
                var inputAnswer = $(this).find("input").val();
                if (inputAnswer !== "") {
					var $statusIcon = $("<img>")
					.attr("class", "status0")
                    .attr("src", statusIconSrc[0])
                    .attr("alt", statusIconAlt[0])
					.on("click", function(event) {
                        event.preventDefault();
						var $target = $(event.currentTarget);
						var $targetP = $(event.currentTarget).closest("p");
						console.log("clicked");
						if ($target.attr("class") == "status0") {
							$target.removeClass("status0")
								.attr("class", "status1")
								.attr("src", statusIconSrc[1])
								.attr("alt", statusIconAlt[1]);
							$targetP.attr("class", "status1");
						} else if ($target.attr("class") == "status1") {
							$target.removeClass("status1")
								.attr("class", "status2")
								.attr("src", statusIconSrc[2])
								.attr("alt", statusIconAlt[2]);	
							$targetP.attr("class", "status2");
						} else if ($target.attr("class") == "status2") {
							$target.removeClass("status2")
								.attr("class", "status3")
								.attr("src", statusIconSrc[3])
								.attr("alt", statusIconAlt[3]);	
							$targetP.attr("class", "status3");
						} else if ($target.attr("class") == "status3") {
							$target.removeClass("status3")
								.attr("class", "status0")
								.attr("src", statusIconSrc[0])
								.attr("alt", statusIconAlt[0]);		
							$targetP.attr("class", "status0");
						}
						 
						console.log($targetP.attr("class"));
                    });
					           
                    var $deleteIcon = $("<img>")
						.attr("class", "deleteIcon")
                        .attr("src", deleteIconSrc)
                        .attr("alt", deleteIconAlt)
                        .on("click", function(event) {
                            event.preventDefault();
                            var $targetP = $(event.currentTarget).closest("p");
                            $targetP.remove();
                            }
                        )
                    
                    var $answerP = $("<p>").append($statusIcon).append(bullet).append(inputAnswer).append($deleteIcon).append($("<br>"))
                    $(".list").append($answerP);
                }
            });

        $(".save-all").on("click", function(event) {
            event.preventDefault();
            items = [];
			iconClasses = [];
            $("p").each(function() {
                var text = $(this).text();
				console.log("text = " + text)
                items.push(text);
				console.log("this.html = " + $(this).html())
				var iconClass = $(this).attr("class");
				console.log("iconClass = " + iconClass)
				iconClasses.push(iconClass);
                }
            );
			console.log("items list = " + items)
			console.log("iconclass list = " + iconClasses)
			
            localStorage.setItem("items", JSON.stringify(items));
			localStorage.setItem("iconClasses", JSON.stringify(iconClasses));
        });

        $(".delete-all").on("click", function(event) {
            event.preventDefault();
            //dialog pop-up
            if ($(".dialog").text() === "") {
                var yesButton = $("<button>").attr("type", "submit").text("hell yeah")
                    .on("click", function(event) {
                        items = [];
						iconClasses = [];
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

