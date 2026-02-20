<?php

namespace App\Api\Application\Controller;

use App\Api\Application\Response\VersionResponse;
use Illuminate\Foundation\Application;
use OpenApi\Attributes as OA;

#[OA\Get(
    path: '/version',
    description: 'Get framework version information',
    summary: 'Retrieve Laravel and PHP version details',
    tags: ['system'],
)]
#[OA\Response(
    response: '200',
    description: 'Framework version information',
    content: new OA\JsonContent(ref: VersionResponse::class),
)]
class GetVersionController
{
    public function __invoke(): VersionResponse
    {
        return new VersionResponse(
            version: Application::VERSION,
            php_version: PHP_VERSION,
        );
    }
}
