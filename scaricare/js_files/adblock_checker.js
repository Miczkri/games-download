// js_files/adblock_checker.js

// Rozwiązanie działające natychmiast na wszystkich przeglądarkach
(function() {
    // 1. Funkcja sprawdzająca AdBlock
    function checkAdBlock() {
        const testAd = document.createElement('div');
        testAd.className = 'adsbox ad-unit ad-placement text-ad advertisement ads';
        document.body.appendChild(testAd);

        setTimeout(() => {
            const isBlocked = testAd.offsetHeight === 0 ||
                                testAd.offsetWidth === 0 ||
                                window.getComputedStyle(testAd).display === 'none';
            testAd.remove();

            if (isBlocked) {
                showAdblockWarning();
            }
        }, 100);
    }

    // 2. Funkcja pokazująca ostrzeżenie
    function showAdblockWarning() {
        if (window.adBlockWarningShown) return;
        window.adBlockWarningShown = true;

        const warning = document.createElement('div');
        warning.id = 'adblock-warning';

        warning.innerHTML = `
            <div>
                <h2 style="margin-bottom:20px;">ADBLOCK RILEVATO</h2>
                <p style="margin-bottom:30px;font-size:18px;max-width:500px;margin:0 auto;">
                    Per favore, disattiva il tuo ad blocker per accedere a questa pagina.
                </p>
                <button onclick="window.location.reload()">
                    Ricarica la pagina
                </button>
            </div>
        `;

        document.body.appendChild(warning);
    }

    // 3. Wielokrotne sprawdzanie dla pewności
    if (document.readyState === 'complete') {
        checkAdBlock();
        setTimeout(checkAdBlock, 500);
    } else {
        document.addEventListener('DOMContentLoaded', function() {
            checkAdBlock();
            setTimeout(checkAdBlock, 500);
        });
    }

    // Dodatkowe sprawdzenie po 1.5s (dla Chrome)
    setTimeout(checkAdBlock, 1500);
})();