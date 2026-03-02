<?php

declare(strict_types=1);

namespace App\Api\Application\Response;

use JsonSerializable;
use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: 'CarsListResponse',
    description: 'Paginated list of cars',
    required: ['cars', 'total', 'totalResults', 'page', 'totalPages'],
    properties: [
        new OA\Property(property: 'cars', description: 'Array of car objects', type: 'array', items: new OA\Items(ref: CarResponse::class)),
        new OA\Property(property: 'total', description: 'Total number of matching cars', type: 'integer', example: 16),
        new OA\Property(property: 'totalResults', description: 'Total number of matching cars', type: 'integer', example: 16),
        new OA\Property(property: 'page', description: 'Current page number', type: 'integer', example: 1),
        new OA\Property(property: 'totalPages', description: 'Total number of pages', type: 'integer', example: 2),
    ],
    type: 'object',
    additionalProperties: false,
)]
class CarsListResponse implements JsonSerializable
{
    public function __construct(
        public array $cars,
        public int $total,
        public int $totalResults,
        public int $page,
        public int $totalPages,
    ) {}

    public function jsonSerialize(): array
    {
        return [
            'cars' => $this->cars,
            'total' => $this->total,
            'totalResults' => $this->totalResults,
            'page' => $this->page,
            'totalPages' => $this->totalPages,
        ];
    }
}
