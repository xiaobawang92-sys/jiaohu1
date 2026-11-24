const screen = document.querySelector('#screen');
const assetRoot = '素材/';

const chapterMeta = {
  parts:  { roman: 'I',   num: '01', folio: '形态志', en: 'ROOM I · BOTANICAL SPECIMEN',  subtitle: '观形辨质' },
  growth: { roman: 'II',  num: '02', folio: '农时卷', en: 'ROOM II · SEASONAL CHRONICLE', subtitle: '四时节律' },
  food:   { roman: 'III', num: '03', folio: '风味录', en: 'ROOM III · CULINARY ALCHEMY',  subtitle: '物态转化' },
  trade:  { roman: 'IV',  num: '04', folio: '远行图', en: 'ROOM IV · MARITIME ATLAS',     subtitle: '通达四海' },
};

const partPoints = [
  {x:655,y:291,labelX:76,labelY:23,zoom:'78% 52%',observation:'先看外形，再看蒜瓣的排列。'},
  {x:702,y:252,labelX:83,labelY:42,zoom:'85% 44%',observation:'留意外皮的层次和表面纹理。'},
  {x:599,y:369,labelX:77,labelY:75,zoom:'67% 65%',observation:'比较整头蒜与掰下的蒜瓣。'},
  {x:279,y:249,labelX:5,labelY:33,zoom:'10% 44%',observation:'找一找整头蒜底部的圆形根盘。'},
];

const growthObservations = [
  '观察栽种方向：蒜瓣尖朝上，发根的一端朝下。',
  '沿田垄看蒜苗的行列，留意伸出地面的长叶。',
  '看蒜薹细长的茎，区分可食用的蒜薹和地下的蒜头。',
  '看蒜株紧贴土面的基部。蒜头在土下生长，叶片仍伸向地面以上。',
  '看采收机械和出土的蒜株，观察收获时仍留着的根和叶。',
];

const tradePrompts = [
  '规格怎样区分？','为什么要进冷库？','出境前查什么？','鲜蒜和蒜片怎样装？','金乡蒜去了哪里？',
];

const foodProcesses = [
  [
    ['晾晒','新蒜摊开晾晒，待外皮和蒜颈逐步干燥，再整理、修剪。','金乡晾晒.jpg'],
    ['整理','按销售或加工需求分拣。整头蒜可作为鲜蒜供应，一部分则进入加工车间。','加工车间.jpg'],
    ['上桌','整瓣适合炖煮，切片可用于炒菜，拍碎或捣成蒜泥可用于蘸汁。','garlic-chicken.jpg','蒜瓣烧鸡'],
  ],
  [
    ['去皮','将蒜头分瓣、去掉外皮，筛除损伤的蒜瓣。','bulb-shop4.jpg'],
    ['切片脱水','切薄后，水分从蒜瓣内部到表面的距离更短，蒜片更容易干燥。','flakes.jpg'],
    ['用于汤料','干蒜片可加入汤料和复合调味料，也可继续磨成蒜粒或蒜粉。','garlic-soup.jpg','蒜片蔬菜汤'],
  ],
  [
    ['以蒜片为原料','先将鲜蒜加工成脱水蒜片，再进入粉碎工序。','flakes.jpg'],
    ['粉碎筛分','干蒜片粉碎后，用筛分出不同粒径。更细的部分可以制成蒜粉。','powder.jpg'],
    ['拌入腌料','细粉便于均匀拌进腌料或复合调味料。储存和使用时注意防潮。','garlic-marinade.jpg','拌入蒜粉的腌料'],
  ],
  [
    ['鲜蒜入料','对照左边的鲜蒜与右边的黑蒜，先观察加工前后的颜色。','bulb-shop4.jpg'],
    ['控温控湿','熟化阶段，蒜中的糖和含氨基的成分发生美拉德反应，蒜瓣逐渐变深。','black.jpg'],
    ['品尝或做酱','熟化后的瓣肉更软，生蒜辛辣味减弱，可直接品尝或用来调酱汁。','black-garlic-sauce.jpg','黑蒜酱'],
  ],
];

const tradeSources = [
  ['https://www.jining.gov.cn/art/2021/10/27/art_71695_2735907.html','济宁市跨境贸易便利化手册'],
  ['https://scs.moa.gov.cn/gzdt/202411/t20241105_6465731.htm','农民日报 · 走访金乡冷库'],
  ['https://scs.moa.gov.cn/jcyj/202610/t20261009_6488437.htm','农业农村部 · 2026年9月会商材料'],
];

const homeImages = ['bulb-shop4.jpg','field.jpg','加工车间.jpg','sorting.jpg'];
const number = index => String(index + 1).padStart(2,'0');

function photo(file, alt = '', extra = '') {
  return `<img src="${assetRoot + file}" alt="${alt}" ${extra}>`;
}

function festivalBrand() {
  return photo('logo.png','金乡大蒜节','class="brand"');
}

/* ==========================================================================
   美术馆级建筑光影与版画线描背景系统
   ========================================================================== */

