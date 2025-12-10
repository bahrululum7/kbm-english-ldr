const modules = {
  week1: {
    title: 'Week 1 – Basic Survival English',
    content: `
<div class='module-box'><h3>Materi</h3>
<ul>
<li>Pronouns (I, You, He/She...)</li>
<li>Simple Present</li>
<li>Past Tense</>
<li>Daily Vocabulary</li>
</ul></div>

<div class='module-box'><h3>Jadwal KBM (30 min per day)</h3>
<p><b>Day 1:</b> Pronouns</p>
<!-- ========================= -->
<!-- PDF MODULE DI BAWAH DAY 1 -->
<!-- ========================= -->
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

<!-- ========================= -->
<p><b>Day 2:</b> Vocabulary Building</p>
<p><b>Day 3:</b> Simple Present</p>
<p><b>Day 4:</b> Past Tense</p>
<p><b>Day 5:</b> Presentation</i>.</p>
</div>`,
  },

  week2: {
    title: 'Week 2 – Coming Soon',
    content: `<div class='module-box'><h3>Coming Soon</h3><p>Minggu ini masih dikunci. Fokus dulu Week 1: Speaking & Conversation Basics.</p></div>`,
  },

  week3: {
    title: 'Week 3 – Coming Soon',
    content: `<div class='module-box'><h3>Coming Soon</h3><p>Minggu ini akan terbuka setelah Week 2 selesai.</p></div>`,
  },

  week4: {
    title: 'Week 4 – Coming Soon',
    content: `<div class='module-box'><h3>Coming Soon</h3><p>Minggu terakhir akan aktif setelah semua minggu sebelumnya selesai.</p></div>`,
  },
};

function loadModule(week) {
  document.getElementById('module-title').innerHTML = modules[week].title;
  document.getElementById('module-content').innerHTML = modules[week].content;
}
