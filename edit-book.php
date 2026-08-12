<?php
require_once 'includes/header.php';

$book_id = (int)($_GET['id'] ?? 0);
if ($book_id <= 0) {
    header("Location: books.php");
    exit;
}

// Fetch existing book record
$stmt = $pdo->prepare("SELECT * FROM books WHERE id = :id");
$stmt->execute([':id' => $book_id]);
$book = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$book) {
    $_SESSION['error'] = "Book not found.";
    header("Location: books.php");
    exit;
}

// Fetch categories
$categories = $pdo->query("SELECT * FROM categories ORDER BY category_name ASC")->fetchAll(PDO::FETCH_ASSOC);
$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title       = trim($_POST['title'] ?? '');
    $author      = trim($_POST['author'] ?? '');
    $category_id = (int)($_POST['category_id'] ?? 0);
    $price       = (float)($_POST['price'] ?? 0);
    $stock       = (int)($_POST['stock'] ?? 0);
    $description = trim($_POST['description'] ?? '');

    $imageName = $book['image']; // Keep old image by default

    // Handle optional new image upload
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $fileTmpPath   = $_FILES['image']['tmp_name'];
        $fileName      = $_FILES['image']['name'];
        $fileSize      = $_FILES['image']['size'];
        $fileExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

        $allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];
        $maxSize = 2 * 1024 * 1024;

        if (!in_array($fileExtension, $allowedExtensions)) {
            $error = "Invalid file type.";
        } elseif ($fileSize > $maxSize) {
            $error = "File size exceeds 2MB.";
        } else {
            $uploadDir = '../uploads/';
            $newImageName = time() . '_' . uniqid() . '.' . $fileExtension;

            if (move_uploaded_file($fileTmpPath, $uploadDir . $newImageName)) {
                // Delete old image if it exists
                if (!empty($book['image']) && file_exists($uploadDir . $book['image'])) {
                    unlink($uploadDir . $book['image']);
                }
                $imageName = $newImageName;
            } else {
                $error = "Failed to upload new image.";
            }
        }
    }

    if (empty($error)) {
       $sql = "UPDATE books SET title = :title, author = :author, category_id = :category_id,
        price = :price, description = :description, image = :image
        WHERE id = :id";
        $updateStmt = $pdo->prepare($sql);
        $updated = $updateStmt->execute([
            ':title'       => $title,
            ':author'      => $author,
            ':category_id' => $category_id,
            ':price'       => $price,
            ':description' => $description,
            ':image'       => $imageName,
            ':id'          => $book_id
        ]);

        if ($updated) {
            $_SESSION['success'] = "Book updated successfully!";
            header("Location: books.php");
            exit;
        } else {
            $error = "Database update failed.";
        }
    }
}
?>

<div class="row justify-content-center">
    <div class="col-md-8">
        <div class="card shadow-sm">
            <div class="card-header bg-warning text-dark">
                <h4 class="mb-0"><i class="fa-solid fa-pen-to-square me-2"></i>Edit Book</h4>
            </div>
            <div class="card-body">
                <?php if ($error): ?>
                    <div class="alert alert-danger"><?= htmlspecialchars($error) ?></div>
                <?php endif; ?>

                <form action="edit-book.php?id=<?= $book_id ?>" method="POST" enctype="multipart/form-data">
                    <div class="mb-3">
                        <label class="form-label">Book Title</label>
                        <input type="text" name="title" class="form-control" value="<?= htmlspecialchars($book['title']) ?>" required>
                    </div>

                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Author</label>
                            <input type="text" name="author" class="form-control" value="<?= htmlspecialchars($book['author']) ?>" required>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Category</label>
                            <select name="category_id" class="form-select" required>
                                <?php foreach ($categories as $cat): ?>
                                    <option value="<?= $cat['id'] ?>" <?= $cat['id'] == $book['category_id'] ? 'selected' : '' ?>>
                                        <?= htmlspecialchars($cat['category_name']) ?>
                                    </option>
                                <?php endforeach; ?>
                            </select>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Price (₹)</label>
                            <input type="number" step="0.01" name="price" class="form-control" value="<?= $book['price'] ?>" required>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Stock Quantity</label>
                            <input type="number" name="stock" class="form-control" value="<?= $book['stock'] ?? 10 ?>"required>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Description</label>
                        <textarea name="description" class="form-control" rows="4"><?= htmlspecialchars($book['description']) ?></textarea>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Current Image</label><br>
                        <?php if (!empty($book['image']) && file_exists('../uploads/' . $book['image'])): ?>
                            <img src="../uploads/<?= $book['image'] ?>" class="rounded border mb-2" style="max-width: 100px;">
                        <?php else: ?>
                            <p class="text-muted small">No image uploaded.</p>
                        <?php endif; ?>
                        <input type="file" name="image" class="form-control" accept="image/jpeg,image/png,image/webp">
                        <small class="text-muted">Leave blank if you do not want to change the image.</small>
                    </div>

                    <div class="d-flex justify-content-between">
                        <a href="books.php" class="btn btn-secondary">Cancel</a>
                        <button type="submit" class="btn btn-primary"><i class="fa-solid fa-rotate me-1"></i> Update Book</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<?php require_once 'includes/footer.php'; ?>
<script>
  document.addEventListener("DOMContentLoaded", function() {
    document.body.innerHTML = document.body.innerHTML.replace(/\$/g, '₹');
  });
</script>