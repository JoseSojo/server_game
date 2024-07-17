import { Controller, Get } from '@nestjs/common';

@Controller('levels')
export class LevelController {

    @Get(`/`)
    public async findAll() {

        

    }

}
