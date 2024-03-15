<?php

declare(strict_types=1);

namespace App\Controller;

use App\Entity\Astronaut;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/astronauts', name: 'astronauts_')]
final class AstronautController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private SerializerInterface $serializer,
    )
    { }

    #[Route('', name: 'list', methods: ['GET'])]
    public function list(): JsonResponse
    {
        try {
            return new JsonResponse(
                $this->serializer->serialize(
                    $this->entityManager->getRepository(Astronaut::class)->findAll(),
                    'json',
                    [],
                ),
                Response::HTTP_OK,
                [],
                true,
            );
        } catch (\Exception $e) {
            return new JsonResponse(
                ['error' => $e->getMessage()],
                Response::HTTP_INTERNAL_SERVER_ERROR,
            );
        }
    }

    #[Route('/{id}', name: 'view', methods: ['GET'], requirements: ['id' => '\d+'])]
    public function view(?int $id = null): JsonResponse
    {
        try {
            return new JsonResponse(
                $this->serializer->serialize(
                    $this->entityManager->getRepository(Astronaut::class)->find($id),
                    'json',
                    [],
                ),
                Response::HTTP_OK,
                [],
                true,
            );
        } catch (\Exception $e) {
            return new JsonResponse(
                ['error' => $e->getMessage()],
                Response::HTTP_INTERNAL_SERVER_ERROR,
            );
        }
    }
}
