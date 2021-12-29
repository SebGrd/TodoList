export default class EmailSender {
  private host: string;
  private port: number;

  constructor(host: string, port: number) {
    this.host = host;
    this.port = port;
  }

  async sendMail(from: string, to: string, subject: string, text?: string, html?: string) {
    throw new Error("not implemented yet");
  }
}
