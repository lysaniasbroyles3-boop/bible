// ==============================
// BOBOS BIBLE STUDY JAVASCRIPT
// ==============================

// ---------- PAGE NAVIGATION ----------

const pages = document.querySelectorAll(".page");
const navigationButtons = document.querySelectorAll("[data-page]");

function showPage(pageName) {

    pages.forEach(page => {
        page.classList.remove("active");
    });

    const selectedPage = document.getElementById(pageName);

    if (selectedPage) {
        selectedPage.classList.add("active");
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
}

navigationButtons.forEach(button => {

    button.addEventListener("click", () => {

        const page = button.dataset.page;

        showPage(page);

    });

});


// ---------- PROGRESS ----------

let completedStudies = 0;
let xp = 0;
let level = 1;

function updateProgress() {

    document.getElementById("completed").textContent = completedStudies;
    document.getElementById("xp").textContent = xp;
    document.getElementById("level").textContent = level;

}


// ---------- BIBLE STUDY QUIZ ----------

const quiz = document.getElementById("quiz");
const quizResult = document.getElementById("quizResult");

quiz.addEventListener("submit", function(event) {

    event.preventDefault();

    const questions = [
        "q1",
        "q2",
        "q3"
    ];

    let score = 0;

    questions.forEach(question => {

        const answer = document.querySelector(
            `input[name="${question}"]:checked`
        );

        if (answer && answer.value === "correct") {
            score++;
        }

    });

    if (score === 3) {

        completedStudies++;
        xp += 100;

        if (xp >= level * 100) {
            level++;
        }

        updateProgress();

        quizResult.innerHTML =
            "🎉 Excellent! You got all 3 questions correct!<br><br>" +
            "You earned <strong>100 XP</strong>.";

    } else {

        quizResult.innerHTML =
            `You got <strong>${score}/3</strong> correct.<br><br>` +
            "Review the passage and try again!";

    }

    quizResult.classList.add("show");

});


// ---------- VERSE DATABASE ----------

const verses = {

    "john 3:16": {
        reference: "John 3:16",
        text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."
    },

    "proverbs 3:5": {
        reference: "Proverbs 3:5",
        text: "Trust in the Lord with all your heart and lean not on your own understanding."
    },

    "philippians 4:13": {
        reference: "Philippians 4:13",
        text: "I can do all things through Christ who strengthens me."
    },

    "psalm 23:1": {
        reference: "Psalm 23:1",
        text: "The Lord is my shepherd; I shall not want."
    },

    "jeremiah 29:11": {
        reference: "Jeremiah 29:11",
        text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future."
    },

    "romans 8:28": {
        reference: "Romans 8:28",
        text: "And we know that in all things God works for the good of those who love him."
    },

    "psalm 119:105": {
        reference: "Psalm 119:105",
        text: "Your word is a lamp for my feet, a light on my path."
    }

};


// ---------- VERSE SEARCH ----------

const searchButton = document.getElementById("searchVerse");
const searchInput = document.getElementById("verseSearch");
const verseResult = document.getElementById("verseResult");

function searchVerse(reference) {

    const cleanedReference = reference
        .trim()
        .toLowerCase();

    if (!cleanedReference) {

        verseResult.innerHTML = `
            <h2>⚠️ Enter a verse</h2>
            <p>Try something like John 3:16.</p>
        `;

        return;
    }

    const verse = verses[cleanedReference];

    if (verse) {

        verseResult.innerHTML = `
            <h2>📖 ${verse.reference}</h2>
            <p>${verse.text}</p>
        `;

    } else {

        verseResult.innerHTML = `
            <h2>🔎 Verse Not Found</h2>
            <p>
                That verse isn't in the built-in verse collection yet.
                Try one of the suggested verses above.
            </p>
        `;

    }

}

searchButton.addEventListener("click", () => {

    searchVerse(searchInput.value);

});


searchInput.addEventListener("keydown", event => {

    if (event.key === "Enter") {
        searchVerse(searchInput.value);
    }

});


// ---------- QUICK VERSE BUTTONS ----------

const quickVerseButtons =
    document.querySelectorAll("[data-verse]");

quickVerseButtons.forEach(button => {

    button.addEventListener("click", () => {

        const reference = button.dataset.verse;

        searchInput.value = reference;

        searchVerse(reference);

    });

});


// ---------- START WITH HOME ----------

showPage("home");
updateProgress();
