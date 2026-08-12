<?php
require_once 'includes/header.php';

// Display session messages
$msg = $_SESSION['success'] ?? '';
$err = $_SESSION['error'] ?? '';
unset($_SESSION['success'], $_SESSION['error']);

// Fetch books with category JOIN
$sql = "SELECT b.*, c.category_name 
        FROM books b 
        LEFT JOIN categories c ON b.category_id = c.id 
        ORDER BY b.id DESC";
$books = $pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);
?>

<div class="d-flex justify-content-between align-items-center mb-4">
    <h2>Book Management</h2>
    <a href="add-book.php" class="btn btn-primary">
        <i class="fa-solid fa-plus me-1"></i> Add New Book
    </a>
</div>

<?php if ($msg): ?>
    <div class="alert alert-success alert-dismissible fade show"><?= htmlspecialchars($msg) ?><button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>
<?php endif; ?>

<?php if ($err): ?>
    <div class="alert alert-danger alert-dismissible fade show"><?= htmlspecialchars($err) ?><button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>
<?php endif; ?>

<div class="card shadow-sm">
    <div class="card-body p-0">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
                <thead class="table-dark">
                    <tr>
                        <th>Thumbnail</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th class="text-end">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (empty($books)): ?>
                        <tr><td colspan="7" class="text-center py-4 text-muted">No books uploaded yet.</td></tr>
                    <?php else: ?>
                        <?php foreach ($books as $book): ?>
                            <tr>
                                <td>
                                    <?php 
                                    $imagePath = $book['image'] ?? '';
                                    if (strpos($imagePath, 'http') === 0) {
                                        $imgSrc = $imagePath;
                                    } elseif (!empty($imagePath) && file_exists('../uploads/' . $imagePath)) {
                                        $imgSrc = '../uploads/' . $imagePath;
                                    } else {
                                        $imgSrc = 'https://via.placeholder.com/60x80?text=No+Cover';
                                    }
                                    ?>
                                    <img src="<?= htmlspecialchars($imgSrc) ?>" alt="Cover" style="width: 50px; height: 70px; object-fit: cover;" class="rounded border">
                                </td>
                                <td><strong><?= htmlspecialchars($book['title']) ?></strong></td>
                                <td><?= htmlspecialchars($book['author']) ?></td>
                                <td><span class="badge bg-secondary"><?= htmlspecialchars($book['category_name'] ?? 'Uncategorized') ?></span></td>
                                <td>₹<?= number_format($book['price'], 2) ?></td>
                                <td>
                                    <?php 
                                    // Safe Stock / Quantity fallback
                                    $stockVal = $book['stock'] ?? $book['quantity'] ?? 10; 
                                    ?>
                                    <?php if ((int)$stockVal < 5): ?>
                                        <span class="badge bg-danger"><?= htmlspecialchars($stockVal) ?> Left</span>
                                    <?php else: ?>
                                        <span class="badge bg-success"><?= htmlspecialchars($stockVal) ?></span>
                                    <?php endif; ?>
                                </td>
                                <td class="text-end">
                                    <a href="edit-book.php?id=<?= $book['id'] ?>" class="btn btn-sm btn-outline-warning me-1">
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </a>
                                    <a href="delete-book.php?id=<?= $book['id'] ?>" 
                                       class="btn btn-sm btn-outline-danger" 
                                       onclick="return confirm('Are you sure you want to permanently delete this book?');">
                                        <i class="fa-solid fa-trash"></i>
                                    </a>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
    </div>
</div>

<?php require_once 'includes/footer.php'; ?>
<script>
  document.addEventListener("DOMContentLoaded", function() {
    document.body.innerHTML = document.body.innerHTML.replace(/\$/g, '₹');
  });
</script>