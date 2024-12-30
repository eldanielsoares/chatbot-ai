import { Injectable } from '@nestjs/common';
import { QRCodeRepository } from 'src/domain/messages/application/qr-code/qr-code-repository';
import { generate } from 'qrcode-terminal';

@Injectable()
export class QRCodeTerminal implements QRCodeRepository {
  async create(data: string): Promise<void> {
    return generate(data, { small: true });
  }
}
