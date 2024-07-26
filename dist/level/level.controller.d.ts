import { LevelService } from './level.service';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
export declare class LevelController {
    private levelService;
    constructor(levelService: LevelService);
    create(createLevelDto: CreateLevelDto): Promise<{
        id: number;
        name: string;
        description: string;
    }>;
    findAll(query: {
        skip?: string;
        take?: string;
    }): Promise<{
        id: number;
        name: string;
        description: string;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        name: string;
        description: string;
    }>;
    update(id: string, updateLevelDto: UpdateLevelDto): Promise<{
        id: number;
        name: string;
        description: string;
    }>;
}
