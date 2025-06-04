document.addEventListener('DOMContentLoaded', function() {
    const qrText = document.getElementById('qr-text');
    const generateBtn = document.getElementById('generate-btn');
    const downloadBtn = document.getElementById('download-btn');
    const sizeSelect = document.getElementById('size-select');
    const qrContainer = document.getElementById('qrcode');
    
    let qrCode = null;
    
    // Generate QR code
    generateBtn.addEventListener('click', function() {
        const text = qrText.value.trim();
        const size = parseInt(sizeSelect.value);
        
        if (text === '') {
            alert('Please enter text or URL');
            return;
        }
        
        // Clear previous QR code
        qrContainer.innerHTML = '';
        
        // Create loading animation
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'loading-animation';
        loadingDiv.innerHTML = `
            <div class="spinner"></div>
            <p>Generating QR Code...</p>
        `;
        qrContainer.appendChild(loadingDiv);
        
        // Delay QR generation for animation effect
        setTimeout(() => {
            qrContainer.innerHTML = '';
            
            // Generate new QR code
            qrCode = new QRCode(qrContainer, {
                text: text,
                width: size,
                height: size,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
            
            // Add animation class
            qrContainer.classList.add('qr-animate');
            setTimeout(() => {
                qrContainer.classList.remove('qr-animate');
            }, 1000);
            
        }, 800);
    });
    
    // Download QR code
    downloadBtn.addEventListener('click', function() {
        if (!qrCode) {
            alert('Please generate a QR code first');
            return;
        }
        
        const canvas = qrContainer.querySelector('canvas');
        if (!canvas) {
            alert('No QR code available to download');
            return;
        }
        
        // Create download link
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'qr-code.png';
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Add download animation
        downloadBtn.classList.add('download-animate');
        setTimeout(() => {
            downloadBtn.classList.remove('download-animate');
        }, 1000);
    });
    
    // Generate QR code on Enter key press
    qrText.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            generateBtn.click();
        }
    });
    
    // Add some example text when clicking on input (for UX)
    qrText.addEventListener('focus', function() {
        if (this.value === '') {
            this.placeholder = 'e.g., https://example.com or your text';
        }
    });
    
    qrText.addEventListener('blur', function() {
        this.placeholder = 'Enter text or URL';
    });
});