function idleBackdrop() {
  return `<svg class="scene-backdrop idle-backdrop" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <!-- 展厅天窗斜射光柱 -->
      <linearGradient id="gallery-beam" x1="18%" y1="0%" x2="72%" y2="100%">
        <stop offset="0%" stop-color="#fffdf8" stop-opacity=".75"/>
        <stop offset="48%" stop-color="#fff9ee" stop-opacity=".26"/>
        <stop offset="100%" stop-color="#f2ebe0" stop-opacity="0"/>
      </linearGradient>
      <radialGradient id="idle-amethyst" cx="78%" cy="32%" r="52%">
        <stop offset="0%" stop-color="#dfc7ef" stop-opacity=".82"/>
        <stop offset="48%" stop-color="#ebe0f2" stop-opacity=".38"/>
        <stop offset="100%" stop-color="#f2ebe0" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="idle-meadow" cx="84%" cy="76%" r="36%">
        <stop offset="0%" stop-color="#d8e6a6" stop-opacity=".68"/>
        <stop offset="60%" stop-color="#e8eed0" stop-opacity=".2"/>
        <stop offset="100%" stop-color="#f2ebe0" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="idle-ochre" cx="10%" cy="16%" r="44%">
        <stop offset="0%" stop-color="#efe0c6" stop-opacity=".75"/>
        <stop offset="100%" stop-color="#f2ebe0" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="bg-hill" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#cbb0e2" stop-opacity=".5"/>
        <stop offset="60%" stop-color="#e2d1ef" stop-opacity=".34"/>
        <stop offset="100%" stop-color="#efe6f3" stop-opacity=".12"/>
      </linearGradient>
      <linearGradient id="bronze-line" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#a6814c" stop-opacity=".44"/>
        <stop offset="52%" stop-color="#6d3a9c" stop-opacity=".28"/>
        <stop offset="100%" stop-color="#6f8f3b" stop-opacity=".38"/>
      </linearGradient>
    </defs>

    <rect width="1600" height="900" fill="url(#idle-ochre)"/>
    <rect width="1600" height="900" fill="url(#idle-amethyst)"/>
    <rect width="1600" height="900" fill="url(#idle-meadow)"/>

    <!-- 建筑斜射天窗光影，营造真实美术馆空间感 -->
    <polygon points="80,0 590,0 980,900 320,900" fill="url(#gallery-beam)"/>

    <!-- 美术馆版画定位线与几何光轨 -->
    <g fill="none" stroke="url(#bronze-line)">
      <circle cx="1165" cy="430" r="465" stroke-width="1.15" opacity=".7"/>
      <circle cx="1165" cy="430" r="548" stroke-width=".9" stroke-dasharray="3 8" opacity=".55"/>
      <circle cx="1165" cy="430" r="665" stroke-width=".85" opacity=".32"/>
      <line x1="64" y1="92" x2="1536" y2="92" stroke-width=".8" opacity=".42"/>
      <line x1="64" y1="816" x2="1536" y2="816" stroke-width=".8" opacity=".34"/>
      <line x1="704" y1="92" x2="704" y2="816" stroke-width=".75" stroke-dasharray="2 7" opacity=".28"/>
    </g>

    <!-- 四角策展十字准星 (+) -->
    <g stroke="#6c399c" stroke-width="1" opacity=".34">
      <path d="M58 92 H70 M64 86 V98"/>
      <path d="M1530 92 H1542 M1536 86 V98"/>
      <path d="M58 816 H70 M64 810 V822"/>
      <path d="M1530 816 H1542 M1536 810 V822"/>
    </g>

    <!-- 博物版画风格大蒜线描暗纹（居于中景偏左上方留白，不遮主标题） -->
    <g transform="translate(495 155) scale(.92) rotate(11)" fill="none" stroke="#6d3a9c" stroke-linecap="round" opacity=".09">
      <path d="M126 12 C 122 68, 92 118, 52 152 C 18 180, 14 226, 48 254 C 82 282, 148 286, 194 258 C 234 234, 244 180, 206 142 C 170 106, 146 64, 140 10" stroke-width="1.8"/>
      <path d="M132 30 C 128 104, 108 174, 76 244" stroke-width="1.2"/>
      <path d="M136 34 C 150 108, 174 174, 186 246" stroke-width="1.2"/>
      <path d="M44 252 C 92 232, 162 232, 214 250" stroke-width="1.1" stroke-dasharray="3 5"/>
      <circle cx="132" cy="186" r="118" stroke-width=".75" stroke-dasharray="2 6"/>
    </g>

    <!-- 远景薄雾紫丝带 -->
    <path d="M310 900 C 500 742, 795 696, 1115 742 C 1335 774, 1485 748, 1620 684 L 1620 920 L 310 920 Z" fill="url(#bg-hill)"/>
  </svg>`;
}

