const copyButton =
    document.getElementById("copyButton");

const copyText =
    document.getElementById("copyText");

const emailElement =
    document.getElementById("etransferEmail");

const email =
    emailElement.textContent.trim();


copyButton.addEventListener(
    "click",
    async () => {

        try {

            await navigator.clipboard.writeText(
                email
            );

            copyText.textContent =
                "✓ Email Copied!";


            setTimeout(
                () => {

                    copyText.textContent =
                        "Copy Email Address";

                },
                2000
            );

        }

        catch (error) {

            /*
             Fallback for browsers where
             navigator.clipboard isn't available.
            */

            const temporaryInput =
                document.createElement("input");

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


            copyText.textContent =
                "✓ Email Copied!";


            setTimeout(
                () => {

                    copyText.textContent =
                        "Copy Email Address";

                },
                2000
            );

        }

    }
);