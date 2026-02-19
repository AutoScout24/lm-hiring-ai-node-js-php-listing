<?php
declare(strict_types=1);

namespace App\Api\Application\Response;

use JsonSerializable;
use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: 'HiResponse',
    description: 'Hi response',
    required: ['name'],
    properties: [
        new OA\Property(
            property: 'name',
            description: 'Name',
            type: 'name',
            example: 'pong',
        ),
    ],
    type: 'object',
    additionalProperties: false,
)]
class HiResponse implements JsonSerializable
{
    public function __construct(public string $name)
    {
    }
    public function jsonSerialize(): array
    {
        return [
            'name' => $this->name,
        ];
    }
}
