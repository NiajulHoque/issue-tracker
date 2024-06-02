import { sendTelegrafMessage } from "./telegram-impl.service";

const { sendMessage } = vi.hoisted(() => ({
  sendMessage: vi.fn(),
}));

vi.mock("@/constants/telegraf", () => ({
  bot: {
    telegram: {
      sendMessage,
    },
  },
}));

describe("TelegramImplService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("sendTelegrafMessage", () => {
    test("should test that a message is sent", async () => {
      // Arrange
      const mockTelegramId = 123456789;
      const mockMessage = "test message";

      // Act
      const response = await sendTelegrafMessage(mockTelegramId, mockMessage);

      // Assert
      expect(response).toEqual({ message: "Telegram message sent." });
      expect(sendMessage).toHaveBeenCalledTimes(1);
      expect(sendMessage).toHaveBeenCalledWith(mockTelegramId, mockMessage);
    });
  });
});
