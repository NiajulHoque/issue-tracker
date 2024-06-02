import { CreateAccountEndpointSchema } from "@/models";
import { createAccountFactory } from "./auth.service";
import { storeAccountInDB } from "./auth-impl.service";
import { UserAccount } from "@repo/data-commons";

const mockHashPassword = vi.fn().mockResolvedValue("qruq9z8PLF1o8y8Ynxs8");
const mockCreateDocument = vi.fn().mockResolvedValue({
  message: "Created document",
});

describe("AuthImplService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("storeAccountInDB", () => {
    test("should test that it throws an error if the account with the email already exists", async () => {
      const mockData = {
        email: "test@example.com",
        password: "mock_password",
        telegramId: 123456789,
      };
      const mockGetUserAccountByEmail = vi.fn().mockResolvedValue({
        ...mockData,
      });

      const handler = storeAccountInDB(
        mockGetUserAccountByEmail,
        mockHashPassword,
        mockCreateDocument
      );

      await expect(
        handler(mockData.email, mockData.password, mockData.telegramId)
      ).rejects.toThrowError("An account with this email already exists.");
      expect(mockGetUserAccountByEmail).toHaveBeenCalledTimes(1);
      expect(mockGetUserAccountByEmail).toHaveBeenCalledWith(mockData.email);
      expect(mockHashPassword).not.toHaveBeenCalled();
    });

    test("should test that it creates an account if the email doesn't exist", async () => {
      const mockUserAccount: Omit<UserAccount, "id"> = {
        email: "test@example.com",
        password: "qruq9z8PLF1o8y8Ynxs8",
        telegramId: 123456789,
        createdAt: expect.stringContaining("T"),
      };
      const mockGetUserAccountByEmail = vi.fn().mockResolvedValue(null);

      const handler = storeAccountInDB(
        mockGetUserAccountByEmail,
        mockHashPassword,
        mockCreateDocument
      );

      const result = await handler(
        mockUserAccount.email,
        mockUserAccount.password,
        mockUserAccount.telegramId
      );

      expect(result).toEqual(undefined);
      expect(mockGetUserAccountByEmail).toHaveBeenCalledTimes(1);
      expect(mockGetUserAccountByEmail).toHaveBeenCalledWith(
        mockUserAccount.email
      );
      expect(mockHashPassword).toHaveBeenCalledTimes(1);
      expect(mockHashPassword).toHaveBeenCalledWith(mockUserAccount.password);
      expect(mockCreateDocument).toHaveBeenCalledTimes(1);
      expect(mockCreateDocument).toHaveBeenCalledWith(mockUserAccount);
    });
  });
});
