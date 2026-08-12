<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Security Check
if (!isset($_SESSION['user_id']) || !isset($_SESSION['user_role']) || $_SESSION['user_role'] !== 'admin') {
    header("Location: ../login.php");
    exit;
}

require_once '../config/db.php';

$book_id = (int)($_GET['id'] ?? 0);

if ($book_id > 0) {
    // 1. Fetch book details to get image file path
    $stmt = $pdo->prepare("SELECT image FROM books WHERE id = :id");
    $stmt->execute([':id' => $book_id]);
    $book = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($book) {
        // Remove image file from server
        if (!empty($book['image'])) {
            $filePath = '../uploads/' . $book['image'];
            if (file_exists($filePath)) {
                unlink($filePath);
            }
        }

        // 2. Delete database record
        $deleteStmt = $pdo->prepare("DELETE FROM books WHERE id = :id");
        $deleteStmt->execute([':id' => $book_id]);

        $_SESSION['success'] = "Book deleted successfully!";
    } else {
        $_SESSION['error'] = "Book not found.";
    }
} else {
    $_SESSION['error'] = "Invalid book ID.";
}

header("Location: books.php");
exit;