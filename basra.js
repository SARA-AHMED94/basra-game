var types = ["clubs", "diamonds", "hearts", "spades"];
var values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "j", "k", "q"]
var arr = [];
//====================create an array of objects contain valus /source/types========================
for (var i = 0; i < 13; i++) {
    for (var j = 0; j < 4; j++) {
        var obj = {
            val: values[i],
            type: types[j]
        }
        arr.push(obj);
    }
}

for (var i = 0; i < arr.length; i++) {
    arr[i].source = $(".cards img")[i].src;
}
//===============creating image function=====================
function createImg(source, value, type) {
        var myimg = $("<img>");
        myimg.attr("src", source);
        myimg.attr("val", value);
        myimg.attr("type", type);
        return myimg;
    }
    //===============four random cards on table===================
for (var i = 0; i < 4; i++) {
    var random = Math.floor(Math.random() * arr.length);
    if (arr[random].val == "j") {

        do {
            var random2 = Math.floor(Math.random() * arr.length);
            var img = createImg(arr[random2].source, arr[random2].val, arr[random2].type);
            $(".tablecards").append(img);
            arr.splice(random2, 1)

        } while ($(".tablecards img")[i].getAttribute("val") == "j") //========replace jack==========

    } else {
        var img = createImg(arr[random].source, arr[random].val, arr[random].type);
        $(".tablecards").append(img);
        arr.splice(random, 1);
    }

}
console.log(arr);

$("#d").on("click", function() {

    if (arr.length == 0 && $(".playercards img").length == 0 && $(".realcards img").length == 0) {
        if (score > computerscore) {
            alert("Congratulation you win ya player !!!");
        } else if (score < computerscore) {
            alert("Ya player ya looser ");
        } else {
            alert("You are equal");
        }
    } else {
        //===============four random cards to player ===================
        $("#myround").html(parseInt($("#myround").html()) + 1);
        for (var i = 0; i < 4; i++) {
            var random = Math.floor(Math.random() * arr.length);

            var img = createImg(arr[random].source, arr[random].val, arr[random].type);
            $(".playercards").append(img);
            arr.splice(random, 1);
        }
        console.log(arr);
        //===============four random cards to copmuter===================
        for (var i = 0; i < 4; i++) {
            var random = Math.floor(Math.random() * arr.length);
            var img = createImg(arr[random].source, arr[random].val, arr[random].type);
            $(".realcards").append(img);
            arr.splice(random, 1);
            $(".computercards").append($("<img>").attr("src", "cards/facedown.png"));

        }
        console.log(arr);
    }
});

var score = 0;
$(".playercards").on("click", 'img', test)

function test() {
    $("#turn").html("2");
    player($(this));

    $(".playercards").off("click", "img");
    setTimeout(function() {
        $("#turn").html("1");
        var random = Math.floor(Math.random() * $(".realcards img").length);
        console.log($(".realcards img").eq(random).attr("val"));
        console.log($(".realcards img").eq(random).attr("type"))
        computer($(".realcards img").eq(random));
        $(".playercards").on("click", 'img', test);
        $(".computercards img").eq($(".computercards img").length - 1).remove();

    }, 2000);
}
//========================function of the player================================
function player(card) {
        var valplayer = card.attr("val");
        var typeplayer = card.attr("type");
        var sourceplayer = card.attr("src");
        var flag = false;

        for (var i = 0; i < $(".tablecards img").length; i++) {
            var valtable = $(".tablecards img").eq(i).attr("val");
            if (valplayer == valtable && !(typeplayer == "diamonds" && valplayer == 7)) {
                flag = true;
                score += 1;
                break;
            }
        }

        if (flag) {

            if (sumThreeCards(valplayer)) {
                        for (var i = 0; i < $(".tablecards img").length; i++) {
                        if ($(".tablecards img").eq(i).attr("val") == valplayer) {
                            $(".tablecards img").eq(i).remove();
                             if ((".tablecards img").length == 0){
                                 score += 10; 
                             }
                            else{
                                                        
                               score += 1;
                            } 
                        }
                    }
                card.remove();
                score -= 1;
            } else if (sum(valplayer)) {
                 for (var i = 0; i < $(".tablecards img").length; i++) {
                        if ($(".tablecards img").eq(i).attr("val") == valplayer) {
                            $(".tablecards img").eq(i).remove();
                             if ((".tablecards img").length == 0){
                                 score += 10; 
                             }
                            else{                            
                               score += 1;
                            }
                        }
                    }
                card.remove();
                score -= 1;
            } else {
                if ($(".tablecards img").length == 1) {
                    card.remove();
                    score += 10;
                    $(".tablecards img").eq(0).remove();
                } else {
                    card.remove();
                    for (var i = 0; i < $(".tablecards img").length; i++) {
                        if ($(".tablecards img").eq(i).attr("val") == valplayer) {
                            $(".tablecards img").eq(i).remove();
                            score += 1;
                        }
                    }
                }
            }
            $("#myscore").html(score);

        } else {
            if (valplayer == "j" || (valplayer == 7 && typeplayer == "diamonds")) {
                debugger;
                if ($(".tablecards img").length == 0) {

                    var img = createImg(sourceplayer, valplayer, typeplayer);
                    console.log(img)
                    $(".tablecards").append(img);
                    card.remove();
                } else {
                    score += $(".tablecards img").length + 1;
                    $(".tablecards img").remove();
                    $("#myscore").html(score);

                    card.remove();
                }
            } else if (sumThreeCards(valplayer)) {
                card.remove();
            } else if (sum(valplayer)) {
                card.remove();
            } else {
                var img = createImg(sourceplayer, valplayer, typeplayer);
                $(".tablecards").append(img);
                card.remove();
            }
        }
    }
    //=====================function to check sum of two cards===============

