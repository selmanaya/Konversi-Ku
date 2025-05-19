document.addEventListener('DOMContentLoaded', function() {
    const fromSystemSelect = document.getElementById('from-system');
    const toSystemSelect = document.getElementById('to-system');
    const inputValue = document.getElementById('input-value');
    const outputValue = document.getElementById('output-value');
    const convertButton = document.getElementById('convert-button');
    const resetButton = document.getElementById('reset-button');
    const swapButton = document.getElementById('swap-button');
    
    // Fungsi untuk mengkonversi angka
    function convertNumber() {
        if (!inputValue.value.trim()) {
            outputValue.value = '';
            return;
        }
        
        try {
            let result = '';
            let base = 10;
            let targetBase = 2;
            
            // Menentukan basis sumber
            switch (fromSystemSelect.value) {
                case 'binary':
                    base = 2;
                    break;
                case 'decimal':
                    base = 10;
                    break;
                case 'octal':
                    base = 8;
                    break;
                case 'hexadecimal':
                    base = 16;
                    break;
            }
            
            // Menentukan basis target
            switch (toSystemSelect.value) {
                case 'binary':
                    targetBase = 2;
                    break;
                case 'decimal':
                    targetBase = 10;
                    break;
                case 'octal':
                    targetBase = 8;
                    break;
                case 'hexadecimal':
                    targetBase = 16;
                    break;
            }
            
            // Konversi ke desimal terlebih dahulu
            const decimal = parseInt(inputValue.value, base);
            
            // Konversi dari desimal ke basis target
            result = decimal.toString(targetBase);
            
            outputValue.value = result.toUpperCase();
        } catch (error) {
            outputValue.value = 'Error: Input tidak valid';
        }
    }
    
    // Fungsi untuk mereset nilai
    function resetValues() {
        inputValue.value = '';
        outputValue.value = '';
    }
    
    // Fungsi untuk menukar sistem
    function swapSystems() {
        const tempSystem = fromSystemSelect.value;
        fromSystemSelect.value = toSystemSelect.value;
        toSystemSelect.value = tempSystem;
        
        const tempValue = inputValue.value;
        inputValue.value = outputValue.value;
        outputValue.value = '';
    }
    
    // Event listeners
    if (convertButton) {
        convertButton.addEventListener('click', convertNumber);
    }
    
    if (resetButton) {
        resetButton.addEventListener('click', resetValues);
    }
    
    if (swapButton) {
        swapButton.addEventListener('click', swapSystems);
    }
    
    // Menangani input dengan tombol Enter
    if (inputValue) {
        inputValue.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                convertNumber();
            }
        });
    }
    
    // Mengubah placeholder berdasarkan sistem yang dipilih
    if (fromSystemSelect) {
        fromSystemSelect.addEventListener('change', function() {
            switch (this.value) {
                case 'binary':
                    inputValue.placeholder = 'Contoh: 1010';
                    break;
                case 'decimal':
                    inputValue.placeholder = 'Contoh: 42';
                    break;
                case 'octal':
                    inputValue.placeholder = 'Contoh: 52';
                    break;
                case 'hexadecimal':
                    inputValue.placeholder = 'Contoh: 2A';
                    break;
            }
        });
    }
});