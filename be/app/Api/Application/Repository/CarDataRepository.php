<?php

declare(strict_types=1);

namespace App\Api\Application\Repository;

class CarDataRepository
{
    private array $cars;

    public function __construct()
    {
        $json = file_get_contents(storage_path('app/data/cars.json'));
        $data = json_decode($json, true);
        $this->cars = $data['cars'] ?? [];
    }

    public function all(): array
    {
        return $this->cars;
    }

    public function find(int $id): ?array
    {
        foreach ($this->cars as $car) {
            if ($car['id'] === $id) {
                return $car;
            }
        }

        return null;
    }

    /**
     * Filter, sort, and paginate cars.
     *
     * @param array<string, mixed> $params Query parameters matching the frontend contract
     * @return array{cars: array, total: int, totalResults: int, page: int, totalPages: int}
     */
    public function filter(array $params): array
    {
        $cars = $this->cars;

        // Search
        if (!empty($params['search'])) {
            $search = mb_strtolower($params['search']);
            $cars = array_filter($cars, function (array $car) use ($search): bool {
                return str_contains(mb_strtolower($car['make']), $search)
                    || str_contains(mb_strtolower($car['model']), $search)
                    || str_contains(mb_strtolower($car['type'] ?? ''), $search)
                    || str_contains(mb_strtolower($car['city'] ?? ''), $search)
                    || str_contains(mb_strtolower($car['description'] ?? ''), $search);
            });
        }

        // Category filter (comma-separated)
        if (!empty($params['category'])) {
            $categories = array_map('mb_strtolower', explode(',', $params['category']));
            $cars = array_filter($cars, fn(array $car): bool =>
                in_array(mb_strtolower($car['category'] ?? ''), $categories, true)
            );
        }

        // Make filter (comma-separated)
        if (!empty($params['make'])) {
            $makes = array_map('mb_strtolower', explode(',', $params['make']));
            $cars = array_filter($cars, function (array $car) use ($makes): bool {
                $carMake = mb_strtolower($car['make']);
                foreach ($makes as $make) {
                    if (str_contains($carMake, $make)) {
                        return true;
                    }
                }
                return false;
            });
        }

        // Model filter (comma-separated)
        if (!empty($params['model'])) {
            $models = array_map('mb_strtolower', explode(',', $params['model']));
            $cars = array_filter($cars, function (array $car) use ($models): bool {
                $carModel = mb_strtolower($car['model']);
                foreach ($models as $model) {
                    if (str_contains($carModel, $model)) {
                        return true;
                    }
                }
                return false;
            });
        }

        // Exact year filter
        if (!empty($params['year'])) {
            $year = (int) $params['year'];
            $cars = array_filter($cars, fn(array $car): bool => $car['year'] === $year);
        }

        // Year range
        if (!empty($params['minYear'])) {
            $minYear = (int) $params['minYear'];
            $cars = array_filter($cars, fn(array $car): bool => $car['year'] >= $minYear);
        }
        if (!empty($params['maxYear'])) {
            $maxYear = (int) $params['maxYear'];
            $cars = array_filter($cars, fn(array $car): bool => $car['year'] <= $maxYear);
        }

        // Price range
        if (!empty($params['minPrice'])) {
            $minPrice = (int) $params['minPrice'];
            $cars = array_filter($cars, fn(array $car): bool => $car['price'] >= $minPrice);
        }
        if (!empty($params['maxPrice'])) {
            $maxPrice = (int) $params['maxPrice'];
            $cars = array_filter($cars, fn(array $car): bool => $car['price'] <= $maxPrice);
        }

        // Type filter (comma-separated)
        if (!empty($params['type'])) {
            $types = array_map('mb_strtolower', explode(',', $params['type']));
            $cars = array_filter($cars, function (array $car) use ($types): bool {
                $carType = mb_strtolower($car['type']);
                foreach ($types as $type) {
                    if (str_contains($carType, $type)) {
                        return true;
                    }
                }
                return false;
            });
        }

        // Transmission filter (comma-separated)
        if (!empty($params['transmission'])) {
            $transmissions = array_map('mb_strtolower', explode(',', $params['transmission']));
            $cars = array_filter($cars, function (array $car) use ($transmissions): bool {
                $carTrans = mb_strtolower($car['transmission']);
                foreach ($transmissions as $trans) {
                    if (str_contains($carTrans, $trans)) {
                        return true;
                    }
                }
                return false;
            });
        }

        // Fuel type filter (comma-separated)
        if (!empty($params['fuelType'])) {
            $fuelTypes = array_map('mb_strtolower', explode(',', $params['fuelType']));
            $cars = array_filter($cars, function (array $car) use ($fuelTypes): bool {
                $carFuel = mb_strtolower($car['fuelType']);
                foreach ($fuelTypes as $fuel) {
                    if (str_contains($carFuel, $fuel)) {
                        return true;
                    }
                }
                return false;
            });
        }

        // Re-index after filtering
        $cars = array_values($cars);

        // Sorting
        $sortBy = $params['sortBy'] ?? 'price';
        $sortOrder = $params['sortOrder'] ?? 'asc';

        usort($cars, function (array $a, array $b) use ($sortBy, $sortOrder): int {
            $aVal = $a[$sortBy] ?? null;
            $bVal = $b[$sortBy] ?? null;

            if (is_string($aVal) && is_string($bVal)) {
                $aVal = mb_strtolower($aVal);
                $bVal = mb_strtolower($bVal);
            }

            $result = $aVal <=> $bVal;

            return $sortOrder === 'desc' ? -$result : $result;
        });

        // Pagination
        $page = max(1, (int) ($params['page'] ?? 1));
        $limit = max(1, (int) ($params['limit'] ?? 12));
        $total = count($cars);
        $totalPages = (int) ceil($total / $limit);
        $offset = ($page - 1) * $limit;
        $paginated = array_slice($cars, $offset, $limit);

        return [
            'cars' => $paginated,
            'total' => $total,
            'totalResults' => $total,
            'page' => $page,
            'totalPages' => $totalPages,
        ];
    }
}
