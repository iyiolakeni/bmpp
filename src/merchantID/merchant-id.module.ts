import { Module } from "@nestjs/common";
import { DatabaseModule } from "database/database.module";
import { MerchantIDController } from "./merchant-id.controller";
import { MerchantIDService } from "./merchant-id.services";

// This module is responsible for handling the merchant ID

@Module({
    imports: [DatabaseModule],
    controllers: [MerchantIDController],
    providers: [
        MerchantIDService
    ]
})
export class MerchantIDModule{}