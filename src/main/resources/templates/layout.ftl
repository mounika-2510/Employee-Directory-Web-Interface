<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title!"Employee Directory - AJACKUS"}</title>
    <link rel="stylesheet" href="/static/css/styles.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body>
    <!-- Navigation Bar -->
    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-brand">
                <i class="fas fa-users"></i>
                <span>Employee Directory</span>
            </div>
            <div class="nav-menu">
                <a href="/dashboard" class="nav-link ${(page == 'dashboard')?string('active', '')}">
                    <i class="fas fa-home"></i> Dashboard
                </a>
                <a href="/add-employee" class="nav-link ${(page == 'add-employee')?string('active', '')}">
                    <i class="fas fa-plus"></i> Add Employee
                </a>
            </div>
        </div>
    </nav>

    <main class="main-content">
        <#nested>
    </main>

    <!-- Footer -->
    <footer class="footer">
        <div class="footer-content">
            <p>&copy; 2025 Employee Directory - AJACKUS</p>
        </div>
    </footer>

    <script src="/static/js/app.js"></script>
</body>
</html>