const letters = {
    reminder: {
        title: "A Little Reminder",
        text: `
            <p>I just wanted to remind you that you're doing better than you probably think you are.</p>

            <p>Life can get pretty messy sometimes, and it's easy to focus on all the things that aren't going right.</p>

            <p>But I hope you don't forget about all the little things you've managed to get through already. You've come further than you realize.</p>

            <p>So whenever you're having one of those days where everything feels a little too much, take a breath and remember that you don't have to have everything figured out right away.</p>

            <p>You're allowed to take your time, make mistakes, change your mind, and just figure things out as you go.</p>

            <p>And yeah, that's basically it hehe. Just a little reminder that you're doing okay.</p>

            <p class="signature">— Pulo</p>
        `
    },

    littleThings: {
        title: "Little Things",
        text: `
            <p>I think it's the little things about people that make them special.</p>

            <p>The way someone laughs at something stupid, the random things they say, the way they get excited about something they like, or even the little habits they probably don't realize they have.</p>

            <p>Those are the things that end up becoming the memories you remember later.</p>

            <p>So I hope you never feel like you have to change everything about yourself to be worth knowing. The little things that make you you are probably more special than you realize.</p>

            <p>Keep being your weird, funny, random self hehe.</p>

            <p class="signature">— Pulo</p>
        `
    },

    heart: {
        title: "For Your Heart",
        text: `
            <p>I hope you always remember that you don't have to carry everything by yourself.</p>

            <p>There will be days when things feel confusing, tiring, or just completely annoying haha. And that's okay. Not every day has to be a good one.</p>

            <p>I hope you keep trusting God through those days and remember that He is still there, even when you don't understand what's happening.</p>

            <p>I pray that He gives you peace when your mind feels heavy, strength when things get difficult, and good people to walk through life with.</p>

            <p>Take care of yourself, okay? And don't forget to enjoy the little moments too.</p>

            <p>You've got this.</p>

            <p class="signature">— Pulo</p>
        `
    }
};

const mailbox = document.getElementById("mailbox");
const lettersArea = document.getElementById("lettersArea");
const instruction = document.getElementById("instruction");
const overlay = document.getElementById("letterOverlay");
const closeLetter = document.getElementById("closeLetter");
const letterHeading = document.getElementById("letterHeading");
const letterBody = document.getElementById("letterBody");
const envelopes = document.querySelectorAll(".envelope");

let mailboxOpened = false;
let selectedLetter = false;

mailbox.addEventListener("click", () => {
    if (mailboxOpened) {
        return;
    }

    mailboxOpened = true;
    mailbox.classList.add("open");
    mailbox.classList.add("shake");

    setTimeout(() => {
        mailbox.classList.remove("shake");
    }, 700);

    instruction.innerHTML =
        "There are three letters inside.<br><strong>You can only choose one.</strong>";

    setTimeout(() => {
        lettersArea.classList.add("visible");

        envelopes.forEach((envelope, index) => {
            setTimeout(() => {
                envelope.classList.add("pop");
            }, index * 130);
        });
    }, 550);
});

envelopes.forEach(envelope => {
    envelope.addEventListener("click", () => {
        if (selectedLetter) {
            return;
        }

        selectedLetter = true;

        const key = envelope.dataset.letter;
        const letter = letters[key];

        if (!letter) {
            return;
        }

        letterHeading.textContent = letter.title;
        letterBody.innerHTML = letter.text;

        envelope.classList.add("selected");

        envelopes.forEach(other => {
            if (other !== envelope) {
                other.classList.add("locked");
            }
        });

        setTimeout(() => {
            overlay.classList.add("open");
        }, 200);
    });
});

closeLetter.addEventListener("click", () => {
    overlay.classList.remove("open");
});

overlay.addEventListener("click", event => {
    if (event.target === overlay) {
        overlay.classList.remove("open");
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        overlay.classList.remove("open");
    }
});
function createPetal() {
    const petal = document.createElement("div");
    petal.className = "petal";

    const colors = [
        "#f4b8c6",
        "#efabc0",
        "#f6cbd5",
        "#f8d9e0",
        "#e8a7b8",
        "#f2c3cf"
    ];

    const size = 7 + Math.random() * 7;

    petal.style.width = size + "px";
    petal.style.height = size * 1.35 + "px";

    petal.style.left = Math.random() * 100 + "vw";
    petal.style.top = "-25px";

    petal.style.background =
        colors[
            Math.floor(
                Math.random() * colors.length
            )
        ];

    petal.style.setProperty(
        "--drift-mid",
        (Math.random() * 160 - 80) + "px"
    );

    petal.style.setProperty(
        "--drift-end",
        (Math.random() * 240 - 120) + "px"
    );

    petal.style.setProperty(
        "--drift-final",
        (Math.random() * 320 - 160) + "px"
    );

    petal.style.animationDuration =
        (5.5 + Math.random() * 4) + "s";

    petal.style.animationDelay =
        (Math.random() * 0.8) + "s";

    document.body.appendChild(petal);

    requestAnimationFrame(() => {
        petal.classList.add("active");
    });

    setTimeout(() => {
        petal.remove();
    }, 11000);
}

setInterval(() => {
    if (document.visibilityState === "visible") {
        createPetal();

        if (Math.random() > 0.35) {
            setTimeout(() => {
                if (document.visibilityState === "visible") {
                    createPetal();
                }
            }, 350);
        }

        if (Math.random() > 0.7) {
            setTimeout(() => {
                if (document.visibilityState === "visible") {
                    createPetal();
                }
            }, 700);
        }
    }
}, 1200);

setInterval(() => {
    if (document.visibilityState === "visible") {
        createPetal();
    }
}, 2600);

setInterval(() => {
    if (
        !mailboxOpened &&
        document.visibilityState === "visible"
    ) {
        mailbox.animate(
            [
                {
                    transform:
                        "translateY(0) rotate(0deg)"
                },
                {
                    transform:
                        "translateY(-4px) rotate(-1deg)"
                },
                {
                    transform:
                        "translateY(0) rotate(0deg)"
                }
            ],
            {
                duration: 900,
                easing: "ease-in-out"
            }
        );
    }
}, 6000);
