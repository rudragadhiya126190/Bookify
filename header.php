<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Security Check: Enforce Admin Authentication
if (!isset($_SESSION['user_id']) || !isset($_SESSION['user_role']) || $_SESSION['user_role'] !== 'admin') {
    header("Location: ../login.php");
    exit;
}

require_once '../config/db.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bookify - Admin Dashboard</title>
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- FontAwesome Icons -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" rel="stylesheet">
    <style>
        body { min-height: 100vh; background-color: #f8f9fa; }
        .sidebar { min-height: calc(100vh - 56px); background-color: #343a40; }
        .sidebar .nav-link { color: #c2c7d0; margin-bottom: 5px; }
        .sidebar .nav-link:hover, .sidebar .nav-link.active { color: #fff; background-color: #495057; border-radius: 4px; }
    </style>
</head>
<body>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
    <div class="container-fluid">
        <a class="navbar-brand fw-bold" href="books.php"><i class="fa-solid fa-book-open text-warning me-2"></i>Bookify Admin</a>
        <span class="navbar-text text-light me-auto ps-3 d-none d-md-inline">
            Welcome, <strong><?= htmlspecialchars($_SESSION['user_name'] ?? 'Admin') ?></strong>
        </span>
        <div class="d-flex align-items-center">
            <a href="../index.php" class="btn btn-outline-light btn-sm me-2" target="_blank">
                <i class="fa-solid fa-store me-1"></i> Main Store
            </a>
            <a href="../logout.php" class="btn btn-danger btn-sm">
                <i class="fa-solid fa-right-from-bracket me-1"></i> Logout
            </a>
        </div>
    </div>
</nav>

<div class="container-fluid">
    <div class="row">
        <!-- Sidebar Navigation -->
        <nav class="col-md-3 col-lg-2 d-md-block sidebar collapse p-3">
            <ul class="nav flex-column">
                <li class="nav-item">
                    <a class="nav-link" href="books.php">
                        <i class="fa-solid fa-book me-2"></i> Manage Books
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="add-book.php">
                        <i class="fa-solid fa-plus-circle me-2"></i> Add New Book
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="categories.php">
                        <i class="fa-solid fa-layer-group me-2"></i> Categories
                    </a>
                </li>
            </ul>
        </nav>

        <!-- Main Content Wrapper -->
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4">