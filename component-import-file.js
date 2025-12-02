document.getElementById("btn-import").addEventListener("click", () => {
    document.getElementById("csv-import-input").click();
});

document.getElementById("csv-import-input").addEventListener("change", handleCSVImport);

async function handleCSVImport(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
        const text = e.target.result;
        const lines = text.split("\n").map(l => l.trim()).filter(l => l.length > 0);

        // Remove header
        lines.shift();

        const batch = db.batch();
        let count = 0;

        const errors = [];  // <-- store problematic lines

        lines.forEach((line, index) => {
            const parts = line.split("|").map(p => p.trim());

            // Validate required columns
            if (parts.length < 5) {
                errors.push({
                    lineNumber: index + 2, // adding 2 because header was removed
                    line,
                    reason: "Linha não possui 5 colunas separadas por |"
                });
                return;
            }

            const [categoria, pergunta, opcoesStr, resposta, statusStr] = parts;

            if (!categoria || !pergunta || !opcoesStr || !resposta || !statusStr) {
                errors.push({
                    lineNumber: index + 2,
                    line,
                    reason: "Campos obrigatórios vazios"
                });
                return;
            }

            const options = opcoesStr
                .split(";")
                .map(o => o.trim())
                .filter(o => o.length > 0);

            if (options.length < 2) {
                errors.push({
                    lineNumber: index + 2,
                    line,
                    reason: "Mínimo 2 opções obrigatórias"
                });
                return;
            }

            const status = statusStr.toLowerCase() === "ok";

            const docRef = db.collection("questions").doc();

            batch.set(docRef, {
                category: categoria,
                question: pergunta,
                options,
                answer: resposta,
                status
            });

            count++;
        });

        await batch.commit();

        // Show success
        alert(`${count} perguntas importadas com sucesso!`);

        // If errors exist, show them
        if (errors.length > 0) {
            console.warn("Erros encontrados no CSV:", errors);

            let msg = "⚠ Algumas linhas não puderam ser importadas:\n\n";

            errors.forEach(err => {
                msg += `Linha ${err.lineNumber}: ${err.reason}\n${err.line}\n\n`;
            });

            alert(msg);
        }

        // Reload data
        loadQuestionsFromFirestore();

        // Reset input
        event.target.value = "";
    };

    reader.readAsText(file);
}
