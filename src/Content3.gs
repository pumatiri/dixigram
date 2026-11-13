/**
 * DIXIGRAM — Kurikulum tambahan 2 (v1.5)
 * File: Content3.gs
 *
 * 8 modul grammar + 8 modul vocabulary baru: 2 modul per jalur di setiap
 * level A1–B2. Setiap jalur kini berisi 20 modul (5 per level).
 * Modul di file ini otomatis digabung dengan Content.gs dan Content2.gs.
 * DIXI_MODULE_ORDER mengatur urutan tampil seluruh 40 modul per level.
 */

var DIXI_MODULE_ORDER = {
  grammar: [
    'present-simple', 'to-be', 'present-continuous', 'articles', 'prepositions',               // A1
    'past-simple', 'comparatives', 'future-forms', 'quantifiers', 'past-continuous',            // A2
    'present-perfect', 'modals', 'conditionals', 'gerunds-infinitives', 'past-perfect',         // B1
    'passive-voice', 'reported-speech', 'relative-clauses', 'modals-deduction', 'wishes-regrets' // B2
  ],
  vocabulary: [
    'daily-routines', 'food-drink', 'family-people', 'clothes-colors', 'weather-seasons',        // A1
    'travel', 'shopping-money', 'health-body', 'hobbies-free-time', 'city-directions',           // A2
    'work', 'technology', 'feelings-personality', 'education-campus', 'phrasal-verbs',           // B1
    'environment', 'media-news', 'opinions-debate', 'business-economy', 'science-research'       // B2
  ]
};

