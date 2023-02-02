export interface SubmissionTask {
  id: number;
  task: string;
  status: string;
  from: string;
  to: string;
  customerAddress: string;
  dueDate: Date;
  checked?: boolean;
}
