import { sendTelegramMessageFactory } from "./telegram.service";

describe("TelegramService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("sendTelegramMessage", () => {
    test("should test that a message is sent", async () => {
      // Arrange
      const mockTelegramId = 123456789;
      const mockMessage = "test message";
      const mockSendMessage = vi.fn().mockResolvedValue({
        message: mockMessage,
      });

      // Act
      const handler = sendTelegramMessageFactory(mockSendMessage);
      const response = await handler(mockTelegramId, mockMessage);

      // Assert
      expect(response).toEqual({ message: mockMessage });
      expect(mockSendMessage).toHaveBeenCalledTimes(1);
      expect(mockSendMessage).toHaveBeenCalledWith(mockTelegramId, mockMessage);
    });
  });
});