/* 待机页前景丝网版画风田垄丝带 */
function idleRidges() {
  return `<svg class="scene-backdrop idle-ridges" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient id="fg-lilac" x1="12%" y1="15%" x2="88%" y2="95%">
        <stop offset="0%" stop-color="#9e64cb"/>
        <stop offset="52%" stop-color="#c395e4"/>
        <stop offset="100%" stop-color="#e5ccf6"/>
      </linearGradient>
      <linearGradient id="fg-sage" x1="15%" y1="10%" x2="92%" y2="90%">
        <stop offset="0%" stop-color="#d2e093"/>
        <stop offset="52%" stop-color="#b8cd70"/>
        <stop offset="100%" stop-color="#93b14c"/>
      </linearGradient>
      <linearGradient id="fg-plum" x1="0%" y1="10%" x2="100%" y2="90%">
        <stop offset="0%" stop-color="#693299"/>
        <stop offset="55%" stop-color="#9862c6"/>
        <stop offset="100%" stop-color="#cfa9eb"/>
      </linearGradient>
    </defs>

    <!-- 右侧青禾梯田弧形田垄 + 版画刻线 -->
    <g>
      <path d="M790 910 C 942 718, 1200 622, 1620 662 L 1620 925 L 790 925 Z" fill="url(#fg-sage)" stroke="#f5efe6" stroke-width="3"/>
      <g fill="none" stroke="#fbf8ef" stroke-linecap="round" opacity=".76">
        <path d="M862 910 C 1015 754, 1245 676, 1620 710" stroke-width="1.8"/>
        <path d="M942 910 C 1088 790, 1290 726, 1620 754" stroke-width="1.6"/>
        <path d="M1035 910 C 1164 822, 1340 774, 1620 798" stroke-width="1.4"/>
        <path d="M1142 910 C 1254 850, 1404 820, 1620 840" stroke-width="1.25"/>
        <path d="M1270 910 C 1358 876, 1474 860, 1620 876" stroke-width="1.1"/>
      </g>
    </g>

    <!-- 中景淡紫丝绸田垄 -->
    <path d="M405 915 C 560 732, 855 708, 1185 846 C 1265 878, 1335 898, 1410 915 Z" fill="url(#fg-lilac)" stroke="#f5efe6" stroke-width="3"/>
    <path d="M485 915 C 628 776, 875 762, 1152 874" fill="none" stroke="#faf2fe" stroke-width="1.4" opacity=".7"/>

    <!-- 前景深绛紫丝带 -->
    <path d="M565 920 C 735 802, 985 798, 1265 920 Z" fill="url(#fg-plum)" stroke="#f5efe6" stroke-width="2.5"/>
    <path d="M655 920 C 795 842, 995 838, 1185 920" fill="none" stroke="#f7ecfe" stroke-width="1.15" opacity=".56"/>
  </svg>`;
}

/* 展厅总览壁面背景：建筑斜射光墙 + 拱窗暗影 + 底部田野版画刻线 */
function exploreBackdrop() {
  return `<svg class="scene-backdrop explore-backdrop" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient id="hall-beam" x1="0%" y1="0%" x2="88%" y2="100%">
        <stop offset="0%" stop-color="#fffdf8" stop-opacity=".72"/>
        <stop offset="50%" stop-color="#fff8ec" stop-opacity=".18"/>
        <stop offset="100%" stop-color="#f2ebe0" stop-opacity="0"/>
      </linearGradient>
      <radialGradient id="exp-lilac" cx="90%" cy="10%" r="50%">
        <stop offset="0%" stop-color="#e3cef4" stop-opacity=".8"/>
        <stop offset="56%" stop-color="#efe4f8" stop-opacity=".3"/>
        <stop offset="100%" stop-color="#f2ebe0" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="exp-sage" cx="84%" cy="94%" r="48%">
        <stop offset="0%" stop-color="#d3e2a2" stop-opacity=".72"/>
        <stop offset="58%" stop-color="#e6eed0" stop-opacity=".26"/>
        <stop offset="100%" stop-color="#f2ebe0" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="exp-stone" cx="8%" cy="82%" r="44%">
        <stop offset="0%" stop-color="#efe0c6" stop-opacity=".72"/>
        <stop offset="100%" stop-color="#f2ebe0" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="exp-ribbon-a" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#e0c7f2" stop-opacity=".22"/>
        <stop offset="55%" stop-color="#d2b0ea" stop-opacity=".46"/>
        <stop offset="100%" stop-color="#e4cff4" stop-opacity=".62"/>
      </linearGradient>
      <linearGradient id="exp-ribbon-b" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#e1ecb9" stop-opacity=".16"/>
        <stop offset="60%" stop-color="#cee095" stop-opacity=".5"/>
        <stop offset="100%" stop-color="#bdd478" stop-opacity=".64"/>
      </linearGradient>
    </defs>

    <rect width="1600" height="900" fill="url(#exp-stone)"/>
    <rect width="1600" height="900" fill="url(#exp-lilac)"/>
    <rect width="1600" height="900" fill="url(#exp-sage)"/>

    <!-- 美术馆斜射天光 -->
    <polygon points="180,0 780,0 1180,900 440,900" fill="url(#hall-beam)"/>

    <!-- 建筑展墙细线网格与几何拱环 -->
    <g fill="none" stroke="#6c399c" opacity=".14">
      <line x1="64" y1="88" x2="1536" y2="88" stroke-width=".85"/>
      <line x1="64" y1="846" x2="1536" y2="846" stroke-width=".85"/>
      <circle cx="1450" cy="120" r="220" stroke-width="1"/>
      <circle cx="1450" cy="120" r="300" stroke-width=".85" stroke-dasharray="3 8"/>
      <circle cx="140" cy="830" r="290" stroke-width=".9"/>
    </g>

    <!-- 底部宽幅田垄版画丝带 -->
    <path d="M-40 842 C 340 748, 760 856, 1145 732 C 1345 668, 1495 662, 1640 684 L 1640 920 L -40 920 Z" fill="url(#exp-ribbon-a)"/>
    <path d="M460 920 C 795 802, 1180 692, 1640 740 L 1640 920 Z" fill="url(#exp-ribbon-b)"/>
    <g fill="none" stroke="#fcfaf5" stroke-linecap="round" opacity=".68">
      <path d="M-40 844 C 340 750, 760 858, 1145 734 C 1345 670, 1495 664, 1640 686" stroke-width="1.8"/>
      <path d="M585 920 C 900 818, 1240 736, 1640 776" stroke-width="1.5"/>
      <path d="M760 920 C 1035 842, 1325 788, 1640 816" stroke-width="1.25"/>
    </g>
  </svg>`;
}

