<?php

namespace App\Api\Application\Controller;

use App\Api\Application\Response\HiResponse;
use Illuminate\Http\Request;

use OpenApi\Attributes as OA;

#[OA\get(
    path: '/hi/{name}',
    description: 'Hi controller',
    tags: ['greeting'],
)]
#[OA\Parameter(
    name: 'name',
    description: 'Name',
    in: 'path',
    required: true,
    schema: new OA\Schema(type: 'string'),
)]
#[OA\Response(
    response: '200',
    description: 'JWT token',
    content: new OA\JsonContent(
        ref: HiResponse::class,
    ),
)]
class HiController
{
    public function __invoke(Request $request, string $name): HiResponse
    {
        return new HiResponse($name);
    }
}