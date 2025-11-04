const openBtn = document.getElementById('openResume');
const closeBtn = document.getElementById('closeResume');
const modal = document.getElementById('resumeModal');
const resumeFrame = document.getElementById('resumeFrame');

openBtn.addEventListener('click', () => {
    // set the src ONLY when opening
    // if your PDF is in the same folder, do NOT start with "/"
    resumeFrame.src = 'assets/Clark2025Resume.pdf';
    modal.style.display = 'flex';
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
    modal.style.display = 'none';
    }
});