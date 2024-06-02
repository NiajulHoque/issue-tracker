import { UserAccount } from "@repo/data-commons";
import { findByEmail } from "./user-impl.service";

const { mockFindOne } = vi.hoisted(() => ({
  mockFindOne: vi.fn(),
}));
vi.mock("@/models", () => ({
  UserModel: {
    findOne: mockFindOne,
  },
}));

describe("UserImplService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("findByEmail", () => {
    test("should test that it returns null if the email doesn't exist", async () => {
      const mockEmail = "test@example.com";
      mockFindOne.mockReturnValue({
        exec: vi.fn(),
      });

      const result = await findByEmail(mockEmail);

      expect(result).toEqual(null);
      expect(mockFindOne).toHaveBeenCalledTimes(1);
      expect(mockFindOne).toHaveBeenCalledWith({ email: mockEmail });
    });

    test("should throw an error if there is a schema mismatch", async () => {
      const mockEmail = "test@example.com";
      mockFindOne.mockReturnValue({
        exec: vi.fn().mockResolvedValue({}),
      });

      await expect(findByEmail(mockEmail)).rejects.toThrowError("Required:");
      expect(mockFindOne).toHaveBeenCalledTimes(1);
      expect(mockFindOne).toHaveBeenCalledWith({ email: mockEmail });
    });

    test("should return a user account if the email exists", async () => {
      const mockDocument = {
        _id: "mock_id",
        email: "test@example.com",
        password: "password",
        telegramId: 123456789,
        createdAt: "2024-06-01T22:04:13.019Z",
      };
      const mockUserAccount: UserAccount = {
        id: "mock_id",
        email: "test@example.com",
        password: "password",
        telegramId: 123456789,
        createdAt: "2024-06-01T22:04:13.019Z",
      };
      mockFindOne.mockReturnValue({
        exec: vi.fn().mockResolvedValue(mockDocument),
      });

      const result = await findByEmail(mockDocument.email);

      expect(result).toEqual(mockUserAccount);
      expect(mockFindOne).toHaveBeenCalledTimes(1);
      expect(mockFindOne).toHaveBeenCalledWith({ email: mockDocument.email });
    });
  });
});
