import {Request, Controller, Get } from '@nestjs/common';

@Controller('/api/food')
export class FoodController {
    @Get()
    async greet(
      @Request() req: any,
    ): Promise<String> {
    console.log("request", req.user)
    console.log("body", req.body)
    return "Routes are authorinzed from food"
  }
}
