import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagesRepository } from './domain/messages/application/messages/messages-repository';
import { QRCodeRepository } from './domain/messages/application/qr-code/qr-code-repository';
import { QRCodeTerminal } from './infra/qr-code/qr-code-terminal';
import { WwebjsRepository } from './infra/messages/wwebjs-messages-repository';
import { EnvService } from './infra/env/env.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

import OpenAI from 'openai';
import { CohereClientV2 } from 'cohere-ai';

import { ConversationRepository } from './domain/messages/application/conversation/conversation-repository';

import { CohereConversationRepository } from './infra/conversation/cohere-conversation-repository';
import { envSchema } from './infra/env/env';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [
    AppService,
    {
      provide: OpenAI,
      useFactory: (env: EnvService) => {
        const apiKey = env.get('OPEN_AI_API_KEY');
        return new OpenAI({ apiKey });
      },
      inject: [ConfigService],
    },
    {
      provide: CohereClientV2,
      useFactory: (env: EnvService) => {
        const apiKey = env.get('COHERE_API_KEY');
        return new CohereClientV2({ token: apiKey });
      },
      inject: [ConfigService],
    },
    { provide: QRCodeRepository, useClass: QRCodeTerminal },
    { provide: MessagesRepository, useClass: WwebjsRepository },
    {
      provide: ConversationRepository,
      useClass: CohereConversationRepository,
    },
  ],
})
export class AppModule {}
