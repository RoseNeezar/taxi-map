import MapPage from "../../app/pageComponent/Map/MapPage";
import { renderWithQueryClient } from "../../testUtils";

describe("main page", () => {
  test("should render page with query client", () => {
    renderWithQueryClient(<MapPage />);
  });
});
