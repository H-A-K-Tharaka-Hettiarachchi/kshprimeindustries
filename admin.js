document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navLinks = document.querySelectorAll('.admin-nav a');
    const sections = document.querySelectorAll('.admin-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
            const targetSection = this.getAttribute('data-section');
            if (targetSection) {
                document.getElementById(targetSection).classList.add('active');
            } else {
                // Default to dashboard if no section specified
                document.getElementById('dashboard').classList.add('active');
            }
        });
    });
    
    // Form submission handling
    const adminForms = document.querySelectorAll('.edit-form');
    adminForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const saveBtn = form.querySelector('.save-btn');
            const originalText = saveBtn.textContent;
            
            saveBtn.textContent = 'SAVED';
            saveBtn.classList.add('success');
            
            setTimeout(() => {
                saveBtn.textContent = originalText;
                saveBtn.classList.remove('success');
            }, 2000);
        });
    });
    
    // Add button click handlers
    const addButtons = document.querySelectorAll('.add-btn');
    addButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // This would normally show a modal or form for adding items
            alert('Add functionality would be implemented here in a real application.');
        });
    });
    
    // Edit button click handlers
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // This would normally show a modal or form for editing the item
            alert('Edit functionality would be implemented here in a real application.');
        });
    });
    
    // Delete button click handlers
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (confirm('Are you sure you want to delete this item?')) {
                // This would normally send a request to delete the item
                alert('Delete functionality would be implemented here in a real application.');
            }
        });
    });
    
    // Live stats update simulation
    function updateRandomStat() {
        const metricBars = document.querySelectorAll('.metric-value');
        if (metricBars.length > 0) {
            const randomIndex = Math.floor(Math.random() * metricBars.length);
            const randomBar = metricBars[randomIndex];
            const currentWidth = parseInt(randomBar.style.width) || 0;
            let newWidth = currentWidth + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 5);
            
            // Keep within bounds
            newWidth = Math.min(Math.max(newWidth, 10), 95);
            
            randomBar.style.width = newWidth + '%';
            const percentText = randomBar.parentNode.nextElementSibling;
            if (percentText) {
                percentText.textContent = newWidth + '%';
            }
        }
    }
    
    // Update stats periodically
    setInterval(updateRandomStat, 5000);
    
    // Add simulated log entries
    function addLogEntry() {
        const logsTerminal = document.querySelector('.logs-terminal .terminal-content');
        if (logsTerminal) {
            const date = new Date();
            const timeString = date.toLocaleTimeString();
            const dateString = date.toISOString().split('T')[0];
            
            const actions = [
                'User activity detected',
                'Security scan completed',
                'Backup process initiated',
                'System update available',
                'Config change detected',
                'Database optimization completed'
            ];
            
            const randomAction = actions[Math.floor(Math.random() * actions.length)];
            const logEntry = document.createElement('div');
            logEntry.className = 'log-entry';
            logEntry.textContent = `[${dateString} ${timeString}] INFO: ${randomAction}`;
            
            logsTerminal.prepend(logEntry);
            
            // Remove oldest log if too many
            const logEntries = logsTerminal.querySelectorAll('.log-entry');
            if (logEntries.length > 20) {
                logsTerminal.removeChild(logEntries[logEntries.length - 1]);
            }
        }
    }
    
    // Add log entries periodically
    setInterval(addLogEntry, 30000);
});