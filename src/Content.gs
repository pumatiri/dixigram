/**
 * DIXIGRAM — Curriculum
 * File: Content.gs
 *
 * Semua materi, bank soal, kosakata, dan achievement.
 * Kunci jawaban TIDAK pernah dikirim ke browser sebelum siswa menjawab.
 */

var DIXI_CONTENT = (function () {
  const grammar = {
    id: 'grammar',
    title: 'Grammar',
    label: 'Grammar Quest',
    subtitle: 'Bangun pondasi kalimat yang benar.',
    description: 'Dari be dan present simple sampai passive voice, reported speech, dan wishes. 20 modul, 5 di setiap level A1–B2.',
    icon: 'book-open',
    accent: 'violet'
  };

  const vocabulary = {
    id: 'vocabulary',
    title: 'Vocabulary',
    label: 'Word Voyage',
    subtitle: 'Perkaya kata, ekspresi, dan konteks.',
    description: 'Kata yang benar-benar dipakai sehari-hari, lengkap dengan pelafalan, arti, contoh, dan latihan konteks. 20 modul, 5 di setiap level A1–B2.',
    icon: 'languages',
    accent: 'teal'
  };

  const modules = [
    /* =====================================================
       GRAMMAR 1 — PRESENT SIMPLE
       ===================================================== */
    {
      id: 'present-simple',
      track: 'grammar',
      order: 1,
      title: 'Present Simple',
      subtitle: 'Kebiasaan, fakta, dan jadwal',
      level: 'A1',
      minutes: 8,
      icon: 'sun',
      accent: 'violet',
      description: 'Bentuk paling dasar untuk membicarakan rutinitas dan hal yang selalu benar.',
      objectives: [
        'Memakai -s / -es dengan subjek he, she, it',
        'Membuat kalimat negatif dan pertanyaan dengan do / does',
        'Meletakkan adverb of frequency di posisi yang tepat'
      ],
      sections: [
        {
          title: 'Kapan dipakai?',
          icon: 'compass',
          body: [
            'Present Simple dipakai untuk hal yang rutin, fakta umum, jadwal tetap, dan keadaan yang relatif permanen. Kata kuncinya: sesuatu yang terjadi berulang atau selalu benar.'
          ],
          bullets: [
            'Kebiasaan: “I drink tea every morning.”',
            'Fakta umum: “Water boils at 100°C.”',
            'Jadwal: “The class starts at 8 a.m.”',
            'Perasaan atau pendapat: “She loves jazz.”'
          ],
          tip: 'Kalau kalimatnya punya penanda seperti every day, usually, often, atau never, Present Simple biasanya jadi pilihan pertama.'
        },
        {
          title: 'Rumus inti',
          icon: 'braces',
          formula: [
            { label: 'Kalimat positif', value: 'S + V‑base (+s/es untuk he/she/it)' },
            { label: 'Kalimat negatif', value: 'S + do/does + not + V‑base' },
            { label: 'Pertanyaan', value: 'Do/Does + S + V‑base?' }
          ],
          table: {
            headers: ['Subjek', 'Contoh'],
            rows: [
              ['I / You / We / They', 'work from home'],
              ['He / She / It', 'works from home'],
              ['He / She / It (negatif)', 'does not work from home'],
              ['He / She / It (tanya)', 'Does he work from home?']
            ]
          },
          examples: [
            { en: 'I work from home every Friday.', id: 'Saya bekerja dari rumah setiap Jumat.' },
            { en: 'Dinda watches dramas every weekend.', id: 'Dinda menonton drama setiap akhir pekan.' },
            { en: 'We don’t use the car on Sundays.', id: 'Kami tidak memakai mobil pada hari Minggu.' },
            { en: 'Does he play badminton?', id: 'Apakah dia bermain bulu tangkis?' }
          ]
        },
        {
          title: 'Ejaan -s dan -es',
          icon: 'pen-line',
          bullets: [
            'Sebagian besar kata kerja cukup ditambah -s: play → plays, work → works.',
            'Kata berakhiran -s, -ss, -sh, -ch, -x, atau -o ditambah -es: watch → watches, go → goes.',
            'Konsonan + y berubah menjadi -ies: study → studies, carry → carries.',
            'Vokal + y cukup ditambah -s: play → plays, enjoy → enjoys.',
            'Bentuk istimewa: have → has.'
          ],
          tip: 'Adverb of frequency seperti always, usually, often, sometimes, rarely, dan never diletakkan sebelum kata kerja utama, tetapi setelah be: “She always arrives early” dan “She is always early.”'
        },
        {
          title: 'Jebakan yang sering muncul',
          icon: 'shield',
          examples: [
            { en: 'She goes to school by bus.', id: 'Benar: subjek she memakai goes.' },
            { en: 'She go to school by bus.', id: 'Salah: -s pada kata kerja belum ditambahkan.' },
            { en: 'He doesn’t like coffee.', id: 'Benar: setelah doesn’t, kata kerja kembali ke bentuk dasar.' },
            { en: 'Does she go to school?', id: 'Benar: does sudah membawa makna orang ketiga.' }
          ],
          tip: 'Jangan menambahkan -s dua kali. “Does she goes?” salah karena does dan goes sama-sama menandai orang ketiga.'
        }
      ],
      quiz: [
        {
          id: 'ps-1',
          type: 'mcq',
          prompt: 'My sister ___ coffee every morning.',
          options: ['drink', 'drinks', 'drinking', 'drank'],
          answer: 'b',
          explanation: 'Subjek “my sister” adalah orang ketiga tunggal, jadi kata kerja mendapat -s: drinks.'
        },
        {
          id: 'ps-2',
          type: 'type',
          prompt: '___ they live in Bandung?',
          placeholder: 'Tulis satu kata',
          answers: ['do'],
          explanation: 'Subjek “they” memakai do. Pertanyaan yang benar: “Do they live in Bandung?”'
        },
        {
          id: 'ps-3',
          type: 'mcq',
          prompt: 'The train ___ at 7:15 every weekday.',
          options: ['leave', 'leaves', 'left', 'leaving'],
          answer: 'b',
          explanation: 'Jadwal tetap memakai Present Simple. “The train” tunggal, sehingga kata kerjanya leaves.'
        },
        {
          id: 'ps-4',
          type: 'mcq',
          prompt: 'Pilih bentuk negatif yang tepat: Raka ___ like spicy food.',
          options: ['doesn’t', 'don’t', 'isn’t', 'not'],
          answer: 'a',
          explanation: 'Raka adalah orang ketiga tunggal. Negatifnya memakai doesn’t + kata kerja dasar: doesn’t like.'
        },
        {
          id: 'ps-5',
          type: 'type',
          prompt: 'Maria ___ (study) English every night.',
          placeholder: 'Tulis bentuk yang tepat',
          answers: ['studies'],
          explanation: 'Konsonan + y berubah menjadi -ies: study → studies.'
        },
        {
          id: 'ps-6',
          type: 'mcq',
          prompt: 'We usually ___ dinner at 7 p.m.',
          options: ['have', 'has', 'having', 'had'],
          answer: 'a',
          explanation: 'Subjek “we” memakai bentuk dasar have.'
        },
        {
          id: 'ps-7',
          type: 'mcq',
          prompt: 'She ___ late for class.',
          options: ['never is', 'is never', 'is not never', 'never'],
          answer: 'b',
          explanation: 'Adverb of frequency diletakkan setelah be. Jadi: She is never late.'
        },
        {
          id: 'ps-8',
          type: 'type',
          prompt: 'My parents ___ (not/watch) TV in the morning.',
          placeholder: 'Tulis dua atau tiga kata',
          answers: ['don’t watch', 'do not watch', "don't watch"],
          explanation: 'Subjek “my parents” plural memakai don’t + watch: “My parents don’t watch TV in the morning.”'
        }
      ]
    },

    /* =====================================================
       GRAMMAR 2 — PAST SIMPLE
       ===================================================== */
    {
      id: 'past-simple',
      track: 'grammar',
      order: 4,
      title: 'Past Simple',
      subtitle: 'Cerita dan kejadian masa lalu',
      level: 'A2',
      minutes: 9,
      icon: 'history',
      accent: 'violet',
      description: 'Ceritakan kejadian yang sudah selesai pada waktu tertentu di masa lalu.',
      objectives: [
        'Membedakan kata kerja beraturan dan tidak beraturan',
        'Memakai did / didn’t dengan kata kerja dasar',
        'Memakai was / were dengan tepat'
      ],
      sections: [
        {
          title: 'Kapan dipakai?',
          icon: 'compass',
          body: [
            'Past Simple digunakan untuk aksi yang sudah selesai pada waktu tertentu di masa lalu. Waktunya bisa disebutkan langsung atau sudah dipahami dari konteks.'
          ],
          bullets: [
            'Waktu spesifik: “We went to the beach last weekend.”',
            'Urutan cerita: “She opened the door and walked in.”',
            'Kebiasaan masa lalu: “I played football when I was a child.”',
            'Keadaan masa lalu: “They were at home yesterday.”'
          ],
          tip: 'Penanda waktu yang umum: yesterday, last night, two days ago, in 2020, when I was young.'
        },
        {
          title: 'Rumus inti',
          icon: 'braces',
          formula: [
            { label: 'Positif', value: 'S + V‑past (kata kerja bentuk lampau)' },
            { label: 'Negatif', value: 'S + did not (didn’t) + V‑base' },
            { label: 'Pertanyaan', value: 'Did + S + V‑base?' },
            { label: 'Dengan be', value: 'S + was/were (+ not)' }
          ],
          tip: 'V‑base = bentuk dasar (go), V‑past = bentuk lampau (went), V‑past participle = bentuk partisip lampau (gone).',
          table: {
            headers: ['Subjek', 'Be', 'Contoh'],
            rows: [
              ['I / He / She / It', 'was', 'was tired'],
              ['You / We / They', 'were', 'were tired'],
              ['Semua subjek', 'didn’t + V‑base', 'didn’t go'],
              ['Semua subjek', 'Did + S + V‑base?', 'Did you go?']
            ]
          }
        },
        {
          title: 'Beraturan vs tidak beraturan',
          icon: 'layers',
          body: [
            'Kata kerja beraturan mendapat -ed. Ada aturan ejaan kecil, tetapi polanya bisa diprediksi. Kata kerja tidak beraturan harus dihafal karena bentuknya berubah.'
          ],
          table: {
            headers: ['V‑base', 'V‑past', 'Arti'],
            rows: [
              ['go', 'went', 'pergi'],
              ['see', 'saw', 'melihat'],
              ['buy', 'bought', 'membeli'],
              ['have', 'had', 'memiliki'],
              ['take', 'took', 'mengambil'],
              ['write', 'wrote', 'menulis']
            ]
          },
          bullets: [
            'live → lived, work → worked',
            'study → studied (konsonan + y → ied)',
            'stop → stopped (satu vokal + satu konsonan akhir digandakan)'
          ]
        },
        {
          title: 'Jebakan yang sering muncul',
          icon: 'shield',
          examples: [
            { en: 'Did you go to the party?', id: 'Benar: setelah did, gunakan bentuk dasar.' },
            { en: 'Did you went to the party?', id: 'Salah: went sudah bentuk lampau, tidak dipakai setelah did.' },
            { en: 'I didn’t see him yesterday.', id: 'Benar: didn’t + see.' },
            { en: 'I have seen him yesterday.', id: 'Salah: yesterday menuntut Past Simple, bukan Present Perfect.' }
          ],
          tip: 'Setelah did atau didn’t, kata kerja selalu kembali ke bentuk dasar. Ini kesalahan yang sangat sering terjadi.'
        }
      ],
      quiz: [
        {
          id: 'past-1',
          type: 'mcq',
          prompt: 'We ___ to the beach last weekend.',
          options: ['go', 'went', 'gone', 'going'],
          answer: 'b',
          explanation: 'Last weekend menunjukkan waktu lampau yang selesai. Bentuk past dari go adalah went.'
        },
        {
          id: 'past-2',
          type: 'type',
          prompt: 'She ___ (visit) her grandmother yesterday.',
          placeholder: 'Tulis bentuk lampau',
          answers: ['visited'],
          explanation: 'Visit adalah kata kerja beraturan, jadi bentuk lampaunya visited.'
        },
        {
          id: 'past-3',
          type: 'mcq',
          prompt: 'I ___ hungry after the game.',
          options: ['was', 'were', 'did', 'am'],
          answer: 'a',
          explanation: 'Subjek I memakai was. “I was hungry after the game.”'
        },
        {
          id: 'past-4',
          type: 'mcq',
          prompt: 'They ___ come to the meeting.',
          options: ['didn’t', 'don’t', 'weren’t', 'not'],
          answer: 'a',
          explanation: 'Kalimat negatif Past Simple memakai didn’t + kata kerja dasar: didn’t come.'
        },
        {
          id: 'past-5',
          type: 'mcq',
          prompt: '___ you finish your homework last night?',
          options: ['Did', 'Do', 'Were', 'Have'],
          answer: 'a',
          explanation: 'Pertanyaan Past Simple memakai Did + subjek + V‑base: “Did you finish…?”'
        },
        {
          id: 'past-6',
          type: 'mcq',
          prompt: 'He ___ his keys on the table.',
          options: ['leaved', 'left', 'leave', 'leaving'],
          answer: 'b',
          explanation: 'Bentuk past dari leave adalah left (tidak beraturan).'
        },
        {
          id: 'past-7',
          type: 'mcq',
          prompt: 'What ___ you do on Sunday?',
          options: ['did', 'do', 'were', 'are'],
          answer: 'a',
          explanation: 'Pertanyaan tentang aktivitas lampau memakai did: “What did you do…?”'
        },
        {
          id: 'past-8',
          type: 'type',
          prompt: 'We ___ (not/go) to school yesterday.',
          placeholder: 'Tulis dua atau tiga kata',
          answers: ['didn’t go', 'did not go', "didn't go"],
          explanation: 'Negatif Past Simple: didn’t + go. “We didn’t go to school yesterday.”'
        }
      ]
    },

    /* =====================================================
       GRAMMAR 3 — COMPARATIVES & SUPERLATIVES
       ===================================================== */
    {
      id: 'comparatives',
      track: 'grammar',
      order: 5,
      title: 'Comparatives & Superlatives',
      subtitle: 'Membandingkan dua hal atau lebih',
      level: 'A2',
      minutes: 8,
      icon: 'scale',
      accent: 'violet',
      description: 'Bandingkan dua benda dengan -er / more, dan temukan yang paling unggul dengan -est / the most.',
      objectives: [
        'Membentuk comparative dan superlative dari kata sifat pendek dan panjang',
        'Menggunakan than, as … as, dan the most dengan benar',
        'Menguasai bentuk tidak beraturan seperti better dan worse'
      ],
      sections: [
        {
          title: 'Dua alat pembanding',
          icon: 'scale',
          body: [
            'Comparative membandingkan dua hal. Superlative membandingkan tiga hal atau lebih dan menunjukkan yang paling tinggi derajatnya.'
          ],
          examples: [
            { en: 'This phone is cheaper than that one.', id: 'Comparative: membandingkan dua telepon.' },
            { en: 'This is the cheapest phone in the shop.', id: 'Superlative: membandingkan semua telepon di toko.' }
          ],
          tip: 'Comparative biasanya berpasangan dengan than. Superlative biasanya memakai the.'
        },
        {
          title: 'Rumus & ejaan',
          icon: 'braces',
          formula: [
            { label: 'Comparative pendek', value: 'adjective + -er + than' },
            { label: 'Comparative panjang', value: 'more + adjective + than' },
            { label: 'Superlative pendek', value: 'the + adjective + -est' },
            { label: 'Superlative panjang', value: 'the most + adjective' }
          ],
          bullets: [
            'big → bigger → the biggest (konsonan akhir digandakan)',
            'happy → happier → the happiest (y → i)',
            'modern → more modern → the most modern',
            'interesting → more interesting → the most interesting'
          ]
        },
        {
          title: 'Bentuk tidak beraturan',
          icon: 'sparkles',
          table: {
            headers: ['Kata sifat', 'Comparative', 'Superlative'],
            rows: [
              ['good', 'better', 'the best'],
              ['bad', 'worse', 'the worst'],
              ['far', 'farther / further', 'the farthest / furthest'],
              ['little', 'less', 'the least']
            ]
          },
          tip: 'Jangan gabungkan dua penanda sekaligus. “More cheaper” dan “the most tallest” salah.'
        },
        {
          title: 'Membandingkan yang setara',
          icon: 'shield',
          body: [
            'Gunakan as + adjective + as untuk menyatakan dua hal setara. Untuk menyatakan tidak setara, gunakan not as + adjective + as.'
          ],
          examples: [
            { en: 'She is as tall as her brother.', id: 'Mereka sama tinggi.' },
            { en: 'This test is not as easy as the last one.', id: 'Tes ini tidak semudah tes sebelumnya.' },
            { en: 'My results are better than yours.', id: 'Hasilku lebih baik daripada hasilmu.' }
          ],
          tip: 'Pasangan yang benar adalah as … as, bukan as … than.'
        }
      ],
      quiz: [
        {
          id: 'cmp-1',
          type: 'mcq',
          prompt: 'This bag is ___ than that one.',
          options: ['cheaper', 'cheapest', 'more cheap', 'cheap'],
          answer: 'a',
          explanation: 'Cheap adalah kata sifat pendek: cheaper + than.'
        },
        {
          id: 'cmp-2',
          type: 'mcq',
          prompt: 'Mount Everest is ___ mountain in the world.',
          options: ['the highest', 'higher', 'highest', 'the most high'],
          answer: 'a',
          explanation: 'Superlative untuk kata sifat pendek high adalah the highest.'
        },
        {
          id: 'cmp-3',
          type: 'mcq',
          prompt: 'Today is ___ than yesterday.',
          options: ['more hot', 'hotter', 'hottest', 'most hot'],
          answer: 'b',
          explanation: 'Hot adalah kata sifat pendek. Konsonan akhir digandakan: hotter.'
        },
        {
          id: 'cmp-4',
          type: 'mcq',
          prompt: 'This is ___ interesting book I’ve read.',
          options: ['the most', 'most', 'the more', 'more'],
          answer: 'a',
          explanation: 'Interesting adalah kata sifat panjang. Superlative-nya the most interesting.'
        },
        {
          id: 'cmp-5',
          type: 'mcq',
          prompt: 'My results are ___ than yours.',
          options: ['good', 'better', 'best', 'well'],
          answer: 'b',
          explanation: 'Bentuk comparative tidak beraturan dari good adalah better.'
        },
        {
          id: 'cmp-6',
          type: 'mcq',
          prompt: 'She is as tall ___ her brother.',
          options: ['than', 'as', 'like', 'with'],
          answer: 'b',
          explanation: 'Pola perbandingan setara adalah as + adjective + as.'
        },
        {
          id: 'cmp-7',
          type: 'mcq',
          prompt: 'This exercise is ___ than the last one.',
          options: ['more difficult', 'difficultest', 'most difficult', 'difficulter'],
          answer: 'a',
          explanation: 'Difficult adalah kata sifat panjang, jadi memakai more difficult.'
        },
        {
          id: 'cmp-8',
          type: 'type',
          prompt: 'The blue jacket is ___ (cheap) than the black one.',
          placeholder: 'Tulis bentuk comparative',
          answers: ['cheaper'],
          explanation: 'Cheap → cheaper. Jangan menambahkan more di depan cheaper.'
        }
      ]
    },

    /* =====================================================
       GRAMMAR 4 — PRESENT PERFECT
       ===================================================== */
    {
      id: 'present-perfect',
      track: 'grammar',
      order: 7,
      title: 'Present Perfect',
      subtitle: 'Pengalaman dan hasil yang masih terasa',
      level: 'B1',
      minutes: 10,
      icon: 'clock',
      accent: 'violet',
      description: 'Hubungkan masa lalu dengan saat ini memakai have/has + past participle.',
      objectives: [
        'Membentuk kalimat dengan have/has + V‑past participle',
        'Membedakan Present Perfect dan Past Simple',
        'Memakai for, since, ever, never, already, dan yet'
      ],
      sections: [
        {
          title: 'Ide utamanya',
          icon: 'compass',
          body: [
            'Present Perfect menghubungkan masa lalu dengan sekarang. Fokusnya bukan kapan kejadiannya, tetapi pengalaman atau hasil yang masih relevan saat ini.'
          ],
          bullets: [
            'Pengalaman: “I have visited Japan twice.”',
            'Hasil sekarang: “She has lost her keys.” (sekarang masih hilang)',
            'Periode yang belum selesai: “I have studied a lot this week.”',
            'Baru saja terjadi: “They have just arrived.”'
          ]
        },
        {
          title: 'Rumus inti',
          icon: 'braces',
          formula: [
            { label: 'Positif', value: 'S + have/has + V‑past participle' },
            { label: 'Negatif', value: 'S + have/has + not + V‑past participle' },
            { label: 'Pertanyaan', value: 'Have/Has + S + V‑past participle?' }
          ],
          tip: 'V‑past participle untuk kata kerja beraturan sama dengan V‑past (worked → worked). Yang tidak beraturan harus dihafal: go → went → gone, see → saw → seen.',
          table: {
            headers: ['Subjek', 'Contoh'],
            rows: [
              ['I / You / We / They', 'have finished'],
              ['He / She / It', 'has finished'],
              ['He / She / It (negatif)', 'has not finished'],
              ['He / She / It (tanya)', 'Has he finished?']
            ]
          }
        },
        {
          title: 'For, since, ever, yet',
          icon: 'calendar',
          bullets: [
            'for + durasi: for three years, for two hours.',
            'since + titik awal: since 2019, since Monday.',
            'ever / never untuk pengalaman: “Have you ever tried sushi?”',
            'already untuk hal yang lebih cepat dari perkiraan: “I’ve already eaten.”',
            'yet untuk negatif dan pertanyaan: “I haven’t finished yet.”'
          ],
          examples: [
            { en: 'She has lived here since 2019.', id: 'Dia tinggal di sini sejak 2019.' },
            { en: 'We have known each other for five years.', id: 'Kami saling kenal selama lima tahun.' }
          ]
        },
        {
          title: 'Present Perfect vs Past Simple',
          icon: 'shield',
          body: [
            'Jika waktu kejadiannya spesifik dan sudah selesai, gunakan Past Simple. Jika waktunya tidak penting atau periode waktunya belum selesai, gunakan Present Perfect.'
          ],
          table: {
            headers: ['Present Perfect', 'Past Simple'],
            rows: [
              ['I have seen that film.', 'I saw that film yesterday.'],
              ['She has broken her leg.', 'She broke her leg last week.'],
              ['We have been busy today.', 'We were busy yesterday.']
            ]
          },
          tip: 'Jangan memakai Present Perfect bersama penanda waktu lampau yang spesifik seperti yesterday, last week, atau in 2020.'
        }
      ],
      quiz: [
        {
          id: 'pp-1',
          type: 'mcq',
          prompt: 'I ___ never eaten sushi.',
          options: ['have', 'has', 'had', 'am'],
          answer: 'a',
          explanation: 'Subjek I memakai have. Pengalaman dengan never memakai Present Perfect.'
        },
        {
          id: 'pp-2',
          type: 'mcq',
          prompt: 'She ___ lived here since 2019.',
          options: ['has', 'have', 'is', 'did'],
          answer: 'a',
          explanation: 'She adalah orang ketiga tunggal, jadi memakai has + lived (V‑past participle).'
        },
        {
          id: 'pp-3',
          type: 'mcq',
          prompt: 'They ___ their homework yet.',
          options: ['didn’t finish', 'haven’t finished', 'not finished', 'don’t finish'],
          answer: 'b',
          explanation: 'Yet pada kalimat negatif biasanya berpasangan dengan Present Perfect: haven’t finished.'
        },
        {
          id: 'pp-4',
          type: 'mcq',
          prompt: 'We ___ to Bali three times.',
          options: ['have been', 'have gone', 'went', 'were'],
          answer: 'a',
          explanation: 'Have been ke suatu tempat menunjukkan pengalaman berkunjung. Tidak ada waktu spesifik, jadi Present Perfect.'
        },
        {
          id: 'pp-5',
          type: 'mcq',
          prompt: 'He ___ his leg yesterday.',
          options: ['has broken', 'broke', 'breaks', 'had broken'],
          answer: 'b',
          explanation: 'Yesterday adalah waktu lampau yang spesifik, sehingga memakai Past Simple: broke.'
        },
        {
          id: 'pp-6',
          type: 'type',
          prompt: 'I have known her ___ 2018.',
          placeholder: 'Tulis satu kata',
          answers: ['since'],
          explanation: '2018 adalah titik awal, bukan durasi. Gunakan since.'
        },
        {
          id: 'pp-7',
          type: 'mcq',
          prompt: 'Have you ___ visited Japan?',
          options: ['ever', 'yet', 'never', 'since'],
          answer: 'a',
          explanation: 'Ever dipakai dalam pertanyaan tentang pengalaman: “Have you ever visited Japan?”'
        },
        {
          id: 'pp-8',
          type: 'type',
          prompt: 'They have ___ (finish) the project.',
          placeholder: 'Tulis bentuk V‑past participle',
          answers: ['finished'],
          explanation: 'Present Perfect memakai past participle. Finish → finished.'
        }
      ]
    },

    /* =====================================================
       GRAMMAR 5 — MODALS
       ===================================================== */
    {
      id: 'modals',
      track: 'grammar',
      order: 8,
      title: 'Modals for Advice',
      subtitle: 'Saran, kewajiban, dan larangan',
      level: 'B1',
      minutes: 9,
      icon: 'compass',
      accent: 'violet',
      description: 'Pilih modal yang tepat untuk memberi saran, menyatakan kewajiban, atau menunjukkan kemungkinan.',
      objectives: [
        'Membedakan should, ought to, dan had better',
        'Membedakan must, have to, mustn’t, dan don’t have to',
        'Memakai modal diikuti kata kerja dasar'
      ],
      sections: [
        {
          title: 'Peta makna',
          icon: 'map',
          table: {
            headers: ['Modal', 'Fungsi', 'Contoh'],
            rows: [
              ['should', 'saran', 'You should rest.'],
              ['ought to', 'saran yang lebih formal', 'You ought to apologize.'],
              ['had better', 'saran kuat + konsekuensi', 'You’d better hurry.'],
              ['must', 'kewajiban kuat / aturan', 'You must wear a seatbelt.'],
              ['have to', 'kewajiban dari luar', 'I have to work on Saturday.'],
              ['mustn’t', 'larangan', 'You mustn’t smoke here.'],
              ['don’t have to', 'tidak wajib', 'You don’t have to come.']
            ]
          }
        },
        {
          title: 'Rumus',
          icon: 'braces',
          formula: [
            { label: 'Semua modal', value: 'S + modal + V‑base (tanpa to, kecuali ought to)' },
            { label: 'Negatif', value: 'S + modal + not + V‑base' },
            { label: 'Pertanyaan', value: 'Modal + S + V‑base?' }
          ],
          examples: [
            { en: 'You should take a break.', id: 'Kamu sebaiknya istirahat.' },
            { en: 'She ought to apologize.', id: 'Dia seharusnya meminta maaf.' },
            { en: 'We don’t have to hurry.', id: 'Kami tidak perlu terburu-buru.' }
          ],
          tip: 'Setelah modal, kata kerja tidak mendapat -s, -ed, atau to. “She should goes” dan “He can to swim” salah.'
        },
        {
          title: 'Mustn’t vs don’t have to',
          icon: 'shield',
          body: [
            'Dua bentuk ini terlihat mirip, tetapi maknanya sangat berbeda. Mustn’t berarti dilarang. Don’t have to berarti tidak wajib atau boleh tidak dilakukan.'
          ],
          examples: [
            { en: 'You mustn’t park here.', id: 'Dilarang parkir di sini.' },
            { en: 'You don’t have to park here.', id: 'Kamu tidak wajib parkir di sini; bisa parkir di tempat lain.' }
          ],
          tip: 'Untuk menunjukkan kemungkinan, gunakan may, might, atau could. Untuk deduksi kuat, gunakan must. “She must be at home” berarti kemungkinan besar benar.'
        }
      ],
      quiz: [
        {
          id: 'mod-1',
          type: 'mcq',
          prompt: 'You look tired. You ___ take a break.',
          options: ['should', 'shouldn’t', 'mustn’t', 'has to'],
          answer: 'a',
          explanation: 'Should dipakai untuk memberi saran: kamu sebaiknya istirahat.'
        },
        {
          id: 'mod-2',
          type: 'mcq',
          prompt: 'Passengers ___ smoke on board.',
          options: ['mustn’t', 'don’t have to', 'should', 'have to'],
          answer: 'a',
          explanation: 'Merokok di pesawat adalah larangan, jadi memakai mustn’t.'
        },
        {
          id: 'mod-3',
          type: 'mcq',
          prompt: 'It’s optional. You ___ wear a tie.',
          options: ['mustn’t', 'don’t have to', 'shouldn’t', 'can’t'],
          answer: 'b',
          explanation: 'Optional berarti tidak wajib. Gunakan don’t have to, bukan mustn’t.'
        },
        {
          id: 'mod-4',
          type: 'mcq',
          prompt: 'You ___ start now, or you’ll miss the train.',
          options: ['had better', 'shouldn’t', 'would rather', 'ought'],
          answer: 'a',
          explanation: 'Had better memberi saran kuat dengan konsekuensi: kalau tidak, kereta akan tertinggal.'
        },
        {
          id: 'mod-5',
          type: 'mcq',
          prompt: 'She ___ be at home; her light is on.',
          options: ['must', 'can’t', 'shouldn’t', 'mustn’t'],
          answer: 'a',
          explanation: 'Must bisa menunjukkan deduksi kuat: kemungkinan besar dia di rumah.'
        },
        {
          id: 'mod-6',
          type: 'mcq',
          prompt: 'You ___ to apologize.',
          options: ['should', 'ought', 'must', 'have'],
          answer: 'b',
          explanation: 'Ought berpasangan dengan to: ought to apologize.'
        },
        {
          id: 'mod-7',
          type: 'mcq',
          prompt: 'We ___ hurry — we have plenty of time.',
          options: ['mustn’t', 'shouldn’t', 'don’t have to', 'can’t'],
          answer: 'c',
          explanation: 'Karena masih banyak waktu, kita tidak wajib terburu-buru: don’t have to hurry.'
        },
        {
          id: 'mod-8',
          type: 'type',
          prompt: 'You ___ (should/not) eat so much sugar.',
          placeholder: 'Tulis bentuk negatif',
          answers: ['shouldn’t', 'should not', "shouldn't"],
          explanation: 'Negatif dari should adalah shouldn’t + kata kerja dasar: shouldn’t eat.'
        }
      ]
    },

    /* =====================================================
       GRAMMAR 6 — CONDITIONALS
       ===================================================== */
    {
      id: 'conditionals',
      track: 'grammar',
      order: 9,
      title: 'Conditionals',
      subtitle: 'Jika … maka …',
      level: 'B1',
      minutes: 10,
      icon: 'route',
      accent: 'violet',
      description: 'Bangun kalimat bersyarat dari fakta umum sampai kemungkinan yang tidak nyata.',
      objectives: [
        'Membedakan zero, first, dan second conditional',
        'Menggunakan unless dengan tepat',
        'Menghindari will di dalam if-clause'
      ],
      sections: [
        {
          title: 'Tiga pola utama',
          icon: 'route',
          table: {
            headers: ['Tipe', 'If-clause', 'Main clause', 'Makna'],
            rows: [
              ['Zero', 'if + present', 'present', 'fakta umum'],
              ['First', 'if + present', 'will + V‑base', 'kemungkinan nyata di masa depan'],
              ['Second', 'if + past', 'would + V‑base', 'situasi imajiner saat ini']
            ]
          }
        },
        {
          title: 'Contoh tiap tipe',
          icon: 'sparkles',
          examples: [
            { en: 'If you heat ice, it melts.', id: 'Zero: fakta umum.' },
            { en: 'If it rains tomorrow, we will stay at home.', id: 'First: kemungkinan nyata di masa depan.' },
            { en: 'If I were you, I would apologize.', id: 'Second: saran imajiner.' },
            { en: 'If she studied harder, she would pass.', id: 'Second: situasi yang tidak nyata saat ini.' }
          ],
          tip: 'Pada second conditional, were dipakai untuk semua subjek: “If I were…”, “If he were…”. Dalam percakapan informal was juga muncul, tetapi were lebih tepat.'
        },
        {
          title: 'Unless dan jebakan will',
          icon: 'shield',
          body: [
            'Unless berarti “if not”. Jangan memakai will di dalam if-clause. Will hanya muncul di main clause.'
          ],
          examples: [
            { en: 'I won’t go unless you come with me.', id: 'Saya tidak akan pergi kecuali kamu ikut.' },
            { en: 'If you don’t hurry, you will be late.', id: 'Benar: if + present, will + V‑base.' },
            { en: 'If you will hurry, you will be late.', id: 'Salah: will tidak dipakai di if-clause.' }
          ]
        }
      ],
      quiz: [
        {
          id: 'cond-1',
          type: 'mcq',
          prompt: 'If it rains tomorrow, we ___ at home.',
          options: ['stay', 'will stay', 'stayed', 'would stay'],
          answer: 'b',
          explanation: 'First conditional: if + present, will + V‑base. Jadi: will stay.'
        },
        {
          id: 'cond-2',
          type: 'mcq',
          prompt: 'If I ___ you, I would apologize.',
          options: ['am', 'was', 'were', 'be'],
          answer: 'c',
          explanation: 'Second conditional memakai were untuk semua subjek: If I were you.'
        },
        {
          id: 'cond-3',
          type: 'mcq',
          prompt: 'If you heat ice, it ___.',
          options: ['melts', 'will melt', 'melted', 'would melt'],
          answer: 'a',
          explanation: 'Zero conditional untuk fakta umum: if + present, present. Ice melts.'
        },
        {
          id: 'cond-4',
          type: 'mcq',
          prompt: 'If she ___ harder, she would pass.',
          options: ['studies', 'studied', 'will study', 'study'],
          answer: 'b',
          explanation: 'Second conditional: if + past simple, would + V‑base. Jadi: studied.'
        },
        {
          id: 'cond-5',
          type: 'mcq',
          prompt: 'I won’t go ___ you come with me.',
          options: ['if', 'unless', 'when', 'whether'],
          answer: 'b',
          explanation: 'Unless berarti if not: saya tidak akan pergi kecuali kamu ikut.'
        },
        {
          id: 'cond-6',
          type: 'mcq',
          prompt: 'If they left earlier, they ___ the train.',
          options: ['catch', 'will catch', 'would catch', 'caught'],
          answer: 'c',
          explanation: 'Second conditional: if + past, would + V‑base. Jadi: would catch.'
        },
        {
          id: 'cond-7',
          type: 'mcq',
          prompt: 'If you don’t hurry, you ___ late.',
          options: ['are', 'will be', 'would be', 'were'],
          answer: 'b',
          explanation: 'First conditional: if + present, will + V‑base. Jadi: will be.'
        },
        {
          id: 'cond-8',
          type: 'type',
          prompt: 'If I ___ (have) more time, I would travel.',
          placeholder: 'Tulis bentuk past simple',
          answers: ['had'],
          explanation: 'Second conditional memakai past simple di if-clause: If I had more time.'
        }
      ]
    },

    /* =====================================================
       VOCABULARY 1 — DAILY ROUTINES
       ===================================================== */
    {
      id: 'daily-routines',
      track: 'vocabulary',
      order: 1,
      title: 'Daily Routines',
      subtitle: 'Dari bangun sampai tidur lagi',
      level: 'A1',
      minutes: 7,
      icon: 'coffee',
      accent: 'teal',
      description: 'Frasa praktis untuk menceritakan rutinitas harianmu.',
      objectives: [
        'Menceritakan rutinitas pagi dan malam',
        'Memakai collocation yang natural seperti get dressed',
        'Membedakan wake up, get up, dan go to bed'
      ],
      sections: [
        {
          title: 'Rutinitas dalam satu hari',
          icon: 'sunrise',
          body: [
            'Rutinitas harian paling mudah diceritakan dalam urutan waktu. Gunakan Present Simple dan adverb seperti usually, often, dan always.'
          ],
          examples: [
            { en: 'I wake up at six, get dressed, and have breakfast.', id: 'Saya bangun jam enam, berpakaian, lalu sarapan.' },
            { en: 'She usually takes a nap after lunch.', id: 'Dia biasanya tidur siang sebentar setelah makan siang.' },
            { en: 'We do the chores together on Saturday.', id: 'Kami mengerjakan pekerjaan rumah bersama pada hari Sabtu.' }
          ]
        },
        {
          title: 'Collocation yang perlu dihafal',
          icon: 'sparkles',
          bullets: [
            'wake up = bangun dari tidur',
            'get dressed = mengenakan pakaian',
            'brush your teeth = menyikat gigi',
            'have breakfast = sarapan',
            'take a nap = tidur siang sebentar',
            'do the chores = mengerjakan pekerjaan rumah',
            'go to bed = pergi tidur'
          ],
          tip: 'Gunakan get dressed, bukan wear dressed. Gunakan go to bed untuk pergi tidur, dan sleep untuk tidur sebagai aktivitas.'
        }
      ],
      vocab: [
        { word: 'wake up', phonetic: '/weɪk ʌp/', pos: 'phrasal verb', meaning: 'bangun tidur', example: 'I wake up at six every day.', exampleId: 'Saya bangun jam enam setiap hari.', collocation: 'wake up early' },
        { word: 'get dressed', phonetic: '/ɡet drest/', pos: 'phrase', meaning: 'mengenakan pakaian', example: 'He gets dressed before breakfast.', exampleId: 'Dia berpakaian sebelum sarapan.', collocation: 'get dressed quickly' },
        { word: 'brush your teeth', phonetic: '/brʌʃ jɔːr tiːθ/', pos: 'phrase', meaning: 'menyikat gigi', example: 'Brush your teeth twice a day.', exampleId: 'Sikat gigi dua kali sehari.', collocation: 'brush your teeth thoroughly' },
        { word: 'have breakfast', phonetic: '/hæv ˈbrekfəst/', pos: 'phrase', meaning: 'sarapan', example: 'We have breakfast at seven.', exampleId: 'Kami sarapan jam tujuh.', collocation: 'have a quick breakfast' },
        { word: 'take a nap', phonetic: '/teɪk ə næp/', pos: 'phrase', meaning: 'tidur siang sebentar', example: 'I take a nap after lunch.', exampleId: 'Saya tidur siang sebentar setelah makan siang.', collocation: 'take a short nap' },
        { word: 'do the chores', phonetic: '/duː ðə tʃɔːrz/', pos: 'phrase', meaning: 'mengerjakan pekerjaan rumah', example: 'We do the chores on Saturdays.', exampleId: 'Kami mengerjakan pekerjaan rumah pada hari Sabtu.', collocation: 'share the chores' },
        { word: 'go to bed', phonetic: '/ɡoʊ tə bed/', pos: 'phrase', meaning: 'pergi tidur', example: 'She goes to bed at ten.', exampleId: 'Dia pergi tidur jam sepuluh.', collocation: 'go to bed early' },
        { word: 'commute', phonetic: '/kəˈmjuːt/', pos: 'verb', meaning: 'bepergian rutin ke tempat kerja', example: 'I commute by train every morning.', exampleId: 'Saya bepergian dengan kereta setiap pagi.', collocation: 'a long commute' }
      ],
      quiz: [
        {
          id: 'dr-1',
          type: 'mcq',
          prompt: 'Apa arti “wake up”?',
          options: ['Tidur', 'Bangun tidur', 'Mandi', 'Sarapan'],
          answer: 'b',
          explanation: 'Wake up berarti bangun dari tidur.'
        },
        {
          id: 'dr-2',
          type: 'type',
          prompt: 'I usually ___ up at 6 a.m.',
          placeholder: 'Tulis satu kata',
          answers: ['wake', 'get'],
          explanation: 'Wake up = bangun dari tidur; get up = bangkit dari tempat tidur. Keduanya tepat, dan subjek I memakai bentuk dasar.'
        },
        {
          id: 'dr-3',
          type: 'mcq',
          prompt: 'After I get ___, I check my phone.',
          options: ['dressed', 'dress', 'dressing', 'dresses'],
          answer: 'a',
          explanation: 'Collocation yang benar adalah get dressed.'
        },
        {
          id: 'dr-4',
          type: 'mcq',
          prompt: 'She ___ her teeth twice a day.',
          options: ['brush', 'brushes', 'brushing', 'brushed'],
          answer: 'b',
          explanation: 'Subjek she memakai brushes pada Present Simple.'
        },
        {
          id: 'dr-5',
          type: 'mcq',
          prompt: 'We have ___ at 7 before school.',
          options: ['breakfast', 'lunch', 'dinner', 'snack'],
          answer: 'a',
          explanation: 'Makan pagi sebelum sekolah adalah breakfast.'
        },
        {
          id: 'dr-6',
          type: 'mcq',
          prompt: 'I feel sleepy. I’ll take a short ___.',
          options: ['nap', 'chore', 'trip', 'meal'],
          answer: 'a',
          explanation: 'Take a nap berarti tidur siang sebentar.'
        },
        {
          id: 'dr-7',
          type: 'mcq',
          prompt: 'I need to do the household ___ before guests arrive.',
          options: ['chores', 'habits', 'hobbies', 'shifts'],
          answer: 'a',
          explanation: 'Do the chores berarti mengerjakan pekerjaan rumah.'
        },
        {
          id: 'dr-8',
          type: 'mcq',
          prompt: 'He goes to ___ at 10 p.m.',
          options: ['bed', 'nap', 'dream', 'chores'],
          answer: 'a',
          explanation: 'Frasa yang benar adalah go to bed.'
        }
      ]
    },

    /* =====================================================
       VOCABULARY 2 — FOOD & DRINK
       ===================================================== */
    {
      id: 'food-drink',
      track: 'vocabulary',
      order: 2,
      title: 'Food & Drink',
      subtitle: 'Pesan makanan, jelaskan rasa',
      level: 'A1',
      minutes: 7,
      icon: 'utensils',
      accent: 'teal',
      description: 'Kosakata untuk makanan, minuman, rasa, dan cara memasak.',
      objectives: [
        'Menyebut bagian-bagian hidangan dalam bahasa Inggris',
        'Mendeskripsikan rasa dan cara memasak',
        'Memesan minuman dan makanan dengan percaya diri'
      ],
      sections: [
        {
          title: 'Urutan hidangan',
          icon: 'utensils',
          examples: [
            { en: 'We started with a soup appetizer.', id: 'Kami memulai dengan sup sebagai hidangan pembuka.' },
            { en: 'Grilled chicken is the main course.', id: 'Ayam panggang adalah hidangan utamanya.' },
            { en: 'Would you like something for dessert?', id: 'Apakah kamu ingin sesuatu untuk hidangan penutup?' }
          ],
          tip: 'Appetizer = pembuka, main course = utama, dessert = penutup. Beverage adalah minuman.'
        },
        {
          title: 'Rasa dan cara masak',
          icon: 'flame',
          bullets: [
            'spicy = pedas',
            'sour = asam',
            'sweet = manis',
            'salty = asin',
            'grilled = dipanggang',
            'fried = digoreng',
            'steamed = dikukus'
          ],
          examples: [
            { en: 'This chili sauce is too spicy for me.', id: 'Saus cabai ini terlalu pedas untukku.' },
            { en: 'The lemon tastes sour.', id: 'Lemon itu terasa asam.' }
          ]
        },
        {
          title: 'Sisa makanan & bahan',
          icon: 'leaf',
          body: [
            'Leftovers adalah makanan yang tersisa dan masih bisa dimakan. Ingredients adalah bahan-bahan yang dipakai untuk memasak.'
          ],
          examples: [
            { en: 'We can heat up the leftovers for lunch.', id: 'Kita bisa memanaskan sisa makanan untuk makan siang.' },
            { en: 'Check the ingredients before you cook.', id: 'Periksa bahannya sebelum memasak.' }
          ]
        }
      ],
      vocab: [
        { word: 'appetizer', phonetic: '/ˈæpɪtaɪzər/', pos: 'noun', meaning: 'hidangan pembuka', example: 'We ordered a small appetizer.', exampleId: 'Kami memesan hidangan pembuka kecil.', collocation: 'a light appetizer' },
        { word: 'main course', phonetic: '/meɪn kɔːrs/', pos: 'noun', meaning: 'hidangan utama', example: 'The main course was grilled fish.', exampleId: 'Hidangan utamanya adalah ikan panggang.', collocation: 'the main course' },
        { word: 'dessert', phonetic: '/dɪˈzɜːrt/', pos: 'noun', meaning: 'hidangan penutup', example: 'We had ice cream for dessert.', exampleId: 'Kami makan es krim untuk hidangan penutup.', collocation: 'a sweet dessert' },
        { word: 'beverage', phonetic: '/ˈbevərɪdʒ/', pos: 'noun', meaning: 'minuman', example: 'What beverage would you like?', exampleId: 'Minuman apa yang kamu inginkan?', collocation: 'a cold beverage' },
        { word: 'spicy', phonetic: '/ˈspaɪsi/', pos: 'adjective', meaning: 'pedas', example: 'The curry is very spicy.', exampleId: 'Kari itu sangat pedas.', collocation: 'spicy food' },
        { word: 'sour', phonetic: '/ˈsaʊər/', pos: 'adjective', meaning: 'asam', example: 'The lemon tastes sour.', exampleId: 'Lemon itu terasa asam.', collocation: 'sour taste' },
        { word: 'grilled', phonetic: '/ɡrɪld/', pos: 'adjective', meaning: 'dipanggang', example: 'We had grilled chicken.', exampleId: 'Kami makan ayam panggang.', collocation: 'grilled fish' },
        { word: 'leftovers', phonetic: '/ˈleftoʊvərz/', pos: 'noun', meaning: 'sisa makanan', example: 'We ate the leftovers for lunch.', exampleId: 'Kami makan sisa makanan itu untuk makan siang.', collocation: 'heat up leftovers' }
      ],
      quiz: [
        {
          id: 'fd-1',
          type: 'mcq',
          prompt: 'Apa arti “appetizer”?',
          options: ['Hidangan penutup', 'Hidangan pembuka', 'Minuman', 'Sisa makanan'],
          answer: 'b',
          explanation: 'Appetizer adalah hidangan pembuka sebelum makanan utama.'
        },
        {
          id: 'fd-2',
          type: 'mcq',
          prompt: 'We ordered grilled chicken as the ___ course.',
          options: ['main', 'sweet', 'starter', 'desert'],
          answer: 'a',
          explanation: 'Main course adalah hidangan utama.'
        },
        {
          id: 'fd-3',
          type: 'mcq',
          prompt: 'I’d like something sweet for ___.',
          options: ['dessert', 'desert', 'beverage', 'appetizer'],
          answer: 'a',
          explanation: 'Dessert adalah hidangan penutup. Desert berarti gurun.'
        },
        {
          id: 'fd-4',
          type: 'mcq',
          prompt: 'This chili is too ___ for me.',
          options: ['sour', 'spicy', 'sweet', 'salty'],
          answer: 'b',
          explanation: 'Cabai identik dengan rasa pedas: spicy.'
        },
        {
          id: 'fd-5',
          type: 'mcq',
          prompt: 'Lemons taste ___.',
          options: ['sour', 'spicy', 'grilled', 'fresh'],
          answer: 'a',
          explanation: 'Lemon memiliki rasa asam: sour.'
        },
        {
          id: 'fd-6',
          type: 'type',
          prompt: 'The fish was ___ over an open fire.',
          placeholder: 'Tulis satu kata',
          answers: ['grilled', 'roasted', 'barbecued'],
          explanation: 'Dipanggang di atas api terbuka berarti grilled (roasted/barbecued juga diterima).'
        },
        {
          id: 'fd-7',
          type: 'mcq',
          prompt: 'We can heat up the ___ for lunch.',
          options: ['leftovers', 'ingredients', 'courses', 'beverages'],
          answer: 'a',
          explanation: 'Leftovers adalah sisa makanan yang bisa dipanaskan kembali.'
        },
        {
          id: 'fd-8',
          type: 'mcq',
          prompt: 'What ___ would you like—tea or juice?',
          options: ['beverage', 'dessert', 'dish', 'flavor'],
          answer: 'a',
          explanation: 'Tea dan juice adalah minuman: beverages.'
        }
      ]
    },

    /* =====================================================
       VOCABULARY 3 — TRAVEL
       ===================================================== */
    {
      id: 'travel',
      track: 'vocabulary',
      order: 4,
      title: 'Travel & Transport',
      subtitle: 'Dari tiket sampai tiba',
      level: 'A2',
      minutes: 8,
      icon: 'plane',
      accent: 'teal',
      description: 'Kosakata penting untuk merencanakan perjalanan dan bergerak di bandara.',
      objectives: [
        'Memahami istilah tiket, bagasi, dan jadwal',
        'Membaca itinerary dan informasi keberangkatan',
        'Memesan akomodasi dengan kalimat sederhana'
      ],
      sections: [
        {
          title: 'Sebelum berangkat',
          icon: 'plane',
          examples: [
            { en: 'Our destination is Yogyakarta.', id: 'Tujuan akhir kami adalah Yogyakarta.' },
            { en: 'I’d like to book a hotel room.', id: 'Saya ingin memesan kamar hotel.' },
            { en: 'The itinerary includes three cities.', id: 'Rencana perjalanannya mencakup tiga kota.' }
          ],
          tip: 'Book sebagai verb berarti memesan. Booking sebagai noun berarti pemesanan.'
        },
        {
          title: 'Di bandara',
          icon: 'ticket',
          bullets: [
            'boarding pass = kartu naik pesawat',
            'gate = pintu keberangkatan',
            'departure = keberangkatan',
            'delay = keterlambatan',
            'luggage = bagasi',
            'accommodation = tempat menginap'
          ],
          examples: [
            { en: 'Check the screen for your gate number.', id: 'Periksa layar untuk nomor pintu keberangkatanmu.' },
            { en: 'There was a two-hour delay.', id: 'Ada keterlambatan dua jam.' }
          ]
        }
      ],
      vocab: [
        { word: 'destination', phonetic: '/ˌdestɪˈneɪʃn/', pos: 'noun', meaning: 'tujuan perjalanan', example: 'Our final destination is Bali.', exampleId: 'Tujuan akhir kami adalah Bali.', collocation: 'a popular destination' },
        { word: 'itinerary', phonetic: '/aɪˈtɪnəreri/', pos: 'noun', meaning: 'rencana perjalanan', example: 'The itinerary includes two museums.', exampleId: 'Rencana perjalanannya mencakup dua museum.', collocation: 'a detailed itinerary' },
        { word: 'boarding pass', phonetic: '/ˈbɔːrdɪŋ pæs/', pos: 'noun', meaning: 'kartu naik pesawat', example: 'Show your boarding pass at the gate.', exampleId: 'Tunjukkan kartu naik pesawat di pintu keberangkatan.', collocation: 'a mobile boarding pass' },
        { word: 'luggage', phonetic: '/ˈlʌɡɪdʒ/', pos: 'noun', meaning: 'bagasi', example: 'My luggage is very heavy.', exampleId: 'Bagasiku sangat berat.', collocation: 'carry-on luggage' },
        { word: 'departure', phonetic: '/dɪˈpɑːrtʃər/', pos: 'noun', meaning: 'keberangkatan', example: 'The departure time is 8:30.', exampleId: 'Waktu keberangkatannya jam 8.30.', collocation: 'departure gate' },
        { word: 'delay', phonetic: '/dɪˈleɪ/', pos: 'noun', meaning: 'keterlambatan', example: 'The flight had a long delay.', exampleId: 'Penerbangan itu mengalami keterlambatan lama.', collocation: 'a flight delay' },
        { word: 'gate', phonetic: '/ɡeɪt/', pos: 'noun', meaning: 'pintu keberangkatan', example: 'Go to gate 12 for boarding.', exampleId: 'Pergi ke pintu 12 untuk naik pesawat.', collocation: 'boarding gate' },
        { word: 'accommodation', phonetic: '/əˌkɑːməˈdeɪʃn/', pos: 'noun', meaning: 'tempat menginap', example: 'We found affordable accommodation.', exampleId: 'Kami menemukan tempat menginap yang terjangkau.', collocation: 'book accommodation' }
      ],
      quiz: [
        {
          id: 'tr-1',
          type: 'mcq',
          prompt: 'Our final ___ is Yogyakarta.',
          options: ['destination', 'departure', 'delay', 'luggage'],
          answer: 'a',
          explanation: 'Destination adalah tujuan perjalanan.'
        },
        {
          id: 'tr-2',
          type: 'mcq',
          prompt: 'The flight was cancelled because of a long ___.',
          options: ['delay', 'gate', 'itinerary', 'boarding pass'],
          answer: 'a',
          explanation: 'Long delay berarti keterlambatan yang lama.'
        },
        {
          id: 'tr-3',
          type: 'mcq',
          prompt: 'You need your passport and ___ before boarding.',
          options: ['boarding pass', 'luggage', 'destination', 'accommodation'],
          answer: 'a',
          explanation: 'Boarding pass adalah dokumen yang diperlukan untuk naik pesawat.'
        },
        {
          id: 'tr-4',
          type: 'mcq',
          prompt: 'We packed our ___ in one suitcase.',
          options: ['luggage', 'gate', 'delay', 'itinerary'],
          answer: 'a',
          explanation: 'Luggage adalah bagasi atau barang bawaan.'
        },
        {
          id: 'tr-5',
          type: 'mcq',
          prompt: 'Go to ___ 12 for your flight.',
          options: ['gate', 'pass', 'delay', 'destination'],
          answer: 'a',
          explanation: 'Gate adalah pintu keberangkatan di bandara.'
        },
        {
          id: 'tr-6',
          type: 'type',
          prompt: 'I’d like to ___ a hotel room for two nights.',
          placeholder: 'Tulis satu kata',
          answers: ['book', 'reserve'],
          explanation: 'Book a room berarti memesan kamar (reserve juga diterima).'
        },
        {
          id: 'tr-7',
          type: 'mcq',
          prompt: 'Our ___ includes three cities in five days.',
          options: ['itinerary', 'luggage', 'delay', 'gate'],
          answer: 'a',
          explanation: 'Itinerary adalah rencana perjalanan.'
        },
        {
          id: 'tr-8',
          type: 'mcq',
          prompt: 'The ___ time is 08:30; please arrive early.',
          options: ['departure', 'destination', 'boarding', 'delay'],
          answer: 'a',
          explanation: 'Departure time adalah waktu keberangkatan.'
        }
      ]
    },

    /* =====================================================
       VOCABULARY 4 — WORK & OFFICE
       ===================================================== */
    {
      id: 'work',
      track: 'vocabulary',
      order: 7,
      title: 'Work & Office',
      subtitle: 'Rapat, tenggat, dan karier',
      level: 'B1',
      minutes: 8,
      icon: 'briefcase',
      accent: 'teal',
      description: 'Kosakata profesional untuk berkomunikasi di tempat kerja.',
      objectives: [
        'Membicarakan tenggat dan beban kerja',
        'Memahami istilah rapat dan umpan balik',
        'Menggunakan kata kerja seperti delegate dan work remotely'
      ],
      sections: [
        {
          title: 'Ritme kerja',
          icon: 'briefcase',
          examples: [
            { en: 'The deadline for this report is Friday.', id: 'Tenggat laporan ini hari Jumat.' },
            { en: 'I have a heavy workload this week.', id: 'Beban kerjaku berat minggu ini.' },
            { en: 'Let’s schedule a meeting to discuss the plan.', id: 'Mari jadwalkan rapat untuk membahas rencana.' }
          ]
        },
        {
          title: 'Orang & komunikasi',
          icon: 'message-circle',
          bullets: [
            'colleague = rekan kerja',
            'feedback = umpan balik',
            'promotion = kenaikan jabatan',
            'delegate = mendelegasikan',
            'remote = jarak jauh',
            'workload = beban kerja',
            'deadline = tenggat waktu'
          ],
          tip: 'Remote adalah adjective: a remote job. Remotely adalah adverb: I work remotely.'
        }
      ],
      vocab: [
        { word: 'deadline', phonetic: '/ˈdedlaɪn/', pos: 'noun', meaning: 'tenggat waktu', example: 'The deadline is Friday.', exampleId: 'Tenggatnya hari Jumat.', collocation: 'meet a deadline' },
        { word: 'colleague', phonetic: '/ˈkɑːliːɡ/', pos: 'noun', meaning: 'rekan kerja', example: 'My colleague helped me.', exampleId: 'Rekan kerjaku membantuku.', collocation: 'a close colleague' },
        { word: 'meeting', phonetic: '/ˈmiːtɪŋ/', pos: 'noun', meaning: 'rapat', example: 'We have a meeting at ten.', exampleId: 'Kami ada rapat jam sepuluh.', collocation: 'schedule a meeting' },
        { word: 'workload', phonetic: '/ˈwɜːrkloʊd/', pos: 'noun', meaning: 'beban kerja', example: 'Her workload is heavy.', exampleId: 'Beban kerjanya berat.', collocation: 'a heavy workload' },
        { word: 'delegate', phonetic: '/ˈdelɪɡeɪt/', pos: 'verb', meaning: 'mendelegasikan', example: 'Delegate the task to the team.', exampleId: 'Delegasikan tugas itu ke tim.', collocation: 'delegate tasks' },
        { word: 'remote', phonetic: '/rɪˈmoʊt/', pos: 'adjective', meaning: 'jarak jauh', example: 'She has a remote job.', exampleId: 'Dia punya pekerjaan jarak jauh.', collocation: 'remote work' },
        { word: 'promotion', phonetic: '/prəˈmoʊʃn/', pos: 'noun', meaning: 'kenaikan jabatan', example: 'He got a promotion.', exampleId: 'Dia mendapat kenaikan jabatan.', collocation: 'earn a promotion' },
        { word: 'feedback', phonetic: '/ˈfiːdbæk/', pos: 'noun', meaning: 'umpan balik', example: 'Thanks for your feedback.', exampleId: 'Terima kasih atas umpan balikmu.', collocation: 'give feedback' }
      ],
      quiz: [
        {
          id: 'wk-1',
          type: 'mcq',
          prompt: 'The ___ for this report is Friday.',
          options: ['deadline', 'feedback', 'meeting', 'promotion'],
          answer: 'a',
          explanation: 'Deadline adalah tenggat waktu.'
        },
        {
          id: 'wk-2',
          type: 'mcq',
          prompt: 'My ___ helped me finish the slides.',
          options: ['colleague', 'workload', 'deadline', 'remote'],
          answer: 'a',
          explanation: 'Colleague adalah rekan kerja.'
        },
        {
          id: 'wk-3',
          type: 'mcq',
          prompt: 'She got a ___ after two years of hard work.',
          options: ['promotion', 'meeting', 'feedback', 'deadline'],
          answer: 'a',
          explanation: 'Promotion adalah kenaikan jabatan.'
        },
        {
          id: 'wk-4',
          type: 'mcq',
          prompt: 'I have a ___ job, so I don’t go to the office.',
          options: ['remote', 'remotely', 'remoting', 'remoteness'],
          answer: 'a',
          explanation: 'Remote adalah adjective yang menerangkan job: a remote job.'
        },
        {
          id: 'wk-5',
          type: 'mcq',
          prompt: 'The manager will ___ the task to the new intern.',
          options: ['delegate', 'meeting', 'promotion', 'feedback'],
          answer: 'a',
          explanation: 'Delegate berarti mendelegasikan tugas.'
        },
        {
          id: 'wk-6',
          type: 'mcq',
          prompt: 'We have too much ___ this week.',
          options: ['workload', 'colleague', 'deadline', 'promotion'],
          answer: 'a',
          explanation: 'Workload adalah beban kerja.'
        },
        {
          id: 'wk-7',
          type: 'mcq',
          prompt: 'Thanks for your ___; I’ll revise the design.',
          options: ['feedback', 'promotion', 'workload', 'deadline'],
          answer: 'a',
          explanation: 'Feedback adalah umpan balik.'
        },
        {
          id: 'wk-8',
          type: 'mcq',
          prompt: 'Let’s schedule a ___ to discuss the plan.',
          options: ['meeting', 'deadline', 'colleague', 'remote'],
          answer: 'a',
          explanation: 'Schedule a meeting berarti menjadwalkan rapat.'
        }
      ]
    },

    /* =====================================================
       VOCABULARY 5 — TECHNOLOGY
       ===================================================== */
    {
      id: 'technology',
      track: 'vocabulary',
      order: 8,
      title: 'Technology',
      subtitle: 'Perangkat, data, dan masalah layar',
      level: 'B1',
      minutes: 8,
      icon: 'cpu',
      accent: 'teal',
      description: 'Istilah teknologi yang muncul setiap hari, dari update sampai glitch.',
      objectives: [
        'Membicarakan perangkat dan perangkat lunak',
        'Memahami istilah keamanan dasar seperti password',
        'Menjelaskan masalah teknis sederhana'
      ],
      sections: [
        {
          title: 'Perangkat & data',
          icon: 'cpu',
          examples: [
            { en: 'Remember to back up your files.', id: 'Ingat untuk mencadangkan file-mu.' },
            { en: 'You can download the app for free.', id: 'Kamu bisa mengunduh aplikasinya gratis.' },
            { en: 'The software needs an update.', id: 'Perangkat lunak itu butuh pembaruan.' }
          ]
        },
        {
          title: 'Masalah & kenyamanan',
          icon: 'shield',
          bullets: [
            'glitch = gangguan kecil pada sistem',
            'user-friendly = mudah digunakan',
            'device = perangkat',
            'password = kata sandi',
            'back up = mencadangkan',
            'download = mengunduh'
          ],
          tip: 'Back up (dua kata) adalah verb. Backup (satu kata) adalah noun: “Make a backup.”'
        }
      ],
      vocab: [
        { word: 'device', phonetic: '/dɪˈvaɪs/', pos: 'noun', meaning: 'perangkat', example: 'This device is easy to carry.', exampleId: 'Perangkat ini mudah dibawa.', collocation: 'a mobile device' },
        { word: 'software', phonetic: '/ˈsɔːftwer/', pos: 'noun', meaning: 'perangkat lunak', example: 'The software updates automatically.', exampleId: 'Perangkat lunak itu diperbarui otomatis.', collocation: 'install software' },
        { word: 'update', phonetic: '/ˈʌpdeɪt/', pos: 'noun / verb', meaning: 'pembaruan; memperbarui', example: 'Install the latest update.', exampleId: 'Pasang pembaruan terbaru.', collocation: 'a software update' },
        { word: 'back up', phonetic: '/bæk ʌp/', pos: 'phrasal verb', meaning: 'mencadangkan data', example: 'Back up your photos.', exampleId: 'Cadangkan fotomu.', collocation: 'back up files' },
        { word: 'password', phonetic: '/ˈpæswɜːrd/', pos: 'noun', meaning: 'kata sandi', example: 'Use a strong password.', exampleId: 'Gunakan kata sandi yang kuat.', collocation: 'reset your password' },
        { word: 'download', phonetic: '/ˌdaʊnˈloʊd/', pos: 'verb', meaning: 'mengunduh', example: 'Download the file from the website.', exampleId: 'Unduh file dari situs web.', collocation: 'download a file' },
        { word: 'glitch', phonetic: '/ɡlɪtʃ/', pos: 'noun', meaning: 'gangguan teknis kecil', example: 'A glitch froze the screen.', exampleId: 'Gangguan kecil membuat layar membeku.', collocation: 'a minor glitch' },
        { word: 'user-friendly', phonetic: '/ˌjuːzər ˈfrendli/', pos: 'adjective', meaning: 'mudah digunakan', example: 'The app is user-friendly.', exampleId: 'Aplikasinya mudah digunakan.', collocation: 'a user-friendly interface' }
      ],
      quiz: [
        {
          id: 'tech-1',
          type: 'mcq',
          prompt: 'Remember to ___ your files before reinstalling the OS.',
          options: ['back up', 'backup', 'backed up', 'backing up'],
          answer: 'a',
          explanation: 'Setelah to, gunakan verb back up. Backup adalah noun.'
        },
        {
          id: 'tech-2',
          type: 'mcq',
          prompt: 'This app is very ___; even my grandmother can use it.',
          options: ['user-friendly', 'glitch', 'software', 'device'],
          answer: 'a',
          explanation: 'User-friendly berarti mudah digunakan.'
        },
        {
          id: 'tech-3',
          type: 'mcq',
          prompt: 'My phone needs a software ___.',
          options: ['update', 'download', 'password', 'backup'],
          answer: 'a',
          explanation: 'Software update adalah pembaruan perangkat lunak.'
        },
        {
          id: 'tech-4',
          type: 'mcq',
          prompt: 'I can’t log in because I forgot my ___.',
          options: ['password', 'device', 'glitch', 'software'],
          answer: 'a',
          explanation: 'Password adalah kata sandi untuk masuk.'
        },
        {
          id: 'tech-5',
          type: 'mcq',
          prompt: 'You can ___ the file from the website.',
          options: ['download', 'update', 'back up', 'glitch'],
          answer: 'a',
          explanation: 'Download berarti mengunduh.'
        },
        {
          id: 'tech-6',
          type: 'mcq',
          prompt: 'A small ___ caused the screen to freeze.',
          options: ['glitch', 'device', 'password', 'software'],
          answer: 'a',
          explanation: 'Glitch adalah gangguan teknis kecil.'
        },
        {
          id: 'tech-7',
          type: 'mcq',
          prompt: 'A smartphone is a ___ that fits in your pocket.',
          options: ['device', 'software', 'glitch', 'update'],
          answer: 'a',
          explanation: 'Device adalah perangkat.'
        },
        {
          id: 'tech-8',
          type: 'mcq',
          prompt: 'The company uses new ___ for accounting.',
          options: ['software', 'device', 'password', 'glitch'],
          answer: 'a',
          explanation: 'Software adalah perangkat lunak.'
        }
      ]
    },

    /* =====================================================
       VOCABULARY 6 — ENVIRONMENT
       ===================================================== */
    {
      id: 'environment',
      track: 'vocabulary',
      order: 10,
      title: 'Environment',
      subtitle: 'Bicara tentang bumi dengan tepat',
      level: 'B2',
      minutes: 9,
      icon: 'leaf',
      accent: 'teal',
      description: 'Kosakata untuk membahas iklim, energi, dan pelestarian lingkungan.',
      objectives: [
        'Membahas energi terbarukan dan emisi',
        'Menjelaskan habitat dan keanekaragaman hayati',
        'Menggunakan kata kerja conserve dan sustain dalam konteks'
      ],
      sections: [
        {
          title: 'Isu utama',
          icon: 'leaf',
          examples: [
            { en: 'Solar and wind are renewable energy sources.', id: 'Matahari dan angin adalah sumber energi terbarukan.' },
            { en: 'We must reduce carbon emissions.', id: 'Kita harus mengurangi emisi karbon.' },
            { en: 'The drought destroyed many crops.', id: 'Kekeringan menghancurkan banyak tanaman.' }
          ]
        },
        {
          title: 'Menjaga alam',
          icon: 'shield',
          bullets: [
            'sustainable = berkelanjutan',
            'conserve = melestarikan / menghemat',
            'habitat = habitat',
            'biodiversity = keanekaragaman hayati',
            'waste = limbah / pemborosan',
            'emissions = emisi'
          ],
          tip: 'Sustainable development berarti pembangunan yang memenuhi kebutuhan sekarang tanpa merusak kemampuan generasi mendatang.'
        }
      ],
      vocab: [
        { word: 'sustainable', phonetic: '/səˈsteɪnəbl/', pos: 'adjective', meaning: 'berkelanjutan', example: 'We need sustainable farming methods.', exampleId: 'Kita butuh metode pertanian berkelanjutan.', collocation: 'sustainable development' },
        { word: 'emissions', phonetic: '/ɪˈmɪʃnz/', pos: 'noun', meaning: 'emisi', example: 'Carbon emissions are rising.', exampleId: 'Emisi karbon meningkat.', collocation: 'reduce emissions' },
        { word: 'renewable', phonetic: '/rɪˈnuːəbl/', pos: 'adjective', meaning: 'terbarukan', example: 'Wind is a renewable energy source.', exampleId: 'Angin adalah sumber energi terbarukan.', collocation: 'renewable energy' },
        { word: 'drought', phonetic: '/draʊt/', pos: 'noun', meaning: 'kekeringan', example: 'The drought lasted for months.', exampleId: 'Kekeringan berlangsung selama berbulan-bulan.', collocation: 'a severe drought' },
        { word: 'biodiversity', phonetic: '/ˌbaɪoʊdaɪˈvɜːrsəti/', pos: 'noun', meaning: 'keanekaragaman hayati', example: 'The forest has rich biodiversity.', exampleId: 'Hutan itu memiliki keanekaragaman hayati yang kaya.', collocation: 'protect biodiversity' },
        { word: 'waste', phonetic: '/weɪst/', pos: 'noun / verb', meaning: 'limbah; membuang', example: 'Plastic waste harms animals.', exampleId: 'Limbah plastik membahayakan hewan.', collocation: 'plastic waste' },
        { word: 'conserve', phonetic: '/kənˈsɜːrv/', pos: 'verb', meaning: 'melestarikan / menghemat', example: 'We should conserve water.', exampleId: 'Kita harus menghemat air.', collocation: 'conserve energy' },
        { word: 'habitat', phonetic: '/ˈhæbɪtæt/', pos: 'noun', meaning: 'habitat', example: 'Deforestation destroys animal habitats.', exampleId: 'Penggundulan hutan merusak habitat hewan.', collocation: 'natural habitat' }
      ],
      quiz: [
        {
          id: 'env-1',
          type: 'mcq',
          prompt: 'Solar and wind are ___ energy sources.',
          options: ['renewable', 'drought', 'emission', 'habitat'],
          answer: 'a',
          explanation: 'Renewable energy sources adalah sumber energi yang dapat diperbarui.'
        },
        {
          id: 'env-2',
          type: 'mcq',
          prompt: 'We need to reduce carbon ___ to slow climate change.',
          options: ['emissions', 'renewable', 'habitat', 'drought'],
          answer: 'a',
          explanation: 'Carbon emissions adalah emisi karbon.'
        },
        {
          id: 'env-3',
          type: 'mcq',
          prompt: 'The long ___ destroyed many crops.',
          options: ['drought', 'habitat', 'waste', 'emission'],
          answer: 'a',
          explanation: 'Drought adalah kekeringan.'
        },
        {
          id: 'env-4',
          type: 'mcq',
          prompt: 'The national park protects the ___ of thousands of species.',
          options: ['biodiversity', 'drought', 'waste', 'emission'],
          answer: 'a',
          explanation: 'Biodiversity adalah keanekaragaman hayati.'
        },
        {
          id: 'env-5',
          type: 'mcq',
          prompt: 'Please ___ water during the dry season.',
          options: ['conserve', 'waste', 'emit', 'destroy'],
          answer: 'a',
          explanation: 'Conserve water berarti menghemat air.'
        },
        {
          id: 'env-6',
          type: 'mcq',
          prompt: 'Plastic ___ harms marine animals.',
          options: ['waste', 'habitat', 'drought', 'renewable'],
          answer: 'a',
          explanation: 'Plastic waste adalah limbah plastik.'
        },
        {
          id: 'env-7',
          type: 'mcq',
          prompt: 'These farming methods are more ___ because they protect the soil.',
          options: ['sustainable', 'renewable', 'emission', 'drought'],
          answer: 'a',
          explanation: 'Sustainable berarti berkelanjutan.'
        },
        {
          id: 'env-8',
          type: 'mcq',
          prompt: 'Deforestation destroys the natural ___ of many animals.',
          options: ['habitat', 'biodiversity', 'drought', 'waste'],
          answer: 'a',
          explanation: 'Natural habitat adalah habitat alami.'
        }
      ]
    }
  ];

  const achievements = [
    {
      id: 'first-steps',
      title: 'Langkah Pertama',
      description: 'Selesaikan latihan pertamamu.',
      icon: 'flag',
      tier: 'bronze',
      metric: 'quizzes',
      target: 1
    },
    {
      id: 'perfect-run',
      title: 'Perfect Run',
      description: 'Dapatkan skor 100% dalam satu latihan.',
      icon: 'sparkles',
      tier: 'silver',
      metric: 'perfect',
      target: 1
    },
    {
      id: 'on-fire',
      title: 'On Fire',
      description: 'Jaga streak belajar selama 3 hari.',
      icon: 'flame',
      tier: 'bronze',
      metric: 'streak',
      target: 3
    },
    {
      id: 'grammar-scout',
      title: 'Grammar Scout',
      description: 'Tuntaskan 3 modul grammar.',
      icon: 'book-open',
      tier: 'silver',
      metric: 'grammarCompleted',
      target: 3
    },
    {
      id: 'word-collector',
      title: 'Word Collector',
      description: 'Tuntaskan 3 modul vocabulary.',
      icon: 'languages',
      tier: 'silver',
      metric: 'vocabCompleted',
      target: 3
    },
    {
      id: 'halfway',
      title: 'Halfway Hero',
      description: 'Tuntaskan 12 modul dari total 40 modul.',
      icon: 'route',
      tier: 'gold',
      metric: 'completed',
      target: 12
    },
    {
      id: 'grammar-master',
      title: 'Grammar Master',
      description: 'Tuntaskan 12 modul grammar.',
      icon: 'graduation',
      tier: 'gold',
      metric: 'grammarCompleted',
      target: 12
    },
    {
      id: 'lexicon-legend',
      title: 'Lexicon Legend',
      description: 'Tuntaskan 12 modul vocabulary.',
      icon: 'crown',
      tier: 'gold',
      metric: 'vocabCompleted',
      target: 12
    },
    {
      id: 'xp-500',
      title: 'XP Hunter',
      description: 'Kumpulkan 500 XP.',
      icon: 'bolt',
      tier: 'gold',
      metric: 'xp',
      target: 500
    },
    {
      id: 'sharpshooter',
      title: 'Sharpshooter',
      description: 'Capai akurasi 90% setelah menjawab 30 soal.',
      icon: 'target',
      tier: 'silver',
      metric: 'accuracy',
      target: 90,
      gate: { metric: 'answers', target: 30 }
    },
    {
      id: 'consistent',
      title: 'Konsisten',
      description: 'Capai target harian selama 5 hari.',
      icon: 'calendar',
      tier: 'gold',
      metric: 'goalDays',
      target: 5
    },
    {
      id: 'all-rounder',
      title: 'All-Rounder',
      description: 'Tuntaskan minimal 2 modul grammar dan 2 modul vocabulary.',
      icon: 'award',
      tier: 'gold',
      metric: 'balanced',
      target: 4
    },
    {
      id: 'grammar-complete',
      title: 'Grammar Grandmaster',
      description: 'Tuntaskan seluruh 20 modul grammar.',
      icon: 'shield',
      tier: 'platinum',
      metric: 'grammarCompleted',
      target: 20
    },
    {
      id: 'vocab-complete',
      title: 'Word Wizard',
      description: 'Tuntaskan seluruh 20 modul vocabulary.',
      icon: 'sparkles',
      tier: 'platinum',
      metric: 'vocabCompleted',
      target: 20
    },
    {
      id: 'dixi-champion',
      title: 'DIXI Champion',
      description: 'Tuntaskan seluruh 40 modul DIXIGRAM.',
      icon: 'trophy',
      tier: 'platinum',
      metric: 'completed',
      target: 40
    },
    {
      id: 'mission-runner',
      title: 'Mission Runner',
      description: 'Klaim 10 misi harian.',
      icon: 'list-checks',
      tier: 'silver',
      metric: 'missions',
      target: 10
    },
    {
      id: 'weekly-warrior',
      title: 'Weekly Warrior',
      description: 'Taklukkan 3 tantangan mingguan.',
      icon: 'swords',
      tier: 'gold',
      metric: 'weeklyChallenges',
      target: 3
    }
  ];

  const wordsOfDay = [
    { word: 'resilient', phonetic: '/rɪˈzɪliənt/', pos: 'adjective', meaning: 'tangguh, cepat pulih', example: 'She stayed resilient after the setback.', exampleId: 'Dia tetap tangguh setelah kemunduran itu.' },
    { word: 'curious', phonetic: '/ˈkjʊriəs/', pos: 'adjective', meaning: 'penasaran, ingin tahu', example: 'Stay curious and keep asking questions.', exampleId: 'Tetap penasaran dan terus bertanya.' },
    { word: 'thrive', phonetic: '/θraɪv/', pos: 'verb', meaning: 'berkembang, tumbuh baik', example: 'Plants thrive in warm, humid weather.', exampleId: 'Tanaman tumbuh baik di cuaca hangat dan lembap.' },
    { word: 'meticulous', phonetic: '/məˈtɪkjələs/', pos: 'adjective', meaning: 'sangat teliti', example: 'He is meticulous about his work.', exampleId: 'Dia sangat teliti dalam pekerjaannya.' },
    { word: 'spontaneous', phonetic: '/spɑːnˈteɪniəs/', pos: 'adjective', meaning: 'spontan', example: 'We took a spontaneous trip to the coast.', exampleId: 'Kami melakukan perjalanan spontan ke pantai.' },
    { word: 'empathy', phonetic: '/ˈempəθi/', pos: 'noun', meaning: 'empati', example: 'Good teachers show empathy.', exampleId: 'Guru yang baik menunjukkan empati.' },
    { word: 'concise', phonetic: '/kənˈsaɪs/', pos: 'adjective', meaning: 'ringkas dan jelas', example: 'Keep your answer concise.', exampleId: 'Buat jawabanmu ringkas.' },
    { word: 'versatile', phonetic: '/ˈvɜːrsətl/', pos: 'adjective', meaning: 'serbaguna', example: 'This is a versatile tool.', exampleId: 'Ini adalah alat yang serbaguna.' },
    { word: 'inevitable', phonetic: '/ɪnˈevɪtəbl/', pos: 'adjective', meaning: 'tak terhindarkan', example: 'Change is inevitable.', exampleId: 'Perubahan tidak terhindarkan.' },
    { word: 'alleviate', phonetic: '/əˈliːvieɪt/', pos: 'verb', meaning: 'meringankan', example: 'The medicine helped alleviate the pain.', exampleId: 'Obat itu membantu meringankan rasa sakit.' },
    { word: 'profound', phonetic: '/prəˈfaʊnd/', pos: 'adjective', meaning: 'mendalam, besar pengaruhnya', example: 'The book had a profound impact on me.', exampleId: 'Buku itu berdampak besar bagiku.' },
    { word: 'coherent', phonetic: '/koʊˈhɪrənt/', pos: 'adjective', meaning: 'runtut dan mudah dipahami', example: 'She gave a coherent explanation.', exampleId: 'Dia memberikan penjelasan yang runtut.' },
    { word: 'diligent', phonetic: '/ˈdɪlɪdʒənt/', pos: 'adjective', meaning: 'rajin dan tekun', example: 'A diligent student reviews every day.', exampleId: 'Siswa yang rajin mengulang setiap hari.' },
    { word: 'vivid', phonetic: '/ˈvɪvɪd/', pos: 'adjective', meaning: 'jelas, hidup (imajinasi/warna)', example: 'I have a vivid memory of that day.', exampleId: 'Aku punya ingatan yang jelas tentang hari itu.' }
  ];

  return {
    tracks: { grammar: grammar, vocabulary: vocabulary },
    modules: modules,
    achievements: achievements,
    wordsOfDay: wordsOfDay
  };
})();

