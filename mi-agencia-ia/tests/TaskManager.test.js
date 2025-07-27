import { jest } from '@jest/globals';
import TaskManager from '../src/core/TaskManager.js';
import EventEmitter from 'events';

/**
 * Tests para TaskManager
 * 
 * Estos tests verifican la funcionalidad core del sistema de gestión de tareas
 */
describe('TaskManager', () => {
  let taskManager;
  let mockDb;
  let eventBus;

  beforeEach(() => {
    // Mock del EventBus
    eventBus = new EventEmitter();
    
    // Mock de la base de datos
    const taskStorage = new Map();
    
    mockDb = {
      tasks: {
        insert: jest.fn().mockImplementation(async (task) => {
          taskStorage.set(task.taskId, task);
          return task;
        }),
        findOne: jest.fn().mockImplementation(async (query) => {
          if (query.taskId) {
            return taskStorage.get(query.taskId) || null;
          }
          return null;
        }),
        find: jest.fn().mockImplementation(async (query) => {
          const results = Array.from(taskStorage.values());
          return {
            sort: jest.fn().mockReturnValue({
              limit: jest.fn().mockResolvedValue(results.slice(0, 10))
            })
          };
        }),
        update: jest.fn().mockImplementation(async (query, data) => {
          if (query.taskId) {
            const existing = taskStorage.get(query.taskId);
            if (existing) {
              const updated = { ...existing, ...data };
              taskStorage.set(query.taskId, updated);
              return updated;
            }
          }
          return null;
        })
      }
    };

    taskManager = new TaskManager(mockDb, eventBus);
  });

  describe('createTask', () => {
    it('should create a valid task with all required fields', async () => {
      const taskData = {
        projectId: 'project-123',
        requesterAgent: 'human',
        targetAgent: 'content_creator',
        input: {
          prompt: 'Create a blog post about AI',
          context: { audience: 'developers' }
        },
        priority: 7
      };

      const task = await taskManager.createTask(taskData);

      expect(task).toBeDefined();
      expect(task.taskId).toBeDefined();
      expect(task.projectId).toBe(taskData.projectId);
      expect(task.status).toBe('pending');
      expect(task.requesterAgent).toBe(taskData.requesterAgent);
      expect(task.targetAgent).toBe(taskData.targetAgent);
      expect(task.priority).toBe(taskData.priority);
      expect(task.input).toEqual(taskData.input);
      expect(task.history).toHaveLength(1);
      expect(task.history[0].action).toBe('task_created');
      expect(task.createdAt).toBeDefined();
      expect(task.updatedAt).toBeDefined();

      // Verificar que se llamó al mock de la DB
      expect(mockDb.tasks.insert).toHaveBeenCalledWith(task);
    });

    it('should emit task:created event when task is created', async () => {
      const eventSpy = jest.fn();
      eventBus.on('task:created', eventSpy);

      const taskData = {
        projectId: 'project-123',
        requesterAgent: 'human',
        targetAgent: 'content_creator',
        input: {
          prompt: 'Test task'
        }
      };

      const task = await taskManager.createTask(taskData);

      expect(eventSpy).toHaveBeenCalledWith(task);
    });

    it('should set default values correctly', async () => {
      const taskData = {
        projectId: 'project-123',
        requesterAgent: 'human',
        targetAgent: 'content_creator',
        input: {
          prompt: 'Test task'
        }
      };

      const task = await taskManager.createTask(taskData);

      expect(task.priority).toBe(5); // Default priority
      expect(task.parentTaskId).toBeNull();
      expect(task.output).toBeNull();
      expect(task.humanFeedback).toBeNull();
      expect(task.metadata.version).toBe('1.0');
      expect(task.metadata.environment).toBe('test');
    });
  });

  describe('getTask', () => {
    it('should retrieve an existing task by ID', async () => {
      const taskData = {
        projectId: 'project-123',
        requesterAgent: 'human',
        targetAgent: 'content_creator',
        input: { prompt: 'Test task' }
      };

      const createdTask = await taskManager.createTask(taskData);
      const retrievedTask = await taskManager.getTask(createdTask.taskId);

      expect(retrievedTask).toEqual(createdTask);
      expect(mockDb.tasks.findOne).toHaveBeenCalledWith({ taskId: createdTask.taskId });
    });

    it('should return null for non-existent task', async () => {
      const result = await taskManager.getTask('non-existent-id');
      expect(result).toBeNull();
    });
  });

  describe('updateTaskStatus', () => {
    let task;

    beforeEach(async () => {
      task = await taskManager.createTask({
        projectId: 'project-123',
        requesterAgent: 'human',
        targetAgent: 'content_creator',
        input: { prompt: 'Test task' }
      });
    });

    it('should update task status and add to history', async () => {
      const updatedTask = await taskManager.updateTaskStatus(
        task.taskId, 
        'in_progress', 
        { agent: 'content_creator' }
      );

      expect(updatedTask.status).toBe('in_progress');
      expect(updatedTask.updatedAt).not.toBe(task.updatedAt);
      expect(updatedTask.history).toHaveLength(2);
      expect(updatedTask.history[1].action).toBe('status_changed_pending_to_in_progress');
      expect(updatedTask.history[1].agent).toBe('content_creator');
    });

    it('should emit status-specific events', async () => {
      const eventSpy = jest.fn();
      eventBus.on('task:in_progress', eventSpy);

      await taskManager.updateTaskStatus(task.taskId, 'in_progress');

      expect(eventSpy).toHaveBeenCalled();
    });

    it('should throw error for non-existent task', async () => {
      await expect(
        taskManager.updateTaskStatus('non-existent', 'completed')
      ).rejects.toThrow('Task non-existent not found');
    });
  });

  describe('setTaskOutput', () => {
    let task;

    beforeEach(async () => {
      task = await taskManager.createTask({
        projectId: 'project-123',
        requesterAgent: 'human',
        targetAgent: 'content_creator',
        input: { prompt: 'Test task' }
      });
    });

    it('should set output and determine correct status based on confidence', async () => {
      const output = {
        data: 'Generated content',
        explanation: 'AI generated this content',
        confidenceScore: 0.95,
        alternativeSolutions: [],
        warnings: []
      };

      const execution = {
        agentId: 'content_creator',
        modelUsed: 'gpt-4',
        tokensConsumed: 500,
        cost: 0.01
      };

      const updatedTask = await taskManager.setTaskOutput(task.taskId, output, execution);

      expect(updatedTask.output).toEqual(output);
      expect(updatedTask.execution).toEqual(execution);
      expect(updatedTask.status).toBe('completed'); // High confidence should mark as completed
    });

    it('should mark as needs_validation for medium confidence', async () => {
      const output = {
        data: 'Generated content',
        confidenceScore: 0.75 // Medium confidence
      };

      const execution = { agentId: 'content_creator' };

      await taskManager.setTaskOutput(task.taskId, output, execution);
      
      // La función updateTaskStatus debería haber sido llamada internamente
      const updatedTask = await taskManager.getTask(task.taskId);
      expect(updatedTask.status).toBe('needs_validation');
    });

    it('should mark as failed for low confidence', async () => {
      const output = {
        data: 'Poor quality content',
        confidenceScore: 0.3 // Low confidence
      };

      const execution = { agentId: 'content_creator' };

      await taskManager.setTaskOutput(task.taskId, output, execution);
      
      const updatedTask = await taskManager.getTask(task.taskId);
      expect(updatedTask.status).toBe('failed');
    });
  });

  describe('applyHumanFeedback', () => {
    let task;

    beforeEach(async () => {
      task = await taskManager.createTask({
        projectId: 'project-123',
        requesterAgent: 'human',
        targetAgent: 'content_creator',
        input: { prompt: 'Test task' }
      });
      
      // Simular que la tarea tiene output
      await taskManager.setTaskOutput(task.taskId, {
        data: 'Original content',
        confidenceScore: 0.8
      }, { agentId: 'content_creator' });
    });

    it('should approve task when feedback is positive', async () => {
      const feedback = {
        wasApproved: true,
        rating: 5,
        reviewerId: 'reviewer-123'
      };

      const result = await taskManager.applyHumanFeedback(task.taskId, feedback);

      expect(result.humanFeedback.wasApproved).toBe(true);
      expect(result.humanFeedback.reviewTime).toBeDefined();
      expect(result.status).toBe('completed');
    });

    it('should create correction task when feedback includes correction', async () => {
      const feedback = {
        wasApproved: false,
        correction: 'The tone is too formal, make it more casual',
        reviewerId: 'reviewer-123'
      };

      const correctionTask = await taskManager.applyHumanFeedback(task.taskId, feedback);

      expect(correctionTask.taskId).not.toBe(task.taskId); // Should be a new task
      expect(correctionTask.parentTaskId).toBe(task.taskId);
      expect(correctionTask.input.prompt).toContain(feedback.correction);
      expect(correctionTask.priority).toBe(task.priority + 1); // Higher priority for corrections
    });
  });

  describe('getAgentMetrics', () => {
    beforeEach(async () => {
      // Crear varias tareas para testing de métricas
      const tasks = [
        {
          projectId: 'project-1',
          requesterAgent: 'human',
          targetAgent: 'content_creator',
          input: { prompt: 'Task 1' }
        },
        {
          projectId: 'project-1',
          requesterAgent: 'human',
          targetAgent: 'content_creator',
          input: { prompt: 'Task 2' }
        }
      ];

      for (const taskData of tasks) {
        const task = await taskManager.createTask(taskData);
        await taskManager.setTaskOutput(task.taskId, {
          data: 'Content',
          confidenceScore: 0.9
        }, {
          agentId: 'content_creator',
          duration: 30,
          cost: 0.05
        });
      }
    });

    it('should calculate metrics correctly', async () => {
      const metrics = await taskManager.getAgentMetrics('content_creator', '24h');

      expect(metrics).toBeDefined();
      expect(metrics.totalTasks).toBeGreaterThan(0);
      expect(metrics.completedTasks).toBeGreaterThan(0);
      expect(metrics.avgConfidence).toBeGreaterThan(0);
      expect(metrics.totalCost).toBeGreaterThan(0);
      expect(metrics.successRate).toBeGreaterThan(0);
    });
  });
});