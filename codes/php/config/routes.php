<?php
declare(strict_types=1);

use Symfony\Component\Routing\Loader\Configurator\RoutingConfigurator;

return static function (RoutingConfigurator $routes): void {
    $routes->import(__DIR__ . '/../src/Controller/', 'attribute')
        ->prefix('/api/v1')
        ->namePrefix('api_v1');
};
