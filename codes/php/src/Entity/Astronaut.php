<?php

declare(strict_types=1);

namespace App\Entity;

use App\Repository\AstronautRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AstronautRepository::class)]
#[ORM\Table(name: 'astronauts')]
final class Astronaut
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id;

    #[ORM\Column(type: Types::TEXT, length: 50, unique: true)]
    private ?string $name;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): Astronaut
    {
        $this->name = $name;

        return $this;
    }
}
