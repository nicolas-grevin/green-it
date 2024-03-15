<?php

declare(strict_types=1);

namespace App\Controller;

use App\Entity\Probe;
use App\Entity\ProbeServiceStatus;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('', name: 'probes_')]
final class ProbeController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private SerializerInterface $serializer,
    )
    { }

    #[Route('/liveness', name: 'liveness', methods: ['GET'])]
    public function liveness(): JsonResponse
    {
        return $this->check();
    }

    #[Route('/readiness', name: 'readiness', methods: ['GET'])]
    public function readiness(): void
    {
        $this->check();
    }

    private function check(): JsonResponse
    {
        $probe = new Probe();
        $probeServiceStatus = new ProbeServiceStatus();
        $httpStatus = Response::HTTP_OK;

        try {
            $this->entityManager->getConnection()->executeStatement('SELECT 1');
        } catch (\Exception $e) {
            $probeServiceStatus->setStatus('nok')->setMessage('Service is down');
            $httpStatus = Response::HTTP_INTERNAL_SERVER_ERROR;
        }

        $probe->add('postgres', $probeServiceStatus);

        return new JsonResponse($this->serializer->serialize($probe, 'json', []), $httpStatus, [], true);
    }
}
