<?php

namespace App\Api\Application\Response;

use Illuminate\Foundation\Application;
use JsonSerializable;
use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: 'VersionResponse',
    description: 'Framework version information',
    required: ['version', 'php_version'],
    properties: [
        new OA\Property(
            property: 'version',
            description: 'Laravel framework version',
            type: 'string',
            example: '11.31',
        ),
        new OA\Property(
            property: 'php_version',
            description: 'PHP version',
            type: 'string',
            example: '8.2.15',
        ),
    ],
    type: 'object',
)]
class VersionResponse implements JsonSerializable
{
    public function __construct(
        public string $version,
        public string $php_version,
    ) {}

    public function jsonSerialize(): array
    {
        return [
            'version' => $this->version,
            'php_version' => $this->php_version,
        ];
    }
}
