<?php

declare(strict_types=1);

namespace App\Entity;

use RuntimeException;

final class Probe
{
    private array $services;

    public function __construct()
    {
        $this->services = [];
    }

    public function add(string $name, ProbeServiceStatus $probeServiceStatus): Probe
    {
        if (array_key_exists($name, $this->services)) {
            throw new RuntimeException('The service is allready exist');
        }

        $this->services[$name] = $probeServiceStatus;

        return $this;
    }

    public function remove(string $name): Probe
    {
        if (!array_key_exists($name, $this->services)) {
            throw new RuntimeException('The service don\'t exist');
        }

        unset($this->services[$name]);

        return $this;
    }

    public function getServices(): array
    {
        return $this->services;
    }
}
