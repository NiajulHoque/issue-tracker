import { UserAccount } from "@repo/data-commons";
import { getUserAccountByEmailFactory } from "./user.service";

describe("UserService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getUserAccountByEmailFactory", () => {
    test("should test that it returns null if an account with an email doesn't exist", async () => {
      // Arrange
      const mockEmail = "issuetracker@example.com";
      const mockFindByEmail = vi.fn().mockResolvedValue(null);

      // Act
      const handler = getUserAccountByEmailFactory(mockFindByEmail);
      const response = await handler(mockEmail);

      // Assert
      expect(response).toEqual(null);
      expect(mockFindByEmail).toHaveBeenCalledTimes(1);
      expect(mockFindByEmail).toHaveBeenCalledWith(mockEmail);
    });

    test("should test that it returns a user account if an email exists", async () => {
      // Arrange
      const mockEmail = "issuetracker@example.com";
      const mockTelegramId = 123456789;
      const mockUserAccount: UserAccount = {
        id: "mock_id",
        email: mockEmail,
        password: "password",
        telegramId: mockTelegramId,
        createdAt: "2024-06-01T22:04:13.019Z",
      };
      const mockFindByEmail = vi.fn().mockResolvedValue(mockUserAccount);

      // Act
      const handler = getUserAccountByEmailFactory(mockFindByEmail);
      const response = await handler(mockEmail);

      // Assert
      expect(response).toEqual(mockUserAccount);
      expect(mockFindByEmail).toHaveBeenCalledTimes(1);
      expect(mockFindByEmail).toHaveBeenCalledWith(mockEmail);
    });
  });
});
