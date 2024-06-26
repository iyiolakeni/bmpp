import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormStatusDto } from './dto/update-form-status.dto';
import { Form } from './entities/form.entity';
import { FormStatus } from './entities/form.enum';


@Injectable()
export class FormService {
  constructor(
    @InjectRepository(Form)
    private readonly formRepository: Repository<Form>,
  ) {}

  async createForm(formData: CreateFormDto): Promise<Form> {
    const form = this.formRepository.create(formData);
    return this.formRepository.save(form);
  }

  async getAllForms(limit: number, offset: number): Promise<Form[]> {
    return this.formRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async getRequest(): Promise<Form[]>{
    return this.formRepository.find();
  }

    //get forms by RequestID
    async getFormByRequestId(RequestID: string){
      let found;
      try {
        found = await this.formRepository.findOne({where: { RequestId: RequestID}});
      } catch (error) {
        console.error('There was an error:', error);
      }
      console.log('Found:', found);
      if (!found) {
        throw new NotFoundException('Could not find form');
      }
      return found;
    }

  // async getFormByAccountOfficer(officer_name: string): Promise<Form[]>{
  //   return this.formRepository.find({where: { officer_name: officer_name}});
  // }

  async updateFormStatus(
    RequestId: string,
    updateFormStatusDto: UpdateFormStatusDto,
  ): Promise<Form> {
    const form = await this.formRepository.findOne({where: { RequestId: RequestId}});
    if (!form) {
      throw new NotFoundException('Form not found');
    }

    if (form.status === FormStatus.DENIED) {
      throw new BadRequestException('Form status cannot be updated');
    }

    if (
      updateFormStatusDto.status !== FormStatus.APPROVED &&
      updateFormStatusDto.status !== FormStatus.DENIED &&
      updateFormStatusDto.status !== FormStatus.IN_PROCESS &&
      updateFormStatusDto.status !== FormStatus.DEPLOYED
    ) {
      throw new BadRequestException('Invalid status transition');
    }

    form.status = updateFormStatusDto.status;
    form.ApprovedBy = updateFormStatusDto.ApprovedBy;
    form.ApprovedBy2 = updateFormStatusDto.ApprovedBy2;
    form.AdditionalNotes = updateFormStatusDto.AdditionalNotes;
    console.log('Form:', form);
    return this.formRepository.save(form);
  }

  async deleteByID(requestID: string){
    const form = await this.formRepository.findOne({where: { RequestId: requestID}});
    if (!form) {
      throw new NotFoundException('Form not found');
    }
    return this.formRepository.remove(form);
  }
}
