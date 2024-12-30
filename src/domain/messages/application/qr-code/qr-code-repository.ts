export abstract class QRCodeRepository {
  abstract create(data: string): Promise<void>;
}
