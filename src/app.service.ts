import { Injectable, OnModuleInit } from '@nestjs/common';

import { MessagesRepository } from './domain/messages/application/messages/messages-repository';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private readonly messagesRepository: MessagesRepository) {}

  async onModuleInit(): Promise<void> {
    this.initializeClient();
  }

  private initializeClient(): void {
    this.messagesRepository.connect();

    this.messagesRepository.connected();

    this.messagesRepository.sendMessage();

    this.messagesRepository.initialize();
  }
}
