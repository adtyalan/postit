# Tactile Nostalgia Message Portal (PostIt)

## Product Overview

**The Pitch:** Sebuah layanan pos digital yang menghidupkan kembali kegembiraan intim dan fisik dalam mengirim dan menerima surat. Pengguna membuat, menyegel, dan menemukan pesan-pesan tulus yang menyamar sebagai artefak analog yang nyata.

**Untuk:** Kalangan romantis, teman jarak jauh, dan pencari nostalgia yang mendambakan beban emosional dari surat tulisan tangan di ruang digital.

**Device:** Desktop (Utama) & Mobile Responsive.

**Design Direction:** Kehangatan analog bertemu interaktivitas digital. Bayangkan kertas linen berat, tinta mesin tik yang sedikit luntur, tepian kertas yang tidak rata (deckled edges), dan kepuasan taktil saat membuka segel lilin pada amplop.

**Inspired by:** Felt (pengiriman kartu), Slowly (aplikasi penulisan surat).

---

## Screens

- **Hero / Landing Page (`/`):** Memperkenalkan portal dengan visual meja tulis yang bersih namun taktil.
- **Compose Message (`/compose`):** Lembaran kertas stationery bertekstur untuk merancang surat.
- **Seal & Send (`/seal`):** Kustomisasi amplop dengan prangko vintage dan segel lilin (wax seals).
- **Browse Gallery (`/browse`):** Galeri publik berisi surat-surat yang telah disegel dan dikirim oleh pengguna lain.
- **Read Message (`/read/[id]`):** Pengalaman membuka segel (unsealing) digital yang taktil.
- **Archive (`/archive`):** Koleksi pribadi surat-surat yang telah dibuat atau disimpan oleh pengguna.

---

## Key Flows

**Sending a Letter:**
1. Pengguna di Landing Page -> klik tombol "Draft a Letter".
2. Transisi ke Compose Message -> mengisi To, From, dan isi pesan pada `LetterSheet`.
3. Klik "Fold & Seal" -> transisi ke Seal & Send.
4. Memilih prangko vintage dari sidebar, prangko muncul di amplop.
5. Klik stempel lilin untuk menyegel -> surat terkirim ke database (Neon/Drizzle).

**Discovering a Message:**
1. Pengguna di halaman Browse -> melihat daftar amplop yang tersegel.
2. Klik sebuah amplop -> transisi ke Read Message.
3. Klik pada stempel lilin (Wax Seal) -> amplop terbuka secara dinamis menggunakan Framer Motion.
4. Surat meluncur keluar, menampilkan konten dengan font tulisan tangan.

---

## Technical Stack (Current)

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Database:** Neon (PostgreSQL)
- **ORM:** Drizzle ORM
- **Styling:** Tailwind CSS v4 & Vanilla CSS
- **Animations:** Framer Motion (Tactile transitions & micro-interactions)
- **Data Fetching:** SWR (Client-side fetching for letters)

---

<details>
<summary>Design System</summary>

## Color Palette

- **Primary:** `#B24A40` - Faded wax seal red. Buttons, primary CTAs.
- **Background:** `#F4EEDD` - Aged parchment. Main canvas.
- **Surface:** `#E8DEC3` - Kraft paper envelopes, layered cards.
- **Text:** `#2A2626` - Faded typewriter ink black.
- **Muted:** `#8C8273` - Smudged graphite. Secondary text, borders, postmarks.
- **Accent:** `#6B705C` - Vintage olive green. Highlights, selected stamps.

## Typography

- **Headings:** `Special Elite`, 400, 32-48px (Typewriter texture)
- **Body/UI Elements:** `Courier Prime`, 400, 16px (Clean typewriter)
- **Handwritten Messages:** `Zeyada`, 400, 24px (Messy cursive)
- **Small text:** `Courier Prime`, 400, 12px
- **Buttons:** `Special Elite`, 400, 16px, uppercase tracking 2px

**Style notes:** Menggunakan `box-shadow` keras (e.g., `4px 4px 0px #2A2626`) untuk meniru kedalaman fisik. Tekstur kertas menggunakan filter noise SVG. Tipografi harus terasa sedikit "imperfect".

</details>

---

<details>
<summary>Screen Specifications</summary>

### Landing Page
- **Layout:** Fokus pada elemen Hero yang bersih dengan tipografi editorial.
- **Key Components:** `NavigationHeader`, CTA dengan bayangan keras.

### Compose Message
- **Layout:** Centered single sheet menggunakan komponen modular `LetterSheet` dan `LetterContent`.
- **Interactions:** Input transparan di atas garis kertas ruled, mendukung pemilihan font secara dinamis.

### Seal & Send
- **Layout:** Split screen (Desktop). Kiri: Amplop preview. Kanan: Sidebar prangko.
- **Interactions:** Klik prangko di sidebar untuk menempelkannya ke amplop secara instan.

### Browse / Gallery
- **Layout:** Responsive grid menggunakan `EnvelopeCard`.
- **Visual:** Amplop menampilkan nama To/From dan prangko yang dipilih.

### Read Message
- **Layout:** Fokus pada amplop tertutup di tengah layar.
- **Interactions:** Klik Wax Seal untuk animasi "unsealing". Layout dioptimalkan agar muat dalam satu layar (`h-svh`).

</details>

---

## Future Roadmap & To-Do

### 1. Estetika "Dead Letter Office" (Gallery)
- [ ] Implementasi **Masonry Grid** yang lebih dinamis untuk halaman Browse.
- [ ] Menambahkan **Random Rotation & Skew** pada setiap `EnvelopeCard` agar terasa berantakan seperti di papan gabus (corkboard).
- [ ] Efek **Overlapping Envelopes** yang bisa digeser (draggable) untuk menemukan surat di bawahnya.
- [ ] Tekstur latar belakang papan gabus (corkboard) atau kayu tua untuk galeri.

### 2. Interaktivitas Taktil Lanjutan
- [ ] **Manual Tearing:** Mengembalikan ide awal "merobek" tepi amplop dengan kursor.
- [ ] **Drag & Drop Stamps:** Pengguna bisa menyeret prangko dan menaruhnya di posisi mana pun pada amplop.
- [ ] **Sound Effects:** Menambahkan suara goresan pena, kertas yang dilipat, dan stempel lilin yang ditekan.

### 3. Fitur Tambahan
- [ ] **Draft Persistence:** Simpan otomatis draf surat ke LocalStorage.
- [ ] **Reply Flow:** Memungkinkan pengguna membalas surat yang mereka baca.
- [ ] **Physical Export:** Opsi untuk mengunduh surat sebagai PDF siap cetak.