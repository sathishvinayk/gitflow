import { Request, Controller, Get, UseGuards, Post, Req, Body } from '@nestjs/common'

@Controller("/api")
export class AppController {
  constructor() {}

  @Post()
  async greet(
      @Request() req: any,
      @Body() data: any
    ): Promise<String> {
    console.log("data", data);
    console.log("request", req.user.email)
    console.log("Just removing for the sake of simplicity!");
    return "Routes are authorinzed"
  }
}
