class ApiResponse {
  constructor(statusCode, message = 'Success', data = null, pagination = null) {
    this.success = statusCode < 400;
    this.message = message;
    this.data = data;
    if (pagination) {
      this.pagination = pagination;
    }
  }

  send(res) {
    const responseBody = {
      success: this.success,
      message: this.message,
      data: this.data
    };
    
    if (this.pagination) {
      responseBody.pagination = this.pagination;
    }

    return res.status(this.statusCode || 200).json(responseBody);
  }
}

export default ApiResponse;
