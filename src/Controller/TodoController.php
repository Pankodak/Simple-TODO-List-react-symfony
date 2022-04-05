<?php

namespace App\Controller;

use App\Repository\TodoRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;

#[Route('/api/todo', name: 'todo')]
class TodoController extends AbstractController
{
    private $todoRepository;
    public function __construct(TodoRepository $todoRepository)
    {
        $this->todoRepository = $todoRepository;
    }
    #[Route('/read', name: 'todo')]
    public function index(): JsonResponse
    {
        $todos = $this->todoRepository->findAll();

        $todosArray = [];

        foreach ($todos as $todo) {
            $todosArray[] = $todo->toArray();
        }
        return new JsonResponse($todosArray);
    }
}
