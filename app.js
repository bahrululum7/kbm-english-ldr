// ----------------------
// Firebase Initialization
// ----------------------
import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js';
import { getAuth, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js';

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

// ----------------------
// Cek login, kalau belum login redirect ke login.html
// ----------------------
onAuthStateChanged(auth, (user) => {
  if (!user) window.location.href = 'login.html';
});

// ----------------------
// Logout
// ----------------------
function logout() {
  signOut(auth)
    .then(() => {
      window.location.href = 'login.html';
    })
    .catch((error) => {
      alert('Logout gagal: ' + error.message);
    });
}

// ----------------------
// Modules
// ----------------------
const modules = {
  week1: {
    title: 'Week 1 – Basic Survival English',
    content: `
<div class='module-box'><h3>Materi</h3>
<ul>
<li>Pronouns (I, You, He/She...)</li>
<li>Simple Present</li>
<li>Past Tense</li>
<li>Daily Vocabulary</li>
</ul></div>

<div class='module-box'><h3>Jadwal KBM (30 min per day)</h3>
<p><b>Day 1:</b> Pronouns</p>

<p>
  <strong>Link Meeting:</strong><br>
  <a href="https://meet.google.com/gwh-auyb-wyq" target="_blank">
    https://meet.google.com/gwh-auyb-wyq
  </a>
</p>

<div class="pdf-box">
  <h4>📄 Modul Day 1 (PDF)</h4>
  <div class="pdf-small-preview">
    <iframe 
      src="Pronouns.pdf"
      width="180px"
      height="140px"
      style="border:1px solid #ccc; border-radius:8px;">
    </iframe>
  </div>
  <a href="Pronouns.pdf" download class="pdf-download">⬇ Download PDF</a>
</div>

<div class="module-box">
  <h3>🎧 Latihan Listening – Subject & Object Pronouns (10 Soal)</h3>
  <p>Pilih jawaban yang benar berdasarkan kalimat yang didengar (mentor membacakan soal).</p>

  <ol id="listening-questions">

    <li>
  “___”<br>
  A. <input type="radio" name="q1" value="He"> He<br>
  B. <input type="radio" name="q1" value="Him"> Him<br>
  C. <input type="radio" name="q1" value="She"> She<br>
  D. <input type="radio" name="q1" value="Her"> Her<br>
  E. <input type="radio" name="q1" value="They"> They
</li>

<li>
  “___”<br>
  A. <input type="radio" name="q2" value="he"> he<br>
  B. <input type="radio" name="q2" value="they"> they<br>
  C. <input type="radio" name="q2" value="me"> me<br>
  D. <input type="radio" name="q2" value="she"> she<br>
  E. <input type="radio" name="q2" value="him"> him
</li>

<li>
  “___”<br>
  A. <input type="radio" name="q3" value="Her"> Her<br>
  B. <input type="radio" name="q3" value="She"> She<br>
  C. <input type="radio" name="q3" value="Him"> Him<br>
  D. <input type="radio" name="q3" value="They"> They<br>
  E. <input type="radio" name="q3" value="It"> It
</li>

<li>
  “___”<br>
  A. <input type="radio" name="q4" value="he"> he<br>
  B. <input type="radio" name="q4" value="she"> she<br>
  C. <input type="radio" name="q4" value="him"> him<br>
  D. <input type="radio" name="q4" value="her"> her<br>
  E. <input type="radio" name="q4" value="them"> them
</li>

<li>
  “___”<br>
  A. <input type="radio" name="q5" value="us"> us<br>
  B. <input type="radio" name="q5" value="we"> we<br>
  C. <input type="radio" name="q5" value="her"> her<br>
  D. <input type="radio" name="q5" value="him"> him<br>
  E. <input type="radio" name="q5" value="them"> them
</li>

<li>
  “___”<br>
  A. <input type="radio" name="q6" value="they"> they<br>
  B. <input type="radio" name="q6" value="them"> them<br>
  C. <input type="radio" name="q6" value="him"> him<br>
  D. <input type="radio" name="q6" value="us"> us<br>
  E. <input type="radio" name="q6" value="it"> it
</li>

<li>
  “___”<br>
  A. <input type="radio" name="q7" value="Them"> Them<br>
  B. <input type="radio" name="q7" value="They"> They<br>
  C. <input type="radio" name="q7" value="He"> He<br>
  D. <input type="radio" name="q7" value="She"> She<br>
  E. <input type="radio" name="q7" value="It"> It
</li>

<li>
  “___”<br>
  A. <input type="radio" name="q8" value="her"> her<br>
  B. <input type="radio" name="q8" value="she"> she<br>
  C. <input type="radio" name="q8" value="him"> him<br>
  D. <input type="radio" name="q8" value="me"> me<br>
  E. <input type="radio" name="q8" value="them"> them
</li>

<li>
  “___”<br>
  A. <input type="radio" name="q9" value="its"> its<br>
  B. <input type="radio" name="q9" value="it"> it<br>
  C. <input type="radio" name="q9" value="they"> they<br>
  D. <input type="radio" name="q9" value="them"> them<br>
  E. <input type="radio" name="q9" value="she"> she
</li>

<li>
  “___”<br>
  A. <input type="radio" name="q10" value="her"> her<br>
  B. <input type="radio" name="q10" value="him"> him<br>
  C. <input type="radio" name="q10" value="us"> us<br>
  D. <input type="radio" name="q10" value="them"> them<br>
  E. <input type="radio" name="q10" value="it"> it
</li>

  </ol>

  <button onclick="checkAnswers()" class="btn-check">Cek Jawaban</button>
  <p id="result"></p>
</div>
`,
  },
  week2: { title: 'Week 2 – Coming Soon', content: `<div class='module-box'><h3>Coming Soon</h3></div>` },
  week3: { title: 'Week 3 – Coming Soon', content: `<div class='module-box'><h3>Coming Soon</h3></div>` },
  week4: { title: 'Week 4 – Coming Soon', content: `<div class='module-box'><h3>Coming Soon</h3></div>` },
};

// ----------------------
// Load Module
// ----------------------
function loadModule(week) {
  document.getElementById('module-title').innerHTML = modules[week].title;
  document.getElementById('module-content').innerHTML = modules[week].content;
}

// ----------------------
// Check Answers
// ----------------------
function checkAnswers() {
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
  let wrongList = [];

  document.querySelectorAll('#listening-questions li').forEach((li) => {
    li.style.background = 'transparent';
    li.style.border = 'none';
    li.style.padding = '5px';
    li.style.borderRadius = '5px';
  });

  for (let q in correct) {
    const selected = document.querySelector(`input[name="${q}"]:checked`);
    const li = document.querySelector(`input[name="${q}"]`)?.closest('li');

    if (selected && li) {
      if (selected.value === correct[q]) {
        score++;
        li.style.background = '#d4ffd4';
        li.style.border = '1px solid #3cb43c';
      } else {
        wrongList.push(q);
        li.style.background = '#ffd4d4';
        li.style.border = '1px solid #d43c3c';
      }
    } else if (li) {
      wrongList.push(q);
      li.style.background = '#ffd4d4';
      li.style.border = '1px solid #d43c3c';
    }
  }

  const wrongText = wrongList.length ? `<br><b>Soal yang salah:</b> ${wrongList.join(', ')}` : '';
  document.getElementById('result').innerHTML = `<b>Nilai Kamu:</b> ${score} / 10 ${wrongText}`;
}

// ----------------------
// Expose ke global supaya HTML bisa panggil
// ----------------------
window.loadModule = loadModule;
window.checkAnswers = checkAnswers;
window.logout = logout;
