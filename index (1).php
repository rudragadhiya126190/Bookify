<?php
require_once 'config/db.php';
require_once 'includes/header.php';

// Fetch Categories (Safe mapping array)
$categoryQuery = "SELECT * FROM categories ORDER BY id ASC";
$categoryStmt = $pdo->query($categoryQuery);
$categoriesList = $categoryStmt->fetchAll();

$catMap = [];
foreach ($categoriesList as $c) {
    $catMap[$c['id']] = $c['name'] ?? $c['category_name'] ?? $c['title'] ?? 'Category ' . $c['id'];
}

// Get filter inputs
$search = isset($_GET['search']) ? trim($_GET['search']) : '';
$category_id = isset($_GET['category']) ? intval($_GET['category']) : 0;

// Build Books Query using Prepared Statements
$sql = "SELECT * FROM books WHERE 1=1";
$params = [];

if (!empty($search)) {
    $sql .= " AND (title LIKE :search OR author LIKE :search)";
    $params[':search'] = '%' . $search . '%';
}

if ($category_id > 0) {
    $sql .= " AND category_id = :category_id";
    $params[':category_id'] = $category_id;
}

$sql .= " ORDER BY id DESC";

$stmt = $pdo->prepare($sql);
$stmt->execute($params);
$books = $stmt->fetchAll();
?>

<!-- Filter & Search Section -->
<div class="card shadow-sm mb-4">
    <div class="card-body">
        <form method="GET" action="index.php" class="row g-3 align-items-center">
            <div class="col-md-6">
                <input type="text" name="search" class="form-control" placeholder="Search by Book Title or Author..." value="<?= htmlspecialchars($search); ?>">
            </div>
            <div class="col-md-4">
                <select name="category" class="form-select">
                    <option value="0">All Categories</option>
                    <?php foreach ($categoriesList as $cat): 
                        $cName = $catMap[$cat['id']];
                    ?>
                        <option value="<?= $cat['id']; ?>" <?= ($category_id == $cat['id']) ? 'selected' : ''; ?>>
                            <?= htmlspecialchars($cName); ?>
                        </option>
                    <?php endforeach; ?>
                </select>
            </div>
            <div class="col-md-2 d-grid gap-2">
                <button type="submit" class="btn btn-primary"><i class="fa-solid fa-filter me-1"></i> Filter</button>
            </div>
        </form>
    </div>
</div>

<!-- Book Grid -->
<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
    <?php if (count($books) > 0): ?>
        <?php foreach ($books as $book): ?>
            <div class="col">
                <div class="card h-100 book-card shadow-sm border-0">
                    <?php 
                        $image_path = !empty($book['image']) ? htmlspecialchars($book['image']) : 'https://placehold.co/300x400?text=No+Cover';
                        $bookCatName = $catMap[$book['category_id']] ?? 'General';
                    ?>
                    <img src="<?= $image_path; ?>" 
                         onerror="this.onerror=null; this.src='https://placehold.co/300x400?text=No+Cover';" 
                         class="card-img-top book-img" 
                         alt="<?= htmlspecialchars($book['title']); ?>">
                    
                    <div class="card-body d-flex flex-column">
                        <div class="mb-2">
                            <span class="badge bg-info text-dark">
                                <?= htmlspecialchars($bookCatName); ?>
                            </span>
                        </div>
                        <h6 class="card-title fw-bold text-dark text-truncate" title="<?= htmlspecialchars($book['title']); ?>">
                            <?= htmlspecialchars($book['title']); ?>
                        </h6>
                        <p class="card-text text-muted small mb-2">By <?= htmlspecialchars($book['author']); ?></p>
                        
                        <div class="mt-auto">
                            <div class="fw-bold fs-5 text-success mb-3">₹<?= number_format($book['price'], 2); ?></div>
                            <div class="d-grid gap-2">
                                <a href="book-detail.php?id=<?= $book['id']; ?>" class="btn btn-outline-secondary btn-sm">
                                    View Details
                                </a>

                                <!-- UPDATED: Add to Cart Form -->
                                <form action="cart.php" method="POST">
                                    <input type="hidden" name="action" value="add">
                                    <input type="hidden" name="book_id" value="<?= $book['id']; ?>">
                                    <input type="hidden" name="quantity" value="1">
                                    <button type="submit" class="btn btn-warning btn-sm fw-semibold w-100">
                                        <i class="fa-solid fa-cart-plus me-1"></i> Add to Cart
                                    </button>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <?php endforeach; ?>
    <?php else: ?>
        <div class="col-12 w-100 text-center py-5">
            <i class="fa-solid fa-book-open-reader fs-1 text-muted mb-3"></i>
            <h4 class="text-muted">No books found matching your criteria.</h4>
            <a href="index.php" class="btn btn-primary mt-2">Reset Search</a>
        </div>
    <?php endif; ?>
</div>

<?php require_once 'includes/footer.php'; ?>;