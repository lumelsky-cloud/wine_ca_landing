import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import galleryManifest from '../data/gallery-manifest.json' with { type: 'json' }

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const sourceRoot = path.join(__dirname, '..', 'Mom', 'moments-msc.ru')
const pageFiles = {
  '/': 'index.html',
  '/gifts': 'gifts.html',
  '/events': 'meropriyatiya.html',
  '/partners': 'partners.html',
  '/members': 'members.html'
}

const linkMap = new Map([
  ['index.html', '/'], ['./index.html', '/'],
  ['gifts.html', '/gifts'], ['./gifts.html', '/gifts'],
  ['meropriyatiya.html', '/events'], ['./meropriyatiya.html', '/events'],
  ['partners.html', '/#rec1225577271'], ['./partners.html', '/#rec1225577271'],
  ['members.html', '/members'], ['./members.html', '/members']
])

function localizeDocument(html) {
  let document = html
    .replace(/<base\b[^>]*>/gi, '')
    .replace(/(<head\b[^>]*>)/i, '$1<base href="/legacy-assets/moments-msc.ru/">')
    .replace(/https?:\/\/(?:static|static3)\.tildacdn\.com\//gi, '/legacy-assets/static.tildacdn.com/')
    .replace(/https?:\/\/thb\.tildacdn\.com\//gi, '/legacy-assets/thb.tildacdn.com/')
    .replace(/https?:\/\/neo\.tildacdn\.com\//gi, '/legacy-assets/neo.tildacdn.com/')

  for (const [from, to] of linkMap) {
    const escaped = from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    document = document.replace(
      new RegExp(`href=(['"])${escaped}(#[^'"]*)?\\1`, 'gi'),
      (match, quote, hash = '') => `href="${to}${to.includes('#') ? '' : hash}"`
    )
  }

  return document.replace('</body>', `
    <script>
      function hydrateLocalImages() {
        document.querySelectorAll('[data-original]').forEach(function (element) {
          var source = element.getAttribute('data-original');
          if (!source) return;
          if (element.tagName === 'IMG' || element.tagName === 'SOURCE') {
            element.setAttribute('src', source);
            if (element.hasAttribute('srcset')) element.setAttribute('srcset', source);
          } else {
            element.style.backgroundImage = 'url("' + source + '")';
          }
          element.classList.add('loaded');
        });
        document.querySelectorAll('[data-content-cover-bg]').forEach(function (element) {
          var source = element.getAttribute('data-content-cover-bg');
          if (source) element.style.backgroundImage = 'url("' + source + '")';
        });
      }
      hydrateLocalImages();
      window.addEventListener('load', hydrateLocalImages);
      setTimeout(hydrateLocalImages, 500);

      document.addEventListener('submit', async function (event) {
        var form = event.target;
        if (!(form instanceof HTMLFormElement)) return;
        event.preventDefault();
        var data = new FormData(form);
        var name = data.get('name') || data.get('Name') || data.get('Имя') || '';
        var phone = data.get('phone') || data.get('Phone') || data.get('Телефон') || '';
        try {
          var response = await fetch('/request', {
            method: 'POST', headers: {'content-type': 'application/json'},
            body: JSON.stringify({name: name, phone: phone, message: data.get('Textarea') || ''})
          });
          var result = await response.json();
          alert(result.message || 'Спасибо! Мы свяжемся с вами.');
          if (response.ok) form.reset();
        } catch (error) { alert('Не удалось отправить заявку. Попробуйте ещё раз.'); }
      }, true);
    </script>
  </body>`)
}

function enhanceHomeDocument(document) {
  const styles = `
    <style id="moments-home-fixes">
      #rec1225514711 .t396__artboard,
      #rec1225514711 .t396__carrier,
      #rec1225514711 .t396__filter {
        height: 100vh !important;
        min-height: 700px;
      }
      #rec1225514711 .tn-elem[data-elem-id="1773306851840000004"] {
        display: block !important;
        position: absolute !important;
        inset: 0 !important;
        width: 100% !important;
        height: 100% !important;
        transform: none !important;
      }
      #rec1225514711 .tn-elem[data-elem-id="1773306851840000004"] .tn-atom,
      #rec1225514711 .tn-elem[data-elem-id="1773306851840000004"] .tn-atom__img {
        width: 100% !important;
        height: 100% !important;
        object-fit: cover !important;
        object-position: center 36% !important;
      }
      #rec1876025381 .t1074__img { display: block !important; opacity: 1 !important; }
      .t-slds__bgimg, .t-bgimg { background-size: cover; background-position: center; }
      .t-img[data-original] { opacity: 1 !important; visibility: visible !important; }
      @media (max-width: 639px) {
        #rec1225514711 .t396__artboard,
        #rec1225514711 .t396__carrier,
        #rec1225514711 .t396__filter { min-height: 560px; }
        #rec1225514711 .tn-elem[data-elem-id="1773306851840000004"] .tn-atom__img {
          object-position: center 28% !important;
        }
      }
    </style>
  `
  return document
    .replace('</head>', `${styles}</head>`)
    .replaceAll('/legacy-assets/static.tildacdn.com/tild3832-3332-4337-b836-353430303766/DSC09029_3.jpg', '/legacy-assets/DSC09029_3.jpg.webp')
    .replaceAll('../static.tildacdn.com/tild3832-3332-4337-b836-353430303766/DSC09029_3.jpg', '/legacy-assets/DSC09029_3.jpg.webp')
}

function enhanceEventsDocument(document) {
  document = document
    .replaceAll('href="#odinn"', 'href="/music-party"')
    .replaceAll('Кулинарная вечеринка', 'Музыкальная вечеринка')
    .replaceAll('href="#trii"', 'href="/wine-casino"')
    .replaceAll('href="#chetiree"', 'href="/child-party"')
    .replaceAll('>КВИЗ</p></a>', '>Детский праздник</p></a>')
  const images = galleryManifest.events.photos
    .filter(image => !/(?:\/photo\.png$|menu|logo|instagram|telegram|whatsapp)/i.test(image))
    .slice(0, 14)
  images[0] = '/images/music-party-card.png'
  images[2] = '/images/wine-casino-hero.png'
  images[3] = '/images/child-party-hero.png'
  const enhancement = `
    <style id="moments-event-card-fixes">
      #rec1557694281 [data-elem-type="gallery"],
      #rec1557715611 [data-elem-type="gallery"] { overflow: hidden !important; border-radius: 12px; }
      #rec1557694281 [data-elem-type="gallery"] .moments-card-photo,
      #rec1557715611 [data-elem-type="gallery"] .moments-card-photo { position:absolute;inset:0;width:100%;height:100%;overflow:hidden;border-radius:10px;background:#eee; }
      .moments-card-photo img { display:block;width:100%;height:100%;object-fit:cover; }
      .moments-card-photo__arrow { position:absolute;top:50%;z-index:2;width:22px;height:22px;margin-top:-11px;border:0;border-radius:50%;background:rgba(255,255,255,.9);color:#555;font:18px/20px Arial;text-align:center;box-shadow:0 1px 3px rgba(0,0,0,.12); }
      .moments-card-photo__arrow--left { left:10px; }
      .moments-card-photo__arrow--right { right:10px; }
    </style>
    <script>
      (function fillEventCards() {
        var images = ${JSON.stringify(images)};
        var links = ['/music-party', '', '/wine-casino', '/child-party'];
        var cards = Array.from(document.querySelectorAll('#rec1557694281 [data-elem-type="gallery"]'))
          .concat(Array.from(document.querySelectorAll('#rec1557715611 [data-elem-type="gallery"]')));
        cards.slice(0, images.length).forEach(function (card, index) {
          var content = '<div class="moments-card-photo"><img src="' + images[index] + '" alt="" loading="eager"><span class="moments-card-photo__arrow moments-card-photo__arrow--left">‹</span><span class="moments-card-photo__arrow moments-card-photo__arrow--right">›</span></div>';
          var external = links[index] && links[index].startsWith('http') ? ' target="_blank" rel="noopener noreferrer"' : '';
          card.innerHTML = links[index] ? '<a href="' + links[index] + '"' + external + ' style="display:block;width:100%;height:100%">' + content + '</a>' : content;
        });
      })();
    </script>
  `
  return document.replace('</body>', `${enhancement}</body>`)
}

export default async function routes(fastify) {
  for (const [url, file] of Object.entries(pageFiles)) {
    let document = localizeDocument(await readFile(path.join(sourceRoot, file), 'utf8'))
    if (url === '/') document = enhanceHomeDocument(document)
    if (url === '/events') document = enhanceEventsDocument(document)
    fastify.get(url, (request, reply) => reply.view('legacy.pug', { document }))
  }

  fastify.get('/child-party', (request, reply) => reply.view('child-party.pug', {
    title: 'Детский праздник — Moments',
    hideFooterLead: true,
    backToEvents: true
  }))

  fastify.get('/music-party', (request, reply) => reply.view('music-party/page.pug'))

  fastify.get('/wine-casino', (request, reply) => reply.view('wine-casino.pug', {
    title: 'Винное казино — Moments',
    backToEvents: true
  }))

  fastify.post('/request', async (request, reply) => {
    const name = String(request.body?.name || '').trim()
    const phone = String(request.body?.phone || '').trim()
    if (!name || !phone) return reply.code(400).send({ ok: false, message: 'Укажите имя и телефон' })
    return reply.send({ ok: true, message: 'Спасибо! Мы свяжемся с вами.' })
  })
}
