<!-- includes/header.php -->
<nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
  <div class="container">
    <a class="navbar-brand fw-bold" href="index.php"><i class="bi bi-book me-2"></i>Bookify</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar">
      <span class="navbar-toggler-icon"></span>
    </button>
    
    <div class="collapse navbar-collapse" id="mainNavbar">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" href="index.php">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="cart.php">Cart</a>
        </li>
      </ul>
      
      <div class="d-flex align-items-center">
        <?php if (isset($_SESSION['user_id'])): ?>
            <!-- Admin Quick Access Badge -->
            <?php if (isset($_SESSION['user_role']) && $_SESSION['user_role'] === 'admin'): ?>
                <a href="admin/dashboard.php" class="btn btn-warning btn-sm me-2 fw-semibold">
                    <i class="bi bi-speedometer2 me-1"></i> Admin Dashboard
                </a>
            <?php else: ?>
                <a href="my-orders.php" class="btn btn-outline-light btn-sm me-2">
                    <i class="bi bi-bag-check me-1"></i> My Orders
                </a>
            <?php endif; ?>

            <span class="text-white me-3 ms-1">Hi, <?= htmlspecialchars($_SESSION['user_name']); ?></span>
            <a href="logout.php" class="btn btn-outline-light btn-sm"><i class="bi bi-box-arrow-right"></i> Logout</a>
        <?php else: ?>
            <a href="login.php" class="btn btn-outline-light btn-sm me-2">Login</a>
            <a href="register.php" class="btn btn-light btn-sm">Register</a>
        <?php endif; ?>
      </div>
    </div>
  </div>
</nav>