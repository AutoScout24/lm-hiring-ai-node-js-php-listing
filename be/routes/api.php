<?php
declare(strict_types=1);

use App\Api\Application\Controller\GetVersionController;
use App\Api\Application\Controller\HiController;
use Illuminate\Support\Facades\Route;

Route::get('/hi/{name}', HiController::class);
Route::get('/version', GetVersionController::class);
