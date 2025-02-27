function stringToAngle(str) {
    // Hashear string
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i); // Operación hash
    }

    // Convertir el hash a un valor de 0 a 360
    let angle = Math.abs(hash) % 360;

    return angle;
}

const brightness = localStorage.getItem('igt') === 'dark' ? 75 : 25 || 25;

// chat window document.querySelector('div [data-pagelet="IGDOpenMessageList"]');
const targetNode = document.body;

const config = { childList: true, subtree: true };

const callback = (mutationsList, observer) => {
    mutationsList.forEach(mutation => {
        if (mutation.type !== 'childList') return
        mutation.addedNodes.forEach(node => {
            if (node.nodeType !== 1) return;
            const selectors = [
                '[data-release-focus-from="CLICK"] span > span > span', // mensaje
                'h6 > div[role="none"] > div[role="presentation"] > div > span' // respuesta
            ];
            selectors.forEach(selector => {
                node.querySelectorAll(selector).forEach(namesHandler);
            });
        });
    });
};

const namesHandler = (elem) => {
    const name = elem.textContent.split(' ')[0];
    elem.style.fontWeight = 'bold';
    elem.style.color = `hsl(${stringToAngle(name)}, 100%, ${brightness}%)`
}

const observer = new MutationObserver(callback);

observer.observe(targetNode, config);