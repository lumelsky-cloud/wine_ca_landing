import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import galleryManifest from '../data/gallery-manifest.json' with { type: 'json' }

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const sourceRoot = path.join(__dirname, '..', 'Mom', 'moments-msc.ru')
const pageFiles = {
  '/gifts': 'gifts.html',
  '/events': 'meropriyatiya.html',
  '/partners': 'partners.html',
  '/members': 'members.html'
}

const formatGames = [
  {
    title: '100 к 1',
    description: 'Команды угадывают самые популярные ответы на вопросы из опросов. Побеждает та, что чаще совпадает с мнением большинства.',
    image: '/images/moments-site/100-k-1.webp'
  },
  {
    title: 'Два дивана',
    description: 'Две команды выполняют задания ведущего на реакцию и смекалку и борются за позиции соперников.',
    image: '/images/moments-site/two-sofas.webp'
  },
  {
    title: 'Мафия',
    description: 'Участники получают скрытые роли, обсуждают версии и пытаются вычислить игроков другой команды.',
    image: '/images/moments-site/mafia.webp'
  },
  {
    title: 'Угадай мелодию',
    description: 'Команды узнают песни по первым нотам. Балл получает тот, кто быстрее назовёт мелодию.',
    image: '/images/moments-site/guess-melody.webp'
  },
  {
    title: 'Музыкальное бинго',
    description: 'Гости узнают звучащие песни и отмечают их в карточках. Вместо чисел в карточках — музыкальные треки.',
    image: '/images/moments-site/music-bingo.webp'
  },
  {
    title: 'Караоке-батл',
    description: 'Команды исполняют хиты и соревнуются в артистизме и подаче.',
    image: '/images/moments-site/karaoke-battle.webp'
  },
  {
    title: 'Квиз',
    description: 'Команды отвечают на вопросы о музыке, кино, логике и неожиданных фактах. Раунды можно адаптировать под тему события.',
    image: '/images/moments-site/quiz.webp'
  },
  {
    title: 'Что? Где? Когда?',
    description: 'Рулетка задаёт тему, команды обсуждают вопрос на время и сдают ответы на бланках. Для капитанов предусмотрен отдельный финал.',
    image: '/images/moments-site/what-where-when.png',
    dark: true
  }
]

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

  document = document.replace(
    /(?:\.\.\/|\/legacy-assets\/)?(?:static\.tildacdn\.com|thb\.tildacdn\.com)\/[^'"\s>]*(?:Unique_Moments_2___1\.svg|logo__\.png)/gi,
    '/images/brand-logo.png'
  )

  document = document.replace(
    /<!-- Tilda copyright[\s\S]*?<!-- Stat -->/gi,
    '<!-- Stat -->'
  )

  document = document.replace('</head>', `
    <style id="moments-brand-fix">
      .tn-atom__img[src="/images/brand-logo.png"],
      .tn-atom__img[data-original="/images/brand-logo.png"] {
        visibility: hidden !important;
      }
      .tn-elem[data-elem-id="1755378368206"],
      .tn-elem[data-elem-id="176304430984778600"],
      .tn-elem[data-elem-id="176304499140889250"] {
        display: none !important;
        visibility: hidden !important;
      }
      .moments-legacy-brand {
        position: absolute;
        top: 26px;
        left: clamp(24px, 4vw, 64px);
        z-index: 100000;
        display: block;
        width: clamp(210px, 17vw, 270px);
        height: auto;
        line-height: 0;
      }
      .moments-legacy-brand img {
        display: block;
        width: 100%;
        height: auto;
      }
      .moments-legacy-nav {
        position: absolute;
        top: 58px;
        right: clamp(22px, 3vw, 52px);
        z-index: 100000;
        display: flex;
        align-items: center;
        gap: clamp(14px, 1.5vw, 27px);
        color: #111;
        font: 400 15px/1.2 Arial, sans-serif;
      }
      .moments-legacy-nav a {
        color: inherit;
        text-decoration: none;
        white-space: nowrap;
      }
      .moments-legacy-nav a:hover { opacity: .58; }
      .moments-legacy-nav__cta {
        padding: 11px 15px;
        border: 1px solid currentColor;
        border-radius: 999px;
      }
      .moments-contact-dialog {
        width: min(520px, calc(100vw - 32px));
        padding: 0;
        border: 0;
        background: transparent;
      }
      .moments-contact-dialog::backdrop {
        background: rgba(0, 0, 0, .58);
        backdrop-filter: blur(5px);
      }
      .moments-contact-dialog__panel {
        position: relative;
        padding: 46px;
        background: #f0f0f2;
        color: #090909;
      }
      .moments-contact-dialog__close {
        position: absolute;
        top: 14px;
        right: 16px;
        width: 34px;
        height: 34px;
        padding: 0;
        border: 0;
        background: transparent;
        color: #000;
        font: 300 30px/1 Arial, sans-serif;
        cursor: pointer;
      }
      .moments-contact-dialog h2 {
        margin: 0 0 12px;
        font: 400 clamp(34px, 5vw, 52px)/1 Georgia, 'Times New Roman', serif;
      }
      .moments-contact-dialog p {
        margin: 0 0 28px;
        font: 400 15px/1.5 Arial, sans-serif;
      }
      .moments-contact-dialog label {
        display: block;
        margin: 0 0 16px;
        font: 700 13px/1.3 Arial, sans-serif;
      }
      .moments-contact-dialog input,
      .moments-contact-dialog textarea {
        display: block;
        box-sizing: border-box;
        width: 100%;
        margin-top: 7px;
        padding: 13px 14px;
        border: 1px solid #aaa;
        border-radius: 0;
        background: #fff;
        color: #000;
        font: 400 16px/1.3 Arial, sans-serif;
      }
      .moments-contact-dialog textarea { min-height: 100px; resize: vertical; }
      .moments-contact-dialog__submit {
        width: 100%;
        min-height: 50px;
        border: 1px solid #000;
        background: #000;
        color: #fff;
        font: 700 14px/1 Arial, sans-serif;
        text-transform: uppercase;
        cursor: pointer;
      }
      .moments-nav-hidden { display: none !important; }
      .moments-display-heading {
        font-family: Georgia, 'Times New Roman', serif !important;
        font-weight: 400 !important;
      }
      .t-tildalabel,
      #tildacopy {
        display: none !important;
      }
      @media (max-width: 639px) {
        .moments-legacy-brand {
          top: 18px;
          left: 50%;
          width: min(180px, 52vw);
          transform: translateX(-50%);
        }
        .moments-contact-dialog__panel { padding: 40px 24px 28px; }
      }
      @media (max-width: 1199px) {
        .moments-legacy-nav { display: none; }
      }
    </style>
  </head>`)

  document = document.replace(
    /(<body\b[^>]*>)/i,
    '$1<a class="moments-legacy-brand" href="/" aria-label="Moments — на главную"><img src="/images/brand-logo.png" alt="Moments"></a><nav class="moments-legacy-nav" aria-label="Основная навигация"><a href="/#rec1225537926">О нас</a><a href="/#rec1225554436">Услуги</a><a href="/#rec1225577271">Партнёры</a><a href="/events">Форматы</a><a href="/#projects">Проекты</a><a href="/#contacts">Контакты</a><a class="moments-legacy-nav__cta" href="#moments-contact-dialog" data-open-contact-dialog>Заказать мероприятие</a></nav>'
  )

  for (const [from, to] of linkMap) {
    const escaped = from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    document = document.replace(
      new RegExp(`href=(['"])${escaped}(#[^'"]*)?\\1`, 'gi'),
      (match, quote, hash = '') => `href="${to}${to.includes('#') ? '' : hash}"`
    )
  }

  return document.replace('</body>', `
    <dialog class="moments-contact-dialog" id="moments-contact-dialog">
      <div class="moments-contact-dialog__panel">
        <button class="moments-contact-dialog__close" type="button" aria-label="Закрыть форму" data-close-contact-dialog>×</button>
        <h2>Заказать мероприятие</h2>
        <p>Расскажите коротко о задаче — мы свяжемся с вами и обсудим детали.</p>
        <form class="moments-contact-dialog__form">
          <label>Ваше имя<input name="name" autocomplete="name" required></label>
          <label>Телефон<input name="phone" type="tel" autocomplete="tel" required></label>
          <label>Сообщение<textarea name="Textarea"></textarea></label>
          <button class="moments-contact-dialog__submit" type="submit">Отправить заявку</button>
        </form>
      </div>
    </dialog>
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

      function updateLegacyHeader() {
        var labels = {
          'Направления работ': 'Услуги',
          'Тематические мероприятия': 'Форматы',
          'Оставить заявку': 'Заказать мероприятие'
        };
        document.querySelectorAll('a').forEach(function (link) {
          var text = link.textContent.trim();
          if (labels[text]) link.textContent = labels[text];
          if (['О нас', 'Услуги', 'Партнеры', 'Партнёры', 'Форматы', 'Контакты'].includes(link.textContent.trim())) {
            var tildaElement = link.closest('.tn-elem');
            if (tildaElement && tildaElement.getBoundingClientRect().top < 180) {
              tildaElement.classList.add('moments-nav-hidden');
            }
          }
        });
        document.querySelectorAll('.t450__list').forEach(function (list) {
          if (!list.querySelector('[data-moments-projects-link]')) {
            list.insertAdjacentHTML('beforeend', '<li class="t450__list_item"><a class="t-menu__link-item" href="/#projects" data-moments-projects-link>Проекты</a></li><li class="t450__list_item"><a class="t-menu__link-item" href="#moments-contact-dialog" data-open-contact-dialog>Заказать мероприятие</a></li>');
          }
        });
        document.querySelectorAll('.tn-atom').forEach(function (element) {
          var size = parseFloat(window.getComputedStyle(element).fontSize);
          if (size >= 36 && element.textContent.trim()) element.classList.add('moments-display-heading');
        });
      }
      updateLegacyHeader();
      window.addEventListener('load', updateLegacyHeader);

      document.addEventListener('click', function (event) {
        var openDialog = event.target.closest && event.target.closest('[data-open-contact-dialog]');
        if (openDialog) {
          event.preventDefault();
          var dialog = document.getElementById('moments-contact-dialog');
          if (dialog && !dialog.open) dialog.showModal();
          return;
        }
        var closeDialog = event.target.closest && event.target.closest('[data-close-contact-dialog]');
        if (closeDialog) {
          var dialogToClose = closeDialog.closest('dialog');
          if (dialogToClose) dialogToClose.close();
          return;
        }
        var emptyLink = event.target.closest && event.target.closest('a[href="#"]');
        if (emptyLink) event.preventDefault();
      }, true);

      document.querySelectorAll('.moments-contact-dialog').forEach(function (dialog) {
        dialog.addEventListener('click', function (event) {
          if (event.target === dialog) dialog.close();
        });
      });

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
  const galleryStart = galleryManifest.home.photos.findIndex(image => image.endsWith('/047.jpg'))
  const galleryImages = galleryManifest.home.photos
    .slice(galleryStart, galleryStart + 18)
    .filter(image => !/(?:logo|telegram|whatsapp|instagram)/i.test(image))
  const styles = `
    <style id="moments-home-fixes">
      body > .moments-legacy-brand {
        top: 24px;
        left: 50%;
        width: clamp(230px, 18vw, 300px);
        transform: translateX(-50%);
      }
      body > .moments-legacy-nav {
        top: 118px;
        right: auto;
        left: 50%;
        justify-content: center;
        width: max-content;
        max-width: calc(100vw - 48px);
        padding: 0;
        color: #000;
        font-weight: 700;
        background: transparent;
        border: 0;
        border-radius: 0;
        box-shadow: none;
        backdrop-filter: none;
        transform: translateX(-50%);
      }
      body > .moments-legacy-nav a {
        color: #000;
        font-weight: 700;
      }
      body > .moments-legacy-nav .moments-legacy-nav__cta {
        border-color: #000;
        background: transparent;
        color: #000;
      }
      #rec1225514711 .t396__artboard,
      #rec1225514711 .t396__carrier,
      #rec1225514711 .t396__filter {
        height: 796px !important;
        min-height: 796px;
      }
      #rec1225514711 .t396__artboard {
        overflow: hidden;
        background: linear-gradient(to bottom, #fff 0 176px, #ededf0 176px 100%) !important;
      }
      #rec1225514711 .t396__artboard::after {
        display: none;
      }
      #rec1225514711 .tn-elem[data-elem-id="1773306851840000004"] {
        display: block !important;
        position: absolute !important;
        z-index: 4 !important;
        top: 176px !important;
        left: auto !important;
        right: 0 !important;
        width: 40% !important;
        height: 620px !important;
        transform: none !important;
      }
      #rec1225514711 .tn-elem[data-elem-id="1773306851840000004"] .tn-atom,
      #rec1225514711 .tn-elem[data-elem-id="1773306851840000004"] .tn-atom__img {
        width: 100% !important;
        height: 100% !important;
        object-fit: cover !important;
        object-position: center 55% !important;
      }
      #rec1225514711 .tn-elem[data-elem-id="1773306851840000004"]::after {
        content: '';
        position: absolute;
        z-index: 1;
        inset: 0 auto 0 0;
        width: 28px;
        background: linear-gradient(to right, #ededf0, rgba(237, 237, 240, 0));
        pointer-events: none;
      }
      #rec1225514711 .tn-elem[data-elem-id="1773306851840000004"]::before {
        content: '';
        position: absolute;
        z-index: 2;
        inset: auto 0 0;
        height: 110px;
        background: linear-gradient(to bottom, rgba(237, 237, 240, 0) 0%, rgba(237, 237, 240, .22) 42%, #ededf0 100%);
        -webkit-backdrop-filter: blur(18px);
        backdrop-filter: blur(18px);
        pointer-events: none;
      }
      #rec1225514711 .tn-elem[data-elem-id="1608713512911"] {
        display: table !important;
        z-index: 5 !important;
        top: 486px !important;
        left: clamp(28px, 4vw, 76px) !important;
        width: min(50vw, 610px) !important;
        height: auto !important;
        transform: translateY(-50%) !important;
      }
      #rec1225514711 .tn-elem[data-elem-id="1608713512911"] .tn-atom {
        color: #111 !important;
        font-family: Georgia, 'Times New Roman', serif !important;
        font-size: clamp(48px, 3.8vw, 68px) !important;
        font-weight: 400 !important;
        line-height: .98 !important;
        letter-spacing: -.045em !important;
        text-shadow: none !important;
      }
      #rec1225514711 .tn-elem[data-elem-id="1608713512911"] .tn-atom::after {
        content: '«Moments» — пространство, где ценный опыт, профессиональный подход и искренняя любовь к людям превращают идеи в живые, эмоциональные события.';
        display: block;
        max-width: 470px;
        margin-top: 34px;
        padding-top: 30px;
        color: #111;
        background: linear-gradient(#111, #111) left top / 78px 2px no-repeat;
        font: 400 20px/1.5 Georgia, 'Times New Roman', serif;
        letter-spacing: 0;
      }
      #rec1225514711 .tn-elem[data-elem-id="176306381432336980"] {
        display: none !important;
        z-index: 6 !important;
        top: 675px !important;
        left: clamp(30px, 7vw, 120px) !important;
        width: 230px !important;
        height: 48px !important;
      }
      #rec1225514711 .tn-elem[data-elem-id="176306381432336980"] .tn-atom {
        border-radius: 0 !important;
        background: #050505 !important;
      }
      #rec1225514711 .tn-elem[data-elem-id="176306381432336980"] .tn-atom .tn-atom__button-text {
        color: #fff !important;
        font-weight: 700 !important;
      }
      #rec1225514711 .t396__filter {
        z-index: 1;
        background: transparent !important;
        pointer-events: none;
      }
      #rec1876025381 .t1074__img { display: block !important; opacity: 1 !important; }
      #rec1225537926 {
        box-sizing: border-box;
        padding: 0;
        background: #ededf0 !important;
      }
      #rec1225537926 .moments-about {
        display: grid;
        grid-template-columns: minmax(0, 40%) minmax(0, 60%);
        grid-template-areas: 'photo content';
        width: 100%;
        height: 620px;
        min-height: 0;
        margin: 0;
        overflow: hidden;
        border: 0;
        border-radius: 0;
        background: #ededf0;
        color: #1b1b1b;
      }
      #rec1225537926 .moments-about__content {
        grid-area: content;
        display: grid;
        grid-template-columns: minmax(0, 60%) minmax(0, 40%);
        align-items: center;
      }
      #rec1225537926 .moments-about__copy {
        align-self: center;
        padding: clamp(38px, 4vw, 66px) clamp(28px, 3.4vw, 64px);
      }
      #rec1225537926 .moments-about__eyebrow {
        margin: 0 0 25px;
        color: #6d6a65;
        font: 400 13px/1.3 Arial, sans-serif;
        letter-spacing: .04em;
        text-transform: uppercase;
      }
      #rec1225537926 .moments-about h2 {
        margin: 0 0 20px;
        color: #1b1b1b;
        font: 400 clamp(42px, 3.1vw, 56px)/1.02 Georgia, 'Times New Roman', serif;
        letter-spacing: -.045em;
      }
      #rec1225537926 .moments-about__lead {
        max-width: 600px;
        margin: 0;
        color: #1b1b1b;
        font: 400 clamp(16px, 1.25vw, 19px)/1.55 Arial, sans-serif;
      }
      #rec1225537926 .moments-about__stats {
        align-self: center;
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 44px clamp(18px, 1.6vw, 30px);
        margin: 0;
        padding: clamp(32px, 4vw, 64px) clamp(20px, 2.2vw, 42px);
      }
      #rec1225537926 .moments-about__stat dt {
        margin: 0 0 13px;
        color: #1b1b1b;
        font: 500 clamp(42px, 3vw, 48px)/1 Georgia, 'Times New Roman', serif;
      }
      #rec1225537926 .moments-about__stat dd {
        margin: 0;
        color: #6d6a65;
        font: 400 clamp(14px, 1vw, 15px)/1.35 Arial, sans-serif;
      }
      #rec1225537926 .moments-about__photo {
        grid-area: photo;
        position: relative;
        min-height: 620px;
        margin: 0;
        overflow: hidden;
        background: #b9b9b9;
      }
      #rec1225537926 .moments-about__photo img {
        position: absolute;
        inset: 0;
        display: block;
        width: 100%;
        height: 100%;
        min-height: 0;
        object-fit: cover;
        object-position: center 28%;
      }
      #rec1225537926 .moments-about__photo::after {
        content: '';
        position: absolute;
        inset: 0 0 0 auto;
        width: 28px;
        background: linear-gradient(to left, #ededf0, rgba(237, 237, 240, 0));
        pointer-events: none;
      }
      #rec1225537926 .moments-about__photo::before {
        content: '';
        position: absolute;
        z-index: 2;
        inset: 0 0 auto;
        height: 110px;
        background: linear-gradient(to top, rgba(237, 237, 240, 0) 0%, rgba(237, 237, 240, .22) 42%, #ededf0 100%);
        -webkit-backdrop-filter: blur(18px);
        backdrop-filter: blur(18px);
        pointer-events: none;
      }
      #rec1234418641 .t827__grid { display: none !important; }
      #rec1234418641 .moments-home-gallery {
        max-width: 1200px;
        margin: 0 auto;
        padding: 15px 20px 90px;
        column-count: 3;
        column-gap: 12px;
      }
      #rec1234418641 .moments-home-gallery__item {
        display: block;
        width: 100%;
        margin: 0 0 12px;
        break-inside: avoid;
      }
      #rec1234418641 .moments-home-gallery__item img {
        display: block;
        width: 100%;
        height: auto;
      }
      .t-slds__bgimg, .t-bgimg { background-size: cover; background-position: center; }
      .t-img[data-original] { opacity: 1 !important; visibility: visible !important; }
      @media (max-width: 639px) {
        body > .moments-legacy-brand {
          top: 18px;
          width: min(190px, 55vw);
        }
        #rec1225514711 .t396__artboard,
        #rec1225514711 .t396__carrier,
        #rec1225514711 .t396__filter { height: 760px !important; min-height: 760px; }
        #rec1225514711 .t396__artboard {
          background: linear-gradient(to bottom, #fff 0 112px, #ededf0 112px 100%) !important;
        }
        #rec1225514711 .t396__artboard::after {
          top: 112px;
          bottom: 0;
          right: 0;
          width: 46vw;
          height: auto;
        }
        #rec1225514711 .tn-elem[data-elem-id="1608713512911"] {
          top: 170px !important;
          left: 24px !important;
          width: calc(100% - 48px) !important;
          text-align: left !important;
          transform: none !important;
        }
        #rec1225514711 .tn-elem[data-elem-id="1608713512911"] .tn-atom {
          font-size: clamp(43px, 14vw, 60px) !important;
          line-height: .98 !important;
        }
        #rec1225514711 .tn-elem[data-elem-id="1608713512911"] .tn-atom::after {
          margin-top: 22px;
          padding-top: 22px;
          background-size: 62px 2px;
          font-size: 14px;
          line-height: 1.5;
        }
        #rec1225514711 .tn-elem[data-elem-id="1773306851840000004"] {
          top: 452px !important;
          right: 24px !important;
          width: calc(100% - 48px) !important;
          height: 235px !important;
        }
        #rec1225514711 .tn-elem[data-elem-id="1773306851840000004"] .tn-atom__img {
          object-position: center 55% !important;
        }
        #rec1225514711 .tn-elem[data-elem-id="1773306851840000004"]::after,
        #rec1225537926 .moments-about__photo::after { display: none; }
        #rec1225514711 .tn-elem[data-elem-id="176306381432336980"] { display: none !important; }
        #rec1234418641 .moments-home-gallery {
          padding: 10px 10px 70px;
          column-count: 1;
        }
        #rec1225537926 { padding: 0; }
        #rec1225537926 .moments-about {
          display: flex;
          height: auto;
          min-height: 0;
          flex-direction: column;
          border-radius: 0;
        }
        #rec1225537926 .moments-about__content {
          display: flex;
          flex-direction: column;
          padding: 30px 24px 34px;
        }
        #rec1225537926 .moments-about__photo { order: -1; }
        #rec1225537926 .moments-about__copy { padding: 0; }
        #rec1225537926 .moments-about h2 { font-size: clamp(38px, 10vw, 48px); }
        #rec1225537926 .moments-about__eyebrow { margin-bottom: 18px; }
        #rec1225537926 .moments-about__lead { font-size: 15px; }
        #rec1225537926 .moments-about__stats {
          gap: 25px 22px;
          margin-top: 32px;
          padding: 0;
        }
        #rec1225537926 .moments-about__stat dt { font-size: 29px; }
        #rec1225537926 .moments-about__stat dd { font-size: 12px; }
        #rec1225537926 .moments-about__photo { min-height: 360px; }
      }
      @media (min-width: 640px) and (max-width: 1199px) {
        body > .moments-legacy-brand {
          top: 22px;
          width: 230px;
        }
        #rec1225514711 .tn-elem[data-elem-id="1608713512911"] {
          top: 486px !important;
          left: 48px !important;
          width: 47vw !important;
        }
        #rec1225514711 .tn-elem[data-elem-id="1773306851840000004"] {
          right: 0 !important;
          width: 40% !important;
          top: 176px !important;
          height: 620px !important;
        }
        #rec1225537926 { padding: 0; }
        #rec1225537926 .moments-about {
          grid-template-columns: minmax(0, 40%) minmax(0, 60%);
          grid-template-areas: 'photo content';
          height: auto;
        }
        #rec1225537926 .moments-about__content {
          display: flex;
          flex-direction: column;
          align-items: stretch;
        }
        #rec1225537926 .moments-about__copy {
          padding: 38px 30px;
        }
        #rec1225537926 .moments-about__stats {
          grid-template-columns: 1fr;
          gap: 26px;
          padding: 36px 28px;
        }
      }
      @media (min-width: 640px) and (max-width: 959px) {
        #rec1234418641 .moments-home-gallery { column-count: 2; }
        #rec1225537926 .moments-about {
          grid-template-columns: 40% 60%;
          grid-template-areas: 'photo content';
        }
        #rec1225537926 .moments-about__copy {
          padding: 36px 38px 12px;
        }
        #rec1225537926 .moments-about__stats {
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 20px;
          padding: 12px 38px 36px;
        }
      }
    </style>
  `
  const gallery = `
    <script>
      (function renderHomeGallery() {
        var root = document.querySelector('#rec1234418641 .t827');
        if (!root || root.querySelector('.moments-home-gallery')) return;
        var images = ${JSON.stringify(galleryImages)};
        var gallery = document.createElement('div');
        gallery.className = 'moments-home-gallery';
        gallery.innerHTML = images.map(function (src, index) {
          return '<figure class="moments-home-gallery__item"><img src="' + src + '" alt="Фото с мероприятия Moments ' + (index + 1) + '" loading="lazy"></figure>';
        }).join('');
        root.appendChild(gallery);
      })();
    </script>
  `
  const about = `
    <script>
      (function renderAboutSection() {
        var root = document.getElementById('rec1225537926');
        if (!root) return;
        root.innerHTML = '<section class="moments-about" aria-labelledby="moments-about-title">' +
          '<div class="moments-about__content">' +
            '<div class="moments-about__copy">' +
              '<p class="moments-about__eyebrow">Moments / О нас</p>' +
              '<h2 id="moments-about-title">За каждым событием — люди</h2>' +
              '<p class="moments-about__lead">Мы — Вероника и Татьяна, основательницы Moments. Много лет мы создаём мероприятия — от камерных встреч до масштабных корпоративных проектов. Для нас важны продуманная концепция, внимание к деталям и атмосфера, которую гости запомнят.</p>' +
            '</div>' +
            '<dl class="moments-about__stats">' +
              '<div class="moments-about__stat"><dt>150+</dt><dd>мероприятий</dd></div>' +
              '<div class="moments-about__stat"><dt>50</dt><dd>частных событий</dd></div>' +
              '<div class="moments-about__stat"><dt>30</dt><dd>онлайн-событий</dd></div>' +
              '<div class="moments-about__stat"><dt>20</dt><dd>детских праздников</dd></div>' +
            '</dl>' +
          '</div>' +
          '<figure class="moments-about__photo"><img src="/images/about-founders.jpg" alt="Вероника и Татьяна, основательницы Moments" loading="lazy"></figure>' +
        '</section>';
      })();
    </script>
  `
  return document
    .replace('</head>', `${styles}</head>`)
    .replace('<div id="rec1234434326"', '<span id="projects" style="display:block;position:relative;top:-20px"></span><div id="rec1234434326"')
    .replace('</body>', `${about}${gallery}</body>`)
    .replaceAll('/legacy-assets/static.tildacdn.com/tild3832-3332-4337-b836-353430303766/DSC09029_3.jpg', '/images/home-hero-stars.jpg')
    .replaceAll('../static.tildacdn.com/tild3832-3332-4337-b836-353430303766/DSC09029_3.jpg', '/images/home-hero-stars.jpg')
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
  fastify.get('/', (request, reply) => reply.view('moments-site/home.pug', {
    title: 'Moments — корпоративные события и услуги для бизнеса',
    description: 'Moments — корпоративные события и услуги для бизнеса в Москве.'
  }))

  fastify.get('/formats', (request, reply) => reply.view('moments-site/formats.pug', {
    title: 'Форматы мероприятий — Moments',
    description: 'Тематические мероприятия, игры и творческие мастер-классы Moments.',
    stylesheet: '/css/moments-formats.css',
    isFormats: true,
    games: formatGames
  }))

  for (const [url, file] of Object.entries(pageFiles)) {
    let document = localizeDocument(await readFile(path.join(sourceRoot, file), 'utf8'))
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
    hideFooterLead: true,
    backToEvents: true
  }))

  fastify.post('/request', async (request, reply) => {
    const name = String(request.body?.name || '').trim()
    const phone = String(request.body?.phone || '').trim()
    if (!name || !phone) return reply.code(400).send({ ok: false, message: 'Укажите имя и телефон' })
    return reply.send({ ok: true, message: 'Спасибо! Мы свяжемся с вами.' })
  })
}
