var selected = null, xpos = 0, ypos = 0, x_end = 0, y_end = 0;

let window_width = window.outerWidth;
// 425px

// store data in lists and render in html upon document load
let list1 = [
    {
        id: 1,
        content: "Item 1"
    },
    {
        id: 2,
        content: "Item 2"
    },
    {
        id: 3,
        content: "Item 3"
    },
    {
        id: 4,
        content: "Item 4"
    }
];

let list2 = [];

// render the data into the  document
const generateLists = () => {
    let box1 = document.getElementById('box1');
    let box2 = document.getElementById('box2');

    // remove initial nodes (if any)
    while (box1.hasChildNodes()) {
        box1.removeChild(box1.lastChild);
    }
    while (box2.hasChildNodes()) {
        box2.removeChild(box2.lastChild);
    }

    list1.map((item) => {
        let div = document.createElement('div');
        div.innerText = item.content;
        div.setAttribute('id', item.id);
        div.setAttribute('class', 'item');
        div.setAttribute('draggable', true);
        div.setAttribute('ondragstart', 'handleDragStart(this.id)');
        div.setAttribute('ondragend', 'handleDragEnd(this.id, event)');

        return (
            box1.appendChild(div)
        )
    })

    list2.map((item) => {
        let div = document.createElement('div');
        div.innerText = item.content;
        div.setAttribute('id', item.id);
        div.setAttribute('class', 'item');
        div.setAttribute('draggable', false);

        return (
            box2.appendChild(div)
        )
    })
}

const closeAlert = () => {
    // Hide the alert
    document.getElementById('customAlert').style.display = 'none';
}

const showAlert = (message) => {
    let container = document.getElementById('container');

    // Set the message
    document.getElementById('alertText').textContent = message;

    // Show the alert
    document.getElementById('customAlert').style.display = 'flex';

    setTimeout(closeAlert, 2000);
}


// get dimensions of the two div's
const getBoxPos = (id) => {
    let b = document.getElementById(id);
    let box = b.getBoundingClientRect();
    return [box.x, box.y, box.width, box.height];
}

// get the initial position of the item when drag started
const handleDragStart = (id) => {
    selected = document.getElementById(id);
    const boundingRect = selected.getBoundingClientRect();

    ypos = (selected.offsetHeight - (boundingRect.bottom - boundingRect.top)) / 2;
    xpos = (selected.offsetWidth - (boundingRect.right - boundingRect.left)) / 2;
}


const handleDragEnd = (id, e) => {

    let [box_x, box_y, box_width, box_height] = getBoxPos('box2');

    // check if the dropped position lies between the parameters of the second box or not
    if (window_width > 425 && (e.clientX >= box_x && e.clientX <= box_x + box_width) && (e.clientY >= box_y && e.clientY <= box_y + box_height)) {
        list2.push({
            id: parseInt(id),
            content: selected.innerText
        });
        list1 = list1.filter((item) => {
            return item.id !== parseInt(id)
        });
        showAlert("Item successfully shifted!");
    }
    else if (window_width < 425 && (e.clientY >= box_y && e.clientY <= box_y + box_height) && (e.clientx >= box_x && e.clientX <= box_x + box_width)) {
        list2.push({
            id: parseInt(id),
            content: selected.innerText
        });
        list1 = list1.filter((item) => {
            return item.id !== parseInt(id)
        });
        showAlert("Item successfully shifted!");
    }
    generateLists();
}




