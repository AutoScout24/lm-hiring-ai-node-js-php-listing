<?php

declare(strict_types=1);

namespace App\Api\Application\Controller;

use App\Api\Application\Repository\CarDataRepository;
use App\Api\Application\Response\CarsListResponse;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;

#[OA\Get(
    path: '/cars',
    description: 'Get a paginated, filtered, and sorted list of cars',
    summary: 'List cars',
    tags: ['cars'],
)]
#[OA\Parameter(name: 'page', in: 'query', required: false, schema: new OA\Schema(type: 'integer', default: 1))]
#[OA\Parameter(name: 'limit', in: 'query', required: false, schema: new OA\Schema(type: 'integer', default: 12))]
#[OA\Parameter(name: 'search', in: 'query', required: false, schema: new OA\Schema(type: 'string'))]
#[OA\Parameter(name: 'category', in: 'query', required: false, schema: new OA\Schema(type: 'string', description: 'Comma-separated: new,used'))]
#[OA\Parameter(name: 'make', in: 'query', required: false, schema: new OA\Schema(type: 'string', description: 'Comma-separated make names'))]
#[OA\Parameter(name: 'model', in: 'query', required: false, schema: new OA\Schema(type: 'string', description: 'Comma-separated model names'))]
#[OA\Parameter(name: 'year', in: 'query', required: false, schema: new OA\Schema(type: 'integer'))]
#[OA\Parameter(name: 'minYear', in: 'query', required: false, schema: new OA\Schema(type: 'integer'))]
#[OA\Parameter(name: 'maxYear', in: 'query', required: false, schema: new OA\Schema(type: 'integer'))]
#[OA\Parameter(name: 'minPrice', in: 'query', required: false, schema: new OA\Schema(type: 'integer'))]
#[OA\Parameter(name: 'maxPrice', in: 'query', required: false, schema: new OA\Schema(type: 'integer'))]
#[OA\Parameter(name: 'type', in: 'query', required: false, schema: new OA\Schema(type: 'string', description: 'Comma-separated body types'))]
#[OA\Parameter(name: 'transmission', in: 'query', required: false, schema: new OA\Schema(type: 'string', description: 'Comma-separated transmissions'))]
#[OA\Parameter(name: 'fuelType', in: 'query', required: false, schema: new OA\Schema(type: 'string', description: 'Comma-separated fuel types'))]
#[OA\Parameter(name: 'sortBy', in: 'query', required: false, schema: new OA\Schema(type: 'string', default: 'price'))]
#[OA\Parameter(name: 'sortOrder', in: 'query', required: false, schema: new OA\Schema(type: 'string', enum: ['asc', 'desc'], default: 'asc'))]
#[OA\Response(
    response: '200',
    description: 'Paginated list of cars',
    content: new OA\JsonContent(ref: CarsListResponse::class),
)]
class GetCarsController
{
    public function __invoke(Request $request, CarDataRepository $repository): CarsListResponse
    {
        $params = $request->query();
        $result = $repository->filter($params);

        return new CarsListResponse(
            cars: $result['cars'],
            total: $result['total'],
            totalResults: $result['totalResults'],
            page: $result['page'],
            totalPages: $result['totalPages'],
        );
    }
}
