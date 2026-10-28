<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| SewaKit REST API Routes
|--------------------------------------------------------------------------
| Base URL: http://localhost:8000/api
*/

Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'app' => 'SewaKit API',
        'timestamp' => now()->toIso8601String(),
    ]);
});

// Fitur 1 & 2 (Azriel): Login, Manajemen Akun, Kategori & Dashboard Admin
// Route::prefix('auth')->group(function () { ... });

// Fitur 3 & 4 (Triansyah): Kelola Barang, Paket, Saldo & Penarikan Dana
// Route::prefix('owner')->group(function () { ... });

// Fitur 5 & 6 (Rayvan): Katalog, Pencarian, Serah Terima & Pengembalian
// Route::prefix('catalog')->group(function () { ... });

// Fitur 7 & 8 (Ariq): Pengajuan Sewa, Persetujuan, Pembatalan & No-Show
// Route::prefix('rentals')->group(function () { ... });

// Fitur 9 & 10 (Fiqri): Pembayaran Xendit, Deposit, Denda & Sengketa
// Route::prefix('payments')->group(function () { ... });

// Fitur 11 & 12 (Alwan): Rating, Ulasan, Notifikasi & Pengingat
// Route::prefix('reviews')->group(function () { ... });
