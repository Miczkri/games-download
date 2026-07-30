/* edit by montana [29-12-2017] / cleaned for CPAGrip */
/*jslint browser: true*/
/*global $, jQuery*/
$(document).ready(function() {
    'use strict';

    var slideSpeed = 800;

    // Ustawienia nazwy gry i tła
    if (typeof gameName !== 'undefined') {
        $(".gameName").text(gameName);
        document.title = gameName + " - Assistant de configuration";
    }
    if (typeof bgImg !== 'undefined') {
        document.body.style.backgroundImage = 'url("' + bgImg + '")';
    }

    // Przejścia między krokami (Step 1 -> Loading)
    $('.go-step2').click(function() {
        $('.step1').slideToggle(slideSpeed, function() {
            $('.loading-msg').slideToggle(slideSpeed, function() {
                setTimeout(loading, 80);
            });
        });
    });

    $('.check-short, .check-read').click(function() {
        $(this).toggle();
    });

    // Obsługa wyboru pliku
    var fileInput = document.getElementById("fileURL");
    if (fileInput) {
        fileInput.addEventListener("change", function() {
            setTimeout(msg, 1500);
        }, false);
    }

    function loading() {
        $('.loading-msg').slideToggle(slideSpeed, function() {
            $('.step3').slideToggle(slideSpeed, function() {
                setTimeout(callback, 1500);
            });
        });
    }

    function msg() {
        $('.step2').slideToggle(slideSpeed, function() {
            $('.loading-msg').slideToggle(slideSpeed, function() {
                setTimeout(loading, 5000);
            });
        });
    }

    $('.triggerFile').on('click', function(e) {
        e.preventDefault();
        $('.fileFolder').trigger('click');
    });

    function progress(percent, $element) {
        $element.find('div').width(percent + '%');
    }

    $('.progress').width(0);

    function install() {
        var y = 0;
        var progressBar = setInterval(function() {
            $('.loading-text').html('Installation.. <strong>[' + y + '%]</strong>');
            progress(y, $('.progress-bar'));
            if (y <= 85) {
                y++;
            } else {
                $(".step3").slideUp(slideSpeed, function() {
                    $(".step5").slideDown(slideSpeed);
                });
                clearInterval(progressBar);
            }
        }, typeof installSpeed !== 'undefined' ? installSpeed : 100);
    }

    function callback() {
        var i = 0;
        var progressBar = setInterval(function() {
            $('.loading-text').html('Configuration du processus de téléchargement et d\'installation...<strong>[' + i + '%]</strong>');
            progress(i, $('.progress-bar'));
            if (i <= 100) {
                i++;
            } else {
                $(".step3").slideUp(slideSpeed, function() {
                    $(".step4").slideDown(slideSpeed);
                });
                clearInterval(progressBar);
            }
        }, typeof downloadSpeed !== 'undefined' ? downloadSpeed : 100);
    }

    // Walidacja hasła
    $(".inputText").keypress(function() {
        $(".unlock").addClass("active");
    });

    $(".unlock").click(function() {
        var code = $(".inputText").val();
        var searchCode = code.search(/XIO-9HJ-UPJ/i);

        if (searchCode === 0) {
            $(".step4").slideUp(slideSpeed, function() {
                $(".step3").slideDown(slideSpeed);
            });

            var i = 0;
            var progressBar = setInterval(function() {
                $('.loading-text').html('Configuration du processus de téléchargement et d\'installation...<strong>[' + i + '%]</strong>');
                progress(i, $('.progress-bar'));
                if (i <= 100) {
                    i++;
                } else {
                    install();
                    clearInterval(progressBar);
                }
            }, typeof downloadSpeed !== 'undefined' ? downloadSpeed : 100);

        } else {
            $(".inputText").val("Mot de passe").addClass("invalid-code");
            setTimeout(function() {
                $(".inputText").removeClass("invalid-code").val("Mot de passe");
            }, 1000);
        }
    });

    $('.inputText').click(function() {
        if ($(this).val() === 'Mot de passe') {
            $(this).val('');
            $(".unlock").removeClass("active");
        }
    }).focusout(function() {
        if ($(this).val() === '') {
            $(this).val('Mot de passe');
        }
    });

    $('.go-step3').click(function() {
        $('.step2').slideToggle(slideSpeed, function() {
            $('.loading-msg').slideToggle(slideSpeed, function() {
                setTimeout(loading, 5000);
            });
        });
    });

    // Popupy i okna pomocnicze
    $(".fa-times, .close-popup").on("click", function() {
        $("#overlay, .help-popup-overlay").fadeOut("slow");
    });

    $(".help").on("click", function() {
        $(".help-popup-overlay").fadeIn("slow");
    });
});