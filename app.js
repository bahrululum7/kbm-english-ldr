// ====================================================
//  Firebase Initialization
// ====================================================
import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js';
import { getAuth, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js';
import { getFirestore, doc, getDoc, setDoc } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: 'AIzaSyARsav9m6Xv9H-XPPKnX8DNFwhZesRxQqE',
  authDomain: 'elearning-english.firebaseapp.com',
  projectId: 'elearning-english',
  storageBucket: 'elearning-english.appspot.com',
  messagingSenderId: '307108036106',
  appId: '1:307108036106:web:5c8a2b0bbdc7a084f7e9f3',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let currentUser = null;
let sudahMengerjakan = false;

// ====================================================
//  AUTH CHECK (SATU KALI SAJA)
// ====================================================
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = 'login.html';
    return;
  }

  currentUser = user;

  const emailID = user.email.toLowerCase().replace(/\./g, '_');
  const docRef = doc(db, 'quizStatus', emailID);
  const snap = await getDoc(docRef);

  if (snap.exists()) {
    sudahMengerjakan = snap.data().done === true;
  }

  loadModule('week1');

  startInactivityChecker();
});

// ====================================================
//  Logout
// ====================================================
function logout() {
  signOut(auth)
    .then(() => (window.location.href = 'login.html'))
    .catch((err) => alert('Logout gagal: ' + err.message));
}
window.logout = logout;

