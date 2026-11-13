/**
 * DIXIGRAM — Kurikulum tambahan (v1.2)
 * File: Content2.gs
 *
 * 6 modul grammar + 6 modul vocabulary baru, sehingga setiap track
 * berisi 12 modul. Sejak v1.5 ditambah 16 modul lagi di Content3.gs
 * (total 40 modul: 5 grammar + 5 vocabulary per level A1–B2).
 * Modul di file ini otomatis digabung dengan Content.gs saat dipakai.
 */

var DIXI_CONTENT_EXTRA = [

  /* =====================================================
     GRAMMAR A1 — BE & THERE IS/ARE
     ===================================================== */
  {
    id: 'to-be',
    track: 'grammar',
    order: 2,
    title: 'Be & There Is/Are',
    subtitle: 'Am, is, are, dan menyatakan “ada”',
    level: 'A1',
    minutes: 7,
    icon: 'home',
    accent: 'violet',
    description: 'Kata kerja be untuk identitas, sifat, dan lokasi, serta there is/there are untuk menyatakan keberadaan.',
    objectives: [
      'Memilih am, is, atau are sesuai subjek',
      'Membuat kalimat negatif dan pertanyaan dengan be',
      'Membedakan there is (tunggal) dan there are (jamak)'
    ],
    sections: [
      {
        title: 'Am, is, are',
        icon: 'user',
        body: [
          'Be adalah kata kerja yang paling sering dipakai. Artinya bisa “adalah”, “berada”, atau tidak diterjemahkan sama sekali. Be dipakai sebelum kata benda, kata sifat, dan keterangan tempat.'
        ],
        table: {
          headers: ['Subjek', 'Be', 'Contoh'],
          rows: [
            ['I', 'am', 'I am a student.'],
            ['He / She / It', 'is', 'She is tired.'],
            ['You / We / They', 'are', 'They are at home.']
          ]
        },
        tip: 'Bahasa Indonesia sering tidak memakai “adalah”: “Dia lelah.” Dalam bahasa Inggris be tetap wajib: “She is tired”, bukan “She tired”.'
      },
      {
        title: 'Negatif & pertanyaan',
        icon: 'braces',
        formula: [
          { label: 'Positif', value: 'S + am/is/are + …' },
          { label: 'Negatif', value: 'S + am/is/are + not + …' },
          { label: 'Pertanyaan', value: 'Am/Is/Are + S + …?' }
        ],
        examples: [
          { en: 'I’m not hungry.', id: 'Saya tidak lapar.' },
          { en: 'He isn’t at the office today.', id: 'Dia tidak ada di kantor hari ini.' },
          { en: 'Are you ready?', id: 'Apakah kamu siap?' },
          { en: 'Is the shop open on Sunday?', id: 'Apakah tokonya buka hari Minggu?' }
        ],
        tip: 'Bentuk singkat: I’m, you’re, he’s, she’s, it’s, we’re, they’re. Negatifnya isn’t dan aren’t, tetapi untuk I tetap I’m not.'
      },
      {
        title: 'There is & there are',
        icon: 'map',
        body: [
          'There is/there are dipakai untuk mengatakan bahwa sesuatu ada (atau tidak ada) di suatu tempat — padanan kata “ada”.'
        ],
        bullets: [
          'There is + benda tunggal atau tak terhitung: There is a bank near here. There is some milk in the fridge.',
          'There are + benda jamak: There are three cafés on this street.',
          'Negatif: There isn’t any sugar. There aren’t any chairs.',
          'Pertanyaan: Is there a lift? Are there any tickets left?'
        ],
        examples: [
          { en: 'There is a cat under the table.', id: 'Ada seekor kucing di bawah meja.' },
          { en: 'There are two bathrooms in the house.', id: 'Ada dua kamar mandi di rumah itu.' }
        ],
        tip: 'Jangan memakai have untuk arti “ada di suatu tempat”. “In my city has a big park” salah; yang benar “There is a big park in my city”.'
      },
      {
        title: 'Jebakan yang sering muncul',
        icon: 'shield',
        examples: [
          { en: 'My brother is a doctor.', id: 'Benar: be wajib ada sebelum kata benda.' },
          { en: 'My brother a doctor.', id: 'Salah: kata kerja be hilang.' },
          { en: 'There are many people here.', id: 'Benar: people bermakna jamak, jadi there are.' },
          { en: 'I am agree with you.', id: 'Salah: agree sudah kata kerja. Yang benar: I agree with you.' }
        ]
      }
    ],
    quiz: [
      { id: 'be-1', type: 'mcq', prompt: 'My parents ___ teachers.', options: ['is', 'am', 'are', 'be'], answer: 'c', explanation: 'My parents bermakna jamak (they), jadi memakai are.' },
      { id: 'be-2', type: 'mcq', prompt: 'I ___ from Surabaya.', options: ['am', 'is', 'are', 'be'], answer: 'a', explanation: 'Subjek I selalu berpasangan dengan am.' },
      { id: 'be-3', type: 'type', prompt: '___ there a pharmacy near here?', placeholder: 'Tulis satu kata', answers: ['is'], explanation: 'Pharmacy tunggal, jadi pertanyaannya “Is there a pharmacy near here?”' },
      { id: 'be-4', type: 'mcq', prompt: 'There ___ two apples on the table.', options: ['is', 'are', 'am', 'be'], answer: 'b', explanation: 'Two apples jamak, jadi memakai there are.' },
      { id: 'be-5', type: 'mcq', prompt: 'Pilih kalimat yang benar.', options: ['She very kind.', 'She is very kind.', 'She are very kind.', 'She be very kind.'], answer: 'b', explanation: 'Sebelum kata sifat tetap perlu be. Subjek she memakai is.' },
      { id: 'be-6', type: 'type', prompt: 'They ___ (not) hungry right now.', placeholder: 'Tulis bentuk negatif', answers: ['aren\'t', 'are not'], explanation: 'They memakai are; bentuk negatifnya are not / aren’t.' },
      { id: 'be-7', type: 'mcq', prompt: 'There ___ any milk in the fridge.', options: ['isn’t', 'aren’t', 'don’t', 'haven’t'], answer: 'a', explanation: 'Milk adalah benda tak terhitung, jadi memakai there isn’t any milk.' },
      { id: 'be-8', type: 'mcq', prompt: '___ you ready for the test?', options: ['Is', 'Are', 'Am', 'Do'], answer: 'b', explanation: 'Subjek you memakai are: “Are you ready?”' }
    ]
  },

  /* =====================================================
     GRAMMAR A1 — PRESENT CONTINUOUS
     ===================================================== */
  {
    id: 'present-continuous',
    track: 'grammar',
    order: 3,
    title: 'Present Continuous',
    subtitle: 'Yang sedang terjadi sekarang',
    level: 'A1',
    minutes: 8,
    icon: 'play',
    accent: 'violet',
    description: 'Menceritakan aksi yang sedang berlangsung, situasi sementara, dan rencana yang sudah diatur.',
    objectives: [
      'Membentuk am/is/are + V-ing dengan ejaan yang benar',
      'Membedakan Present Continuous dan Present Simple',
      'Mengenali kata kerja keadaan yang jarang memakai -ing'
    ],
    sections: [
      {
        title: 'Kapan dipakai?',
        icon: 'compass',
        bullets: [
          'Sedang terjadi saat ini: “I’m reading a book right now.”',
          'Situasi sementara: “She is staying with her aunt this week.”',
          'Rencana yang sudah diatur: “We are meeting Rina tomorrow.”',
          'Perubahan yang sedang berlangsung: “Prices are going up.”'
        ],
        tip: 'Penanda waktu yang umum: now, right now, at the moment, today, this week, Look!, Listen!'
      },
      {
        title: 'Rumus inti',
        icon: 'braces',
        formula: [
          { label: 'Kalimat positif', value: 'S + am/is/are + V-ing' },
          { label: 'Kalimat negatif', value: 'S + am/is/are + not + V-ing' },
          { label: 'Pertanyaan', value: 'Am/Is/Are + S + V-ing?' }
        ],
        examples: [
          { en: 'They are playing football.', id: 'Mereka sedang bermain sepak bola.' },
          { en: 'I’m not watching TV.', id: 'Saya tidak sedang menonton TV.' },
          { en: 'Is it raining?', id: 'Apakah sedang hujan?' },
          { en: 'What are you doing?', id: 'Kamu sedang apa?' }
        ]
      },
      {
        title: 'Ejaan -ing',
        icon: 'pen-line',
        bullets: [
          'Umumnya cukup ditambah -ing: read → reading, play → playing.',
          'Huruf e di akhir dihapus: write → writing, make → making.',
          'Satu vokal + satu konsonan di akhir suku kata bertekanan: konsonan digandakan: run → running, sit → sitting, swim → swimming.',
          'Akhiran -ie menjadi -ying: lie → lying, die → dying.'
        ]
      },
      {
        title: 'Simple atau Continuous?',
        icon: 'scale',
        table: {
          headers: ['Present Simple', 'Present Continuous'],
          rows: [
            ['I work in Jakarta. (permanen)', 'I’m working from home this week. (sementara)'],
            ['She usually drinks tea.', 'She is drinking coffee now.'],
            ['It rains a lot in December.', 'Look! It’s raining.']
          ]
        },
        tip: 'Kata kerja keadaan seperti know, like, love, want, need, understand, dan believe biasanya tidak memakai -ing: “I know the answer”, bukan “I am knowing”.'
      }
    ],
    quiz: [
      { id: 'pc-1', type: 'mcq', prompt: 'Look! The children ___ in the garden.', options: ['play', 'plays', 'are playing', 'played'], answer: 'c', explanation: '“Look!” menandakan aksi yang sedang terjadi, jadi memakai are playing.' },
      { id: 'pc-2', type: 'type', prompt: 'Be quiet, please. The baby ___ (sleep).', placeholder: 'Tulis dua kata', answers: ['is sleeping'], explanation: 'The baby tunggal: is + sleeping.' },
      { id: 'pc-3', type: 'mcq', prompt: 'I ___ my homework at the moment.', options: ['do', 'am doing', 'does', 'did'], answer: 'b', explanation: '“At the moment” menandakan Present Continuous: am doing.' },
      { id: 'pc-4', type: 'mcq', prompt: 'Ejaan yang benar untuk swim + -ing adalah …', options: ['swiming', 'swimming', 'swimeing', 'swimmming'], answer: 'b', explanation: 'Swim berakhir dengan satu vokal + satu konsonan, jadi m digandakan: swimming.' },
      { id: 'pc-5', type: 'mcq', prompt: '___ she working today?', options: ['Do', 'Does', 'Is', 'Are'], answer: 'c', explanation: 'Pertanyaan Present Continuous memakai be. Subjek she → Is she working?' },
      { id: 'pc-6', type: 'mcq', prompt: 'Pilih kalimat yang benar.', options: ['I am knowing her name.', 'I know her name.', 'I knowing her name.', 'I am know her name.'], answer: 'b', explanation: 'Know adalah kata kerja keadaan, sehingga tidak memakai -ing.' },
      { id: 'pc-7', type: 'type', prompt: 'We ___ (not/watch) TV right now. We’re reading.', placeholder: 'Tulis bentuk negatif', answers: ['aren\'t watching', 'are not watching'], explanation: 'We + are not + watching.' },
      { id: 'pc-8', type: 'mcq', prompt: 'Rina usually walks to work, but today she ___ the bus.', options: ['takes', 'is taking', 'take', 'taking'], answer: 'b', explanation: 'Situasi sementara (hari ini saja) memakai Present Continuous: is taking.' }
    ]
  },

  /* =====================================================
     GRAMMAR A2 — FUTURE: WILL & GOING TO
     ===================================================== */
  {
    id: 'future-forms',
    track: 'grammar',
    order: 6,
    title: 'Future: Will & Going To',
    subtitle: 'Rencana, prediksi, dan keputusan spontan',
    level: 'A2',
    minutes: 8,
    icon: 'calendar',
    accent: 'violet',
    description: 'Memilih will atau be going to sesuai niat, bukti, dan kapan keputusan dibuat.',
    objectives: [
      'Memakai will untuk keputusan spontan, janji, dan tawaran',
      'Memakai be going to untuk rencana dan prediksi berdasarkan bukti',
      'Membuat kalimat negatif dan pertanyaan untuk keduanya'
    ],
    sections: [
      {
        title: 'Will',
        icon: 'zap',
        formula: [
          { label: 'Kalimat positif', value: 'S + will + V‑base' },
          { label: 'Kalimat negatif', value: 'S + will not (won’t) + V‑base' },
          { label: 'Pertanyaan', value: 'Will + S + V‑base?' }
        ],
        bullets: [
          'Keputusan spontan: “I’m thirsty. I’ll get some water.”',
          'Janji: “I will call you tonight.”',
          'Tawaran: “I’ll help you with that bag.”',
          'Prediksi berdasarkan pendapat: “I think it will be a great match.”'
        ]
      },
      {
        title: 'Be going to',
        icon: 'calendar',
        formula: [
          { label: 'Kalimat positif', value: 'S + am/is/are + going to + V‑base' },
          { label: 'Kalimat negatif', value: 'S + am/is/are + not + going to + V‑base' },
          { label: 'Pertanyaan', value: 'Am/Is/Are + S + going to + V‑base?' }
        ],
        bullets: [
          'Rencana yang sudah diputuskan sebelumnya: “We’re going to visit Bali next month.”',
          'Prediksi dengan bukti yang terlihat: “Look at those clouds. It’s going to rain.”'
        ]
      },
      {
        title: 'Membandingkan keduanya',
        icon: 'scale',
        examples: [
          { en: 'A: The phone is ringing. B: I’ll answer it.', id: 'Keputusan saat itu juga → will.' },
          { en: 'I’m going to answer all my emails this afternoon.', id: 'Rencana yang sudah dibuat → going to.' },
          { en: 'I think Indonesia will win.', id: 'Prediksi berdasarkan pendapat → will.' },
          { en: 'Careful! You’re going to drop the glasses.', id: 'Prediksi dengan bukti nyata → going to.' }
        ],
        tip: 'Setelah will dan going to, kata kerja selalu bentuk dasar: “She will come”, bukan “She will comes”.'
      }
    ],
    quiz: [
      { id: 'ff-1', type: 'mcq', prompt: 'A: I don’t have a pen. B: No problem, I ___ lend you mine.', options: ['will', 'going to', 'am', 'would to'], answer: 'a', explanation: 'Tawaran spontan memakai will: “I’ll lend you mine.”' },
      { id: 'ff-2', type: 'mcq', prompt: 'We bought the tickets last week. We ___ fly to Medan on Friday.', options: ['will', 'are going to', 'go to', 'will going to'], answer: 'b', explanation: 'Rencana yang sudah diputuskan sebelumnya memakai be going to.' },
      { id: 'ff-3', type: 'mcq', prompt: 'Look at those dark clouds! It ___ rain.', options: ['will', 'is going to', 'is go to', 'going'], answer: 'b', explanation: 'Ada bukti yang terlihat (awan gelap), jadi memakai is going to.' },
      { id: 'ff-4', type: 'type', prompt: 'I promise I ___ tell anyone your secret. (bentuk negatif will)', placeholder: 'Tulis bentuk negatif', answers: ['won\'t', 'will not'], explanation: 'Janji memakai will; negatifnya will not / won’t.' },
      { id: 'ff-5', type: 'mcq', prompt: 'Pilih kalimat yang benar.', options: ['She will comes tomorrow.', 'She will come tomorrow.', 'She wills come tomorrow.', 'She will to come tomorrow.'], answer: 'b', explanation: 'Setelah will selalu V‑base tanpa -s dan tanpa to.' },
      { id: 'ff-6', type: 'type', prompt: '___ you going to study tonight?', placeholder: 'Tulis satu kata', answers: ['are'], explanation: 'Subjek you: “Are you going to study tonight?”' },
      { id: 'ff-7', type: 'mcq', prompt: 'I think the new phone ___ very expensive.', options: ['will be', 'is going be', 'will is', 'be'], answer: 'a', explanation: 'Prediksi berdasarkan pendapat (I think) memakai will be.' },
      { id: 'ff-8', type: 'mcq', prompt: 'Dina has already decided. She ___ learn Japanese next year.', options: ['will', 'is going to', 'going to', 'goes to'], answer: 'b', explanation: 'Keputusan yang sudah dibuat sebelumnya memakai is going to.' }
    ]
  },

  /* =====================================================
     GRAMMAR B2 — PASSIVE VOICE
     ===================================================== */
  {
    id: 'passive-voice',
    track: 'grammar',
    order: 10,
    title: 'Passive Voice',
    subtitle: 'Fokus pada tindakan, bukan pelaku',
    level: 'B2',
    minutes: 10,
    icon: 'rotate',
    accent: 'violet',
    description: 'Memakai be + past participle di berbagai tense untuk tulisan formal, berita, dan penjelasan proses.',
    objectives: [
      'Membentuk kalimat pasif di present, past, perfect, dan modal',
      'Menentukan kapan pelaku (by …) perlu disebut',
      'Mengenali kata kerja yang tidak bisa dipasifkan'
    ],
    sections: [
      {
        title: 'Kapan dipakai?',
        icon: 'compass',
        bullets: [
          'Pelaku tidak diketahui: “My bike was stolen.”',
          'Pelaku tidak penting atau sudah jelas: “The road is being repaired.”',
          'Menjelaskan proses: “The beans are roasted and then ground.”',
          'Gaya formal dan berita: “The new policy will be announced tomorrow.”'
        ],
        tip: 'Sebut pelaku dengan by hanya bila informasinya penting: “The novel was written by Pramoedya.”'
      },
      {
        title: 'Rumus di berbagai tense',
        icon: 'braces',
        formula: [
          { label: 'Rumus dasar', value: 'Objek + be (sesuai tense) + V‑past participle' }
        ],
        table: {
          headers: ['Tense', 'Aktif', 'Pasif'],
          rows: [
            ['Present simple', 'They clean the room daily.', 'The room is cleaned daily.'],
            ['Present continuous', 'They are painting the wall.', 'The wall is being painted.'],
            ['Past simple', 'Someone stole my bike.', 'My bike was stolen.'],
            ['Present perfect', 'They have sold the house.', 'The house has been sold.'],
            ['Modal', 'You must sign the form.', 'The form must be signed.'],
            ['Future', 'They will open the mall.', 'The mall will be opened.']
          ]
        }
      },
      {
        title: 'Contoh dalam konteks',
        icon: 'newspaper',
        examples: [
          { en: 'Thousands of tourists are welcomed to Bali every year.', id: 'Ribuan wisatawan disambut di Bali setiap tahun.' },
          { en: 'The results have not been published yet.', id: 'Hasilnya belum diumumkan.' },
          { en: 'The bridge is being built by a local company.', id: 'Jembatan itu sedang dibangun oleh perusahaan lokal.' },
          { en: 'Applications must be submitted before Friday.', id: 'Lamaran harus diserahkan sebelum hari Jumat.' }
        ]
      },
      {
        title: 'Jebakan yang sering muncul',
        icon: 'shield',
        examples: [
          { en: 'The letter was sent yesterday.', id: 'Benar: was + V‑past participle (sent).' },
          { en: 'The letter was send yesterday.', id: 'Salah: setelah be harus V‑past participle, bukan V‑base.' },
          { en: 'The accident happened at night.', id: 'Benar: happen tidak punya bentuk pasif karena tidak memiliki objek.' }
        ],
        tip: 'Kata kerja tanpa objek (happen, arrive, die, sleep) tidak bisa dipasifkan.'
      }
    ],
    quiz: [
      { id: 'pv-1', type: 'mcq', prompt: 'English ___ in many countries.', options: ['speaks', 'is spoken', 'is speaking', 'spoke'], answer: 'b', explanation: 'Bahasa “digunakan”, bukan “menggunakan”: is spoken.' },
      { id: 'pv-2', type: 'mcq', prompt: 'The windows ___ yesterday.', options: ['were cleaned', 'are cleaned', 'cleaned', 'were clean'], answer: 'a', explanation: 'Yesterday + subjek jamak + pasif: were cleaned.' },
      { id: 'pv-3', type: 'type', prompt: 'The room is ___ (paint) right now, so please don’t go in.', placeholder: 'Tulis dua kata', answers: ['being painted'], explanation: 'Present continuous pasif: is being + V‑past participle → is being painted.' },
      { id: 'pv-4', type: 'mcq', prompt: 'The report has ___ to the manager.', options: ['been sent', 'sent', 'be sent', 'being sent'], answer: 'a', explanation: 'Present perfect pasif: has been + V‑past participle.' },
      { id: 'pv-5', type: 'mcq', prompt: 'Ubah ke pasif: “They will announce the winner tomorrow.”', options: ['The winner will announce tomorrow.', 'The winner will be announced tomorrow.', 'The winner is announced tomorrow.', 'The winner will being announced tomorrow.'], answer: 'b', explanation: 'Future pasif: will be + V‑past participle.' },
      { id: 'pv-6', type: 'type', prompt: 'All forms must ___ (sign) before Friday.', placeholder: 'Tulis dua kata', answers: ['be signed'], explanation: 'Modal pasif: must be + V‑past participle.' },
      { id: 'pv-7', type: 'mcq', prompt: 'Kalimat mana yang TIDAK bisa dibuat pasif?', options: ['Someone opened the door.', 'The accident happened last night.', 'They built the stadium in 2010.', 'People grow rice here.'], answer: 'b', explanation: 'Happen tidak memiliki objek, jadi tidak bisa dipasifkan.' },
      { id: 'pv-8', type: 'mcq', prompt: 'This novel ___ by a famous Indonesian author in 1980.', options: ['wrote', 'was written', 'has written', 'is writing'], answer: 'b', explanation: 'Novel ditulis (pasif) pada waktu lampau: was written.' }
    ]
  },

  /* =====================================================
     GRAMMAR B2 — REPORTED SPEECH
     ===================================================== */
  {
    id: 'reported-speech',
    track: 'grammar',
    order: 11,
    title: 'Reported Speech',
    subtitle: 'Menyampaikan ulang ucapan orang lain',
    level: 'B2',
    minutes: 10,
    icon: 'quote',
    accent: 'violet',
    description: 'Mengubah kalimat langsung menjadi tidak langsung: backshift tense, kata ganti, keterangan waktu, pertanyaan, dan perintah.',
    objectives: [
      'Menerapkan backshift tense setelah said/told',
      'Mengubah pertanyaan menjadi if/whether dan wh- tanpa inversi',
      'Melaporkan perintah dan permintaan dengan told/asked + to'
    ],
    sections: [
      {
        title: 'Say vs tell',
        icon: 'message-circle',
        bullets: [
          'say + (that) + kalimat: She said (that) she was tired.',
          'tell + orang + (that) + kalimat: She told me (that) she was tired.',
          'Hindari “She said me …” dan “She told that …”.'
        ]
      },
      {
        title: 'Backshift tense',
        icon: 'history',
        body: [
          'Bila kata kerja pelapor dalam bentuk lampau (said, told), tense di dalam ucapan biasanya mundur satu langkah.'
        ],
        table: {
          headers: ['Kalimat langsung', 'Kalimat tidak langsung'],
          rows: [
            ['present simple: “I am busy.”', 'past simple: He said he was busy.'],
            ['present continuous: “I am working.”', 'past continuous: He said he was working.'],
            ['past simple: “I lost my key.”', 'past perfect: He said he had lost his key.'],
            ['present perfect: “I have finished.”', 'past perfect: He said he had finished.'],
            ['will: “I will call you.”', 'would: He said he would call me.'],
            ['can: “I can swim.”', 'could: He said he could swim.']
          ]
        },
        tip: 'Backshift boleh tidak dilakukan bila informasinya masih benar sekarang: “She said the earth is round.”'
      },
      {
        title: 'Kata ganti & keterangan waktu',
        icon: 'clock',
        bullets: [
          'now → then',
          'today → that day',
          'tomorrow → the next day / the following day',
          'yesterday → the day before / the previous day',
          'here → there; this → that'
        ],
        examples: [
          { en: '“I will finish it tomorrow,” Andi said. → Andi said he would finish it the next day.', id: 'Kata ganti dan keterangan waktu ikut menyesuaikan.' }
        ]
      },
      {
        title: 'Pertanyaan & perintah',
        icon: 'quote',
        examples: [
          { en: '“Do you like coffee?” → She asked if I liked coffee.', id: 'Pertanyaan yes/no memakai if atau whether.' },
          { en: '“Where do you live?” → He asked where I lived.', id: 'Pertanyaan wh- memakai susunan kalimat biasa, tanpa do/does.' },
          { en: '“Close the door.” → She told me to close the door.', id: 'Perintah: told + orang + to + V‑base.' },
          { en: '“Don’t be late.” → He told us not to be late.', id: 'Larangan: told + orang + not to + V‑base.' }
        ]
      }
    ],
    quiz: [
      { id: 'rs-1', type: 'mcq', prompt: '“I am tired,” said Lina. → Lina said that she ___ tired.', options: ['are', 'was', 'were', 'be'], answer: 'b', explanation: 'Backshift: am → was. Subjek she memakai was.' },
      { id: 'rs-2', type: 'mcq', prompt: 'He ___ me that he would come later.', options: ['said', 'told', 'asked', 'spoke'], answer: 'b', explanation: 'Tell diikuti orang (me). Said tidak langsung diikuti objek orang.' },
      { id: 'rs-3', type: 'type', prompt: '“I will call you,” Rudi said yesterday. → Rudi said he ___ call me. (backshift)', placeholder: 'Tulis satu kata', answers: ['would'], explanation: 'Backshift: will → would.' },
      { id: 'rs-4', type: 'mcq', prompt: '“I have finished the report,” he said. → He said he ___ the report.', options: ['have finished', 'had finished', 'finishes', 'was finish'], answer: 'b', explanation: 'Present perfect mundur menjadi past perfect: had finished.' },
      { id: 'rs-5', type: 'mcq', prompt: '“Where do you live?” → She asked me where ___.', options: ['do I live', 'I lived', 'did I live', 'I do live'], answer: 'b', explanation: 'Pertanyaan tidak langsung memakai susunan kalimat biasa dan backshift: where I lived.' },
      { id: 'rs-6', type: 'mcq', prompt: '“Are you hungry?” → He asked ___ I was hungry.', options: ['that', 'if', 'what', 'to'], answer: 'b', explanation: 'Pertanyaan yes/no dilaporkan dengan if atau whether.' },
      { id: 'rs-7', type: 'type', prompt: '“Close the window, please.” → She asked me ___ close the window.', placeholder: 'Tulis satu kata', answers: ['to'], explanation: 'Permintaan: asked + orang + to + V‑base.' },
      { id: 'rs-8', type: 'mcq', prompt: 'Minggu lalu Arif berkata, “I’m leaving tomorrow.” → Arif said he was leaving ___.', options: ['tomorrow', 'the next day', 'yesterday', 'the day before'], answer: 'b', explanation: 'Karena dilaporkan di waktu lain, tomorrow berubah menjadi the next day.' }
    ]
  },

  /* =====================================================
     GRAMMAR B2 — RELATIVE CLAUSES
     ===================================================== */
  {
    id: 'relative-clauses',
    track: 'grammar',
    order: 12,
    title: 'Relative Clauses',
    subtitle: 'Who, which, that, whose, where',
    level: 'B2',
    minutes: 9,
    icon: 'link',
    accent: 'violet',
    description: 'Menggabungkan informasi dengan relative clause, termasuk perbedaan defining dan non-defining.',
    objectives: [
      'Memilih who, which, that, whose, where, dan when dengan tepat',
      'Membedakan defining dan non-defining clause beserta tanda komanya',
      'Menghilangkan relative pronoun saat berfungsi sebagai objek'
    ],
    sections: [
      {
        title: 'Kata penghubung',
        icon: 'link',
        table: {
          headers: ['Pronoun', 'Untuk', 'Contoh'],
          rows: [
            ['who', 'orang', 'The woman who lives next door is a nurse.'],
            ['which', 'benda / hewan', 'The laptop which I bought is fast.'],
            ['that', 'orang atau benda (defining saja)', 'The film that we watched was funny.'],
            ['whose', 'kepemilikan', 'He’s the student whose bag was stolen.'],
            ['where', 'tempat', 'This is the café where we first met.'],
            ['when', 'waktu', 'I remember the day when we graduated.']
          ]
        }
      },
      {
        title: 'Defining vs non-defining',
        icon: 'scale',
        body: [
          'Defining clause menjelaskan orang atau benda yang mana, dan tidak memakai koma. Non-defining clause hanya menambah informasi, diapit koma, dan tidak boleh memakai that.'
        ],
        examples: [
          { en: 'My sister who lives in Medan is a chef.', id: 'Defining: saya punya lebih dari satu saudara perempuan; yang tinggal di Medan adalah koki.' },
          { en: 'My mother, who lives in Medan, is a chef.', id: 'Non-defining: ibu hanya satu, klausa hanya informasi tambahan.' },
          { en: 'Jakarta, which is the capital, is very busy.', id: 'Non-defining memakai which, bukan that.' }
        ]
      },
      {
        title: 'Menghilangkan pronoun',
        icon: 'pen-line',
        bullets: [
          'Bila who/which/that menjadi OBJEK clause, boleh dihilangkan: The book (that) I borrowed was great.',
          'Bila menjadi SUBJEK, tidak boleh dihilangkan: The man who called you is my uncle.',
          'Pada non-defining clause, pronoun tidak pernah dihilangkan.'
        ],
        tip: 'Jangan menambahkan kata ganti lagi di dalam clause. “The book that I read it” salah; cukup “The book that I read”.'
      }
    ],
    quiz: [
      { id: 'rc-1', type: 'mcq', prompt: 'The man ___ fixed my car is very friendly.', options: ['which', 'who', 'whose', 'where'], answer: 'b', explanation: 'Merujuk ke orang dan menjadi subjek clause: who.' },
      { id: 'rc-2', type: 'mcq', prompt: 'This is the hotel ___ we stayed last year.', options: ['which', 'who', 'where', 'whose'], answer: 'c', explanation: 'Merujuk ke tempat: where (= in which).' },
      { id: 'rc-3', type: 'type', prompt: 'I know a girl ___ father is a pilot.', placeholder: 'Tulis satu kata', answers: ['whose'], explanation: 'Kepemilikan (ayahnya) memakai whose.' },
      { id: 'rc-4', type: 'mcq', prompt: 'Bali, ___ is famous for its beaches, attracts many tourists.', options: ['that', 'which', 'who', 'where'], answer: 'b', explanation: 'Non-defining clause (diapit koma) untuk benda memakai which, bukan that.' },
      { id: 'rc-5', type: 'mcq', prompt: 'Pada kalimat mana relative pronoun BOLEH dihilangkan?', options: ['The man who called you is here.', 'The book that I borrowed was great.', 'My father, who is 60, still works.', 'The dog which bit me ran away.'], answer: 'b', explanation: 'That pada “that I borrowed” adalah objek, jadi boleh dihilangkan.' },
      { id: 'rc-6', type: 'mcq', prompt: 'Pilih kalimat yang benar.', options: ['The phone that I bought it is broken.', 'The phone that I bought is broken.', 'The phone who I bought is broken.', 'The phone what I bought is broken.'], answer: 'b', explanation: 'Tidak boleh ada kata ganti tambahan (it), dan benda tidak memakai who/what.' },
      { id: 'rc-7', type: 'type', prompt: 'I’ll never forget the day ___ I met you. (waktu)', placeholder: 'Tulis satu kata', answers: ['when', 'that'], explanation: 'Untuk waktu memakai when (that juga diterima pada defining clause).' },
      { id: 'rc-8', type: 'mcq', prompt: 'The students ___ passed the exam will get a certificate.', options: ['who', 'whose', 'which', 'where'], answer: 'a', explanation: 'Merujuk ke orang sebagai subjek clause: who.' }
    ]
  },

  /* =====================================================
     VOCABULARY A1 — FAMILY & PEOPLE
     ===================================================== */
  {
    id: 'family-people',
    track: 'vocabulary',
    order: 3,
    title: 'Family & People',
    subtitle: 'Keluarga dan orang di sekitarmu',
    level: 'A1',
    minutes: 7,
    icon: 'users',
    accent: 'teal',
    description: 'Kosakata untuk memperkenalkan keluarga dan menggambarkan orang.',
    objectives: [
      'Menyebut anggota keluarga inti dan keluarga besar',
      'Menggambarkan penampilan dan usia seseorang',
      'Memakai possessive seperti my brother’s wife'
    ],
    sections: [
      {
        title: 'Keluarga inti & keluarga besar',
        icon: 'users',
        bullets: [
          'parents = orang tua; siblings = saudara kandung',
          'grandparents = kakek dan nenek; grandchildren = cucu',
          'uncle / aunt = paman / bibi; cousin = sepupu',
          'nephew / niece = keponakan laki-laki / perempuan',
          'husband / wife = suami / istri'
        ],
        examples: [
          { en: 'I have two siblings: an older brother and a younger sister.', id: 'Saya punya dua saudara kandung: seorang kakak laki-laki dan seorang adik perempuan.' },
          { en: 'My uncle’s children are my cousins.', id: 'Anak-anak paman saya adalah sepupu saya.' }
        ]
      },
      {
        title: 'Menggambarkan orang',
        icon: 'user',
        bullets: [
          'tall / short = tinggi / pendek',
          'young / elderly = muda / lanjut usia',
          'curly / straight hair = rambut keriting / lurus',
          'friendly / shy = ramah / pemalu'
        ],
        tip: 'Untuk usia gunakan be: “She is twenty years old”, bukan “She has twenty years”.'
      }
    ],
    vocab: [
      { word: 'sibling', phonetic: '/ˈsɪblɪŋ/', pos: 'noun', meaning: 'saudara kandung', example: 'Do you have any siblings?', exampleId: 'Apakah kamu punya saudara kandung?', collocation: 'an older sibling' },
      { word: 'cousin', phonetic: '/ˈkʌzən/', pos: 'noun', meaning: 'sepupu', example: 'My cousin lives in Bandung.', exampleId: 'Sepupu saya tinggal di Bandung.', collocation: 'a distant cousin' },
      { word: 'grandparents', phonetic: '/ˈɡrænperənts/', pos: 'noun', meaning: 'kakek dan nenek', example: 'We visit our grandparents every Eid.', exampleId: 'Kami mengunjungi kakek dan nenek setiap Lebaran.', collocation: 'live with your grandparents' },
      { word: 'nephew', phonetic: '/ˈnefjuː/', pos: 'noun', meaning: 'keponakan laki-laki', example: 'My nephew is five years old.', exampleId: 'Keponakan laki-laki saya berumur lima tahun.', collocation: 'my little nephew' },
      { word: 'niece', phonetic: '/niːs/', pos: 'noun', meaning: 'keponakan perempuan', example: 'Her niece loves drawing.', exampleId: 'Keponakan perempuannya suka menggambar.', collocation: 'nieces and nephews' },
      { word: 'elderly', phonetic: '/ˈeldərli/', pos: 'adjective', meaning: 'lanjut usia', example: 'He takes care of his elderly father.', exampleId: 'Dia merawat ayahnya yang sudah lanjut usia.', collocation: 'elderly people' },
      { word: 'get along with', phonetic: '/ɡet əˈlɔːŋ wɪð/', pos: 'phrasal verb', meaning: 'akur dengan', example: 'I get along with my sister.', exampleId: 'Saya akur dengan saudara perempuan saya.', collocation: 'get along well with' },
      { word: 'take after', phonetic: '/teɪk ˈæftər/', pos: 'phrasal verb', meaning: 'mirip (orang tua/kerabat)', example: 'She takes after her mother.', exampleId: 'Dia mirip ibunya.', collocation: 'take after your father' }
    ],
    quiz: [
      { id: 'fp-1', type: 'mcq', prompt: 'Your aunt’s son is your ___.', options: ['nephew', 'cousin', 'uncle', 'brother'], answer: 'b', explanation: 'Anak dari paman atau bibi adalah cousin (sepupu).' },
      { id: 'fp-2', type: 'mcq', prompt: 'Apa arti “siblings”?', options: ['Orang tua', 'Saudara kandung', 'Sepupu', 'Teman dekat'], answer: 'b', explanation: 'Siblings = saudara kandung (kakak/adik).' },
      { id: 'fp-3', type: 'type', prompt: 'My brother’s daughter is my ___.', placeholder: 'Tulis satu kata', answers: ['niece'], explanation: 'Anak perempuan dari saudara kandung adalah niece.' },
      { id: 'fp-4', type: 'mcq', prompt: 'She looks exactly like her mother. She really takes ___ her.', options: ['after', 'over', 'off', 'up'], answer: 'a', explanation: 'Take after = mirip dengan orang tua atau kerabat.' },
      { id: 'fp-5', type: 'mcq', prompt: 'My grandmother is 85. She is ___.', options: ['elderly', 'young', 'teenage', 'childish'], answer: 'a', explanation: 'Elderly adalah kata yang sopan untuk lanjut usia.' },
      { id: 'fp-6', type: 'mcq', prompt: 'I get ___ with my roommate; we never argue.', options: ['along', 'away', 'over', 'through'], answer: 'a', explanation: 'Get along with = akur dengan.' },
      { id: 'fp-7', type: 'mcq', prompt: 'Pilih kalimat yang benar tentang usia.', options: ['He has 30 years.', 'He is 30 years old.', 'He have 30 years old.', 'He is 30 year old.'], answer: 'b', explanation: 'Usia memakai be + angka + years old.' },
      { id: 'fp-8', type: 'type', prompt: 'My mother’s mother is my ___.', placeholder: 'Tulis satu kata', answers: ['grandmother', 'grandma', 'granny'], explanation: 'Ibu dari ibu adalah grandmother (grandma).' }
    ]
  },

  /* =====================================================
     VOCABULARY A2 — SHOPPING & MONEY
     ===================================================== */
  {
    id: 'shopping-money',
    track: 'vocabulary',
    order: 5,
    title: 'Shopping & Money',
    subtitle: 'Belanja, harga, dan pembayaran',
    level: 'A2',
    minutes: 7,
    icon: 'shopping-bag',
    accent: 'teal',
    description: 'Frasa untuk bertanya harga, mencoba barang, membayar, dan mengembalikan barang.',
    objectives: [
      'Bertanya harga dan ukuran dengan sopan',
      'Memahami kata seperti discount, receipt, dan refund',
      'Membedakan spend, cost, pay, dan afford'
    ],
    sections: [
      {
        title: 'Di toko',
        icon: 'shopping-bag',
        examples: [
          { en: 'How much is this jacket?', id: 'Berapa harga jaket ini?' },
          { en: 'Can I try it on?', id: 'Boleh saya coba?' },
          { en: 'Do you have this in a smaller size?', id: 'Apakah ada ukuran yang lebih kecil?' },
          { en: 'I’ll take it.', id: 'Saya ambil yang ini.' }
        ]
      },
      {
        title: 'Uang & pembayaran',
        icon: 'ticket',
        bullets: [
          'cash / card = tunai / kartu',
          'receipt = struk',
          'discount = potongan harga',
          'refund = pengembalian uang',
          'change = uang kembalian',
          'on sale = sedang diskon'
        ],
        tip: 'Spend money ON something, pay FOR something, something costs money, dan afford = mampu membeli: “I can’t afford a new car.”'
      }
    ],
    vocab: [
      { word: 'receipt', phonetic: '/rɪˈsiːt/', pos: 'noun', meaning: 'struk, tanda terima', example: 'Keep the receipt in case you need a refund.', exampleId: 'Simpan struknya kalau-kalau kamu butuh pengembalian uang.', collocation: 'ask for a receipt' },
      { word: 'refund', phonetic: '/ˈriːfʌnd/', pos: 'noun', meaning: 'pengembalian uang', example: 'The shop gave me a full refund.', exampleId: 'Toko itu mengembalikan uang saya sepenuhnya.', collocation: 'get a refund' },
      { word: 'discount', phonetic: '/ˈdɪskaʊnt/', pos: 'noun', meaning: 'potongan harga', example: 'Students get a 10% discount.', exampleId: 'Pelajar mendapat potongan harga 10%.', collocation: 'a big discount' },
      { word: 'afford', phonetic: '/əˈfɔːrd/', pos: 'verb', meaning: 'mampu membeli/membayar', example: 'We can’t afford a new car this year.', exampleId: 'Kami tidak mampu membeli mobil baru tahun ini.', collocation: 'can’t afford to' },
      { word: 'bargain', phonetic: '/ˈbɑːrɡən/', pos: 'noun', meaning: 'barang murah, harga miring', example: 'These shoes were a real bargain.', exampleId: 'Sepatu ini benar-benar murah.', collocation: 'a good bargain' },
      { word: 'change', phonetic: '/tʃeɪndʒ/', pos: 'noun', meaning: 'uang kembalian', example: 'Here is your change.', exampleId: 'Ini uang kembalianmu.', collocation: 'keep the change' },
      { word: 'try on', phonetic: '/traɪ ɑːn/', pos: 'phrasal verb', meaning: 'mencoba (pakaian)', example: 'Can I try on these jeans?', exampleId: 'Boleh saya mencoba celana jins ini?', collocation: 'try on a dress' },
      { word: 'on sale', phonetic: '/ɑːn seɪl/', pos: 'phrase', meaning: 'sedang diskon', example: 'Winter coats are on sale this week.', exampleId: 'Mantel musim dingin sedang diskon minggu ini.', collocation: 'everything is on sale' }
    ],
    quiz: [
      { id: 'sm-1', type: 'mcq', prompt: 'Excuse me, how much ___ these shoes?', options: ['is', 'are', 'do', 'does'], answer: 'b', explanation: 'These shoes jamak, jadi memakai are.' },
      { id: 'sm-2', type: 'mcq', prompt: 'The shirt was damaged, so the shop gave me a ___.', options: ['receipt', 'refund', 'bargain', 'discount'], answer: 'b', explanation: 'Refund = pengembalian uang.' },
      { id: 'sm-3', type: 'type', prompt: 'Can I ___ on this jacket before I buy it?', placeholder: 'Tulis satu kata', answers: ['try'], explanation: 'Try on = mencoba pakaian.' },
      { id: 'sm-4', type: 'mcq', prompt: 'I’d love that phone, but I can’t ___ it. It’s too expensive.', options: ['afford', 'spend', 'cost', 'pay'], answer: 'a', explanation: 'Afford = mampu membeli.' },
      { id: 'sm-5', type: 'mcq', prompt: 'How much did you ___ on clothes last month?', options: ['spend', 'pay', 'cost', 'buy'], answer: 'a', explanation: 'Spend money on something = menghabiskan uang untuk sesuatu.' },
      { id: 'sm-6', type: 'mcq', prompt: 'The cashier gave me a ___ showing what I bought.', options: ['receipt', 'refund', 'change', 'sale'], answer: 'a', explanation: 'Receipt = struk belanja.' },
      { id: 'sm-7', type: 'type', prompt: 'This dress was only Rp50.000. What a ___!', placeholder: 'Tulis satu kata', answers: ['bargain', 'steal'], explanation: 'Bargain = barang dengan harga sangat murah.' },
      { id: 'sm-8', type: 'mcq', prompt: 'You paid Rp100.000 for a Rp80.000 item. Here is your ___.', options: ['change', 'discount', 'refund', 'bill'], answer: 'a', explanation: 'Change = uang kembalian.' }
    ]
  },

  /* =====================================================
     VOCABULARY A2 — HEALTH & BODY
     ===================================================== */
  {
    id: 'health-body',
    track: 'vocabulary',
    order: 6,
    title: 'Health & Body',
    subtitle: 'Badan, gejala, dan ke dokter',
    level: 'A2',
    minutes: 7,
    icon: 'heart',
    accent: 'teal',
    description: 'Kosakata untuk menjelaskan rasa sakit, gejala, dan saran kesehatan.',
    objectives: [
      'Menyebut gejala umum seperti headache, fever, dan cough',
      'Menjelaskan keluhan kepada dokter atau apoteker',
      'Memberi saran kesehatan dengan should'
    ],
    sections: [
      {
        title: 'Gejala umum',
        icon: 'heart',
        bullets: [
          'I have a headache / stomachache / toothache.',
          'I have a fever / a cough / a sore throat.',
          'I feel dizzy / sick / exhausted.',
          'My back hurts. My ankle is swollen.'
        ],
        tip: 'Gunakan have a + gejala: “I have a cold.” Untuk bagian tubuh yang sakit: “My knee hurts.”'
      },
      {
        title: 'Di dokter & apotek',
        icon: 'message-circle',
        examples: [
          { en: 'What seems to be the problem?', id: 'Apa keluhannya?' },
          { en: 'I’ve had a sore throat for three days.', id: 'Tenggorokan saya sakit sudah tiga hari.' },
          { en: 'Take this medicine twice a day after meals.', id: 'Minum obat ini dua kali sehari setelah makan.' },
          { en: 'You should get some rest and drink plenty of water.', id: 'Sebaiknya kamu istirahat dan minum banyak air.' }
        ]
      }
    ],
    vocab: [
      { word: 'headache', phonetic: '/ˈhedeɪk/', pos: 'noun', meaning: 'sakit kepala', example: 'I have a terrible headache.', exampleId: 'Kepala saya sakit sekali.', collocation: 'a bad headache' },
      { word: 'fever', phonetic: '/ˈfiːvər/', pos: 'noun', meaning: 'demam', example: 'The child has a high fever.', exampleId: 'Anak itu demam tinggi.', collocation: 'a high fever' },
      { word: 'sore throat', phonetic: '/sɔːr θroʊt/', pos: 'noun', meaning: 'sakit tenggorokan', example: 'Warm tea helps a sore throat.', exampleId: 'Teh hangat membantu meredakan sakit tenggorokan.', collocation: 'have a sore throat' },
      { word: 'dizzy', phonetic: '/ˈdɪzi/', pos: 'adjective', meaning: 'pusing (berkunang-kunang)', example: 'I feel dizzy when I stand up quickly.', exampleId: 'Saya pusing kalau berdiri terlalu cepat.', collocation: 'feel dizzy' },
      { word: 'prescription', phonetic: '/prɪˈskrɪpʃən/', pos: 'noun', meaning: 'resep dokter', example: 'You need a prescription for this medicine.', exampleId: 'Kamu butuh resep dokter untuk obat ini.', collocation: 'a prescription for' },
      { word: 'recover', phonetic: '/rɪˈkʌvər/', pos: 'verb', meaning: 'pulih', example: 'She recovered quickly after the surgery.', exampleId: 'Dia pulih dengan cepat setelah operasi.', collocation: 'recover from an illness' },
      { word: 'injury', phonetic: '/ˈɪndʒəri/', pos: 'noun', meaning: 'cedera', example: 'He missed the match because of a knee injury.', exampleId: 'Dia absen dari pertandingan karena cedera lutut.', collocation: 'a serious injury' },
      { word: 'check-up', phonetic: '/ˈtʃek ʌp/', pos: 'noun', meaning: 'pemeriksaan kesehatan rutin', example: 'I go for a check-up once a year.', exampleId: 'Saya melakukan pemeriksaan kesehatan setahun sekali.', collocation: 'a regular check-up' }
    ],
    quiz: [
      { id: 'hb-1', type: 'mcq', prompt: 'My head hurts. I have a ___.', options: ['headache', 'fever', 'cough', 'injury'], answer: 'a', explanation: 'Sakit kepala = headache.' },
      { id: 'hb-2', type: 'mcq', prompt: 'Apa arti “dizzy”?', options: ['Mengantuk', 'Pusing berkunang-kunang', 'Lapar', 'Demam'], answer: 'b', explanation: 'Dizzy = pusing, seperti mau jatuh.' },
      { id: 'hb-3', type: 'type', prompt: 'Your temperature is 39°C. You have a ___.', placeholder: 'Tulis satu kata', answers: ['fever', 'high fever', 'temperature'], explanation: 'Suhu tubuh 39°C berarti demam: fever.' },
      { id: 'hb-4', type: 'mcq', prompt: 'You need a ___ from the doctor to buy this medicine.', options: ['prescription', 'receipt', 'check-up', 'recipe'], answer: 'a', explanation: 'Prescription = resep dokter. Recipe adalah resep masakan.' },
      { id: 'hb-5', type: 'mcq', prompt: 'It took him two weeks to ___ from the flu.', options: ['recover', 'injure', 'prescribe', 'hurt'], answer: 'a', explanation: 'Recover from = pulih dari.' },
      { id: 'hb-6', type: 'mcq', prompt: 'I can’t talk much. I have a sore ___.', options: ['throat', 'head', 'stomach', 'tooth'], answer: 'a', explanation: 'Sore throat = sakit tenggorokan.' },
      { id: 'hb-7', type: 'mcq', prompt: 'You look exhausted. You ___ get some rest.', options: ['should', 'shouldn’t', 'mustn’t', 'don’t'], answer: 'a', explanation: 'Saran memakai should + V‑base.' },
      { id: 'hb-8', type: 'type', prompt: 'He fell during the match and got a knee ___.', placeholder: 'Tulis satu kata', answers: ['injury'], explanation: 'Cedera = injury.' }
    ]
  },

  /* =====================================================
     VOCABULARY B1 — FEELINGS & PERSONALITY
     ===================================================== */
  {
    id: 'feelings-personality',
    track: 'vocabulary',
    order: 9,
    title: 'Feelings & Personality',
    subtitle: 'Emosi dan karakter seseorang',
    level: 'B1',
    minutes: 8,
    icon: 'smile',
    accent: 'teal',
    description: 'Kosakata untuk mengungkapkan perasaan dengan lebih tepat dan menggambarkan kepribadian.',
    objectives: [
      'Membedakan adjective -ed (perasaan) dan -ing (penyebab)',
      'Menggambarkan kepribadian secara positif dan negatif',
      'Memakai preposition yang tepat: proud of, worried about'
    ],
    sections: [
      {
        title: '-ed atau -ing?',
        icon: 'scale',
        bullets: [
          '-ed menjelaskan perasaan seseorang: I’m bored. She was excited.',
          '-ing menjelaskan penyebab perasaan: The film is boring. The news was exciting.'
        ],
        examples: [
          { en: 'I was so embarrassed when I fell.', id: 'Saya sangat malu saat terjatuh.' },
          { en: 'That was an embarrassing moment.', id: 'Itu momen yang memalukan.' }
        ]
      },
      {
        title: 'Perasaan + preposition',
        icon: 'link',
        bullets: [
          'proud of = bangga akan',
          'worried about = khawatir tentang',
          'afraid of = takut pada',
          'interested in = tertarik pada',
          'disappointed with = kecewa dengan',
          'jealous of = iri pada'
        ]
      },
      {
        title: 'Kepribadian',
        icon: 'user',
        bullets: [
          'reliable = dapat diandalkan',
          'outgoing = mudah bergaul',
          'stubborn = keras kepala',
          'generous = murah hati',
          'patient = sabar',
          'arrogant = sombong'
        ],
        tip: 'Kritik bisa dilunakkan: “He can be a bit stubborn” terdengar lebih halus daripada “He is stubborn”.'
      }
    ],
    vocab: [
      { word: 'embarrassed', phonetic: '/ɪmˈbærəst/', pos: 'adjective', meaning: 'malu', example: 'I felt embarrassed when I forgot her name.', exampleId: 'Saya merasa malu ketika lupa namanya.', collocation: 'feel embarrassed' },
      { word: 'anxious', phonetic: '/ˈæŋkʃəs/', pos: 'adjective', meaning: 'cemas', example: 'She gets anxious before exams.', exampleId: 'Dia cemas menjelang ujian.', collocation: 'anxious about' },
      { word: 'relieved', phonetic: '/rɪˈliːvd/', pos: 'adjective', meaning: 'lega', example: 'I was relieved to hear the good news.', exampleId: 'Saya lega mendengar kabar baik itu.', collocation: 'feel relieved' },
      { word: 'grateful', phonetic: '/ˈɡreɪtfəl/', pos: 'adjective', meaning: 'bersyukur, berterima kasih', example: 'I’m grateful for your help.', exampleId: 'Saya berterima kasih atas bantuanmu.', collocation: 'grateful for' },
      { word: 'reliable', phonetic: '/rɪˈlaɪəbəl/', pos: 'adjective', meaning: 'dapat diandalkan', example: 'He is a reliable colleague.', exampleId: 'Dia rekan kerja yang dapat diandalkan.', collocation: 'a reliable friend' },
      { word: 'outgoing', phonetic: '/ˈaʊtɡoʊɪŋ/', pos: 'adjective', meaning: 'mudah bergaul', example: 'My sister is outgoing and loves parties.', exampleId: 'Kakak saya mudah bergaul dan suka pesta.', collocation: 'an outgoing personality' },
      { word: 'stubborn', phonetic: '/ˈstʌbərn/', pos: 'adjective', meaning: 'keras kepala', example: 'He’s too stubborn to admit he’s wrong.', exampleId: 'Dia terlalu keras kepala untuk mengakui kesalahannya.', collocation: 'as stubborn as a mule' },
      { word: 'generous', phonetic: '/ˈdʒenərəs/', pos: 'adjective', meaning: 'murah hati', example: 'Thank you for your generous donation.', exampleId: 'Terima kasih atas sumbanganmu yang murah hati.', collocation: 'a generous gift' }
    ],
    quiz: [
      { id: 'fe-1', type: 'mcq', prompt: 'The movie was so long and slow. It was really ___.', options: ['bored', 'boring', 'bore', 'boredom'], answer: 'b', explanation: 'Film adalah penyebab rasa bosan, jadi memakai -ing: boring.' },
      { id: 'fe-2', type: 'mcq', prompt: 'I was ___ when I tripped in front of everyone.', options: ['embarrassing', 'embarrassed', 'embarrass', 'embarrassment'], answer: 'b', explanation: 'Perasaan seseorang memakai -ed: embarrassed.' },
      { id: 'fe-3', type: 'type', prompt: 'My parents are very proud ___ me.', placeholder: 'Tulis satu kata', answers: ['of'], explanation: 'Proud of = bangga akan.' },
      { id: 'fe-4', type: 'mcq', prompt: 'She always keeps her promises. She is very ___.', options: ['reliable', 'stubborn', 'arrogant', 'anxious'], answer: 'a', explanation: 'Selalu menepati janji = reliable (dapat diandalkan).' },
      { id: 'fe-5', type: 'mcq', prompt: 'After the long wait, we were ___ to hear that everyone was safe.', options: ['relieved', 'jealous', 'stubborn', 'bored'], answer: 'a', explanation: 'Relieved = lega setelah khawatir.' },
      { id: 'fe-6', type: 'mcq', prompt: 'He never changes his mind, even when he is wrong. He is ___.', options: ['generous', 'stubborn', 'outgoing', 'grateful'], answer: 'b', explanation: 'Stubborn = keras kepala.' },
      { id: 'fe-7', type: 'type', prompt: 'Rina is worried ___ her job interview tomorrow.', placeholder: 'Tulis satu kata', answers: ['about'], explanation: 'Worried about = khawatir tentang.' },
      { id: 'fe-8', type: 'mcq', prompt: 'Someone who loves meeting new people is ___.', options: ['shy', 'outgoing', 'anxious', 'patient'], answer: 'b', explanation: 'Outgoing = mudah bergaul.' }
    ]
  },

  /* =====================================================
     VOCABULARY B2 — MEDIA & NEWS
     ===================================================== */
  {
    id: 'media-news',
    track: 'vocabulary',
    order: 11,
    title: 'Media & News',
    subtitle: 'Berita, media sosial, dan informasi',
    level: 'B2',
    minutes: 8,
    icon: 'newspaper',
    accent: 'teal',
    description: 'Kosakata untuk membicarakan berita, menilai sumber, dan membedakan fakta dari informasi yang menyesatkan.',
    objectives: [
      'Memahami istilah media seperti headline, source, dan coverage',
      'Membicarakan misinformation dan fact-checking',
      'Membedakan laporan faktual dan konten yang bias'
    ],
    sections: [
      {
        title: 'Dunia berita',
        icon: 'newspaper',
        bullets: [
          'headline = judul berita',
          'coverage = liputan',
          'source = sumber',
          'journalist / reporter = wartawan',
          'breaking news = berita terkini',
          'press release = siaran pers'
        ]
      },
      {
        title: 'Informasi di era digital',
        icon: 'cpu',
        examples: [
          { en: 'The story went viral within hours.', id: 'Berita itu viral dalam hitungan jam.' },
          { en: 'Always check whether the source is reliable.', id: 'Selalu periksa apakah sumbernya dapat dipercaya.' },
          { en: 'Fact-checkers found that the claim was misleading.', id: 'Pemeriksa fakta menemukan bahwa klaim itu menyesatkan.' },
          { en: 'The article is biased towards one political party.', id: 'Artikel itu condong ke satu partai politik.' }
        ],
        tip: 'Misinformation = informasi salah yang tersebar tanpa sengaja; disinformation = informasi salah yang sengaja disebarkan untuk menipu.'
      }
    ],
    vocab: [
      { word: 'headline', phonetic: '/ˈhedlaɪn/', pos: 'noun', meaning: 'judul berita', example: 'The scandal made headlines around the world.', exampleId: 'Skandal itu menjadi berita utama di seluruh dunia.', collocation: 'make headlines' },
      { word: 'coverage', phonetic: '/ˈkʌvərɪdʒ/', pos: 'noun', meaning: 'liputan', example: 'The election received wide media coverage.', exampleId: 'Pemilu itu mendapat liputan media yang luas.', collocation: 'live coverage' },
      { word: 'source', phonetic: '/sɔːrs/', pos: 'noun', meaning: 'sumber (informasi)', example: 'Journalists must protect their sources.', exampleId: 'Wartawan harus melindungi narasumber mereka.', collocation: 'a reliable source' },
      { word: 'biased', phonetic: '/ˈbaɪəst/', pos: 'adjective', meaning: 'berat sebelah, bias', example: 'The report was biased against small businesses.', exampleId: 'Laporan itu berat sebelah terhadap usaha kecil.', collocation: 'politically biased' },
      { word: 'misleading', phonetic: '/ˌmɪsˈliːdɪŋ/', pos: 'adjective', meaning: 'menyesatkan', example: 'The advertisement contained misleading information.', exampleId: 'Iklan itu berisi informasi yang menyesatkan.', collocation: 'a misleading headline' },
      { word: 'go viral', phonetic: '/ɡoʊ ˈvaɪrəl/', pos: 'phrase', meaning: 'menjadi viral', example: 'Her video went viral overnight.', exampleId: 'Videonya viral dalam semalam.', collocation: 'go viral on social media' },
      { word: 'verify', phonetic: '/ˈverɪfaɪ/', pos: 'verb', meaning: 'memverifikasi, memastikan kebenaran', example: 'Please verify the facts before you share.', exampleId: 'Harap pastikan kebenaran faktanya sebelum membagikan.', collocation: 'verify a claim' },
      { word: 'censorship', phonetic: '/ˈsensərʃɪp/', pos: 'noun', meaning: 'sensor', example: 'The government was accused of censorship.', exampleId: 'Pemerintah dituduh melakukan sensor.', collocation: 'internet censorship' }
    ],
    quiz: [
      { id: 'mn-1', type: 'mcq', prompt: 'The earthquake was on every front page. It made ___ worldwide.', options: ['headlines', 'sources', 'coverages', 'press'], answer: 'a', explanation: 'Make headlines = menjadi berita utama.' },
      { id: 'mn-2', type: 'mcq', prompt: 'A reporter should never reveal a confidential ___.', options: ['source', 'headline', 'coverage', 'bias'], answer: 'a', explanation: 'Source = narasumber atau sumber informasi.' },
      { id: 'mn-3', type: 'type', prompt: 'The video was shared millions of times. It went ___.', placeholder: 'Tulis satu kata', answers: ['viral'], explanation: 'Go viral = menyebar sangat cepat di internet.' },
      { id: 'mn-4', type: 'mcq', prompt: 'The article only presented one side of the story. It was ___.', options: ['biased', 'verified', 'reliable', 'neutral'], answer: 'a', explanation: 'Hanya menampilkan satu sisi = biased.' },
      { id: 'mn-5', type: 'mcq', prompt: 'Before sharing a post, you should ___ the information.', options: ['verify', 'censor', 'mislead', 'cover'], answer: 'a', explanation: 'Verify = memastikan kebenaran.' },
      { id: 'mn-6', type: 'mcq', prompt: 'False information spread deliberately to deceive people is called ___.', options: ['disinformation', 'coverage', 'a headline', 'a press release'], answer: 'a', explanation: 'Disinformation = informasi salah yang sengaja disebarkan.' },
      { id: 'mn-7', type: 'mcq', prompt: 'The TV channel provided live ___ of the football final.', options: ['coverage', 'censorship', 'source', 'headline'], answer: 'a', explanation: 'Live coverage = liputan langsung.' },
      { id: 'mn-8', type: 'type', prompt: 'The headline suggested something that wasn’t true. It was ___ (menyesatkan).', placeholder: 'Tulis satu kata', answers: ['misleading'], explanation: 'Menyesatkan = misleading.' }
    ]
  },

  /* =====================================================
     VOCABULARY B2 — OPINIONS & DEBATE
     ===================================================== */
  {
    id: 'opinions-debate',
    track: 'vocabulary',
    order: 12,
    title: 'Opinions & Debate',
    subtitle: 'Berpendapat, menyanggah, dan berargumen',
    level: 'B2',
    minutes: 9,
    icon: 'message-circle',
    accent: 'teal',
    description: 'Frasa dan kata penghubung untuk menyatakan pendapat, setuju, tidak setuju, dan menyusun argumen yang meyakinkan.',
    objectives: [
      'Menyatakan pendapat dengan frasa yang bervariasi',
      'Setuju dan tidak setuju secara sopan',
      'Memakai linking words seperti however, whereas, dan therefore'
    ],
    sections: [
      {
        title: 'Menyatakan pendapat',
        icon: 'message-circle',
        bullets: [
          'In my opinion, … / From my point of view, …',
          'As far as I’m concerned, …',
          'I strongly believe that …',
          'It seems to me that …'
        ]
      },
      {
        title: 'Setuju & tidak setuju',
        icon: 'scale',
        examples: [
          { en: 'I couldn’t agree more.', id: 'Saya sangat setuju.' },
          { en: 'That’s a fair point, but …', id: 'Itu poin yang masuk akal, tetapi …' },
          { en: 'I see what you mean; however, …', id: 'Saya paham maksudmu; namun, …' },
          { en: 'I’m afraid I don’t see it that way.', id: 'Maaf, saya tidak sependapat.' }
        ],
        tip: '“I couldn’t agree more” berarti sangat setuju, bukan tidak setuju.'
      },
      {
        title: 'Kata penghubung argumen',
        icon: 'link',
        bullets: [
          'however / nevertheless = namun',
          'whereas = sedangkan (mengontraskan dua hal)',
          'therefore / consequently = oleh karena itu',
          'moreover / furthermore = selain itu',
          'despite / in spite of + kata benda = meskipun'
        ],
        tip: 'Despite diikuti kata benda atau V-ing: “Despite the rain, we went out.” Although diikuti kalimat: “Although it rained, we went out.”'
      }
    ],
    vocab: [
      { word: 'argue', phonetic: '/ˈɑːrɡjuː/', pos: 'verb', meaning: 'berpendapat, berargumen', example: 'Some experts argue that homework is unnecessary.', exampleId: 'Beberapa ahli berpendapat bahwa PR tidak diperlukan.', collocation: 'argue that' },
      { word: 'claim', phonetic: '/kleɪm/', pos: 'noun / verb', meaning: 'klaim, mengklaim', example: 'There is no evidence to support his claim.', exampleId: 'Tidak ada bukti yang mendukung klaimnya.', collocation: 'make a claim' },
      { word: 'evidence', phonetic: '/ˈevɪdəns/', pos: 'noun', meaning: 'bukti', example: 'The study provides strong evidence for the theory.', exampleId: 'Penelitian itu memberikan bukti kuat untuk teori tersebut.', collocation: 'solid evidence' },
      { word: 'convincing', phonetic: '/kənˈvɪnsɪŋ/', pos: 'adjective', meaning: 'meyakinkan', example: 'She gave a convincing argument.', exampleId: 'Dia memberikan argumen yang meyakinkan.', collocation: 'a convincing reason' },
      { word: 'nevertheless', phonetic: '/ˌnevərðəˈles/', pos: 'adverb', meaning: 'namun demikian', example: 'The plan is risky. Nevertheless, we will try it.', exampleId: 'Rencana itu berisiko. Namun demikian, kami akan mencobanya.', collocation: 'but nevertheless' },
      { word: 'whereas', phonetic: '/werˈæz/', pos: 'conjunction', meaning: 'sedangkan', example: 'I like coffee, whereas my wife prefers tea.', exampleId: 'Saya suka kopi, sedangkan istri saya lebih suka teh.', collocation: 'A, whereas B' },
      { word: 'drawback', phonetic: '/ˈdrɔːbæk/', pos: 'noun', meaning: 'kekurangan, kelemahan', example: 'The main drawback is the high cost.', exampleId: 'Kekurangan utamanya adalah biaya yang tinggi.', collocation: 'a major drawback' },
      { word: 'compromise', phonetic: '/ˈkɑːmprəmaɪz/', pos: 'noun / verb', meaning: 'kompromi', example: 'After hours of debate, they reached a compromise.', exampleId: 'Setelah berjam-jam berdebat, mereka mencapai kompromi.', collocation: 'reach a compromise' }
    ],
    quiz: [
      { id: 'od-1', type: 'mcq', prompt: '“I couldn’t agree more” berarti …', options: ['Saya sama sekali tidak setuju', 'Saya sangat setuju', 'Saya belum yakin', 'Saya tidak peduli'], answer: 'b', explanation: 'Couldn’t agree more = tidak mungkin lebih setuju lagi, artinya sangat setuju.' },
      { id: 'od-2', type: 'mcq', prompt: '___ the heavy traffic, we arrived on time.', options: ['Although', 'Despite', 'However', 'Whereas'], answer: 'b', explanation: 'Despite diikuti kata benda (the heavy traffic). Although harus diikuti kalimat lengkap.' },
      { id: 'od-3', type: 'type', prompt: 'There is no ___ (bukti) that the drug works.', placeholder: 'Tulis satu kata', answers: ['evidence', 'proof'], explanation: 'Bukti = evidence (atau proof).' },
      { id: 'od-4', type: 'mcq', prompt: 'The hotel was cheap. ___, it was very clean.', options: ['Moreover', 'Whereas', 'Despite', 'Although'], answer: 'a', explanation: 'Menambah poin positif lain memakai moreover (selain itu).' },
      { id: 'od-5', type: 'mcq', prompt: 'My brother loves sports, ___ I prefer reading.', options: ['whereas', 'therefore', 'moreover', 'despite'], answer: 'a', explanation: 'Mengontraskan dua orang memakai whereas (sedangkan).' },
      { id: 'od-6', type: 'mcq', prompt: 'Both sides gave up something and reached a ___.', options: ['compromise', 'claim', 'drawback', 'evidence'], answer: 'a', explanation: 'Reach a compromise = mencapai kompromi.' },
      { id: 'od-7', type: 'mcq', prompt: 'The main ___ of living in a big city is the pollution.', options: ['drawback', 'benefit', 'evidence', 'compromise'], answer: 'a', explanation: 'Polusi adalah kekurangan: drawback.' },
      { id: 'od-8', type: 'type', prompt: 'His argument was clear and logical. It was very ___ (meyakinkan).', placeholder: 'Tulis satu kata', answers: ['convincing', 'persuasive'], explanation: 'Meyakinkan = convincing (persuasive juga diterima).' }
    ]
  }
];
