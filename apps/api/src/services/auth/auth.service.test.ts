import { CreateAccountEndpointSchema } from "@/models";
import { createAccountFactory } from "./auth.service";

const mockData: CreateAccountEndpointSchema = {
  email: "test@example.com",
  password: "pass12345",
  telegramId: 123456789,
};
const mockDataEmpty = {} as CreateAccountEndpointSchema;

const mockStoreAccountInDB = vi.fn();
const mockSendTelegramMessage = vi.fn();

describe("AuthService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should test that it throws an error if the email already exists", async () => {
    mockStoreAccountInDB.mockImplementationOnce(() => {
      throw new Error("An account with this email already exists...");
    });

    const handler = createAccountFactory(
      mockStoreAccountInDB,
      mockSendTelegramMessage
    );

    await expect(handler(mockData)).rejects.toThrowError(
      "An account with this email already exists..."
    );
    expect(mockStoreAccountInDB).toHaveBeenCalledTimes(1);
    expect(mockStoreAccountInDB).toHaveBeenCalledWith(
      mockData.email,
      mockData.password,
      mockData.telegramId
    );
  });

  test("should create an account", async () => {
    const handler = createAccountFactory(
      mockStoreAccountInDB,
      mockSendTelegramMessage
    );

    const result = await handler(mockData);

    expect(result).toEqual({
      message: "Successfully created an account.",
    });
    expect(mockStoreAccountInDB).toHaveBeenCalledTimes(1);
    expect(mockStoreAccountInDB).toHaveBeenCalledWith(
      mockData.email,
      mockData.password,
      mockData.telegramId
    );
    expect(mockSendTelegramMessage).toHaveBeenCalledTimes(1);
    expect(mockSendTelegramMessage).toHaveBeenCalledWith(
      123456789,
      "Welcome to the Issue Tracker"
    );
  });
});