function sum(val) {
    for (var i = 0; i < $(".tablecards img").length; i++) {
        for (var j = i+1; j < $(".tablecards img").length; j++) {
            var valtable = $(".tablecards img").eq(i).attr("val");
            valtable = parseInt(valtable);

            var valtable2 = $(".tablecards img").eq(j).attr("val");
            valtable2 = parseInt(valtable2);

            if (val == (valtable + valtable2)) {
                if ($(".tablecards img").length == 2) {
                    score += 13;
                } else {
                    score += 3;
                }
                $("#myscore").html(score);

                for (var i = 0; i < $(".tablecards img").length; i++) {

                    if ($(".tablecards img").eq(i).attr("val") == valtable) {
                        $(".tablecards img").eq(i).remove();
                    }

                    if ($(".tablecards img").eq(i).attr("val") == valtable2) {
                        $(".tablecards img").eq(i).remove();
                    }
                }
                return true;
            }
        }
    }
}

//=====================function to check sum of three cards===============

function sumThreeCards(val) {

    for (var i = 0; i < ($(".tablecards img").length - 2); i++) {
        for (var j = i+1; j < ($(".tablecards img").length - 1); j++) {
            for (var k = i+2; k < $(".tablecards img").length; k++) {
                var valtable = $(".tablecards img").eq(i).attr("val");
                valtable = parseInt(valtable);

                var valtable2 = $(".tablecards img").eq(j).attr("val");
                valtable2 = parseInt(valtable2);

                var valtable3 = $(".tablecards img").eq(k).attr("val");
                valtable3 = parseInt(valtable3);

                if (val == (valtable + valtable2 + valtable3))

                {
                    if ($(".tablecards img").length == 3) {
                        score += 14;
                    } else {
                        score += 4;
                    }
                    $("#myscore").html(score);
                    for (var i = 0; i < $(".tablecards img").length; i++) {

                        if ($(".tablecards img").eq(i).attr("val") == valtable) {
                            $(".tablecards img").eq(i).remove();
                        }

                        if ($(".tablecards img").eq(i).attr("val") == valtable2) {
                            $(".tablecards img").eq(i).remove();
                        }

                        if ($(".tablecards img").eq(i).attr("val") == valtable3) {
                            $(".tablecards img").eq(i).remove();
                        }
                    }

                    return true;
                }
            }
        }
    }
}

//======================================functon of computer======================================== 

var computerscore = 0;

