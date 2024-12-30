import { Injectable } from '@nestjs/common';
import { QRCodeRepository } from 'src/domain/messages/application/qr-code/qr-code-repository';
import * as QRCode from 'qrcode';

@Injectable()
export class QRCodeTerminal implements QRCodeRepository {
  async create(data: string): Promise<void> {
    const qr = await QRCode.toString(data, {
      type: 'terminal',
      errorCorrectionLevel: 'L', // L = 7% de recuperação de erro
      small: true,
      width: 10,
    });
    console.log(qr);
  }
}