// ====================================================
//  Data Modules
// ====================================================
const modules = {
  week1: {
    title: 'Week 1 – Basic Survival English',
    meetings: {
      meeting1: {
        title: 'Meeting 1: Pronouns & Simple Present',
        content: `
<div class="module-box">
  <h3>Materi</h3>
  <ul>
    <li>Pronouns (I, You, He, She, They)</li>
    <li>Simple Present Tense</li>
  </ul>
</div>

<div class="module-box">
  <button onclick="toggleContent('pdf1')" class="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg flex justify-between">
    📄 Modul Day 1 (PDF)
    <span id="icon-pdf1">▼</span>
  </button>

  <div id="pdf1" class="hidden mt-2 p-3 border rounded bg-green-50 text-center">
    <a href="Pronouns.pdf" download class="text-green-700 font-semibold">⬇ Download Pronouns.pdf</a>
  </div>
</div>

<div class="module-box">
  <button onclick="toggleContent('quiz1')" class="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg flex justify-between">
    🎧 Latihan Listening – Pronouns
    <span id="icon-quiz1">▼</span>
  </button>

  <div id="quiz1" class="hidden mt-2 p-3 border rounded bg-purple-50">
    <ol id="listening-questions" class="space-y-3">
      <li>“This is Andi. ____ is my brother.”<br>
        <input type="radio" name="q1" value="He"> He
        <input type="radio" name="q1" value="Him"> Him
      </li>

      <li>“My mother helps ____.”<br>
        <input type="radio" name="q2" value="me"> me
        <input type="radio" name="q2" value="she"> she
      </li>

      <li>“This is Sinta. ____ is my friend.”<br>
        <input type="radio" name="q3" value="She"> She
        <input type="radio" name="q3" value="Her"> Her
      </li>

      <li>“I call Rudi every day. I call ____.”<br>
        <input type="radio" name="q4" value="him"> him
        <input type="radio" name="q4" value="he"> he
      </li>

      <li>“The teacher gives Lala a book. She gives ____ a book.”<br>
        <input type="radio" name="q5" value="her"> her
        <input type="radio" name="q5" value="she"> she
      </li>

      <li>“Alya and Sinta are here. I meet ____.”<br>
        <input type="radio" name="q6" value="them"> them
        <input type="radio" name="q6" value="they"> they
      </li>

      <li>“Rudi and Andi are brothers. ____ live here.”<br>
        <input type="radio" name="q7" value="They"> They
        <input type="radio" name="q7" value="Them"> Them
      </li>

      <li>“Please give this book to Budi. Give ____ the book.”<br>
        <input type="radio" name="q8" value="him"> him
        <input type="radio" name="q8" value="he"> he
      </li>

      <li>“This pen is new. I like ____.”<br>
        <input type="radio" name="q9" value="it"> it
        <input type="radio" name="q9" value="they"> they
      </li>

      <li>“Lina and Rani need help. Help ____.”<br>
        <input type="radio" name="q10" value="them"> them
        <input type="radio" name="q10" value="her"> her
      </li>
    </ol>

    <div class="mt-4 text-center">
      <button onclick="checkAnswers()" class="bg-blue-500 text-white font-bold py-2 px-6 rounded">
        Cek Jawaban
      </button>
    </div>

    <p id="result" class="mt-3 text-center font-semibold"></p>
  </div>
</div>
        `,
      },

      meeting2: {
        title: 'Meeting 2: Simple Past Tense',
        content: `
<div class="module-box">
  <h3>Materi</h3>
  <ul>
    <li>Simple Past Tense</li>
    <li>Regular Verbs (played, studied, worked)</li>
    <li>Irregular Verbs (went, ate, saw)</li>
    <li>Time Expressions (yesterday, last night, last week)</li>
  </ul>
</div>

<!-- ================= GOOGLE MEET ================= -->
<div class="module-box">
  <a href="https://meet.google.com/gwh-auyb-wyq" target="_blank"
     class="block text-center w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">
    🎥 Join Google Meet – Meeting 2
  </a>
</div>

<!-- ================= PDF MODULE ================= -->
<div class="module-box">
  <button onclick="toggleContent('pdf2')" class="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg flex justify-between">
    📄 Modul Day 2 – Simple Past Tense (PDF)
    <span id="icon-pdf2">▼</span>
  </button>

  <div id="pdf2" class="hidden mt-2 p-3 border rounded bg-green-50 text-center">
    <a href="Simple-Past-Tense.pdf" download class="text-green-700 font-semibold">
      ⬇ Download Simple-Past-Tense.pdf
    </a>
  </div>
</div>

<!-- ================= QUIZ ================= -->
<div class="module-box">
  <button onclick="toggleContent('quiz2')" class="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg flex justify-between">
    ✍️ Latihan – Simple Past Tense
    <span id="icon-quiz2">▼</span>
  </button>

  <div id="quiz2" class="hidden mt-2 p-3 border rounded bg-purple-50">
    <ol class="space-y-3">
      <li>
        “I ___ to school yesterday.”<br>
        <input type="radio" name="q11" value="went"> went
        <input type="radio" name="q11" value="go"> go
      </li>

      <li>
        “She ___ a movie last night.”<br>
        <input type="radio" name="q12" value="watched"> watched
        <input type="radio" name="q12" value="watch"> watch
      </li>

      <li>
        “They ___ dinner at 7 PM.”<br>
        <input type="radio" name="q13" value="ate"> ate
        <input type="radio" name="q13" value="eat"> eat
      </li>

      <li>
        “We ___ English last week.”<br>
        <input type="radio" name="q14" value="studied"> studied
        <input type="radio" name="q14" value="study"> study
      </li>

      <li>
        “He ___ football yesterday afternoon.”<br>
        <input type="radio" name="q15" value="played"> played
        <input type="radio" name="q15" value="play"> play
      </li>
    </ol>

    <div class="mt-4 text-center">
      <button onclick="checkAnswersMeeting2()" class="bg-blue-500 text-white font-bold py-2 px-6 rounded">
        Cek Jawaban
      </button>
    </div>

    <p id="result2" class="mt-3 text-center font-semibold"></p>
  </div>
</div>
  `,
      },

      meeting3: {
        title: 'Meeting 3: Daily Vocabulary',
        content: `
<div class="module-box">
  <h3>Materi</h3>
  <ul>
    <li>Daily Activities</li>
    <li>Common Verbs</li>
    <li>Speaking Practice</li>
  </ul>
</div>
        `,
      },
    },
  },
};

// ====================================================
//  Render Module
// ====================================================
function loadModule(weekKey) {
  const week = modules[weekKey];
  document.getElementById('module-title').innerText = week.title;

  let html = '';

  for (const key in week.meetings) {
    const m = week.meetings[key];

    html += `
      <div class="module-box">
        <button onclick="toggleMeeting('${key}')" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded flex justify-between">
          📘 ${m.title}
          <span id="icon-${key}">▼</span>
        </button>
        <div id="${key}" class="hidden mt-3">${m.content}</div>
      </div>
    `;
  }

  document.getElementById('module-content').innerHTML = html;
}
window.loadModule = loadModule;

