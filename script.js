// ============================================
// GANTI URL INI DENGAN URL DARI GOOGLE APPS SCRIPT ANDA
// ============================================

// Handle dropdown menu click
document.addEventListener('DOMContentLoaded', function() {
    const dropdownLink = document.querySelector('.dropdown > a');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const dropdown = document.querySelector('.dropdown');

    // Toggle dropdown on click
    dropdownLink.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Toggle display
        if (dropdownMenu.style.display === 'block') {
            dropdownMenu.style.display = 'none';
        } else {
            dropdownMenu.style.display = 'block';
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target)) {
            dropdownMenu.style.display = 'none';
        }
    });

    // Keep dropdown open when clicking inside the menu
    dropdownMenu.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Handle menu items click - navigate and close
    const menuItems = document.querySelectorAll('.dropdown-menu a');
    menuItems.forEach(function(item) {
        item.addEventListener('click', function() {
            dropdownMenu.style.display = 'none';
        });
    });

    // ============================================
    // HANDLE FORM PENDAFTARAN - KIRIM KE GOOGLE SHEETS
    // ============================================
    const form = document.getElementById('formPendaftaran');
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Ambil data dari form
            const formData = new FormData(form);
            const data = {
                nama: formData.get('nama'),
                program: formData.get('program'),
                nik: formData.get('nik'),
                alamat: formData.get('alamat'),
                wa: formData.get('wa')
            };
            
            // Tampilkan loading
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Mengirim...';
            submitBtn.disabled = true;
            
            try {

                // Kirim ke Google Sheets
                const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbznHuYFzd7NMZslf4nxkB3elxhlnL0A-2GLkjLI5DluYxfaMvGwjKYesWPegdKX0ha2/exec';
                const response = await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors', // Penting untuk Google Apps Script
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });
                
                // Karena mode no-cors, kita tidak bisa membaca response
                // Tapi kita asumsikan berhasil jika tidak ada error
                alert('✅ Pendaftaran berhasil dikirim ke Google Sheets!');
                form.reset(); // Reset form
                
            } catch (error) {
                console.error('Error:', error);
                alert('❌ Terjadi kesalahan. Silakan coba lagi.');
            } finally {
                // Kembalikan tombol ke kondisi semula
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});