/* 四大展厅专属壁面光影与策展线描（一室一境） */
function chapterBackdrop(id) {
  const palettes = {
    parts:  { a: '#e2c9f5', b: '#dce9bf', c: '#f2e3cc', stroke: '#6c389c', wave1: '#dfcaf0', wave2: '#ece0f6' },
    growth: { a: '#d4e5ae', b: '#e4d2f4', c: '#f0e3c6', stroke: '#5c7e2c', wave1: '#d5e4ae', wave2: '#e5efd0' },
    food:   { a: '#f0dcb4', b: '#e6cff4', c: '#e3ecc2', stroke: '#9b6f2b', wave1: '#eedbb6', wave2: '#f5e9d0' },
    trade:  { a: '#dad0f2', b: '#cde5d5', c: '#efe2ce', stroke: '#4c388f', wave1: '#d8cef0', wave2: '#e2eaf0' },
  };
  const p = palettes[id] || palettes.parts;

  const motif = {
    /* Room I: 博物标本测绘环与植物剖面线 */
    parts: `<g fill="none" stroke="${p.stroke}" opacity=".13">
      <circle cx="1450" cy="180" r="185" stroke-width="1"/>
      <circle cx="1450" cy="180" r="255" stroke-width=".85" stroke-dasharray="3 8"/>
      <line x1="1450" y1="30" x2="1450" y2="330" stroke-width=".75"/>
      <line x1="1300" y1="180" x2="1600" y2="180" stroke-width=".75"/>
      <circle cx="120" cy="790" r="235" stroke-width=".9"/>
      <circle cx="120" cy="790" r="165" stroke-width=".8" stroke-dasharray="2 6"/>
    </g>`,
    /* Room II: 四季等高线与田垄刻痕 */
    growth: `<g fill="none" stroke="${p.stroke}" opacity=".15">
      <path d="M-40 765 C 320 668, 740 818, 1185 680 C 1385 618, 1505 622, 1640 652" stroke-width="1.2"/>
      <path d="M-40 806 C 340 712, 760 854, 1205 724 C 1395 668, 1515 670, 1640 698" stroke-width="1" stroke-dasharray="5 7"/>
      <path d="M1395 118 C 1458 178, 1488 262, 1468 350" stroke-width="1.2"/>
      <path d="M1468 350 C 1412 288, 1392 212, 1438 134" stroke-width="1"/>
      <circle cx="1440" cy="240" r="145" stroke-width=".8" stroke-dasharray="2 7"/>
    </g>`,
    /* Room III: 器皿同心窑纹与金穗弧线 */
    food: `<g fill="none" stroke="${p.stroke}" opacity=".14">
      <circle cx="1465" cy="760" r="230" stroke-width="1.1"/>
      <circle cx="1465" cy="760" r="175" stroke-width=".9" stroke-dasharray="3 7"/>
      <circle cx="1465" cy="760" r="115" stroke-width=".85"/>
      <circle cx="115" cy="200" r="180" stroke-width=".9" stroke-dasharray="4 8"/>
    </g>`,
    /* Room IV: 古舆图经纬网与罗盘准线 */
    trade: `<g fill="none" stroke="${p.stroke}" opacity=".14">
      <path d="M-40 695 Q 520 525, 1080 650 T 1640 535" stroke-width="1.1" stroke-dasharray="5 8"/>
      <path d="M-40 755 Q 540 612, 1110 725 T 1640 625" stroke-width=".95"/>
      <circle cx="1465" cy="185" r="165" stroke-width="1"/>
      <circle cx="1465" cy="185" r="225" stroke-width=".85" stroke-dasharray="2 6"/>
      <line x1="1465" y1="45" x2="1465" y2="325" stroke-width=".75"/>
      <line x1="1325" y1="185" x2="1605" y2="185" stroke-width=".75"/>
    </g>`,
  }[id] || '';

  return `<svg class="scene-backdrop chapter-backdrop" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient id="ch-beam-${id}" x1="12%" y1="0%" x2="78%" y2="100%">
        <stop offset="0%" stop-color="#fffdf8" stop-opacity=".62"/>
        <stop offset="48%" stop-color="#fffaf0" stop-opacity=".14"/>
        <stop offset="100%" stop-color="#f2ebe0" stop-opacity="0"/>
      </linearGradient>
      <radialGradient id="ch-a-${id}" cx="92%" cy="8%" r="54%">
        <stop offset="0%" stop-color="${p.a}" stop-opacity=".8"/>
        <stop offset="56%" stop-color="${p.a}" stop-opacity=".2"/>
        <stop offset="100%" stop-color="#f2ebe0" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="ch-b-${id}" cx="8%" cy="90%" r="48%">
        <stop offset="0%" stop-color="${p.b}" stop-opacity=".72"/>
        <stop offset="60%" stop-color="${p.b}" stop-opacity=".18"/>
        <stop offset="100%" stop-color="#f2ebe0" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="ch-c-${id}" cx="52%" cy="100%" r="45%">
        <stop offset="0%" stop-color="${p.c}" stop-opacity=".56"/>
        <stop offset="100%" stop-color="#f2ebe0" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="1600" height="900" fill="url(#ch-a-${id})"/>
    <rect width="1600" height="900" fill="url(#ch-b-${id})"/>
    <rect width="1600" height="900" fill="url(#ch-c-${id})"/>
    <polygon points="100,0 640,0 1020,900 320,900" fill="url(#ch-beam-${id})"/>
    ${motif}
    <path d="M-40 868 C 380 802, 860 882, 1280 798 C 1430 768, 1540 766, 1640 782 L 1640 920 L -40 920 Z" fill="${p.wave1}" opacity=".42"/>
    <path d="M620 920 C 960 848, 1300 798, 1640 834 L 1640 920 Z" fill="${p.wave2}" opacity=".55"/>
  </svg>`;
}

