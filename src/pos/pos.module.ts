import { Module } from "@nestjs/common";
import { DatabaseModule } from "database/database.module";
import { PosController } from "./pos.controller";
import { PosService } from "./pos.services";

@Module({
    imports: [DatabaseModule],
    controllers: [PosController],
    providers: [PosService]
})
export class PosModule {}