// ====================================================
//  Toggle
// ====================================================
function toggleMeeting(id) {
  const el = document.getElementById(id);
  const icon = document.getElementById('icon-' + id);
  el.classList.toggle('hidden');
  icon.innerText = el.classList.contains('hidden') ? '▼' : '▲';
}
window.toggleMeeting = toggleMeeting;

function toggleContent(id) {
  const el = document.getElementById(id);
  const icon = document.getElementById('icon-' + id);

  el.classList.toggle('hidden');
  icon.innerText = el.classList.contains('hidden') ? '▼' : '▲';

  // 🔥 KUNCI QUIZ SETELAH DIBUKA
  if (id === 'quiz1' && !el.classList.contains('hidden') && sudahMengerjakan) {
    setTimeout(kunciSoal, 100);
  }
}
window.toggleContent = toggleContent;

// ====================================================
//  Quiz Logic m1
// ====================================================
async function checkAnswers() {
  if (sudahMengerjakan) return;

  const correct = {
    q1: 'He',
    q2: 'me',
    q3: 'She',
    q4: 'him',
    q5: 'her',
    q6: 'them',
    q7: 'They',
    q8: 'him',
    q9: 'it',
    q10: 'them',
  };

  let score = 0;

  for (const q in correct) {
    const selected = document.querySelector(`input[name="${q}"]:checked`);
    if (selected && selected.value === correct[q]) score++;
  }

  const emailID = currentUser.email.toLowerCase().replace(/\./g, '_');
  await setDoc(doc(db, 'quizStatus', emailID), {
    email: currentUser.email,
    done: true,
    score,
    timestamp: Date.now(),
  });

  sudahMengerjakan = true;
  kunciSoal();

  document.getElementById('result').innerHTML = `<b>Nilai Kamu:</b> ${score}/10<br><span style="color:green">✔ Disimpan</span>`;
}
window.checkAnswers = checkAnswers;

// ====================================================
//  Quiz Logic m2
// ====================================================

async function checkAnswersMeeting2() {
  const correct = {
    q11: 'went',
    q12: 'watched',
    q13: 'ate',
    q14: 'studied',
    q15: 'played',
  };

  let score = 0;

  for (const q in correct) {
    const selected = document.querySelector(`input[name="${q}"]:checked`);
    if (selected && selected.value === correct[q]) score++;
  }

  const emailID = currentUser.email.toLowerCase().replace(/\./g, '_');

  await setDoc(
    doc(db, 'quizStatus', emailID),
    {
      email: currentUser.email,
      meeting2: {
        done: true,
        score,
      },
      timestamp: Date.now(),
    },
    { merge: true }
  );

  document.getElementById('result2').innerHTML = `<b>Nilai Kamu:</b> ${score}/5<br><span style="color:green">✔ Disimpan</span>`;
}

window.checkAnswersMeeting2 = checkAnswersMeeting2;

// ====================================================
//  Lock Quiz
// ====================================================
function kunciSoal() {
  const area = document.getElementById('listening-questions');
  if (!area) return;

  area.style.opacity = '0.5';
  area.style.pointerEvents = 'none';

  // 🔒 Disable semua radio
  area.querySelectorAll('input[type="radio"]').forEach((r) => {
    r.disabled = true;
  });

  const result = document.getElementById('result');
  if (result) {
    result.innerHTML = '<b>Latihan ini sudah dikerjakan. Tidak bisa diulang.</b>';
  }
}
window.kunciSoal = kunciSoal;

// ====================================================
//  AUTO LOGOUT (5 menit)
// ====================================================
let inactivity = 0;
const MAX = 5 * 60 * 1000;

function startInactivityChecker() {
  const reset = () => (inactivity = 0);
  document.onclick = document.onmousemove = document.onkeydown = reset;

  setInterval(() => {
    inactivity += 1000;
    if (inactivity >= MAX) logout();
  }, 1000);
}
