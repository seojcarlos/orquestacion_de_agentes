import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const taskSchema = JSON.parse(readFileSync(path.join(__dirname, 'task.schema.json'), 'utf8'));

/**
 * Valida una tarea contra el schema definido
 * @param {Object} task - Tarea a validar
 * @returns {Object} Resultado de la validación
 */
export function validateTask(task) {
  const errors = [];

  // Validaciones básicas requeridas
  if (!task.taskId) errors.push('taskId is required');
  if (!task.projectId) errors.push('projectId is required');
  if (!task.status) errors.push('status is required');
  if (!task.requesterAgent) errors.push('requesterAgent is required');
  if (!task.targetAgent) errors.push('targetAgent is required');
  if (!task.input) errors.push('input is required');
  if (!task.createdAt) errors.push('createdAt is required');

  // Validar enums
  const validStatuses = ["pending", "queued", "in_progress", "needs_validation", "completed", "failed", "cancelled"];
  if (task.status && !validStatuses.includes(task.status)) {
    errors.push(`Invalid status: ${task.status}`);
  }

  const validRequesterAgents = ["human", "ceo_agent", "team_leader_agent", "critical_agent", "system"];
  if (task.requesterAgent && !validRequesterAgents.includes(task.requesterAgent)) {
    errors.push(`Invalid requesterAgent: ${task.requesterAgent}`);
  }

  const validTargetAgents = [
    "content_creator", "web_dev_agent", "campaign_manager_agent", "analytics_agent", "crm_agent",
    "social_media_agent", "email_sms_agent", "strategy_agent", "competitor_agent",
    "team_leader_agent", "ceo_agent", "critical_agent"
  ];
  if (task.targetAgent && !validTargetAgents.includes(task.targetAgent)) {
    errors.push(`Invalid targetAgent: ${task.targetAgent}`);
  }

  // Validar priority
  if (task.priority !== undefined && (task.priority < 1 || task.priority > 10)) {
    errors.push('Priority must be between 1 and 10');
  }

  // Validar input
  if (task.input && !task.input.prompt) {
    errors.push('input.prompt is required');
  }

  // Validar confidence score si existe output
  if (task.output?.confidenceScore !== undefined) {
    if (task.output.confidenceScore < 0 || task.output.confidenceScore > 1) {
      errors.push('confidenceScore must be between 0 and 1');
    }
  }

  // Validar human feedback rating si existe
  if (task.humanFeedback?.rating !== undefined) {
    if (task.humanFeedback.rating < 1 || task.humanFeedback.rating > 5) {
      errors.push('humanFeedback.rating must be between 1 and 5');
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Valida que una transición de estado sea válida
 * @param {string} fromStatus - Estado actual
 * @param {string} toStatus - Estado objetivo
 * @returns {boolean} Si la transición es válida
 */
export function validateStatusTransition(fromStatus, toStatus) {
  const validTransitions = {
    'pending': ['queued', 'in_progress', 'cancelled'],
    'queued': ['in_progress', 'cancelled'],
    'in_progress': ['completed', 'failed', 'needs_validation', 'cancelled'],
    'needs_validation': ['completed', 'failed', 'cancelled'],
    'completed': [], // Estado final
    'failed': ['pending'], // Puede reintentar
    'cancelled': [] // Estado final
  };

  return validTransitions[fromStatus]?.includes(toStatus) || false;
}