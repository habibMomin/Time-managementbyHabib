document.getElementById('save-btn').addEventListener('click', function() {
    const activity = document.getElementById('input-text').value;
    if (activity) {
        const time = new Date().toLocaleTimeString();
        const table = document.getElementById('log-table').getElementsByTagName('tbody')[0];
        const newRow = table.insertRow();
        const timeCell = newRow.insertCell(0);
        const activityCell = newRow.insertCell(1);
        timeCell.textContent = time;
        activityCell.textContent = activity;
        document.getElementById('input-text').value = ''; // Clear the input field
        document.getElementById('status').textContent = 'Activity saved!';
    } else {
        document.getElementById('status').textContent = 'Please enter an activity!';
    }
});

document.getElementById('reset-btn').addEventListener('click', function() {
    const table = document.getElementById('log-table').getElementsByTagName('tbody')[0];
    table.innerHTML = ''; // Clear the table
    document.getElementById('status').textContent = 'Activity log reset!';
});

document.getElementById('download-pdf-btn').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Get table data
    const rows = document.getElementById('log-table').getElementsByTagName('tbody')[0].rows;
    const logData = [];

    for (let row of rows) {
        const time = row.cells[0].textContent;
        const activity = row.cells[1].textContent;
        logData.push([time, activity]);
    }

    // Add day name (Assume it's Sunday to Monday, you can change this)
    const dayName = new Date().toLocaleString('en-us', { weekday: 'long' });

    // Set title
    doc.setFontSize(18);
    doc.text(`${dayName}'s Activity Log`, 20, 20);

    // Set table header
    doc.setFontSize(12);
    doc.text('Time', 20, 30);
    doc.text('Activity', 100, 30);

    // Add table data
    let y = 40;
    logData.forEach(row => {
        doc.text(row[0], 20, y);
        doc.text(row[1], 100, y);
        y += 10;
    });

    // Save the PDF
    doc.save(`${dayName}_Activity_Log.pdf`);
});