/* ==========================================================================
   1. 待机屏：当代美术馆特展海报式入口
   ========================================================================== */

function idleScreen() {
  const quickLinks = topics.map(({id, name}) => {
    const meta = chapterMeta[id];
    return `<button class="idle-index-item" data-route="${id}">
      <span class="idx-roman">${meta.roman}</span>
      <span class="idx-name">${name}</span>
      <small class="idx-folio">${meta.folio}</small>
    </button>`;
  }).join('');

  return `<section class="idle">
    ${idleBackdrop()}
    <div class="idle-inner">
      <header class="idle-header">
        ${festivalBrand()}
        <div class="museum-colophon">
          <span>35°04′N · 116°18′E</span>
          <i aria-hidden="true"></i>
          <span>中国·金乡 · 科普艺术交互展陈</span>
        </div>
      </header>

      <div class="idle-copy">
        <div class="idle-meta-line">
          <span class="idle-eyebrow">EXHIBITION · 地理标志农产品专题展</span>
        </div>

        <div class="idle-title-group">
          <div class="idle-title-main">
            <h1 tabindex="-1">认识<strong>金乡大蒜</strong></h1>
            <p class="idle-lead">从一头白皮蒜的形态肌理出发，循四季农时、风味转化与远航贸易，阅读黄河冲积平原上的物产风土志。</p>
          </div>
          <aside class="vertical-inscription" aria-label="一瓣蒜，一方水土">
            <span class="seal-stamp" aria-hidden="true">蒜<br>乡</span>
            <p>一瓣蒜，一方水土</p>
          </aside>
        </div>

        <div class="idle-cta-row">
          <button class="start-medallion" data-route="explore" aria-label="触摸开始探索金乡大蒜">
            <svg class="medallion-ring" viewBox="0 0 140 140" aria-hidden="true">
              <defs>
                <path id="medallion-circle" d="M 70,70 m -52,0 a 52,52 0 1,1 104,0 a 52,52 0 1,1 -104,0"/>
              </defs>
              <text>
                <textPath href="#medallion-circle" startOffset="0%">JINXIANG GARLIC EXHIBITION · 触摸入展 · </textPath>
              </text>
            </svg>
            <span class="medallion-core" aria-hidden="true">
              <span class="medallion-arrow">→</span>
            </span>
          </button>
          <button class="start-caption" data-route="explore">
            <strong>触摸入展</strong>
            <small>ENTER EXHIBITION · 四大主题展厅</small>
          </button>
        </div>
      </div>

      <div class="idle-art" aria-hidden="true">
        <div class="idle-halo"></div>
        <div class="idle-arch"></div>
        ${photo('海报花形.svg','','class="idle-flower"')}
        ${photo('蒜农.svg','','class="idle-farmer"')}
      </div>

      ${idleRidges()}

      <nav class="idle-index" aria-label="快速进入展厅">
        ${quickLinks}
      </nav>
    </div>
  </section>`;
}

/* ==========================================================================
   2. 展厅总览：错落画廊装裱展墙
   ========================================================================== */

