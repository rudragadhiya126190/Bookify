<?php
require_once 'includes/header.php';

$err = '';

// Fetch categories safely
$categories = $pdo->query("SELECT * FROM categories ORDER BY id DESC")->fetchAll(PDO::FETCH_ASSOC);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = trim($_POST['title'] ?? '');
    $author = trim($_POST['author'] ?? '');
    $category_id = $_POST['category_id'] ?? null;
    $price = $_POST['price'] ?? 0;
    $stock = $_POST['stock'] ?? 10;
    $description = trim($_POST['description'] ?? '');
    $imageName = '';

    // Handle File Upload
    if (!empty($_FILES['image']['name'])) {
        $ext = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
        $imageName = time() . '_' . uniqid() . '.' . $ext;
        $target = '../uploads/' . $imageName;
        
        if (!is_dir('../uploads')) {
            mkdir('../uploads', 0777, true);
        }
        move_uploaded_file($_FILES['image']['tmp_name'], $target);
    }

    if (!empty($title) && !empty($author) && !empty($price)) {
        try {
            // Try with 'stock' column
            $sql = "INSERT INTO books (title, author, category_id, price, stock, description, image) VALUES (?, ?, ?, ?, ?, ?, ?)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$title, $author, $category_id, $price, $stock, $description, $imageName]);
        } catch (Exception $e) {
            // Fallback for 'quantity' if column is different
            $sql = "INSERT INTO books (title, author, category_id, price, quantity, description, image) VALUES (?, ?, ?, ?, ?, ?, ?)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$title, $author, $category_id, $price, $stock, $description, $imageName]);
        }

        $_SESSION['success'] = "New book added successfully!";
        header("Location: books.php");
        exit();
    } else {
        $err = "Please fill in all required fields.";
    }
}
?>

<div class="row mb-4">
    <div class="col">
        <h2>Add New Book</h2>
    </div>
    <div class="col-auto">
        <a href="books.php" class="btn btn-outline-secondary"><i class="fa-solid fa-arrow-left me-1"></i> Back to Books</a>
    </div>
</div>

<?php if ($err): ?>
    <div class="alert alert-danger alert-dismissible fade show"><?= htmlspecialchars($err) ?><button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>
<?php endif; ?>

<div class="card shadow-sm">
    <div class="card-body p-4">
        <form method="POST" enctype="multipart/form-data">
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label class="form-label">Book Title *</label>
                    <input type="text" name="title" class="form-control" required placeholder="Enter book title">
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label">Author Name *</label>
                    <input type="text" name="author" class="form-control" required placeholder="Enter author name">
                </div>
            </div>

            <div class="row">
                <div class="col-md-4 mb-3">
                    <label class="form-label">Category</label>
                    <select name="category_id" class="form-select">
                        <option value="">Select Category</option>
                        <?php foreach ($categories as $cat): ?>
                            <?php $cName = $cat['category_name'] ?? $cat['name'] ?? 'Unnamed'; ?>
                            <option value="<?= $cat['id'] ?>"><?= htmlspecialchars($cName) ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">Price (₹) *</label>
                    <input type="number" step="0.01" name="price" class="form-control" required placeholder="0.00">
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">Stock Quantity</label>
                    <input type="number" name="stock" class="form-control" value="10">
                </div>
            </div>

            <div class="mb-3">
                <label class="form-label">Cover Image</label>
                <input type="file" name="image" class="form-control" accept="image/*">
            </div>

            <div class="mb-3">
                <label class="form-label">Description</label>
                <textarea name="description" class="form-control" rows="4" placeholder="Enter book description..."></textarea>
            </div>

            <button type="submit" class="btn btn-primary px-4"><i class="fa-solid fa-floppy-disk me-1"></i> Save Book</button>
        </form>
    </div>
</div>

<?php require_once 'includes/footer.php'; ?>