/* =========================================================
   HELPER KONTEN
   ========================================================= */

var DIXI_MODULE_CACHE_ = null;

/** Semua modul: Content.gs + Content2.gs (digabung saat pertama dipakai). */
function contentModules_() {
  if (DIXI_MODULE_CACHE_) return DIXI_MODULE_CACHE_;
  const extra = typeof DIXI_CONTENT_EXTRA !== 'undefined' && Array.isArray(DIXI_CONTENT_EXTRA) ? DIXI_CONTENT_EXTRA : [];
  const extra2 = typeof DIXI_CONTENT_EXTRA2 !== 'undefined' && Array.isArray(DIXI_CONTENT_EXTRA2) ? DIXI_CONTENT_EXTRA2 : [];
  const orderMap = {};
  if (typeof DIXI_MODULE_ORDER !== 'undefined' && DIXI_MODULE_ORDER) {
    Object.keys(DIXI_MODULE_ORDER).forEach(function (track) {
      (DIXI_MODULE_ORDER[track] || []).forEach(function (id, index) { orderMap[id] = index + 1; });
    });
  }
  const seen = {};
  DIXI_MODULE_CACHE_ = DIXI_CONTENT.modules.concat(extra, extra2).filter(function (m) {
    if (!m || !m.id || seen[m.id]) return false;
    seen[m.id] = true;
    return true;
  }).map(function (m) {
    if (orderMap[m.id]) m.order = orderMap[m.id];
    return m;
  });
  return DIXI_MODULE_CACHE_;
}

