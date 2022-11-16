class BadRequest extends Error {
  public status: number;
  constructor(message: string) {
    super(message);
    this.name = 'badRequest';
    this.status =  400;
  }
}

export default BadRequest;