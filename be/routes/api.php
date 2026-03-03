<?php
declare(strict_types=1);

use App\Api\Application\Controller\GetCarController;
use App\Api\Application\Controller\GetCarsController;
use App\Api\Application\Controller\GetVersionController;
use App\Api\Application\Controller\HiController;
use Illuminate\Support\Facades\Route;

Route::get('/hi/{name}', HiController::class);
Route::get('/version', GetVersionController::class);
Route::get('/cars', GetCarsController::class);
Route::get('/cars/{id}', GetCarController::class);