function homeScreen() {
  const entries = topics.map(({id, name}, index) => {
    const meta = chapterMeta[id];
    return `
    <button class="entry entry-${id}" data-route="${id}">
      <span class="entry-top-meta">
        <span class="entry-roman">ROOM ${meta.roman}</span>
        <span class="entry-folio">${meta.folio} · ${meta.subtitle}</span>
      </span>
      <span class="entry-mat">
        <span class="entry-media">${photo(homeImages[index])}</span>
      </span>
      <span class="entry-body">
        <span class="entry-watermark" aria-hidden="true">${meta.num}</span>
        <span class="entry-label">
          <strong>${name}</strong>
          <span class="entry-arrow" aria-hidden="true">↗</span>
        </span>
        <small>${exhibitGuide[id].caption}</small>
      </span>
    </button>`;
  }).join('');

  return `<section class="home">
    ${exploreBackdrop()}
    <div class="home-shell">
      <header class="home-top">
        <div class="home-brand-group">
          ${festivalBrand()}
          <span class="curatorial-tag">EXHIBITION HALL · 展厅总览</span>
        </div>
        <button class="return-idle" data-route=""><span aria-hidden="true">←</span> 返回海报待机页</button>
      </header>

      <div class="explore">
        <div class="explore-heading">
          <div class="explore-title-wrap">
            <span class="section-eyebrow">CURATORIAL DIRECTORY · 策展导览</span>
            <h1 tabindex="-1">探索金乡大蒜</h1>
          </div>
          <div class="explore-note">
            <span class="seal-mini" aria-hidden="true">展</span>
            <p>四座主题展室构成完整物产脉络<br><small>轻触任一装裱展窗，步入对应展室</small></p>
          </div>
        </div>
        <div class="entries">${entries}</div>
      </div>

      <footer class="gallery-colophon" aria-hidden="true">
        <span>JINXIANG GARLIC FESTIVAL · 场馆科普交互展陈</span>
        <span>I 形态志 · II 农时卷 · III 风味录 · IV 远行图</span>
      </footer>
    </div>
  </section>`;
}

function toggle(route, label, active, className = '') {
  return `<button class="${className}" data-route="${route}" aria-pressed="${active}">${label}</button>`;
}

/* 美术馆展墙解说牌 (.reading) */
function reading(topic, item, source) {
  const guide = exhibitGuide[topic.id];
  const meta = chapterMeta[topic.id];
  const [url, label] = source || [guide.link, guide.linkLabel];
  return `<article class="reading">
    <div class="reading-head">
      <span class="reading-room-code">ROOM ${meta.roman} · ${meta.folio}</span>
      <span class="reading-tag">${item.tag}</span>
    </div>
    <h2 tabindex="-1">${item.title}</h2>
    <div class="reading-prose">
      ${item.text.map(paragraph => `<p>${paragraph}</p>`).join('')}
    </div>
    <details class="reading-more">
      <summary><span>策展笔记 · ${guide.moreTitle}</span><i aria-hidden="true"></i></summary>
      <p>${guide.moreText}</p>
    </details>
    <div class="reading-foot">
      <a class="source-link" href="${url}" target="_blank" rel="noopener"><span>文献与出处 · ${label}</span><em aria-hidden="true">↗</em></a>
    </div>
  </article>`;
}

/* 建筑感细线美术馆导览顶栏与展室标题 */
function chapterHeader(topic) {
  const meta = chapterMeta[topic.id];
  const nav = topics.map(({id, name}) => {
    const m = chapterMeta[id];
    return `<button data-route="${id}" ${topic.id === id ? 'aria-current="page"' : ''}>
      <span aria-hidden="true">${m.roman}</span>${name}</button>`;
  }).join('');

  return `<header class="topbar"><div class="topbar-inner">
    <div class="topbar-left">
      <button class="back" data-route="explore"><span aria-hidden="true">←</span>展厅总览</button>
      <span class="topbar-sep" aria-hidden="true"></span>
      <button class="topbar-home" data-route="" aria-label="返回海报待机页">${festivalBrand()}</button>
    </div>
    <nav aria-label="切换科普展室">${nav}</nav>
  </div></header>
  <header class="chapter">
    <div class="chapter-copy">
      <div class="chapter-meta-row">
        <span class="chapter-en">${meta.en}</span>
        <span class="chapter-dot" aria-hidden="true"></span>
        <p class="chapter-fact">${exhibitGuide[topic.id].fact}</p>
      </div>
      <div class="chapter-title-line">
        <h1 tabindex="-1">${topic.name}</h1>
        <span class="chapter-folio-seal">${meta.folio}</span>
      </div>
    </div>
    <div class="chapter-actions">
      <p class="hint">${topic.hint}</p>
      ${nextChapter(topic)}
    </div>
    <span class="chapter-ghost-num" aria-hidden="true">${meta.roman}</span>
  </header>`;
}

function nextChapter(topic) {
  const next = topics[topics.indexOf(topic) + 1];
  const label = next ? `前往下一展室 · ${next.name}` : '返回展厅总览';
  return `<button class="chapter-next" data-route="${next?.id ?? 'explore'}">${label} <span aria-hidden="true">↗</span></button>`;
}

/* ==========================================================================
   ROOM I · 形态志（博物标本测绘台）
   ========================================================================== */

