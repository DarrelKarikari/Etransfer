/* ==============================
   ELEMENTS
   ============================== */

const copyButton =
    document.getElementById("copyButton");

const copyText =
    document.getElementById("copyText");

const emailElement =
    document.getElementById("etransferEmail");

const languageCheckbox =
    document.getElementById("languageCheckbox");

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

    currentLanguage = language;

    document.documentElement.lang = language;


    /* Translate all elements */

    translatableElements.forEach((element) => {

        const translation =
            element.dataset[language];

        if (translation) {
            element.textContent = translation;
        }

    });


    /* Move language switch */

    languageCheckbox.checked =
        language === "fr";


    /* Change page title */

    if (language === "fr") {

        document.title =
            "Conférence Jeunesse & PENSA OQ 2026 | Virement Interac";

    } else {

        document.title =
            "OQ Area Youth & PENSA Conference 2026 | E-Transfer";

    }


    /* Reset copy button language */

    copyText.textContent =
        language === "fr"
            ? copyText.dataset.fr
            : copyText.dataset.en;


    /* Remember preference */

    localStorage.setItem(
        "preferredLanguage",
        language
    );
}


/* ==============================
   LANGUAGE TOGGLE
   ============================== */

languageCheckbox.addEventListener(
    "change",
    () => {

        if (languageCheckbox.checked) {

            switchLanguage("fr");

        } else {

            switchLanguage("en");

        }

    }
);


/* Load saved language */

switchLanguage(currentLanguage);


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
                    "✓ Adresse courriel copiée !";

            } else {

                copyText.textContent =
                    "✓ Email Copied!";

            }


            setTimeout(() => {

                copyText.textContent =
                    currentLanguage === "fr"
                        ? copyText.dataset.fr
                        : copyText.dataset.en;

            }, 2000);

        }

        catch (error) {

            const temporaryInput =
                document.createElement("input");

            temporaryInput.value = email;

            document.body.appendChild(
                temporaryInput
            );

            temporaryInput.select();

            document.execCommand("copy");

            temporaryInput.remove();


            if (currentLanguage === "fr") {

                copyText.textContent =
                    "✓ Adresse courriel copiée !";

            } else {

                copyText.textContent =
                    "✓ Email Copied!";

            }


            setTimeout(() => {

                copyText.textContent =
                    currentLanguage === "fr"
                        ? copyText.dataset.fr
                        : copyText.dataset.en;

            }, 2000);
        }
    }
);