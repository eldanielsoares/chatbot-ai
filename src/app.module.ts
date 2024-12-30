import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { QRCodeRepository } from './domain/messages/application/qr-code/qr-code-repository';
import { QRCodeTerminal } from './infra/qr-code/qr-code-terminal';
import { MessagesRepository } from './domain/messages/application/messages/messages-repository';
import { WwebjsRepository } from './infra/messages/wwebjs-messages-repository';

@Module({
  imports: [],
  controllers: [],
  providers: [
    AppService,
    { provide: QRCodeRepository, useClass: QRCodeTerminal },
    { provide: MessagesRepository, useClass: WwebjsRepository },
  ],
})
export class AppModule {}
