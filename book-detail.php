<?php
require_once 'config/db.php';
require_once 'includes/header.php';

// Validate Book ID from GET request
$book_id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($book_id <= 0) {
    header("Location: index.php");
    exit();
}

// Fetch single book details using PDO Prepared Statement
$stmt = $pdo->prepare("SELECT * FROM books WHERE id = :id LIMIT 1");
$stmt->execute([':id' => $book_id]);
$book = $stmt->fetch();

if (!$book) {
    echo '<div class="alert alert-danger my-4">Book not found! <a href="index.php" class="alert-link">Return to Home</a></div>';
    require_once 'includes/footer.php';
    exit();
}

// Fetch Category Name safely
$catName = 'General';
if (!empty($book['category_id'])) {
    $catStmt = $pdo->prepare("SELECT * FROM categories WHERE id = :cid LIMIT 1");
    $catStmt->execute([':cid' => $book['category_id']]);
    $catData = $catStmt->fetch();
    if ($catData) {
        $catName = $catData['name'] ?? $catData['category_name'] ?? $catData['title'] ?? 'Category';
    }
}
?>

<nav aria-label="breadcrumb" class="mb-4">
    <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="index.php">Home</a></li>
        <li class="breadcrumb-item text-capitalize"><?= htmlspecialchars($catName); ?></li>
        <li class="breadcrumb-item active" aria-current="page"><?= htmlspecialchars($book['title']); ?></li>
    </ol>
</nav>

<div class="card shadow-sm border-0">
    <div class="card-body p-4">
        <div class="row g-4">
            <!-- Book Image Column -->
            <div class="col-md-5 col-lg-4 text-center">
                <?php 
                    $image_path = !empty($book['image']) ? htmlspecialchars($book['image']) : 'https://placehold.co/350x500?text=No+Cover';
                ?>
                <img src="<?= $image_path; ?>" 
                     onerror="this.onerror=null; this.src='https://placehold.co/350x500?text=No+Cover';" 
                     class="img-fluid rounded shadow-sm" 
                     alt="<?= htmlspecialchars($book['title']); ?>" 
                     style="max-height: 450px; object-fit: cover;">
            </div>

            <!-- Book Details Column -->
            <div class="col-md-7 col-lg-8">
                <span class="badge bg-secondary mb-2"><?= htmlspecialchars($catName); ?></span>
                <h2 class="fw-bold mb-1"><?= htmlspecialchars($book['title']); ?></h2>
                <p class="text-muted fs-5 mb-3">Author: <strong class="text-dark"><?= htmlspecialchars($book['author']); ?></strong></p>
                
                <h3 class="text-success fw-bold mb-3">₹<?= number_format($book['price'], 2); ?></h3>

                <!-- Stock Status -->
                <div class="mb-3">
                    <?php if (isset($book['stock']) && $book['stock'] > 0): ?>
                        <span class="badge bg-success"><i class="fa-solid fa-check me-1"></i> In Stock (<?= $book['stock']; ?> available)</span>
                    <?php else: ?>
                        <span class="badge bg-danger"><i class="fa-solid fa-xmark me-1"></i> Out of Stock</span>
                    <?php endif; ?>
                </div>

                <hr>

                <h5 class="fw-bold">Description</h5>
                <p class="text-secondary leading-relaxed">
                    <?= nl2br(htmlspecialchars($book['description'] ?? 'No description available for this book.')); ?>
                </p>

                <!-- Add to Cart Form -->
                <form action="cart.php" method="POST" class="mt-4">
    <!-- BADLAV 1: Action input add kiya -->
    <input type="hidden" name="action" value="add">
    
    <!-- BADLAV 2: action="cart.php" kar diya -->
    <input type="hidden" name="book_id" value="<?= $book['id']; ?>">
    
    <div class="row g-3 align-items-center">
        <div class="col-auto">
            <label for="quantity" class="col-form-label fw-bold">Quantity:</label>
        </div>
        <div class="col-auto">
            <input type="number" id="quantity" name="quantity" class="form-control text-center" value="1" min="1" max="<?= $book['stock'] ?? 10; ?>" style="width: 80px;">
        </div>
        <div class="col-auto">
            <button type="submit" class="btn btn-warning btn-lg px-4" <?= (isset($book['stock']) && $book['stock'] <= 0) ? 'disabled' : ''; ?>>
                <i class="fa-solid fa-cart-plus me-2"></i> Add to Cart
            </button>
        </div>
    </div>
</form>
<script>
  document.addEventListener("DOMContentLoaded", function() {
    document.body.innerHTML = document.body.innerHTML.replace(/\$/g, '₹');
  });
</script>