function computer(computercard) {


    var valcomputer = computercard.attr("val");
    var typecomputer = computercard.attr("type");
    var sourcecomputer = computercard.attr("src");

    var flag = false;

    for (var i = 0; i < $(".tablecards img").length; i++) {

        var valtable = $(".tablecards img").eq(i).attr("val");
        if (valcomputer == valtable && !(typecomputer == "diamonds" && valcomputer == 7)) {
            flag = true;
            computerscore += 1;
            break;
        }
    }

    if (flag) {

        if (sumThreeCardsComputer(valcomputer)) {
             for (var i = 0; i < $(".tablecards img").length; i++) {
                        if ($(".tablecards img").eq(i).attr("val") == valcomputer) {
                            $(".tablecards img").eq(i).remove();
                             if ((".tablecards img").length == 0){
                                 score += 10; 
                             }
                            else{
                                                        
                               score += 1;
                            } 
                        }
                    }
            computercard.remove();
            computerscore -= 1;
        } else if (sumComputer(valcomputer)) {
             for (var i = 0; i < $(".tablecards img").length; i++) {
                        if ($(".tablecards img").eq(i).attr("val") == valcomputer) {
                            $(".tablecards img").eq(i).remove();
                             if ((".tablecards img").length == 0){
                                 score += 10; 
                             }
                            else{                                                  
                               score += 1;
                            } 
                        }
                    }
            computercard.remove();
            computerscore -= 1;
        } else {
            if ($(".tablecards img").length == 1) {
                $(".tablecards img").eq(0).remove();
                computercard.remove();
                computerscore += 10;
            } else {
                computercard.remove();
                for (var i = 0; i < $(".tablecards img").length; i++) {
                    if ($(".tablecards img").eq(i).attr("val") == valcomputer) {
                        $(".tablecards img").eq(i).remove();
                        computerscore += 1;
                    }
                }
            }
        }
        $("#computerscore").html(computerscore);
    } else {
        if (valcomputer == "j" || (valcomputer == 7 && typecomputer == "diamonds"))

        {
              debugger;
            if ($(".tablecards img").length == 0) {

                var img = createImg(sourcecomputer, valcomputer, typecomputer);
                $(".tablecards").append(img);
                computercard.remove();
            } else {
                computerscore += $(".tablecards img").length + 1;
                $(".tablecards img").remove();
                $("#computerscore").html(computerscore);
                computercard.remove();
            }

        } else if (sumThreeCardsComputer(valcomputer)) {
            computercard.remove();
        } else if (sumComputer(valcomputer)) {
            computercard.remove();
        } else {
            var img = createImg(sourcecomputer, valcomputer, typecomputer);
            $(".tablecards").append(img);
            computercard.remove();
        }
    }


}


function sumComputer(val) {
    for (var i = 0; i < $(".tablecards img").length; i++) {
        for (var j = i+1; j < $(".tablecards img").length; j++) {
            var valtable = $(".tablecards img").eq(i).attr("val");
            valtable = parseInt(valtable);

            var valtable2 = $(".tablecards img").eq(j).attr("val");
            valtable2 = parseInt(valtable2);

            if (val == (valtable + valtable2)) {
                if ($(".tablecards img").length == 2) {
                    computerscore += 13;
                } else {
                    computerscore += 3;
                }
                $("#computerscore").html(computerscore);

                for (var i = 0; i < $(".tablecards img").length; i++) {

                    if ($(".tablecards img").eq(i).attr("val") == valtable) {
                        $(".tablecards img").eq(i).remove();
                    }

                    if ($(".tablecards img").eq(i).attr("val") == valtable2) {
                        $(".tablecards img").eq(i).remove();
                    }
                }
                return true;
            }
        }
    }
}

//=====================function to check sum of three cards===============
function sumThreeCardsComputer(val) {

    for (var i = 0; i < ($(".tablecards img").length - 2); i++) {
        for (var j = i+1; j < ($(".tablecards img").length - 1); j++) {
            for (var k = i+2; k < $(".tablecards img").length; k++) {
                var valtable = $(".tablecards img").eq(i).attr("val");
                valtable = parseInt(valtable);
                var valtable2 = $(".tablecards img").eq(j).attr("val");
                valtable2 = parseInt(valtable2);
                var valtable3 = $(".tablecards img").eq(k).attr("val");
                valtable3 = parseInt(valtable3);
                if (val == (valtable + valtable2 + valtable3))

                {
                    if ($(".tablecards img").length == 3) {
                        computerscore += 14;
                    } else {
                        computerscore += 4;
                    }
                    $("#computerscore").html(computerscore);
                    for (var i = 0; i < $(".tablecards img").length; i++) {

                        if ($(".tablecards img").eq(i).attr("val") == valtable) {
                            $(".tablecards img").eq(i).remove();
                        }

                        if ($(".tablecards img").eq(i).attr("val") == valtable2) {
                            $(".tablecards img").eq(i).remove();
                        }

                        if ($(".tablecards img").eq(i).attr("val") == valtable3) {
                            $(".tablecards img").eq(i).remove();
                        }
                    }
                    return true;
                }
            }
        }
    }
}  
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
