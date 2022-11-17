class ConflictError extends Error {
  public status: number;
  constructor(message: string) {
    super(message);
    this.name = 'conflictError';
    this.status =  409;
  }
}

export default ConflictError;