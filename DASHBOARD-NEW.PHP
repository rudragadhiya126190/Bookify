<?php
require_once 'header.php';

try {
    // Metrics queries
    $totalBooks = $pdo->query("SELECT COUNT(*) FROM books")->fetchColumn();
    $totalCategories = $pdo->query("SELECT COUNT(*) FROM categories")->fetchColumn();
    $totalCustomers = $pdo->query("SELECT COUNT(*) FROM users WHERE role = 'customer'")->fetchColumn();
    $totalRevenue = $pdo->query("SELECT COALESCE(SUM(total_amount), 0) FROM orders WHERE status = 'completed'")->fetchColumn();
    $totalPending = $pdo->query("SELECT COUNT(*) FROM orders WHERE status = 'pending'")->fetchColumn();

    // Recent 5 orders query with User JOIN
    $recentStmt = $pdo->query("
        SELECT o.id, o.total_amount, o.status, o.created_at, u.name as customer_name 
        FROM orders o 
        JOIN users u ON o.user_id = u.id 
        ORDER BY o.created_at DESC 
        LIMIT 5
    ");
    $recentOrders = $recentStmt->fetchAll(PDO::FETCH_ASSOC);

} catch (PDOException $e) {
    die("Database Error: " . $e->getMessage());
}
?>

<div class="d-flex justify-content-between align-items-center mb-4">
    <h1 class="h3">Dashboard Overview</h1>
    <span class="text-muted">Welcome back, Administrator</span>
</div>

<!-- Metric Summary Cards -->
<div class="row g-3 mb-4">
    <div class="col-md-4 col-xl-2.4">
        <div class="card border-0 shadow-sm bg-primary text-white h-100">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h6 class="text-uppercase fw-semibold mb-1 fs-7">Total Books</h6>
                        <h2 class="mb-0 fw-bold"><?= $totalBooks; ?></h2>
                    </div>
                    <i class="bi bi-book fs-1 opacity-50"></i>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="card border-0 shadow-sm bg-secondary text-white h-100">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h6 class="text-uppercase fw-semibold mb-1 fs-7">Categories</h6>
                        <h2 class="mb-0 fw-bold"><?= $totalCategories; ?></h2>
                    </div>
                    <i class="bi bi-tags fs-1 opacity-50"></i>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="card border-0 shadow-sm bg-info text-white h-100">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h6 class="text-uppercase fw-semibold mb-1 fs-7">Customers</h6>
                        <h2 class="mb-0 fw-bold"><?= $totalCustomers; ?></h2>
                    </div>
                    <i class="bi bi-people fs-1 opacity-50"></i>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-6">
        <div class="card border-0 shadow-sm bg-success text-white h-100">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h6 class="text-uppercase fw-semibold mb-1 fs-7">Total Revenue</h6>
                        <h2 class="mb-0 fw-bold">$<?= number_format($totalRevenue, 2); ?></h2>
                    </div>
                    <i class="bi bi-currency-dollar fs-1 opacity-50"></i>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-6">
        <div class="card border-0 shadow-sm bg-warning text-dark h-100">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h6 class="text-uppercase fw-semibold mb-1 fs-7">Pending Orders</h6>
                        <h2 class="mb-0 fw-bold"><?= $totalPending; ?></h2>
                    </div>
                    <i class="bi bi-hourglass-split fs-1 opacity-50"></i>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Recent Orders Section -->
<div class="card border-0 shadow-sm">
    <div class="card-header bg-white py-3 d-flex justify-content-between align-items-center">
        <h5 class="mb-0 fw-bold">Recent Orders</h5>
        <a href="orders.php" class="btn btn-sm btn-outline-primary">View All Orders</a>
    </div>
    <div class="card-body p-0">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
                <thead class="table-light">
                    <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th class="text-end">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (count($recentOrders) > 0): ?>
                        <?php foreach ($recentOrders as $order): ?>
                            <tr>
                                <td><strong>#<?= $order['id']; ?></strong></td>
                                <td><?= htmlspecialchars($order['customer_name']); ?></td>
                                <td>$<?= number_format($order['total_amount'], 2); ?></td>
                                <td>
                                    <?php if ($order['status'] === 'completed'): ?>
                                        <span class="badge bg-success">Completed</span>
                                    <?php elseif ($order['status'] === 'pending'): ?>
                                        <span class="badge bg-warning text-dark">Pending</span>
                                    <?php else: ?>
                                        <span class="badge bg-danger">Cancelled</span>
                                    <?php endif; ?>
                                </td>
                                <td><?= date('M d, Y H:i', strtotime($order['created_at'])); ?></td>
                                <td class="text-end">
                                    <a href="view-order.php?id=<?= $order['id']; ?>" class="btn btn-sm btn-light border">View Details</a>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    <?php else: ?>
                        <tr>
                            <td colspan="6" class="text-center py-4 text-muted">No orders found yet.</td>
                        </tr>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
    </div>
</div>

</div> <!-- Close container -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>