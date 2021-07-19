import { createMocks } from "node-mocks-http";
import { mockDriverPayload } from "../../app/utils/mockDriver";
import handleDriver from "../../pages/api/drivers";

describe("Driver route", () => {
  it("Should return 200 if use correct input", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: mockDriverPayload,
    });

    await handleDriver(req, res);

    expect(res._getStatusCode()).toBe(200);
  });
});
