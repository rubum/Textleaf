const getElement = (selector) => document.querySelector(selector);
let editorArea = getElement('.editor-area');
let selection, range, selectedContent;

const editorMenuItems = {
    bold: getElement('#js-bold-text'),
    italic: getElement('#js-italicize-text'),
};

const initEditor = () => {
    editorArea.innerHTML = `<p>Hello Textleaf</p>`;
    editorArea.addEventListener('mouseup', function(e) {
        selection = window.getSelection();
        range = selection.getRangeAt(0);
    })
};

const trackEvents = () => {
    for (let key in editorMenuItems) {
        editorMenuItems[key].addEventListener('mousedown', function() {
            if (range) {
                let newContentNode;
                switch (key) {
                    case 'bold':
                        newContentNode = document.createElement('b');
                        newContentNode.innerHTML = range;
                        break;
                    case 'italic':
                        newContentNode = document.createElement('i');
                        newContentNode.innerHTML = range;
                        break;
                    default:
                        break
                }

                range.deleteContents();
                range.insertNode(newContentNode)
                document.getSelection().removeAllRanges();
                document.getSelection().addRange(range);
                range = null;
            }
        })
    }
}


initEditor();
trackEvents();

