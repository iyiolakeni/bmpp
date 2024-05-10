import { Body, Controller, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FormService } from './form.service';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormStatusDto } from './dto/update-form-status.dto';
import { Form } from './entities/form.entity';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { LoginService } from 'src/login-api/login-api.service';
import { UploadDto } from './dto/upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';





@Controller('forms')
export class FormController {
  constructor(
    private readonly formService: FormService,
    private readonly loginService: LoginService,

    ) {}

  @Post('new')
  @Post()
  @ApiTags('Form')
  createForm(@Body() formData: CreateFormDto): Promise<Form> {
    return this.formService.createForm(formData);
  }

  @Put(':requestId')
  @ApiTags('Form')
  updateFormStatus(
    @Param('requestId') requestId: string,
    @Body() updateFormStatusDto: UpdateFormStatusDto,
  ): Promise<Form> {
    return this.formService.updateFormStatus(requestId, updateFormStatusDto);
  }

  @Get()
  @UseGuards()
  @ApiTags('Form')
  getAllForms(): Promise<Form[]> {
    return this.formService.getAllForms();
  }

  @ApiTags('Form')
  @Get(':requestId')
  getFormByRequestID(@Param('requestId') requestId: string){
    console.log(requestId)
    return this.formService.getFormByRequestId(requestId);
  }


  @ApiTags('Form')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'The file to upload',
    type: 'object',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('file')
  uploadFile(
    @Body() body: UploadDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return {
      body,
      file: file.buffer.toString(),
    };
  }
}
