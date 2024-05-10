import { Body, Controller, Get, Param, Post, Put, Res } from "@nestjs/common";
import { PosService } from "./pos.services";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { createPosDto } from "./createPOS.dto";
import { updatePosStatusDto } from "./updateStatus.dto";
import { Response } from 'express';

@Controller('POS')
export class PosController{
    constructor(private readonly PosService: PosService){}
    
    //Create POS Request
    @ApiTags('PosRequest')
    @ApiBody({type: createPosDto})
    @Post('newposrequest')
    async createPosRequest(@Body() dto: createPosDto){
        return this.PosService.createPosRequest(dto);
    }

    @ApiTags('PosRequest')
    @Get('allrequest')
    async getPosRequest(){
        return this.PosService.getAllPosRequests();
    }

    @ApiTags('PosRequest')
    @Put('updatestatus/:requestId')
    async updateStatus(@Param('requestId') requestId: string, @Body() dto: updatePosStatusDto){
        return this.PosService.updateStatus(requestId, dto);
    }

        // Get POS Requests by RequestId and Download as Excel
        // @ApiTags('PosRequest')
        // @Get('request/:requestId/excel')
        // async getPosRequestsByRequestIdAndDownloadExcel(@Param('requestId') requestId: string, @Res() res: Response) {
        //     try {
        //         const posRequests = await this.PosService.getPosRequestsByRequestId(requestId);
        //         await this.PosService.generateExcelFile(posRequests, 'pos_requests.xlsx');
        //         res.download('pos_requests.xlsx');
        //     } catch (error) {
        //         res.status(404).send(error.message);
        //     }
        // }

        @ApiTags('PosRequest')
        @Get('request/excel/:requestId')
        async getPosRequestsByRequestIdAndDownloadExcel(@Param('requestId') requestId: string, @Res() res: Response) {
            try {
                const filename = await this.PosService.convertPosRequestsToExcelAndDownload(requestId);
                res.download(filename);
            } catch (error) {
                res.status(404).send(error.message);
            }
        }
}