function getAllModules_() {
  return contentModules_().slice().sort(function (a, b) {
    if (a.track !== b.track) return a.track === 'grammar' ? -1 : 1;
    return a.order - b.order;
  });
}

function getModuleById_(moduleId) {
  const list = contentModules_();
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === moduleId) return list[i];
  }
  return null;
}

function getTrackMeta_() {
  return DIXI_CONTENT.tracks;
}

function getAchievementMeta_() {
  return DIXI_CONTENT.achievements.map(function (a) {
    return {
      id: a.id,
      title: a.title,
      description: a.description,
      icon: a.icon,
      tier: a.tier,
      metric: a.metric,
      target: a.target,
      gate: a.gate || null
    };
  });
}

function getContentStats_() {
  let questions = 0;
  let words = 0;
  const all = contentModules_();
  all.forEach(function (m) {
    questions += m.quiz.length;
    if (m.vocab) words += m.vocab.length;
  });
  return {
    modules: all.length,
    grammarModules: all.filter(function (m) { return m.track === 'grammar'; }).length,
    vocabModules: all.filter(function (m) { return m.track === 'vocabulary'; }).length,
    questions: questions,
    words: words
  };
}

function getWordOfDay_() {
  const key = todayKey_();
  let seed = 0;
  for (let i = 0; i < key.length; i++) seed += key.charCodeAt(i) * (i + 3);
  const word = DIXI_CONTENT.wordsOfDay[seed % DIXI_CONTENT.wordsOfDay.length];
  return Object.assign({}, word, { date: key });
}

function optionLetter_(index) {
  return String.fromCharCode(97 + index);
}

function sanitizeModule_(module) {
  const quiz = module.quiz.map(function (q) {
    const item = {
      id: q.id,
      type: q.type,
      prompt: q.prompt,
      context: q.context || '',
      placeholder: q.placeholder || '',
      hint: q.hint || ''
    };
    if (q.type === 'mcq') {
      item.options = q.options.map(function (text, index) {
        return { id: optionLetter_(index), text: text };
      });
    }
    return item;
  });

  return {
    id: module.id,
    track: module.track,
    order: module.order,
    title: module.title,
    subtitle: module.subtitle,
    level: module.level,
    minutes: module.minutes,
    icon: module.icon,
    accent: module.accent,
    description: module.description,
    objectives: module.objectives,
    sections: module.sections,
    vocab: module.vocab || [],
    questionCount: module.quiz.length,
    quiz: quiz,
    trackMeta: DIXI_CONTENT.tracks[module.track]
  };
}

function findQuestion_(module, questionId) {
  for (let i = 0; i < module.quiz.length; i++) {
    if (module.quiz[i].id === questionId) return module.quiz[i];
  }
  return null;
}
