<?php

declare(strict_types=1);

namespace App\Api\Application\Response;

use JsonSerializable;
use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: 'CarResponse',
    description: 'Single car object',
    required: ['id', 'make', 'model', 'year', 'price', 'mileage', 'type', 'transmission', 'fuelType'],
    properties: [
        new OA\Property(property: 'id', type: 'integer', example: 1),
        new OA\Property(property: 'make', type: 'string', example: 'Maruti Suzuki'),
        new OA\Property(property: 'model', type: 'string', example: 'Swift'),
        new OA\Property(property: 'year', type: 'integer', example: 2023),
        new OA\Property(property: 'price', type: 'integer', example: 800000),
        new OA\Property(property: 'mileage', type: 'integer', example: 15000),
        new OA\Property(property: 'type', type: 'string', example: 'Hatchback'),
        new OA\Property(property: 'transmission', type: 'string', example: 'Manual'),
        new OA\Property(property: 'fuelType', type: 'string', example: 'Petrol'),
        new OA\Property(property: 'color', type: 'string', example: 'Pearl Arctic White'),
        new OA\Property(property: 'category', type: 'string', example: 'new'),
        new OA\Property(property: 'features', type: 'array', items: new OA\Items(type: 'string')),
        new OA\Property(property: 'images', type: 'array', items: new OA\Items(type: 'string')),
        new OA\Property(property: 'location', type: 'string', example: 'Delhi NCR'),
        new OA\Property(property: 'description', type: 'string'),
        new OA\Property(property: 'specifications', type: 'object'),
    ],
    type: 'object',
)]
class CarResponse implements JsonSerializable
{
    public function __construct(private array $data) {}

    public function jsonSerialize(): array
    {
        return $this->data;
    }
}
