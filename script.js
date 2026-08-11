/* ==============================
   GET ELEMENTS
   ============================== */

const copyButton =
    document.getElementById("copyButton");

const copyText =
    document.getElementById("copyText");

const emailElement =
    document.getElementById("etransferEmail");

const languageButton =
    document.getElementById("languageButton");

const translatableElements =
    document.querySelectorAll(".translatable");

const email =
    emailElement.textContent.trim();


/* ==============================
   LANGUAGE
   ============================== */

let currentLanguage =
    localStorage.getItem("preferredLanguage") || "en";


function switchLanguage(language) {

    currentLanguage =
        language;


    document.documentElement.lang =
        language;


    /*
       Translate text
    */

    translatableElements.forEach(
        (element) => {

            const translatedText =
                element.dataset[language];

            if (translatedText) {

                element.textContent =
                    translatedText;

            }

        }
    );


    /*
       FRENCH:
       slide from LEFT -> RIGHT
    */

    if (language === "fr") {

        languageButton.classList.add(
            "french-active"
        );

        languageButton.setAttribute(
            "aria-pressed",
            "true"
        );

        copyText.textContent =
            copyText.dataset.fr;

        document.title =
            "Conférence Jeunesse & PENSA OQ 2026 | Virement Interac";

    }


    /*
       ENGLISH:
       slide from RIGHT -> LEFT
    */

    else {

        languageButton.classList.remove(
            "french-active"
        );

        languageButton.setAttribute(
            "aria-pressed",
            "false"
        );

        copyText.textContent =
            copyText.dataset.en;

        document.title =
            "OQ Area Youth & PENSA Conference 2026 | E-Transfer";

    }


    /*
       Remember selection
    */

    localStorage.setItem(
        "preferredLanguage",
        language
    );

}


/* ==============================
   CLICK TO SWITCH
   ============================== */

languageButton.addEventListener(
    "click",
    () => {

        const nextLanguage =
            currentLanguage === "en"
                ? "fr"
                : "en";


        switchLanguage(
            nextLanguage
        );

    }
);


/* ==============================
   RESTORE LANGUAGE
   ============================== */

switchLanguage(
    currentLanguage
);


/* ==============================
   COPY EMAIL
   ============================== */

copyButton.addEventListener(
    "click",
    async () => {

        try {

            await navigator.clipboard.writeText(
                email
            );


            if (currentLanguage === "fr") {

                copyText.textContent =
                    "✓ Adresse courriel copiée!";

            } else {

                copyText.textContent =
                    "✓ Email Copied!";

            }


            setTimeout(
                () => {

                    if (currentLanguage === "fr") {

                        copyText.textContent =
                            copyText.dataset.fr;

                    } else {

                        copyText.textContent =
                            copyText.dataset.en;

                    }

                },

                2000
            );

        }

        catch (error) {

            const temporaryInput =
                document.createElement(
                    "input"
                );


            temporaryInput.value =
                email;


            document.body.appendChild(
                temporaryInput
            );


            temporaryInput.select();


            document.execCommand(
                "copy"
            );


            temporaryInput.remove();


            if (currentLanguage === "fr") {

                copyText.textContent =
                    "✓ Adresse courriel copiée!";

            } else {

                copyText.textContent =
                    "✓ Email Copied!";

            }


            setTimeout(
                () => {

                    if (currentLanguage === "fr") {

                        copyText.textContent =
                            copyText.dataset.fr;

                    } else {

                        copyText.textContent =
                            copyText.dataset.en;

                    }

                },

                2000
            );

        }

    }
);