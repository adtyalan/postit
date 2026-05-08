<!-- BEGIN:nextjs-agent-rules -->
# Ini BUKAN Next.js yang Anda kenal sebelumnya

Versi ini memiliki perubahan besar — API, konvensi, dan struktur file mungkin berbeda dari data pelatihan Anda. Baca panduan relevan di `node_modules/next/dist/docs/` sebelum menulis kode apa pun. Perhatikan peringatan depresiasi.
<!-- END:nextjs-agent-rules -->

# Aturan Tambahan Tech Stack

## 📡 Pengambilan Data (SWR)
- Gunakan **SWR** (`useSWR`) untuk semua kebutuhan fetch data di sisi klien (Client Components).
- Pastikan untuk mendefinisikan `fetcher` yang konsisten: `const fetcher = (url: string) => fetch(url).then((res) => res.json())`.
- Prioritaskan optimisme UI jika memungkinkan saat melakukan mutasi data.

## 🎬 Animasi (Framer Motion)
- Gunakan **Framer Motion** untuk memberikan kesan taktil, premium, dan hidup pada aplikasi.
- Gunakan `AnimatePresence` untuk animasi masuk/keluar elemen (entry/exit animations).
- Fokus pada mikro-interaksi seperti hover, tap, dan transisi halaman yang halus untuk meningkatkan User Experience.

## 🛡️ Prosedur Modifikasi Komponen & Shared Code
- Sebelum memodifikasi suatu komponen atau *shared code*, **selalu lakukan pengecekan menyeluruh**. Pertimbangkan efek samping dan perubahan tidak diinginkan yang mungkin terjadi di tempat lain yang menggunakan kode tersebut.
- **Wajib mengonfirmasi ke user terlebih dahulu** mengenai dampak perubahan tersebut sebelum benar-benar mengimplementasikannya.
