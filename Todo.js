
        //DEFINITIONS
        var bullet = " - ";
		var space = "  ";
        var button = $("<button>").attr("type", "submit").text("submit");
        var input = $("<input>").attr("type", "string");
        var label = $("<label>").append("Add an item <br>").append(this.input);

		var $editIcon;
        var createEditIcon = function() {
            $editIcon = $("<img>")
                .attr("class", "editIcon")
                .attr("src", editIconSrc)
                .attr("alt", editIconAlt)
                .on("click", function(event) {
                    event.preventDefault();
					var $target = $(event.currentTarget)
                    var $targetP = $(event.currentTarget).parent().find(".itemText");
					$targetP.attr("style", "background-color: white");
                    $targetP.attr("contenteditable", "true");
					$targetP.on("focusout", function(e) {
						$targetP.attr("style", "background-color: none");
						$targetP.attr("contenteditable", "false");
					});
                });
        }

        var editIconAlt = "edit item";
        var editIconSrc = "https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_mode_edit_48px-128.png";
		
        var $deleteIcon;
        var createDeleteIcon = function() {
            $deleteIcon = $("<img>")
                .attr("class", "deleteIcon")
                .attr("src", deleteIconSrc)
                .attr("alt", deleteIconAlt)
                .on("click", function(event) {
                    event.preventDefault();
					var $targetP = $(event.currentTarget).closest("p");
                    $targetP.remove();
                });

        }

        var deleteIconAlt = "delete item";
        var deleteIconSrc = "https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_delete_48px-128.png";

        var $statusIcon;
        var items = [];
        var iconClasses = [];
        var $p;
        var statusIndex;
        var createStatusIcon = function(i) {
            if (!iconClasses || iconClasses.length == 0) {
                return
            } else {
                statusIndex = iconClasses[i].substr(-1);
                $p = $("<p>").attr("class", "status" + statusIndex);
                $statusIcon = $("<img>")
                    .attr("class", iconClasses[i])
                    .attr("src", statusIconSrc[statusIndex])
                    .attr("alt", statusIconAlt[statusIndex])
                    .on("click", function(event) {
                        event.preventDefault();
                        var $target = $(event.currentTarget);
                        var $targetP = $(event.currentTarget).closest("p");
                        var index = $targetP.attr("class").substr(-1);
                        if ($targetP.attr("class") == "status3") {
                            index = 0;
                            $targetP.removeClass("status3");
                            $targetP.attr("class", "status0");
                            $target.attr("src", statusIconSrc[index])
                                .attr("alt", statusIconAlt[index]);

                        } else {
                            $targetP.removeClass("status" + index)
                            index ++;
                            $targetP.attr("class", "status" + index);
                            $target.attr("src", statusIconSrc[index])
                                .attr("alt", statusIconAlt[index]);
                        }
                })
            }

        }

        var statusIconAlt = ["pending", "started", "finished", "stopped"];
        var statusIconSrc = [
            "https://d30y9cdsu7xlg0.cloudfront.net/png/99630-200.png",   //pending
            "https://d30y9cdsu7xlg0.cloudfront.net/png/42732-200.png",  //started
            "https://cdn1.iconfinder.com/data/icons/materia-arrows-symbols-vol-6/24/018_237_ok_check_done_finished-128.png",    //finished
            "https://cdn2.iconfinder.com/data/icons/player-rounded-set/154/player-stop-frame-video-music-256.png" //stopped
        ];


        //LOAD DATA// make items array corresponding to what is stored in localStorage
        var load = function() {
            var savedTexts = JSON.parse(localStorage.getItem("items"));
            var savedIconClasses = JSON.parse(localStorage.getItem("iconClasses"));

            if (!savedTexts || savedTexts.length == 0) {
                items = [];
                iconClasses = [];
            } else {
                items = savedTexts;
                iconClasses = savedIconClasses;

                for (var i = 0; i < items.length; i++) {
                    createStatusIcon(i)
					createEditIcon();
                    createDeleteIcon();
					var itemSpan = $("<span>").attr("class", "itemText").append(items[i])
                    var $answerP = $p.append($statusIcon).append(itemSpan).append(space).append($editIcon).append($deleteIcon).append($("<br>"));
                    $(".list").append($answerP);
                }

            }
        }

        var $mainForm = $("<form>").attr("class", "main-form").append(label).append(button).attr("input", input)
            .on("submit", function(event) {
                var $p = $("<p>").attr("class", "status0")
                event.preventDefault();
                $(".dialog").text("");
                var inputAnswer = $("<span>").attr("class", "itemText").append(bullet).append($(this).find("input").val());
                if (inputAnswer !== "") {
                    var $statusIcon = $("<img>")
                    .attr("class", "status0")
                    .attr("src", statusIconSrc[0])
                    .attr("alt", statusIconAlt[0])
                    .on("click", function(event) {
                        event.preventDefault();
                        var $target = $(event.currentTarget);
                        var $targetP = $(event.currentTarget).closest("p");
                        var index = $targetP.attr("class").substr(-1);

                        if ($targetP.attr("class") == "status3") {
                            index = 0;
                            $targetP.removeClass("status3")
                            $targetP.attr("class", "status0");
                            $target.attr("src", statusIconSrc[index])
                                .attr("alt", statusIconAlt[index]);
                        } else {
                            $targetP.removeClass("status" + index)
                            index ++;
                            $targetP.attr("class", "status" + index);
                            $target.attr("src", statusIconSrc[index])
                                .attr("alt", statusIconAlt[index]);
                        }

                    });

					createEditIcon();
                    createDeleteIcon();

                    var $answerP = $p.append($statusIcon).append(inputAnswer).append(space).append($editIcon).append($deleteIcon).append($("<br>"))
                    $(".list").append($answerP);
                }
            });

        $(".save-all").on("click", function(event) {
            event.preventDefault();
            items = [];
            iconClasses = [];
            $("p").each(function() {
                var text = $(this).text();
                items.push(text);
                var iconClass = $(this).attr("class");
                iconClasses.push(iconClass);
                }
            );

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

        $(".reorder").on("click", function(event) {
            event.preventDefault();
            items = [];
            iconClasses = [];

            $("p").each(function() {
                var text = $(this).text();
                items.push(text);
                var iconClass = $(this).attr("class");
                iconClasses.push(iconClass);
            });

            var reorder = function() {
                for (var i = 0; i < iconClasses.length-1; i++) {
                    var statusIndex = iconClasses[i].substr(-1);
                    var statusIndexNext = iconClasses[i+1].substr(-1);

                    if (statusIndex > statusIndexNext) {
                        var temp = iconClasses[i+1];
                        iconClasses[i+1] = iconClasses[i];
                        iconClasses[i] = temp;

                        var temp = items[i+1];
                        items[i+1] = items[i];
                        items[i] = temp;

                        reorder();
                    }
                }
            }

            reorder();
            $(".list").html("");

            for (var i = 0; i < items.length; i++) {
                createStatusIcon(i)
				createEditIcon();
                createDeleteIcon();
				var itemSpan = $("<span>").attr("class", "itemText").append(items[i])
                var $answerP = $p.append($statusIcon).append(itemSpan).append(space).append($editIcon).append($deleteIcon).append($("<br>"));
                $(".list").append($answerP);
            }
        })


        //MAIN CODE//
        $mainForm.appendTo($(".form-space"));

