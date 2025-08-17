const book = document.getElementById('book');
const bookContainer = document.querySelector('.bookContainer');
const mask = document.getElementById('mask');
const loading = document.getElementById('loading');
const pageIndicator = document.getElementById('pageIndicator');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let pages = [];
let currentPage = 0;
let autoFlipTimer = null;

async function init(){
  const imgs = await loadImages();
  if(imgs.length === 0){
    loading.style.display = 'none';
    return;
  }
  const w = imgs[0].naturalWidth;
  const h = imgs[0].naturalHeight;
  bookContainer.style.width = w + 'px';
  bookContainer.style.height = h + 'px';

  imgs.forEach((img, i) => {
    const page = document.createElement('div');
    page.className = 'page flip-side' + (i === 0 ? ' top' : '');
    page.style.zIndex = imgs.length - i;
    page.appendChild(img);
    const back = document.createElement('div');
    back.className = 'back';
    page.appendChild(back);
    book.appendChild(page);
    pages.push(page);
  });
  updateIndicator();
  loading.style.display = 'none';
}

function loadImages(){
  return new Promise(async (resolve) => {
    const imgs = [];
    let index = 1;
    while(true){
      try{
        const img = await loadImage(`content/${index}.jpg`);
        imgs.push(img);
        index++;
      }catch(e){
        break;
      }
    }
    resolve(imgs);
  });
}

function loadImage(src){
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function flipNext(){
  if(currentPage >= pages.length - 1) return;
  const page = pages[currentPage];
  page.classList.remove('vertical');
  page.classList.add('flipped');
  currentPage++;
  updateIndicator();
}

function flipPrev(){
  if(currentPage <= 0) return;
  currentPage--;
  const page = pages[currentPage];
  page.classList.remove('flipped');
  setTimeout(() => page.classList.remove('vertical'), 800);
  updateIndicator();
}

function flipUp(){
  if(currentPage >= pages.length - 1) return;
  const page = pages[currentPage];
  page.classList.add('vertical');
  page.classList.add('flipped');
  currentPage++;
  updateIndicator();
}

function flipDown(){
  if(currentPage <= 0) return;
  currentPage--;
  const page = pages[currentPage];
  page.classList.add('vertical');
  page.classList.remove('flipped');
  setTimeout(() => page.classList.remove('vertical'), 800);
  updateIndicator();
}

function updateIndicator(){
  pageIndicator.textContent = `${currentPage + 1} / ${pages.length}`;
}

prevBtn.addEventListener('click', flipPrev);
nextBtn.addEventListener('click', flipNext);

mask.addEventListener('mousemove', (e) => {
  const rect = bookContainer.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const margin = 80;
  if(x > rect.width - margin){
    bookContainer.classList.add('hover-right');
    bookContainer.classList.remove('hover-left','hover-top','hover-bottom');
  }else if(x < margin){
    bookContainer.classList.add('hover-left');
    bookContainer.classList.remove('hover-right','hover-top','hover-bottom');
  }else if(y < margin){
    bookContainer.classList.add('hover-top');
    bookContainer.classList.remove('hover-left','hover-right','hover-bottom');
  }else if(y > rect.height - margin){
    bookContainer.classList.add('hover-bottom');
    bookContainer.classList.remove('hover-left','hover-right','hover-top');
  }else{
    bookContainer.classList.remove('hover-left','hover-right','hover-top','hover-bottom');
  }
});

mask.addEventListener('mouseleave', () => {
  bookContainer.classList.remove('hover-left','hover-right','hover-top','hover-bottom');
});

mask.addEventListener('click', (e) => {
  const rect = bookContainer.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const margin = 80;
  if(x > rect.width - margin){
    flipNext();
  }else if(x < margin){
    flipPrev();
  }else if(y < margin){
    flipUp();
  }else if(y > rect.height - margin){
    flipDown();
  }
});

// 悬浮工具栏
const toolbox = document.getElementById('toolbox');
document.getElementById('toolboxToggle').addEventListener('click', () => {
  toolbox.classList.toggle('open');
});

const autoBtn = document.getElementById('autoBtn');
autoBtn.addEventListener('click', () => {
  if(autoFlipTimer){
    clearInterval(autoFlipTimer);
    autoFlipTimer = null;
    autoBtn.classList.remove('active');
  }else{
    autoFlipTimer = setInterval(() => {
      if(currentPage >= pages.length - 1){
        clearInterval(autoFlipTimer);
        autoFlipTimer = null;
        autoBtn.classList.remove('active');
        return;
      }
      flipNext();
    }, 2000);
    autoBtn.classList.add('active');
  }
});

document.getElementById('fullscreenBtn').addEventListener('click', () => {
  if(!document.fullscreenElement){
    document.documentElement.requestFullscreen();
  }else{
    document.exitFullscreen();
  }
});

window.addEventListener('DOMContentLoaded', init);
