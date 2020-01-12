import { Tokens } from '../common/const';

export default class Request {
  constructor() {
    this.method = null;
    this.parameters = {};
    this.endpoint = null;
    this.isMultipart = false;
    this.headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${Tokens.ACCESS_TOKEN}`,
    };
  }

  static get() {
    this.method = 'GET';
    return this;
  }

  static post() {
    this.method = 'POST';
    return this;
  }

  static delete() {
    this.method = 'DELETE';
    return this;
  }

  static multipart() {
    this.isMultipart = true;
    return this;
  }

  static put() {
    this.method = 'PUT';
    return this;
  }

  static to(endpoint) {
    this.endpoint = endpoint;
    return this;
  }

  static payload(parameters) {
    this.parameters = parameters;
    return this;
  }

  static setHeaders(headers) {
    this.headers = headers;
    return this;
  }

  static body() {
    if (this.isMultipart !== undefined && this.isMultipart === true) {
      return this.method !== 'GET' ? this.parameters : null; // Multipart
    }

    return this.method !== 'GET' ? JSON.stringify(this.parameters) : null;
  }

  static async send() {
    this.headers = {
      'Content-Type': this.isMultipart ? 'multipart/form-data' : 'application/json',
      authorization: `Bearer ${Tokens.ACCESS_TOKEN}`,
    };

    const request = await fetch(this.endpoint, {
      method: this.method,
      headers: this.headers,
      body: this.body(),
    });

    const response = await this.formatResponse(request);
    return response;
  }

  static async formatResponse(request) {
    const response = await (request.json());

    if (request.status >= 200 && request.status < 300) {
      return response;
    }

    const error = {
      statusCode: response.status,
      message: response.message,
    };

    throw error;
  }
}
