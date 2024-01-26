
function revealDetails(section) {
    const cvDetails = {
        'Education': 'Details about your education...',
        'Experience': 'Details about your work experience...',
        'Skills': 'Details about your skills...'
    };
    document.getElementById('cvDetails').innerText = cvDetails[section];
    // Additional JS to handle animations and interactivity
}
    