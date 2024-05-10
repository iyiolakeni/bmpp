import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MerchantID } from "./merchantID.entity";
import { Repository } from "typeorm";
import { createMerchantIdDto } from "./createMerchantID.dto";

@Injectable()
export class MerchantIDService {
  constructor(
    @InjectRepository(MerchantID)
    private readonly merchantIDRepository: Repository<MerchantID>
  ) {}

  //function to generate unique MerchantID from merchants trade name first 4 letters and random numbers
  async uniqueMerchantID(Merchant_Trade_Name: string, length: number) {
    let result = "";
    let characters = "0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  // Split the Merchant_Trade_Name into words
  const names = Merchant_Trade_Name.split(' ');

  // Get the first two letters of the first word
  const fname = names[0].substring(0, 2);

  // Get the first letter of each remaining word
  const otherName = names.slice(1).map(name => name[0]).join('');

  return `${fname}${otherName}${result}`;
  }
  async newMerchant(dto: createMerchantIdDto) {
    if (!dto){
      throw new Error('dto is undefined');
    }
    if (!dto.Merchant_Trade_Name){
      throw new Error('Merchant is undefined')
    }
    const merchant = this.merchantIDRepository.create({
      ...dto,
      MerchantID: await this.uniqueMerchantID(dto.Merchant_Trade_Name, 5)
    });
    return this.merchantIDRepository.save(merchant);
    }

  async findAllMerchantID() {
    return this.merchantIDRepository.find();
  }

  //Get Merchant by a specific id
  async findOneMerchantID(merchantID: string) {
    if (!merchantID) {
      throw new Error('merchantID is undefined');
    }
  
    const merchant = await this.merchantIDRepository.findOne({where: {MerchantID: merchantID}});
  
    if (!merchant) {
      throw new Error('No merchant found with this ID');
    }
  
    return merchant;
  }
  async updateMerchantID() {
    return "This action updates a #${id} merchantID";
  }

  async removeMerchantID() {
    return "This action removes a #${id} merchantID";
  }
}