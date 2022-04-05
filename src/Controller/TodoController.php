<?php

namespace App\Controller;

use App\Entity\Todo;
use App\Repository\TodoRepository;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints\Json;

#[Route('/api/todo', name: 'todo')]
class TodoController extends AbstractController
{
    private $todoRepository;
    private $entityManager;
    public function __construct(EntityManagerInterface $entityManager, TodoRepository $todoRepository)
    {
        $this->todoRepository = $todoRepository;
        $this->entityManager = $entityManager;
    }
    #[Route('/read', name: 'todo_read', methods: ['GET'])]
    public function index(): JsonResponse
    {
        $todos = $this->todoRepository->findAll();

        $todosArray = [];

        foreach ($todos as $todo) {
            $todosArray[] = $todo->toArray();
        }
        return new JsonResponse($todosArray);
    }
    #[Route('/create', name: 'todo_create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $content = json_decode($request->getContent());
        $todo = new Todo();
        $todo->setName($content->name);
        $todo->setDescription($content->description);
        $this->entityManager->persist($todo);
        $this->entityManager->flush();
        return new JsonResponse($todo->toArray());
    }

    #[Route('/update/{id}', name: 'todo_update', methods: ['PUT'])]
    public function update(Request $request, Todo $todo): JsonResponse
    {
        $content = json_decode($request->getContent());
        $todo->setName($content->name);
        $todo->setDescription($content->description);
        $this->entityManager->flush();
        return new JsonResponse(['message' => 'todo has been updated successfully']);
    }

    #[Route('/delete/{id}', name: 'todo_delete', methods: ['DELETE'])]
    public function delete(Todo $todo): JsonResponse
    {
        $this->entityManager->remove($todo);
        $this->entityManager->flush();
        return new JsonResponse(['message' => 'todo has been deleted successfully']);
    }
}
