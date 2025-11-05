export type ToDoListItem = {
  id: number;
  title: string;
  description: string;
  completed?: boolean;
  status: EStatus
}

export enum EStatus {
  IN_PROGRESS = 'InProgress',
  COMPLETED = 'completed'
}
