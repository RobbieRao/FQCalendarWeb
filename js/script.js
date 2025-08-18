// Wrap all logic in an IIFE to avoid polluting global scope
(function(){
const book = document.getElementById('book');
const bookContainer = document.querySelector('.bookContainer');
const mask = document.getElementById('mask');
const loading = document.getElementById('loading');
const pageIndicator = document.getElementById('pageIndicator');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const thumbsOverlay = document.getElementById('thumbsOverlay');
const thumbsBtn = document.getElementById('thumbsBtn');

const EDGE_MARGIN = 80;

let pages = [];
let currentPage = 0;
let autoFlipTimer = null;
let pageWidth = 0;
let pageHeight = 0;
let dragging = null;
let dragPage = null;
let dragStartX = 0;
let dragMoved = false;
let totalImages = 0;

async function init(){
  const imgs = await loadImages();
  totalImages = imgs.length;
  if(totalImages === 0){
    loading.style.display = 'none';
    return;
  }
  pageWidth = imgs[0].naturalWidth;
  pageHeight = imgs[0].naturalHeight;
  resizeBook();

  const leafCount = 1 + Math.ceil((imgs.length - 1) / 2);

  const coverPage = document.createElement('div');
  coverPage.className = 'page';
  coverPage.style.zIndex = leafCount;
  coverPage.appendChild(imgs[0]);
  book.appendChild(coverPage);
  pages.push(coverPage);

  for(let i = 1; i < imgs.length; i += 2){
    const page = document.createElement('div');
    page.className = 'page flip-side';
    page.style.zIndex = leafCount - Math.ceil(i / 2);
    const front = imgs[i];
    page.appendChild(front);
    let back;
    if(imgs[i + 1]){
      back = imgs[i + 1];
      back.classList.add('back');
    }else{
      back = document.createElement('div');
      back.className = 'back';
    }
    page.appendChild(back);
    book.appendChild(page);
    pages.push(page);
  }
  updateUI();
  loading.style.display = 'none';
}

function resizeBook(){
  if(!pageWidth || !pageHeight) return;
  const scale = Math.min(window.innerWidth * 0.9 / pageWidth,
                         window.innerHeight * 0.9 / pageHeight,
                         1);
  bookContainer.style.width = (pageWidth * scale) + 'px';
  bookContainer.style.height = (pageHeight * scale) + 'px';
}

function loadImages(){
  return new Promise(async (resolve) => {
    const imgs = [];
    let index = 0;
    while(true){
      try{
        const img = await loadImage(`content/${index}.png`);
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
  updateUI();
}

function flipPrev(){
  if(currentPage <= 0) return;
  currentPage--;
  const page = pages[currentPage];
  page.classList.remove('flipped');
  setTimeout(() => page.classList.remove('vertical'), 800);
  updateUI();
}

function flipUp(){
  if(currentPage >= pages.length - 1) return;
  const page = pages[currentPage];
  page.classList.add('vertical');
  page.classList.add('flipped');
  currentPage++;
  updateUI();
}

function flipDown(){
  if(currentPage <= 0) return;
  currentPage--;
  const page = pages[currentPage];
  page.classList.add('vertical');
  page.classList.remove('flipped');
  setTimeout(() => page.classList.remove('vertical'), 800);
  updateUI();
}

function updateUI(){
  pageIndicator.textContent = `${currentPage + 1} / ${pages.length}`;
  pages.forEach((page, i) => page.classList.toggle('top', i === currentPage));
}

function gotoPage(index){
  if(index < 0 || index >= pages.length) return;
  pages.forEach((page, i) => {
    page.classList.toggle('flipped', i < index);
    page.classList.remove('vertical');
  });
  currentPage = index;
  updateUI();
}

function buildThumbs(){
  thumbsOverlay.innerHTML = '';
  for(let i = 1; i < totalImages; i++){
    const img = document.createElement('img');
    img.src = `content/thumbs/${i}.webp`;
    img.alt = `缩略图 ${i}`;
    const pageIndex = Math.ceil(i / 2);
    img.addEventListener('click', () => {
      gotoPage(pageIndex);
      toggleThumbs();
    });
    thumbsOverlay.appendChild(img);
  }
}

function toggleThumbs(){
  if(thumbsOverlay.classList.contains('show')){
    thumbsOverlay.classList.remove('show');
  }else{
    if(!thumbsOverlay.childElementCount) buildThumbs();
    thumbsOverlay.classList.add('show');
  }
}

prevBtn.addEventListener('click', flipPrev);
nextBtn.addEventListener('click', flipNext);

mask.addEventListener('mousemove', (e) => {
  const rect = bookContainer.getBoundingClientRect();
  const x = e.clientX - rect.left;

  if(dragging){
    dragMoved = true;
    if(dragging === 'right'){
      const progress = Math.min(Math.max((dragStartX - x) / rect.width, 0), 1);
      dragPage.style.transform = `rotateY(${-progress * 180}deg)`;
    }else if(dragging === 'left'){
      const progress = Math.min(Math.max((x - dragStartX) / rect.width, 0), 1);
      dragPage.style.transform = `rotateY(${-180 + progress * 180}deg)`;
    }
    return;
  }

  if(x > rect.width - EDGE_MARGIN && currentPage < pages.length - 1){
    const page = pages[currentPage];
    const progress = Math.min((x - (rect.width - EDGE_MARGIN)) / EDGE_MARGIN, 1);
    page.style.transition = 'none';
    page.style.transform = `rotateY(${-15 * progress}deg)`;
  }else if(x < EDGE_MARGIN && currentPage > 0){
    const page = pages[currentPage - 1];
    const progress = Math.min((EDGE_MARGIN - x) / EDGE_MARGIN, 1);
    page.style.transition = 'none';
    page.style.transform = `rotateY(${-180 + 15 * progress}deg)`;
  }else{
    if(pages[currentPage]){
      pages[currentPage].style.transition = '';
      pages[currentPage].style.transform = '';
    }
    if(currentPage > 0){
      const p = pages[currentPage - 1];
      p.style.transition = '';
      p.style.transform = '';
    }
  }
});

mask.addEventListener('mousedown', (e) => {
  const rect = bookContainer.getBoundingClientRect();
  const x = e.clientX - rect.left;
  if(x > rect.width - EDGE_MARGIN && currentPage < pages.length - 1){
    dragging = 'right';
    dragPage = pages[currentPage];
    dragPage.style.transition = 'none';
    dragStartX = x;
    dragMoved = false;
  }else if(x < EDGE_MARGIN && currentPage > 0){
    dragging = 'left';
    dragPage = pages[currentPage - 1];
    dragPage.style.transition = 'none';
    dragPage.style.transform = 'rotateY(-180deg)';
    dragStartX = x;
    dragMoved = false;
  }
});

mask.addEventListener('mouseup', (e) => {
  if(!dragging) return;
  const rect = bookContainer.getBoundingClientRect();
  const x = e.clientX - rect.left;

  if(dragging === 'right'){
    const progress = Math.min(Math.max((dragStartX - x) / rect.width, 0), 1);
    const moved = Math.abs(dragStartX - x);
    if(progress > 0.5 || moved < 5){
      dragPage.style.transition = 'transform 0.5s ease';
      dragPage.style.transform = 'rotateY(-180deg)';
      dragPage.addEventListener('transitionend', function handler(){
        dragPage.removeEventListener('transitionend', handler);
        dragPage.style.transition = '';
        dragPage.style.transform = '';
        flipNext();
      });
    }else{
      dragPage.style.transition = 'transform 0.5s ease';
      dragPage.style.transform = 'rotateY(0deg)';
      dragPage.addEventListener('transitionend', function handler(){
        dragPage.removeEventListener('transitionend', handler);
        dragPage.style.transition = '';
        dragPage.style.transform = '';
      });
    }
  }else if(dragging === 'left'){
    const progress = Math.min(Math.max((x - dragStartX) / rect.width, 0), 1);
    const moved = Math.abs(x - dragStartX);
    if(progress > 0.5 || moved < 5){
      dragPage.style.transition = 'transform 0.5s ease';
      dragPage.style.transform = 'rotateY(0deg)';
      dragPage.addEventListener('transitionend', function handler(){
        dragPage.removeEventListener('transitionend', handler);
        dragPage.style.transition = '';
        dragPage.style.transform = '';
        flipPrev();
      });
    }else{
      dragPage.style.transition = 'transform 0.5s ease';
      dragPage.style.transform = 'rotateY(-180deg)';
      dragPage.addEventListener('transitionend', function handler(){
        dragPage.removeEventListener('transitionend', handler);
        dragPage.style.transition = '';
        dragPage.style.transform = '';
      });
    }
  }
  dragging = null;
  dragPage = null;
  dragMoved = false;
});

mask.addEventListener('mouseleave', () => {
  if(dragging && dragPage){
    dragPage.style.transition = 'transform 0.5s ease';
    dragPage.style.transform = dragging === 'right' ? 'rotateY(0deg)' : 'rotateY(-180deg)';
    dragPage.addEventListener('transitionend', function handler(){
      dragPage.removeEventListener('transitionend', handler);
      dragPage.style.transition = '';
      dragPage.style.transform = '';
    });
  }else{
    if(pages[currentPage]){
      pages[currentPage].style.transition = '';
      pages[currentPage].style.transform = '';
    }
    if(currentPage > 0){
      const p = pages[currentPage - 1];
      p.style.transition = '';
      p.style.transform = '';
    }
  }
  dragging = null;
  dragPage = null;
  dragMoved = false;
});

mask.addEventListener('click', (e) => {
  if(dragMoved){
    dragMoved = false;
    return;
  }
  const rect = bookContainer.getBoundingClientRect();
  const y = e.clientY - rect.top;
  if(y < EDGE_MARGIN){
    flipUp();
  }else if(y > rect.height - EDGE_MARGIN){
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

thumbsBtn.addEventListener('click', toggleThumbs);
thumbsOverlay.addEventListener('click', (e) => {
  if(e.target === thumbsOverlay) toggleThumbs();
});

window.addEventListener('keydown', (e) => {
  switch(e.key){
    case 'ArrowRight':
      flipNext();
      break;
    case 'ArrowLeft':
      flipPrev();
      break;
    case 'ArrowUp':
      flipUp();
      break;
    case 'ArrowDown':
      flipDown();
      break;
    case 'Escape':
      if(thumbsOverlay.classList.contains('show')) toggleThumbs();
      break;
  }
});

window.addEventListener('DOMContentLoaded', init);
window.addEventListener('resize', resizeBook);
})();
