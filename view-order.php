<?php
require_once 'header.php';

$orderId = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($orderId <= 0) {
    header("Location: orders.php");
    exit();
}

try {
    // Fetch Order details with customer information
    $orderStmt = $pdo->prepare("
        SELECT o.*, u.name as customer_name, u.email as customer_email 
        FROM orders o 
        JOIN users u ON o.user_id = u.id 
        WHERE o.id = :id
    ");
    $orderStmt->execute([':id' => $orderId]);
    $order = $orderStmt->fetch(PDO::FETCH_ASSOC);

    if (!$order) {
        echo "<div class='alert alert-danger'>Order not found.</div>";
        exit();
    }

    // Fetch Order items with Book details
    $itemsStmt = $pdo->prepare("
        SELECT oi.*, b.title, b.cover_image 
        FROM order_items oi 
        JOIN books b ON oi.book_id = b.id 
        WHERE oi.order_id = :order_id
    ");
    $itemsStmt->execute([':order_id' => $orderId]);
    $items = $itemsStmt->fetchAll(PDO::FETCH_ASSOC);

} catch (PDOException $e) {
    die("Database Error: " . $e->getMessage());
}
?>

<div class="mb-4">
    <a href="orders.php" class="btn btn-outline-secondary btn-sm"><i class="bi bi-arrow-left"></i> Back to Orders</a>
</div>

<div class="row g-4">
    <!-- Summary Section -->
    <div class="col-md-4">
        <div class="card border-0 shadow-sm mb-4">
            <div class="card-header bg-white py-3">
                <h5 class="mb-0 fw-bold">Order Overview</h5>
            </div>
            <div class="card-body">
                <p class="mb-2"><strong>Order ID:</strong> #<?= $order['id']; ?></p>
                <p class="mb-2"><strong>Date Placed:</strong> <?= date('M d, Y h:i A', strtotime($order['created_at'])); ?></p>
                <p class="mb-2"><strong>Total Amount:</strong> <span class="text-success fw-bold fs-5">$<?= number_format($order['total_amount'], 2); ?></span></p>
                <p class="mb-0"><strong>Status:</strong> 
                    <?php if ($order['status'] === 'completed'): ?>
                        <span class="badge bg-success">Completed</span>
                    <?php elseif ($order['status'] === 'pending'): ?>
                        <span class="badge bg-warning text-dark">Pending</span>
                    <?php else: ?>
                        <span class="badge bg-danger">Cancelled</span>
                    <?php endif; ?>
                </p>
            </div>
        </div>

        <div class="card border-0 shadow-sm">
            <div class="card-header bg-white py-3">
                <h5 class="mb-0 fw-bold">Customer & Shipping Info</h5>
            </div>
            <div class="card-body">
                <p class="mb-1"><strong>Name:</strong> <?= htmlspecialchars($order['customer_name']); ?></p>
                <p class="mb-3"><strong>Email:</strong> <?= htmlspecialchars($order['customer_email']); ?></p>
                <hr>
                <h6 class="fw-bold">Shipping Address:</h6>
                <p class="mb-0 text-secondary"><?= nl2br(htmlspecialchars($order['shipping_address'] ?? 'No address provided.')); ?></p>
            </div>
        </div>
    </div>

    <!-- Items Breakdown Section -->
    <div class="col-md-8">
        <div class="card border-0 shadow-sm">
            <div class="card-header bg-white py-3">
                <h5 class="mb-0 fw-bold">Ordered Items</h5>
            </div>
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table align-middle mb-0">
                        <thead class="table-light">
                            <tr>
                                <th>Book</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th class="text-end">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($items as $item): 
                                $subtotal = $item['price'] * $item['quantity'];
                            ?>
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <img src="../uploads/<?= htmlspecialchars($item['cover_image'] ?? 'placeholder.png'); ?>" alt="<?= htmlspecialchars($item['title']); ?>" style="width: 50px; height: 70px; object-fit: cover;" class="rounded me-3 border">
                                            <span class="fw-semibold"><?= htmlspecialchars($item['title']); ?></span>
                                        </div>
                                    </td>
                                    <td>$<?= number_format($item['price'], 2); ?></td>
                                    <td><?= $item['quantity']; ?></td>
                                    <td class="text-end fw-bold">$<?= number_format($subtotal, 2); ?></td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                        <tfoot class="table-light">
                            <tr>
                                <td colspan="3" class="text-end fw-bold">Grand Total:</td>
                                <td class="text-end fw-bold text-success fs-5">$<?= number_format($order['total_amount'], 2); ?></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

</div> <!-- Close container -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>