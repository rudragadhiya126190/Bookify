<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
require_once 'config/db.php';

// Initialize Cart Session structure: [book_id => quantity]
if (!isset($_SESSION['cart'])) {
    $_SESSION['cart'] = [];
}

// Handle Cart Actions (POST/GET)
$action = $_REQUEST['action'] ?? null;

if ($action === 'add' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $bookId   = (int)($_POST['book_id'] ?? 0);
    $quantity = max(1, (int)($_POST['quantity'] ?? 1));

    if ($bookId > 0) {
        if (isset($_SESSION['cart'][$bookId])) {
            $_SESSION['cart'][$bookId] += $quantity;
        } else {
            $_SESSION['cart'][$bookId] = $quantity;
        }
        $_SESSION['success_msg'] = "Book added to cart!";
    }
    header("Location: cart.php");
    exit;
}

if ($action === 'update' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $bookId   = (int)($_POST['book_id'] ?? 0);
    $quantity = (int)($_POST['quantity'] ?? 1);

    if ($bookId > 0) {
        if ($quantity > 0) {
            $_SESSION['cart'][$bookId] = $quantity;
        } else {
            unset($_SESSION['cart'][$bookId]);
        }
        $_SESSION['success_msg'] = "Cart updated successfully!";
    }
    header("Location: cart.php");
    exit;
}

if ($action === 'remove') {
    $bookId = (int)($_GET['id'] ?? 0);
    if (isset($_SESSION['cart'][$bookId])) {
        unset($_SESSION['cart'][$bookId]);
        $_SESSION['success_msg'] = "Item removed from cart.";
    }
    header("Location: cart.php");
    exit;
}

if ($action === 'clear') {
    $_SESSION['cart'] = [];
    $_SESSION['success_msg'] = "Cart cleared!";
    header("Location: cart.php");
    exit;
}

// Fetch Cart Details from DB
$cartItems = [];
$grandTotal = 0.0;

if (!empty($_SESSION['cart'])) {
    $placeholders = implode(',', array_fill(0, count($_SESSION['cart']), '?'));
    $stmt = $pdo->prepare("SELECT * FROM books WHERE id IN ($placeholders)");
    $stmt->execute(array_keys($_SESSION['cart']));
    $books = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($books as $book) {
        $qty = $_SESSION['cart'][$book['id']];
        $subtotal = $book['price'] * $qty;
        $grandTotal += $subtotal;

        $cartItems[] = [
            'id'       => $book['id'],
            'title'    => $book['title'],
            'image'    => $book['image'] ?? 'assets/images/default-book.png',
            'price'    => $book['price'],
            'quantity' => $qty,
            'subtotal' => $subtotal
        ];
    }
}

include 'includes/header.php';
?>

<div class="container my-5">
    <h2 class="mb-4">Your Shopping Cart</h2>

    <?php if (isset($_SESSION['success_msg'])): ?>
        <div class="alert alert-success alert-dismissible fade show">
            <?= htmlspecialchars($_SESSION['success_msg']) ?>
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
        <?php unset($_SESSION['success_msg']); ?>
    <?php endif; ?>

    <?php if (empty($cartItems)): ?>
        <div class="alert alert-info py-4 text-center">
            <h4>Your cart is empty.</h4>
            <a href="index.php" class="btn btn-outline-primary mt-3">Browse Books</a>
        </div>
    <?php else: ?>
        <div class="table-responsive shadow-sm rounded">
            <table class="table table-hover align-middle mb-0 bg-white">
                <thead class="table-dark">
                    <tr>
                        <th style="width: 100px;">Image</th>
                        <th>Book Title</th>
                        <th>Unit Price</th>
                        <th style="width: 160px;">Quantity</th>
                        <th>Subtotal</th>
                        <th class="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($cartItems as $item): ?>
                        <tr>
                            <td>
                                <img src="<?= htmlspecialchars($item['image']) ?>" alt="<?= htmlspecialchars($item['title']) ?>" class="img-thumbnail" style="height: 70px; object-fit: cover;">
                            </td>
                            <td class="fw-bold"><?= htmlspecialchars($item['title']) ?></td>
                            <td>$<?= number_format($item['price'], 2) ?></td>
                            <td>
                                <form action="cart.php" method="POST" class="d-flex align-items-center">
                                    <input type="hidden" name="action" value="update">
                                    <input type="hidden" name="book_id" value="<?= $item['id'] ?>">
                                    <input type="number" name="quantity" value="<?= $item['quantity'] ?>" min="1" class="form-control form-control-sm me-2" style="width: 70px;">
                                    <button type="submit" class="btn btn-sm btn-outline-secondary" title="Update Quantity">
                                        <i class="bi bi-arrow-clockwise">✓</i>
                                    </button>
                                </form>
                            </td>
                            <td class="fw-bold">$<?= number_format($item['subtotal'], 2) ?></td>
                            <td class="text-center">
                                <a href="cart.php?action=remove&id=<?= $item['id'] ?>" class="btn btn-sm btn-danger" onclick="return confirm('Remove this item?')">Remove</a>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>

        <div class="d-flex justify-content-between align-items-center mt-4">
            <a href="cart.php?action=clear" class="btn btn-outline-danger" onclick="return confirm('Clear entire cart?')">Clear Cart</a>
            <div class="text-end">
                <h4 class="mb-3">Grand Total: <span class="text-primary">$<?= number_format($grandTotal, 2) ?></span></h4>
                <a href="index.php" class="btn btn-secondary me-2">Continue Shopping</a>
                <a href="checkout.php" class="btn btn-success btn-lg">Proceed to Checkout</a>
            </div>
        </div>
    <?php endif; ?>
</div>

<?php include 'includes/footer.php'; ?>
<script>
  document.addEventListener("DOMContentLoaded", function() {
    document.body.innerHTML = document.body.innerHTML.replace(/\$/g, '₹');
  });
</script>