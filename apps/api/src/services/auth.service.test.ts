import { createAccountFactory } from "./auth.service";

describe("AuthService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createAccountFactory", () => {
    test("should test that it throws an error due to schema mismatch", async () => {
      const mockData = {};

      const handler = createAccountFactory();

      await expect(handler(mockData)).rejects.toThrowError("Required:");
      // expect()
    });
  });
});