function specimen(topic, item, index) {
  const lines = partPoints.map(({x, y, labelX, labelY}, i) => {
    const start = labelX * 10 + (i === 3 ? 111 : 0);
    const active = i === index;
    return `
      <path class="${active ? 'is-active' : ''}" d="M${start} ${labelY * 5.67 + 16} H${i === 3 ? x - 36 : x + 26} L${x} ${y}"/>
      ${active ? `<circle class="pulse-ring" cx="${x}" cy="${y}" r="18"/>` : ''}
      <circle class="dot ${active ? 'is-active' : ''}" cx="${x}" cy="${y}" r="${active ? 8 : 6}"/>`;
  }).join('');

  const pins = partPoints.map(({labelX, labelY}, i) => `<button class="pin" style="left:${labelX}%;top:${labelY}%"
    data-route="parts:${i}" aria-pressed="${i === index}"><em>0${i + 1}</em>${content.parts[i].tab}</button>`).join('');
  const partControls = content.parts.map(({tab}, i) => toggle(`parts:${i}`, `<em>0${i + 1}</em>${tab}`, i === index)).join('');
  const observation = partPoints[index];

  return `<div class="specimen-layout">
    <figure class="media-stage">
      <div class="plate-frame">
        <div class="plate-bar"><span>PLATE I · 标本形态测绘</span><span>0${index + 1} / 04</span></div>
        <div class="specimen">
          ${photo('bulb-shop4.jpg','金乡白皮蒜的整头、蒜瓣和根盘','class="specimen-image"')}
          <svg class="wires" viewBox="0 0 1000 567" aria-hidden="true">${lines}</svg>${pins}
        </div>
      </div>
      <div class="stage-footer">
        <figcaption>${photoCredits.bulb}</figcaption>
        <div class="part-controls" aria-label="选择观察部位">${partControls}</div>
      </div>
    </figure>
    <div class="specimen-notes">
      ${reading(topic, item)}
      <div class="observation">
        <div class="zoom-frame" aria-hidden="true"><div class="zoom" style="background-position:${observation.zoom}"></div></div>
        <div class="observation-copy">
          <span class="mini-kicker">OPTICAL DETAIL · 局部细观</span>
          <strong>${item.tab}</strong>
          <p>${observation.observation}</p>
        </div>
      </div>
    </div>
  </div>`;
}

/* ==========================================================================
   ROOM II · 农时卷（四季节律展墙）
   ========================================================================== */

function growth(topic, item, index) {
  const timeline = content.growth.map((stage, i) => toggle(`growth:${i}`, `
    <span class="tl-thumb">${photo(stage.image,'',stage.focus ? `style="object-position:${stage.focus}"` : '')}</span>
    <span class="timeline-text"><small>0${i + 1} · ${stage.tag.split(' · ')[0]}</small><strong>${stage.tab}</strong></span>`, i === index)).join('');
  const credit = item.creditUrl
    ? `<a class="photo-source" href="${item.creditUrl}" target="_blank" rel="noopener">${item.credit} ↗</a>`
    : item.credit;

  return `<div class="timeline" aria-label="金乡大蒜农时">${timeline}</div>
    <div class="growth-layout">
      <figure class="media-stage">
        <div class="plate-frame">
          <div class="plate-bar"><span>PLATE II · ${item.tag}</span><span>STAGE 0${index + 1} / 05</span></div>
          <div class="growth-photo">
            ${photo(item.image, item.alt || item.tab, item.focus ? `style="object-position:${item.focus}"` : '')}
          </div>
        </div>
        <figcaption>${credit}</figcaption>
        <div class="field-note"><strong>观展提示</strong><span>${growthObservations[index]}</span></div>
      </figure>
      ${reading(topic, item)}
    </div>`;
}

/* ==========================================================================
   ROOM III · 风味录（画廊双联对比展台）
   ========================================================================== */

function productComparison(item) {
  return `<div class="comparison">
    <div class="compare-pane">${photo(item.compare, item.before)}<span>${item.before}</span></div>
    <span class="compare-arrow" aria-hidden="true">→</span>
    <div class="compare-pane">${photo(item.image, item.tab)}<span>加工后 · ${item.tab}</span></div>
  </div>`;
}

function food(topic, item, index, subIndex) {
  const products = content.food.map(({tab, image}, i) => toggle(`food:${i}`, `<span class="shelf-thumb">${photo(image)}</span><span class="shelf-copy"><small>0${i + 1}</small><strong>${tab}</strong></span>`, i === index)).join('');
  const steps = foodProcesses[index];
  const activeSub = subIndex < 0 ? 0 : subIndex;
  const [stepTitle, stepText, stepImage, dish] = steps[activeSub] || steps[0];
  const process = steps.map(([label], i) => toggle(`food:${index}:${i}`, `<em>0${i + 1}</em>${label}`, activeSub === i)).join('');
  const imageCredit = index === 0 ? '金乡新蒜晾晒｜方建兵 摄 · 金乡鑫诺生产车间｜周艺伟 摄' : item.credit;
  const overview = index === 0 ? `<div class="processing-field">
    <div class="compare-pane">${photo('金乡晾晒.jpg','金乡新蒜晾晒现场')}<span>收获后 · 摊开晾晒</span></div>
    <div class="compare-pane">${photo('加工车间.jpg','金乡鑫诺蒜制品生产车间')}<span>加工车间 · 整理与加工</span></div>
  </div>` : productComparison(item);

  return `<div class="product-shelf" aria-label="选择蒜制品">${products}</div>
    <div class="food-layout">
      <div class="food-visual">
        <figure class="media-stage">
          <div class="plate-frame">
            <div class="plate-bar"><span>PLATE III · ${index === 0 ? '产区晾晒与车间' : '加工前后对照'}</span><span>${item.tab}</span></div>
            ${overview}
          </div>
          <figcaption>${imageCredit}</figcaption>
        </figure>
        <div class="process-box">
          <div class="process-steps" aria-label="加工与用途">${process}</div>
          <div class="process-detail">
            <span class="process-thumb">${photo(stepImage, dish || stepTitle)}</span>
            <div>
              <strong>${stepTitle}</strong>
              <p>${stepText}</p>
              ${dish ? `<small class="dish-note">${dish} · 示意</small>` : ''}
            </div>
          </div>
        </div>
      </div>
      ${reading(topic, item)}
    </div>`;
}

