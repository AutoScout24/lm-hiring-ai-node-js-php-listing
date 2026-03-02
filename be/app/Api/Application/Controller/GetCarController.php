<?php

declare(strict_types=1);

namespace App\Api\Application\Controller;

use App\Api\Application\Repository\CarDataRepository;
use App\Api\Application\Response\CarResponse;
use Illuminate\Http\JsonResponse;
use OpenApi\Attributes as OA;

#[OA\Get(
    path: '/cars/{id}',
    description: 'Get a single car by its ID',
    summary: 'Get car details',
    tags: ['cars'],
)]
#[OA\Parameter(
    name: 'id',
    description: 'Car ID',
    in: 'path',
    required: true,
    schema: new OA\Schema(type: 'integer'),
)]
#[OA\Response(
    response: '200',
    description: 'Car details',
    content: new OA\JsonContent(ref: CarResponse::class),
)]
#[OA\Response(
    response: '404',
    description: 'Car not found',
    content: new OA\JsonContent(
        properties: [new OA\Property(property: 'error', type: 'string', example: 'Car not found')],
        type: 'object',
    ),
)]
class GetCarController
{
    public function __invoke(int $id, CarDataRepository $repository): CarResponse|JsonResponse
    {
        $car = $repository->find($id);

        if ($car === null) {
            return new JsonResponse(['error' => 'Car not found'], 404);
        }

        return new CarResponse($car);
    }
}
