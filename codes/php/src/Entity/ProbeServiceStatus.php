<?php

declare(strict_types=1);

namespace App\Entity;

final class ProbeServiceStatus
{
    private string $status = "ok";
    private string $message = "Service is up";

    public function getStatus(): string
    {
        return $this->status;
    }

    public function getMessage(): string
    {
        return $this->message;
    }

    public function setStatus(string $status): ProbeServiceStatus
    {
        $this->status = $status;

        return $this;
    }

    public function setMessage(string $message): ProbeServiceStatus
    {
        $this->message = $message;

        return $this;
    }
}