/* ==========================================================================
   ROOM IV · 远行图（舆图装裱展台）
   ========================================================================== */

function tradeMap(index) {
  const points = [[60.97,21.55],[45.2,46.01],[46.7,93.26]];
  const markers = destinations.map(({name}, i) => `<button class="map-point" style="left:${points[i][0]}%;top:${points[i][1]}%"
    data-route="trade:4:${i}" aria-label="查看${name}" aria-pressed="${i === index}">
    <span class="map-pulse" aria-hidden="true"></span>
    <span class="map-core" aria-hidden="true"></span>
  </button>`).join('');

  return `<div class="plate-frame">
      <div class="plate-bar"><span>PLATE IV · 出口贸易联系示意舆图</span><span>金乡 · 越南 · 印度尼西亚</span></div>
      <div class="trade-map"><div class="trade-map-canvas">${photo('出口目的地.png','金乡与越南、印度尼西亚的贸易联系示意地图')}${markers}</div></div>
    </div>
    <div class="destinations" aria-label="选择贸易案例">
      ${destinations.map(({name}, i) => toggle(`trade:4:${i}`, `<i aria-hidden="true"></i>${name}`, i === index)).join('')}
    </div>`;
}

function trade(topic, item, index, subIndex) {
  const route = content.trade.map(({tab}, i) => toggle(`trade:${i}`, `
    <span class="route-number">${number(i)}</span>
    <span class="route-copy"><strong>${tab}</strong><small>${tradePrompts[i]}</small></span>`, i === index)).join('');
  const readingItem = item.map && destinations[subIndex] ? destinations[subIndex] : item;
  const media = item.map ? tradeMap(subIndex) : `<div class="plate-frame">
    <div class="plate-bar"><span>PLATE IV · 0${index + 1} ${item.tab}</span><span>${item.tag}</span></div>
    <div class="trade-photo">${photo(item.image, item.alt || item.tab)}</div>
  </div>`;

  return `<div class="trade-layout">
    <div class="trade-route" aria-label="大蒜出口流程">${route}</div>
    <figure class="media-stage">${media}<figcaption>${item.credit}</figcaption></figure>
    ${reading(topic, readingItem, item.map ? tradeSources[subIndex] : undefined)}
  </div>`;
}

const pageDesigns = { parts: specimen, growth, food, trade };

function render() {
  const [id, rawIndex, rawSubIndex] = location.hash.slice(1).split(':');
  const topic = topics.find(item => item.id === id);
  if (!topic) {
    screen.innerHTML = id === 'explore' ? homeScreen() : idleScreen();
    return;
  }
  const index = content[id][Number(rawIndex)] ? Number(rawIndex) : 0;
  const subIndex = [0,1,2].includes(Number(rawSubIndex)) ? Number(rawSubIndex) : -1;
  screen.innerHTML = `<section class="page page-${id}">
    ${chapterBackdrop(id)}
    <div class="page-shell">
      ${chapterHeader(topic)}
      <div class="chapter-content">${pageDesigns[id](topic, content[id][index], index, subIndex)}</div>
    </div>
  </section>`;
}

/* 展厅柔光随动（微幅洗墙灯光响应，营造沉浸式美术馆氛围） */
let lightRaf = 0;
window.addEventListener('pointermove', event => {
  if (lightRaf) return;
  lightRaf = requestAnimationFrame(() => {
    const x = (event.clientX / window.innerWidth) * 100;
    const y = (event.clientY / window.innerHeight) * 100;
    document.documentElement.style.setProperty('--mx', `${x.toFixed(1)}%`);
    document.documentElement.style.setProperty('--my', `${y.toFixed(1)}%`);
    lightRaf = 0;
  });
}, { passive: true });

screen.addEventListener('click', event => {
  const button = event.target.closest('button[data-route]');
  if (!button) return;
  const route = button.dataset.route;
  const [id] = location.hash.slice(1).split(':');
  if (button.hasAttribute('aria-current') && id === route) return;
  location.hash = route;
});

window.addEventListener('hashchange', event => {
  const active = document.activeElement;
  const matches = () => [...screen.querySelectorAll('button[data-route]')].filter(button => button.dataset.route === active?.dataset.route);
  const position = matches().indexOf(active);
  const previous = new URL(event.oldURL).hash.split(':')[0];
  const changedTopic = previous !== location.hash.split(':')[0];
  render();
  if (changedTopic) {
    window.scrollTo(0, 0);
    screen.querySelector('h1')?.focus({ preventScroll: true });
  } else if (position >= 0) {
    matches()[position]?.focus({ preventScroll: true });
  }
});

render();
