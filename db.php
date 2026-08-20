<?php
/**
 * Bookify - Database Connection Configuration
 * Uses PHP Data Objects (PDO) for secure and reliable database access.
 */

// Host & Database Credentials (Laragon Defaults)
define('DB_HOST', 'localhost');
define('DB_NAME', 'bookify_db');
define('DB_USER', 'root');
define('DB_PASS', ''); // Default Laragon password is empty
define('DB_CHARSET', 'utf8mb4');

try {
    // Construct the Data Source Name (DSN)
    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;

    // PDO Configuration Options
    $options = [
        // Throw PDOExceptions on SQL errors
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        // Return database records as associative arrays by default
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        // Disable emulation of prepared statements to enforce real prepared statements
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];

    // Establish the PDO Instance
    $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);

} catch (PDOException $e) {
    // Log exception details securely and output a clean error message
    error_log("Database Connection Error: " . $e->getMessage());

    // Terminate script execution and inform user safely without leaking internal credentials
    die("Database Connection Error: Unable to connect to the database. Please verify your configurations.");
}
?>