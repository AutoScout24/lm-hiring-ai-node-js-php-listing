<?php
declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;
use Illuminate\Contracts\View\View as ViewResponse;

final class WelcomeController
{
    public function __invoke(Request $request): ViewResponse
    {
        return View::make('welcome');
    }
}