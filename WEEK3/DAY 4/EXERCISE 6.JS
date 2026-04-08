(function(numChildren, partnerName, location, job) {
    const sentence = `You will be a ${job} in ${location}, and married to ${partnerName} with ${numChildren} kids.`;
    document.body.innerHTML += `<p>${sentence}</p>`;
})(3, "Sarah", "Tokyo", "Developer");