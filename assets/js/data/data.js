import {audioPath, imgPath} from '../config.js'
import Method from '../method/method.js'


// imgs
const uiImgs = [
    {name: 'deemo', path: imgPath + 'deemo.png'},
    {name: 'hololive', path: imgPath + 'hololive.png'},
    {name: 'select_difficulty_bg', path: imgPath + 'song_select_difficulty_bg_easy.png'},
    {name: 'select_difficulty', path: imgPath + 'song_select_difficulty_easy.png'},
    {name: 'select_mask', path: imgPath + 'song_select_easy_mask.png'},
    {name: 'select_flare_beam', path: imgPath + 'song_select_flare_beam.png'},
    {name: 'select_flare', path: imgPath + 'song_select_flare.png'},
    {name: 'select_namebar', path: imgPath + 'song_select_namebar.png'},
    {name: 'select_scorebar', path: imgPath + 'song_select_scorebar_easy.png'},
]


// playlist
const playlist = [
    {
        audioPath: audioPath + 'kami_yamada.ogg',
        bgPath: imgPath + 'bg.jpg',
        logoPath: imgPath + 'holox_logo.png',
        color: 0x936cc6,
        name: 'Deemo x Hololive',
        vocal: 'Hololive, Nijisanji',
        composer: 'Various Artists',
        type: 1,
    },
    {
        audioPath: audioPath + 'kami_yamada.ogg',
        bgPath: imgPath + 'kami_yamada.jpg',
        logoPath: imgPath + 'holox_logo.png',
        color: 0x936cc6,
        name: 'Kamippoi na',
        vocal: 'Laplus Darknesss',
        composer: 'PINOCCHIOP',
        type: 0,
    },
    {
        audioPath: audioPath + 'kami_seffyna.ogg',
        bgPath: imgPath + 'kami_seffyna.jpg',
        logoPath: imgPath + 'seffyna_logo.png',
        color: 0xff1e2e,
        name: 'Kamippoi na',
        vocal: 'Seffyna',
        composer: 'PINOCCHIOP',
        type: 1,
    },
    {
        audioPath: audioPath + 'ranbu_suisei.ogg',
        bgPath: imgPath + 'ranbu_suisei.jpg',
        logoPath: imgPath + 'suisei_logo.png',
        color: 0x2073ff,
        name: 'Ranbu No Melody',
        vocal: 'Hoshimati Suisei',
        composer: 'SID',
        type: 1,
    },
    {
        audioPath: audioPath + 'kakusei_suisei.ogg',
        bgPath: imgPath + 'kakusei_suisei.jpg',
        logoPath: imgPath + 'suisei_logo.png',
        color: 0xe10d90,
        name: 'Kakusei',
        vocal: 'Hoshimati Suisei',
        composer: 'Superfly',
        type: 2,
    },
    {
        audioPath: audioPath + 'phony_chima.ogg',
        bgPath: imgPath + 'phony_chima.jpg',
        logoPath: imgPath + 'nijisanji_logo.png',
        color: 0x196cff,
        name: 'Phony',
        vocal: 'Machita Chima',
        composer: 'Tsumiki',
        type: 2,
    },
    {
        audioPath: audioPath + 'phony_suisei.ogg',
        bgPath: imgPath + 'phony_suisei.jpg',
        logoPath: imgPath + 'suisei_logo.png',
        color: 0x20a8e9,
        name: 'Phony',
        vocal: 'Hoshimati Suisei',
        composer: 'Tsumiki',
        type: 1,
    },
    {
        audioPath: audioPath + 'king_chima.ogg',
        bgPath: imgPath + 'king_chima.jpg',
        logoPath: imgPath + 'nijisanji_logo.png',
        color: 0xffec00,
        name: 'KING',
        vocal: 'Machita Chima',
        composer: 'Kanaria',
        type: 1,
    },
    {
        audioPath: audioPath + 'king_suisei.ogg',
        bgPath: imgPath + 'king_suisei.jpg',
        logoPath: imgPath + 'suisei_logo.png',
        color: 0x426aff,
        name: 'KING',
        vocal: 'Hoshimati Suisei',
        composer: 'Kanaria',
        type: 0,
    },
    {
        audioPath: audioPath + 'error_towa.ogg',
        bgPath: imgPath + 'error_towa.jpg',
        logoPath: imgPath + 'towa_logo.png',
        color: 0xb55fea,
        name: 'Error',
        vocal: 'Tokoyami Towa',
        composer: 'niki',
        type: 1,
    },
    {
        audioPath: audioPath + 'sparkle_mio.ogg',
        bgPath: imgPath + 'sparkle_mio.jpg',
        logoPath: imgPath + 'mio_logo.png',
        color: 0x449cff,
        name: 'Sparkle',
        vocal: 'Ookami Mio',
        composer: 'RADWIMPS',
        type: 2,
    },
    {
        audioPath: audioPath + 'goodbye_aqua.ogg',
        bgPath: imgPath + 'goodbye_aqua.jpg',
        logoPath: imgPath + 'aqua_logo.png',
        color: 0xfbdd97,
        name: 'Goodbye Sengen',
        vocal: 'Minato Aqua',
        composer: 'Chinozo',
        type: 1
    },
    {
        audioPath: audioPath + 'animal_suisei_miko.ogg',
        bgPath: imgPath + 'animal_suisei_miko.jpg',
        logoPath: imgPath + 'suisei_miko_logo.png',
        color: 0xff2786,
        name: 'Animal',
        vocal: 'Suisei x Miko',
        composer: 'DECO*27',
        type: 1
    },
    {
        audioPath: audioPath + 'alien_sora.ogg',
        bgPath: imgPath + 'alien_sora.jpg',
        logoPath: imgPath + 'hololive_logo.png',
        color: 0xf23e58,
        name: 'Alien Alien',
        vocal: 'Tokino Sora',
        composer: 'NayutalieN',
        type: 2
    }
].map((e, i) => ({...e, isHome: i === 0 ? true : false}))


const ids = playlist.map(e => Method.uuidv4())


export {playlist, ids, uiImgs}