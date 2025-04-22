document.getElementById("flamesForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let originalName1 = document.getElementById("name1").value.trim();
    let originalName2 = document.getElementById("name2").value.trim();

    let name1 = originalName1.toLowerCase().replace(/ /g, '');
    let name2 = originalName2.toLowerCase().replace(/ /g, '');

    if (!name1 || !name2) {
        alert("Please provide both names.");
        return;
    }

    // FLAMES Logic
    let temp1 = name1;
    let temp2 = name2;

    for (let char of temp1) {
        if (temp2.includes(char)) {
            temp2 = temp2.replace(char, '');
            temp1 = temp1.replace(char, '');
        }
    }

    let total = temp1.length + temp2.length;
  let flamesResult = [
    'Friends - You two share an unbreakable bond. Your friendship is steadfast and enduring, standing strong through all challenges. Never let go of this precious connection.',
    'Lovers - You share a deep romantic connection. With two hearts intertwined, you build a bond of love and trust, creating cherished memories together in a world of passion.',
    'Admirers - There is admiration and secret love. Your shy glances speak volumes, revealing affection and longing through your eyes in a quiet but powerful connection.',
    'Marriage - Your bond can lead to marriage. If you nurture your relationship, it will blossom into a lifelong commitment with a partner who cherishes and supports you.',
    'Enemies - There is a clash, but love might still exist. Small misunderstandings could spark conflict, but by understanding each other, you can overcome enmity and restore harmony.',
    'Siblings - You share a strong, lifelong bond. Like family, you guide and support each other through life’s ups and downs, with a connection that endures forever.'
];

    let resultIndex = total % flamesResult.length;
    let finalResult = flamesResult[resultIndex];

    let resultText = `💖 <strong>${originalName1}</strong> and <strong>${originalName2}</strong><br> are 💌 <em>${finalResult}</em>`;
    document.getElementById("certificate").innerHTML = resultText;
    document.getElementById("shareButtons").style.display = "block";

    // Send to Google Sheet
    const sheetURL = "https://script.google.com/macros/s/AKfycbwmuEa2qMmGg734I_5yROaUuLJ4mEQ6tdHFqozwAvOax2BTet2JVTJNbCyh3fSHj8c/exec";

    fetch(sheetURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `Name1=${encodeURIComponent(originalName1)}&Name2=${encodeURIComponent(originalName2)}&Relationship=${encodeURIComponent(finalResult)}`
    }).then(res => res.text()).catch(err => console.error("Error:", err));
});

// Share buttons
function shareOnWhatsApp() {
    const result = document.getElementById("certificate").innerText;
    const url = `https://wa.me/?text=${encodeURIComponent(result)}%0A🔥 Check your FLAMES result! Check on Results in : https://flames.ccbp.tech/`;
    window.open(url, "_blank");
}

function shareOnFacebook() {
    const url = "https://flames.ccbp.tech";
    const quote = "🔥 Check your FLAMES result! Check on Results in : https://flames.ccbp.tech/";
    const shareURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(quote)}`;
    window.open(shareURL, "_blank");
}


// Download as image
function downloadCertificate() {
    // Get the certificate element
    const certificate = document.getElementById("certificate");

    // Temporarily set the background for download
    const originalBackground = certificate.style.backgroundImage;
    certificate.style.backgroundImage = "url('https://res.cloudinary.com/dsnjnciud/image/upload/v1692982544/08-01_j9bwoe.jpg')";

    // Now use html2canvas to capture the element with the updated background
    html2canvas(certificate, {
        backgroundColor: "black" // Ensures the background is visible in the download
    }).then(canvas => {
        // Revert to the original background image
        certificate.style.backgroundImage = originalBackground;

        // Create a download link for the image
        let link = document.createElement("a");
        link.download = "flames-certificate.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}
