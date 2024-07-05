function flames(name1, name2) {
    name1 = name1.toLowerCase().replace(/ /g, '');
    name2 = name2.toLowerCase().replace(/ /g, '');
    for (let char of name1) {
        if (name2.includes(char)) {
            name2 = name2.replace(char, '');
            name1 = name1.replace(char, '');
        }
    }
    let totalChars = name1.length + name2.length;
    let flamesDict = ['Friends.You two have an unbreakable bond.Your bond will last a lifetime. Dont give up on your friend under any circumstances.',
        'Lovers.Two lovers, like interwoven threads, create a bond of trust, sharing dreams and vulnerabilities, building a world where their souls dance in harmony.',
        'Admirers.You two adore each other. By looking at shy glances, they understand the feeling through the eyes. In their eyes you can see the love and affection they show you.',
        'Marriage . If your relationship is together you will get married. Your partner will treat you incredibly well. Your bond will never be broken..If your relationship is together you will get married.',
        'Enemies.You two are friends but have some love. Small mistakes made by you will lead to enmity. If you understand your friend, you can conquer that enemy too.',
        'Siblings.It is very good to have a strong sibling bond.They teach you the good and the bad in your life. Your bond will last forever.'
    ];
    let resultIndex = totalChars % flamesDict.length;
    return flamesDict[resultIndex];
}


function calculateRelationship() {
    let name1 = document.getElementById('name1').value;
    let name2 = document.getElementById('name2').value;
    let relationship = flames(name1, name2);
    let alert_name_1 = "Please write your name";

    let alert_name_2 = "Please write partner your name";
    if ((name1) === "") {
        alert(alert_name_1);
        return;
    } else if (name2 === "") {
        alert(alert_name_2);
        return;
    }
    document.getElementById('result').textContent = `The relationship between ${capitalize(name1)} and ${capitalize(name2)} is ${relationship}`;
}


function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}