var DIXI_CONTENT_EXTRA2 = [

  /* =====================================================
     GRAMMAR A1 — ARTICLES & PLURALS
     ===================================================== */
  {
    id: 'articles',
    track: 'grammar',
    order: 4,
    title: 'Articles & Plurals',
    subtitle: 'A, an, the, dan bentuk jamak',
    level: 'A1',
    minutes: 7,
    icon: 'pen-line',
    accent: 'violet',
    description: 'Memilih a, an, the, atau tanpa artikel, serta membentuk kata benda jamak dengan benar.',
    objectives: [
      'Memilih a atau an berdasarkan bunyi awal kata',
      'Memakai the untuk benda yang sudah jelas atau satu-satunya',
      'Membentuk jamak beraturan dan tidak beraturan'
    ],
    sections: [
      {
        title: 'A atau an?',
        icon: 'pen-line',
        body: [
          'A dan an berarti “sebuah/seorang” dan hanya dipakai untuk benda tunggal yang dapat dihitung. Pilihannya bergantung pada bunyi awal kata, bukan hurufnya.'
        ],
        table: {
          headers: ['Artikel', 'Bunyi awal', 'Contoh'],
          rows: [
            ['a', 'konsonan', 'a book, a university, a European city'],
            ['an', 'vokal', 'an apple, an hour, an MBA']
          ]
        },
        tip: 'University dibaca /juː/ sehingga memakai a. Hour dibaca /aʊ/ (h tidak dibaca) sehingga memakai an.'
      },
      {
        title: 'Kapan memakai the?',
        icon: 'target',
        bullets: [
          'Benda yang sudah disebut sebelumnya: “I bought a phone. The phone is red.”',
          'Benda yang jelas bagi pendengar: “Close the door, please.”',
          'Benda satu-satunya: the sun, the moon, the internet.',
          'Tanpa artikel untuk hal umum: “Cats are cute.” “I like music.”'
        ],
        examples: [
          { en: 'She is a nurse at the hospital near my house.', id: 'Dia seorang perawat di rumah sakit dekat rumah saya.' },
          { en: 'Water is important for life.', id: 'Air penting bagi kehidupan. (umum, tanpa artikel)' }
        ]
      },
      {
        title: 'Bentuk jamak',
        icon: 'layers',
        table: {
          headers: ['Aturan', 'Tunggal', 'Jamak'],
          rows: [
            ['+ s', 'book, car', 'books, cars'],
            ['-s, -sh, -ch, -x + es', 'bus, box, watch', 'buses, boxes, watches'],
            ['konsonan + y → ies', 'city, baby', 'cities, babies'],
            ['tidak beraturan', 'man, child, foot, person', 'men, children, feet, people']
          ]
        },
        tip: 'Information, advice, money, dan furniture tidak punya bentuk jamak: “some information”, bukan “informations”.'
      }
    ],
    quiz: [
      { id: 'ar-1', type: 'mcq', prompt: 'She wants to be ___ engineer.', options: ['a', 'an', 'the', '—'], answer: 'b', explanation: 'Engineer diawali bunyi vokal /e/, jadi memakai an.' },
      { id: 'ar-2', type: 'mcq', prompt: 'He studies at ___ university in Malang.', options: ['an', 'a', 'the', '—'], answer: 'b', explanation: 'University dibaca /juː/ (bunyi konsonan), jadi memakai a.' },
      { id: 'ar-3', type: 'mcq', prompt: '___ sun rises in the east.', options: ['A', 'An', 'The', '—'], answer: 'c', explanation: 'Matahari hanya satu, jadi memakai the.' },
      { id: 'ar-4', type: 'type', prompt: 'Please wait. I’ll be ready in ___ hour.', placeholder: 'a / an / the', answers: ['an'], explanation: 'Huruf h pada hour tidak dibaca, sehingga bunyinya vokal: an hour.' },
      { id: 'ar-5', type: 'mcq', prompt: 'Bentuk jamak dari “child” adalah …', options: ['childs', 'childes', 'children', 'childrens'], answer: 'c', explanation: 'Child termasuk jamak tidak beraturan: children.' },
      { id: 'ar-6', type: 'type', prompt: 'There are three ___ (box) on the shelf.', placeholder: 'Tulis bentuk jamak', answers: ['boxes'], explanation: 'Kata yang berakhiran -x mendapat -es: boxes.' },
      { id: 'ar-7', type: 'mcq', prompt: 'I need some ___ about the course.', options: ['informations', 'information', 'an information', 'the informations'], answer: 'b', explanation: 'Information tidak dapat dihitung, jadi tidak memakai -s atau a/an.' },
      { id: 'ar-8', type: 'mcq', prompt: 'I bought a bag yesterday. ___ bag is very light.', options: ['A', 'An', 'The', '—'], answer: 'c', explanation: 'Tas sudah disebut sebelumnya, jadi kini memakai the.' }
    ]
  },

  /* =====================================================
     GRAMMAR A1 — PREPOSITIONS OF TIME & PLACE
     ===================================================== */
  {
    id: 'prepositions',
    track: 'grammar',
    order: 5,
    title: 'Prepositions of Time & Place',
    subtitle: 'In, on, at untuk waktu dan tempat',
    level: 'A1',
    minutes: 8,
    icon: 'map',
    accent: 'violet',
    description: 'Memakai in, on, dan at dengan tepat untuk keterangan waktu dan tempat, ditambah preposisi posisi yang umum.',
    objectives: [
      'Memilih in, on, at untuk waktu (bulan, hari, jam)',
      'Memilih in, on, at untuk tempat',
      'Menggambarkan posisi benda: under, next to, between, behind'
    ],
    sections: [
      {
        title: 'In, on, at untuk waktu',
        icon: 'calendar',
        table: {
          headers: ['Preposisi', 'Dipakai untuk', 'Contoh'],
          rows: [
            ['in', 'bulan, tahun, musim, bagian hari', 'in May, in 2026, in the morning'],
            ['on', 'hari dan tanggal', 'on Monday, on 17 August, on my birthday'],
            ['at', 'jam dan waktu tertentu', 'at 7 o’clock, at night, at the weekend']
          ]
        },
        tip: 'Pola mudah diingat: dari yang luas ke yang sempit, IN (bulan/tahun) → ON (hari) → AT (jam).'
      },
      {
        title: 'In, on, at untuk tempat',
        icon: 'map',
        bullets: [
          'in = di dalam ruang atau wilayah: in the room, in Jakarta, in the car',
          'on = di atas permukaan: on the table, on the wall, on the second floor',
          'at = di titik atau lokasi tertentu: at the bus stop, at school, at home'
        ],
        examples: [
          { en: 'My keys are on the desk.', id: 'Kunci saya ada di atas meja.' },
          { en: 'We met at the station.', id: 'Kami bertemu di stasiun.' }
        ]
      },
      {
        title: 'Posisi benda',
        icon: 'compass',
        bullets: [
          'under = di bawah; above = di atas (tidak menempel)',
          'next to = di sebelah; between = di antara (dua benda)',
          'behind = di belakang; in front of = di depan',
          'opposite = di seberang'
        ],
        examples: [
          { en: 'The bank is between the café and the pharmacy.', id: 'Bank berada di antara kafe dan apotek.' },
          { en: 'The cat is hiding under the bed.', id: 'Kucing itu bersembunyi di bawah tempat tidur.' }
        ]
      }
    ],
    quiz: [
      { id: 'pr-1', type: 'mcq', prompt: 'My birthday is ___ June.', options: ['on', 'in', 'at', 'by'], answer: 'b', explanation: 'Nama bulan memakai in.' },
      { id: 'pr-2', type: 'mcq', prompt: 'The meeting starts ___ 9 a.m.', options: ['in', 'on', 'at', 'to'], answer: 'c', explanation: 'Jam tertentu memakai at.' },
      { id: 'pr-3', type: 'type', prompt: 'We have English class ___ Monday.', placeholder: 'in / on / at', answers: ['on'], explanation: 'Nama hari memakai on.' },
      { id: 'pr-4', type: 'mcq', prompt: 'There is a picture ___ the wall.', options: ['in', 'on', 'at', 'under'], answer: 'b', explanation: 'Menempel pada permukaan dinding memakai on.' },
      { id: 'pr-5', type: 'mcq', prompt: 'I’ll wait for you ___ the bus stop.', options: ['in', 'on', 'at', 'between'], answer: 'c', explanation: 'Titik lokasi tertentu seperti halte memakai at.' },
      { id: 'pr-6', type: 'mcq', prompt: 'The pharmacy is ___ the bank and the bakery.', options: ['next', 'between', 'behind', 'opposite to'], answer: 'b', explanation: 'Di antara dua tempat memakai between … and …' },
      { id: 'pr-7', type: 'type', prompt: 'She usually studies ___ night.', placeholder: 'in / on / at', answers: ['at'], explanation: 'Ungkapan tetap: at night (tetapi in the morning/afternoon/evening).' },
      { id: 'pr-8', type: 'mcq', prompt: 'They live ___ Yogyakarta.', options: ['at', 'on', 'in', 'to'], answer: 'c', explanation: 'Kota atau wilayah memakai in.' }
    ]
  },

  /* =====================================================
     GRAMMAR A2 — COUNTABLE, UNCOUNTABLE & QUANTIFIERS
     ===================================================== */
  {
    id: 'quantifiers',
    track: 'grammar',
    order: 9,
    title: 'Quantifiers',
    subtitle: 'Some, any, much, many, a few, a little',
    level: 'A2',
    minutes: 8,
    icon: 'grid',
    accent: 'violet',
    description: 'Membedakan kata benda yang dapat dan tidak dapat dihitung, lalu memilih kata penunjuk jumlah yang tepat.',
    objectives: [
      'Membedakan countable dan uncountable nouns',
      'Memakai some dan any dalam kalimat positif, negatif, dan tanya',
      'Memilih much/many, a few/a little, dan a lot of'
    ],
    sections: [
      {
        title: 'Countable & uncountable',
        icon: 'grid',
        bullets: [
          'Countable (dapat dihitung): an egg, two eggs, a student, many students',
          'Uncountable (tidak dapat dihitung): water, rice, sugar, money, time, advice',
          'Uncountable tidak memakai a/an dan tidak diberi -s. Untuk menghitungnya pakai satuan: a glass of water, two kilos of rice.'
        ]
      },
      {
        title: 'Some & any',
        icon: 'braces',
        formula: [
          { label: 'Positif', value: 'some + jamak / uncountable' },
          { label: 'Negatif & tanya', value: 'any + jamak / uncountable' },
          { label: 'Menawarkan/meminta', value: 'Would you like some …? Can I have some …?' }
        ],
        examples: [
          { en: 'There are some apples in the basket.', id: 'Ada beberapa apel di keranjang.' },
          { en: 'We don’t have any milk.', id: 'Kita tidak punya susu sama sekali.' }
        ]
      },
      {
        title: 'Much, many, a few, a little',
        icon: 'scale',
        table: {
          headers: ['Countable (jamak)', 'Uncountable', 'Arti'],
          rows: [
            ['many', 'much', 'banyak (umumnya di negatif & tanya)'],
            ['a few', 'a little', 'sedikit (tetapi cukup)'],
            ['a lot of', 'a lot of', 'banyak (untuk keduanya)'],
            ['How many …?', 'How much …?', 'Berapa banyak …?']
          ]
        },
        tip: '“How much is it?” juga dipakai untuk menanyakan harga.'
      }
    ],
    quiz: [
      { id: 'qn-1', type: 'mcq', prompt: 'How ___ students are in your class?', options: ['much', 'many', 'little', 'any'], answer: 'b', explanation: 'Students dapat dihitung dan jamak, jadi How many.' },
      { id: 'qn-2', type: 'mcq', prompt: 'There isn’t ___ sugar left.', options: ['some', 'many', 'any', 'a few'], answer: 'c', explanation: 'Kalimat negatif dengan benda tak terhitung memakai any.' },
      { id: 'qn-3', type: 'type', prompt: 'How ___ money do you need?', placeholder: 'much / many', answers: ['much'], explanation: 'Money tidak dapat dihitung, jadi How much.' },
      { id: 'qn-4', type: 'mcq', prompt: 'I have ___ friends in Bali, so I’m not lonely there.', options: ['a little', 'a few', 'much', 'any'], answer: 'b', explanation: 'Friends dapat dihitung: a few = beberapa (cukup).' },
      { id: 'qn-5', type: 'mcq', prompt: 'Could I have ___ water, please?', options: ['some', 'any', 'many', 'a few'], answer: 'a', explanation: 'Permintaan sopan memakai some, meskipun berbentuk pertanyaan.' },
      { id: 'qn-6', type: 'mcq', prompt: 'Manakah kata benda yang tidak dapat dihitung?', options: ['chair', 'advice', 'orange', 'idea'], answer: 'b', explanation: 'Advice tidak dapat dihitung. Untuk satu saran: a piece of advice.' },
      { id: 'qn-7', type: 'type', prompt: 'Add a ___ salt to the soup. Not too much!', placeholder: 'few / little', answers: ['little'], explanation: 'Salt tidak dapat dihitung, jadi a little.' },
      { id: 'qn-8', type: 'mcq', prompt: 'She drinks ___ coffee every day — about five cups.', options: ['a lot of', 'a few', 'many', 'any'], answer: 'a', explanation: 'A lot of bisa dipakai untuk benda tak terhitung dalam kalimat positif.' }
    ]
  },

  /* =====================================================
     GRAMMAR A2 — PAST CONTINUOUS
     ===================================================== */
  {
    id: 'past-continuous',
    track: 'grammar',
    order: 10,
    title: 'Past Continuous',
    subtitle: 'Sedang terjadi di masa lalu',
    level: 'A2',
    minutes: 8,
    icon: 'clock',
    accent: 'violet',
    description: 'Menceritakan aksi yang sedang berlangsung pada waktu tertentu di masa lalu dan menggabungkannya dengan Past Simple.',
    objectives: [
      'Membentuk was/were + V-ing',
      'Memakai when dan while untuk dua kejadian',
      'Membedakan latar cerita (Past Continuous) dan kejadian singkat (Past Simple)'
    ],
    sections: [
      {
        title: 'Rumus inti',
        icon: 'braces',
        formula: [
          { label: 'Positif', value: 'S + was/were + V-ing' },
          { label: 'Negatif', value: 'S + wasn’t/weren’t + V-ing' },
          { label: 'Pertanyaan', value: 'Was/Were + S + V-ing?' }
        ],
        examples: [
          { en: 'At 8 p.m. yesterday, I was studying.', id: 'Pukul 8 malam kemarin, saya sedang belajar.' },
          { en: 'They were not watching TV.', id: 'Mereka tidak sedang menonton TV.' }
        ],
        tip: 'I/he/she/it memakai was; you/we/they memakai were.'
      },
      {
        title: 'When & while',
        icon: 'history',
        bullets: [
          'Kejadian panjang terpotong kejadian singkat: “I was cooking when the phone rang.”',
          'Dua kejadian berlangsung bersamaan: “While she was reading, he was cooking.”',
          'When biasanya diikuti Past Simple, while diikuti Past Continuous.'
        ],
        examples: [
          { en: 'It was raining when we left the house.', id: 'Hujan sedang turun ketika kami meninggalkan rumah.' },
          { en: 'While I was walking home, I saw an old friend.', id: 'Ketika sedang berjalan pulang, saya melihat seorang teman lama.' }
        ]
      }
    ],
    quiz: [
      { id: 'pcn-1', type: 'mcq', prompt: 'At 10 p.m. last night, we ___ a movie.', options: ['watched', 'were watching', 'was watching', 'are watching'], answer: 'b', explanation: 'Aksi yang sedang berlangsung pada jam tertentu di masa lalu, subjek we: were watching.' },
      { id: 'pcn-2', type: 'mcq', prompt: 'She ___ dinner when I called her.', options: ['was cooking', 'cooked', 'were cooking', 'cooks'], answer: 'a', explanation: 'Aksi panjang (memasak) terpotong telepon: was cooking.' },
      { id: 'pcn-3', type: 'type', prompt: 'I ___ (sleep) when the earthquake started.', placeholder: 'Tulis was/were + V-ing', answers: ['was sleeping'], explanation: 'Subjek I memakai was: was sleeping.' },
      { id: 'pcn-4', type: 'mcq', prompt: '___ they playing football at 4 p.m.?', options: ['Was', 'Were', 'Did', 'Are'], answer: 'b', explanation: 'Subjek they memakai were.' },
      { id: 'pcn-5', type: 'mcq', prompt: 'While I ___ to school, it started to rain.', options: ['walked', 'was walking', 'were walking', 'walk'], answer: 'b', explanation: 'While diikuti aksi yang sedang berlangsung: was walking.' },
      { id: 'pcn-6', type: 'mcq', prompt: 'He was taking a shower when the lights ___ out.', options: ['were going', 'went', 'go', 'was going'], answer: 'b', explanation: 'Kejadian singkat yang memotong memakai Past Simple: went.' },
      { id: 'pcn-7', type: 'type', prompt: 'We ___ (not / listen) to the teacher, so we missed the instructions.', placeholder: 'Tulis bentuk negatif', answers: ['weren\'t listening', 'were not listening'], explanation: 'We memakai were: weren’t listening.' },
      { id: 'pcn-8', type: 'mcq', prompt: 'Pilih kalimat yang benar.', options: ['I was knowing the answer.', 'I knew the answer.', 'I were knowing the answer.', 'I was know the answer.'], answer: 'b', explanation: 'Know adalah kata kerja keadaan yang jarang memakai -ing.' }
    ]
  },

  /* =====================================================
     GRAMMAR B1 — GERUNDS & INFINITIVES
     ===================================================== */
  {
    id: 'gerunds-infinitives',
    track: 'grammar',
    order: 14,
    title: 'Gerunds & Infinitives',
    subtitle: 'Doing atau to do?',
    level: 'B1',
    minutes: 9,
    icon: 'layers',
    accent: 'violet',
    description: 'Memilih bentuk V-ing (gerund) atau to + V-base (infinitive) setelah kata kerja, preposisi, dan kata sifat.',
    objectives: [
      'Menghafal kata kerja yang diikuti gerund atau infinitive',
      'Memakai gerund setelah preposisi',
      'Memahami perubahan makna pada stop, remember, dan try'
    ],
    sections: [
      {
        title: 'Kata kerja + gerund / infinitive',
        icon: 'layers',
        table: {
          headers: ['Diikuti V-ing', 'Diikuti to + V-base', 'Keduanya (makna sama)'],
          rows: [
            ['enjoy, finish, avoid', 'want, decide, hope', 'like, love, hate'],
            ['mind, suggest, keep', 'plan, agree, refuse', 'start, begin, continue'],
            ['practise, consider', 'need, learn, promise', 'prefer']
          ]
        },
        examples: [
          { en: 'I enjoy reading novels.', id: 'Saya senang membaca novel.' },
          { en: 'She decided to study abroad.', id: 'Dia memutuskan untuk kuliah di luar negeri.' }
        ]
      },
      {
        title: 'Setelah preposisi selalu V-ing',
        icon: 'braces',
        bullets: [
          'interested in learning, good at speaking, tired of waiting',
          'look forward to meeting you (to di sini preposisi)',
          'before leaving, after finishing, without saying'
        ],
        tip: '“I look forward to hear from you” salah. Yang benar: “I look forward to hearing from you.”'
      },
      {
        title: 'Makna berubah',
        icon: 'rotate',
        examples: [
          { en: 'He stopped smoking.', id: 'Dia berhenti merokok (tidak merokok lagi).' },
          { en: 'He stopped to smoke.', id: 'Dia berhenti (dari kegiatan lain) untuk merokok.' },
          { en: 'Remember to lock the door.', id: 'Ingat untuk mengunci pintu (nanti).' },
          { en: 'I remember locking the door.', id: 'Saya ingat sudah mengunci pintu (tadi).' }
        ]
      }
    ],
    quiz: [
      { id: 'gi-1', type: 'mcq', prompt: 'I really enjoy ___ in the morning.', options: ['to run', 'running', 'run', 'ran'], answer: 'b', explanation: 'Enjoy selalu diikuti gerund: enjoy running.' },
      { id: 'gi-2', type: 'mcq', prompt: 'They decided ___ a new laptop.', options: ['buying', 'buy', 'to buy', 'bought'], answer: 'c', explanation: 'Decide diikuti to-infinitive: decided to buy.' },
      { id: 'gi-3', type: 'type', prompt: 'She is interested in ___ (learn) Japanese.', placeholder: 'Tulis bentuk yang tepat', answers: ['learning'], explanation: 'Setelah preposisi (in) memakai V-ing: learning.' },
      { id: 'gi-4', type: 'mcq', prompt: 'I look forward to ___ from you.', options: ['hear', 'hearing', 'to hear', 'heard'], answer: 'b', explanation: 'To dalam look forward to adalah preposisi, jadi diikuti V-ing.' },
      { id: 'gi-5', type: 'mcq', prompt: 'Would you mind ___ the window?', options: ['to open', 'open', 'opening', 'opened'], answer: 'c', explanation: 'Mind diikuti gerund: Would you mind opening …?' },
      { id: 'gi-6', type: 'mcq', prompt: 'He promised ___ late again.', options: ['not to be', 'not being', 'to not being', 'not be'], answer: 'a', explanation: 'Promise + to-infinitive; bentuk negatifnya not to be.' },
      { id: 'gi-7', type: 'type', prompt: 'We should avoid ___ (eat) too much sugar.', placeholder: 'Tulis bentuk yang tepat', answers: ['eating'], explanation: 'Avoid diikuti gerund: avoid eating.' },
      { id: 'gi-8', type: 'mcq', prompt: '“I stopped to buy some coffee.” Artinya …', options: ['Saya berhenti minum kopi.', 'Saya berhenti sebentar untuk membeli kopi.', 'Saya lupa membeli kopi.', 'Saya selalu membeli kopi.'], answer: 'b', explanation: 'Stop + to-infinitive = berhenti untuk melakukan sesuatu.' }
    ]
  },

  /* =====================================================
     GRAMMAR B1 — PAST PERFECT
     ===================================================== */
  {
    id: 'past-perfect',
    track: 'grammar',
    order: 15,
    title: 'Past Perfect',
    subtitle: 'Masa lalu sebelum masa lalu',
    level: 'B1',
    minutes: 8,
    icon: 'corner-down',
    accent: 'violet',
    description: 'Menunjukkan kejadian yang terjadi lebih dulu sebelum kejadian lain di masa lalu.',
    objectives: [
      'Membentuk had + V-past participle',
      'Mengurutkan dua kejadian lampau dengan before, after, by the time',
      'Membedakan Past Perfect dan Past Simple'
    ],
    sections: [
      {
        title: 'Rumus inti',
        icon: 'braces',
        formula: [
          { label: 'Positif', value: 'S + had + V-past participle' },
          { label: 'Negatif', value: 'S + hadn’t + V-past participle' },
          { label: 'Pertanyaan', value: 'Had + S + V-past participle?' }
        ],
        tip: 'Had dipakai untuk semua subjek. Bentuk singkat: I’d, she’d, they’d.'
      },
      {
        title: 'Dua kejadian di masa lalu',
        icon: 'history',
        body: [
          'Past Perfect menandai kejadian yang lebih dulu. Kejadian yang lebih belakangan memakai Past Simple.'
        ],
        examples: [
          { en: 'When we arrived, the film had already started.', id: 'Saat kami tiba, filmnya sudah dimulai (film dimulai lebih dulu).' },
          { en: 'She had never flown before she went to Japan.', id: 'Dia belum pernah naik pesawat sebelum pergi ke Jepang.' },
          { en: 'By the time I called, he had left.', id: 'Saat saya menelepon, dia sudah pergi.' }
        ],
        tip: 'Penanda umum: already, never, before, after, by the time, just.'
      }
    ],
    quiz: [
      { id: 'pp2-1', type: 'mcq', prompt: 'When I got to the station, the train ___.', options: ['already left', 'had already left', 'has already left', 'was already leave'], answer: 'b', explanation: 'Kereta berangkat lebih dulu daripada saya tiba: had already left.' },
      { id: 'pp2-2', type: 'type', prompt: 'She ___ (finish) her homework before she went out.', placeholder: 'Tulis had + V-past participle', answers: ['had finished'], explanation: 'Kejadian lebih dulu: had finished.' },
      { id: 'pp2-3', type: 'mcq', prompt: 'I didn’t recognise him because he ___ a lot.', options: ['changed', 'had changed', 'has changed', 'was change'], answer: 'b', explanation: 'Perubahan terjadi sebelum saya bertemu dengannya: had changed.' },
      { id: 'pp2-4', type: 'mcq', prompt: '___ you ever seen snow before you moved to Korea?', options: ['Have', 'Did', 'Had', 'Were'], answer: 'c', explanation: 'Pertanyaan tentang pengalaman sebelum kejadian lampau: Had you ever seen …?' },
      { id: 'pp2-5', type: 'mcq', prompt: 'By the time the teacher arrived, we ___ the room.', options: ['cleaned', 'had cleaned', 'have cleaned', 'were cleaned'], answer: 'b', explanation: 'By the time + Past Simple, lalu kejadian sebelumnya memakai Past Perfect.' },
      { id: 'pp2-6', type: 'type', prompt: 'They ___ (not / eat) anything, so they were very hungry.', placeholder: 'Tulis bentuk negatif', answers: ['hadn\'t eaten', 'had not eaten'], explanation: 'Negatif Past Perfect: hadn’t eaten.' },
      { id: 'pp2-7', type: 'mcq', prompt: 'After she ___ the email, she turned off the computer.', options: ['had sent', 'has sent', 'sends', 'was sent'], answer: 'a', explanation: 'Mengirim email terjadi sebelum mematikan komputer: had sent.' },
      { id: 'pp2-8', type: 'mcq', prompt: 'Manakah kejadian yang terjadi lebih dulu? “When I woke up, my mother had made breakfast.”', options: ['Saya bangun', 'Ibu membuat sarapan', 'Keduanya bersamaan', 'Tidak bisa ditentukan'], answer: 'b', explanation: 'Bagian dengan had made (Past Perfect) terjadi lebih dulu.' }
    ]
  },

  /* =====================================================
     GRAMMAR B2 — MODALS OF DEDUCTION
     ===================================================== */
  {
    id: 'modals-deduction',
    track: 'grammar',
    order: 19,
    title: 'Modals of Deduction',
    subtitle: 'Must, might, can’t — menebak dengan yakin',
    level: 'B2',
    minutes: 9,
    icon: 'search',
    accent: 'violet',
    description: 'Menyatakan tingkat keyakinan tentang masa kini dan masa lalu dengan must, may/might/could, dan can’t.',
    objectives: [
      'Memilih modal sesuai tingkat keyakinan',
      'Membuat dugaan tentang masa lalu dengan modal + have + V-past participle',
      'Menghindari kesalahan mustn’t untuk dugaan'
    ],
    sections: [
      {
        title: 'Skala keyakinan (masa kini)',
        icon: 'target',
        table: {
          headers: ['Modal', 'Keyakinan', 'Contoh'],
          rows: [
            ['must', '± 90% yakin benar', 'She must be tired. She worked all night.'],
            ['may / might / could', '± 50% mungkin', 'He might be at the library.'],
            ['can’t', '± 90% yakin tidak', 'That can’t be Rina. She’s in Bali.']
          ]
        },
        tip: 'Untuk dugaan negatif pakai can’t, bukan mustn’t. Mustn’t berarti larangan.'
      },
      {
        title: 'Dugaan tentang masa lalu',
        icon: 'history',
        formula: [
          { label: 'Hampir pasti terjadi', value: 'must have + V-past participle' },
          { label: 'Mungkin terjadi', value: 'might/may/could have + V-past participle' },
          { label: 'Hampir pasti tidak terjadi', value: 'can’t/couldn’t have + V-past participle' }
        ],
        examples: [
          { en: 'The ground is wet. It must have rained.', id: 'Tanahnya basah. Pasti tadi hujan.' },
          { en: 'He didn’t answer. He might have been asleep.', id: 'Dia tidak menjawab. Mungkin dia sedang tidur.' },
          { en: 'She can’t have finished already — she only started ten minutes ago.', id: 'Dia tidak mungkin sudah selesai, dia baru mulai sepuluh menit lalu.' }
        ]
      }
    ],
    quiz: [
      { id: 'md-1', type: 'mcq', prompt: 'He has three cars and a villa. He ___ be rich.', options: ['can’t', 'must', 'might not', 'mustn’t'], answer: 'b', explanation: 'Bukti kuat menunjukkan dugaan hampir pasti benar: must.' },
      { id: 'md-2', type: 'mcq', prompt: 'That ___ be Budi. He’s in Australia this month.', options: ['must', 'can’t', 'might', 'should'], answer: 'b', explanation: 'Hampir pasti tidak benar: can’t.' },
      { id: 'md-3', type: 'mcq', prompt: 'I’m not sure where Sari is. She ___ be in the canteen.', options: ['must', 'can’t', 'might', 'mustn’t'], answer: 'c', explanation: 'Tidak yakin (sekitar 50%): might.' },
      { id: 'md-4', type: 'type', prompt: 'The streets are wet. It must ___ rained last night.', placeholder: 'Tulis satu kata', answers: ['have'], explanation: 'Dugaan masa lalu: must have + V-past participle.' },
      { id: 'md-5', type: 'mcq', prompt: 'She got 100 on the test. She ___ studied very hard.', options: ['must have', 'can’t have', 'must', 'might not'], answer: 'a', explanation: 'Dugaan kuat tentang masa lalu: must have studied.' },
      { id: 'md-6', type: 'mcq', prompt: 'He ___ seen the message — his phone was turned off all day.', options: ['must have', 'can’t have', 'might have', 'should have'], answer: 'b', explanation: 'Hampir pasti tidak terjadi: can’t have seen.' },
      { id: 'md-7', type: 'type', prompt: 'I can’t find my keys. I ___ have left them at the office. (mungkin)', placeholder: 'might / must / can’t', answers: ['might', 'may', 'could'], explanation: 'Kemungkinan (tidak pasti): might/may/could have left.' },
      { id: 'md-8', type: 'mcq', prompt: 'Pilih kalimat dugaan yang benar.', options: ['He mustn’t be at home; the lights are off.', 'He can’t be at home; the lights are off.', 'He can’t to be at home.', 'He must not being at home.'], answer: 'b', explanation: 'Dugaan negatif memakai can’t + V-base.' }
    ]
  },

  /* =====================================================
     GRAMMAR B2 — WISHES & REGRETS
     ===================================================== */
  {
    id: 'wishes-regrets',
    track: 'grammar',
    order: 20,
    title: 'Wishes & Regrets',
    subtitle: 'I wish, if only, should have',
    level: 'B2',
    minutes: 9,
    icon: 'sparkles',
    accent: 'violet',
    description: 'Mengungkapkan keinginan yang tidak nyata dan penyesalan tentang masa lalu.',
    objectives: [
      'Memakai wish/if only + Past Simple untuk masa kini',
      'Memakai wish/if only + Past Perfect untuk penyesalan masa lalu',
      'Memakai should have dan wish … would'
    ],
    sections: [
      {
        title: 'Tiga pola wish',
        icon: 'sparkles',
        table: {
          headers: ['Waktu', 'Pola', 'Contoh'],
          rows: [
            ['Sekarang (tidak nyata)', 'wish + Past Simple', 'I wish I had more time.'],
            ['Masa lalu (penyesalan)', 'wish + Past Perfect', 'I wish I had studied harder.'],
            ['Keluhan tentang orang lain', 'wish + would + V-base', 'I wish you would stop talking.']
          ]
        },
        tip: 'Dalam gaya formal, were dipakai untuk semua subjek: “I wish I were taller.”'
      },
      {
        title: 'If only & should have',
        icon: 'message-circle',
        bullets: [
          'If only lebih kuat daripada I wish: “If only I knew the answer!”',
          'Should have + V-past participle = seharusnya (tetapi tidak dilakukan).',
          'Shouldn’t have + V-past participle = seharusnya tidak (tetapi dilakukan).'
        ],
        examples: [
          { en: 'I should have brought an umbrella.', id: 'Seharusnya saya membawa payung.' },
          { en: 'You shouldn’t have told her the secret.', id: 'Seharusnya kamu tidak memberitahunya rahasia itu.' }
        ]
      }
    ],
    quiz: [
      { id: 'wr-1', type: 'mcq', prompt: 'I wish I ___ how to swim. (Saya tidak bisa berenang.)', options: ['know', 'knew', 'had known', 'will know'], answer: 'b', explanation: 'Keinginan tidak nyata tentang masa kini: wish + Past Simple.' },
      { id: 'wr-2', type: 'mcq', prompt: 'I failed the test. I wish I ___ more.', options: ['studied', 'study', 'had studied', 'would study'], answer: 'c', explanation: 'Penyesalan tentang masa lalu: wish + Past Perfect.' },
      { id: 'wr-3', type: 'type', prompt: 'If only I ___ (be) taller! (gaya formal)', placeholder: 'Tulis satu kata', answers: ['were', 'was'], explanation: 'Pola masa kini: if only + Past Simple; gaya formal memakai were.' },
      { id: 'wr-4', type: 'mcq', prompt: 'I wish my neighbour ___ his music down. It’s so loud!', options: ['turns', 'would turn', 'had turned', 'turned'], answer: 'b', explanation: 'Keluhan tentang kebiasaan orang lain: wish + would + V-base.' },
      { id: 'wr-5', type: 'mcq', prompt: 'It’s raining and I’m wet. I ___ brought an umbrella.', options: ['should have', 'must have', 'can’t have', 'would'], answer: 'a', explanation: 'Penyesalan (seharusnya, tetapi tidak): should have brought.' },
      { id: 'wr-6', type: 'type', prompt: 'You ___ have eaten so much. Now you feel sick. (seharusnya tidak)', placeholder: 'Tulis satu kata', answers: ['shouldn\'t', 'should not'], explanation: 'Shouldn’t have + V-past participle = seharusnya tidak.' },
      { id: 'wr-7', type: 'mcq', prompt: '“I wish I had gone to the concert.” Artinya …', options: ['Saya akan pergi ke konser.', 'Saya menyesal tidak pergi ke konser.', 'Saya senang pergi ke konser.', 'Saya sedang di konser.'], answer: 'b', explanation: 'Wish + Past Perfect = penyesalan tentang masa lalu.' },
      { id: 'wr-8', type: 'mcq', prompt: 'If only we ___ more money now — we could buy that house.', options: ['have', 'had', 'had had', 'would have'], answer: 'b', explanation: 'Masa kini yang tidak nyata: if only + Past Simple.' }
    ]
  },

  /* =====================================================
     VOCABULARY A1 — CLOTHES & COLOURS
     ===================================================== */
  {
    id: 'clothes-colors',
    track: 'vocabulary',
    order: 4,
    title: 'Clothes & Colours',
    subtitle: 'Pakaian, warna, dan ukuran',
    level: 'A1',
    minutes: 7,
    icon: 'shirt',
    accent: 'teal',
    description: 'Kosakata untuk menyebut pakaian, warna, dan ukuran saat berbelanja atau menggambarkan penampilan.',
    objectives: [
      'Menyebut jenis pakaian dan aksesori umum',
      'Memakai kata kerja wear, put on, take off, try on',
      'Menanyakan ukuran dan warna saat berbelanja'
    ],
    sections: [
      {
        title: 'Pakaian sehari-hari',
        icon: 'shirt',
        bullets: [
          'shirt = kemeja; T-shirt = kaus; jacket = jaket',
          'trousers = celana panjang; jeans = celana jin; skirt = rok',
          'shoes = sepatu; sandals = sandal; socks = kaus kaki',
          'Trousers, jeans, dan shorts selalu jamak: “My jeans are blue.”'
        ]
      },
      {
        title: 'Kata kerja & ukuran',
        icon: 'shopping-bag',
        bullets: [
          'wear = memakai (keadaan); put on = mengenakan (aksi); take off = melepas',
          'try on = mencoba (pakaian) di toko',
          'It fits = ukurannya pas; It suits you = cocok/serasi denganmu',
          'Ukuran: small (S), medium (M), large (L)'
        ],
        examples: [
          { en: 'Can I try on this jacket in a medium?', id: 'Bolehkah saya mencoba jaket ini ukuran M?' },
          { en: 'That colour really suits you.', id: 'Warna itu sangat cocok untukmu.' }
        ]
      }
    ],
    vocab: [
      { word: 'trousers', phonetic: '/ˈtraʊzərz/', pos: 'noun', meaning: 'celana panjang', example: 'He is wearing black trousers.', exampleId: 'Dia memakai celana panjang hitam.', collocation: 'a pair of trousers' },
      { word: 'sleeve', phonetic: '/sliːv/', pos: 'noun', meaning: 'lengan baju', example: 'This shirt has long sleeves.', exampleId: 'Kemeja ini berlengan panjang.', collocation: 'short sleeves' },
      { word: 'try on', phonetic: '/traɪ ɒn/', pos: 'phrasal verb', meaning: 'mencoba (pakaian)', example: 'Can I try on these shoes?', exampleId: 'Bolehkah saya mencoba sepatu ini?', collocation: 'try on a dress' },
      { word: 'put on', phonetic: '/pʊt ɒn/', pos: 'phrasal verb', meaning: 'mengenakan', example: 'Put on your jacket. It’s cold.', exampleId: 'Pakai jaketmu. Dingin.', collocation: 'put on your shoes' },
      { word: 'take off', phonetic: '/teɪk ɒf/', pos: 'phrasal verb', meaning: 'melepas (pakaian)', example: 'Please take off your shoes.', exampleId: 'Tolong lepas sepatumu.', collocation: 'take off your hat' },
      { word: 'fit', phonetic: '/fɪt/', pos: 'verb', meaning: 'pas (ukuran)', example: 'These jeans don’t fit me.', exampleId: 'Celana jin ini tidak pas untuk saya.', collocation: 'fit perfectly' },
      { word: 'suit', phonetic: '/suːt/', pos: 'verb', meaning: 'cocok, serasi', example: 'Blue really suits you.', exampleId: 'Warna biru sangat cocok untukmu.', collocation: 'suit someone well' },
      { word: 'striped', phonetic: '/straɪpt/', pos: 'adjective', meaning: 'bergaris', example: 'She bought a striped scarf.', exampleId: 'Dia membeli syal bergaris.', collocation: 'a striped shirt' }
    ],
    quiz: [
      { id: 'cc-1', type: 'mcq', prompt: 'It’s cold outside. ___ your jacket.', options: ['Put on', 'Take off', 'Try on', 'Turn on'], answer: 'a', explanation: 'Put on = mengenakan pakaian.' },
      { id: 'cc-2', type: 'mcq', prompt: 'Apa arti “socks”?', options: ['Sepatu', 'Kaus kaki', 'Sarung tangan', 'Syal'], answer: 'b', explanation: 'Socks = kaus kaki.' },
      { id: 'cc-3', type: 'mcq', prompt: 'Excuse me, can I ___ this dress in the fitting room?', options: ['wear', 'try on', 'put off', 'fit'], answer: 'b', explanation: 'Try on = mencoba pakaian di toko.' },
      { id: 'cc-4', type: 'type', prompt: 'These shoes are too small. They don’t ___ me.', placeholder: 'Tulis satu kata', answers: ['fit'], explanation: 'Fit = ukurannya pas.' },
      { id: 'cc-5', type: 'mcq', prompt: 'My new jeans ___ very comfortable.', options: ['is', 'are', 'am', 'be'], answer: 'b', explanation: 'Jeans selalu jamak, jadi memakai are.' },
      { id: 'cc-6', type: 'mcq', prompt: 'Red really ___ you. You look great!', options: ['fits', 'suits', 'wears', 'tries'], answer: 'b', explanation: 'Suit = cocok/serasi dengan penampilan seseorang.' },
      { id: 'cc-7', type: 'type', prompt: 'Please ___ off your shoes before entering the mosque.', placeholder: 'Tulis satu kata', answers: ['take'], explanation: 'Take off = melepas pakaian/sepatu.' },
      { id: 'cc-8', type: 'mcq', prompt: 'A shirt with lines on it is ___.', options: ['striped', 'spotted', 'plain', 'checked'], answer: 'a', explanation: 'Striped = bergaris.' }
    ]
  },

  /* =====================================================
     VOCABULARY A1 — WEATHER & SEASONS
     ===================================================== */
  {
    id: 'weather-seasons',
    track: 'vocabulary',
    order: 5,
    title: 'Weather & Seasons',
    subtitle: 'Cuaca, suhu, dan musim',
    level: 'A1',
    minutes: 7,
    icon: 'cloud',
    accent: 'teal',
    description: 'Kosakata untuk membicarakan cuaca hari ini, suhu, dan musim di berbagai negara.',
    objectives: [
      'Menggambarkan cuaca dengan kata sifat (sunny, cloudy, rainy)',
      'Menanyakan dan menjawab “What’s the weather like?”',
      'Menyebut musim: dry season, rainy season, dan empat musim'
    ],
    sections: [
      {
        title: 'Menggambarkan cuaca',
        icon: 'sun',
        bullets: [
          'sunny = cerah; cloudy = berawan; rainy = hujan; windy = berangin',
          'hot / warm / cool / cold = panas / hangat / sejuk / dingin',
          'It’s raining = sedang hujan; It’s humid = lembap'
        ],
        examples: [
          { en: 'What’s the weather like in Bandung today?', id: 'Bagaimana cuaca di Bandung hari ini?' },
          { en: 'It’s cloudy and cool.', id: 'Berawan dan sejuk.' }
        ]
      },
      {
        title: 'Musim',
        icon: 'calendar',
        bullets: [
          'Indonesia: the dry season (kemarau) dan the rainy season (hujan)',
          'Empat musim: spring, summer, autumn (US: fall), winter',
          'Memakai in: in winter, in the rainy season'
        ]
      }
    ],
    vocab: [
      { word: 'sunny', phonetic: '/ˈsʌni/', pos: 'adjective', meaning: 'cerah, banyak sinar matahari', example: 'It’s a sunny day.', exampleId: 'Hari ini cerah.', collocation: 'sunny weather' },
      { word: 'cloudy', phonetic: '/ˈklaʊdi/', pos: 'adjective', meaning: 'berawan', example: 'The sky is cloudy this morning.', exampleId: 'Langit berawan pagi ini.', collocation: 'cloudy skies' },
      { word: 'humid', phonetic: '/ˈhjuːmɪd/', pos: 'adjective', meaning: 'lembap', example: 'Jakarta is hot and humid.', exampleId: 'Jakarta panas dan lembap.', collocation: 'hot and humid' },
      { word: 'storm', phonetic: '/stɔːrm/', pos: 'noun', meaning: 'badai', example: 'A big storm hit the coast.', exampleId: 'Badai besar melanda pantai.', collocation: 'a thunderstorm' },
      { word: 'temperature', phonetic: '/ˈtemprətʃər/', pos: 'noun', meaning: 'suhu', example: 'The temperature is 30 degrees.', exampleId: 'Suhunya 30 derajat.', collocation: 'high temperature' },
      { word: 'forecast', phonetic: '/ˈfɔːrkæst/', pos: 'noun', meaning: 'prakiraan (cuaca)', example: 'The forecast says it will rain.', exampleId: 'Prakiraan cuaca mengatakan akan hujan.', collocation: 'the weather forecast' },
      { word: 'season', phonetic: '/ˈsiːzən/', pos: 'noun', meaning: 'musim', example: 'The rainy season starts in November.', exampleId: 'Musim hujan dimulai pada bulan November.', collocation: 'the dry season' },
      { word: 'freezing', phonetic: '/ˈfriːzɪŋ/', pos: 'adjective', meaning: 'sangat dingin, membeku', example: 'It’s freezing outside!', exampleId: 'Di luar dingin sekali!', collocation: 'freezing cold' }
    ],
    quiz: [
      { id: 'ws-1', type: 'mcq', prompt: 'What’s the weather ___ today?', options: ['as', 'like', 'how', 'about'], answer: 'b', explanation: 'Ungkapan tetap: What’s the weather like?' },
      { id: 'ws-2', type: 'mcq', prompt: 'There are no clouds and the sun is shining. It’s ___.', options: ['cloudy', 'sunny', 'windy', 'foggy'], answer: 'b', explanation: 'Sunny = cerah.' },
      { id: 'ws-3', type: 'type', prompt: 'Take an umbrella. It’s ___ outside. (sedang hujan)', placeholder: 'Tulis satu kata', answers: ['raining', 'rainy'], explanation: 'It’s raining = sedang hujan.' },
      { id: 'ws-4', type: 'mcq', prompt: 'Apa arti “humid”?', options: ['Kering', 'Lembap', 'Berangin', 'Dingin'], answer: 'b', explanation: 'Humid = lembap (udara mengandung banyak uap air).' },
      { id: 'ws-5', type: 'mcq', prompt: 'In Indonesia, the ___ season usually starts in October or November.', options: ['rainy', 'snowy', 'autumn', 'spring'], answer: 'a', explanation: 'Musim hujan (rainy season) umumnya dimulai Oktober–November.' },
      { id: 'ws-6', type: 'mcq', prompt: 'Let’s check the weather ___ before we go hiking.', options: ['forecast', 'season', 'storm', 'temperature'], answer: 'a', explanation: 'Weather forecast = prakiraan cuaca.' },
      { id: 'ws-7', type: 'type', prompt: 'Spring, summer, ___, winter. (musim gugur, ejaan British)', placeholder: 'Tulis satu kata', answers: ['autumn', 'fall'], explanation: 'Musim gugur: autumn (British) atau fall (American).' },
      { id: 'ws-8', type: 'mcq', prompt: 'It’s minus five degrees! It’s ___.', options: ['warm', 'freezing', 'humid', 'sunny'], answer: 'b', explanation: 'Freezing = sangat dingin sampai membeku.' }
    ]
  },

  /* =====================================================
     VOCABULARY A2 — HOBBIES & FREE TIME
     ===================================================== */
  {
    id: 'hobbies-free-time',
    track: 'vocabulary',
    order: 9,
    title: 'Hobbies & Free Time',
    subtitle: 'Hobi, olahraga, dan waktu luang',
    level: 'A2',
    minutes: 7,
    icon: 'palette',
    accent: 'teal',
    description: 'Kosakata untuk menceritakan hobi, olahraga, dan kegiatan di waktu luang.',
    objectives: [
      'Memakai play, go, dan do dengan olahraga yang tepat',
      'Mengungkapkan suka dan tidak suka (be into, be keen on)',
      'Mengajak teman melakukan kegiatan bersama'
    ],
    sections: [
      {
        title: 'Play, go, atau do?',
        icon: 'grid',
        table: {
          headers: ['Kata kerja', 'Dipakai untuk', 'Contoh'],
          rows: [
            ['play', 'permainan dengan bola/lawan', 'play football, play chess, play badminton'],
            ['go', 'kegiatan berakhiran -ing', 'go swimming, go cycling, go hiking'],
            ['do', 'kegiatan individu/latihan', 'do yoga, do karate, do exercise']
          ]
        }
      },
      {
        title: 'Suka & tidak suka',
        icon: 'heart',
        bullets: [
          'I’m into photography. = Saya suka fotografi.',
          'She’s keen on drawing. = Dia gemar menggambar.',
          'I can’t stand horror films. = Saya tidak tahan film horor.',
          'Mengajak: “Do you fancy going to the cinema?” “How about playing badminton?”'
        ]
      }
    ],
    vocab: [
      { word: 'hobby', phonetic: '/ˈhɒbi/', pos: 'noun', meaning: 'hobi, kegemaran', example: 'My hobby is painting.', exampleId: 'Hobi saya melukis.', collocation: 'take up a hobby' },
      { word: 'be into', phonetic: '/bi ˈɪntuː/', pos: 'phrase', meaning: 'menyukai, tertarik pada', example: 'I’m really into K-dramas.', exampleId: 'Saya sangat suka drama Korea.', collocation: 'be really into something' },
      { word: 'keen on', phonetic: '/kiːn ɒn/', pos: 'adjective', meaning: 'gemar', example: 'He’s keen on cooking.', exampleId: 'Dia gemar memasak.', collocation: 'very keen on' },
      { word: 'can’t stand', phonetic: '/kɑːnt stænd/', pos: 'phrase', meaning: 'tidak tahan, sangat tidak suka', example: 'I can’t stand waiting in long queues.', exampleId: 'Saya tidak tahan menunggu di antrean panjang.', collocation: 'can’t stand the noise' },
      { word: 'take up', phonetic: '/teɪk ʌp/', pos: 'phrasal verb', meaning: 'mulai menekuni (hobi)', example: 'She took up yoga last year.', exampleId: 'Dia mulai menekuni yoga tahun lalu.', collocation: 'take up a sport' },
      { word: 'spare time', phonetic: '/speər taɪm/', pos: 'noun', meaning: 'waktu luang', example: 'What do you do in your spare time?', exampleId: 'Apa yang kamu lakukan di waktu luang?', collocation: 'in my spare time' },
      { word: 'hang out', phonetic: '/hæŋ aʊt/', pos: 'phrasal verb', meaning: 'nongkrong, menghabiskan waktu bersama', example: 'We often hang out at the café.', exampleId: 'Kami sering nongkrong di kafe.', collocation: 'hang out with friends' },
      { word: 'fancy', phonetic: '/ˈfænsi/', pos: 'verb', meaning: 'ingin, berminat (informal)', example: 'Do you fancy going for a walk?', exampleId: 'Kamu mau jalan-jalan?', collocation: 'fancy a coffee' }
    ],
    quiz: [
      { id: 'hob-1', type: 'mcq', prompt: 'My brother ___ badminton every Saturday.', options: ['goes', 'does', 'plays', 'makes'], answer: 'c', explanation: 'Permainan dengan lawan memakai play.' },
      { id: 'hob-2', type: 'mcq', prompt: 'Let’s ___ swimming this afternoon.', options: ['play', 'go', 'do', 'make'], answer: 'b', explanation: 'Kegiatan berakhiran -ing memakai go: go swimming.' },
      { id: 'hob-3', type: 'type', prompt: 'She ___ yoga three times a week.', placeholder: 'play / go / do', answers: ['does'], explanation: 'Yoga memakai do; subjek she: does yoga.' },
      { id: 'hob-4', type: 'mcq', prompt: 'I can’t ___ horror movies. They scare me.', options: ['stand', 'take', 'keep', 'fancy'], answer: 'a', explanation: 'Can’t stand = sangat tidak suka/tidak tahan.' },
      { id: 'hob-5', type: 'mcq', prompt: 'What do you do in your ___ time?', options: ['spare', 'empty', 'free of', 'busy'], answer: 'a', explanation: 'Spare time = waktu luang.' },
      { id: 'hob-6', type: 'mcq', prompt: 'He decided to take ___ photography as a new hobby.', options: ['off', 'up', 'on', 'over'], answer: 'b', explanation: 'Take up = mulai menekuni hobi baru.' },
      { id: 'hob-7', type: 'type', prompt: 'Do you ___ going to the cinema tonight? (informal: mau/ingin)', placeholder: 'Tulis satu kata', answers: ['fancy', 'want'], explanation: 'Do you fancy …? = Kamu mau …? (informal).' },
      { id: 'hob-8', type: 'mcq', prompt: '“I’m really into music.” Artinya …', options: ['Saya sedang mendengarkan musik.', 'Saya sangat menyukai musik.', 'Saya tidak suka musik.', 'Saya belajar musik.'], answer: 'b', explanation: 'Be into = sangat menyukai sesuatu.' }
    ]
  },

  /* =====================================================
     VOCABULARY A2 — CITY & DIRECTIONS
     ===================================================== */
  {
    id: 'city-directions',
    track: 'vocabulary',
    order: 10,
    title: 'City & Directions',
    subtitle: 'Tempat di kota dan menunjukkan arah',
    level: 'A2',
    minutes: 8,
    icon: 'route',
    accent: 'teal',
    description: 'Kosakata tempat umum di kota dan ungkapan untuk bertanya serta memberi petunjuk arah.',
    objectives: [
      'Menyebut tempat umum di kota',
      'Bertanya arah dengan sopan',
      'Memberi petunjuk: turn left, go straight, it’s on your right'
    ],
    sections: [
      {
        title: 'Bertanya arah',
        icon: 'message-circle',
        bullets: [
          'Excuse me, how do I get to the train station?',
          'Is there a pharmacy near here?',
          'Could you tell me the way to the museum?'
        ]
      },
      {
        title: 'Memberi petunjuk',
        icon: 'route',
        bullets: [
          'Go straight on / along this road = jalan lurus',
          'Turn left / right at the traffic lights = belok kiri/kanan di lampu lalu lintas',
          'Take the second turning on the left = ambil belokan kedua di kiri',
          'It’s on your right / opposite the bank / at the corner'
        ],
        examples: [
          { en: 'Go straight on, then turn right at the roundabout.', id: 'Jalan lurus, lalu belok kanan di bundaran.' },
          { en: 'The post office is opposite the mosque.', id: 'Kantor pos berada di seberang masjid.' }
        ]
      }
    ],
    vocab: [
      { word: 'crossroads', phonetic: '/ˈkrɒsrəʊdz/', pos: 'noun', meaning: 'perempatan', example: 'Turn left at the crossroads.', exampleId: 'Belok kiri di perempatan.', collocation: 'at the crossroads' },
      { word: 'traffic lights', phonetic: '/ˈtræfɪk laɪts/', pos: 'noun', meaning: 'lampu lalu lintas', example: 'Stop at the traffic lights.', exampleId: 'Berhenti di lampu lalu lintas.', collocation: 'at the traffic lights' },
      { word: 'roundabout', phonetic: '/ˈraʊndəbaʊt/', pos: 'noun', meaning: 'bundaran', example: 'Take the first exit at the roundabout.', exampleId: 'Ambil jalan keluar pertama di bundaran.', collocation: 'a busy roundabout' },
      { word: 'opposite', phonetic: '/ˈɒpəzɪt/', pos: 'preposition', meaning: 'di seberang', example: 'The bank is opposite the hotel.', exampleId: 'Bank berada di seberang hotel.', collocation: 'directly opposite' },
      { word: 'corner', phonetic: '/ˈkɔːrnər/', pos: 'noun', meaning: 'sudut, pojok (jalan)', example: 'The café is on the corner.', exampleId: 'Kafe itu ada di sudut jalan.', collocation: 'turn the corner' },
      { word: 'pedestrian', phonetic: '/pəˈdestriən/', pos: 'noun', meaning: 'pejalan kaki', example: 'Drivers must stop for pedestrians.', exampleId: 'Pengemudi harus berhenti untuk pejalan kaki.', collocation: 'pedestrian crossing' },
      { word: 'landmark', phonetic: '/ˈlændmɑːrk/', pos: 'noun', meaning: 'penanda/bangunan terkenal', example: 'Monas is a famous landmark in Jakarta.', exampleId: 'Monas adalah penanda terkenal di Jakarta.', collocation: 'a local landmark' },
      { word: 'get lost', phonetic: '/ɡet lɒst/', pos: 'phrase', meaning: 'tersesat', example: 'We got lost in the old town.', exampleId: 'Kami tersesat di kota tua.', collocation: 'easy to get lost' }
    ],
    quiz: [
      { id: 'cd-1', type: 'mcq', prompt: 'Excuse me, how do I ___ to the station?', options: ['go', 'get', 'take', 'arrive'], answer: 'b', explanation: 'Ungkapan tetap: How do I get to …?' },
      { id: 'cd-2', type: 'mcq', prompt: 'Turn left ___ the traffic lights.', options: ['in', 'at', 'on', 'to'], answer: 'b', explanation: 'At the traffic lights = di lampu lalu lintas.' },
      { id: 'cd-3', type: 'type', prompt: 'Go ___ on for 200 metres. (lurus)', placeholder: 'Tulis satu kata', answers: ['straight'], explanation: 'Go straight on = jalan lurus.' },
      { id: 'cd-4', type: 'mcq', prompt: 'Apa arti “roundabout”?', options: ['Perempatan', 'Bundaran', 'Jembatan', 'Terowongan'], answer: 'b', explanation: 'Roundabout = bundaran.' },
      { id: 'cd-5', type: 'mcq', prompt: 'The mosque is ___ the school. You just cross the road.', options: ['opposite', 'behind', 'inside', 'above'], answer: 'a', explanation: 'Opposite = di seberang (cukup menyeberang jalan).' },
      { id: 'cd-6', type: 'mcq', prompt: 'We didn’t have a map and we got ___.', options: ['lost', 'lose', 'losing', 'loss'], answer: 'a', explanation: 'Get lost = tersesat.' },
      { id: 'cd-7', type: 'type', prompt: 'People walking on the street are called ___.', placeholder: 'Tulis satu kata (jamak)', answers: ['pedestrians'], explanation: 'Pedestrian = pejalan kaki; jamaknya pedestrians.' },
      { id: 'cd-8', type: 'mcq', prompt: 'Take the second turning ___ the right.', options: ['in', 'at', 'on', 'by'], answer: 'c', explanation: 'On the right / on the left = di sebelah kanan/kiri.' }
    ]
  },

  /* =====================================================
     VOCABULARY B1 — EDUCATION & CAMPUS
     ===================================================== */
  {
    id: 'education-campus',
    track: 'vocabulary',
    order: 14,
    title: 'Education & Campus Life',
    subtitle: 'Kuliah, tugas, dan kehidupan kampus',
    level: 'B1',
    minutes: 8,
    icon: 'graduation',
    accent: 'teal',
    description: 'Kosakata akademik sehari-hari untuk membicarakan perkuliahan, tugas, ujian, dan kegiatan kampus.',
    objectives: [
      'Memakai kosakata perkuliahan: lecture, assignment, deadline',
      'Membedakan take/pass/fail an exam',
      'Membicarakan jurusan dan kegiatan kampus'
    ],
    sections: [
      {
        title: 'Perkuliahan',
        icon: 'graduation',
        bullets: [
          'lecture = kuliah (tatap muka); lecturer = dosen',
          'assignment = tugas; submit = mengumpulkan; deadline = tenggat',
          'major = jurusan; semester / term = semester',
          'scholarship = beasiswa; tuition fee = uang kuliah'
        ]
      },
      {
        title: 'Ujian & nilai',
        icon: 'award',
        bullets: [
          'take/sit an exam = mengikuti ujian (bukan “make an exam”)',
          'pass = lulus; fail = gagal; retake = mengulang',
          'get a good grade/mark = mendapat nilai bagus',
          'revise for an exam (UK) / review (US) = belajar mengulang materi'
        ],
        examples: [
          { en: 'I have to submit my assignment before the deadline.', id: 'Saya harus mengumpulkan tugas sebelum tenggat.' },
          { en: 'She passed all her exams with high grades.', id: 'Dia lulus semua ujian dengan nilai tinggi.' }
        ]
      }
    ],
    vocab: [
      { word: 'lecturer', phonetic: '/ˈlektʃərər/', pos: 'noun', meaning: 'dosen', example: 'Our lecturer explains everything clearly.', exampleId: 'Dosen kami menjelaskan semuanya dengan jelas.', collocation: 'a senior lecturer' },
      { word: 'assignment', phonetic: '/əˈsaɪnmənt/', pos: 'noun', meaning: 'tugas', example: 'The assignment is due on Friday.', exampleId: 'Tugasnya dikumpulkan hari Jumat.', collocation: 'hand in an assignment' },
      { word: 'deadline', phonetic: '/ˈdedlaɪn/', pos: 'noun', meaning: 'tenggat waktu', example: 'Don’t miss the deadline.', exampleId: 'Jangan sampai melewati tenggat.', collocation: 'meet a deadline' },
      { word: 'submit', phonetic: '/səbˈmɪt/', pos: 'verb', meaning: 'mengumpulkan, menyerahkan', example: 'Submit your essay online.', exampleId: 'Kumpulkan esaimu secara daring.', collocation: 'submit an application' },
      { word: 'scholarship', phonetic: '/ˈskɒlərʃɪp/', pos: 'noun', meaning: 'beasiswa', example: 'He got a scholarship to study in Japan.', exampleId: 'Dia mendapat beasiswa untuk kuliah di Jepang.', collocation: 'apply for a scholarship' },
      { word: 'major', phonetic: '/ˈmeɪdʒər/', pos: 'noun', meaning: 'jurusan (utama)', example: 'My major is English Education.', exampleId: 'Jurusan saya Pendidikan Bahasa Inggris.', collocation: 'choose a major' },
      { word: 'attendance', phonetic: '/əˈtendəns/', pos: 'noun', meaning: 'kehadiran', example: 'Attendance is compulsory.', exampleId: 'Kehadiran wajib.', collocation: 'take attendance' },
      { word: 'plagiarism', phonetic: '/ˈpleɪdʒərɪzəm/', pos: 'noun', meaning: 'plagiarisme', example: 'Plagiarism is a serious offence.', exampleId: 'Plagiarisme adalah pelanggaran serius.', collocation: 'avoid plagiarism' }
    ],
    quiz: [
      { id: 'ec-1', type: 'mcq', prompt: 'I need to ___ my assignment before midnight.', options: ['submit', 'attend', 'lecture', 'major'], answer: 'a', explanation: 'Submit = mengumpulkan tugas.' },
      { id: 'ec-2', type: 'mcq', prompt: 'We have an exam tomorrow. Which verb is correct? “We ___ the exam.”', options: ['make', 'do a', 'take', 'pass by'], answer: 'c', explanation: 'Mengikuti ujian: take (atau sit) an exam.' },
      { id: 'ec-3', type: 'type', prompt: 'The last date to hand in work is the ___.', placeholder: 'Tulis satu kata', answers: ['deadline'], explanation: 'Deadline = tenggat waktu.' },
      { id: 'ec-4', type: 'mcq', prompt: 'Apa arti “scholarship”?', options: ['Ijazah', 'Beasiswa', 'Perpustakaan', 'Kuliah umum'], answer: 'b', explanation: 'Scholarship = beasiswa.' },
      { id: 'ec-5', type: 'mcq', prompt: 'Copying someone’s work without credit is called ___.', options: ['attendance', 'plagiarism', 'revision', 'tuition'], answer: 'b', explanation: 'Plagiarism = menjiplak karya orang lain.' },
      { id: 'ec-6', type: 'mcq', prompt: 'She studied hard and ___ the exam with an A.', options: ['failed', 'passed', 'took off', 'missed'], answer: 'b', explanation: 'Pass = lulus ujian.' },
      { id: 'ec-7', type: 'type', prompt: 'The person who teaches at a university is a ___.', placeholder: 'Tulis satu kata', answers: ['lecturer', 'professor'], explanation: 'Lecturer = dosen.' },
      { id: 'ec-8', type: 'mcq', prompt: 'What’s your ___? — English Literature.', options: ['major', 'grade', 'term', 'campus'], answer: 'a', explanation: 'Major = jurusan utama.' }
    ]
  },

  /* =====================================================
     VOCABULARY B1 — EVERYDAY PHRASAL VERBS
     ===================================================== */
  {
    id: 'phrasal-verbs',
    track: 'vocabulary',
    order: 15,
    title: 'Everyday Phrasal Verbs',
    subtitle: 'Kata kerja + partikel yang sering dipakai',
    level: 'B1',
    minutes: 9,
    icon: 'zap',
    accent: 'teal',
    description: 'Phrasal verbs yang paling sering muncul dalam percakapan sehari-hari dan cara memakainya.',
    objectives: [
      'Memahami arti phrasal verbs umum',
      'Membedakan phrasal verbs yang bisa dan tidak bisa dipisah',
      'Memakai phrasal verbs dalam konteks yang tepat'
    ],
    sections: [
      {
        title: 'Apa itu phrasal verb?',
        icon: 'zap',
        body: [
          'Phrasal verb adalah kata kerja + partikel (up, out, on, off, …) yang sering memiliki arti baru. Contoh: give up = menyerah, bukan “memberi ke atas”.'
        ],
        tip: 'Pelajari phrasal verb beserta contoh kalimatnya, bukan kata per kata.'
      },
      {
        title: 'Bisa dipisah atau tidak?',
        icon: 'layers',
        bullets: [
          'Bisa dipisah: turn off the TV = turn the TV off = turn it off',
          'Kata ganti wajib di tengah: turn it off (bukan turn off it)',
          'Tidak bisa dipisah: look after the baby, run out of time, get over a cold'
        ],
        examples: [
          { en: 'Please fill in this form.', id: 'Tolong isi formulir ini.' },
          { en: 'We ran out of coffee.', id: 'Kopi kita habis.' }
        ]
      }
    ],
    vocab: [
      { word: 'give up', phonetic: '/ɡɪv ʌp/', pos: 'phrasal verb', meaning: 'menyerah; berhenti (kebiasaan)', example: 'Don’t give up — you’re almost there!', exampleId: 'Jangan menyerah, kamu hampir berhasil!', collocation: 'give up smoking' },
      { word: 'find out', phonetic: '/faɪnd aʊt/', pos: 'phrasal verb', meaning: 'mencari tahu, mengetahui', example: 'I found out the truth yesterday.', exampleId: 'Saya mengetahui kebenarannya kemarin.', collocation: 'find out more' },
      { word: 'run out of', phonetic: '/rʌn aʊt əv/', pos: 'phrasal verb', meaning: 'kehabisan', example: 'My phone ran out of battery.', exampleId: 'Baterai ponsel saya habis.', collocation: 'run out of time' },
      { word: 'look after', phonetic: '/lʊk ˈæftər/', pos: 'phrasal verb', meaning: 'merawat, menjaga', example: 'She looks after her little brother.', exampleId: 'Dia menjaga adik laki-lakinya.', collocation: 'look after yourself' },
      { word: 'put off', phonetic: '/pʊt ɒf/', pos: 'phrasal verb', meaning: 'menunda', example: 'Stop putting off your homework.', exampleId: 'Berhenti menunda PR-mu.', collocation: 'put off a meeting' },
      { word: 'turn down', phonetic: '/tɜːrn daʊn/', pos: 'phrasal verb', meaning: 'menolak; mengecilkan (volume)', example: 'He turned down the job offer.', exampleId: 'Dia menolak tawaran kerja itu.', collocation: 'turn down an invitation' },
      { word: 'come up with', phonetic: '/kʌm ʌp wɪð/', pos: 'phrasal verb', meaning: 'menemukan (ide)', example: 'She came up with a great idea.', exampleId: 'Dia menemukan ide yang bagus.', collocation: 'come up with a solution' },
      { word: 'get over', phonetic: '/ɡet ˈəʊvər/', pos: 'phrasal verb', meaning: 'pulih dari', example: 'It took me a week to get over the flu.', exampleId: 'Butuh seminggu bagi saya untuk pulih dari flu.', collocation: 'get over a cold' }
    ],
    quiz: [
      { id: 'phv-1', type: 'mcq', prompt: 'The exam is hard, but don’t give ___.', options: ['up', 'in', 'off', 'out'], answer: 'a', explanation: 'Give up = menyerah.' },
      { id: 'phv-2', type: 'mcq', prompt: 'We’ve run ___ of milk. Can you buy some?', options: ['up', 'out', 'off', 'down'], answer: 'b', explanation: 'Run out of = kehabisan.' },
      { id: 'phv-3', type: 'type', prompt: 'Can you look ___ my cat while I’m away?', placeholder: 'Tulis satu kata', answers: ['after'], explanation: 'Look after = merawat/menjaga.' },
      { id: 'phv-4', type: 'mcq', prompt: 'The meeting was ___ off until next week.', options: ['put', 'turned', 'given', 'taken'], answer: 'a', explanation: 'Put off = menunda.' },
      { id: 'phv-5', type: 'mcq', prompt: 'Pilih kalimat yang benar.', options: ['Turn off it.', 'Turn it off.', 'Turn off.', 'It turn off.'], answer: 'b', explanation: 'Kata ganti (it) harus diletakkan di antara kata kerja dan partikel.' },
      { id: 'phv-6', type: 'mcq', prompt: 'Our team came ___ with a creative solution.', options: ['up', 'down', 'over', 'out'], answer: 'a', explanation: 'Come up with = menemukan ide/solusi.' },
      { id: 'phv-7', type: 'type', prompt: 'I want to find ___ more about the scholarship.', placeholder: 'Tulis satu kata', answers: ['out'], explanation: 'Find out = mencari tahu.' },
      { id: 'phv-8', type: 'mcq', prompt: 'He ___ down the invitation because he was busy.', options: ['turned', 'put', 'looked', 'gave'], answer: 'a', explanation: 'Turn down = menolak tawaran/undangan.' }
    ]
  },

  /* =====================================================
     VOCABULARY B2 — BUSINESS & ECONOMY
     ===================================================== */
  {
    id: 'business-economy',
    track: 'vocabulary',
    order: 19,
    title: 'Business & Economy',
    subtitle: 'Bisnis, pasar, dan ekonomi',
    level: 'B2',
    minutes: 9,
    icon: 'trending-up',
    accent: 'teal',
    description: 'Kosakata untuk membaca berita ekonomi, membicarakan bisnis, dan memahami istilah keuangan dasar.',
    objectives: [
      'Memahami istilah ekonomi: inflation, revenue, profit',
      'Menggambarkan tren naik dan turun',
      'Memakai kolokasi bisnis: launch a product, make a profit'
    ],
    sections: [
      {
        title: 'Istilah inti',
        icon: 'briefcase',
        bullets: [
          'revenue = pendapatan; profit = laba; loss = rugi',
          'inflation = inflasi; interest rate = suku bunga',
          'startup = perusahaan rintisan; entrepreneur = wirausahawan',
          'make a profit / make a loss; launch a product; enter a market'
        ]
      },
      {
        title: 'Menggambarkan tren',
        icon: 'trending-up',
        table: {
          headers: ['Naik', 'Turun', 'Tetap'],
          rows: [
            ['rise, increase, grow', 'fall, drop, decline', 'remain stable, level off'],
            ['a sharp rise', 'a slight decrease', 'stay the same']
          ]
        },
        examples: [
          { en: 'Sales rose sharply in the last quarter.', id: 'Penjualan naik tajam pada kuartal terakhir.' },
          { en: 'Inflation has fallen to 3%.', id: 'Inflasi turun menjadi 3%.' }
        ]
      }
    ],
    vocab: [
      { word: 'revenue', phonetic: '/ˈrevənjuː/', pos: 'noun', meaning: 'pendapatan', example: 'The company’s revenue doubled.', exampleId: 'Pendapatan perusahaan naik dua kali lipat.', collocation: 'annual revenue' },
      { word: 'profit', phonetic: '/ˈprɒfɪt/', pos: 'noun', meaning: 'laba, keuntungan', example: 'They made a small profit this year.', exampleId: 'Mereka memperoleh laba kecil tahun ini.', collocation: 'make a profit' },
      { word: 'inflation', phonetic: '/ɪnˈfleɪʃən/', pos: 'noun', meaning: 'inflasi', example: 'High inflation makes food more expensive.', exampleId: 'Inflasi tinggi membuat makanan lebih mahal.', collocation: 'the inflation rate' },
      { word: 'entrepreneur', phonetic: '/ˌɒntrəprəˈnɜːr/', pos: 'noun', meaning: 'wirausahawan', example: 'She is a young entrepreneur from Medan.', exampleId: 'Dia wirausahawan muda dari Medan.', collocation: 'a successful entrepreneur' },
      { word: 'launch', phonetic: '/lɔːntʃ/', pos: 'verb', meaning: 'meluncurkan', example: 'They will launch a new app next month.', exampleId: 'Mereka akan meluncurkan aplikasi baru bulan depan.', collocation: 'launch a product' },
      { word: 'decline', phonetic: '/dɪˈklaɪn/', pos: 'verb', meaning: 'menurun', example: 'Sales declined by 10%.', exampleId: 'Penjualan menurun 10%.', collocation: 'decline steadily' },
      { word: 'invest', phonetic: '/ɪnˈvest/', pos: 'verb', meaning: 'berinvestasi', example: 'Many people invest in gold.', exampleId: 'Banyak orang berinvestasi pada emas.', collocation: 'invest in shares' },
      { word: 'competitor', phonetic: '/kəmˈpetɪtər/', pos: 'noun', meaning: 'pesaing', example: 'Our main competitor lowered its prices.', exampleId: 'Pesaing utama kami menurunkan harganya.', collocation: 'a strong competitor' }
    ],
    quiz: [
      { id: 'be2-1', type: 'mcq', prompt: 'The total money a company earns from sales is its ___.', options: ['revenue', 'loss', 'debt', 'tax'], answer: 'a', explanation: 'Revenue = pendapatan dari penjualan.' },
      { id: 'be2-2', type: 'mcq', prompt: 'After paying all costs, the shop made a ___ of Rp5 million.', options: ['profit', 'decline', 'launch', 'inflation'], answer: 'a', explanation: 'Make a profit = memperoleh laba.' },
      { id: 'be2-3', type: 'type', prompt: 'When prices in general keep rising, we call it ___.', placeholder: 'Tulis satu kata', answers: ['inflation'], explanation: 'Inflation = kenaikan harga secara umum.' },
      { id: 'be2-4', type: 'mcq', prompt: 'Sales ___ sharply from 500 to 100 units.', options: ['rose', 'grew', 'dropped', 'launched'], answer: 'c', explanation: 'Turun tajam: dropped/fell sharply.' },
      { id: 'be2-5', type: 'mcq', prompt: 'Apa arti “entrepreneur”?', options: ['Karyawan', 'Wirausahawan', 'Akuntan', 'Pelanggan'], answer: 'b', explanation: 'Entrepreneur = wirausahawan.' },
      { id: 'be2-6', type: 'mcq', prompt: 'The startup plans to ___ its first product in March.', options: ['decline', 'launch', 'invest', 'compete'], answer: 'b', explanation: 'Launch a product = meluncurkan produk.' },
      { id: 'be2-7', type: 'type', prompt: 'Many young people ___ in mutual funds. (berinvestasi)', placeholder: 'Tulis satu kata', answers: ['invest'], explanation: 'Invest in = berinvestasi pada.' },
      { id: 'be2-8', type: 'mcq', prompt: 'A company that sells similar products is a ___.', options: ['partner', 'competitor', 'customer', 'supplier'], answer: 'b', explanation: 'Competitor = pesaing.' }
    ]
  },

  /* =====================================================
     VOCABULARY B2 — SCIENCE & RESEARCH
     ===================================================== */
  {
    id: 'science-research',
    track: 'vocabulary',
    order: 20,
    title: 'Science & Research',
    subtitle: 'Bahasa penelitian dan akademik',
    level: 'B2',
    minutes: 9,
    icon: 'flask',
    accent: 'teal',
    description: 'Kosakata untuk membaca artikel ilmiah, menulis laporan, dan membicarakan penelitian.',
    objectives: [
      'Memahami istilah penelitian: hypothesis, data, findings',
      'Memakai kata kerja akademik: conduct, analyse, conclude',
      'Menyusun kalimat laporan penelitian yang formal'
    ],
    sections: [
      {
        title: 'Alur penelitian',
        icon: 'flask',
        bullets: [
          'formulate a hypothesis = merumuskan hipotesis',
          'conduct research / an experiment = melakukan penelitian/eksperimen',
          'collect and analyse data = mengumpulkan dan menganalisis data',
          'findings / results = temuan / hasil; draw a conclusion = menarik kesimpulan'
        ]
      },
      {
        title: 'Bahasa laporan',
        icon: 'file-text',
        examples: [
          { en: 'The study aims to investigate the effect of games on vocabulary learning.', id: 'Penelitian ini bertujuan menyelidiki pengaruh permainan terhadap pembelajaran kosakata.' },
          { en: 'The findings suggest that students were more motivated.', id: 'Temuan menunjukkan bahwa mahasiswa lebih termotivasi.' },
          { en: 'Further research is needed.', id: 'Diperlukan penelitian lebih lanjut.' }
        ],
        tip: 'Data secara formal adalah jamak (the data are), tetapi the data is juga umum dipakai.'
      }
    ],
    vocab: [
      { word: 'hypothesis', phonetic: '/haɪˈpɒθəsɪs/', pos: 'noun', meaning: 'hipotesis, dugaan sementara', example: 'The results support our hypothesis.', exampleId: 'Hasilnya mendukung hipotesis kami.', collocation: 'test a hypothesis' },
      { word: 'conduct', phonetic: '/kənˈdʌkt/', pos: 'verb', meaning: 'melakukan, melaksanakan', example: 'We conducted a survey of 110 students.', exampleId: 'Kami melakukan survei terhadap 110 mahasiswa.', collocation: 'conduct research' },
      { word: 'analyse', phonetic: '/ˈænəlaɪz/', pos: 'verb', meaning: 'menganalisis', example: 'The data were analysed using SPSS.', exampleId: 'Data dianalisis menggunakan SPSS.', collocation: 'analyse data' },
      { word: 'findings', phonetic: '/ˈfaɪndɪŋz/', pos: 'noun', meaning: 'temuan', example: 'The findings were published last year.', exampleId: 'Temuan itu diterbitkan tahun lalu.', collocation: 'key findings' },
      { word: 'sample', phonetic: '/ˈsɑːmpəl/', pos: 'noun', meaning: 'sampel', example: 'The sample consisted of 50 participants.', exampleId: 'Sampel terdiri atas 50 partisipan.', collocation: 'a random sample' },
      { word: 'evidence', phonetic: '/ˈevɪdəns/', pos: 'noun', meaning: 'bukti', example: 'There is strong evidence for this theory.', exampleId: 'Ada bukti kuat untuk teori ini.', collocation: 'scientific evidence' },
      { word: 'significant', phonetic: '/sɪɡˈnɪfɪkənt/', pos: 'adjective', meaning: 'signifikan, berarti', example: 'There was a significant improvement.', exampleId: 'Terdapat peningkatan yang signifikan.', collocation: 'statistically significant' },
      { word: 'conclude', phonetic: '/kənˈkluːd/', pos: 'verb', meaning: 'menyimpulkan', example: 'We conclude that the app is effective.', exampleId: 'Kami menyimpulkan bahwa aplikasi itu efektif.', collocation: 'conclude that …' }
    ],
    quiz: [
      { id: 'sr-1', type: 'mcq', prompt: 'Before the experiment, the scientist formulated a ___.', options: ['hypothesis', 'finding', 'sample', 'conclusion'], answer: 'a', explanation: 'Hypothesis = dugaan sementara sebelum penelitian.' },
      { id: 'sr-2', type: 'mcq', prompt: 'The researchers ___ an experiment with 40 students.', options: ['made', 'conducted', 'did up', 'took'], answer: 'b', explanation: 'Kolokasi akademik: conduct an experiment/research.' },
      { id: 'sr-3', type: 'type', prompt: 'The results of a study are also called its ___.', placeholder: 'Tulis satu kata', answers: ['findings', 'results'], explanation: 'Findings = temuan/hasil penelitian.' },
      { id: 'sr-4', type: 'mcq', prompt: 'A group of people chosen to represent a population is a ___.', options: ['sample', 'evidence', 'theory', 'variable'], answer: 'a', explanation: 'Sample = sampel yang mewakili populasi.' },
      { id: 'sr-5', type: 'mcq', prompt: 'Apa arti “evidence”?', options: ['Bukti', 'Dugaan', 'Hasil', 'Kesimpulan'], answer: 'a', explanation: 'Evidence = bukti.' },
      { id: 'sr-6', type: 'mcq', prompt: 'The improvement was statistically ___ (p < 0.05).', options: ['significant', 'sample', 'hypothetical', 'conducted'], answer: 'a', explanation: 'Statistically significant = signifikan secara statistik.' },
      { id: 'sr-7', type: 'type', prompt: 'We ___ that the method is effective. (menyimpulkan)', placeholder: 'Tulis satu kata', answers: ['conclude'], explanation: 'Conclude = menyimpulkan.' },
      { id: 'sr-8', type: 'mcq', prompt: 'The data were ___ using statistical software.', options: ['analysed', 'invested', 'launched', 'submitted'], answer: 'a', explanation: 'Analyse data = menganalisis data.' }
    ]
  }
];
