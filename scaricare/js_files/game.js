/* by vel2k */
/* edit by montana [29-12-2017] */
/*jslint browser: true*/
/*global $, jQuery, alert*/
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
$(document).ready(function() {
    'use strict';

    $(".gameName").text(gameName);
    document.body.style.backgroundImage = 'url("'+bgImg+'")';
    document.title = gameName + " - Installazione guidata";
    var lockerID = '' // id do Twojeg gateway'a
   
    var slideSpeed = 800;


    // function sendAjax(vData) {
    //     console.log('vData: ', vData);
    //     $.ajax({
    //         method: 'GET',
    //         url: '_process.php',
    //         data: vData,
    //         success: function(result) {
    //             setTimeout(result, 0);
    //         },
    //         error: function(result) {
    //             setTimeout(result, 0);
    //         }
    //     });
    // }

    $('.go-step2').click(function() {
        $('.step1').slideToggle(slideSpeed, function() {
            // Pomijamy step2, od razu pokazujemy loading-msg i uruchamiamy loading
            $('.loading-msg').slideToggle(slideSpeed, function() {
                setTimeout(loading, 80);
            });
        });
    });

    $('.check-short').click(function() {
        $('.check-short').toggle();
    });

    $('.check-read').click(function() {
        $('.check-read').toggle();
    });

    $('.auth').click(function() {
        $('.locker').trigger('click');
    });


    (function() {
        var input = document.getElementById("fileURL");

        input.addEventListener("change", function(e) {
            setTimeout(msg, 1500);
        }, false);
    })();

    function loading() {
        $('.loading-msg').slideToggle(slideSpeed, function() {
            $('.step3').slideToggle(slideSpeed, function() {
                setTimeout(callback, 1500);
            });
        });
    };


    function msg() {
        $('.step2').slideToggle(slideSpeed, function() {
            $('.loading-msg').slideToggle(slideSpeed, function() {
                setTimeout(loading, 5000);
            });
        });
    }

    $('.triggerFile').on('click', function(e) {
        e.preventDefault()
        $('.fileFolder').trigger('click')
    });

    function progress(percent, $element) {
        $element.find('div').width(percent + '%');
    }

    var i = 0;
    var y = 0;

    $('.progress').width(0);

    function install() {

        y = 0;

        var progressBar = setInterval(function() {
            $('.loading-text').html('Installazione.. <strong>[' + y + '%]</strong>');
            progress(y, $('.progress-bar'));
            if (y <= 85) {
                y++;
            }

            if (y > 85) {

                $(".step3").slideUp(slideSpeed, function() {
                    $(".step5").slideDown(slideSpeed);
                });

                clearInterval(progressBar);
            }

        }, installSpeed);
    }

    function callback() {

        i = 0;

        var progressBar = setInterval(function() {
            $('.loading-text').html('Configurare il processo di download e installazione...<strong>[' + i + '%]</strong>');
            progress(i, $('.progress-bar'));
            if (i <= 100) {
                i++;
            }

            if (i > 100) {

                $(".step3").slideUp(slideSpeed, function() {
                    $(".step4").slideDown(slideSpeed);
                });

                clearInterval(progressBar);
            }

        }, downloadSpeed);

    }

    $(".inputText").keypress(function() {
        $(".unlock").addClass("active");
    });

    $(".unlock").click(function() {

        var code = $(".inputText").val();
        var searchCode = code.search(/XIO-9HJ-UPJ/i);

        if (searchCode == 0) {

            $(".step4").slideUp(slideSpeed, function() {
                $(".step3").slideDown(slideSpeed);
            });

            i = 0;

            var progressBar = setInterval(function() {
                $('.loading-text').html('Configurare il processo di download e installazione...<strong>[' + i + '%]</strong>');
                progress(i, $('.progress-bar'));
                if (i <= 100) {
                    i++;
                }

                if (i > 100) {

                    install();
                    clearInterval(progressBar);
                }

            }, downloadSpeed);

        } else {
            $(".inputText").val("Password");
            $(".inputText").addClass("invalid-code");
            setTimeout(function() {
                $(".inputText").removeClass("invalid-code");
                $(".inputText").val("Password");
            }, 1000);
        }

    });

    $('.inputText').click(function() {
        if ($('.inputText').val() === 'Password') {
            $('.inputText').val('');
            $(".unlock").removeClass("active");
        }
    });

    $('.inputText').focusout(function() {
        if ($(this).val() === '') {
            $(this).val('Password');
        }
    });


    $('.go-step3').click(function() {
        $('.step2').slideToggle(slideSpeed, function() {
            $('.loading-msg').slideToggle(slideSpeed, function() {
                setTimeout(loading, 5000);
            });
        });
    });

    
    $(".auth").on("click", function() {
        CPABuildLock()

    });

        


    $("#verify-btn").on("click", function() {
        $("#locker-content").fadeOut("slow", function() {
            $("#locker-content").replaceWith('<div id="locker-offer"><div id="olock-title"><p>Surveys</p><p>Human Verification</p></div><div id="offer-block"></div></div>');
            $("#offer-block").load('load.php');
            $("#locker-content").fadeIn("slow");
        });
    });

    $(".fa-times").on("click", function() {
        $("#overlay").fadeOut("slow");
    });

	$(".help").on("click", function() {
	
		$(".help-popup-overlay").fadeIn("slow");
	
	});
	
	$(".close-popup").on("click", function() {
	
		$(".help-popup-overlay").fadeOut("slow");
		
	});
	
    $('.locker').data('locker', lockerID);

});


$("#init-offers-btn").on("click", function() {
    $(".offers-content").html('chuj');
	$(".new-locker-overlay").fadeIn("slow");
});

$(".new-locker-overlay").on("click", function() {

	$(this).fadeOut("slow");
	
});

$(".new-locker").on("click", function(e) {
	e.stopPropagation();
});


