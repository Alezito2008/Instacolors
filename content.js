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

// chat window document.querySelector('div [data-pagelet="IGDOpenMessageList"]');
const targetNode = document.body;

const config = { childList: true, subtree: true };

const callback = (mutationsList, observer) => {
    mutationsList.forEach(mutation => {
        if (mutation.type !== 'childList') return
        mutation.addedNodes.forEach(node => {
            if (node.nodeType !== 1) return;
            const matchingDescendants = node.querySelectorAll('[data-release-focus-from="CLICK"] span > span > span');
            matchingDescendants.forEach(namesHandler)
        });
    });
};

const namesHandler = (elem) => {
    const name = elem.textContent;
    elem.style.fontWeight = 'bold';
    elem.style.color = `hsl(${stringToAngle(name)}, 100%, 75%)`
}

const observer = new MutationObserver(callback);

observer.observe(targetNode, config);