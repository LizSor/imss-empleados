// --- In your script.js file ---

document.addEventListener('DOMContentLoaded', () => {
    // Existing script logic (modal, menu toggle, etc.) should be here

    // --- Logic for loading Normas ---
    const normasListContainer = document.getElementById('normas-list');
    const csvFilePath = 'Normatividad Interna/normativas.csv'; // Adjust this path if your CSV is in a different location
    const pdfFolderPath = 'Normatividad Interna/'; // Path to your PDF files

    if (normasListContainer) {
        // Function to fetch and parse CSV
        fetch(csvFilePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(csvText => {
                // Parse CSV data (simple parsing, assuming no commas within titles)
                const lines = csvText.trim().split('\n');
                const headers = lines[0].split(',');
                const data = lines.slice(1).map(line => {
                    const values = line.split(',');
                    let obj = {};
                    headers.forEach((header, index) => {
                        obj[header.trim()] = values[index].trim();
                    });
                    return obj;
                });

                // Clear loading message
                normasListContainer.innerHTML = '';

                // Create and append links for each document
                if (data.length > 0) {
                    data.forEach(doc => {
                        const docTitle = doc.Titulo;
                        const docNumber = doc.Numero_PDF;
                        if (docTitle && docNumber) {
                            const link = document.createElement('a');
                            link.href = `${pdfFolderPath}${docNumber}.pdf`; // Construct PDF path
                            link.textContent = docTitle;
                            link.target = '_blank'; // Opens PDF in a new tab
                            link.classList.add('norma-link'); // Add a class for styling

                            const listItem = document.createElement('div'); // Or 'li' if you prefer an unordered list
                            listItem.appendChild(link);
                            normasListContainer.appendChild(listItem);
                        }
                    });
                } else {
                    normasListContainer.innerHTML = '<p>No se encontraron documentos de normatividad.</p>';
                }
            })
            .catch(error => {
                console.error('Error al cargar el archivo normativas.csv:', error);
                normasListContainer.innerHTML = '<p>Error al cargar los documentos de normatividad. Por favor, inténtalo de nuevo más tarde.</p>';
            });
    }
});