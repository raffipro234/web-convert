<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VnX - Foto To Link</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    
    <style>
        /* Background Putih Nebula ala iPhone dengan aura Biru/Ungu lembut */
        body {
            background: radial-gradient(circle at 50% 30%, #f4f7fa 0%, #eef2f7 50%, #e2e8f0 100%);
            position: relative;
            overflow-x: hidden;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }
        
        body::before {
            content: "";
            position: absolute;
            top: -20%;
            left: -20%;
            width: 140%;
            height: 140%;
            background: radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.12) 0%, transparent 40%),
                        radial-gradient(circle at 20% 70%, rgba(147, 51, 234, 0.08) 0%, transparent 45%);
            z-index: -1;
            pointer-events: none;
        }

        /* Glassmorphic Light Mode iOS */
        .ios-glass {
            background: rgba(255, 255, 255, 0.45);
            backdrop-filter: blur(25px);
            -webkit-backdrop-filter: blur(25px);
            border: 1px solid rgba(255, 255, 255, 0.6);
        }

        .fade-hide {
            opacity: 0 !important;
            pointer-events: none !important;
            visibility: hidden;
            transition: opacity 0.5s ease, visibility 0.5s ease;
        }
    </style>
</head>
<body class="text-gray-800 min-h-screen flex flex-col justify-between items-center p-4">

    <div id="splash-screen" class="fixed inset-0 z-50 flex flex-col justify-center items-center bg-[#f8fafc] px-6 transition-all duration-500">
        <div class="absolute w-80 h-80 bg-blue-400/20 rounded-full blur-[90px] pointer-events-none"></div>

        <div class="text-center z-10 flex flex-col items-center max-w-md w-full">
            <div class="w-28 h-28 rounded-3xl overflow-hidden mb-6 shadow-xl shadow-blue-500/10 border border-white">
                <img src="https://i.ibb.co/BVgh85s3/x.jpg" alt="VnX Logo" class="w-full h-full object-cover">
            </div>
            
            <h1 class="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-blue-600 mb-2">
                Selamat datang di Web Convert VnX
            </h1>
            <p class="text-blue-600 font-bold tracking-widest text-xs uppercase mb-4">Convert To Link</p>
            <p class="text-gray-500 text-sm mb-10 px-4 font-medium">Ubah berkas media Anda menjadi tautan URL instan hanya dengan sekali klik.</p>
            
            <button onclick="masukDashboard()" class="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 active:scale-95 text-white transition-all duration-200 rounded-2xl font-semibold shadow-lg shadow-blue-500/20 tracking-wide text-center">
                Pencet mulai untuk membuka
            </button>
        </div>
    </div>


    <header class="w-full max-w-md text-center pt-6 opacity-0 transition-opacity duration-500" id="main-header">
        <h2 class="text-xl font-bold tracking-wider text-gray-900">VnX - Convert To Link</h2>
        <p class="text-xs text-gray-500 font-medium mt-1">Uploader Media Instan</p>
    </header>

    <main class="w-full max-w-md my-auto py-8 opacity-0 transition-opacity duration-500" id="main-content">
        <div class="ios-glass rounded-3xl p-6 shadow-xl shadow-gray-200/50 relative">
            
            <div id="drop-area" class="border-2 border-dashed border-blue-400/40 hover:border-blue-500 bg-blue-500/[0.02] rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group" onclick="document.getElementById('fileInput').click()">
                <input type="file" id="fileInput" class="hidden" onchange="fileTerpilih(this)">
                
                <div class="w-14 h-14 bg-blue-500/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <i data-lucide="upload-cloud" class="w-7 h-7 text-blue-600"></i>
                </div>
                <p id="upload-hint-1" class="font-semibold text-sm text-gray-700">Tekan untuk Pilih File</p>
                <p id="upload-hint-2" class="text-xs text-gray-400 mt-1">Mendukung Foto, Video, Audio, dll.</p>
            </div>

            <div id="action-box" class="hidden mt-6">
                <button onclick="mulaiConvert()" class="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-xl font-semibold tracking-wide flex items-center justify-center gap-2 transition-all duration-200 shadow-md shadow-blue-600/10">
                    <i data-lucide="play" class="w-4 h-4 fill-white"></i>
                    <span>Mulai Convert</span>
                </button>
            </div>

            <div id="loading-box" class="hidden mt-6 text-center py-4">
                <div class="inline-block animate-spin rounded-full h-8 w-8 border-2 border-t-blue-600 border-gray-200 mb-3"></div>
                <p class="text-xs text-blue-600 font-semibold animate-pulse">Sedang mengekstrak file menjadi URL...</p>
            </div>

            <div id="result-box" class="hidden mt-6 space-y-4">
                <div class="bg-white/70 border border-gray-200 rounded-xl p-3 flex items-center justify-between gap-3 shadow-inner">
                    <span id="url-text" class="text-xs text-blue-600 font-medium truncate select-all flex-1">Menunggu tautan...</span>
                    <button onclick="copyToClipboard()" class="bg-blue-600 text-white hover:bg-blue-700 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all duration-200 shadow-sm" id="btn-copy">
                        <i data-lucide="copy" class="w-3.5 h-3.5"></i>
                        <span>Salin</span>
                    </button>
                </div>

                <button onclick="resetUploader()" class="w-full py-3 bg-gray-900/5 hover:bg-gray-900/10 active:scale-98 text-gray-700 rounded-xl text-xs font-semibold tracking-wide flex items-center justify-center gap-2 transition-all duration-200">
                    <i data-lucide="x" class="w-4 h-4 text-red-500"></i>
                    <span>Upload Selanjutnya</span>
                </button>
            </div>

        </div>
    </main>

    <footer class="w-full text-center pb-6 text-xs text-gray-400 tracking-wide opacity-0 transition-opacity duration-500" id="main-footer">
        <p class="font-medium">Created By <a href="https://t.me/Raffioffci5" target="_blank" class="text-blue-600 hover:text-blue-500 transition-colors font-bold">@Raffioffci5</a></p>
    </footer>


    <script>
        let fileDataGlobal = null;

        // Inisialisasi Ikon Lucide
        lucide.createIcons();

        function masukDashboard() {
            const splash = document.getElementById('splash-screen');
            splash.classList.add('fade-hide');
            
            setTimeout(() => {
                document.getElementById('main-header').classList.remove('opacity-0');
                document.getElementById('main-content').classList.remove('opacity-0');
                document.getElementById('main-footer').classList.remove('opacity-0');
            }, 200);
        }

        // Trigger saat user milih file
        function fileTerpilih(input) {
            if (input.files && input.files[0]) {
                fileDataGlobal = input.files[0];
                
                document.getElementById('upload-hint-1').innerText = "File Berhasil Dimasukkan!";
                document.getElementById('upload-hint-1').classList.replace('text-gray-700', 'text-green-600');
                document.getElementById('upload-hint-2').innerText = fileDataGlobal.name + " (" + (fileDataGlobal.size/1024/1024).toFixed(2) + " MB)";
                
                document.getElementById('action-box').classList.remove('hidden');
            }
        }

        // Fungsi Eksekusi API Anti-Stuck (Menggunakan Telegra.ph / Tmpfiles)
        async function mulaiConvert() {
            if (!fileDataGlobal) return alert("Pilih file terlebih dahulu!");

            const actionBox = document.getElementById('action-box');
            const loadingBox = document.getElementById('loading-box');
            const resultBox = document.getElementById('result-box');
            const urlText = document.getElementById('url-text');

            actionBox.classList.add('hidden');
            loadingBox.classList.remove('hidden');

            const formData = new FormData();
            
            // Otomatis deteksi jenis file, jika gambar (< 5MB) gunakan Telegraph, jika berkas lain gunakan Tmpfiles
            if (fileDataGlobal.type.startsWith('image/') && fileDataGlobal.size < 5 * 1024 * 1024) {
                formData.append('file', fileDataGlobal);
                
                try {
                    const response = await fetch("https://telegra.ph/upload", {
                        method: "POST",
                        body: formData
                    });
                    const resData = await response.json();
                    
                    if (resData && resData[0] && resData[0].src) {
                        urlText.innerText = "https://telegra.ph" + resData[0].src;
                        loadingBox.classList.add('hidden');
                        resultBox.classList.remove('hidden');
                    } else {
                        throw new Error();
                    }
                } catch (e) {
                    // Fallback jika telegraph gagal
                    uploadKeTmpFiles(fileDataGlobal);
                }
            } else {
                // Untuk Video, Audio, Dokumen, dll.
                uploadKeTmpFiles(fileDataGlobal);
            }
        }

        // Fungsi Cadangan / File Besar via Tmpfiles (Bebas CORS)
        async function uploadKeTmpFiles(file) {
            const loadingBox = document.getElementById('loading-box');
            const resultBox = document.getElementById('result-box');
            const urlText = document.getElementById('url-text');

            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await fetch("https://tmpfiles.org/api/v1/upload", {
                    method: "POST",
                    body: formData
                });
                const resData = await response.json();

                if (resData && resData.data && resData.data.url) {
                    // Mengubah URL download agar langsung bisa dibuka/di-view langsung
                    let finalUrl = resData.data.url.replace("tmpfiles.org/", "tmpfiles.org/dl/");
                    urlText.innerText = finalUrl;
                    loadingBox.classList.add('hidden');
                    resultBox.classList.remove('hidden');
                } else {
                    throw new Error();
                }
            } catch (err) {
                console.error(err);
                alert("Gagal mengonversi berkas. Coba file lain.");
                resetUploader();
            }
        }

        // Fitur Salin Tautan
        function copyToClipboard() {
            const url = document.getElementById('url-text').innerText;
            const btnCopy = document.getElementById('btn-copy');
            
            navigator.clipboard.writeText(url).then(() => {
                btnCopy.innerHTML = `<i data-lucide="check" class="w-3.5 h-3.5 text-white"></i> <span>Tersalin!</span>`;
                btnCopy.classList.replace('bg-blue-600', 'bg-green-600');
                lucide.createIcons();
                
                setTimeout(() => {
                    btnCopy.innerHTML = `<i data-lucide="copy" class="w-3.5 h-3.5"></i> <span>Salin</span>`;
                    btnCopy.classList.replace('bg-green-600', 'bg-blue-600');
                    lucide.createIcons();
                }, 2000);
            });
        }

        // Reset ke awal (Tombol Silang)
        function resetUploader() {
            document.getElementById('fileInput').value = "";
            fileDataGlobal = null;
            
            document.getElementById('upload-hint-1').innerText = "Tekan untuk Pilih File";
            document.getElementById('upload-hint-1').classList.replace('text-green-600', 'text-gray-700');
            document.getElementById('upload-hint-2').innerText = "Mendukung Foto, Video, Audio, dll.";
            
            document.getElementById('action-box').classList.add('hidden');
            document.getElementById('loading-box').classList.add('hidden');
            document.getElementById('result-box').classList.add('hidden');
        }
    </script>
</body>
</html>